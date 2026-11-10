import React, { useState } from 'react';
import rafaGlobeLogo from '@/src/assets/images/rafa-globe-neon-logo.png';

interface RafaBrandLogoProps {
  onClick?: () => void;
  className?: string;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  showGlobe?: boolean;
}

export const RafaBrandLogo: React.FC<RafaBrandLogoProps> = ({
  onClick,
  className = '',
  title = 'RAFA 930',
  size = 'md',
  showGlobe = true,
}) => {
  const [isTapped, setIsTapped] = useState(false);

  const handleClick = () => {
    setIsTapped(true);
    setTimeout(() => setIsTapped(false), 700);
    if (onClick) onClick();
  };

  const textSizeClass =
    size === 'sm'
      ? 'text-xl sm:text-2xl'
      : size === 'lg'
      ? 'text-3xl sm:text-4xl md:text-5xl'
      : 'text-2xl sm:text-3xl md:text-4xl';

  const logoSizeClass =
    size === 'sm'
      ? 'w-6 h-6 sm:w-7 sm:h-7'
      : size === 'lg'
      ? 'w-10 h-10 sm:w-12 sm:h-12'
      : 'w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9';

  return (
    <button
      type="button"
      onClick={handleClick}
      title={title}
      className={`group relative inline-flex items-center cursor-pointer select-none focus:outline-none rounded-lg p-1 -m-1 transition-all ${className}`}
    >
      {/* Dynamic background neon aura on hover/click */}
      <div
        className={`absolute -inset-1.5 rounded-xl bg-gradient-to-r from-[#a855f7]/0 via-[#ec4899]/0 to-[#c084fc]/0 transition-all duration-500 blur-md pointer-events-none ${
          isTapped
            ? 'from-[#a855f7]/50 via-[#ec4899]/50 to-[#c084fc]/50 opacity-100 scale-105'
            : 'group-hover:from-[#a855f7]/35 group-hover:via-[#ec4899]/35 group-hover:to-[#c084fc]/35 group-hover:opacity-100 opacity-0'
        }`}
      />

      {/* User Neon Globe Logo beside / in the corner of RAFA 930 */}
      {showGlobe && (
        <div className="relative flex items-center justify-center shrink-0 mr-1.5 sm:mr-2">
          {/* Pulsing neon halo */}
          <div
            className={`absolute -inset-1 rounded-full bg-gradient-to-tr from-[#a855f7]/50 via-[#ec4899]/40 to-[#c084fc]/50 blur-sm transition-all duration-300 pointer-events-none ${
              isTapped ? 'scale-150 opacity-100' : 'group-hover:scale-125 opacity-70 animate-pulse'
            }`}
          />
          <img
            src={rafaGlobeLogo}
            alt="Logo oficial RAFA 930"
            className={`${logoSizeClass} object-contain relative z-10 transition-transform duration-500 transform group-hover:scale-110 group-hover:rotate-6 drop-shadow-[0_0_10px_rgba(168,85,247,0.95)] drop-shadow-[0_0_20px_rgba(236,72,153,0.7)] ${
              isTapped ? 'scale-125 rotate-12' : ''
            }`}
          />
        </div>
      )}

      {/* Main Brand Typography container */}
      <span
        className={`font-['Bebas_Neue'] ${textSizeClass} font-extrabold tracking-wider leading-none relative z-10 inline-flex items-center gap-1.5 transition-all duration-300 transform group-hover:scale-105 ${
          isTapped ? 'scale-110' : ''
        }`}
      >
        {/* 'RAFA' in white by default, fills with characteristic gradient on hover/tap */}
        <span
          className={`relative transition-all duration-300 ${
            isTapped
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] via-[#ec4899] to-[#c084fc] drop-shadow-[0_0_25px_rgba(168,85,247,1)] scale-105'
              : 'text-[#ffffff] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#a855f7] group-hover:via-[#ec4899] group-hover:to-[#c084fc] drop-shadow-[0_2px_12px_rgba(255,255,255,0.4)] group-hover:drop-shadow-[0_0_20px_rgba(236,72,153,0.9)]'
          }`}
        >
          RAFA
        </span>

        {/* '930' completing the brand name with vibrant neon glow */}
        <span
          className={`inline-block font-black transition-all duration-300 transform ${
            isTapped
              ? 'scale-125 rotate-2 drop-shadow-[0_0_28px_rgba(236,72,153,1)]'
              : 'group-hover:scale-110'
          }`}
        >
          <span className="text-gradient-930 drop-shadow-[0_0_16px_rgba(168,85,247,0.85)] group-hover:drop-shadow-[0_0_26px_rgba(236,72,153,1)]">
            930
          </span>
        </span>
      </span>
    </button>
  );
};
