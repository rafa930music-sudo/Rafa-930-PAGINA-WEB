import React, { useState, useEffect } from 'react';
import { GalleryPhoto, Language } from '../../types';
import { GALLERY_PHOTOS } from '../../data/content';
import { Card3D } from '../Card3D';
import {
  Camera,
  X,
  Maximize2,
  MapPin,
  Calendar,
  User,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

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
  'g-portrait-main': {
    title: {
      ca: 'RAFA 930',
      es: 'RAFA 930',
      en: 'RAFA 930',
    },
    categoryLabel: {
      ca: 'Retrat Oficial',
      es: 'Retrato Oficial',
      en: 'Official Portrait',
    },
    description: {
      ca: 'Retrat editorial oficial de RAFA 930 per a 930 Records.',
      es: 'Retrato editorial oficial de RAFA 930 para 930 Records.',
      en: 'Official editorial portrait session of RAFA 930 for 930 Records.',
    },
    credits: {
      ca: 'Arxiu 930 · Rafa 930',
      es: 'Archivo 930 · Rafa 930',
      en: '930 Archive · Rafa 930',
    },
    year: { ca: '2025', es: '2025', en: '2025' },
  },
  'g-portrait-incrife': {
    title: {
      ca: 'RAFA 930 · Clarobscur',
      es: 'RAFA 930 · Claroscuro',
      en: 'RAFA 930 · Chiaroscuro',
    },
    categoryLabel: {
      ca: 'Arxiu Editorial',
      es: 'Archivo Editorial',
      en: 'Editorial Archive',
    },
    description: {
      ca: 'Sessió editorial oficial en clarobscur per Incrife per a 930 Records.',
      es: 'Sesión editorial oficial en claroscuro por Incrife para 930 Records.',
      en: 'Official chiaroscuro editorial portrait session by Incrife for 930 Records.',
    },
    credits: {
      ca: 'Foto: Incrife (@incrife)',
      es: 'Foto: Incrife (@incrife)',
      en: 'Photo: Incrife (@incrife)',
    },
    year: { ca: '2025', es: '2025', en: '2025' },
  },
  'g-library': {
    title: {
      ca: 'Biblioteca Font de La Mina',
      es: 'Biblioteca Font de La Mina',
      en: 'Font de La Mina Library',
    },
    categoryLabel: {
      ca: 'Arxiu Històric',
      es: 'Archivo Histórico',
      en: 'Historical Archive',
    },
    description: {
      ca: 'Punt de trobada cultural i bressol creatiu de les primeres lletres i composicions.',
      es: 'Punto de encuentro cultural y cuna creativa de las primeras letras y composiciones.',
      en: 'Cultural meeting point and creative birthplace of first lyrics and compositions.',
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
      ca: 'Moda Urbana',
      es: 'Moda Urbana',
      en: 'Street Fashion',
    },
    description: {
      ca: 'Retrat editorial d’estilisme de carrer i estètica contemporània.',
      es: 'Retrato editorial de estilismo de calle y estética contemporánea.',
      en: 'Editorial street style portrait and contemporary aesthetics.',
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
      ca: 'Moda & Retrat',
      es: 'Moda & Retrato',
      en: 'Fashion & Portrait',
    },
    description: {
      ca: 'Sèrie fotogràfica de moda urbana i expressió visual.',
      es: 'Serie fotográfica de moda urbana y expresión visual.',
      en: 'Urban fashion photo series and visual expression.',
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
      ca: 'Retrat Editorial',
      es: 'Retrato Editorial',
      en: 'Editorial Portrait',
    },
    description: {
      ca: 'Sessió de retrat amb il·luminació natural i to cinematogràfic.',
      es: 'Sesión de retrato con iluminación natural y tono cinematográfico.',
      en: 'Portrait session with natural light and cinematic color grading.',
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
      ca: 'Col·laborador',
      es: 'Colaborador',
      en: 'Collaborator',
    },
    description: {
      ca: 'Retrat d’artista i aliat musical de l’escena del 930.',
      es: 'Retrato de artista y aliado musical de la escena del 930.',
      en: 'Artist portrait and musical ally in the 930 circle.',
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
      ca: 'Col·laborador',
      es: 'Colaborador',
      en: 'Collaborator',
    },
    description: {
      ca: 'Retrat d’artista urbà a Sant Adrià de Besòs.',
      es: 'Retrato de artista urbano en Sant Adrià de Besòs.',
      en: 'Urban artist portrait in Sant Adrià de Besòs.',
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
      ca: 'Productor Musical',
      es: 'Productor Musical',
      en: 'Music Producer',
    },
    description: {
      ca: 'Productor clau en el so trap i hip-hop del projecte 930.',
      es: 'Productor clave en el sonido trap y hip-hop del proyecto 930.',
      en: 'Core producer crafting the 930 trap and hip-hop sonic signature.',
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
      ca: 'Direcció Visual & Fotografia',
      es: 'Dirección Visual & Fotografía',
      en: 'Visual Direction & Photo',
    },
    description: {
      ca: 'Fotògraf i productor visual de la identitat gràfica de RAFA 930.',
      es: 'Fotógrafo y productor visual de la identidad gráfica de RAFA 930.',
      en: 'Lead photographer and visual producer behind RAFA 930 graphic identity.',
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
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  // Touch swipe tracking state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

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

  const activeIndex = activePhoto
    ? filteredPhotos.findIndex((p) => p.id === activePhoto.id)
    : -1;

  const handlePrevPhoto = () => {
    if (filteredPhotos.length === 0) return;
    const prevIdx = activeIndex > 0 ? activeIndex - 1 : filteredPhotos.length - 1;
    setActivePhoto(filteredPhotos[prevIdx]);
  };

  const handleNextPhoto = () => {
    if (filteredPhotos.length === 0) return;
    const nextIdx = activeIndex < filteredPhotos.length - 1 ? activeIndex + 1 : 0;
    setActivePhoto(filteredPhotos[nextIdx]);
  };

  // Keyboard navigation when modal is open
  useEffect(() => {
    if (!activePhoto) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActivePhoto(null);
      if (e.key === 'ArrowLeft') handlePrevPhoto();
      if (e.key === 'ArrowRight') handleNextPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto, activeIndex, filteredPhotos]);

  // Touch swipe gesture handlers
  const minSwipeDistance = 45;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNextPhoto();
    } else if (isRightSwipe) {
      handlePrevPhoto();
    }
  };

  const activePhotoI18n = activePhoto ? PHOTO_I18N[activePhoto.id] : null;

  return (
    <div className="w-full px-4 sm:px-6 md:px-10 py-10 md:py-16 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#22222e] pb-8">
        <div>
          <span className="text-xs font-mono tracking-widest uppercase text-[#00d4ff] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-ping" />
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

        <button
          type="button"
          onClick={onNavigateToServices}
          className="touch-target-48 inline-flex items-center gap-2 gradient-lila-rosa-rojo text-white text-xs font-semibold px-6 py-3.5 rounded-lg hover:opacity-95 transition-all shrink-0 whitespace-nowrap shadow-md cursor-pointer"
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

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#0a0a0f] border border-[#22222e] rounded-lg w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setSelectedCategory(tab.id as typeof selectedCategory)}
            className={`touch-target-44 px-4 py-2 rounded-md text-xs font-mono transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              selectedCategory === tab.id
                ? 'gradient-lila-rosa-rojo text-white font-semibold shadow-sm'
                : 'text-[#a1a1b5] hover:text-[#ffffff]'
            }`}
          >
            {tab.label[language]}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo, idx) => {
          const pI18n = PHOTO_I18N[photo.id];
          const title = pI18n ? pI18n.title[language] : photo.title;
          const catLabel = pI18n ? pI18n.categoryLabel[language] : photo.categoryLabel;
          const desc = pI18n ? pI18n.description[language] : photo.description;
          const credits = pI18n ? pI18n.credits[language] : photo.credits;
          const year = pI18n ? pI18n.year[language] : photo.year;

          return (
            <Card3D
              key={photo.id}
              intensity={8}
              onClick={() => setActivePhoto(photo)}
              glowColor="rgba(0, 212, 255, 0.24)"
              className="group cursor-pointer bg-[#111118]/90 backdrop-blur-sm border border-[#22222e] rounded-xl overflow-hidden hover:border-[#ec4899] shadow-[0_14px_34px_-10px_rgba(0,0,0,0.72)]"
            >
              <div className="relative aspect-[4/5] bg-[#0a0a0f] overflow-hidden">
                <img
                  src={photo.imageUrl}
                  alt={title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 bg-[#0a0a0f]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-black/75 backdrop-blur text-white flex items-center justify-center">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-2 bg-[#111118]">
                <div className="text-xs font-mono text-[#a855f7] tabular-nums flex items-center gap-1.5">
                  <span className="text-[#00d4ff] font-semibold">Fig. 0{idx + 1}</span>
                  <span>·</span>
                  <span>{catLabel}</span>
                  <span>·</span>
                  <span>{year}</span>
                </div>
                <h3 className="font-['Cormorant_Garamond'] font-semibold text-2xl text-[#ffffff] group-hover:text-[#ec4899] transition-colors leading-tight">
                  {title}
                </h3>
                {desc && desc !== title && (
                  <p className="text-xs text-[#a1a1b5] line-clamp-2 leading-relaxed">{desc}</p>
                )}
                <div className="pt-2 border-t border-[#22222e] flex items-center justify-between text-[11px] font-mono text-[#a1a1b5]">
                  <span>{credits}</span>
                  <span>{photo.location}</span>
                </div>
              </div>
            </Card3D>
          );
        })}
      </div>

      {/* Lightbox Modal with Touch Swipe & Arrow Navigation */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-[#050507]/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 md:p-8 select-none"
          role="dialog"
          aria-modal="true"
          onClick={() => setActivePhoto(null)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setActivePhoto(null)}
            className="absolute top-4 right-4 z-30 touch-target-44 w-11 h-11 rounded-full bg-[#050507]/85 text-[#ffffff] hover:text-[#ec4899] border border-[#22222e] flex items-center justify-center cursor-pointer shadow-lg"
            title={language === 'ca' ? 'Tancar' : language === 'es' ? 'Cerrar' : 'Close'}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Previous chevron button */}
          {filteredPhotos.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevPhoto();
              }}
              className="absolute left-2 sm:left-4 z-30 touch-target-44 w-11 h-11 rounded-full bg-[#050507]/85 text-[#ffffff] hover:text-[#00d4ff] hover:border-[#00d4ff] border border-[#22222e] flex items-center justify-center cursor-pointer shadow-xl transition-all"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Next chevron button */}
          {filteredPhotos.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNextPhoto();
              }}
              className="absolute right-2 sm:right-4 z-30 touch-target-44 w-11 h-11 rounded-full bg-[#050507]/85 text-[#ffffff] hover:text-[#00d4ff] hover:border-[#00d4ff] border border-[#22222e] flex items-center justify-center cursor-pointer shadow-xl transition-all"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          <div
            className="relative max-w-4xl w-full bg-[#111118] border border-[#22222e] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image viewer with swipe indicator */}
            <div className="md:w-3/5 bg-black flex items-center justify-center max-h-[60vh] md:max-h-[80vh] overflow-hidden relative group">
              <img
                src={activePhoto.imageUrl}
                alt={activePhotoI18n ? activePhotoI18n.title[language] : activePhoto.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain max-h-[60vh] md:max-h-[80vh]"
                loading="eager"
                decoding="async"
              />
              {/* Photo position pill */}
              <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur px-2.5 py-1 rounded-full border border-white/10 text-[11px] font-mono text-[#00d4ff]">
                {activeIndex + 1} / {filteredPhotos.length}
              </div>
            </div>

            {/* Info panel */}
            <div className="md:w-2/5 p-6 flex flex-col justify-between space-y-6 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-mono text-[#ec4899] uppercase tracking-wider">
                    {activePhotoI18n ? activePhotoI18n.categoryLabel[language] : activePhoto.categoryLabel}
                  </span>
                  <h3 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#ffffff] mt-1 leading-tight">
                    {activePhotoI18n ? activePhotoI18n.title[language] : activePhoto.title}
                  </h3>
                </div>

                {activePhotoI18n && activePhotoI18n.description[language] && (
                  <p className="text-xs sm:text-sm text-[#a1a1b5] leading-relaxed">
                    {activePhotoI18n.description[language]}
                  </p>
                )}

                <div className="space-y-2 border-t border-[#22222e] pt-4 text-xs font-mono">
                  <div className="flex items-center gap-2 text-[#ffffff]">
                    <User className="w-3.5 h-3.5 text-[#a855f7]" />
                    <span>{activePhotoI18n ? activePhotoI18n.credits[language] : activePhoto.credits}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#a1a1b5]">
                    <MapPin className="w-3.5 h-3.5 text-[#ec4899]" />
                    <span>{activePhoto.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#a1a1b5]">
                    <Calendar className="w-3.5 h-3.5 text-[#00d4ff]" />
                    <span>
                      {language === 'ca'
                        ? `Any: ${activePhotoI18n ? activePhotoI18n.year.ca : activePhoto.year}`
                        : language === 'es'
                        ? `Año: ${activePhotoI18n ? activePhotoI18n.year.es : activePhoto.year}`
                        : `Year: ${activePhotoI18n ? activePhotoI18n.year.en : activePhoto.year}`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#22222e]">
                <button
                  type="button"
                  onClick={() => {
                    setActivePhoto(null);
                    onNavigateToServices();
                  }}
                  className="touch-target-48 w-full gradient-lila-rosa-rojo text-white font-semibold text-xs py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-95 transition-all cursor-pointer shadow-md"
                >
                  <Camera className="w-4 h-4" />
                  <span>
                    {language === 'ca'
                      ? 'Contractar sessió similar'
                      : language === 'es'
                      ? 'Contratar sesión similar'
                      : 'Book a similar session'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
