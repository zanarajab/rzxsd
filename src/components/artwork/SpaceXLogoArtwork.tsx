import React from 'react';

interface SpaceXLogoArtworkProps {
  customUrl?: string;
  tilt?: number; // degrees
  translateX?: number; // px
  scale?: number;
}

export const SpaceXLogoArtwork: React.FC<SpaceXLogoArtworkProps> = ({
  customUrl,
  tilt = 0,
  translateX = 0,
  scale = 1,
}) => {
  if (customUrl) {
    return (
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transition-transform"
        style={{
          transform: `translate(calc(-50% + ${translateX}px), -50%) rotate(${tilt}deg) scale(${scale})`,
          filter: 'drop-shadow(16px 28px 30px rgba(0, 0, 0, 0.28)) drop-shadow(4px 8px 12px rgba(0,0,0,0.12))',
        }}
      >
        <img
          src={customUrl}
          alt="SpaceX Wordmark"
          referrerPolicy="no-referrer"
          className="w-[440px] h-auto object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 z-10 transition-transform"
      style={{
        transform: `translate(calc(-50% + ${translateX}px), calc(-50% + 40px)) rotate(${tilt}deg) scale(${scale})`,
        filter: 'drop-shadow(18px 30px 32px rgba(0, 0, 0, 0.3)) drop-shadow(4px 8px 10px rgba(0,0,0,0.12))',
      }}
    >
      <svg
        width="440"
        height="100"
        viewBox="0 0 440 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 3D Chrome Metallic Gradient */}
          <linearGradient id="metalChrome" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#d9d9d9" />
            <stop offset="48%" stopColor="#919191" />
            <stop offset="52%" stopColor="#1e1e1e" />
            <stop offset="70%" stopColor="#666666" />
            <stop offset="95%" stopColor="#c2c2c2" />
            <stop offset="100%" stopColor="#e5e5e5" />
          </linearGradient>

          {/* Deep Shadow Bevel */}
          <linearGradient id="metalBevel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#444444" />
            <stop offset="100%" stopColor="#111111" />
          </linearGradient>
        </defs>

        {/* 3D extruded drop base */}
        <g transform="translate(4, 6)" fill="url(#metalBevel)" opacity="0.75">
          <text
            x="20"
            y="70"
            fontFamily="Arial, Helvetica, sans-serif"
            fontWeight="900"
            fontSize="54"
            letterSpacing="8px"
          >
            SPACEX
          </text>
        </g>

        {/* Primary Chrome Surface */}
        <g fill="url(#metalChrome)">
          <text
            x="20"
            y="70"
            fontFamily="Arial, Helvetica, sans-serif"
            fontWeight="900"
            fontSize="54"
            letterSpacing="8px"
          >
            SPACE
          </text>
        </g>

        {/* Distinctive SpaceX curved swoosh on the 'X' */}
        <g transform="translate(320, 18)">
          {/* Main X stroke left-to-right */}
          <path
            d="M 12 10 L 48 56 L 62 56 L 26 10 Z"
            fill="url(#metalChrome)"
          />
          {/* Distinctive orbital swoosh crossing line */}
          <path
            d="M 58 10 C 25 24, 0 52, -14 74 L -4 74 C 8 56, 30 32, 70 10 Z"
            fill="url(#metalChrome)"
          />
        </g>

        {/* Top edge crisp specular highlight line */}
        <line x1="20" y1="26" x2="390" y2="26" stroke="#ffffff" strokeWidth="1.2" opacity="0.8" />
      </svg>
    </div>
  );
};
