import React, { useState, useRef } from 'react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glowColor?: string;
  onClick?: () => void;
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  intensity = 10,
  glowColor = 'rgba(0, 212, 255, 0.22)',
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<string>(
    'perspective(950px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)'
  );
  const [shadowStyle, setShadowStyle] = useState<string>('');
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const normX = (x - centerX) / centerX;
    const normY = (y - centerY) / centerY;

    const rotateX = normY * -intensity * 1.25;
    const rotateY = normX * intensity * 1.25;

    const shadowX = -normX * 18;
    const shadowY = -normY * 18 + 14;

    setTransformStyle(
      `perspective(950px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(14px) scale3d(1.022, 1.022, 1.022)`
    );
    setShadowStyle(
      `${shadowX.toFixed(1)}px ${shadowY.toFixed(1)}px 36px -8px rgba(0, 0, 0, 0.72), 0 0 28px -6px ${glowColor}`
    );
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle(
      'perspective(950px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)'
    );
    setShadowStyle('');
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        boxShadow: shadowStyle || undefined,
        transition:
          glarePos.opacity === 0
            ? 'transform 420ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 420ms ease'
            : 'transform 55ms linear, box-shadow 90ms linear',
        transformStyle: 'preserve-3d',
      }}
      className={`relative overflow-hidden will-change-transform ${className}`}
    >
      {/* 3D Specular Glare Overlay */}
      <div
        aria-hidden="true"
        style={{
          background: `radial-gradient(420px circle at ${glarePos.x}% ${glarePos.y}%, ${glowColor}, transparent 72%)`,
          opacity: glarePos.opacity,
        }}
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-200"
      />
      {/* 3D Top Bevel Rim Highlight */}
      <div
        aria-hidden="true"
        style={{
          opacity: glarePos.opacity * 0.75,
          background: `linear-gradient(135deg, rgba(255,255,255,0.22) 0%, transparent 45%, rgba(0,212,255,0.12) 100%)`,
        }}
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] transition-opacity duration-200"
      />
      <div
        style={{ transform: glarePos.opacity ? 'translateZ(18px)' : 'translateZ(0px)', transition: 'transform 250ms ease' }}
        className="relative z-20 h-full flex flex-col justify-between"
      >
        {children}
      </div>
    </div>
  );
};
