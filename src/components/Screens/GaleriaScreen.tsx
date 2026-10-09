import React, { useState } from 'react';
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
      ca: 'RAFA 930 · Rafael Moreno Román',
      es: 'RAFA 930 · Rafael Moreno Román',
      en: 'RAFA 930 · Rafael Moreno Román',
    },
    categoryLabel: {
      ca: 'Retrat Oficial',
      es: 'Retrato Oficial',
      en: 'Official Portrait',
    },
    description: {
      ca: 'Retrat editorial oficial de RAFA 930.',
      es: 'Retrato editorial oficial de RAFA 930.',
      en: 'Official editorial portrait of RAFA 930.',
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
      ca: 'Arxiu',
      es: 'Archivo',
      en: 'Archive',
    },
    description: {
      ca: 'Biblioteca Font de La Mina (Sant Adrià de Besòs).',
      es: 'Biblioteca Font de La Mina (Sant Adrià de Besòs).',
      en: 'Font de La Mina Library (Sant Adrià de Besòs).',
    },
    credits: {
      ca: 'Arxiu RAFA 930',
      es: 'Archivo RAFA 930',
      en: 'RAFA 930 Archive',
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
      ca: 'Model',
      es: 'Modelo',
      en: 'Model',
    },
    description: {
      ca: '',
      es: '',
      en: '',
    },
    credits: {
      ca: 'Instagram: @ssalmaem',
      es: 'Instagram: @ssalmaem',
      en: 'Instagram: @ssalmaem',
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
      ca: 'Model',
      es: 'Modelo',
      en: 'Model',
    },
    description: {
      ca: '',
      es: '',
      en: '',
    },
    credits: {
      ca: 'Instagram: @toliyug',
      es: 'Instagram: @toliyug',
      en: 'Instagram: @toliyug',
    },
    year: { ca: '2025', es: '2025', en: '2025' },
  },
  'g-quiriat': {
    title: {
      ca: 'Quiriat Jearim Deras Menjivar',
      es: 'Quiriat Jearim Deras Menjivar',
      en: 'Quiriat Jearim Deras Menjivar',
    },
    categoryLabel: {
      ca: 'Model',
      es: 'Modelo',
      en: 'Model',
    },
    description: {
      ca: '',
      es: '',
      en: '',
    },
    credits: {
      ca: 'Instagram: @derasmenjivar_13',
      es: 'Instagram: @derasmenjivar_13',
      en: 'Instagram: @derasmenjivar_13',
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
      ca: 'Artista',
      es: 'Artista',
      en: 'Artist',
    },
    description: {
      ca: '',
      es: '',
      en: '',
    },
    credits: {
      ca: 'Instagram: @therassam',
      es: 'Instagram: @therassam',
      en: 'Instagram: @therassam',
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
      ca: 'Fotògraf',
      es: 'Fotógrafo',
      en: 'Photographer',
    },
    description: {
      ca: '',
      es: '',
      en: '',
    },
    credits: {
      ca: 'Instagram: @incrife',
      es: 'Instagram: @incrife',
      en: 'Instagram: @incrife',
    },
    year: { ca: '2024', es: '2024', en: '2024' },
  },
};

