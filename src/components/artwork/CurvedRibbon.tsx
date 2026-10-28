import React from 'react';

interface CurvedRibbonProps {
  variant?: 'scene1' | 'scene4';
  progress?: number;
}

export const CurvedRibbon: React.FC<CurvedRibbonProps> = ({ variant = 'scene1', progress = 0 }) => {
  if (variant === 'scene1') {
    return (
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        style={{
          transform: `translateY(${progress * -30}px) translateX(${progress * 20}px)`,
          filter: 'drop-shadow(10px 20px 25px rgba(0,0,0,0.12))',
        }}
      >
        <svg
          viewBox="0 0 720 1280"
          className="w-full h-full"
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <linearGradient id="ribbonGrad1" x1="10%" y1="90%" x2="90%" y2="10%">
              <stop offset="0%" stopColor="#dcdcdc" stopOpacity="0.85" />
              <stop offset="45%" stopColor="#efefef" stopOpacity="0.9" />
              <stop offset="75%" stopColor="#cecece" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#b4b4b4" stopOpacity="0.75" />
            </linearGradient>
          </defs>
          <path
            d="M -120 1080 C 120 840, 240 600, 380 420 C 520 240, 680 180, 840 80 L 840 200 C 680 300, 500 400, 360 580 C 220 760, 60 980, -120 1200 Z"
            fill="url(#ribbonGrad1)"
          />
        </svg>
      </div>
    );
  }

  // Scene 4 ribbon: sweeps from bottom-right to upper-left behind the ChatGPT logo
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{
        transform: `translateY(${progress * 25}px) scale(${1 + progress * 0.05})`,
        filter: 'drop-shadow(12px 24px 30px rgba(0,0,0,0.14))',
      }}
    >
      <svg
        viewBox="0 0 720 1280"
        className="w-full h-full"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="ribbonGrad4" x1="85%" y1="85%" x2="15%" y2="15%">
            <stop offset="0%" stopColor="#cfcfcf" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#f4f4f4" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#bcbcbc" stopOpacity="0.85" />
          </linearGradient>
        </defs>
        <path
          d="M 860 1100 C 680 920, 540 680, 340 500 C 140 320, 40 220, -140 120 L -140 250 C 40 360, 160 480, 360 680 C 560 880, 680 1050, 860 1250 Z"
          fill="url(#ribbonGrad4)"
        />
      </svg>
    </div>
  );
};
