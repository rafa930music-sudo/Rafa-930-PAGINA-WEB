import React, { useEffect, useRef, useState, useCallback } from 'react';
import { soundEngine } from '../utils/soundSynthesizer';
import { AMBIENT_AUDIO_CONFIG } from '../config/ambientAudioConfig';
import {
  getAudioPreferences,
  getCustomAudioFile,
  UserAudioPreferences,
} from '../utils/audioStorage';

export const AmbientGlobalPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const customBlobUrlRef = useRef<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrackName, setActiveTrackName] = useState<string>(AMBIENT_AUDIO_CONFIG.title);
  const [prefs, setPrefs] = useState<UserAudioPreferences>(getAudioPreferences);

  // Sync with preferences changes
  const applyAudioSettings = useCallback((currentPrefs: UserAudioPreferences) => {
    soundEngine.setVolume(currentPrefs.volume);
    soundEngine.setEchoLevel(currentPrefs.echoLevel);
    soundEngine.setMuted(currentPrefs.isMuted);

    if (audioRef.current) {
      audioRef.current.volume = currentPrefs.isMuted ? 0 : currentPrefs.volume;
    }
  }, []);

  // Main playback logic
  const startPlayback = useCallback(async (currentPrefs: UserAudioPreferences) => {
    // 1. Clean previous audio element
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (customBlobUrlRef.current) {
      URL.revokeObjectURL(customBlobUrlRef.current);
      customBlobUrlRef.current = null;
    }

    soundEngine.initCtx();
    applyAudioSettings(currentPrefs);

    // If muted, we still mark ready, but gain is 0
    // Try 1: User uploaded custom file from device
    if (currentPrefs.sourceMode === 'custom-file') {
      try {
        const stored = await getCustomAudioFile();
        if (stored && stored.blob) {
          const blobUrl = URL.createObjectURL(stored.blob);
          customBlobUrlRef.current = blobUrl;
          const audio = new Audio(blobUrl);
          audio.loop = true;
          audio.volume = currentPrefs.isMuted ? 0 : currentPrefs.volume;
          
          await audio.play();
          audioRef.current = audio;
          setIsPlaying(true);
          setActiveTrackName(stored.name || 'Mi tema personalizado');
          return;
        }
      } catch {
        // Fall back to default
      }
    }

    // Try 2: User custom direct URL
    if (currentPrefs.sourceMode === 'custom-url' && currentPrefs.customUrl) {
      try {
        const audio = new Audio(currentPrefs.customUrl);
        audio.loop = true;
        audio.volume = currentPrefs.isMuted ? 0 : currentPrefs.volume;
        await audio.play();
        audioRef.current = audio;
        setIsPlaying(true);
        setActiveTrackName('Pista URL personalizada');
        return;
      } catch {
        // Fall back to default
      }
    }

    // Try 3: Default audio files (e.g. /de-vuelta-ambient.mp3)
    let playedDefaultFile = false;
    for (const src of AMBIENT_AUDIO_CONFIG.candidatePaths) {
      try {
        const audio = new Audio(src);
        audio.loop = true;
        audio.volume = currentPrefs.isMuted ? 0 : currentPrefs.volume;
        await audio.play();
        audioRef.current = audio;
        playedDefaultFile = true;
        setIsPlaying(true);
        setActiveTrackName(AMBIENT_AUDIO_CONFIG.title);
        break;
      } catch {
        // Continue searching candidates
      }
    }

    // Try 4: If no file found or autoplay blocked, run the Web Audio API synthesized beat
    if (!playedDefaultFile) {
      soundEngine.playTrack(AMBIENT_AUDIO_CONFIG.fallbackSynthTrack);
      setIsPlaying(true);
      setActiveTrackName(AMBIENT_AUDIO_CONFIG.title);
    }
  }, [applyAudioSettings]);

  const stopPlayback = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    soundEngine.stop();
    setIsPlaying(false);
  }, []);

  // Listen to preference changes and file upload events
  useEffect(() => {
    const handlePrefsChange = (e: Event) => {
      const customEvent = e as CustomEvent<UserAudioPreferences>;
      if (customEvent.detail) {
        setPrefs(customEvent.detail);
        applyAudioSettings(customEvent.detail);
      }
    };

    const handleFileUploaded = () => {
      const updated = getAudioPreferences();
      setPrefs(updated);
      startPlayback(updated);
    };

    const handleFileDeleted = () => {
      const updated = getAudioPreferences();
      setPrefs(updated);
      startPlayback(updated);
    };

    const handleToggleAudio = () => {
      if (isPlaying) {
        stopPlayback();
      } else {
        startPlayback(prefs);
      }
    };

    window.addEventListener('rafa930:audio-prefs-changed', handlePrefsChange);
    window.addEventListener('rafa930:custom-file-saved', handleFileUploaded);
    window.addEventListener('rafa930:custom-file-deleted', handleFileDeleted);
    window.addEventListener('rafa930:toggle-ambient-audio', handleToggleAudio);

    return () => {
      window.removeEventListener('rafa930:audio-prefs-changed', handlePrefsChange);
      window.removeEventListener('rafa930:custom-file-saved', handleFileUploaded);
      window.removeEventListener('rafa930:custom-file-deleted', handleFileDeleted);
      window.removeEventListener('rafa930:toggle-ambient-audio', handleToggleAudio);
    };
  }, [isPlaying, prefs, applyAudioSettings, startPlayback, stopPlayback]);

  // Autoplay on first user interaction
  useEffect(() => {
    let triggered = false;

    const handleFirstUserInteraction = () => {
      if (triggered) return;
      triggered = true;
      const currentPrefs = getAudioPreferences();
      startPlayback(currentPrefs);

      window.removeEventListener('pointerdown', handleFirstUserInteraction);
      window.removeEventListener('keydown', handleFirstUserInteraction);
      window.removeEventListener('scroll', handleFirstUserInteraction);
    };

    window.addEventListener('pointerdown', handleFirstUserInteraction, { passive: true });
    window.addEventListener('keydown', handleFirstUserInteraction, { passive: true });
    window.addEventListener('scroll', handleFirstUserInteraction, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', handleFirstUserInteraction);
      window.removeEventListener('keydown', handleFirstUserInteraction);
      window.removeEventListener('scroll', handleFirstUserInteraction);
      stopPlayback();
    };
  }, [startPlayback, stopPlayback]);

  // Dispatch current active status to inform studio UI
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('rafa930:audio-status', {
        detail: {
          isPlaying,
          activeTrackName,
          volume: prefs.volume,
          isMuted: prefs.isMuted,
          echoLevel: prefs.echoLevel,
        },
      })
    );
  }, [isPlaying, activeTrackName, prefs]);

  return null; // Invisible global manager
};
