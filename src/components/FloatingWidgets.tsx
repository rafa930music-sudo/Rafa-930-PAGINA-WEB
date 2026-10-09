import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { ArrowUp, MessageSquare, Mail } from 'lucide-react';

interface FloatingWidgetsProps {
  language: Language;
  hasMiniPlayer?: boolean;
}

export const FloatingWidgets: React.FC<FloatingWidgetsProps> = ({
  language,
  hasMiniPlayer = false,
}) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const labels = {
    top: { ca: 'Tornar a dalt', es: 'Volver arriba', en: 'Back to top' },
    contact: { ca: 'Contacte', es: 'Contacto', en: 'Contact' },
    waText: {
      ca: 'Hola RAFA 930, m’interessa contactar amb tu per a un projecte',
      es: 'Hola RAFA 930, me interesa contactar contigo para un proyecto',
      en: 'Hello RAFA 930, I would like to get in touch regarding a project',
    },
  };

  const bottomPosition = hasMiniPlayer
    ? 'bottom-36 xl:bottom-22'
    : 'bottom-20 xl:bottom-6';

  return (
    <>
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label={labels.top[language]}
          className={`touch-target-44 fixed ${bottomPosition} left-4 sm:left-6 z-30 w-11 h-11 rounded-full bg-[#111118]/90 backdrop-blur border border-[#00d4ff]/45 text-[#00d4ff] flex items-center justify-center shadow-[0_0_16px_rgba(0,212,255,0.2)] hover:border-[#00d4ff] hover:text-[#ffffff] transition-all`}
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      <div className={`fixed ${bottomPosition} right-4 sm:right-6 z-30 flex items-center gap-2 transition-all`}>
        <a
          href={`https://wa.me/34671591814?text=${encodeURIComponent(labels.waText[language])}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="touch-target-44 flex items-center gap-2 bg-[#111118]/95 backdrop-blur border border-[#22222e] hover:border-[#ec4899] text-[#ffffff] text-xs py-2.5 px-4 rounded-lg shadow-xl transition-colors"
        >
          <MessageSquare className="w-4 h-4 text-[#ec4899]" />
          <span className="hidden sm:inline font-medium">WhatsApp</span>
        </a>

        <a
          href="mailto:rafa.930music@gmail.com?subject=Consulta%20Profesional%20-%20RAFA%20930"
          aria-label="Email"
          className="touch-target-44 flex items-center gap-2 gradient-lila-rosa-rojo text-white font-semibold text-xs py-2.5 px-4 rounded-lg shadow-xl hover:opacity-90 transition-opacity"
        >
          <Mail className="w-4 h-4" />
          <span className="hidden sm:inline">{labels.contact[language]}</span>
        </a>
      </div>
    </>
  );
};
