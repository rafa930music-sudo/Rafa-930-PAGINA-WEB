import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import laMinaHeroBg from '@/src/assets/images/barrio-de-la-mina.png';

interface SplashScreenProps {
  language?: Language;
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ language = 'es', onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);
  const text = "RAFA 930";

  useEffect(() => {
    const timer = setTimeout(() => {
      handleDismiss();
    }, 3800);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleDismiss = () => {
    if (isExiting) return;
    // Notify audio player to unlock mobile audio context and start playback
    window.dispatchEvent(new CustomEvent('rafa930:user-gesture-triggered'));
    setIsExiting(true);
    setTimeout(onComplete, 500);
  };

  return (
    <div
      role="dialog"
      aria-label="Cargando RAFA 930 — Barrio de La Mina"
      onClick={handleDismiss}
      className={`fixed inset-0 z-[99999] w-screen h-[100dvh] bg-[#050507] flex flex-col items-center justify-center p-4 sm:p-6 md:p-12 overflow-hidden transition-opacity duration-500 cursor-pointer select-none ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Fondo fotográfico en Blanco y Negro de La Mina — Optimizado para visión horizontal y vertical */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <img
          src={laMinaHeroBg}
          alt="Edificios de La Mina, Sant Adrià de Besòs (Barcelona 08930)"
          className="w-full h-full object-cover object-[center_35%] filter grayscale contrast-[1.38] brightness-[0.72] scale-105 duration-1000 transition-transform"
        />
        {/* Degradados cinematográficos para destacar la arquitectura y garantizar contraste con el texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-[#050507]/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050507]/75 via-transparent to-[#050507]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(5,5,7,0.88)_95%)]" />
        <div className="absolute inset-0 bg-[#050507]/20" />
      </div>

      {/* Progressive letter animation styles and progress bar */}
      <style>{`
        @keyframes letterReveal {
          0% {
            opacity: 0;
            transform: translateY(22px) scale(0.92);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-letter-reveal {
          animation: letterReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes splashProgress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
        .animate-splash-bar {
          animation: splashProgress 3s linear forwards;
        }
      `}</style>

      {/* Central animated typography and branding — Disposición horizontal optimizada */}
      <div className="flex flex-col items-center justify-center z-10 w-full max-w-6xl px-4 gap-3 sm:gap-5 md:gap-6 text-center">
        {/* Wordmark RAFA 930 */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[9.5rem] font-extrabold tracking-wider font-['Bebas_Neue'] whitespace-nowrap flex items-center justify-center drop-shadow-[0_8px_30px_rgba(0,0,0,0.95)]">
          {text.split('').map((char, index) => {
            let charStyle: React.CSSProperties = {
              animationDelay: `${index * 0.12}s`,
            };

            if (char === '9') {
              charStyle = {
                ...charStyle,
                background: 'linear-gradient(90deg, #a855f7 0%, #c084fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 25px rgba(168, 85, 247, 0.75))',
              };
            } else if (char === '3') {
              charStyle = {
                ...charStyle,
                background: 'linear-gradient(90deg, #c084fc 0%, #e879f9 40%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 25px rgba(192, 132, 252, 0.65))',
              };
            } else if (char === '0') {
              charStyle = {
                ...charStyle,
                background: 'linear-gradient(90deg, #ec4899 0%, #fb923c 45%, #facc15 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 25px rgba(250, 204, 21, 0.65))',
              };
            } else {
              charStyle = {
                ...charStyle,
                color: '#ffffff',
                filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.35))',
              };
            }

            return (
              <span
                key={index}
                className="animate-letter-reveal opacity-0 inline-block"
                style={charStyle}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            );
          })}
        </h1>

        {/* Lema identitario oficial — Blanco neón brillante */}
        <p className="font-['Cormorant_Garamond'] italic text-lg sm:text-2xl md:text-3xl lg:text-4xl text-center text-[#ffffff] font-bold tracking-wide whitespace-normal md:whitespace-nowrap drop-shadow-[0_0_20px_rgba(255,255,255,0.95)] [text-shadow:0_0_12px_#ffffff,0_0_25px_rgba(168,85,247,0.8),0_0_40px_rgba(236,72,153,0.6)] max-w-5xl">
          {language === 'ca'
            ? '«De La Mina al món. Amb la veritat per davant.»'
            : language === 'es'
            ? '«De La Mina al mundo. Con la verdad por delante.»'
            : '“From La Mina to the world. Leading with the truth.”'}
        </p>
      </div>

      {/* Indicador inferior de progreso discreto */}
      <div className="absolute bottom-4 sm:bottom-8 flex flex-col items-center z-10 select-none">
        <div className="w-48 sm:w-64 md:w-80 h-1 bg-white/10 rounded-full overflow-hidden border border-white/20">
          <div className="h-full bg-gradient-to-r from-[#a855f7] via-[#ec4899] to-[#c084fc] animate-splash-bar rounded-full" />
        </div>
      </div>
    </div>
  );
};
