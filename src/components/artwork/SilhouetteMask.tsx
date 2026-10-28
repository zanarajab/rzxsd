import React from 'react';

interface SilhouetteMaskProps {
  customUrl?: string;
  zoom?: number;
  slideDown?: number; // px
}

export const SilhouetteMask: React.FC<SilhouetteMaskProps> = ({
  customUrl,
  zoom = 1,
  slideDown = 0,
}) => {
  if (customUrl) {
    return (
      <div
        className="pointer-events-none absolute inset-0 z-20 overflow-hidden flex items-end justify-center"
        style={{
          transform: `scale(${zoom}) translateY(${slideDown}px)`,
        }}
      >
        <img
          src={customUrl}
          alt="Silhouette with mask"
          referrerPolicy="no-referrer"
          className="max-h-[70%] object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
      style={{
        transform: `scale(${zoom}) translateY(${slideDown}px)`,
        transition: 'transform 0.1s linear',
      }}
    >
      {/* Dark-grey diagonal band from left-bottom to right-middle */}
      <svg
        viewBox="0 0 720 1280"
        className="w-full h-full absolute inset-0 pointer-events-none"
        preserveAspectRatio="none"
      >
        <path
          d="M -50 1280 L -50 920 L 770 620 L 770 1280 Z"
          fill="#444444"
          style={{ filter: 'drop-shadow(0 -10px 20px rgba(0,0,0,0.2))' }}
        />
      </svg>

      {/* Main Silhouette businessman holding theatre mask (occupies lower 60% of screen) */}
      <div
        className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-[460px] h-[780px]"
        style={{
          filter: 'drop-shadow(0 20px 25px rgba(0, 0, 0, 0.45))',
        }}
      >
        <svg viewBox="0 0 460 780" className="w-full h-full" fill="#0d0d0d">
          {/* Head & Neck */}
          <ellipse cx="230" cy="140" rx="38" ry="48" />
          <path d="M 215 180 L 245 180 L 255 220 L 205 220 Z" />

          {/* Shoulders & Suit */}
          <path d="M 140 220 C 140 220, 200 205, 270 220 C 310 260, 320 380, 310 460 L 110 460 C 100 380, 110 260, 140 220 Z" />

          {/* Left Arm: hand relaxed in pocket */}
          <path d="M 140 225 C 100 270, 90 350, 105 430 C 115 480, 145 470, 150 440 C 145 390, 150 330, 175 250 Z" />

          {/* Right Arm: raised to chin, holding the theatre mask */}
          <path d="M 270 225 C 315 260, 335 320, 325 380 C 315 425, 295 420, 280 375 C 270 330, 270 290, 260 250 Z" />
          {/* Forearm angled up to cheek/chin */}
          <path d="M 285 375 C 275 320, 270 250, 280 200 L 298 205 C 290 250, 295 320, 305 375 Z" />

          {/* Theatre Mask held beside face (Greek tragedy/comedy dramatic mask) */}
          <g
            transform="translate(265, 110) rotate(-12)"
            fill="#1e1e1e"
            stroke="#ffffff"
            strokeWidth="2.5"
            style={{ filter: 'drop-shadow(4px 8px 10px rgba(0,0,0,0.35))' }}
          >
            {/* Mask Face contour */}
            <path
              d="M 15 5 C 35 -5, 65 -5, 80 15 C 95 35, 90 70, 75 95 C 60 115, 35 115, 20 100 C 5 85, 0 35, 15 5 Z"
              fill="#222222"
            />
            {/* Mask eye cutouts */}
            <ellipse cx="40" cy="38" rx="8" ry="12" fill="#ffffff" stroke="none" />
            <ellipse cx="66" cy="36" rx="8" ry="12" fill="#ffffff" stroke="none" />
            {/* Dramatic arching mouth cutout */}
            <path d="M 32 75 Q 52 95 72 75 Z" fill="#ffffff" stroke="none" />
          </g>

          {/* Legs & Trousers cropped at bottom */}
          <path d="M 120 460 L 205 460 L 195 780 L 110 780 Z" />
          <path d="M 215 460 L 300 460 L 310 780 L 225 780 Z" />
        </svg>
      </div>
    </div>
  );
};
