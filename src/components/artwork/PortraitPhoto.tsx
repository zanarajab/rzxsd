import React from 'react';

interface PortraitPhotoProps {
  variant: 'visionary-suit' | 'innovator-presenting';
  customUrl?: string;
  zoom?: number;
  opacity?: number;
}

export const PortraitPhoto: React.FC<PortraitPhotoProps> = ({
  variant,
  customUrl,
  zoom = 1,
  opacity = 1,
}) => {
  if (customUrl) {
    return (
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[380px] h-[460px] rounded-3xl overflow-hidden flex items-center justify-center transition-opacity"
        style={{
          transform: `translate(-50%, -50%) scale(${zoom})`,
          opacity,
          filter: 'drop-shadow(16px 28px 30px rgba(0, 0, 0, 0.28)) drop-shadow(4px 8px 12px rgba(0,0,0,0.12))',
        }}
      >
        <img
          src={customUrl}
          alt={variant}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover filter grayscale contrast-125 brightness-95"
        />
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[360px] h-[440px] rounded-3xl overflow-hidden transition-all duration-300"
      style={{
        transform: `translate(-50%, -50%) scale(${zoom})`,
        opacity,
        filter: 'drop-shadow(18px 32px 32px rgba(0, 0, 0, 0.25)) drop-shadow(4px 10px 14px rgba(0,0,0,0.12))',
        background: '#ffffff',
      }}
    >
      {/* High-fidelity monochrome editorial duotone portrait vector artwork */}
      {variant === 'visionary-suit' ? (
        <svg viewBox="0 0 360 440" className="w-full h-full" fill="none">
          <defs>
            <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#222222" />
              <stop offset="60%" stopColor="#141414" />
              <stop offset="100%" stopColor="#080808" />
            </linearGradient>
            <linearGradient id="faceGrad" x1="20%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#f3f3f3" />
              <stop offset="45%" stopColor="#dfdfdf" />
              <stop offset="80%" stopColor="#b8b8b8" />
              <stop offset="100%" stopColor="#7a7a7a" />
            </linearGradient>
            <radialGradient id="vignette" cx="50%" cy="50%" r="50%">
              <stop offset="65%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
            </radialGradient>
          </defs>

          {/* Background studio backdrop */}
          <rect width="360" height="440" fill="#f0f0f0" />
          <circle cx="180" cy="180" r="160" fill="#e4e4e4" />

          {/* Shoulders & Dark Suit */}
          <path
            d="M 20 440 L 40 310 C 65 250, 110 240, 180 240 C 250 240, 295 250, 320 310 L 340 440 Z"
            fill="url(#suitGrad)"
          />
          {/* Lapel details */}
          <path d="M 125 242 L 155 350 L 180 370 L 150 242 Z" fill="#2d2d2d" />
          <path d="M 235 242 L 205 350 L 180 370 L 210 242 Z" fill="#1b1b1b" />

          {/* White collared shirt & dark tie */}
          <polygon points="155,242 180,295 205,242" fill="#ffffff" />
          <polygon points="174,260 186,260 190,400 170,400" fill="#181818" />

          {/* Neck */}
          <path d="M 152 210 L 152 255 L 208 255 L 208 210 Z" fill="#d0d0d0" />
          <path d="M 152 230 C 165 248, 195 248, 208 230 L 208 255 L 152 255 Z" fill="#a0a0a0" opacity="0.6" />

          {/* Face structure */}
          <path
            d="M 130 145 C 130 90, 145 70, 180 70 C 215 70, 230 90, 230 145 C 230 195, 205 225, 180 225 C 155 225, 130 195, 130 145 Z"
            fill="url(#faceGrad)"
          />

          {/* Hair cut */}
          <path
            d="M 128 130 C 125 80, 145 55, 180 55 C 215 55, 235 80, 232 130 C 225 90, 215 75, 180 75 C 145 75, 135 90, 128 130 Z"
            fill="#151515"
          />

          {/* Eyes & Eyebrows (Focused, visionary intense gaze) */}
          <path d="M 148 130 Q 160 126 168 132" stroke="#222222" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 192 132 Q 200 126 212 130" stroke="#222222" strokeWidth="3" fill="none" strokeLinecap="round" />
          <ellipse cx="158" cy="140" rx="6" ry="4" fill="#1a1a1a" />
          <ellipse cx="202" cy="140" rx="6" ry="4" fill="#1a1a1a" />
          <circle cx="156" cy="138" r="1.5" fill="#ffffff" />
          <circle cx="200" cy="138" r="1.5" fill="#ffffff" />

          {/* Nose shadow & bridge */}
          <path d="M 180 135 L 176 165 L 184 165" stroke="#757575" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* Mouth & subtle determined set */}
          <path d="M 166 188 Q 180 192 194 188" stroke="#3d3d3d" strokeWidth="3" fill="none" strokeLinecap="round" />

          {/* Subtle vignette border */}
          <rect width="360" height="440" fill="url(#vignette)" />
        </svg>
      ) : (
        /* Innovator portrait presenting (Scene 19) */
        <svg viewBox="0 0 360 440" className="w-full h-full" fill="none">
          <defs>
            <linearGradient id="blazerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7a7a7a" />
              <stop offset="50%" stopColor="#555555" />
              <stop offset="100%" stopColor="#333333" />
            </linearGradient>
            <linearGradient id="faceGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f8f8f8" />
              <stop offset="50%" stopColor="#d9d9d9" />
              <stop offset="100%" stopColor="#9e9e9e" />
            </linearGradient>
          </defs>

          {/* Studio background */}
          <rect width="360" height="440" fill="#f4f4f4" />
          <circle cx="170" cy="160" r="140" fill="#e9e9e9" />

          {/* Blazer & Body */}
          <path
            d="M 30 440 L 55 290 C 80 240, 120 230, 180 230 C 240 230, 270 245, 290 290 L 320 440 Z"
            fill="url(#blazerGrad)"
          />
          {/* Dark inner shirt */}
          <polygon points="150,230 180,330 210,230" fill="#1a1a1a" />

          {/* Neck & Face */}
          <rect x="160" y="195" width="40" height="45" fill="#d2d2d2" />
          <path
            d="M 140 135 C 140 85, 150 65, 180 65 C 210 65, 220 85, 220 135 C 220 185, 205 210, 180 210 C 155 210, 140 185, 140 135 Z"
            fill="url(#faceGrad2)"
          />

          {/* Modern hairstyle */}
          <path
            d="M 136 120 C 134 75, 150 50, 185 50 C 218 50, 228 72, 222 120 C 215 80, 200 68, 180 68 C 150 68, 142 85, 136 120 Z"
            fill="#222222"
          />

          {/* Eyebrows & Eyes (Open, expressive communicator) */}
          <path d="M 152 122 Q 162 118 170 122" stroke="#262626" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 190 122 Q 198 118 208 122" stroke="#262626" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <circle cx="162" cy="132" r="4.5" fill="#1b1b1b" />
          <circle cx="198" cy="132" r="4.5" fill="#1b1b1b" />

          {/* Smile / presentation expression */}
          <path d="M 168 174 Q 180 184 192 174" stroke="#333333" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* Extended arm and hand in presenting gesture */}
          <path
            d="M 270 270 C 295 285, 320 310, 335 340 L 320 355 C 300 325, 280 305, 260 290 Z"
            fill="url(#blazerGrad)"
          />
          {/* Presenting open palm hand */}
          <g transform="translate(315, 310) rotate(-20)" fill="#e0e0e0" stroke="#777777" strokeWidth="1.5">
            <ellipse cx="20" cy="18" rx="14" ry="10" />
            <path d="M 28 12 L 40 8 L 42 14 L 30 18 Z" />
            <path d="M 32 18 L 46 16 L 46 22 L 32 22 Z" />
            <path d="M 30 24 L 44 26 L 42 32 L 28 28 Z" />
          </g>
        </svg>
      )}
    </div>
  );
};
