import React, { useState } from 'react';
import { Track, Language } from '../types';
import { Disc3, Play, Pause, ExternalLink, Sparkles, Volume2 } from 'lucide-react';

interface Vinyl3DPlayerProps {
  track: Track;
  language: Language;
  categoryLabel?: string;
  onOpenLyrics?: () => void;
}

export const Vinyl3DPlayer: React.FC<Vinyl3DPlayerProps> = ({
  track,
  language,
  categoryLabel,
  onOpenLyrics,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="bg-[#111118] border border-[#00d4ff]/35 rounded-2xl p-5 sm:p-8 shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* 3D Vinyl Album & Sleeve Interactive Display */}
        <div className="relative flex items-center justify-center shrink-0 py-2 px-4 group">
          {/* 3D Album Sleeve Box */}
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-xl overflow-hidden bg-[#050507] border border-white/20 shadow-[0_12px_30px_rgba(0,0,0,0.9)] z-20 transition-transform duration-500 group-hover:scale-105">
            <img
              src={track.coverUrl}
              alt={track.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {/* Glossy Cardboard Sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-white/10 pointer-events-none" />
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white">
              <span className="truncate">{track.title}</span>
              <span className="text-[#00d4ff] font-bold">{track.year}</span>
            </div>
          </div>

          {/* 3D Vinyl Record Slicing Out */}
          <div
            className={`absolute left-1/2 top-1/2 -translate-y-1/2 w-40 h-40 sm:w-48 sm:h-48 rounded-full z-10 transition-all duration-700 ease-out cursor-pointer ${
              isPlaying
                ? 'translate-x-12 sm:translate-x-20 shadow-[0_0_25px_rgba(0,212,255,0.3)]'
                : 'translate-x-4 opacity-80'
            }`}
            onClick={() => setIsPlaying(!isPlaying)}
            title="Haz clic para reproducir/pausar el vinilo 3D"
          >
            {/* Grooved Vinyl Disc Background */}
            <div
              className={`w-full h-full rounded-full bg-[#0d0d12] border-4 border-[#1a1a24] relative shadow-2xl flex items-center justify-center ${
                isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
              }`}
              style={{
                backgroundImage:
                  'radial-gradient(circle, #08080c 0%, #15151f 15%, #08080c 16%, #1a1a26 30%, #08080c 31%, #12121a 50%, #08080c 51%, #1e1e2c 70%, #08080c 71%, #121218 100%)',
              }}
            >
              {/* Vinyl Sound Reflection Sheen */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />

              {/* Center Vinyl Label 930 */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#a855f7] via-[#ec4899] to-[#00d4ff] p-0.5 shadow-[0_0_15px_rgba(0,212,255,0.6)] flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#050507] flex flex-col items-center justify-center text-center p-1 border border-white/20">
                  <span className="text-[9px] font-['Bebas_Neue'] text-[#ffffff] tracking-widest leading-none">RAFA</span>
                  <span className="text-[10px] font-['Bebas_Neue'] text-[#00d4ff] tracking-tighter leading-none">930</span>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#050507] border border-white/40 mt-0.5" />
                </div>
              </div>
            </div>
          </div>

          {/* 3D Stylus / Tonearm Indicator */}
          <div
            className={`absolute top-0 right-2 z-30 transition-transform duration-500 origin-top-right hidden sm:block ${
              isPlaying ? 'rotate-12' : '-rotate-12 opacity-60'
            }`}
          >
            <div className="w-16 h-1 bg-gradient-to-r from-gray-400 to-gray-200 rounded-full shadow-md transform rotate-45 relative">
              <div className="absolute -left-1 -top-1 w-3 h-3 rounded-full bg-[#00d4ff] shadow-[0_0_8px_#00d4ff]" />
            </div>
          </div>
        </div>

        {/* Console Details & Live Playback Control */}
        <div className="flex-1 space-y-4 min-w-0 text-left">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#00d4ff]/15 border border-[#00d4ff]/40 text-[#00d4ff] text-xs font-mono font-semibold">
              <Disc3 className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin' : ''}`} />
              <span>{categoryLabel || track.categoryLabel}</span>
            </span>

            <span className="text-xs font-mono text-[#a1a1b5] bg-[#111118] px-2 py-0.5 rounded border border-[#22222e]">
              {track.duration} MIN
            </span>

            {isPlaying && (
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#ec4899] animate-pulse">
                <Volume2 className="w-3.5 h-3.5" />
                <span>EN REPRODUCCIÓN 3D</span>
              </span>
            )}
          </div>

          <div>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#ffffff] font-['Plus_Jakarta_Sans'] tracking-tight">
              {track.title}
            </h2>
            <p className="text-xs font-mono text-[#a1a1b5] mt-1">{track.credits}</p>
          </div>

          <p className="text-sm text-[#a1a1b5] leading-relaxed line-clamp-2">
            {track.description}
          </p>

          {/* Action Control Panel */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="touch-target-44 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00d4ff] via-[#a855f7] to-[#ec4899] text-white font-semibold text-xs font-mono uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(0,212,255,0.35)] hover:scale-105 transition-all cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isPlaying ? 'PAUSAR VINILO' : 'GIRAR VINILO 3D'}</span>
            </button>

            {track.spotifyUrl && (
              <a
                href={track.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target-44 px-4 py-2.5 rounded-xl bg-[#1DB954]/20 border border-[#1DB954]/60 hover:border-[#1ed760] text-[#1ed760] font-semibold text-xs font-mono flex items-center gap-2 transition-all hover:scale-105"
              >
                <span>SPOTIFY</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {track.youtubeUrl && (
              <a
                href={track.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target-44 px-4 py-2.5 rounded-xl bg-[#FF0000]/15 border border-[#FF0000]/50 hover:border-[#FF0000] text-[#FF4D4D] font-semibold text-xs font-mono flex items-center gap-2 transition-all hover:scale-105"
              >
                <span>YOUTUBE</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {onOpenLyrics && (
              <button
                type="button"
                onClick={onOpenLyrics}
                className="touch-target-44 px-4 py-2.5 rounded-xl bg-[#111118] border border-[#22222e] hover:border-[#a855f7] text-[#a1a1b5] hover:text-white font-semibold text-xs font-mono flex items-center gap-2 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#ec4899]" />
                <span>VER LETRA</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
