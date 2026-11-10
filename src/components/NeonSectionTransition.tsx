import React, { useEffect, useState, useRef } from 'react';
import { ScreenId, Language } from '../types';
import rafaGlobeNeonLogo from '@/src/assets/images/rafa-globe-neon-logo.png';
import laMinaHeroBg from '@/src/assets/images/barrio-de-la-mina.png';
import { ARTIST_IMAGES, TRACKS, COLLABORATORS } from '../data/content';

interface NeonSectionTransitionProps {
  currentScreen: ScreenId;
  language: Language;
}

const TRANSITION_DURATION_MS = 3800; // ~4 segundos (como 5s o menos)

const SCREEN_META: Record<
  ScreenId,
  {
    title: Record<Language, string>;
    subtitle: Record<Language, string>;
  }
> = {
  revista: {
    title: {
      ca: 'PORTADA EDITORIAL',
      es: 'PORTADA EDITORIAL',
      en: 'EDITORIAL COVER',
    },
    subtitle: {
      ca: 'Monografia, biografia i essència 08930',
      es: 'Monografía, biografía y esencia 08930',
      en: 'Monograph, biography and 08930 essence',
    },
  },
  home: {
    title: {
      ca: 'PORTADA EDITORIAL',
      es: 'PORTADA EDITORIAL',
      en: 'EDITORIAL COVER',
    },
    subtitle: {
      ca: 'Monografia, biografia i essència 08930',
      es: 'Monografía, biografía y esencia 08930',
      en: 'Monograph, biography and 08930 essence',
    },
  },
  discografia: {
    title: {
      ca: 'DISCOGRAFIA OFICIAL',
      es: 'DISCOGRAFÍA OFICIAL',
      en: 'OFFICIAL DISCOGRAPHY',
    },
    subtitle: {
      ca: 'Catàleg musical 2023–2026 i plataformes',
      es: 'Catálogo musical 2023–2026 y plataformas',
      en: 'Musical catalog 2023–2026 and streaming',
    },
  },
  galeria: {
    title: {
      ca: 'ARXIU FOTOGRÀFIC',
      es: 'ARCHIVO FOTOGRÁFICO',
      en: 'PHOTO ARCHIVE',
    },
    subtitle: {
      ca: 'Fotografia d’autor, rodatges i carrer',
      es: 'Fotografía de autor, rodajes y calle',
      en: 'Auteur photography, shoots and street life',
    },
  },
  serveis: {
    title: {
      ca: 'BOOKING & CONTRACTACIÓ',
      es: 'BOOKING & CONTRATACIÓN',
      en: 'BOOKING & CONTACT',
    },
    subtitle: {
      ca: 'Directes, col·laboracions i canal oficial',
      es: 'Directos, colaboraciones y canal oficial',
      en: 'Live shows, collaborations and direct channel',
    },
  },
  contacte: {
    title: {
      ca: 'BOOKING & CONTRACTACIÓ',
      es: 'BOOKING & CONTRATACIÓN',
      en: 'BOOKING & CONTACT',
    },
    subtitle: {
      ca: 'Directes, col·laboracions i canal oficial',
      es: 'Directos, colaboraciones y canal oficial',
      en: 'Live shows, collaborations and direct channel',
    },
  },
  conciertos: {
    title: {
      ca: 'CONCERTS & GIRA 2026',
      es: 'CONCIERTOS & GIRA 2026',
      en: 'CONCERTS & 2026 TOUR',
    },
    subtitle: {
      ca: 'Dates confirmades i entrades',
      es: 'Fechas confirmadas y entradas',
      en: 'Confirmed tour dates and tickets',
    },
  },
  presskit: {
    title: {
      ca: 'DOSSIER DE PREMSA',
      es: 'DOSSIER DE PRENSA',
      en: 'PRESS KIT',
    },
    subtitle: {
      ca: 'Fitxa tècnica per a mitjans i promotors',
      es: 'Ficha técnica para medios y promotores',
      en: 'Tech sheet for media and promoters',
    },
  },
  enllacos: {
    title: {
      ca: 'ENLLAÇOS OFICIALS',
      es: 'ENLACES OFICIALES',
      en: 'OFFICIAL LINKS',
    },
    subtitle: {
      ca: 'Accés directe a Spotify, YouTube i xarxes',
      es: 'Acceso directo a Spotify, YouTube y redes',
      en: 'Direct access to Spotify, YouTube and socials',
    },
  },
  legal: {
    title: {
      ca: 'AVÍS LEGAL & PRIVACITAT',
      es: 'AVISO LEGAL & PRIVACIDAD',
      en: 'LEGAL & PRIVACY',
    },
    subtitle: {
      ca: 'RGPD, LSSI-CE, Cookies i transparència',
      es: 'RGPD, LSSI-CE, Cookies y transparencia',
      en: 'GDPR, LSSI-CE, Cookies and compliance',
    },
  },
  redes: {
    title: {
      ca: 'CANALS & STREAMING',
      es: 'CANALES & STREAMING',
      en: 'CHANNELS & STREAMING',
    },
    subtitle: {
      ca: 'Spotify, YouTube, Instagram i contacte',
      es: 'Spotify, YouTube, Instagram y contacto',
      en: 'Spotify, YouTube, Instagram and contact',
    },
  },
};

