/**
 * CONFIGURACIÓN DE AUDIO AMBIENTAL PREDETERMINADO · RAFA 930
 * 
 * Puedes editar este archivo directamente para cambiar la pista predeterminada,
 * el volumen por defecto, los efectos de eco o las rutas de tus archivos.
 * 
 * INSTRUCCIONES PARA COLOCAR TU ARCHIVO MP3 / WAV DIRECTAMENTE EN EL PROYECTO:
 * 1. Coloca tu archivo en la carpeta "public/" con el nombre "de-vuelta-ambient.mp3"
 *    o "de-vuelta-ambient.wav".
 * 2. También puedes usar el botón interactivo de "Estudio de Audio" en la web para
 *    subir tu canción directamente desde tu dispositivo o pegar un enlace web.
 */

export interface AmbientAudioConfig {
  /**
   * Título mostrado en la web para el audio ambiente
   */
  title: string;

  /**
   * Ruta del archivo predeterminado en public/
   */
  defaultFilePath: string;

  /**
   * Rutas alternativas donde el reproductor buscará tu archivo
   */
  candidatePaths: string[];

  /**
   * Volumen predeterminado (de 0.01 a 1.0).
   * Recomendado para sonido sutil de fondo: entre 0.03 y 0.08
   */
  defaultVolume: number;

  /**
   * Nivel de eco / delay ambiental (de 0.0 a 0.85).
   * Recomendado para atmósfera de eco urbano nocturno: 0.40
   */
  defaultEchoLevel: number;

  /**
   * Si debe comenzar en silencio inicialmente
   */
  defaultMuted: boolean;

  /**
   * ID del sintetizador de respaldo si no hay archivo subido aún
   */
  fallbackSynthTrack: 'de-vuelta-echo' | 'de-vuelta' | 'hago-dinero';
}

export const AMBIENT_AUDIO_CONFIG: AmbientAudioConfig = {
  title: 'De Vuelta (Sonido Ambiente Eco)',
  defaultFilePath: '/de-vuelta-ambient.mp3',
  candidatePaths: [
    '/de-vuelta-ambient.mp3',
    '/de-vuelta-ambient.wav',
    '/assets/de-vuelta-ambient.mp3',
    '/assets/de-vuelta-ambient.wav',
    '/assets/ambient.mp3',
    '/assets/ambient.wav',
  ],
  defaultVolume: 0.05, // Volumen muy bajo y sutil
  defaultEchoLevel: 0.42, // Eco con reverb de fondo
  defaultMuted: false,
  fallbackSynthTrack: 'de-vuelta-echo',
};
