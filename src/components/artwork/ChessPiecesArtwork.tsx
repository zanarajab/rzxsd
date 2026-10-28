import React from 'react';

interface ChessPieceProps {
  type?: 'king' | 'queen';
  customUrl?: string;
  scale?: number;
  rotation?: number; // degrees
  upsideDown?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const ChessPiece: React.FC<ChessPieceProps> = ({
  type = 'king',
  customUrl,
  scale = 1,
  rotation = 0,
  upsideDown = false,
  className = '',
  style = {},
}) => {
  if (customUrl) {
    return (
      <div
        className={`pointer-events-none select-none inline-block ${className}`}
        style={{
          transform: `scale(${scale}) rotate(${rotation}deg) ${upsideDown ? 'scaleY(-1)' : ''}`,
          filter: 'drop-shadow(14px 24px 28px rgba(0, 0, 0, 0.35))',
          ...style,
        }}
      >
        <img
          src={customUrl}
          alt={`Chess ${type}`}
          referrerPolicy="no-referrer"
          className="w-40 h-auto object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className={`pointer-events-none select-none inline-block ${className}`}
      style={{
        transform: `scale(${scale}) rotate(${rotation}deg) ${upsideDown ? 'scaleY(-1)' : ''}`,
        filter: 'drop-shadow(16px 28px 32px rgba(0, 0, 0, 0.32)) drop-shadow(4px 8px 12px rgba(0, 0, 0, 0.15))',
        ...style,
      }}
    >
      <svg
        width="180"
        height="320"
        viewBox="0 0 180 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Polished Chrome/Silver Gradients */}
          <linearGradient id="chromeBody" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d2d2d2" />
            <stop offset="25%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#ababab" />
            <stop offset="85%" stopColor="#e8e8e8" />
            <stop offset="100%" stopColor="#757575" />
          </linearGradient>

          <linearGradient id="chromeSpecular" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#b0b0b0" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#555555" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="collarRing" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#cccccc" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#606060" />
          </linearGradient>
        </defs>

        {/* --- KING CROSS FINIAL --- */}
        {type === 'king' && (
          <g transform="translate(90, 22)">
            {/* Cross vertical */}
            <rect x="-4" y="-18" width="8" height="22" rx="1.5" fill="url(#chromeBody)" />
            {/* Cross horizontal */}
            <rect x="-12" y="-12" width="24" height="6.5" rx="1.5" fill="url(#chromeBody)" />
            {/* Cross center jewel */}
            <circle cx="0" cy="-9" r="3" fill="#ffffff" />
          </g>
        )}

        {/* --- HEAD / CROWN --- */}
        {type === 'king' ? (
          <g id="king-crown">
            <ellipse cx="90" cy="35" rx="14" ry="7" fill="url(#collarRing)" />
            <path
              d="M 64 68 C 62 48, 76 38, 90 38 C 104 38, 118 48, 116 68 Z"
              fill="url(#chromeBody)"
            />
            {/* Crown flare petals */}
            <path d="M 64 68 L 56 50 L 70 56 L 90 46 L 110 56 L 124 50 L 116 68 Z" fill="url(#chromeSpecular)" />
          </g>
        ) : (
          <g id="queen-crown">
            <circle cx="90" cy="22" r="6" fill="url(#chromeBody)" />
            <path
              d="M 60 65 L 52 42 L 68 52 L 90 38 L 112 52 L 128 42 L 120 65 Z"
              fill="url(#chromeBody)"
            />
          </g>
        )}

        {/* Crown base collar */}
        <ellipse cx="90" cy="72" rx="34" ry="8" fill="url(#collarRing)" />
        <ellipse cx="90" cy="82" rx="28" ry="7" fill="url(#chromeBody)" />

        {/* --- SLENDER WAIST / NECK --- */}
        <path
          d="M 72 84 C 74 125, 70 170, 52 225 L 128 225 C 110 170, 106 125, 108 84 Z"
          fill="url(#chromeBody)"
        />

        {/* Neck central specular vertical sheen */}
        <path
          d="M 85 86 C 87 125, 85 170, 78 225 L 94 225 C 99 170, 97 125, 95 86 Z"
          fill="#ffffff"
          opacity="0.45"
        />

        {/* --- TIERED PEDESTAL & BASE --- */}
        {/* Tier 1 Ring */}
        <ellipse cx="90" cy="226" rx="42" ry="9" fill="url(#collarRing)" />
        <path d="M 48 226 L 44 246 C 44 252, 65 257, 90 257 C 115 257, 136 252, 136 246 L 132 226 Z" fill="url(#chromeBody)" />

        {/* Tier 2 Ring */}
        <ellipse cx="90" cy="248" rx="48" ry="10" fill="url(#collarRing)" />
        <path d="M 42 248 L 34 285 C 34 293, 59 300, 90 300 C 121 300, 146 293, 146 285 L 138 248 Z" fill="url(#chromeBody)" />

        {/* Bottom weighted base lip */}
        <ellipse cx="90" cy="286" rx="58" ry="12" fill="url(#collarRing)" />
        <path d="M 32 286 L 30 304 C 30 312, 57 318, 90 318 C 123 318, 150 312, 150 304 L 148 286 Z" fill="url(#chromeSpecular)" />
        <ellipse cx="90" cy="304" rx="60" ry="13" fill="#3a3a3a" />
      </svg>
    </div>
  );
};
