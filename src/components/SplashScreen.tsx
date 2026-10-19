import React, { useState, useEffect } from 'react';
import { Language } from '../types';

interface SplashScreenProps {
  language?: Language;
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);
  const text = "RAFA 930";

  useEffect(() => {
    const timer = setTimeout(() => {
      handleDismiss();
    }, 3000);

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
    setIsExiting(true);
    setTimeout(onComplete, 500);
  };

  return (
    <div
      role="dialog"
      aria-label="Cargando RAFA 930"
      onClick={handleDismiss}
      className={`fixed inset-0 z-[99999] w-screen h-[100dvh] bg-[#050507] flex flex-col items-center justify-center p-4 sm:p-6 md:p-12 overflow-hidden transition-opacity duration-500 cursor-pointer select-none ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Galaxy background with stars */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e1b4b_0%,#0f172a_35%,#020617_100%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        {Array.from({ length: 45 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: Math.random() * 2.2 + 1 + 'px',
              height: Math.random() * 2.2 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's',
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      {/* Progressive letter animation styles */}
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
      `}</style>

      {/* Central animated text with the 4-color gradient on 930 */}
      <div className="flex justify-center items-center z-10 max-w-full px-2">
        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight font-['Bebas_Neue'] whitespace-nowrap flex items-center justify-center">
          {text.split('').map((char, index) => {
            let charStyle: React.CSSProperties = {
              animationDelay: `${index * 0.12}s`,
            };

            if (char === '9') {
              charStyle = {
                ...charStyle,
                background: 'linear-gradient(90deg, #00d4ff 0%, #818cf8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 20px rgba(0, 212, 255, 0.5))',
              };
            } else if (char === '3') {
              charStyle = {
                ...charStyle,
                background: 'linear-gradient(90deg, #818cf8 0%, #c084fc 40%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 20px rgba(192, 132, 252, 0.5))',
              };
            } else if (char === '0') {
              charStyle = {
                ...charStyle,
                background: 'linear-gradient(90deg, #ec4899 0%, #fb923c 45%, #facc15 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 20px rgba(250, 204, 21, 0.5))',
              };
            } else {
              charStyle = {
                ...charStyle,
                color: '#ffffff',
                filter: 'drop-shadow(0 0 16px rgba(255, 255, 255, 0.25))',
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
      </div>
    </div>
  );
};
