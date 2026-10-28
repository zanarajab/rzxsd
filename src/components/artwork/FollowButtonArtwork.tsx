import React from 'react';

interface FollowButtonArtworkProps {
  label?: string;
  isPressed?: boolean;
  opacity?: number;
  translateY?: number;
}

export const FollowButtonArtwork: React.FC<FollowButtonArtworkProps> = ({
  label = 'FOLLOW',
  isPressed = false,
  opacity = 1,
  translateY = 0,
}) => {
  return (
    <div
      className="pointer-events-none absolute left-1/2 z-20 -translate-x-1/2 transition-all duration-150"
      style={{
        top: '66%',
        transform: `translate(-50%, calc(-50% + ${translateY}px + ${isPressed ? '4px' : '0px'}))`,
        opacity,
      }}
    >
      {/* 3D Stacked-Card Paper-Cut Outlined Button */}
      <div className="relative">
        {/* Deep Stacked Shadow Card Base */}
        <div
          className="absolute inset-0 rounded-2xl bg-[#1e1e1e] transition-all"
          style={{
            transform: isPressed ? 'translate(2px, 2px)' : 'translate(6px, 8px)',
            filter: 'blur(3px)',
            opacity: 0.35,
          }}
        />

        {/* Mid-Elevation Rim */}
        <div
          className="absolute inset-0 rounded-2xl bg-[#000000] transition-all"
          style={{
            transform: isPressed ? 'translate(1px, 2px)' : 'translate(4px, 5px)',
          }}
        />

        {/* Top White Face with Thick Black Outline */}
        <div
          className="relative px-14 py-4 rounded-2xl bg-white border-[3px] border-black flex items-center justify-center transition-transform"
          style={{
            minWidth: '220px',
          }}
        >
          <span
            className="text-black font-extrabold tracking-widest text-2xl select-none"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            {label}
          </span>
        </div>
      </div>
    </div>
  );
};
