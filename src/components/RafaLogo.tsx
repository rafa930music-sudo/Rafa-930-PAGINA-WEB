import React from 'react';

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
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-24 h-24',
    xl: 'w-40 h-40',
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
                ? 'radial-gradient(circle, rgba(124,58,237,0.25) 0%, rgba(217,70,239,0.1) 60%, transparent 80%)'
                : 'radial-gradient(circle, rgba(139,92,246,0.45) 0%, rgba(192,132,252,0.15) 60%, transparent 85%)',
          }}
        />
      )}

      {/* Official 3D wireframe globe & orbital ring logo - exact authentic original representation */}
      <img
        src={`${import.meta.env.BASE_URL}assets/logo-white.webp`}
        alt={alt}
        width={96}
        height={96}
        className={`relative z-10 object-contain aspect-square ${sizeClasses}`}
        loading="eager"
        decoding="async"
        onError={(e) => {
          // Fallback to .jpg if ever needed
          const target = e.currentTarget;
          if (target.src.endsWith('.webp')) {
            target.src = `${import.meta.env.BASE_URL}assets/logo-white.jpg`;
          }
        }}
      />
    </div>
  );
};
