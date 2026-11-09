import React, { useState } from 'react';
import { Language } from '../../types';
import { GALLERY_PHOTOS, ARTIST_IMAGES } from '../../data/content';
import { Camera } from 'lucide-react';
import { LazyImage } from '../LazyImage';

interface GaleriaScreenProps {
  language: Language;
  onNavigateToBooking?: () => void;
  onNavigateToServices?: () => void;
}

const PHOTO_I18N: Record<
  string,
  {
    title: Record<Language, string>;
    categoryLabel: Record<Language, string>;
    description: Record<Language, string>;
    credits: Record<Language, string>;
    year: Record<Language, string>;
  }
> = {
  'g-portrait-incrife': {
    title: {
      ca: 'RAFA 930 · Clarobscur',
      es: 'RAFA 930 · Claroscuro',
      en: 'RAFA 930 · Chiaroscuro',
    },
    categoryLabel: {
      ca: 'Arxiu Editorial · @incrife',
      es: 'Archivo Editorial · @incrife',
      en: 'Editorial Archive · @incrife',
    },
    description: {
      ca: 'Sessió editorial oficial en clarobscur per Incrife (@incrife) per a 930 Records.',
      es: 'Sesión editorial oficial en claroscuro por Incrife (@incrife) para 930 Records.',
      en: 'Official chiaroscuro editorial portrait session by Incrife (@incrife) for 930 Records.',
    },
    credits: {
      ca: 'Foto: @incrife',
      es: 'Foto: @incrife',
      en: 'Photo: @incrife',
    },
    year: { ca: '2025', es: '2025', en: '2025' },
  },
  'g-library': {
    title: {
      ca: 'Barri de La Mina',
      es: 'Barrio de La Mina',
      en: 'La Mina Neighborhood',
    },
    categoryLabel: {
      ca: 'Arxiu Històric',
      es: 'Archivo Histórico',
      en: 'Historical Archive',
    },
    description: {
      ca: 'Punt de trobada cultural i bressol creatiu de les primeres lletres.',
      es: 'Punto de encuentro cultural y cuna creativa de las primeras letras.',
      en: 'Cultural meeting point and creative birthplace of first lyrics.',
    },
    credits: {
      ca: 'Arxiu 930',
      es: 'Archivo 930',
      en: '930 Archive',
    },
    year: { ca: 'Orígens', es: 'Orígenes', en: 'Origins' },
  },
  'g-colab-incrife': {
    title: {
      ca: 'Incrife',
      es: 'Incrife',
      en: 'Incrife',
    },
    categoryLabel: {
      ca: 'Fotògraf & Productor · @incrife',
      es: 'Fotógrafo & Productor · @incrife',
      en: 'Photographer & Producer · @incrife',
    },
    description: {
      ca: 'Fotògraf i productor visual oficial de RAFA 930. Responsable del clarobscur editorial.',
      es: 'Fotógrafo y productor visual oficial de RAFA 930. Creador del claroscuro editorial.',
      en: 'Official photographer and visual producer for RAFA 930.',
    },
    credits: {
      ca: '@incrife',
      es: '@incrife',
      en: '@incrife',
    },
    year: { ca: '2026', es: '2026', en: '2026' },
  },
  'g-colab-ouxxox': {
    title: {
      ca: 'Ouxxox',
      es: 'Ouxxox',
      en: 'Ouxxox',
    },
    categoryLabel: {
      ca: 'Productor & Beatmaker · @ouxxox.res0',
      es: 'Productor & Beatmaker · @ouxxox.res0',
      en: 'Producer & Beatmaker · @ouxxox.res0',
    },
    description: {
      ca: 'Beatmaker i productor musical de l’equip 930.',
      es: 'Beatmaker y productor musical del equipo 930.',
      en: 'Beatmaker and producer from the 930 squad.',
    },
    credits: {
      ca: '@ouxxox.res0',
      es: '@ouxxox.res0',
      en: '@ouxxox.res0',
    },
    year: { ca: '2026', es: '2026', en: '2026' },
  },
  'g-colab-therassam': {
    title: {
      ca: 'Therassam',
      es: 'Therassam',
      en: 'Therassam',
    },
    categoryLabel: {
      ca: 'Artista Vocal · @therassam',
      es: 'Artista Vocal · @therassam',
      en: 'Vocal Artist · @therassam',
    },
    description: {
      ca: 'Artista urbà i col·laborador vocal habitual als directes i a l’estudi.',
      es: 'Artista urbano y colaborador vocal habitual en directos y estudio.',
      en: 'Urban artist and regular vocal collaborator.',
    },
    credits: {
      ca: '@therassam',
      es: '@therassam',
      en: '@therassam',
    },
    year: { ca: '2026', es: '2026', en: '2026' },
  },
  'g-colab-kingsla': {
    title: {
      ca: 'Kingsla',
      es: 'Kingsla',
      en: 'Kingsla',
    },
    categoryLabel: {
      ca: 'Artista Creatiu · @amine_grafi',
      es: 'Artista Creativo · @amine_grafi',
      en: 'Creative Artist · @amine_grafi',
    },
    description: {
      ca: 'Artista urbà i col·laborador de l’escena underground.',
      es: 'Artista urbano y colaborador de la escena underground.',
      en: 'Urban artist and collaborator in the underground scene.',
    },
    credits: {
      ca: '@amine_grafi',
      es: '@amine_grafi',
      en: '@amine_grafi',
    },
    year: { ca: '2026', es: '2026', en: '2026' },
  },
  'g-colab-salma': {
    title: {
      ca: 'Salma',
      es: 'Salma',
      en: 'Salma',
    },
    categoryLabel: {
      ca: 'Model & Imatge · @ssalmaem',
      es: 'Modelo & Imagen · @ssalmaem',
      en: 'Model & Image · @ssalmaem',
    },
    description: {
      ca: 'Model protagonista en sessions fotogràfiques i visuals oficials de 930.',
      es: 'Modelo protagonista en sesiones fotográficas y visuales oficiales de 930.',
      en: 'Lead model for official 930 visual campaigns.',
    },
    credits: {
      ca: '@ssalmaem',
      es: '@ssalmaem',
      en: '@ssalmaem',
    },
    year: { ca: '2026', es: '2026', en: '2026' },
  },
  'g-colab-toliyug': {
    title: {
      ca: 'Toliyug',
      es: 'Toliyug',
      en: 'Toliyug',
    },
    categoryLabel: {
      ca: 'Model Editorial · @toliyug',
      es: 'Modelo Editorial · @toliyug',
      en: 'Editorial Model · @toliyug',
    },
    description: {
      ca: 'Model editorial en projectes i campanyes de moda urbana.',
      es: 'Modelo editorial en proyectos y campañas de moda urbana.',
      en: 'Editorial model in urban fashion and nightwear shoots.',
    },
    credits: {
      ca: '@toliyug',
      es: '@toliyug',
      en: '@toliyug',
    },
    year: { ca: '2026', es: '2026', en: '2026' },
  },
  'g-colab-derasmenjivar': {
    title: {
      ca: 'Quiriat Jearim Deras Menjivar',
      es: 'Quiriat Jearim Deras Menjivar',
      en: 'Quiriat Jearim Deras Menjivar',
    },
    categoryLabel: {
      ca: 'Model de Portada · @derasmenjivar_13',
      es: 'Modelo de Portada · @derasmenjivar_13',
      en: 'Cover Model · @derasmenjivar_13',
    },
    description: {
      ca: 'Model en visuals, rodatges i fotografies oficials de singles de RAFA 930.',
      es: 'Modelo en visuales, rodajes y fotografías oficiales de singles de RAFA 930.',
      en: 'Model in official music videos and photography for RAFA 930.',
    },
    credits: {
      ca: '@derasmenjivar_13',
      es: '@derasmenjivar_13',
      en: '@derasmenjivar_13',
    },
    year: { ca: '2026', es: '2026', en: '2026' },
  },
  'g-de-vuelta': {
    title: {
      ca: 'De Vuelta · Cover Session',
      es: 'De Vuelta · Cover Session',
      en: 'De Vuelta · Cover Session',
    },
    categoryLabel: {
      ca: 'Single 2026',
      es: 'Single 2026',
      en: 'Single 2026',
    },
    description: {
      ca: 'Sessió de fotos oficial per al llançament destacat de De Vuelta.',
      es: 'Sesión de fotos oficial para el lanzamiento destacado de De Vuelta.',
      en: 'Official photo session for the featured 2026 release of De Vuelta.',
    },
    credits: { ca: 'Foto: Incrife', es: 'Foto: Incrife', en: 'Photo: Incrife' },
    year: { ca: '2026', es: '2026', en: '2026' },
  },
  'g-my-world': {
    title: {
      ca: "EP 'My World' · Trilogia",
      es: "EP 'My World' · Trilogía",
      en: "EP 'My World' · Trilogy",
    },
    categoryLabel: {
      ca: 'Portada EP 2025',
      es: 'Portada EP 2025',
      en: 'EP Cover 2025',
    },
    description: {
      ca: 'Art oficial de portada per a la trilogia conceptual My World a Spotify.',
      es: 'Arte oficial de portada para la trilogía conceptual My World en Spotify.',
      en: 'Official cover art for the conceptual trilogy My World on Spotify.',
    },
    credits: { ca: 'Art: RAFA 930', es: 'Arte: RAFA 930', en: 'Art: RAFA 930' },
    year: { ca: '2025', es: '2025', en: '2025' },
  },
  'g-nose-si-estare': {
    title: {
      ca: 'Nose si estaré mañana',
      es: 'Nose si estaré mañana',
      en: 'Nose si estaré mañana',
    },
    categoryLabel: {
      ca: 'Single Oficial 2026',
      es: 'Single Oficial 2026',
      en: 'Official Single 2026',
    },
    description: {
      ca: 'Art conceptual sacre urbà per al senzill 2026.',
      es: 'Arte conceptual sacro urbano para el sencillo 2026.',
      en: 'Sacred urban concept artwork for the 2026 single.',
    },
    credits: { ca: 'Incrife & 930', es: 'Incrife & 930', en: 'Incrife & 930' },
    year: { ca: '2026', es: '2026', en: '2026' },
  },
};

