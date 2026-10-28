import React from 'react';

interface CrumpledPaperBinProps {
  customUrl?: string;
  opacity?: number;
}

export const CrumpledPaperBin: React.FC<CrumpledPaperBinProps> = ({
  customUrl,
  opacity = 1,
}) => {
  if (customUrl) {
    return (
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-[280px] h-[320px] overflow-hidden z-10"
        style={{
          opacity,
          filter: 'drop-shadow(-8px -12px 20px rgba(0,0,0,0.18))',
        }}
      >
        <img
          src={customUrl}
          alt="Crumpled Paper in Bin"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none absolute bottom-[-20px] right-[-20px] w-[300px] h-[340px] z-10 transition-opacity"
      style={{
        opacity,
        filter: 'drop-shadow(-12px -16px 24px rgba(0, 0, 0, 0.22))',
      }}
    >
      {/* Soft blur at top-left corner as specified */}
      <div
        className="absolute top-0 left-0 w-32 h-32 rounded-full bg-white/40 pointer-events-none"
        style={{ filter: 'blur(16px)' }}
      />

      <svg viewBox="0 0 300 340" className="w-full h-full" fill="none">
        <defs>
          <linearGradient id="binRimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9e9e9e" />
            <stop offset="50%" stopColor="#d5d5d5" />
            <stop offset="100%" stopColor="#757575" />
          </linearGradient>
          <linearGradient id="paperFacet1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#c5c5c5" />
          </linearGradient>
          <linearGradient id="paperFacet2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#dcdcdc" />
            <stop offset="100%" stopColor="#989898" />
          </linearGradient>
          <linearGradient id="paperFacet3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ececec" />
            <stop offset="100%" stopColor="#b4b4b4" />
          </linearGradient>
        </defs>

        {/* Wire mesh bin body */}
        <path d="M 60 160 L 90 320 L 290 320 L 280 160 Z" fill="#2d2d2d" opacity="0.12" />
        {/* Wire grid ribs */}
        <g stroke="#909090" strokeWidth="2.2" opacity="0.6">
          <line x1="100" y1="160" x2="120" y2="320" />
          <line x1="140" y1="160" x2="155" y2="320" />
          <line x1="180" y1="160" x2="190" y2="320" />
          <line x1="220" y1="160" x2="225" y2="320" />
          <line x1="260" y1="160" x2="260" y2="320" />
          <ellipse cx="170" cy="160" rx="110" ry="14" fill="none" />
          <ellipse cx="170" cy="210" rx="98" ry="12" fill="none" />
          <ellipse cx="170" cy="265" rx="88" ry="11" fill="none" />
          <ellipse cx="170" cy="318" rx="80" ry="10" fill="none" />
        </g>

        {/* Bin Top Rim */}
        <ellipse cx="170" cy="160" rx="112" ry="14" fill="url(#binRimGrad)" stroke="#666666" strokeWidth="2" />

        {/* 3D Crumpled Paper Ball sitting inside the bin */}
        <g transform="translate(110, 100)" style={{ filter: 'drop-shadow(0 8px 12px rgba(0,0,0,0.3))' }}>
          {/* Facets of origami-style 3D crumpled ball */}
          <polygon points="40,20 85,5 110,35 75,55" fill="url(#paperFacet1)" />
          <polygon points="75,55 110,35 125,70 95,85" fill="url(#paperFacet2)" />
          <polygon points="40,20 75,55 50,75 15,45" fill="url(#paperFacet3)" />
          <polygon points="50,75 95,85 85,115 35,105" fill="url(#paperFacet1)" />
          <polygon points="95,85 125,70 135,105 110,120" fill="url(#paperFacet3)" />
          <polygon points="85,115 110,120 75,135 45,125" fill="url(#paperFacet2)" />
          <polygon points="15,45 50,75 35,105 5,80" fill="url(#paperFacet2)" />
          <polygon points="85,5 120,20 110,35" fill="url(#paperFacet3)" />

          {/* Crease lines */}
          <path
            d="M 40 20 L 75 55 L 95 85 L 85 115 M 75 55 L 110 35 M 50 75 L 35 105"
            stroke="#666666"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
};
