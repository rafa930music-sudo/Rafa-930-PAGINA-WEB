import React, { useState, useEffect } from 'react';
import { Language } from '../types';

interface SplashScreenProps {
  language?: Language;
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 1450);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 1950);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const handleDismiss = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 400);
  };

  return (
    <div
      role="dialog"
      aria-label="RAFA 930"
      onClick={handleDismiss}
      className={`fixed inset-0 z-[100] bg-[#050507] flex items-center justify-center px-6 sm:px-12 select-none cursor-pointer overflow-hidden transition-all duration-500 ${
        isExiting ? 'opacity-0 scale-[1.03] pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Ambient Luxury Lighting (Lila, Rosa, Rojo + Subtle Electric Blue / Rayo) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 left-1/4 w-[26rem] h-[26rem] rounded-full bg-[#a855f7]/20 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-1/4 w-[24rem] h-[24rem] rounded-full bg-[#ec4899]/18 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 left-1/3 w-[22rem] h-[22rem] rounded-full bg-[#e11d48]/16 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20rem] h-[20rem] rounded-full bg-[#00d4ff]/12 blur-[125px]"
      />

      {/* Fine Luxury Frame Border */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-4 sm:inset-8 border border-[#22222e] rounded-2xl shadow-[inset_0_0_40px_rgba(0,212,255,0.05)]"
      />

      {/* Strictly Single-Line Horizontal RAFA 930 Wordmark, Fluidly Fitted to Screen Width */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center justify-center">
        <div
          aria-hidden="true"
          className="font-['Bebas_Neue'] font-extrabold tracking-tight text-[clamp(2.25rem,10vw,6.75rem)] leading-none whitespace-nowrap inline-flex items-baseline justify-center gap-2.5 sm:gap-4 text-[#ffffff] drop-shadow-[0_0_32px_rgba(0,212,255,0.16)]"
        >
          <span>RAFA</span>
          <span className="text-gradient-lila-rosa-rojo">930</span>
        </div>
        <div
          aria-hidden="true"
          className="mt-4 sm:mt-5 h-[2px] w-28 sm:w-44 rounded-full bg-gradient-to-r from-[#a855f7] via-[#00d4ff] to-[#ec4899] shadow-[0_0_14px_rgba(0,212,255,0.55)]"
        />
      </div>
    </div>
  );
};
