/**
 * Utilidad de almacenamiento IndexedDB y localStorage para pistas de audio personalizadas
 * Permite al artista subir su propio tema (MP3/WAV) y guardarlo en el navegador para que
 * se reproduzca automáticamente cada vez que visite la web.
 */

const DB_NAME = 'rafa930_ambient_db';
const DB_VERSION = 1;
const STORE_NAME = 'custom_audio_store';
const KEY_NAME = 'user_ambient_track';

export interface StoredAudioTrack {
  blob: Blob;
  name: string;
  size: number;
  type: string;
  updatedAt: number;
}

export interface UserAudioPreferences {
  sourceMode: 'default' | 'custom-file' | 'custom-url';
  customUrl?: string;
  customTrackName?: string;
  volume: number;
  echoLevel: number;
  isMuted: boolean;
}

const SETTINGS_KEY = 'rafa930_audio_settings';

export const getAudioPreferences = (): UserAudioPreferences => {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (typeof parsed.volume === 'number' && parsed.volume < 0.20) {
        parsed.volume = 0.35;
      }
      return parsed;
    }
  } catch {
    // LocalStorage fallback
  }

  return {
    sourceMode: 'default',
    customUrl: '',
    customTrackName: '',
    volume: 0.35,
    echoLevel: 0.42,
    isMuted: false,
  };
};

export const saveAudioPreferences = (prefs: Partial<UserAudioPreferences>): UserAudioPreferences => {
  const current = getAudioPreferences();
  const updated = { ...current, ...prefs };
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('rafa930:audio-prefs-changed', { detail: updated }));
  } catch {
    // LocalStorage fallback
  }
  return updated;
};

// IndexedDB Helper
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveCustomAudioFile(file: File): Promise<StoredAudioTrack> {
  const db = await openDB();
  const track: StoredAudioTrack = {
    blob: file,
    name: file.name,
    size: file.size,
    type: file.type || 'audio/mpeg',
    updatedAt: Date.now(),
  };

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.put(track, KEY_NAME);

    req.onsuccess = () => {
      saveAudioPreferences({
        sourceMode: 'custom-file',
        customTrackName: file.name,
      });
      window.dispatchEvent(new CustomEvent('rafa930:custom-file-saved', { detail: track }));
      resolve(track);
    };

    req.onerror = () => reject(req.error);
  });
}

export async function getCustomAudioFile(): Promise<StoredAudioTrack | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(KEY_NAME);

      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  } catch {
    return null;
  }
}

export async function deleteCustomAudioFile(): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(KEY_NAME);

      req.onsuccess = () => {
        saveAudioPreferences({
          sourceMode: 'default',
          customTrackName: '',
        });
        window.dispatchEvent(new CustomEvent('rafa930:custom-file-deleted'));
        resolve();
      };
      req.onerror = () => reject(req.error);
    });
  } catch {
    // Ignore error
  }
}
