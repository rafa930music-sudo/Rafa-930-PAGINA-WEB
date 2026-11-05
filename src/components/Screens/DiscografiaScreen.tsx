import React, { useState } from 'react';
import { Track, Language } from '../../types';
import { TRACKS, OFFICIAL_SPOTIFY_URL, ARTIST_IMAGES } from '../../data/content';
import { Card3D } from '../Card3D';
import { SectionColorBubbles } from '../AmbientColorBubbles';
import {
  Play,
  ExternalLink,
} from 'lucide-react';
import {
  SpotifyLogo,
  YouTubeLogo,
  DeezerLogo,
  AppleMusicLogo,
  AmazonMusicLogo,
  TidalLogo,
} from '../PlatformLogos';

interface DiscografiaScreenProps {
  language: Language;
}

const TRACK_I18N: Record<
  string,
  {
    categoryLabel: Record<Language, string>;
    description: Record<Language, string>;
    lyricsExcerpt?: Record<Language, string>;
    credits: Record<Language, string>;
  }
> = {
  'de-vuelta': {
    categoryLabel: {
      ca: 'NOU TEMA DESTACAT 2026',
      es: 'NUEVO TEMA DESTACADO 2026',
      en: 'NEW FEATURED 2026 SINGLE',
    },
    description: {
      ca: 'El nou llançament destacat de RAFA 930 en 2026. Energia nocturna sota les llums del metro, retorn amb més força i l’essència pura del codi 930.',
      es: 'El nuevo lanzamiento destacado de RAFA 930 en 2026. Energía nocturna bajo las luces del metro, regreso con más fuerza y la esencia pura del código 930.',
      en: 'RAFA 930’s new featured 2026 release. Nocturnal energy beneath the subway neon lights, returning stronger with the pure essence of the 930 code.',
    },
    lyricsExcerpt: {
      ca: 'Estic de tornada al carrer on tot va començar,\nsota les llums de neó ningú em farà callar.\nCada pas que dono porta el segell del 930,\ntorno amb més veritat i l’ànima ben desperta...',
      es: 'Estoy de vuelta en la calle donde todo empezó,\nbajo las luces de neón nadie me hará callar.\nCada paso que doy lleva el sello del 930,\nvuelvo con más verdad y el alma bien despierta...',
      en: 'I’m back on the street where it all began,\nunder the neon lights no one will silence me.\nEvery step I take carries the 930 seal,\nreturning with deeper truth and a wide-awake soul...',
    },
    credits: {
      ca: 'Lletra i Veu: RAFA 930 · 930 Records (2026)',
      es: 'Letra y Voz: RAFA 930 · 930 Records (2026)',
      en: 'Lyrics & Vocals: RAFA 930 · 930 Records (2026)',
    },
  },
  'hago-dinero': {
    categoryLabel: {
      ca: 'HIT SINGLE · TRAP POTENT',
      es: 'HIT SINGLE · TRAP POTENTE',
      en: 'HIT SINGLE · POWERFUL TRAP',
    },
    description: {
      ca: 'Creixement orgànic sostingut a plataformes d’streaming i YouTube amb so trap potent i lírica directa del barri.',
      es: 'Crecimiento orgánico sostenido en plataformas de streaming y YouTube con sonido trap potente y lírica directa de barrio.',
      en: 'Sustained organic growth across streaming platforms and YouTube with powerful trap sound and direct neighborhood lyrics.',
    },
    credits: {
      ca: 'Lletra i Veu: RAFA 930 · 930 Records',
      es: 'Letra y Voz: RAFA 930 · 930 Records',
      en: 'Lyrics & Vocals: RAFA 930 · 930 Records',
    },
  },
  'nose-si-estare-manana': {
    categoryLabel: {
      ca: 'SENZILL OFICIAL 2026',
      es: 'SENCILLO OFICIAL 2026',
      en: 'OFFICIAL 2026 SINGLE',
    },
    description: {
      ca: 'Un senzill carregat d’urgència vital, melodies envolupants i la introspecció més honesta de RAFA 930.',
      es: 'Un sencillo cargado de urgencia vital, melodías envolventes y la introspección más honesta de RAFA 930.',
      en: 'A single charged with vital urgency, immersive melodies, and RAFA 930’s most honest introspection.',
    },
    lyricsExcerpt: {
      ca: 'Miro al cielo y no sé si estaré mañana,\npero hoy te juro que canto con el alma.\nSalgo a la calle con la fe en la mirada,\ndesde La Mina con la voz afilada...',
      es: 'Miro al cielo y no sé si estaré mañana,\npero hoy te juro que canto con el alma.\nSalgo a la calle con la fe en la mirada,\ndesde La Mina con la voz afilada...',
      en: 'I look at the sky and don’t know if I’ll be here tomorrow,\nbut today I swear I sing from the soul.\nStepping onto the street with faith in my eyes,\nfrom La Mina with a sharpened voice...',
    },
    credits: {
      ca: 'Lletra: RAFA 930 · Producció: Incrife · Mescla & Màster: 930 Records',
      es: 'Letra: RAFA 930 · Producción: Incrife · Mezcla & Máster: 930 Records',
      en: 'Lyrics: RAFA 930 · Production: Incrife · Mix & Master: 930 Records',
    },
  },
  'my-world-ep': {
    categoryLabel: {
      ca: 'EP OFICIAL · JA A SPOTIFY',
      es: 'EP OFICIAL · YA EN SPOTIFY',
      en: 'OFFICIAL EP · OUT NOW ON SPOTIFY',
    },
    description: {
      ca: 'Trilogia conceptual disponible oficialment a Spotify: 01. 1 Minuto y 10 Segundos · 02. Lo Material No Lo Es Todo · 03. Fuck Sistema.',
      es: 'Trilogía conceptual disponible oficialmente en Spotify: 01. 1 Minuto y 10 Segundos · 02. Lo Material No Lo Es Todo · 03. Fuck Sistema.',
      en: 'Conceptual trilogy available officially on Spotify: 01. 1 Minuto y 10 Segundos · 02. Lo Material No Lo Es Todo · 03. Fuck Sistema.',
    },
    lyricsExcerpt: {
      ca: 'Un minut i deu segons per dir el que sento,\nallò material s’apaga amb el pas del temps,\ncontra un sistema cec jo no em doblego,\nporto el meu barri a cada sentiment...',
      es: 'Un minuto y diez segundos para decir lo que siento,\nlo material se apaga con el paso del tiempo,\ncontra un sistema ciego yo no me doblego,\nllevo a mi barrio en cada sentimiento...',
      en: 'One minute and ten seconds to speak my mind,\nmaterial things fade away with time,\nagainst a blind system I refuse to bow,\ncarrying my neighborhood in every feeling...',
    },
    credits: {
      ca: 'RAFA 930 · Direcció Visual: Incrife · Art: 930 Digital',
      es: 'RAFA 930 · Dirección Visual: Incrife · Arte: 930 Digital',
      en: 'RAFA 930 · Visual Direction: Incrife · Art: 930 Digital',
    },
  },
  'romeo-y-julieta': {
    categoryLabel: {
      ca: 'SINGLE OFICIAL · AUDIO',
      es: 'SENCILLO OFICIAL · AUDIO',
      en: 'OFFICIAL SINGLE · AUDIO',
    },
    description: {
      ca: 'Relat romàntic urbà intens que reinterpreta el clàssic des de la perspectiva del barri.',
      es: 'Relato romántico urbano intenso que reinterpreta el clásico desde la perspectiva del barrio.',
      en: 'Intense urban romantic tale reinterpreting the classic from a neighborhood perspective.',
    },
    lyricsExcerpt: {
      ca: 'Som com Romeo i Julieta al mateix carrer,\non les promeses valen més que qualsevol paper...\nTu i jo contra el món sencer...',
      es: 'Somos como Romeo y Julieta en la misma calle,\ndonde las promesas valen más que cualquier papel...\nTú y yo contra el mundo entero...',
      en: 'We are like Romeo and Juliet on the same street,\nwhere promises mean more than any paper...\nYou and I against the entire world...',
    },
    credits: {
      ca: 'RAFA 930 · 930 Records',
      es: 'RAFA 930 · 930 Records',
      en: 'RAFA 930 · 930 Records',
    },
  },
  'diferentes-caminos': {
    categoryLabel: {
      ca: 'TEMA INÈDIT · YOUTUBE',
      es: 'TEMA INÉDITO · YOUTUBE',
      en: 'UNRELEASED TRACK · YOUTUBE',
    },
    description: {
      ca: 'Reflexió profunda sobre la separació de rutes i la maduresa personal davant la vida.',
      es: 'Reflexión profunda sobre la separación de rutas y la madurez personal ante la vida.',
      en: 'Deep reflection on path separation and personal maturity in life.',
    },
    lyricsExcerpt: {
      ca: 'Ara prenem diferents camins sota el mateix cel,\nrecordant tot allò que vam escriure en paper...',
      es: 'Ahora tomamos diferentes caminos bajo el mismo cielo,\nrecordando todo aquello que escribimos en papel...',
      en: 'Now we take different paths under the same sky,\nremembering everything we wrote on paper...',
    },
    credits: {
      ca: 'RAFA 930 · 930 Records',
      es: 'RAFA 930 · 930 Records',
      en: 'RAFA 930 · 930 Records',
    },
  },
  'pasan-los-dias': {
    categoryLabel: {
      ca: 'TEMA INÈDIT · YOUTUBE',
      es: 'TEMA INÉDITO · YOUTUBE',
      en: 'UNRELEASED TRACK · YOUTUBE',
    },
    description: {
      ca: 'El pas del temps i la constància diària en la recerca de metes i superació personal.',
      es: 'El paso del tiempo y la constancia diaria en la búsqueda de metas y superación personal.',
      en: 'The passage of time and daily perseverance in pursuing goals and personal growth.',
    },
    lyricsExcerpt: {
      ca: 'Pasan los días y la mente sigue en pie,\nlluitant per tot allò que jo sempre vaig creure...',
      es: 'Pasan los días y la mente sigue en pie,\nluchando por todo aquello que yo siempre creí...',
      en: 'Days pass and the mind remains standing,\nfighting for everything I always believed in...',
    },
    credits: {
      ca: 'RAFA 930 · 930 Records',
      es: 'RAFA 930 · 930 Records',
      en: 'RAFA 930 · 930 Records',
    },
  },
  'un-amor-prohibido': {
    categoryLabel: {
      ca: 'HIT SINGLE · +1.2K REPS',
      es: 'HIT SINGLE · +1.2K REPS',
      en: 'HIT SINGLE · 1.2K+ PLAYS',
    },
    description: {
      ca: 'Un dels temes més corejats i escoltats de la trajectòria de RAFA 930 a YouTube.',
      es: 'Uno de los temas más coreados y escuchados de la trayectoria de RAFA 930 en YouTube.',
      en: 'One of the most chanted and streamed tracks in RAFA 930’s career on YouTube.',
    },
    lyricsExcerpt: {
      ca: 'Sé que deien que no podia ser,\nun amor prohibit sota el mateix carrer.\nTu i jo mirant la lluna créixer,\nsense por del que hagi de vèncer...',
      es: 'Sé que decían que no podía ser,\nun amor prohibido bajo la misma calle.\nTú y yo mirando la luna crecer,\nsin miedo a lo que haya que vencer...',
      en: 'I know they said it could never be,\na forbidden love beneath the same street.\nYou and I watching the moon rise,\nfearless of whatever we must overcome...',
    },
    credits: {
      ca: 'RAFA 930 · 930 Records',
      es: 'RAFA 930 · 930 Records',
      en: 'RAFA 930 · 930 Records',
    },
  },
};

