import React from 'react';

interface BrainArtworkProps {
  customUrl?: string;
  scale?: number;
  rotation?: number; // tilt degrees
  floatOffset?: number; // px
}

export const BrainArtwork: React.FC<BrainArtworkProps> = ({
  customUrl,
  scale = 1,
  rotation = 0,
  floatOffset = 0,
}) => {
  if (customUrl) {
    return (
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        style={{
          transform: `translate(-50%, calc(-50% + ${floatOffset}px)) scale(${scale}) rotate(${rotation}deg)`,
          filter: 'drop-shadow(16px 28px 30px rgba(0, 0, 0, 0.25))',
        }}
      >
        <img
          src={customUrl}
          alt="Human Brain"
          referrerPolicy="no-referrer"
          className="w-64 h-64 object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 z-10"
      style={{
        transform: `translate(-50%, calc(-50% + 20px + ${floatOffset}px)) scale(${scale}) rotate(${rotation}deg)`,
        filter: 'drop-shadow(18px 30px 32px rgba(0, 0, 0, 0.28)) drop-shadow(4px 8px 12px rgba(0,0,0,0.12))',
      }}
    >
      <svg
        width="280"
        height="240"
        viewBox="0 0 280 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        <defs>
          <linearGradient id="brainSurfaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f5f5f5" />
            <stop offset="45%" stopColor="#dedede" />
            <stop offset="80%" stopColor="#bfbfbf" />
            <stop offset="100%" stopColor="#969696" />
          </linearGradient>
          <linearGradient id="cerebellumGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#cfcfcf" />
            <stop offset="100%" stopColor="#808080" />
          </linearGradient>
        </defs>

        {/* Brainstem / Cerebellum */}
        <g id="brain-stem">
          <ellipse cx="110" cy="190" rx="36" ry="24" fill="url(#cerebellumGrad)" />
          {/* Striations on cerebellum */}
          <path d="M 85 185 C 105 180, 125 180, 140 188" stroke="#686868" strokeWidth="2.5" fill="none" />
          <path d="M 88 193 C 108 188, 128 188, 142 195" stroke="#686868" strokeWidth="2.5" fill="none" />
          <path d="M 94 200 C 110 196, 125 196, 138 202" stroke="#686868" strokeWidth="2.5" fill="none" />
          {/* Stem */}
          <path d="M 125 195 C 128 215, 134 235, 145 240 L 160 238 C 150 225, 145 205, 142 190 Z" fill="#999999" />
        </g>

        {/* Main Cerebrum Hemisphere (Cerebral Cortex) */}
        <path
          d="M 50 145 C 30 110, 45 60, 95 35 C 145 10, 205 20, 240 60 C 265 90, 260 140, 235 165 C 210 190, 180 185, 160 180 C 140 175, 115 185, 90 180 C 65 175, 55 160, 50 145 Z"
          fill="url(#brainSurfaceGrad)"
        />

        {/* Gyri & Sulci (Sculpted anatomical folds with dual highlight / shadow lines) */}
        <g strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Deep Sulcus Grooves */}
          <path d="M 90 40 C 95 65, 80 85, 105 110 C 125 130, 120 150, 110 175" stroke="#8c8c8c" strokeWidth="5.5" />
          <path d="M 135 25 C 140 50, 155 75, 140 100 C 128 120, 148 145, 150 175" stroke="#8c8c8c" strokeWidth="5.5" />
          <path d="M 185 30 C 195 55, 180 80, 200 110 C 212 128, 200 155, 185 178" stroke="#8c8c8c" strokeWidth="5.5" />
          <path d="M 60 95 C 80 90, 100 100, 120 85 C 140 70, 170 75, 190 65 C 215 55, 230 75, 245 95" stroke="#8c8c8c" strokeWidth="5" />
          <path d="M 55 125 C 75 125, 95 140, 120 135 C 150 130, 180 145, 205 135 C 225 125, 240 135, 245 150" stroke="#8c8c8c" strokeWidth="4.5" />
          <path d="M 105 150 C 115 165, 135 160, 150 168" stroke="#8c8c8c" strokeWidth="4" />

          {/* Highlights for 3D paper/clay embossed look */}
          <path d="M 91 38 C 96 63, 81 83, 106 108" stroke="#ffffff" strokeWidth="2.5" opacity="0.8" />
          <path d="M 136 23 C 141 48, 156 73, 141 98" stroke="#ffffff" strokeWidth="2.5" opacity="0.8" />
          <path d="M 186 28 C 196 53, 181 78, 201 108" stroke="#ffffff" strokeWidth="2.5" opacity="0.8" />
          <path d="M 62 92 C 82 87, 102 97, 122 82" stroke="#ffffff" strokeWidth="2.5" opacity="0.8" />
        </g>
      </svg>
    </div>
  );
};
