import React from 'react';

interface SilhouettePitchProps {
  customUrl?: string;
  zoom?: number;
  isBlurred?: boolean;
}

export const SilhouettePitch: React.FC<SilhouettePitchProps> = ({
  customUrl,
  zoom = 1,
  isBlurred = false,
}) => {
  if (customUrl) {
    return (
      <div
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center overflow-hidden transition-all duration-300"
        style={{
          transform: `scale(${zoom})`,
          filter: isBlurred ? 'blur(12px) opacity(0.5)' : 'none',
        }}
      >
        <img
          src={customUrl}
          alt="Pitching Silhouette"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden transition-all duration-500"
      style={{
        transform: `scale(${zoom})`,
        filter: isBlurred ? 'blur(8px) opacity(0.6)' : 'none',
      }}
    >
      {/* Curved grey stage band at mid-left */}
      <svg
        viewBox="0 0 720 1280"
        className="w-full h-full absolute inset-0"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M -40 760 C 140 740, 260 760, 420 810 L 420 880 C 260 830, 140 810, -40 830 Z"
          fill="#c0c0c0"
          style={{ filter: 'drop-shadow(0 12px 16px rgba(0,0,0,0.12))' }}
        />
      </svg>

      {/* Main Businessman Silhouette pointing up (approx 60% of screen height) */}
      <div
        className="absolute left-[8%] bottom-[16%] w-[380px] h-[640px]"
        style={{
          filter: 'drop-shadow(14px 20px 22px rgba(0, 0, 0, 0.28))',
        }}
      >
        <svg viewBox="0 0 380 640" className="w-full h-full" fill="#111111">
          {/* Head & Neck */}
          <ellipse cx="140" cy="95" rx="36" ry="46" />
          <path d="M 125 135 L 155 135 L 160 170 L 120 170 Z" />

          {/* White shirt collar wedge / thin tie accent */}
          <path d="M 132 170 L 148 170 L 143 235 L 137 235 Z" fill="#2b2b2b" />
          <path d="M 138 170 L 142 170 L 141 215 L 139 215 Z" fill="#efefef" />

          {/* Torso & Suit Jacket */}
          <path d="M 85 170 C 85 170, 130 160, 195 170 C 220 220, 215 320, 205 380 L 75 380 C 65 320, 60 220, 85 170 Z" />

          {/* Left Arm (hand in pocket / on hip) */}
          <path d="M 85 175 C 60 210, 45 260, 52 320 C 58 355, 78 355, 82 335 C 80 290, 85 240, 105 190 Z" />

          {/* Right Arm raised with index finger pointing up */}
          {/* Shoulder -> Bicep -> Forearm raised high */}
          <path d="M 195 170 C 225 180, 255 170, 275 140 C 290 115, 292 70, 290 35 L 274 35 C 274 65, 272 105, 260 125 C 245 145, 225 155, 200 155 Z" />
          {/* Pointing index finger */}
          <path d="M 276 35 L 276 8 C 276 5, 284 5, 284 8 L 284 35 Z" />
          {/* Thumb & curled fingers */}
          <path d="M 284 25 C 295 28, 295 40, 286 42 Z" />

          {/* Legs & Trousers */}
          <path d="M 82 380 L 135 380 L 130 640 L 75 640 Z" />
          <path d="M 145 380 L 198 380 L 205 640 L 150 640 Z" />
        </svg>
      </div>

      {/* Foreground audience silhouette heads at the bottom (blurry, partially cropped) */}
      <div
        className="absolute bottom-[-40px] left-[15%] w-[220px] h-[220px] rounded-full bg-[#181818]"
        style={{
          filter: 'blur(8px) drop-shadow(0 -10px 15px rgba(0,0,0,0.5))',
        }}
      />
      <div
        className="absolute bottom-[-60px] right-[8%] w-[260px] h-[260px] rounded-full bg-[#0d0d0d]"
        style={{
          filter: 'blur(10px) drop-shadow(0 -10px 15px rgba(0,0,0,0.6))',
        }}
      />
    </div>
  );
};
