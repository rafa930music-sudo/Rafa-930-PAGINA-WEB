/**
 * Motor sintetizador Web Audio para música ambiental urbana de RAFA 930.
 * Ofrece síntesis procedural de acordes atmosféricos lo-fi y pads de trap
 * como respaldo instantáneo cuando el audio HTML5 es bloqueado o tarda en cargar.
 */

export class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private delayNode: DelayNode | null = null;
  private echoGain: GainNode | null = null;
  private isMuted: boolean = false;
  private masterVolume: number = 0.35;
  private echoLevel: number = 0.20;
  private isPlaying: boolean = false;
  private loopTimer: ReturnType<typeof setInterval> | null = null;
  private activeOscs: OscillatorNode[] = [];

  constructor() {
    // Lazy initialized on first user gesture
  }

  public initCtx(): AudioContext | null {
    if (typeof window === 'undefined') return null;

    try {
      if (!this.ctx) {
        const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtxClass) return null;
        this.ctx = new AudioCtxClass();

        // Master Gain
        this.masterGain = this.ctx.createGain();
        const effectiveVol = this.isMuted ? 0 : this.masterVolume;
        this.masterGain.gain.setValueAtTime(effectiveVol, this.ctx.currentTime);

        // Delay & Echo feedback loop
        this.delayNode = this.ctx.createDelay();
        this.delayNode.delayTime.setValueAtTime(0.38, this.ctx.currentTime);

        this.echoGain = this.ctx.createGain();
        this.echoGain.gain.setValueAtTime(this.echoLevel, this.ctx.currentTime);

        // Connect delay loop
        this.delayNode.connect(this.echoGain);
        this.echoGain.connect(this.delayNode);
        this.echoGain.connect(this.masterGain);

        this.masterGain.connect(this.ctx.destination);
      }

      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {
          // Handled silently
        });
      }

      return this.ctx;
    } catch (e) {
      console.warn('AudioContext no se pudo inicializar:', e);
      return null;
    }
  }

  public setVolume(vol: number) {
    this.masterVolume = Math.max(0, Math.min(1, vol));
    if (this.ctx && this.masterGain) {
      const target = this.isMuted ? 0 : this.masterVolume;
      this.masterGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.05);
    }
  }

  public setEchoLevel(level: number) {
    this.echoLevel = Math.max(0, Math.min(0.85, level));
    if (this.ctx && this.echoGain) {
      this.echoGain.gain.setTargetAtTime(this.echoLevel, this.ctx.currentTime, 0.05);
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.ctx && this.masterGain) {
      const target = this.isMuted ? 0 : this.masterVolume;
      this.masterGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.05);
    }
  }

  /**
   * Reproduce una progresión de acordes urbanos atmosféricos en bucle (inspirados en "De Vuelta")
   */
  public playTrack(_trackName: string = 'de-vuelta-echo') {
    const ctx = this.initCtx();
    if (!ctx) return;

    if (this.isPlaying) {
      this.stop();
    }

    this.isPlaying = true;

    // Progresión armónica menor de trap/rap consciente:
    // C minor 9 -> Ab Major 7 -> Eb Major -> Bb sus4
    const chords: number[][] = [
      [130.81, 155.56, 196.00, 233.08, 293.66], // C3, Eb3, G3, Bb3, D4
      [103.83, 155.56, 207.65, 261.63],         // Ab2, Eb3, Ab3, C4
      [155.56, 196.00, 233.08, 311.13],         // Eb3, G3, Bb3, Eb4
      [116.54, 174.61, 233.08, 261.63],         // Bb2, F3, Bb3, C4
    ];

    let currentChordIndex = 0;

    const playChord = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;

      const chord = chords[currentChordIndex];
      currentChordIndex = (currentChordIndex + 1) % chords.length;

      const now = this.ctx.currentTime;
      const duration = 4.0; // 4 segundos por acorde

      chord.forEach((freq) => {
        if (!this.ctx || !this.masterGain) return;

        try {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const filter = this.ctx.createBiquadFilter();

          // Tono cálido con filtro paso-bajo urbano
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(750, now);
          filter.Q.setValueAtTime(1.5, now);

          // Envolvente suave (Fade In -> Sustain -> Fade Out)
          gain.gain.setValueAtTime(0.0001, now);
          gain.gain.exponentialRampToValueAtTime(0.035, now + 0.8);
          gain.gain.exponentialRampToValueAtTime(0.02, now + duration - 0.6);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.masterGain);

          if (this.delayNode) {
            gain.connect(this.delayNode);
          }

          osc.start(now);
          osc.stop(now + duration + 0.1);

          this.activeOscs.push(osc);
          osc.onended = () => {
            const index = this.activeOscs.indexOf(osc);
            if (index > -1) {
              this.activeOscs.splice(index, 1);
            }
          };
        } catch {
          // Handled silently
        }
      });
    };

    // Tocar primer acorde y programar ciclo continuo
    playChord();
    this.loopTimer = setInterval(playChord, 3800);
  }

  public stop() {
    this.isPlaying = false;

    if (this.loopTimer) {
      clearInterval(this.loopTimer);
      this.loopTimer = null;
    }

    if (this.activeOscs.length > 0 && this.ctx) {
      const now = this.ctx.currentTime;
      this.activeOscs.forEach((osc) => {
        try {
          osc.stop(now + 0.1);
        } catch {
          // Handled silently
        }
      });
      this.activeOscs = [];
    }
  }
}

export const soundEngine = new SoundEngine();
