import React from 'react';

interface DashedBoxProps {
  x?: number; // center x %
  y?: number; // center y %
  width?: number; // px
  height?: number; // px
  opacity?: number;
  progress?: number; // 0 to 1 for draw-in
  children?: React.ReactNode;
}

export const DashedBox: React.FC<DashedBoxProps> = ({
  x = 50,
  y = 45,
  width = 540,
  height = 140,
  opacity = 1,
  progress = 1,
  children,
}) => {
  const perimeter = 2 * (width + height);
  const strokeDashoffset = perimeter * (1 - Math.min(Math.max(progress, 0), 1));

  return (
    <div
      className="absolute pointer-events-none z-10 flex items-center justify-center transition-opacity"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${width}px`,
        height: `${height}px`,
        transform: 'translate(-50%, -50%)',
        opacity,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        className="absolute inset-0 overflow-visible"
      >
        <rect
          x="2"
          y="2"
          width={width - 4}
          height={height - 4}
          rx="6"
          ry="6"
          fill="rgba(0, 0, 0, 0.015)"
          stroke="#404040"
          strokeWidth="1.8"
          strokeDasharray="6 4"
          style={{
            strokeDashoffset,
            transition: 'stroke-dashoffset 0.3s ease-out',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.06))',
          }}
        />
      </svg>
      {children}
    </div>
  );
};