export const DiscografiaScreen: React.FC<DiscografiaScreenProps> = ({
  language,
}) => {
  const [filter, setFilter] = useState<'all' | 'single' | 'ep' | 'album' | 'hit'>('all');

  const filteredTracks = TRACKS.filter((t) => {
    if (filter === 'all') return true;
    return t.category === filter;
  });

  const filterButtons = [
    {
      id: 'all',
      label: {
        ca: `Totes les obres (${TRACKS.length})`,
        es: `Todas las obras (${TRACKS.length})`,
        en: `All works (${TRACKS.length})`,
      },
    },
    {
      id: 'single',
      label: {
        ca: 'Senzills',
        es: 'Sencillos',
        en: 'Singles',
      },
    },
    {
      id: 'ep',
      label: {
        ca: 'EPs',
        es: 'EPs',
        en: 'EPs',
      },
    },
    {
      id: 'album',
      label: {
        ca: 'Àlbums',
        es: 'Álbumes',
        en: 'Albums',
      },
    },
    {
      id: 'hit',
      label: {
        ca: 'Destacats',
        es: 'Destacados',
        en: 'Highlights',
      },
    },
  ];


  return (
    <div className="relative w-full min-h-screen py-10 sm:py-16 overflow-hidden">
      {/* Background image full width 100% */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden select-none z-0">
        <img
          src={ARTIST_IMAGES.epMyWorld}
          alt=""
          className="w-full h-full object-cover object-center filter contrast-125 brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050507] via-[#050507]/80 to-[#050507]" />
      </div>

      <SectionColorBubbles variant="music" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 space-y-12">

      {/* Editorial Header */}
      <div className="relative z-10 border-b border-[#22222e] pb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#a1a1b5] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />
            <span className="text-[#ec4899] font-semibold">
              {language === 'ca'
                ? 'CATÀLEG DISCOGRÀFIC OFICIAL · RAFA 930'
                : language === 'es'
                ? 'CATÁLOGO DISCOGRÁFICO OFICIAL · RAFA 930'
                : 'OFFICIAL DISCOGRAPHY CATALOG · RAFA 930'}
            </span>
            <span aria-hidden="true" className="text-[#00d4ff]">·</span>
            <span>
              {language === 'ca'
                ? 'OBRES PUBLICADES (2023–2026)'
                : language === 'es'
                ? 'OBRAS PUBLICADAS (2023–2026)'
                : 'PUBLISHED WORKS (2023–2026)'}
            </span>
          </div>
          <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-6xl font-semibold text-[#ffffff]">
            {language === 'ca'
              ? 'Discografia Oficial'
              : language === 'es'
              ? 'Discografía Oficial'
              : 'Official Discography'}
          </h1>
          <p className="text-[#a1a1b5] text-base max-w-2xl mt-2 leading-relaxed">
            {language === 'ca'
              ? 'Música urbana, rap conscient i composicions originals. Disponibles en streaming oficial a Spotify i YouTube.'
              : language === 'es'
              ? 'Música urbana, rap consciente y composiciones originales. Disponibles en streaming oficial en Spotify y YouTube.'
              : 'Urban music, conscious rap, and original compositions. Available on official streaming on Spotify and YouTube.'}
          </p>
        </div>

        {/* Digital Platforms Block */}
        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#a1a1b5]">
            {language === 'ca' ? 'Totes les plataformes' : language === 'es' ? 'Todas mis plataformas digitales' : 'All my digital platforms'}
          </span>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
             <a href="https://open.spotify.com/artist/2YyY3BFuxnqeYXlupNRcng" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#1DB954] text-white hover:text-[#1ed760] transition-colors" title="Spotify"><SpotifyLogo className="w-5 h-5 text-white" /></a>
             <a href="https://www.youtube.com/@rafa_930" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#FF0000] text-white hover:text-[#FF0000] transition-colors" title="YouTube"><YouTubeLogo className="w-5 h-5 text-white" /></a>
             <a href="https://www.deezer.com/mx/artist/224265995" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#FFB700] text-white hover:text-[#FFB700] transition-colors" title="Deezer"><DeezerLogo className="w-5 h-5 text-white" /></a>
             <a href="https://music.apple.com/es/artist/rafa-930/1724193275" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#FA5788] text-white hover:text-[#FA5788] transition-colors" title="Apple Music"><AppleMusicLogo className="w-5 h-5 text-white" /></a>
             <a href="https://music.amazon.in/artists/B0CJM7BWF1/rafa-930" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#FF9900] text-white hover:text-[#FF9900] transition-colors" title="Amazon Music"><AmazonMusicLogo className="w-5 h-5 text-white" /></a>
             <a href="https://tidal.com/artist/41128230" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#00FFFF] text-white hover:text-[#00FFFF] transition-colors" title="Tidal"><TidalLogo className="w-5 h-5 text-white" /></a>
          </div>
        </div>

        {/* Official Spotify Profile Card / CTA */}
        <a
          href={OFFICIAL_SPOTIFY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="touch-target-48 px-5 py-3.5 rounded-xl bg-[#111118] border border-[#1DB954]/60 hover:border-[#1ed760] text-[#ffffff] flex items-center gap-3.5 shadow-[0_0_22px_rgba(29,185,84,0.18)] transition-all shrink-0 group"
        >
          <div className="w-10 h-10 rounded-lg bg-[#1DB954] text-white flex items-center justify-center shrink-0 shadow-md">
             <SpotifyLogo className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#1ed760] block font-semibold">
              {language === 'ca'
                ? 'PERFIL D’ARTISTA OFICIAL'
                : language === 'es'
                ? 'PERFIL DE ARTISTA OFICIAL'
                : 'OFFICIAL ARTIST PROFILE'}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#ffffff] group-hover:text-[#1ed760] transition-colors flex items-center gap-1.5">
              <span>
                {language === 'ca'
                  ? 'Escoltar a Spotify · Seguir RAFA 930'
                  : language === 'es'
                  ? 'Escuchar en Spotify · Seguir a RAFA 930'
                  : 'Listen on Spotify · Follow RAFA 930'}
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-[#1ed760]" />
            </span>
          </div>
        </a>
      </div>

      {/* Category Filter Controls */}
      <div className="flex items-center gap-1.5 p-1.5 bg-[#0a0a0f]/90 backdrop-blur-md border border-[#22222e] rounded-lg max-w-full overflow-x-auto scrollbar-none shadow-[0_10px_25px_-8px_rgba(0,0,0,0.65)]">
        {filterButtons.map((btn) => (
          <button
            key={btn.id}
            type="button"
            onClick={() => setFilter(btn.id as typeof filter)}
            className={`touch-target-44 px-4 py-2 rounded-md text-xs font-mono transition-all whitespace-nowrap shrink-0 ${
              filter === btn.id
                ? 'gradient-lila-rosa-rojo text-white font-semibold shadow-sm'
                : 'text-[#a1a1b5] hover:text-[#ffffff]'
            }`}
          >
            {btn.label[language]}
          </button>
        ))}
      </div>

      {/* Tracks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTracks.map((track) => {
          const tI18n = TRACK_I18N[track.id];

          return (
            <Card3D
              key={track.id}
              intensity={8}
              glowColor="rgba(236, 72, 153, 0.24)"
              className="bg-[#111118]/90 backdrop-blur-sm border border-[#22222e] hover:border-[#a855f7] rounded-xl p-5 group shadow-[0_14px_34px_-10px_rgba(0,0,0,0.7)]"
            >
              <div>
                <div className="relative aspect-square rounded-lg overflow-hidden bg-[#0a0a0f] mb-4">
                  <img
                    src={track.coverUrl}
                    alt={track.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.retried) {
                        target.dataset.retried = '1';
                        target.src = `./assets/${track.id}-cover.jpg`;
                      }
                    }}
                  />
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#050507]/90 backdrop-blur-md border border-white/30 text-[10px] font-mono text-white font-semibold shadow-[0_0_12px_rgba(0,0,0,0.5)]">
                    <SpotifyLogo className="w-3.5 h-3.5 text-white" />
                    <span>Spotify</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 text-xs font-mono text-[#a1a1b5] mb-1 tabular-nums">
                  <span className="text-[#a855f7]">
                    {tI18n ? tI18n.categoryLabel[language] : track.categoryLabel}
                  </span>
                  <span>
                    {track.year} · {track.duration}
                  </span>
                </div>

                <h3 className="font-['Cormorant_Garamond'] font-semibold text-2xl text-[#ffffff] group-hover:text-[#ec4899] transition-colors">
                  {track.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#a1a1b5] mt-2 leading-relaxed">
                  {tI18n
                    ? tI18n.description[language]
                    : typeof track.description === 'string'
                    ? track.description
                    : track.description[language]}
                </p>
              </div>

              <div className="pt-4 border-t border-[#22222e] mt-4 flex flex-col sm:flex-row items-center gap-2">
                <a
                  href={track.spotifyUrl || OFFICIAL_SPOTIFY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target-44 w-full sm:flex-1 py-2.5 px-3 rounded-lg bg-[#1DB954] hover:bg-[#1ed760] text-white font-bold flex items-center justify-center gap-1.5 text-xs transition-all shadow-[0_0_14px_rgba(29,185,84,0.25)]"
                >
                  <SpotifyLogo className="w-4 h-4 text-white shrink-0" />
                  <span>Spotify</span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/80" />
                </a>

                <a
                  href={track.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target-44 w-full sm:flex-1 py-2.5 px-3 rounded-lg gradient-lila-rosa-rojo text-white hover:opacity-95 flex items-center justify-center gap-1.5 text-xs font-semibold transition-all"
                >
                  <YouTubeLogo className="w-4 h-4 text-white shrink-0" />
                  <span>YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/80" />
                </a>
              </div>
            </Card3D>
          );
        })}
      </div>
      </div>
    </div>
  );
};
