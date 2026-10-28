import React from 'react';

interface SilhouettePowerProps {
  customUrl?: string;
  zoom?: number;
}

export const SilhouettePower: React.FC<SilhouettePowerProps> = ({
  customUrl,
  zoom = 1,
}) => {
  if (customUrl) {
    return (
      <div
        className="pointer-events-none absolute inset-0 z-10 overflow-hidden flex items-end justify-center"
        style={{
          transform: `scale(${zoom})`,
        }}
      >
        <img
          src={customUrl}
          alt="Critics Power Pose"
          referrerPolicy="no-referrer"
          className="max-h-[65%] object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
      style={{
        transform: `scale(${zoom})`,
        transition: 'transform 0.2s linear',
      }}
    >
      {/* Big dark-grey semicircle/hill rising from bottom */}
      <svg
        viewBox="0 0 720 1280"
        className="w-full h-full absolute inset-0 pointer-events-none"
        preserveAspectRatio="none"
      >
        <ellipse
          cx="360"
          cy="1260"
          rx="440"
          ry="320"
          fill="#333333"
          style={{ filter: 'drop-shadow(0 -16px 24px rgba(0,0,0,0.22))' }}
        />
      </svg>

      {/* Confident power pose silhouette with hands on hips, legs apart, thin white rim-light on edges */}
      <div
        className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[420px] h-[580px]"
        style={{
          filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.4))',
        }}
      >
        <svg
          viewBox="0 0 420 580"
          className="w-full h-full"
          fill="#0c0c0c"
          stroke="#efefef"
          strokeWidth="1.2"
        >
          {/* Head & Neck */}
          <ellipse cx="210" cy="80" rx="34" ry="44" />
          <path d="M 198 120 L 222 120 L 226 150 L 194 150 Z" />

          {/* Broad Shoulders & Torso */}
          <path d="M 115 150 C 140 140, 280 140, 305 150 C 315 210, 275 320, 270 340 L 150 340 C 145 320, 105 210, 115 150 Z" />

          {/* Left Arm: Hand on Hip (bent elbow out wide) */}
          <path d="M 120 155 C 65 190, 40 240, 65 290 C 85 325, 120 330, 145 320 L 140 300 C 120 305, 95 300, 80 275 C 65 240, 85 200, 130 170 Z" />

          {/* Right Arm: Hand on Hip (bent elbow out wide) */}
          <path d="M 300 155 C 355 190, 380 240, 355 290 C 335 325, 300 330, 275 320 L 280 300 C 300 305, 325 300, 340 275 C 355 240, 335 200, 290 170 Z" />

          {/* Power Stance Legs (wide apart, rooted) */}
          {/* Left Leg */}
          <path d="M 152 340 L 195 340 L 145 580 L 95 580 Z" />
          {/* Right Leg */}
          <path d="M 225 340 L 268 340 L 325 580 L 275 580 Z" />
        </svg>
      </div>
    </div>
  );
};