export const GaleriaScreen: React.FC<GaleriaScreenProps> = ({
  language,
  onNavigateToServices,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'retrat' | 'moda' | 'urbana' | 'mina'>('all');
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  const filteredPhotos = GALLERY_PHOTOS.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  const tabs = [
    { id: 'all', label: { ca: 'Col·lecció completa (7)', es: 'Colección completa (7)', en: 'Full collection (7)' } },
    { id: 'retrat', label: { ca: 'Retrat Editorial', es: 'Retrato Editorial', en: 'Editorial Portrait' } },
    { id: 'moda', label: { ca: 'Moda Urbana', es: 'Moda Urbana', en: 'Urban Fashion' } },
    { id: 'urbana', label: { ca: 'Retrat d’Artistes', es: 'Retrato de Artistas', en: 'Artist Portraits' } },
    { id: 'mina', label: { ca: 'Arxiu Documental', es: 'Archivo Documental', en: 'Documentary Archive' } },
  ];

  const activePhotoI18n = activePhoto ? PHOTO_I18N[activePhoto.id] : null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-10 sm:py-16 space-y-12">
      {/* Editorial Header */}
      <div className="border-b border-[#22222e] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#a1a1b5] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] shadow-[0_0_8px_#00d4ff]" />
            <span className="text-[#ec4899] font-semibold">
              {language === 'ca'
                ? 'ARXIU FOTOGRÀFIC · RAFA 930'
                : language === 'es'
                ? 'ARCHIVO FOTOGRÁFICO · RAFA 930'
                : 'PHOTOGRAPHY ARCHIVE · RAFA 930'}
            </span>
            <span aria-hidden="true" className="text-[#00d4ff]">·</span>
            <span>
              {language === 'ca'
                ? 'RETRAT D’AUTOR & MODA URBANA'
                : language === 'es'
                ? 'RETRATO DE AUTOR & MODA URBANA'
                : 'AUTEUR PORTRAIT & URBAN FASHION'}
            </span>
          </div>
          <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-6xl font-semibold text-[#ffffff]">
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
          className="touch-target-48 inline-flex items-center gap-2 gradient-lila-rosa-rojo text-white text-xs font-semibold px-6 py-3.5 rounded-lg hover:opacity-95 transition-all shrink-0 whitespace-nowrap shadow-md"
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
            className={`touch-target-44 px-4 py-2 rounded-md text-xs font-mono transition-all whitespace-nowrap shrink-0 ${
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
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-black/75 backdrop-blur text-white flex items-center justify-center">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-1.5 bg-[#111118]">
                <div className="text-xs font-mono text-[#a855f7] tabular-nums flex items-center gap-1.5">
                  <span className="text-[#00d4ff] font-semibold">Fig. 0{idx + 1}</span>
                  <span>·</span>
                  <span>{catLabel}</span>
                  <span>·</span>
                  <span>{year}</span>
                </div>
                <h3 className="font-['Cormorant_Garamond'] font-semibold text-xl text-[#ffffff] group-hover:text-[#ec4899] transition-colors">
                  {title}
                </h3>
                {desc && <p className="text-xs text-[#a1a1b5] line-clamp-2">{desc}</p>}
                <div className="pt-2 border-t border-[#22222e] flex items-center justify-between text-[11px] font-mono text-[#a1a1b5]">
                  <span>{credits}</span>
                  <span>{photo.location}</span>
                </div>
              </div>
            </Card3D>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-[#050507]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#111118] border border-[#22222e] rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-20 touch-target-44 w-10 h-10 rounded-full bg-[#050507]/80 text-[#ffffff] hover:text-[#ec4899] border border-[#22222e] flex items-center justify-center"
              title={language === 'ca' ? 'Tancar' : language === 'es' ? 'Cerrar' : 'Close'}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="md:w-3/5 bg-black flex items-center justify-center max-h-[75vh] overflow-hidden">
              <img
                src={activePhoto.imageUrl}
                alt={activePhotoI18n ? activePhotoI18n.title[language] : activePhoto.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain max-h-[75vh]"
              />
            </div>

            <div className="md:w-2/5 p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-mono text-[#ec4899]">
                    {activePhotoI18n ? activePhotoI18n.categoryLabel[language] : activePhoto.categoryLabel}
                  </span>
                  <h3 className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl font-semibold text-[#ffffff] mt-1 leading-tight">
                    {activePhotoI18n ? activePhotoI18n.title[language] : activePhoto.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[#a1a1b5] leading-relaxed">
                  {activePhotoI18n ? activePhotoI18n.description[language] : activePhoto.description}
                </p>

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
                    <Calendar className="w-3.5 h-3.5 text-[#e11d48]" />
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
                  className="touch-target-48 w-full gradient-lila-rosa-rojo text-white font-semibold text-xs py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-95 transition-all"
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
