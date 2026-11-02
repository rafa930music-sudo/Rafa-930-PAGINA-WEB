import React, { useState } from 'react';

interface RafaBrandLogoProps {
  onClick?: () => void;
  className?: string;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const RafaBrandLogo: React.FC<RafaBrandLogoProps> = ({
  onClick,
  className = '',
  title = 'RAFA 930',
  size = 'md',
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

  return (
    <button
      type="button"
      onClick={handleClick}
      title={title}
      className={`group relative inline-flex items-center cursor-pointer select-none focus:outline-none rounded-lg p-1 -m-1 transition-all ${className}`}
    >
      {/* Dynamic background neon aura on hover/click */}
      <div
        className={`absolute -inset-1.5 rounded-xl bg-gradient-to-r from-[#00d4ff]/0 via-[#ec4899]/0 to-[#a855f7]/0 transition-all duration-500 blur-md pointer-events-none ${
          isTapped
            ? 'from-[#00d4ff]/50 via-[#ec4899]/50 to-[#a855f7]/50 opacity-100 scale-105'
            : 'group-hover:from-[#00d4ff]/35 group-hover:via-[#ec4899]/35 group-hover:to-[#a855f7]/35 group-hover:opacity-100 opacity-0'
        }`}
      />

      {/* Main Brand Typography container */}
      <span
        className={`font-['Bebas_Neue'] ${textSizeClass} font-extrabold tracking-wider leading-none relative z-10 inline-flex items-center gap-1.5 transition-all duration-300 transform group-hover:scale-105 ${
          isTapped ? 'scale-110' : ''
        }`}
      >
        {/* 'RAFA' with characteristic gradient fill (Lila, Rosa, Cyan) */}
        <span
          className={`relative transition-all duration-300 drop-shadow-[0_2px_12px_rgba(0,212,255,0.4)] text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] via-[#ec4899] to-[#00d4ff] ${
            isTapped
              ? 'drop-shadow-[0_0_25px_rgba(0,212,255,1)] scale-105'
              : 'group-hover:drop-shadow-[0_0_20px_rgba(236,72,153,0.9)]'
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
          <span className="text-gradient-930 drop-shadow-[0_0_16px_rgba(0,212,255,0.85)] group-hover:drop-shadow-[0_0_26px_rgba(236,72,153,1)]">
            930
          </span>
        </span>
      </span>
    </button>
  );
};
