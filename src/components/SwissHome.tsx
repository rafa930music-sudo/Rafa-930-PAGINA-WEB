import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  Headphones, 
  Play, 
  Pause,
  Mail, 
  MessageSquare,
  Ticket,
  Zap,
  Volume2,
  VolumeX,
  Disc3,
  Sparkles,
  Radio,
  Share2,
  ExternalLink,
  Flame
} from 'lucide-react';
import { 
  OFFICIAL_SPOTIFY_URL, 
  OFFICIAL_EMAIL,
  OFFICIAL_WHATSAPP,
  OFFICIAL_YOUTUBE_URL,
  DISCOGRAPHY_TRACKS,
  SHOWS 
} from '../data/content';
import { Language, Screen } from '../types';
import { PressKitModule } from './PressKitModule';

interface SwissHomeProps {
  language: Language;
  onNavigate: (screen: Screen) => void;
}

export const SwissHome: React.FC<SwissHomeProps> = ({ language, onNavigate }) => {
  // Track seleccionado para la consola interactiva de audio / vinilo
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);

  const currentTrack = DISCOGRAPHY_TRACKS[selectedTrackIndex] || DISCOGRAPHY_TRACKS[0];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentTrack.spotifyUrl || OFFICIAL_SPOTIFY_URL);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <main className="w-full bg-[#040308] text-[#e2e0f5] selection:bg-[#ff007f] selection:text-white font-sans overflow-x-hidden relative">
      
      {/* ATMÓSFERA NEÓN DUAL ELÉCTRICA: CIAN & ROSA FUSIÓN */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none fixed inset-0 z-0 opacity-40 mix-blend-screen bg-[radial-gradient(ellipse_60%_50%_at_15%_10%,rgba(0,240,255,0.22),transparent_70%),radial-gradient(ellipse_60%_50%_at_85%_15%,rgba(255,0,127,0.24),transparent_70%)]"
      />
      <div 
        aria-hidden="true" 
        className="pointer-events-none fixed inset-0 z-0 opacity-20 bg-[radial-gradient(ellipse_80%_60%_at_50%_75%,rgba(157,78,221,0.18),transparent_80%)]"
      />
      {/* Cuadrícula sutil de alta precisión */}
      <div 
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.04] bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:24px_24px]"
      />

      {/* 1. TOP MARQUEE ELÉCTRICO */}
      <section 
        aria-label="Cinta de estado en directo"
        className="relative z-10 border-b border-[#1f1938] bg-[#080614]/90 backdrop-blur-md py-2.5 px-4 text-[11px] font-mono uppercase tracking-[0.22em] text-[#9490b8] flex items-center justify-between overflow-x-auto gap-6"
      >
        <div className="flex items-center gap-3 shrink-0">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff007f] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00f0ff]" />
          </span>
          <span className="text-white font-black tracking-widest flex items-center gap-1.5">
            <span className="text-[#00f0ff]">930</span>
            <span>RECORDS</span>
            <span className="text-[#ff007f] font-mono">ELECTRIC SOUND SYSTEM</span>
          </span>
          <span className="text-[#3b325c]">///</span>
          <span className="text-[#c5c1ea]">SANT ADRIÀ · LA MINA · BARCELONA 08930</span>
        </div>
        <div className="flex items-center gap-4 text-[10px] text-[#8680ad] shrink-0 font-bold">
          <span className="px-2 py-0.5 rounded bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30">MASTER 24-BIT</span>
          <span className="hidden sm:inline text-[#ff007f]">RAP CONSCIENTE · TRAP MELÓDICO</span>
          <span className="text-white font-mono flex items-center gap-1">
            <Radio className="w-3 h-3 text-[#00f0ff] animate-pulse" />
            WORLDWIDE AUDIO STREAM
          </span>
        </div>
      </section>

      {/* 2. HERO MONUMENTAL ELÉCTRICO */}
      <section 
        aria-labelledby="hero-title"
        className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-8 pt-12 pb-20 md:pt-20 md:pb-28 border-b border-[#1f1938]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Lado izquierdo: Tipografía y Contenido Eléctrico */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Pill de Estado Eléctrico */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0d0a1d] border border-[#ff007f]/40 text-[11px] font-mono text-[#ff007f] uppercase tracking-widest shadow-[0_0_20px_rgba(255,0,127,0.25)]">
              <Zap className="w-3.5 h-3.5 text-[#00f0ff] animate-bounce" aria-hidden="true" />
              <span className="text-white font-black">CICLO MUSICAL ACTIVO</span>
              <span className="text-[#3b325c]">·</span>
              <span className="text-[#00f0ff]">GIRA 2026</span>
            </div>

            {/* Titular Monumental con Resplandor Neón */}
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-mono tracking-[0.4em] text-[#00f0ff] uppercase font-bold flex items-center gap-2">
                <span>BARCELONA URBAN POWER</span>
                <span className="h-px w-12 bg-gradient-to-r from-[#00f0ff] to-transparent" />
              </p>
              <h1 
                id="hero-title"
                className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85] text-white select-none"
              >
                RAFA<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#d946ef] to-[#ff007f] drop-shadow-[0_0_45px_rgba(255,0,127,0.45)]">
                  930
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-[#b8b4d8] max-w-xl font-medium leading-relaxed">
              {language === 'ca'
                ? 'Lletres crues i alta pressió sonora des de La Mina (08930). Trap melòdic, rap conscient i pura autenticitat de barri en cada compàs.'
                : language === 'es'
                ? 'Letras crudas y alta presión sonora desde La Mina (08930). Trap melódico, rap consciente y pura autenticidad de barrio en cada compás.'
                : 'Raw lyricism and heavy sound pressure direct from La Mina (08930). Melodic trap, conscious bars, and pure street energy.'}
            </p>

            {/* Acciones Principales con Neón Azul y Rosa Eléctricos */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
              <a
                href={OFFICIAL_SPOTIFY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="h-14 px-8 bg-gradient-to-r from-[#00f0ff] to-[#00b4d8] hover:from-[#38f8ff] hover:to-[#00f0ff] text-[#040308] font-black text-sm tracking-wider uppercase rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.03] shadow-[0_0_30px_rgba(0,240,255,0.45)] focus-visible:outline-2 focus-visible:outline-[#00f0ff] cursor-pointer"
              >
                <Headphones className="w-5 h-5 text-[#040308]" aria-hidden="true" />
                <span>Escuchar en Spotify</span>
                <ArrowUpRight className="w-4 h-4 text-[#040308]" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={() => onNavigate('conciertos')}
                className="h-14 px-8 bg-[#0d0a1d] hover:bg-[#15102d] text-white border-2 border-[#ff007f] hover:border-[#ff3399] font-black text-sm tracking-wider uppercase rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-[0_0_25px_rgba(255,0,127,0.3)] hover:shadow-[0_0_35px_rgba(255,0,127,0.5)] focus-visible:outline-2 focus-visible:outline-[#ff007f] cursor-pointer"
              >
                <Ticket className="w-4 h-4 text-[#ff007f]" aria-hidden="true" />
                <span>Fechas Gira 2026</span>
              </button>
            </div>

            {/* Metadatos Eléctricos con Badges de Certificación */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-mono text-[#8680ad]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00f0ff]" />
                <div>
                  <span className="block text-[10px] text-[#554e74] uppercase">CÓDIGO POSTAL</span>
                  <span className="text-white font-bold">08930 SANT ADRIÀ</span>
                </div>
              </div>
              <div className="h-6 w-px bg-[#1f1938]" />
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ff007f]" />
                <div>
                  <span className="block text-[10px] text-[#554e74] uppercase">GÉNERO</span>
                  <span className="text-white font-bold">RAP / TRAP MELÓDICO</span>
                </div>
              </div>
              <div className="h-6 w-px bg-[#1f1938]" />
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1db954]" />
                <div>
                  <span className="block text-[10px] text-[#554e74] uppercase">AUDIO GLOBAL</span>
                  <span className="text-[#00f0ff] font-bold">SPOTIFY · YOUTUBE</span>
                </div>
              </div>
            </div>

          </div>

          {/* Lado derecho: Tarjeta de Vinilo Neón & Reproductor Interactivo */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Halo de resplandor dual */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#00f0ff]/25 via-transparent to-[#ff007f]/30 blur-2xl rounded-3xl pointer-events-none" />

            <div className="relative w-full max-w-md bg-[#0a0817]/90 backdrop-blur-xl border-2 border-[#2b2250] hover:border-[#00f0ff] p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-5 transition-all duration-300">
              
              {/* Header de la consola con selector de tracks */}
              <div className="flex items-center justify-between text-xs font-mono pb-3 border-b border-[#1f1938]">
                <div className="flex items-center gap-2 text-[#00f0ff]">
                  <Disc3 
                    className={`w-4 h-4 ${isPlaying ? 'animate-spin [animation-duration:4s]' : ''}`} 
                    aria-hidden="true" 
                  />
                  <span className="font-bold tracking-widest text-[#00f0ff]">REPRODUCTOR 930</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-[#ff007f] font-bold px-2 py-0.5 rounded bg-[#ff007f]/10 border border-[#ff007f]/30">
                    EN REPRODUCCIÓN
                  </span>
                  <span className="text-[#8680ad]">{currentTrack.duration}</span>
                </div>
              </div>

              {/* Portada interactiva con efecto de vinilo y holograma */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-[#2b2250] group shadow-2xl bg-[#040308]">
                <img
                  src={currentTrack.coverImage}
                  alt={`Carátula oficial ${currentTrack.title}`}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Glow Overlay Neón */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#040308] via-transparent to-transparent opacity-60" />

                {/* Badge holográfico de calle */}
                <div className="absolute top-3 left-3 px-3 py-1 bg-[#040308]/90 backdrop-blur-md border border-[#00f0ff]/50 text-white text-[10px] font-mono font-black uppercase rounded-lg tracking-widest shadow-[0_0_15px_rgba(0,240,255,0.35)]">
                  <span className="text-[#00f0ff]">RAFA 930</span> · SINGLE {currentTrack.year}
                </div>

                {/* Botón de reproducción superpuesto */}
                <a
                  href={currentTrack.spotifyUrl || OFFICIAL_SPOTIFY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 bg-[#040308]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]"
                  aria-label={`Reproducir ${currentTrack.title} en Spotify`}
                >
                  <div className="w-18 h-18 rounded-full bg-gradient-to-br from-[#00f0ff] to-[#ff007f] text-[#040308] flex items-center justify-center shadow-[0_0_35px_rgba(0,240,255,0.6)] transform group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 fill-current ml-1 text-white" />
                  </div>
                </a>
              </div>

              {/* Info del tema actual */}
              <div className="space-y-2 pt-1">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2">
                    <span>{currentTrack.title}</span>
                    <span className="w-2 h-2 rounded-full bg-[#ff007f] animate-ping" />
                  </h3>
                  <span className="text-xs font-mono text-[#00f0ff] font-bold">STREAM DIRECTO</span>
                </div>
                <p className="text-xs text-[#9490b8] line-clamp-2 leading-relaxed">
                  {currentTrack.description[language] || currentTrack.description.es}
                </p>
              </div>

              {/* Selector interactivo de miniaturas para cambiar de tema al vuelo */}
              <div className="pt-2 border-t border-[#1f1938] space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#8680ad]">
                  <span>SELECCIONAR TRACK:</span>
                  <span className="text-[#ff007f] font-bold">{selectedTrackIndex + 1} DE {DISCOGRAPHY_TRACKS.length}</span>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {DISCOGRAPHY_TRACKS.slice(0, 5).map((track, idx) => (
                    <button
                      key={track.id}
                      type="button"
                      onClick={() => setSelectedTrackIndex(idx)}
                      className={`relative shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        selectedTrackIndex === idx
                          ? 'border-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.6)] scale-105'
                          : 'border-[#2b2250] opacity-60 hover:opacity-100 hover:border-[#ff007f]'
                      }`}
                      aria-label={`Cargar ${track.title}`}
                    >
                      <img 
                        src={track.coverImage} 
                        alt={track.title} 
                        className="w-full h-full object-cover" 
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Ecualizador animado neón en tiempo real */}
              <div className="pt-2 border-t border-[#1f1938] flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-3 bg-[#00f0ff] rounded-full animate-pulse" />
                  <span className="w-1.5 h-6 bg-[#ff007f] rounded-full animate-pulse [animation-delay:120ms]" />
                  <span className="w-1.5 h-4 bg-[#00f0ff] rounded-full animate-pulse [animation-delay:240ms]" />
                  <span className="w-1.5 h-7 bg-[#ff007f] rounded-full animate-pulse [animation-delay:80ms]" />
                  <span className="w-1.5 h-3 bg-[#00f0ff] rounded-full animate-pulse [animation-delay:180ms]" />
                  <span className="ml-2 text-[11px] font-bold text-white tracking-wider">AUDIO HD MASTER</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleShare}
                    className="p-1.5 rounded-md bg-[#15102d] text-[#8680ad] hover:text-[#00f0ff] transition-colors cursor-pointer"
                    aria-label="Compartir enlace de audio"
                    title={copiedLink ? '¡Enlace copiado!' : 'Copiar enlace'}
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <a 
                    href={currentTrack.spotifyUrl || OFFICIAL_SPOTIFY_URL} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[#00f0ff] hover:text-[#ff007f] font-bold flex items-center gap-1 transition-colors"
                  >
                    <span>SPOTIFY</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 3. CATÁLOGO DE SINGLES — 100% ENFOCADO EN MÚSICA */}
      <section 
        aria-labelledby="tracks-title"
        className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-8 py-16 md:py-24 border-b border-[#1f1938]"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00f0ff] uppercase tracking-widest mb-2 px-3 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#ff007f]" />
              <span>DISCOGRAFÍA OFICIAL · COMPLETA</span>
            </div>
            <h2 id="tracks-title" className="text-4xl sm:text-5xl font-black tracking-tighter uppercase text-white">
              SINGLES &amp;{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#ff007f]">
                LANZAMIENTOS
              </span>
            </h2>
          </div>
          
          <button
            type="button"
            onClick={() => onNavigate('discografia')}
            className="h-11 px-6 rounded-xl bg-[#0d0a1d] hover:bg-[#15102d] border border-[#2b2250] hover:border-[#00f0ff] text-xs font-mono font-bold text-white uppercase tracking-wider inline-flex items-center gap-2.5 transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-pointer"
          >
            <span>Ver todo el catálogo ({DISCOGRAPHY_TRACKS.length})</span>
            <ArrowUpRight className="w-4 h-4 text-[#ff007f]" />
          </button>
        </div>

        {/* GRID DE PORTADAS REALES 1:1 CON ESTILO NEÓN DUAL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {DISCOGRAPHY_TRACKS.slice(0, 6).map((track, idx) => {
            const isCyan = idx % 2 === 0;
            return (
              <article 
                key={track.id}
                className="bg-[#0a0817]/90 backdrop-blur-md border border-[#20193d] hover:border-[#00f0ff] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(0,240,255,0.18)] group flex flex-col justify-between"
              >
                {/* Portada cuadrada a sangre con sticker holográfico */}
                <div className="relative aspect-square w-full bg-[#040308] overflow-hidden">
                  <img
                    src={track.coverImage}
                    alt={`Carátula oficial ${track.title}`}
                    width={500}
                    height={500}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Sello de año y track number */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#040308]/90 backdrop-blur-md border border-[#2b2250] rounded-lg text-[10px] font-mono font-bold text-[#00f0ff]">
                    TRACK 0{idx + 1} // {track.year}
                  </div>

                  <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-[#040308]/90 backdrop-blur-md border border-[#2b2250] rounded-lg text-[10px] font-mono text-white">
                    {track.duration}
                  </div>

                  {/* Hover Play Button */}
                  <a
                    href={track.spotifyUrl || OFFICIAL_SPOTIFY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 bg-[#040308]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]"
                    aria-label={`Escuchar ${track.title} en Spotify`}
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00f0ff] to-[#ff007f] text-[#040308] flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(0,240,255,0.5)]">
                      <Play className="w-7 h-7 fill-current ml-0.5 text-white" />
                    </div>
                  </a>
                </div>

                {/* Ficha técnica del tema */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-black text-2xl text-white uppercase tracking-tight group-hover:text-[#00f0ff] transition-colors">
                      {track.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#9490b8] mt-1.5 line-clamp-2 leading-relaxed">
                      {track.description[language] || track.description.es}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#1c1636] flex items-center justify-between text-xs font-mono">
                    <span className="text-[#6c6791] font-bold">08930 MUSIC</span>
                    <a
                      href={track.spotifyUrl || OFFICIAL_SPOTIFY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#ff007f] hover:text-[#00f0ff] font-bold flex items-center gap-1 transition-colors"
                    >
                      <span>ESCUCHAR SPOTIFY</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 4. GIRA & CONCIERTOS: CYBER PASS TICKETS */}
      <section 
        aria-labelledby="tour-title"
        className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-8 py-16 md:py-24 border-b border-[#1f1938]"
      >
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#ff007f] uppercase tracking-widest mb-2 px-3 py-1 rounded-full bg-[#ff007f]/10 border border-[#ff007f]/30">
            <Ticket className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>DIRECTOS CONFIRMADOS · TEMPORADA 2026</span>
          </div>
          <h2 id="tour-title" className="text-4xl sm:text-5xl font-black tracking-tighter uppercase text-white">
            GIRA &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff007f] to-[#00f0ff]">
              ESCENARIOS
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#9490b8] mt-2">
            Pase oficial a los conciertos y festivales de RAFA 930. Reserva de entradas y acreditaciones para medios.
          </p>
        </div>

        {/* LISTA DE ENTRADAS CON DISEÑO TICKET NEÓN */}
        <div className="space-y-4">
          {SHOWS.map((show) => {
            const isSoldOut = show.status === 'sold-out';
            const isUltimas = show.status === 'ultimas';

            return (
              <div 
                key={show.id}
                className="relative bg-[#0d0a1d]/80 backdrop-blur-md border border-[#241e42] hover:border-[#00f0ff] rounded-2xl p-5 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300 group hover:shadow-[0_10px_30px_rgba(0,240,255,0.15)]"
              >
                {/* Perforaciones visuales de cyber-ticket */}
                <div className="hidden md:block absolute -left-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#040308] border-r border-[#241e42]" />
                <div className="hidden md:block absolute -right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#040308] border-l border-[#241e42]" />

                <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                  <div className="px-5 py-3 rounded-xl bg-[#140f2b] border border-[#2e2654] text-center font-mono shrink-0">
                    <span className="block text-[11px] text-[#00f0ff] uppercase font-bold">FECHA</span>
                    <span className="text-xl font-black text-white">{show.date}</span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight group-hover:text-[#00f0ff] transition-colors">
                      {show.city}
                    </h3>
                    <p className="text-sm text-[#9490b8] flex items-center gap-2 mt-1">
                      <span className="w-2 h-2 rounded-full bg-[#ff007f]" />
                      <span className="text-white font-medium">{show.venue}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {isSoldOut ? (
                    <span className="px-4 py-2 bg-[#ff007f]/15 border border-[#ff007f] text-[#ff007f] text-xs font-mono font-black uppercase rounded-xl tracking-wider">
                      ENTRADAS AGOTADAS
                    </span>
                  ) : (
                    <>
                      {isUltimas && (
                        <span className="text-xs font-mono text-[#ff007f] font-bold tracking-wider uppercase animate-pulse">
                          ÚLTIMOS PASES
                        </span>
                      )}
                      <a
                        href={show.ticketUrl || `https://wa.me/34671591814?text=Hola%20RAFA%20930,%20quiero%20entradas%20para%20${encodeURIComponent(show.city)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-12 px-7 bg-gradient-to-r from-[#00f0ff] to-[#ff007f] hover:from-[#38f8ff] hover:to-[#ff3399] text-[#040308] font-black text-xs uppercase tracking-wider rounded-xl inline-flex items-center gap-2 transition-all transform hover:scale-105 shadow-[0_0_25px_rgba(0,240,255,0.35)] cursor-pointer"
                      >
                        <Ticket className="w-4 h-4 text-[#040308]" />
                        <span>RESERVAR ENTRADA</span>
                      </a>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. PRESS KIT & RIDER TÉCNICO OFICIAL */}
      <PressKitModule />

      {/* 6. BOOKING STATION PARA PROMOTORES & SALAS (ALTA CONVERSIÓN) */}
      <section 
        aria-labelledby="booking-station"
        className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-8 py-16 md:py-24"
      >
        <div className="bg-[#0d0a1d]/90 backdrop-blur-xl border-2 border-[#2b2250] hover:border-[#ff007f] p-8 sm:p-14 rounded-3xl relative overflow-hidden transition-all duration-300 shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
          
          {/* Luz de fondo neón dual */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff007f]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00f0ff]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-8 space-y-5">
              <span className="text-xs font-mono text-[#00f0ff] uppercase tracking-widest font-black block flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#ff007f]" />
                BOOKING &amp; CONTRATACIÓN OFICIAL · TEMPORADA 2026
              </span>
              <h2 id="booking-station" className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-[1.05]">
                ¿QUIERES A <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#ff007f]">RAFA 930</span> EN TU FESTIVAL O SALA?
              </h2>
              <p className="text-sm sm:text-base text-[#b8b4d8] max-w-2xl leading-relaxed">
                Gestión directa para fechas en Barcelona, resto de España e internacional. 
                Envío de propuesta económica, dossier y rider de audio en menos de 24 horas.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href={`https://wa.me/${OFFICIAL_WHATSAPP.replace('+', '')}?text=Hola%20RAFA%20930,%20nos%20interesa%20contratar%20un%20concierto`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-14 px-8 bg-[#25d366] hover:bg-[#20ba5a] text-[#040308] font-black text-xs uppercase tracking-wider rounded-xl inline-flex items-center gap-3 transition-transform hover:scale-105 shadow-[0_0_30px_rgba(37,211,102,0.4)] cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5 fill-current" />
                  <span>WhatsApp Booking ({OFFICIAL_WHATSAPP})</span>
                </a>

                <a
                  href={`mailto:${OFFICIAL_EMAIL}?subject=Contrataci%C3%B3n%20RAFA%20930%20-%20Festival%20o%20Sala`}
                  className="h-14 px-8 bg-[#140f2b] hover:bg-[#1f1742] text-white border border-[#3b3068] hover:border-[#00f0ff] font-bold text-xs uppercase tracking-wider rounded-xl inline-flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-[#00f0ff]" />
                  <span>{OFFICIAL_EMAIL}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[#241e42] pt-6 lg:pt-0 lg:pl-10 space-y-5 text-xs font-mono text-[#9490b8]">
              <div>
                <span className="text-white font-bold block mb-1 text-sm">FORMATO DE SHOW</span>
                <p>Directo 45-60 min · DJ + MC · Presión sonora de alta definición</p>
              </div>
              <div>
                <span className="text-white font-bold block mb-1 text-sm">ORIGEN &amp; LOGÍSTICA</span>
                <p>08930 Sant Adrià de Besòs (Barcelona) · Movilidad nacional e internacional</p>
              </div>
              <div>
                <span className="text-white font-bold block mb-1 text-sm">TIEMPO DE RESPUESTA</span>
                <p className="text-[#00f0ff] font-bold">Menos de 24 horas garantizadas por management</p>
              </div>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
};
