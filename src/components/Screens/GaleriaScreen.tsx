import React, { useState } from 'react';
import { Language } from '../../types';
import { GALLERY_PHOTOS } from '../../data/content';
import { Camera } from 'lucide-react';

interface GaleriaScreenProps {
  language: Language;
  onNavigateToServices: () => void;
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
  'g-salma': {
    title: {
      ca: 'Salma',
      es: 'Salma',
      en: 'Salma',
    },
    categoryLabel: {
      ca: 'Moda Urbana · @ssalmaem',
      es: 'Moda Urbana · @ssalmaem',
      en: 'Urban Fashion · @ssalmaem',
    },
    description: {
      ca: 'Retrat editorial d’estilisme de carrer. Instagram: @ssalmaem',
      es: 'Retrato editorial de estilismo de calle. Instagram: @ssalmaem',
      en: 'Editorial street style portrait. Instagram: @ssalmaem',
    },
    credits: {
      ca: '@ssalmaem',
      es: '@ssalmaem',
      en: '@ssalmaem',
    },
    year: { ca: '2025', es: '2025', en: '2025' },
  },
  'g-toliyug': {
    title: {
      ca: 'Toliyug',
      es: 'Toliyug',
      en: 'Toliyug',
    },
    categoryLabel: {
      ca: 'Moda & Retrat · @toliyug',
      es: 'Moda & Retrato · @toliyug',
      en: 'Fashion & Portrait · @toliyug',
    },
    description: {
      ca: 'Sèrie fotogràfica de moda urbana. Instagram: @toliyug',
      es: 'Serie fotográfica de moda urbana. Instagram: @toliyug',
      en: 'Urban fashion photo series. Instagram: @toliyug',
    },
    credits: {
      ca: '@toliyug',
      es: '@toliyug',
      en: '@toliyug',
    },
    year: { ca: '2025', es: '2025', en: '2025' },
  },
  'g-quiriat': {
    title: {
      ca: 'Quiriat Jearim',
      es: 'Quiriat Jearim',
      en: 'Quiriat Jearim',
    },
    categoryLabel: {
      ca: 'Retrat Editorial · @derasmenjivar_13',
      es: 'Retrato Editorial · @derasmenjivar_13',
      en: 'Editorial Portrait · @derasmenjivar_13',
    },
    description: {
      ca: 'Sessió de retrat amb il·luminació natural. Instagram: @derasmenjivar_13',
      es: 'Sesión de retrato con iluminación natural. Instagram: @derasmenjivar_13',
      en: 'Portrait session with natural light. Instagram: @derasmenjivar_13',
    },
    credits: {
      ca: '@derasmenjivar_13',
      es: '@derasmenjivar_13',
      en: '@derasmenjivar_13',
    },
    year: { ca: '2025', es: '2025', en: '2025' },
  },
  'g-therassam': {
    title: {
      ca: 'Therassam',
      es: 'Therassam',
      en: 'Therassam',
    },
    categoryLabel: {
      ca: 'Col·laborador · @therassam',
      es: 'Colaborador · @therassam',
      en: 'Collaborator · @therassam',
    },
    description: {
      ca: 'Retrat d’artista i aliat musical. Instagram: @therassam',
      es: 'Retrato de artista y aliado musical. Instagram: @therassam',
      en: 'Artist portrait and musical ally. Instagram: @therassam',
    },
    credits: {
      ca: '@therassam',
      es: '@therassam',
      en: '@therassam',
    },
    year: { ca: '2024', es: '2024', en: '2024' },
  },
  'g-kingsla': {
    title: {
      ca: 'Kingsla',
      es: 'Kingsla',
      en: 'Kingsla',
    },
    categoryLabel: {
      ca: 'Col·laborador · @amine_grafi',
      es: 'Colaborador · @amine_grafi',
      en: 'Collaborator · @amine_grafi',
    },
    description: {
      ca: 'Retrat d’artista urbà. Instagram: @amine_grafi',
      es: 'Retrato de artista urbano. Instagram: @amine_grafi',
      en: 'Urban artist portrait. Instagram: @amine_grafi',
    },
    credits: {
      ca: '@amine_grafi',
      es: '@amine_grafi',
      en: '@amine_grafi',
    },
    year: { ca: '2024', es: '2024', en: '2024' },
  },
  'g-ouxxox': {
    title: {
      ca: 'Ouxxox',
      es: 'Ouxxox',
      en: 'Ouxxox',
    },
    categoryLabel: {
      ca: 'Productor Musical · @_.ouxxox_fr33',
      es: 'Productor Musical · @_.ouxxox_fr33',
      en: 'Music Producer · @_.ouxxox_fr33',
    },
    description: {
      ca: 'Productor clau. Instagram: @_.ouxxox_fr33',
      es: 'Productor clave. Instagram: @_.ouxxox_fr33',
      en: 'Core producer. Instagram: @_.ouxxox_fr33',
    },
    credits: {
      ca: '@_.ouxxox_fr33',
      es: '@_.ouxxox_fr33',
      en: '@_.ouxxox_fr33',
    },
    year: { ca: '2024', es: '2024', en: '2024' },
  },
  'g-incrife': {
    title: {
      ca: 'Incrife',
      es: 'Incrife',
      en: 'Incrife',
    },
    categoryLabel: {
      ca: 'Direcció Visual · @incrife',
      es: 'Dirección Visual · @incrife',
      en: 'Visual Direction · @incrife',
    },
    description: {
      ca: 'Fotògraf i productor visual. Instagram: @incrife',
      es: 'Fotógrafo y productor visual. Instagram: @incrife',
      en: 'Lead photographer and visual producer. Instagram: @incrife',
    },
    credits: {
      ca: '@incrife',
      es: '@incrife',
      en: '@incrife',
    },
    year: { ca: '2024', es: '2024', en: '2024' },
  },
};

export const GaleriaScreen: React.FC<GaleriaScreenProps> = ({
  language,
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

  return (
    <div className="w-full px-4 sm:px-6 md:px-10 py-10 md:py-16 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#22222e] pb-8">
        <div>
          <span className="text-xs font-mono tracking-widest uppercase text-[#00d4ff] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />
            {language === 'ca'
              ? 'Arxiu Visual & Fotografia'
              : language === 'es'
              ? 'Archivo Visual & Fotografía'
              : 'Visual Archive & Photography'}
          </span>
          <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl md:text-6xl font-semibold text-[#ffffff] mt-3">
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
            onClick={onNavigateToServices}
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
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#0a0a0f] border border-[#22222e] rounded-xl w-fit">
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
                <img
                  src={photo.imageUrl}
                  alt={title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    // Resilient fallback container if image fails
                    const target = e.currentTarget;
                    target.style.display = 'none';
                  }}
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
  );
};