export const GaleriaScreen: React.FC<GaleriaScreenProps> = ({
  language,
  onNavigateToBooking,
  onNavigateToServices,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'retrat' | 'mina' | 'moda' | 'urbana'
  >('all');

  const tabs = [
    { id: 'all', label: { ca: 'Totes les obres', es: 'Todas las obras', en: 'All works' } },
    { id: 'retrat', label: { ca: 'Retrat', es: 'Retrato', en: 'Portraits' } },
    { id: 'mina', label: { ca: 'La Mina / Arxiu', es: 'La Mina / Archivo', en: 'La Mina / Archive' } },
    { id: 'moda', label: { ca: 'Moda Urbana', es: 'Moda Urbana', en: 'Urban Fashion' } },
    { id: 'urbana', label: { ca: 'Artistes 930', es: 'Artistas 930', en: '930 Artists' } },
  ];

  const filteredPhotos =
    selectedCategory === 'all'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((p) => p.category === selectedCategory);

  const handleBookingClick = () => {
    if (onNavigateToBooking) {
      onNavigateToBooking();
    } else if (onNavigateToServices) {
      onNavigateToServices();
    }
  };

  return (
    <div className="relative w-full min-h-screen py-10 md:py-16 overflow-hidden">
      {/* Background image full width 100% */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden select-none z-0">
        <img
          src={ARTIST_IMAGES.heroPortrait}
          alt=""
          className="w-full h-full object-cover object-top filter contrast-125 brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050507] via-[#050507]/85 to-[#050507]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#22222e] pb-8">
        <div>
          <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl md:text-6xl font-semibold text-[#ffffff]">
            {language === 'ca'
              ? 'Direcció de Fotografia'
              : language === 'es'
              ? 'Dirección de Fotografía'
              : 'Photography Direction'}
          </h1>
          <p className="text-[#a1a1b5] text-base max-w-2xl mt-2 leading-relaxed">
            {language === 'ca'
              ? 'Estètica editorial, gra analògic i clarobscur. Sessions de retrat per a artistes, models de moda urbana i arxiu documental.'
              : language === 'es'
              ? 'Estética editorial, grano analógico y claroscuro. Sesiones de retrato para artistas, modelos de moda urbana y archivo documental.'
              : 'Editorial aesthetics, analog grain, and chiaroscuro. Portrait sessions for artists, urban fashion models, and documentary archive.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleBookingClick}
            className="touch-target-48 inline-flex items-center gap-2 gradient-lila-rosa-rojo text-white text-xs font-semibold px-6 py-3.5 rounded-xl hover:opacity-95 transition-all shrink-0 whitespace-nowrap shadow-md cursor-pointer"
          >
            <Camera className="w-4 h-4" />
            <span>
              {language === 'ca'
                ? 'Sol·licitar sessió fotogràfica'
                : language === 'es'
                ? 'Solicitar sesión fotográfica'
                : 'Book a photography session'}
            </span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 bg-[#0a0a0f] border border-[#22222e] rounded-xl max-w-full overflow-x-auto scrollbar-none w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setSelectedCategory(tab.id as typeof selectedCategory)}
            className={`touch-target-44 px-4 py-2 rounded-lg text-xs font-mono transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              selectedCategory === tab.id
                ? 'gradient-lila-rosa-rojo text-white font-semibold shadow-sm'
                : 'text-[#a1a1b5] hover:text-[#ffffff]'
            }`}
          >
            {tab.label[language]}
          </button>
        ))}
      </div>

      {/* Gallery Grid — Clean, Non-Clickable Editorial Showcase (no popup modal/info inspection) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPhotos.map((photo) => {
          const pI18n = PHOTO_I18N[photo.id];
          const title = pI18n ? pI18n.title[language] : photo.title;
          const catLabel = pI18n ? pI18n.categoryLabel[language] : photo.categoryLabel;
          const year = pI18n ? pI18n.year[language] : photo.year;
          const credits = pI18n ? pI18n.credits[language] : photo.credits;

          return (
            <div
              key={photo.id}
              className="bg-[#0e0e15] border border-[#22222e] rounded-xl overflow-hidden transition-all duration-300 hover:border-[#38384a] select-none"
            >
              <div className="relative aspect-square bg-[#0a0a0f] overflow-hidden">
                <LazyImage
                  src={photo.imageUrl}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>

              <div className="p-4 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-['Plus_Jakarta_Sans'] font-semibold text-sm text-[#ffffff] truncate leading-tight">
                    {title}
                  </h3>
                  <span className="text-[10px] font-mono text-[#00d4ff] shrink-0">
                    {year}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-[#8a8a9e] flex items-center justify-between gap-2">
                  <span className="truncate">{catLabel}</span>
                  {credits && <span className="text-[#a855f7] shrink-0">{credits}</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
};