export const NeonSectionTransition: React.FC<NeonSectionTransitionProps> = ({
  currentScreen,
  language,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [animatingScreen, setAnimatingScreen] = useState<ScreenId>(currentScreen);
  const isFirstRender = useRef(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const dismiss = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 450);
  };

  useEffect(() => {
    // Skip initial splash screen load
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (timerRef.current) clearTimeout(timerRef.current);

    setAnimatingScreen(currentScreen);
    setIsClosing(false);
    setIsVisible(true);

    // Preload and GPU-decode all website images so they display immediately
    const allImages = [
      ...Object.values(ARTIST_IMAGES),
      ...TRACKS.map((t) => t.coverUrl),
      ...COLLABORATORS.map((c) => c.avatarUrl),
    ].filter(Boolean);

    allImages.forEach((src) => {
      if (typeof src === 'string') {
        const img = new Image();
        img.src = src;
        if ('decode' in img) {
          img.decode().catch(() => {});
        }
      }
    });

    // Stays visible for ~3.8 seconds so users have ample time to see the section and animated logo
    timerRef.current = setTimeout(() => {
      dismiss();
    }, TRANSITION_DURATION_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentScreen]);

  if (!isVisible) return null;

  const meta = SCREEN_META[animatingScreen] || SCREEN_META.revista;

  return (
    <div
      role="status"
      aria-live="polite"
      onClick={dismiss}
      className={`fixed inset-0 z-[9990] flex flex-col items-center justify-center p-4 overflow-hidden select-none cursor-pointer transition-opacity duration-450 ${
        isClosing ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      }`}
    >
      {/* Dynamic Keyframes for Neon Floating Logo Movement */}
      <style>{`
        @keyframes neonFloatingOrbital {
          0% {
            transform: translateY(0px) rotate(0deg) scale(1);
            filter: drop-shadow(0 0 20px rgba(168, 85, 247, 0.9)) drop-shadow(0 0 45px rgba(236, 72, 153, 0.7));
          }
          25% {
            transform: translateY(-16px) rotate(3deg) scale(1.06);
            filter: drop-shadow(0 0 35px rgba(192, 132, 252, 1)) drop-shadow(0 0 65px rgba(168, 85, 247, 0.85));
          }
          50% {
            transform: translateY(-8px) rotate(-3deg) scale(1.09);
            filter: drop-shadow(0 0 40px rgba(236, 72, 153, 1)) drop-shadow(0 0 70px rgba(168, 85, 247, 0.9));
          }
          75% {
            transform: translateY(12px) rotate(2deg) scale(1.04);
            filter: drop-shadow(0 0 30px rgba(192, 132, 252, 0.95)) drop-shadow(0 0 55px rgba(236, 72, 153, 0.8));
          }
          100% {
            transform: translateY(0px) rotate(0deg) scale(1);
            filter: drop-shadow(0 0 20px rgba(168, 85, 247, 0.9)) drop-shadow(0 0 45px rgba(236, 72, 153, 0.7));
          }
        }
        .animate-neon-float {
          animation: neonFloatingOrbital 3.6s ease-in-out infinite;
        }

        @keyframes neonProgressBar {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
        .animate-transition-progress {
          animation: neonProgressBar ${TRANSITION_DURATION_MS}ms linear forwards;
        }
      `}</style>

      {/* Fondo fotográfico en Blanco y Negro de La Mina — Idéntico al Splash Screen */}
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

      {/* Sutiles líneas de escaneo cyberpunk */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]" />

      {/* Center Animated Neon Card — 100% Centrado horizontal y verticalmente */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-xl w-full px-4 text-center my-auto">
        {/* Solo el Logo Neón Moviéndose con Levitación Orbital */}
        <div className="relative mb-6 sm:mb-8 flex items-center justify-center w-full">
          {/* User's Neon Globe Logo — Solo el logo moviéndose con levitación e inclinación suave */}
          <img
            src={rafaGlobeNeonLogo}
            alt="RAFA 930 Logo Neón"
            className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 object-contain relative z-10 animate-neon-float select-none mx-auto"
          />
        </div>

        {/* Section Title with Grand Cyber Neon Typography */}
        <h2 className="font-['Bebas_Neue'] text-4xl sm:text-6xl md:text-7xl text-white tracking-widest text-center leading-tight drop-shadow-[0_0_25px_rgba(255,255,255,0.95)] [text-shadow:0_0_15px_#a855f7,0_0_35px_#ec4899,0_0_60px_rgba(168,85,247,0.7)] mb-3">
          {meta.title[language]}
        </h2>

        {/* Subtitle / Context description */}
        <p className="font-['Cormorant_Garamond'] italic text-base sm:text-xl md:text-2xl text-[#f1f5f9] font-medium tracking-wide max-w-md mx-auto text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] mb-6">
          {meta.subtitle[language]}
        </p>

        {/* Animated Progress Timer Line */}
        <div className="w-56 sm:w-72 h-1 mx-auto bg-white/10 rounded-full overflow-hidden border border-white/20 relative shadow-[0_0_15px_rgba(168,85,247,0.3)]">
          <div className="h-full bg-gradient-to-r from-[#a855f7] via-[#ec4899] to-[#c084fc] animate-transition-progress rounded-full" />
        </div>
      </div>
    </div>
  );
};
