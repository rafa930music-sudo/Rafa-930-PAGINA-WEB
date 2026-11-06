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

    // Try 3: Default audio files
    let playedDefaultFile = false;
    const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
    
    // We try the default file first, then candidate paths
    const pathsToTry = [
        AMBIENT_AUDIO_CONFIG.defaultFilePath,
        ...AMBIENT_AUDIO_CONFIG.candidatePaths
    ];

    for (const src of pathsToTry) {
      try {
        // Construct absolute URL: BASE_URL + path (ensuring no double slashes)
        const cleanPath = src.replace(/^\/+/, '');
        const targetSrc = `${baseUrl}/${cleanPath}`;
        
        console.log('AmbientAudio: Intentando cargar:', targetSrc);
        const audio = new Audio(targetSrc);
        audio.loop = true;
        audio.volume = currentPrefs.isMuted ? 0 : currentPrefs.volume;
        
        // Setup promise to detect success
        await new Promise((resolve, reject) => {
            audio.oncanplaythrough = resolve;
            audio.onerror = reject;
            audio.play().catch(reject);
        });

        audioRef.current = audio;
        playedDefaultFile = true;
        setIsPlaying(true);
        setActiveTrackName(AMBIENT_AUDIO_CONFIG.title);
        console.log('AmbientAudio: Reproducción iniciada:', targetSrc);
        break;
      } catch (e) {
        console.warn(`AmbientAudio: Fallo al cargar ${src}:`, e);
      }
    }

    // Try 4: If no file found or autoplay blocked, we stay silent instead of playing the synth track
    if (!playedDefaultFile) {
      console.warn('Ambient audio file not found or playback blocked.');
      setIsPlaying(false);
      setActiveTrackName('Audio no disponible');
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
      
      // Ensure audio context is active immediately
      soundEngine.initCtx();
      
      const currentPrefs = getAudioPreferences();
      startPlayback(currentPrefs);
      
      // Also try to unlock audio by playing a silent dummy buffer if needed (browser specific)
      if (soundEngine.getContext()) {
          const osc = soundEngine.getContext()!.createOscillator();
          const gain = soundEngine.getContext()!.createGain();
          gain.gain.value = 0;
          osc.connect(gain);
          gain.connect(soundEngine.getContext()!.destination);
          osc.start(0);
          osc.stop(0.001);
      }

      window.removeEventListener('pointerdown', handleFirstUserInteraction);
      window.removeEventListener('keydown', handleFirstUserInteraction);
      window.removeEventListener('scroll', handleFirstUserInteraction);
    };

    window.addEventListener('pointerdown', handleFirstUserInteraction, { passive: true });
    window.addEventListener('pointermove', handleFirstUserInteraction, { passive: true });
    window.addEventListener('touchstart', handleFirstUserInteraction, { passive: true });
    window.addEventListener('keydown', handleFirstUserInteraction, { passive: true });
    window.addEventListener('scroll', handleFirstUserInteraction, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', handleFirstUserInteraction);
      window.removeEventListener('pointermove', handleFirstUserInteraction);
      window.removeEventListener('touchstart', handleFirstUserInteraction);
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
