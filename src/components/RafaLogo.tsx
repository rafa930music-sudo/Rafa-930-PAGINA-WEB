import React from 'react';
import logoWhite from '../assets/images/logo-white.webp';

interface RafaLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  className?: string;
  withGlow?: boolean;
  theme?: 'dark' | 'light';
  alt?: string;
}

export const RafaLogo: React.FC<RafaLogoProps> = ({
  size = 'md',
  className = '',
  withGlow = false,
  theme = 'dark',
  alt = 'RAFA 930 Logo Oficial',
}) => {
  const sizeClasses = {
    xs: 'w-7 h-7',
    sm: 'w-9 h-9 sm:w-10 sm:h-10',
    md: 'w-12 h-12 sm:w-14 sm:h-14',
    lg: 'w-20 h-20 sm:w-24 sm:h-24',
    xl: 'w-32 h-32 sm:w-40 sm:h-40',
    custom: '',
  }[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
    >
      {/* Background radial glow */}
      {withGlow && (
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-60 pointer-events-none scale-125"
          style={{
            background:
              theme === 'light'
                ? 'radial-gradient(circle, rgba(0,212,255,0.3) 0%, rgba(236,72,153,0.2) 60%, transparent 80%)'
                : 'radial-gradient(circle, rgba(0,212,255,0.45) 0%, rgba(168,85,247,0.3) 50%, rgba(236,72,153,0.2) 75%, transparent 90%)',
          }}
        />
      )}

      {/* Official 3D wireframe globe & orbital ring logo */}
      <img
        src={logoWhite}
        alt={alt}
        width={96}
        height={96}
        className={`relative z-10 object-contain aspect-square drop-shadow-[0_0_12px_rgba(0,212,255,0.35)] ${sizeClasses}`}
        loading="eager"
        decoding="async"
      />
    </div>
  );
};
