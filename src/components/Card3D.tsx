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
    // Disable 3D tilt calculation on mobile and touch devices
    if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

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

      const baseShadow = 'rgba(0, 0, 0, 0.68)';
      const shadowX = -normX * 14;
      const shadowY = -normY * 14 + 12;

      cardRef.current.style.transition = 'transform 60ms linear, box-shadow 100ms linear';
      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(0, 0, 8px) scale3d(1.014, 1.014, 1.014)`;
      cardRef.current.style.boxShadow = `${shadowX.toFixed(1)}px ${shadowY.toFixed(1)}px 30px -8px ${baseShadow}, 0 0 22px -6px ${glowColor}`;

      if (glareRef.current) {
        const gx = ((x / rect.width) * 100).toFixed(1);
        const gy = ((y / rect.height) * 100).toFixed(1);
        glareRef.current.style.background = `radial-gradient(380px circle at ${gx}% ${gy}%, ${glowColor}, transparent 70%)`;
        glareRef.current.style.opacity = '0.85';
      }

      if (rimRef.current) {
        rimRef.current.style.opacity = '0.65';
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
      className={`relative overflow-hidden ${className}`}
    >
      {/* 3D Specular Glare Overlay (Desktop only) */}
      <div
        ref={glareRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 z-20 mix-blend-screen hidden sm:block"
      />

      {/* Rim light border (Desktop only) */}
      <div
        ref={rimRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] border border-[#00d4ff]/40 opacity-0 transition-opacity duration-300 z-20 hidden sm:block"
      />

      {children}
    </div>
  );
};
