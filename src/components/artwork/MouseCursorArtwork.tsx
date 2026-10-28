import React from 'react';

interface MouseCursorArtworkProps {
  x?: number; // px or %
  y?: number;
  clicking?: boolean;
  className?: string;
}

export const MouseCursorArtwork: React.FC<MouseCursorArtworkProps> = ({
  x = 0,
  y = 0,
  clicking = false,
  className = '',
}) => {
  return (
    <div
      className={`pointer-events-none absolute z-30 transition-transform ${className}`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-2px, -2px) scale(${clicking ? 0.88 : 1})`,
        filter: 'drop-shadow(2px 5px 6px rgba(0, 0, 0, 0.4))',
      }}
    >
      <svg
        width="28"
        height="32"
        viewBox="0 0 24 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sleek black macOS / Keynote pointer cursor with thin white border */}
        <path
          d="M 1 1 L 1 23 L 6.5 17.5 L 11.5 27 L 15 25.5 L 10 16 L 17 16 Z"
          fill="#0a0a0a"
          stroke="#ffffff"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
