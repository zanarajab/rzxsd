import React from 'react';

interface DottedGridCircleProps {
  opacity?: number;
  size?: number;
  className?: string;
}

export const DottedGridCircle: React.FC<DottedGridCircleProps> = ({
  opacity = 0.65,
  size = 580,
  className = '',
}) => {
  return (
    <div
      className={`pointer-events-none select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        opacity,
        maskImage: 'radial-gradient(circle at center, black 35%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black 35%, transparent 70%)',
      }}
    >
      <svg width="100%" height="100%" className="w-full h-full">
        <pattern
          id="dotted-grid-pattern"
          x="0"
          y="0"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="12" cy="12" r="1.5" fill="#888888" opacity="0.45" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#dotted-grid-pattern)" />
      </svg>
    </div>
  );
};
