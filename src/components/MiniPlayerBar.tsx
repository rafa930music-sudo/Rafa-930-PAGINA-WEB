import React from 'react';
import { Language } from '../types';
import { TRACKS } from '../data/content';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Disc3,
  ExternalLink,
  X,
} from 'lucide-react';

interface MiniPlayerBarProps {
  language: Language;
  playingTrackId: string | null;
  isPlayingMusic: boolean;
  onPlayTrack: (trackId: string) => void;
  onStopMusic: () => void;
  onNavigateToDiscografia: () => void;
}

export const MiniPlayerBar: React.FC<MiniPlayerBarProps> = ({
  language,
  playingTrackId,
  isPlayingMusic,
  onPlayTrack,
  onStopMusic,
  onNavigateToDiscografia,
}) => {
  if (!playingTrackId) return null;

  const currentIndex = TRACKS.findIndex((t) => t.id === playingTrackId);
  const track = currentIndex >= 0 ? TRACKS[currentIndex] : TRACKS[0];

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + TRACKS.length) % TRACKS.length;
    onPlayTrack(TRACKS[prevIdx].id);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % TRACKS.length;
    onPlayTrack(TRACKS[nextIdx].id);
  };

  return (
    <div
      role="region"
      aria-label={
        language === 'ca'
          ? 'Reproductor musical actiu'
          : language === 'es'
          ? 'Reproductor musical activo'
          : 'Active music player'
      }
      className="fixed bottom-[66px] xl:bottom-0 inset-x-0 z-40 bg-[#050507]/95 backdrop-blur-xl border-t border-[#22222e] shadow-2xl"
    >
      {/* Top gradient progress accent line with electric blue core */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#a855f7] via-[#00d4ff] to-[#ec4899] shadow-[0_0_12px_rgba(0,212,255,0.65)]" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-10 h-16 sm:h-18 flex items-center justify-between gap-3">
        {/* Track Info */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <button
            type="button"
            onClick={onNavigateToDiscografia}
            className="relative w-11 h-11 rounded-lg overflow-hidden bg-[#111118] border border-[#22222e] shrink-0 group"
          >
            <img
              src={track.coverUrl}
              alt={track.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {isPlayingMusic && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Disc3 className="w-5 h-5 text-[#ec4899] animate-spin" />
              </div>
            )}
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase text-[#ec4899] font-semibold">
                {isPlayingMusic
                  ? language === 'ca'
                    ? 'SONANT ARA'
                    : language === 'es'
                    ? 'SONANDO AHORA'
                    : 'NOW PLAYING'
                  : language === 'ca'
                  ? 'EN PAUSA'
                  : language === 'es'
                  ? 'EN PAUSA'
                  : 'PAUSED'}
              </span>
              {track.bpm && (
                <span className="hidden sm:inline text-[10px] font-mono text-[#a1a1b5] tabular-nums">
                  · {track.bpm} BPM
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={onNavigateToDiscografia}
              className="text-sm font-semibold text-[#ffffff] hover:text-[#ec4899] truncate block text-left transition-colors"
            >
              {track.title}
            </button>
          </div>
        </div>

        {/* Transport Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={handlePrev}
            aria-label={
              language === 'ca'
                ? 'Tema anterior'
                : language === 'es'
                ? 'Tema anterior'
                : 'Previous track'
            }
            className="touch-target-44 w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#a855f7] text-[#a1a1b5] hover:text-[#ffffff] flex items-center justify-center transition-colors"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onPlayTrack(track.id)}
            aria-label={isPlayingMusic ? 'Pause' : 'Play'}
            className="touch-target-44 px-3.5 sm:px-4 h-10 rounded-lg gradient-lila-rosa-rojo text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md hover:opacity-95 transition-opacity"
          >
            {isPlayingMusic ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span className="hidden md:inline">
                  {language === 'ca' ? 'Pausar' : language === 'es' ? 'Pausar' : 'Pause'}
                </span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span className="hidden md:inline">
                  {language === 'ca' ? 'Reproduir' : language === 'es' ? 'Reproducir' : 'Play'}
                </span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label={
              language === 'ca'
                ? 'Tema següent'
                : language === 'es'
                ? 'Siguiente tema'
                : 'Next track'
            }
            className="touch-target-44 w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#a855f7] text-[#a1a1b5] hover:text-[#ffffff] flex items-center justify-center transition-colors"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Right External Link & Close */}
        <div className="flex items-center gap-1.5 shrink-0">
          <a
            href={track.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#ec4899] text-xs font-mono text-[#a1a1b5] hover:text-[#ffffff] transition-colors"
          >
            <span>YouTube</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#ec4899]" />
          </a>

          <button
            type="button"
            onClick={onStopMusic}
            aria-label={
              language === 'ca'
                ? 'Tancar reproductor'
                : language === 'es'
                ? 'Cerrar reproductor'
                : 'Close player'
            }
            className="touch-target-44 w-9 h-9 rounded-lg bg-[#111118] border border-[#22222e] hover:border-[#e11d48] text-[#a1a1b5] hover:text-[#ffffff] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
