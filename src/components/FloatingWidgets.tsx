import React from 'react';
import { Language } from '../types';
import { MessageSquare, Mail } from 'lucide-react';

interface FloatingWidgetsProps {
  language: Language;
  hasMiniPlayer?: boolean;
}

export const FloatingWidgets: React.FC<FloatingWidgetsProps> = ({
  language,
  hasMiniPlayer = false,
}) => {
  const labels = {
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
    <div className={`fixed ${bottomPosition} right-3 sm:right-6 z-30 flex items-center gap-2 transition-all`}>
      <a
        href={`https://wa.me/34671591814?text=${encodeURIComponent(labels.waText[language])}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="touch-target-44 flex items-center gap-2 bg-[#111118]/95 backdrop-blur border border-[#22222e] hover:border-[#ec4899] text-[#ffffff] text-xs py-2.5 px-3.5 sm:px-4 rounded-xl shadow-xl transition-colors cursor-pointer"
      >
        <MessageSquare className="w-4 h-4 text-[#ec4899]" />
        <span className="hidden sm:inline font-medium font-mono">WhatsApp</span>
      </a>

      <a
        href="mailto:rafa.930music@gmail.com?subject=Consulta%20Profesional%20-%20RAFA%20930"
        aria-label="Email"
        className="touch-target-44 flex items-center gap-2 gradient-lila-rosa-rojo text-white font-semibold text-xs py-2.5 px-3.5 sm:px-4 rounded-xl shadow-xl hover:opacity-90 transition-opacity cursor-pointer"
      >
        <Mail className="w-4 h-4" />
        <span className="hidden sm:inline font-mono">{labels.contact[language]}</span>
      </a>
    </div>
  );
};
