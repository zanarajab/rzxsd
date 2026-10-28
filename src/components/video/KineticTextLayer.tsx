import React, { useMemo } from 'react';
import { TextLayer } from '../../types/video';

interface KineticTextLayerProps {
  layer: TextLayer;
  currentTime: number;
  isSelected?: boolean;
  onSelect?: (layerId: string) => void;
  scaleFactor?: number; // to scale font if canvas is scaled
}

interface ParsedWord {
  id: string;
  text: string;
  isBold: boolean;
  raw: string;
}

export const KineticTextLayer: React.FC<KineticTextLayerProps> = ({
  layer,
  currentTime,
  isSelected = false,
  onSelect,
  scaleFactor = 1,
}) => {
  const { start, end, content, x, y, fontSize, textAlign = 'center', animation, letterSpacing, uppercase, maxWidth } = layer;

  // Active check
  const isVisible = currentTime >= start && currentTime <= end;
  if (!isVisible) return null;

  const timeSinceStart = currentTime - start;

  // Parse text into words with **bold** detection
  const words: ParsedWord[] = useMemo(() => {
    // Match tokens: either **word** or standard words
    const regex = /(\*\*[^*]+\*\*|[^\s]+)/g;
    const matches = content.match(regex) || [];
    return matches.map((token, idx) => {
      if (token.startsWith('**') && token.endsWith('**')) {
        return {
          id: `${layer.id}-w-${idx}`,
          text: token.slice(2, -2),
          isBold: true,
          raw: token,
        };
      }
      return {
        id: `${layer.id}-w-${idx}`,
        text: token,
        isBold: layer.customWeight === 'bold',
        raw: token,
      };
    });
  }, [content, layer.id, layer.customWeight]);

  // Compute total reveal window
  // e.g. each word appears at interval wordDelay (0.15s - 0.25s), and each word takes 0.3s to sharpen
  const wordDelay = Math.min(0.22, Math.max(0.08, 1.2 / Math.max(words.length, 1)));
  const wordTransitionDuration = 0.3; // 0.3s blur-in + fade-in + slight upward slide

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.(layer.id);
      }}
      className={`absolute z-20 cursor-pointer transition-all duration-150 group select-none ${
        isSelected ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-white' : 'hover:ring-1 hover:ring-black/20'
      }`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: textAlign === 'center'
          ? 'translate(-50%, -50%)'
          : textAlign === 'right'
          ? 'translate(-100%, -50%)'
          : 'translate(0, -50%)',
        textAlign,
        maxWidth: maxWidth ? `${maxWidth}px` : '620px',
        width: maxWidth ? `${maxWidth}px` : 'max-content',
        letterSpacing: letterSpacing || 'normal',
        textTransform: uppercase ? 'uppercase' : 'none',
      }}
      title={`Layer ${layer.id}: Click to edit`}
    >
      {/* Layer ID Badge on Hover/Selected */}
      {(isSelected || false) && (
        <span className="absolute -top-6 left-0 text-[10px] font-mono font-bold bg-black text-white px-1.5 py-0.5 rounded shadow">
          {layer.id}
        </span>
      )}

      {/* Render text either word-by-word or letter-by-letter */}
      {animation === 'blur-in-letter' ? (
        // Letter-by-letter typing animation (e.g., T10 "the name", T59 "the person")
        <span className="inline-block flex-wrap">
          {content.split('').map((char, charIdx) => {
            const charDelay = 0.05;
            const charStartTime = charIdx * charDelay;
            const charElapsed = timeSinceStart - charStartTime;
            const progress = Math.min(Math.max(charElapsed / 0.2, 0), 1);

            const blurAmount = (1 - progress) * 8;
            const opacity = progress;
            const translateY = (1 - progress) * 4;

            return (
              <span
                key={charIdx}
                className="inline-block transition-all"
                style={{
                  filter: `blur(${blurAmount}px)`,
                  opacity,
                  transform: `translateY(${translateY}px)`,
                  fontSize: `${fontSize * scaleFactor}px`,
                  fontWeight: 700,
                  color: '#1a1a1a',
                  lineHeight: 1.25,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            );
          })}
        </span>
      ) : animation === 'scale-blur' ? (
        // Scale + blur (e.g., T19 RECKLESS, T42 2002)
        (() => {
          const progress = Math.min(Math.max(timeSinceStart / 0.4, 0), 1);
          const blurAmount = (1 - progress) * 12;
          const scale = 1.08 - progress * 0.08;
          // Color darkens from light grey #999 to charcoal #222
          const color = progress > 0.6 ? '#1f1f1f' : '#6b6b6b';

          return (
            <div
              style={{
                filter: `blur(${blurAmount}px)`,
                opacity: progress,
                transform: `scale(${scale})`,
                fontSize: `${fontSize * scaleFactor}px`,
                fontWeight: 800,
                color,
                lineHeight: 1.1,
              }}
            >
              {content.replace(/\*\*/g, '')}
            </div>
          );
        })()
      ) : (
        // Standard word-by-word blur-in + fade-in + slight upward slide
        <div className="flex flex-wrap items-baseline gap-x-[0.28em] gap-y-1 justify-center">
          {words.map((w, idx) => {
            const wordStartTime = idx * wordDelay;
            const elapsed = timeSinceStart - wordStartTime;
            const progress = Math.min(Math.max(elapsed / wordTransitionDuration, 0), 1);

            // Blurry grey -> Sharp dark in ~0.3s
            const blurAmount = (1 - progress) * 10;
            const opacity = progress;
            const translateY = (1 - progress) * 8;

            // Key words are bold and ~2-3x larger if mixed, or bold darker
            const isBoldWord = w.isBold;

            return (
              <span
                key={w.id}
                className="inline-block whitespace-pre transition-all duration-75"
                style={{
                  filter: `blur(${blurAmount}px)`,
                  opacity,
                  transform: `translateY(${translateY}px)`,
                  fontSize: `${(isBoldWord && words.length > 3 ? fontSize * 1.15 : fontSize) * scaleFactor}px`,
                  fontWeight: isBoldWord ? 800 : 400,
                  color: isBoldWord ? '#181818' : '#4a4a4a',
                  lineHeight: 1.25,
                }}
              >
                {w.text}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};
