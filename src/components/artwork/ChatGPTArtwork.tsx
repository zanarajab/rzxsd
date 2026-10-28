import React from 'react';

interface ChatGPTArtworkProps {
  customUrl?: string;
  variant?: '3d-app-icon' | 'outline-logo';
  scale?: number;
  rotation?: number; // degrees
  translateX?: number; // px
  translateY?: number; // px
  floatOffset?: number; // px
}

export const ChatGPTArtwork: React.FC<ChatGPTArtworkProps> = ({
  customUrl,
  variant = '3d-app-icon',
  scale = 1,
  rotation = 0,
  translateX = 0,
  translateY = 0,
  floatOffset = 0,
}) => {
  if (customUrl) {
    return (
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-transform"
        style={{
          transform: `translate(calc(-50% + ${translateX}px), calc(-50% + ${translateY + floatOffset}px)) scale(${scale}) rotate(${rotation}deg)`,
          filter: 'drop-shadow(12px 24px 28px rgba(0, 0, 0, 0.22))',
        }}
      >
        <img
          src={customUrl}
          alt="ChatGPT Logo"
          referrerPolicy="no-referrer"
          className="w-48 h-48 object-contain"
        />
      </div>
    );
  }

  // Knot path definition
  const KnotSvg = ({ strokeColor = '#ffffff', strokeWidth = 14, fill = 'none' }: { strokeColor?: string; strokeWidth?: number; fill?: string }) => (
    <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
      <g
        transform="translate(100, 100)"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={fill}
      >
        {/* 6 radial swirling petals forming the iconic spiral knot */}
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <path
            key={deg}
            transform={`rotate(${deg})`}
            d="M 0 -22 C 14 -22, 28 -14, 35 0 C 44 18, 42 42, 26 55 C 16 63, 2 63, -12 55 L -35 42 C -45 36, -50 24, -46 12 C -42 0, -30 -8, -18 -8 L 0 -8"
          />
        ))}
      </g>
    </svg>
  );

  if (variant === '3d-app-icon') {
    return (
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 transition-transform"
        style={{
          transform: `translate(calc(-50% + ${translateX}px), calc(-50% + ${translateY + floatOffset}px)) scale(${scale}) rotate(${rotation}deg)`,
          filter: 'drop-shadow(14px 28px 30px rgba(0, 0, 0, 0.25)) drop-shadow(4px 8px 12px rgba(0,0,0,0.12))',
        }}
      >
        {/* Rounded square embossed tile */}
        <div
          className="w-44 h-44 rounded-3xl p-6 flex items-center justify-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #e8e8e8 0%, #d0d0d0 50%, #b8b8b8 100%)',
            boxShadow: 'inset 2px 2px 5px rgba(255,255,255,0.8), inset -3px -3px 7px rgba(0,0,0,0.2)',
          }}
        >
          {/* Subtle inner highlight rim */}
          <div className="absolute inset-0 rounded-3xl border border-white/60 pointer-events-none" />
          <div className="w-28 h-28 filter drop-shadow(0 4px 6px rgba(0,0,0,0.2))">
            <KnotSvg strokeColor="#ffffff" strokeWidth={15} />
          </div>
        </div>
      </div>
    );
  }

  // Flat black outline logo with thick black strokes + soft shadow
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 z-10 transition-transform"
      style={{
        transform: `translate(calc(-50% + ${translateX}px), calc(-50% + ${translateY + floatOffset}px)) scale(${scale}) rotate(${rotation}deg)`,
        filter: 'drop-shadow(12px 24px 24px rgba(0, 0, 0, 0.35)) drop-shadow(2px 6px 8px rgba(0,0,0,0.15))',
      }}
    >
      <div className="w-52 h-52 flex items-center justify-center">
        <KnotSvg strokeColor="#1a1a1a" strokeWidth={15} />
      </div>
    </div>
  );
};
