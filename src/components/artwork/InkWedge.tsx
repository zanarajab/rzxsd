import React from 'react';

interface InkWedgeProps {
  position: 'top-left' | 'bottom-right';
  progress: number; // 0 to 1
  opacity?: number;
}

export const InkWedge: React.FC<InkWedgeProps> = ({ position, progress, opacity = 1 }) => {
  if (progress <= 0.01) return null;

  // Scale and position calculation
  // A sharp black triangular blade that sweeps into the corner
  const clamped = Math.min(Math.max(progress, 0), 1);
  const eased = Math.pow(clamped, 1.8);

  if (position === 'top-left') {
    return (
      <div
        className="pointer-events-none absolute top-0 left-0 w-full h-full overflow-hidden z-40 transition-opacity"
        style={{ opacity }}
      >
        <svg
          viewBox="0 0 720 1280"
          className="w-full h-full"
          preserveAspectRatio="none"
          style={{
            filter: 'drop-shadow(4px 10px 14px rgba(0, 0, 0, 0.45))',
          }}
        >
          <path
            d={`M -20 -20 L ${eased * 520} -20 L -20 ${eased * 840} Z`}
            fill="#090a0b"
          />
          {/* Secondary softer blade */}
          <path
            d={`M -20 -20 L ${eased * 380} -20 L -20 ${eased * 640} Z`}
            fill="#000000"
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none absolute bottom-0 right-0 w-full h-full overflow-hidden z-40 transition-opacity"
      style={{ opacity }}
    >
      <svg
        viewBox="0 0 720 1280"
        className="w-full h-full"
        preserveAspectRatio="none"
        style={{
          filter: 'drop-shadow(-4px -10px 14px rgba(0, 0, 0, 0.45))',
        }}
      >
        <path
          d={`M 740 1300 L ${740 - eased * 520} 1300 L 740 ${1300 - eased * 840} Z`}
          fill="#090a0b"
        />
        {/* Secondary softer blade */}
        <path
          d={`M 740 1300 L ${740 - eased * 380} 1300 L 740 ${1300 - eased * 640} Z`}
          fill="#000000"
        />
      </svg>
    </div>
  );
};
