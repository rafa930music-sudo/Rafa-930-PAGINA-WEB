import React, { useRef } from 'react';

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
  intensity = 8,
  glowColor = 'rgba(0, 212, 255, 0.2)',
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rimRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;

    const clientX = e.clientX;
    const clientY = e.clientY;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const centerX = rect.width / 2 || 1;
      const centerY = rect.height / 2 || 1;

      const normX = (x - centerX) / centerX;
      const normY = (y - centerY) / centerY;

      const rotateX = normY * -intensity;
      const rotateY = normX * intensity;

      const isLight = document.documentElement.classList.contains('light');
      const baseShadow = isLight
        ? 'rgba(15, 12, 32, 0.14)'
        : 'rgba(0, 0, 0, 0.68)';

      const shadowX = -normX * 14;
      const shadowY = -normY * 14 + 12;

      cardRef.current.style.transition = 'transform 60ms linear, box-shadow 100ms linear';
      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(0, 0, 8px) scale3d(1.014, 1.014, 1.014)`;
      cardRef.current.style.boxShadow = `${shadowX.toFixed(1)}px ${shadowY.toFixed(1)}px 30px -8px ${baseShadow}, 0 0 22px -6px ${glowColor}`;

      if (glareRef.current) {
        const gx = ((x / rect.width) * 100).toFixed(1);
        const gy = ((y / rect.height) * 100).toFixed(1);
        glareRef.current.style.background = `radial-gradient(380px circle at ${gx}% ${gy}%, ${glowColor}, transparent 70%)`;
        glareRef.current.style.opacity = isLight ? '0.45' : '0.85';
      }

      if (rimRef.current) {
        rimRef.current.style.opacity = isLight ? '0.35' : '0.65';
      }
    });
  };

  const handleMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const el = cardRef.current;
    if (!el) return;

    el.style.transition = 'transform 380ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 380ms ease';
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0px) scale3d(1, 1, 1)';
    el.style.boxShadow = '';

    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
    if (rimRef.current) {
      rimRef.current.style.opacity = '0';
    }
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0px) scale3d(1, 1, 1)',
      }}
      className={`relative overflow-hidden will-change-transform ${className}`}
    >
      {/* 3D Specular Glare Overlay */}
      <div
        ref={glareRef}
        aria-hidden="true"
        style={{ opacity: 0 }}
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-200"
      />
      {/* 3D Top Bevel Rim Highlight */}
      <div
        ref={rimRef}
        aria-hidden="true"
        style={{
          opacity: 0,
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 45%, rgba(0,212,255,0.1) 100%)',
        }}
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] transition-opacity duration-200"
      />
      <div className="relative z-20 h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};
