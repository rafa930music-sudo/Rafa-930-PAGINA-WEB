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
  const playbackStartedRef = useRef(false);
  const isAttemptingPlayRef = useRef(false);

  // Sync with preferences changes
  const applyAudioSettings = useCallback((currentPrefs: UserAudioPreferences) => {
    soundEngine.setVolume(currentPrefs.volume);
    soundEngine.setEchoLevel(currentPrefs.echoLevel);
    soundEngine.setMuted(currentPrefs.isMuted);

    if (audioRef.current) {
      audioRef.current.volume = currentPrefs.isMuted ? 0 : currentPrefs.volume;
      audioRef.current.muted = currentPrefs.isMuted;
    }
  }, []);

  // Main playback logic - protected against concurrent interruption
  const startPlayback = useCallback(async (currentPrefs: UserAudioPreferences) => {
    if (playbackStartedRef.current) return;
    isAttemptingPlayRef.current = true;

    try {
      // 1. Resume / initialize Web Audio context
      soundEngine.initCtx();
      applyAudioSettings(currentPrefs);

      // Try 1: User uploaded custom file from device
      if (currentPrefs.sourceMode === 'custom-file') {
        try {
          const stored = await getCustomAudioFile();
          if (stored && stored.blob && audioRef.current) {
            if (customBlobUrlRef.current) {
              URL.revokeObjectURL(customBlobUrlRef.current);
            }
            const blobUrl = URL.createObjectURL(stored.blob);
            customBlobUrlRef.current = blobUrl;
            audioRef.current.src = blobUrl;
            audioRef.current.volume = currentPrefs.isMuted ? 0 : currentPrefs.volume;
            
            await audioRef.current.play();
            setIsPlaying(true);
            playbackStartedRef.current = true;
            setActiveTrackName(stored.name || 'Mi tema personalizado');
            return;
          }
        } catch {
          // Fall back to default
        }
      }

      // Try 2: User custom direct URL
      if (currentPrefs.sourceMode === 'custom-url' && currentPrefs.customUrl && audioRef.current) {
        try {
          audioRef.current.src = currentPrefs.customUrl;
          audioRef.current.volume = currentPrefs.isMuted ? 0 : currentPrefs.volume;
          await audioRef.current.play();
          setIsPlaying(true);
          playbackStartedRef.current = true;
          setActiveTrackName('Pista URL personalizada');
          return;
        } catch {
          // Fall back to default
        }
      }

      // Try 3: Default audio files (prioritize lightweight MP3)
      const audioEl = audioRef.current;
      if (!audioEl) return;

      const pathsToTry = [
        AMBIENT_AUDIO_CONFIG.defaultFilePath,
        ...AMBIENT_AUDIO_CONFIG.candidatePaths,
      ].map((p) => (p.startsWith('/') ? p : `/${p}`));

      // Remove duplicates
      const uniquePaths = Array.from(new Set(pathsToTry));

      for (const src of uniquePaths) {
        if (playbackStartedRef.current) return;
        try {
          // Only update src if different
          const currentUrl = audioEl.src ? new URL(audioEl.src, window.location.href).pathname : '';
          if (currentUrl !== src) {
            audioEl.src = src;
          }
          audioEl.volume = currentPrefs.isMuted ? 0 : currentPrefs.volume;
          audioEl.muted = currentPrefs.isMuted;
          
          await audioEl.play();
          playbackStartedRef.current = true;
          setIsPlaying(true);
          setActiveTrackName(AMBIENT_AUDIO_CONFIG.title);
          console.log('AmbientAudio: Reproducción activa en:', src);
          return;
        } catch {
          // Try next path silently
        }
      }

      // Try 4: If HTML audio was blocked or failed, fallback to sound synthesizer
      if (!playbackStartedRef.current) {
        try {
          soundEngine.playTrack('de-vuelta-echo');
          setIsPlaying(true);
          playbackStartedRef.current = true;
          setActiveTrackName('De Vuelta - Sintetizador Ambiental');
        } catch {
          setIsPlaying(false);
        }
      }
    } finally {
      isAttemptingPlayRef.current = false;
    }
  }, [applyAudioSettings]);

  const stopPlayback = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    soundEngine.stop();
    setIsPlaying(false);
    playbackStartedRef.current = false;
    isAttemptingPlayRef.current = false;
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

    window.addEventListener('rafa930:audio-prefs-changed', handlePrefsChange);
    window.addEventListener('rafa930:custom-file-saved', handleFileUploaded);
    window.addEventListener('rafa930:custom-file-deleted', handleFileDeleted);

    return () => {
      window.removeEventListener('rafa930:audio-prefs-changed', handlePrefsChange);
      window.removeEventListener('rafa930:custom-file-saved', handleFileUploaded);
      window.removeEventListener('rafa930:custom-file-deleted', handleFileDeleted);
    };
  }, [prefs, applyAudioSettings, startPlayback]);

  // Robust User Interaction handler for Mobile (iOS Safari & Android Chrome)
  useEffect(() => {
    const handleUserGesture = () => {
      if (playbackStartedRef.current || isAttemptingPlayRef.current) return;

      // Force unmuted state for automatic start on interaction
      const currentPrefs = getAudioPreferences();
      if (currentPrefs.isMuted) {
        currentPrefs.isMuted = false;
        applyAudioSettings(currentPrefs);
      }

      // Unmute and start Web Audio context
      soundEngine.initCtx();

      // Trigger playback synchronously within gesture frame
      startPlayback(currentPrefs);
    };

    // Specific mobile and desktop gesture events on window (prevent double firing)
    const events = [
      'click',
      'touchend',
      'pointerup',
      'mousedown',
      'keydown',
      'touchstart',
      'rafa930:user-gesture-triggered'
    ];

    events.forEach((evt) => {
      window.addEventListener(evt, handleUserGesture, { passive: true });
    });

    return () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, handleUserGesture);
      });
    };
  }, [startPlayback, applyAudioSettings]);

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

  return (
    <audio
      ref={audioRef}
      src="/assets/de-vuelta-ambient.mp3"
      loop
      playsInline
      preload="auto"
      className="hidden"
      onPlay={() => setIsPlaying(true)}
      onPause={() => setIsPlaying(false)}
    />
  );
};
