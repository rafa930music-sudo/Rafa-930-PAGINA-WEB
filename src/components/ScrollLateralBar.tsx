import React, { useState, useEffect } from 'react';

export const ScrollLateralBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / scrollHeight) * 100));
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    updateProgress();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Barra de scroll lateral progresiva"
      className="fixed right-0 top-0 bottom-0 w-[3px] sm:w-[4px] bg-[#0a0a0f]/80 z-[100] pointer-events-none overflow-hidden"
    >
      {/* Background guide track */}
      <div className="absolute inset-0 opacity-20 bg-gradient-to-b from-[#a855f7] via-[#00d4ff] to-[#ec4899]" />

      {/* Progressive fill bar */}
      <div
        className="w-full transition-[height] duration-75 ease-out relative"
        style={{
          height: `${scrollProgress}%`,
          background:
            'linear-gradient(180deg, #a855f7 0%, #c084fc 22%, #ec4899 48%, #00d4ff 78%, #e11d48 100%)',
          boxShadow: '0 0 8px rgba(0, 212, 255, 0.35)',
        }}
      >
        {scrollProgress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/90 rounded-full" />
        )}
      </div>
    </div>
  );
};
