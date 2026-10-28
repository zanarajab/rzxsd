import React from 'react';

interface ShuttleArtworkProps {
  customUrl?: string;
  className?: string;
  scale?: number;
  rotation?: number; // degrees
  tilt?: number;
}

export const ShuttleArtwork: React.FC<ShuttleArtworkProps> = ({
  customUrl,
  className = '',
  scale = 1,
  rotation = 0,
}) => {
  if (customUrl) {
    return (
      <div
        className={`relative inline-block ${className}`}
        style={{
          transform: `scale(${scale}) rotate(${rotation}deg)`,
          filter: 'drop-shadow(16px 28px 24px rgba(0, 0, 0, 0.22)) drop-shadow(4px 8px 10px rgba(0,0,0,0.12))',
        }}
      >
        <img
          src={customUrl}
          alt="Space Shuttle"
          referrerPolicy="no-referrer"
          className="w-full h-auto object-contain max-h-[500px]"
        />
      </div>
    );
  }

  // 3D Soft-Clay monochrome Space Shuttle render with boosters and external tank
  return (
    <div
      className={`relative inline-block select-none ${className}`}
      style={{
        transform: `scale(${scale}) rotate(${rotation}deg)`,
        filter: 'drop-shadow(20px 32px 30px rgba(0, 0, 0, 0.25)) drop-shadow(6px 10px 12px rgba(0, 0, 0, 0.15))',
        transition: 'transform 0.1s linear',
      }}
    >
      <svg
        width="260"
        height="440"
        viewBox="0 0 260 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        <defs>
          {/* Main Tank Gradient */}
          <linearGradient id="tankGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d8d8d8" />
            <stop offset="35%" stopColor="#f3f3f3" />
            <stop offset="70%" stopColor="#c5c5c5" />
            <stop offset="100%" stopColor="#9a9a9a" />
          </linearGradient>

          {/* Booster Gradient Left */}
          <linearGradient id="boosterGradLeft" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e5e5e5" />
            <stop offset="45%" stopColor="#ffffff" />
            <stop offset="85%" stopColor="#bcbcbc" />
            <stop offset="100%" stopColor="#8c8c8c" />
          </linearGradient>

          {/* Booster Gradient Right */}
          <linearGradient id="boosterGradRight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#dddddd" />
            <stop offset="40%" stopColor="#f8f8f8" />
            <stop offset="80%" stopColor="#b4b4b4" />
            <stop offset="100%" stopColor="#7a7a7a" />
          </linearGradient>

          {/* Orbiter Fuselage Gradient */}
          <linearGradient id="orbiterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#f0f0f0" />
            <stop offset="85%" stopColor="#cccccc" />
            <stop offset="100%" stopColor="#9e9e9e" />
          </linearGradient>

          {/* Wing Gradient */}
          <linearGradient id="wingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e6e6e6" />
            <stop offset="100%" stopColor="#afafaf" />
          </linearGradient>
        </defs>

        {/* --- LEFT SOLID ROCKET BOOSTER --- */}
        <g id="booster-left">
          {/* Cone Nose */}
          <path
            d="M 52 110 C 52 75 66 50 66 50 C 66 50 80 75 80 110 Z"
            fill="url(#boosterGradLeft)"
          />
          {/* Cylinder Body */}
          <rect x="52" y="110" width="28" height="240" rx="4" fill="url(#boosterGradLeft)" />
          {/* Ribs / Joint Bands */}
          <rect x="50" y="150" width="32" height="4" rx="1" fill="#757575" />
          <rect x="50" y="230" width="32" height="4" rx="1" fill="#757575" />
          <rect x="50" y="310" width="32" height="4" rx="1" fill="#757575" />
          {/* Nozzle Flairs */}
          <path d="M 50 350 L 46 385 L 86 385 L 82 350 Z" fill="#666666" />
        </g>

        {/* --- RIGHT SOLID ROCKET BOOSTER --- */}
        <g id="booster-right">
          {/* Cone Nose */}
          <path
            d="M 180 110 C 180 75 194 50 194 50 C 194 50 208 75 208 110 Z"
            fill="url(#boosterGradRight)"
          />
          {/* Cylinder Body */}
          <rect x="180" y="110" width="28" height="240" rx="4" fill="url(#boosterGradRight)" />
          {/* Ribs / Joint Bands */}
          <rect x="178" y="150" width="32" height="4" rx="1" fill="#6e6e6e" />
          <rect x="178" y="230" width="32" height="4" rx="1" fill="#6e6e6e" />
          <rect x="178" y="310" width="32" height="4" rx="1" fill="#6e6e6e" />
          {/* Nozzle Flairs */}
          <path d="M 178 350 L 174 385 L 214 385 L 210 350 Z" fill="#5c5c5c" />
        </g>

        {/* --- CENTRAL EXTERNAL FUEL TANK --- */}
        <g id="external-tank">
          {/* Nose ogive */}
          <path
            d="M 96 90 C 96 35 130 15 130 15 C 130 15 164 35 164 90 Z"
            fill="url(#tankGrad)"
          />
          {/* Tank Cylinder */}
          <rect x="96" y="90" width="68" height="275" rx="6" fill="url(#tankGrad)" />
          {/* Rounded base */}
          <ellipse cx="130" cy="365" rx="34" ry="12" fill="#888888" />
        </g>

        {/* --- ORBITER (SPACE SHUTTLE) In Center Foreground --- */}
        <g id="shuttle-orbiter" style={{ filter: 'drop-shadow(0 14px 16px rgba(0,0,0,0.3))' }}>
          {/* Delta Wings */}
          <path
            d="M 130 170 L 45 340 L 95 340 L 130 315 L 165 340 L 215 340 Z"
            fill="url(#wingGrad)"
          />
          {/* Wing Black Leading Edge Thermal Protection */}
          <path d="M 130 170 L 45 340 L 52 342 L 130 178 Z" fill="#333333" />
          <path d="M 130 170 L 215 340 L 208 342 L 130 178 Z" fill="#333333" />

          {/* Fuselage / Cockpit */}
          <path
            d="M 130 135 C 112 155 110 200 110 330 L 150 330 C 150 200 148 155 130 135 Z"
            fill="url(#orbiterGrad)"
          />
          {/* Cockpit Black Nose Cap */}
          <path
            d="M 130 135 C 122 144 121 154 121 162 L 139 162 C 139 154 138 144 130 135 Z"
            fill="#262626"
          />
          {/* Cockpit Window Visors */}
          <path
            d="M 124 166 L 129 164 L 129 171 L 124 172 Z"
            fill="#151515"
          />
          <path
            d="M 131 164 L 136 166 L 136 172 L 131 171 Z"
            fill="#151515"
          />

          {/* Vertical Tail Fin */}
          <path
            d="M 128 245 L 128 325 L 132 325 L 132 245 Z"
            fill="#e2e2e2"
          />
          <path
            d="M 128 245 L 128 325 L 122 325 Z"
            fill="#b5b5b5"
          />

          {/* Engine Pods & Nozzles */}
          <circle cx="123" cy="334" r="5" fill="#444444" />
          <circle cx="137" cy="334" r="5" fill="#444444" />
          <circle cx="130" cy="326" r="5" fill="#555555" />
        </g>
      </svg>
    </div>
  );
};
