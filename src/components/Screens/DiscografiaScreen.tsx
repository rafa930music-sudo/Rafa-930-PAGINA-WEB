import React, { useState } from 'react';
import { Track, Language } from '../../types';
import { TRACKS, OFFICIAL_SPOTIFY_URL } from '../../data/content';
import { Card3D } from '../Card3D';
import { SectionColorBubbles } from '../AmbientColorBubbles';
import {
  Play,
  ExternalLink,
  FileText,
  X,
  Radio,
} from 'lucide-react';

interface DiscografiaScreenProps {
  language: Language;
}

const TRACK_I18N: Record<
  string,
  {
    categoryLabel: Record<Language, string>;
    description: Record<Language, string>;
    lyricsExcerpt: Record<Language, string>;
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
      ca: 'EP CONCEPTUAL · 3 TEMES',
      es: 'EP CONCEPTUAL · 3 TEMAS',
      en: 'CONCEPTUAL EP · 3 TRACKS',
    },
    description: {
      ca: 'Trilogia conceptual composta per: 01. 1 Minuto y 10 Segundos · 02. Lo Material No Lo Es Todo · 03. Fuck Sistema.',
      es: 'Trilogía conceptual compuesta por: 01. 1 Minuto y 10 Segundos · 02. Lo Material No Lo Es Todo · 03. Fuck Sistema.',
      en: 'Conceptual trilogy featuring: 01. 1 Minuto y 10 Segundos · 02. Lo Material No Lo Es Todo · 03. Fuck Sistema.',
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
  'la-vida-es-bella': {
    categoryLabel: {
      ca: 'ÀLBUM DEBUT (2026)',
      es: 'ÁLBUM DEBUT (2026)',
      en: 'DEBUT ALBUM (2026)',
    },
    description: {
      ca: 'El projecte de llarga durada que celebra la resiliència, la maduresa escènica i l’amor per la vida.',
      es: 'El proyecto de larga duración que celebra la resiliencia, la madurez escénica y el amor por la vida.',
      en: 'The full-length project celebrating resilience, stage maturity, and love for life.',
    },
    lyricsExcerpt: {
      ca: 'Perquè la vida és bella si la saps mirar,\nencara que el camí costi de trepitjar.\nDes de Sant Adrià fins on vulgui arribar,\nporto la meva gent al meu cantar...',
      es: 'Porque la vida es bella si la sabes mirar,\naunque el camino cueste de pisar.\nDesde Sant Adrià hasta donde quiera llegar,\nllevo a mi gente en mi cantar...',
      en: 'Because life is beautiful if you know how to look,\neven when the road is hard to walk.\nFrom Sant Adrià as far as I can reach,\nI carry my people in my song...',
    },
    credits: {
      ca: 'RAFA 930 & Col·laboradors de La Mina',
      es: 'RAFA 930 & Colaboradores de La Mina',
      en: 'RAFA 930 & La Mina Collaborators',
    },
  },
  'un-amor-prohibido': {
    categoryLabel: {
      ca: 'HIT SINGLE · +1.000 REPS',
      es: 'HIT SINGLE · +1.000 REPS',
      en: 'HIT SINGLE · 1,000+ PLAYS',
    },
    description: {
      ca: 'Un dels temes més corejats de la trajectòria de RAFA 930, que va consolidar la seva audiència a les xarxes.',
      es: 'Uno de los temas más coreados de la trayectoria de RAFA 930, que consolidó su audiencia en las redes.',
      en: 'One of the most celebrated tracks in RAFA 930’s catalog, consolidating his audience across platforms.',
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
  'hago-dinero': {
    categoryLabel: {
      ca: 'HIT SINGLE · +500 REPS',
      es: 'HIT SINGLE · +500 REPS',
      en: 'HIT SINGLE · 500+ PLAYS',
    },
    description: {
      ca: 'Batec trap pur amb lírica directa sobre autosuficiència, treball dur i lleialtat a les arrels.',
      es: 'Pulso trap puro con lírica directa sobre autosuficiencia, trabajo duro y lealtad a las raíces.',
      en: 'Pure trap pulse with direct lyricism on self-reliance, hard work, and loyalty to one’s roots.',
    },
    lyricsExcerpt: {
      ca: 'Faig diners amb el meu talent i la meva suor,\nsense vendre el meu nom ni perdre el meu valor...',
      es: 'Hago dinero con mi talento y mi sudor,\nsin vender mi nombre ni perder mi valor...',
      en: 'Making money with my talent and my sweat,\nnever selling out my name or losing my worth...',
    },
    credits: {
      ca: 'RAFA 930 · Prod. Ouxxox',
      es: 'RAFA 930 · Prod. Ouxxox',
      en: 'RAFA 930 · Prod. Ouxxox',
    },
  },
  'tu-aroma': {
    categoryLabel: {
      ca: 'AVANÇAMENT 2026 · LA VIDA ES BELLA',
      es: 'ADELANTO 2026 · LA VIDA ES BELLA',
      en: '2026 PREVIEW · LA VIDA ES BELLA',
    },
    description: {
      ca: 'Primer avançament oficial (2026) del pròxim àlbum debut La Vida Es Bella. Una peça càlida, melòdica i lluminosa.',
      es: 'Primer adelanto oficial (2026) del próximo álbum debut La Vida Es Bella. Una pieza cálida, melódica y luminosa.',
      en: 'First official 2026 preview of the upcoming debut album La Vida Es Bella. A warm, melodic, and luminous piece.',
    },
    lyricsExcerpt: {
      ca: 'Em queda el teu aroma quan el vent passa,\nla ciutat calla i el teu record m’abraça...',
      es: 'Me queda tu aroma cuando el viento pasa,\nla ciudad calla y tu recuerdo me abraza...',
      en: 'Your scent lingers when the wind blows by,\nthe city goes quiet and your memory holds me...',
    },
    credits: {
      ca: 'RAFA 930 · Producció: 930 Records (2026)',
      es: 'RAFA 930 · Producción: 930 Records (2026)',
      en: 'RAFA 930 · Production: 930 Records (2026)',
    },
  },
  'vive-suena-en-tu-mundo': {
    categoryLabel: {
      ca: 'DEBUT OFICIAL · 24 MARÇ 2023',
      es: 'DEBUT OFICIAL · 24 MARZO 2023',
      en: 'OFFICIAL DEBUT · MARCH 24, 2023',
    },
    description: {
      ca: 'La primera cançó publicada per RAFA 930 al març de 2023. El fonament de tota la seva carrera.',
      es: 'La primera canción publicada por RAFA 930 en marzo de 2023. El cimiento de toda su carrera.',
      en: 'The very first song released by RAFA 930 in March 2023. The foundation of his entire career.',
    },
    lyricsExcerpt: {
      ca: 'Viu i somia en el teu propi món,\nno deixis que apaguin el que portes al fons...',
      es: 'Vive y sueña en tu propio mundo,\nno dejes que apaguen lo que llevas en el fondo...',
      en: 'Live and dream in your own world,\nnever let them dim what you carry deep inside...',
    },
    credits: {
      ca: 'RAFA 930 · Origen Biblioteca Font de La Mina',
      es: 'RAFA 930 · Origen Biblioteca Font de La Mina',
      en: 'RAFA 930 · Origin Font de La Mina Library',
    },
  },
};

export const DiscografiaScreen: React.FC<DiscografiaScreenProps> = ({
  language,
}) => {
  const [filter, setFilter] = useState<'all' | 'single' | 'ep' | 'album' | 'hit'>('all');
  const [selectedTrackId, setSelectedTrackId] = useState<string>(TRACKS[0].id);
  const [activeLyricsTrack, setActiveLyricsTrack] = useState<Track | null>(null);

  const filteredTracks = TRACKS.filter((t) => {
    if (filter === 'all') return true;
    return t.category === filter;
  });

  const currentPlayingTrack = TRACKS.find((t) => t.id === selectedTrackId) || TRACKS[0];
  const currentI18n = TRACK_I18N[currentPlayingTrack.id];

  const filterButtons = [
    {
      id: 'all',
      label: {
        ca: 'Totes les obres (8)',
        es: 'Todas las obras (8)',
        en: 'All works (8)',
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

  const activeLyricsI18n = activeLyricsTrack ? TRACK_I18N[activeLyricsTrack.id] : null;

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-10 sm:py-16 space-y-12 overflow-hidden">
      <SectionColorBubbles variant="music" />

      {/* Editorial Header */}
      <div className="relative z-10 border-b border-[#22222e] pb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#a1a1b5] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] shadow-[0_0_8px_#00d4ff]" />
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
              ? 'Discografia & Lletres'
              : language === 'es'
              ? 'Discografía & Letras'
              : 'Discography & Lyrics'}
          </h1>
          <p className="text-[#a1a1b5] text-base max-w-2xl mt-2 leading-relaxed">
            {language === 'ca'
              ? 'Música urbana, rap conscient i composicions originals. Disponibles en Spotify, reprodueix a YouTube o consulta les lletres completes.'
              : language === 'es'
              ? 'Música urbana, rap consciente y composiciones originales. Disponibles en Spotify, reproduce en YouTube o consulta las letras completas.'
              : 'Urban music, conscious rap, and original compositions. Available on Spotify, watch on YouTube, or view full lyrics.'}
          </p>
        </div>

        {/* Digital Platforms Block */}
        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#a1a1b5]">
            {language === 'ca' ? 'Totes les plataformes' : language === 'es' ? 'Todas mis plataformas digitales' : 'All my digital platforms'}
          </span>
          <div className="flex items-center gap-3">
             <a href="https://open.spotify.com/artist/2YyY3BFuxnqeYXlupNRcng" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#1DB954] transition-colors" title="Spotify"><img src="https://cdn.simpleicons.org/spotify/1DB954" alt="Spotify" className="w-5 h-5" /></a>
             <a href="https://www.youtube.com/@Rafa930" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#FF0000] transition-colors" title="YouTube"><img src="https://cdn.simpleicons.org/youtube/FF0000" alt="YouTube" className="w-5 h-5" /></a>
             <a href="https://www.deezer.com/mx/artist/224265995" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#FFB700] transition-colors" title="Deezer"><img src="https://cdn.simpleicons.org/deezer/FFB700" alt="Deezer" className="w-5 h-5" /></a>
             <a href="https://music.apple.com/es/artist/rafa-930/1724193275" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#FA5788] transition-colors" title="Apple Music"><img src="https://cdn.simpleicons.org/applemusic/FA5788" alt="Apple Music" className="w-5 h-5" /></a>
             <a href="https://music.amazon.in/artists/B0CJM7BWF1/rafa-930" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#FF9900] transition-colors" title="Amazon Music"><img src="https://cdn.simpleicons.org/amazonmusic/FF9900" alt="Amazon Music" className="w-5 h-5" /></a>
             <a href="https://tidal.com/artist/41128230" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#00FFFF] transition-colors" title="Tidal"><img src="https://cdn.simpleicons.org/tidal/00FFFF" alt="Tidal" className="w-5 h-5" /></a>
          </div>
        </div>

        {/* Official Spotify Profile Card / CTA */}
        <a
          href={OFFICIAL_SPOTIFY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="touch-target-48 px-5 py-3.5 rounded-xl bg-[#111118] border border-[#1DB954]/50 hover:border-[#1ed760] text-[#ffffff] flex items-center gap-3.5 shadow-[0_0_22px_rgba(29,185,84,0.18)] transition-all shrink-0 group"
        >
          <div className="w-10 h-10 rounded-lg bg-[#1DB954]/20 border border-[#1DB954]/50 flex items-center justify-center text-[#1ed760] shrink-0">
             <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.502 17.309c-.218.358-.684.471-1.042.253-2.855-1.745-6.449-2.14-10.684-1.173-.41.094-.82-.162-.914-.572-.094-.41.162-.82.572-.914 4.636-1.059 8.608-.616 11.815 1.364.358.218.471.684.253 1.042zm1.468-3.264c-.274.446-.86.588-1.306.314-3.269-2.009-8.252-2.592-12.119-1.417-.5.152-1.033-.133-1.185-.633-.152-.5.133-1.033.633-1.185 4.417-1.341 9.914-.689 13.663 1.615.446.274.588.86.314 1.306zm.126-3.399C15.18 8.36 8.71 8.146 4.969 9.282c-.602.183-1.242-.166-1.425-.768-.183-.602.166-1.242.768-1.425 4.316-1.31 11.458-1.063 15.98 1.621.541.321.718 1.022.397 1.563-.321.541-1.022.718-1.563.397z"/></svg>
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

      {/* Featured Active Track Deck (3D Floating Console) */}
      <Card3D
        intensity={5}
        glowColor="rgba(0, 212, 255, 0.25)"
        className="bg-[#111118]/90 backdrop-blur-md border border-[#00d4ff]/40 rounded-xl p-6 sm:p-8 shadow-[0_18px_45px_-12px_rgba(0,0,0,0.8),0_0_28px_rgba(0,212,255,0.12)]"
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-[#0a0a0f] shrink-0 border border-[#00d4ff]/35">
              <img
                src={currentPlayingTrack.coverUrl}
                alt={currentPlayingTrack.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <div className="text-xs font-mono text-[#00d4ff] tabular-nums">
                {currentI18n ? currentI18n.categoryLabel[language] : currentPlayingTrack.categoryLabel} · {currentPlayingTrack.year}
              </div>
              <h2 className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl font-semibold text-[#ffffff] mt-0.5">
                {currentPlayingTrack.title}
              </h2>
              <p className="text-xs font-mono text-[#a1a1b5] mt-1 tabular-nums">
                RAFA 930
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            <a
              href={currentPlayingTrack.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target-44 px-5 py-2.5 rounded-lg gradient-lila-rosa-rojo text-white font-semibold text-xs flex items-center gap-2 hover:opacity-95 transition-all shadow-md"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>
                {language === 'ca'
                  ? 'Escoltar a YouTube'
                  : language === 'es'
                  ? 'Escuchar en YouTube'
                  : 'Listen on YouTube'}
              </span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={() => setActiveLyricsTrack(currentPlayingTrack)}
              className="touch-target-44 px-4 py-2.5 rounded-lg bg-[#0a0a0f] border border-[#22222e] text-xs font-mono text-[#ffffff] hover:border-[#00d4ff] flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4 text-[#00d4ff]" />
              <span>
                {language === 'ca'
                  ? 'Veure lletra'
                  : language === 'es'
                  ? 'Ver letra'
                  : 'View lyrics'}
              </span>
            </button>

            <a
              href={currentPlayingTrack.spotifyUrl || OFFICIAL_SPOTIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target-44 px-4 py-2.5 rounded-lg bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold text-xs font-mono flex items-center gap-1.5 shadow-[0_0_15px_rgba(29,185,84,0.35)] transition-all"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.502 17.309c-.218.358-.684.471-1.042.253-2.855-1.745-6.449-2.14-10.684-1.173-.41.094-.82-.162-.914-.572-.094-.41.162-.82.572-.914 4.636-1.059 8.608-.616 11.815 1.364.358.218.471.684.253 1.042zm1.468-3.264c-.274.446-.86.588-1.306.314-3.269-2.009-8.252-2.592-12.119-1.417-.5.152-1.033-.133-1.185-.633-.152-.5.133-1.033.633-1.185 4.417-1.341 9.914-.689 13.663 1.615.446.274.588.86.314 1.306zm.126-3.399C15.18 8.36 8.71 8.146 4.969 9.282c-.602.183-1.242-.166-1.425-.768-.183-.602.166-1.242.768-1.425 4.316-1.31 11.458-1.063 15.98 1.621.541.321.718 1.022.397 1.563-.321.541-1.022.718-1.563.397z"/>
              </svg>
              <span>Spotify</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </Card3D>

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
          const isCurrent = currentPlayingTrack.id === track.id;
          const tI18n = TRACK_I18N[track.id];

          return (
            <Card3D
              key={track.id}
              intensity={8}
              onClick={() => setSelectedTrackId(track.id)}
              glowColor="rgba(236, 72, 153, 0.24)"
              className={`bg-[#111118]/90 backdrop-blur-sm border rounded-xl p-5 group shadow-[0_14px_34px_-10px_rgba(0,0,0,0.7)] cursor-pointer ${
                isCurrent ? 'border-[#ec4899]' : 'border-[#22222e] hover:border-[#a855f7]'
              }`}
            >
              <div>
                <div className="relative aspect-square rounded-lg overflow-hidden bg-[#0a0a0f] mb-4">
                  <img
                    src={track.coverUrl}
                    alt={track.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#050507]/85 backdrop-blur-md border border-[#1DB954]/60 text-[10px] font-mono text-[#1ed760] shadow-[0_0_12px_rgba(29,185,84,0.35)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954] animate-pulse" />
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
                  {tI18n ? tI18n.description[language] : track.description}
                </p>

                <p className="text-[11px] font-mono text-[#a1a1b5] mt-3 border-t border-[#22222e] pt-2">
                  {tI18n ? tI18n.credits[language] : track.credits}
                </p>
              </div>

              <div className="pt-4 border-t border-[#22222e] mt-4 flex items-center gap-2">
                <a
                  href={track.spotifyUrl || OFFICIAL_SPOTIFY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="touch-target-44 flex-1 py-2.5 px-3 rounded-lg bg-[#1DB954] hover:bg-[#1ed760] text-black hover:opacity-95 flex items-center justify-center gap-1.5 text-xs font-bold transition-all shadow-[0_0_14px_rgba(29,185,84,0.25)]"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.502 17.309c-.218.358-.684.471-1.042.253-2.855-1.745-6.449-2.14-10.684-1.173-.41.094-.82-.162-.914-.572-.094-.41.162-.82.572-.914 4.636-1.059 8.608-.616 11.815 1.364.358.218.471.684.253 1.042zm1.468-3.264c-.274.446-.86.588-1.306.314-3.269-2.009-8.252-2.592-12.119-1.417-.5.152-1.033-.133-1.185-.633-.152-.5.133-1.033.633-1.185 4.417-1.341 9.914-.689 13.663 1.615.446.274.588.86.314 1.306zm.126-3.399C15.18 8.36 8.71 8.146 4.969 9.282c-.602.183-1.242-.166-1.425-.768-.183-.602.166-1.242.768-1.425 4.316-1.31 11.458-1.063 15.98 1.621.541.321.718 1.022.397 1.563-.321.541-1.022.718-1.563.397z"/>
                  </svg>
                  <span>Spotify</span>
                  <ExternalLink className="w-3 h-3 text-black/70" />
                </a>

                <a
                  href={track.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="touch-target-44 flex-1 py-2.5 px-3 rounded-lg gradient-lila-rosa-rojo text-white hover:opacity-95 flex items-center justify-center gap-1.5 text-xs font-semibold transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveLyricsTrack(track);
                  }}
                  title={
                    language === 'ca'
                      ? 'Veure lletra completa'
                      : language === 'es'
                      ? 'Ver letra completa'
                      : 'View full lyrics'
                  }
                  className="touch-target-44 px-3 py-2.5 bg-[#0a0a0f] border border-[#22222e] hover:border-[#a855f7] text-[#a1a1b5] hover:text-[#ffffff] rounded-lg transition-colors flex items-center justify-center text-xs"
                >
                  <FileText className="w-4 h-4" />
                </button>
              </div>
            </Card3D>
          );
        })}
      </div>

      {/* Lyrics Modal View */}
      {activeLyricsTrack && (
        <div
          className="fixed inset-0 z-50 bg-[#050507]/90 backdrop-blur-md flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveLyricsTrack(null)}
        >
          <div
            className="bg-[#111118] border border-[#22222e] rounded-xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-[#22222e] pb-4">
              <div>
                <span className="text-xs font-mono text-[#ec4899]">
                  {language === 'ca'
                    ? 'LLETRA OFICIAL'
                    : language === 'es'
                    ? 'LETRA OFICIAL'
                    : 'OFFICIAL LYRICS'}
                </span>
                <h3 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#ffffff] mt-0.5">
                  {activeLyricsTrack.title}
                </h3>
                <p className="text-xs text-[#a1a1b5] font-mono tabular-nums">
                  RAFA 930 · {activeLyricsTrack.year}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveLyricsTrack(null)}
                className="touch-target-44 p-2 rounded-lg bg-[#0a0a0f] text-[#a1a1b5] hover:text-white border border-[#22222e]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-72 overflow-y-auto pr-2 space-y-3 font-serif italic text-base text-[#ffffff] whitespace-pre-line leading-relaxed bg-[#0a0a0f] p-5 rounded-lg border border-[#22222e]">
              {activeLyricsI18n
                ? activeLyricsI18n.lyricsExcerpt[language]
                : activeLyricsTrack.lyricsExcerpt}
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#a1a1b5]">© RAFA 930 · Rafael Moreno Román</span>
              <a
                href={activeLyricsTrack.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#ec4899] hover:underline flex items-center gap-1"
              >
                <span>
                  {language === 'ca'
                    ? 'Escoltar a YouTube'
                    : language === 'es'
                    ? 'Escuchar en YouTube'
                    : 'Listen on YouTube'}
                </span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
