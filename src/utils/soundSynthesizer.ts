/**
 * Web Audio API ambient beat & melodic synthesizer for RAFA 930
 * Plays urban trap chords, sub bass 808s, and ambient keys
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private currentTrackId: string | null = null;
  private timer: number | null = null;
  private step = 0;
  private listeners: ((playing: boolean, trackId: string | null) => void)[] = [];

  private initCtx() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(fn: (playing: boolean, trackId: string | null) => void) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l(this.isPlaying, this.currentTrackId));
  }

  public playTrack(trackId: string) {
    this.initCtx();
    if (this.isPlaying && this.currentTrackId === trackId) {
      this.pause();
      return;
    }

    this.stop();
    this.currentTrackId = trackId;
    this.isPlaying = true;
    this.step = 0;
    this.notify();

    // 130 BPM tempo loop
    const intervalMs = (60 / 130 / 4) * 1000; // 16th notes
    this.timer = window.setInterval(() => {
      this.tick();
      this.step = (this.step + 1) % 32;
    }, intervalMs);
  }

  public pause() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.isPlaying = false;
    this.notify();
  }

  public stop() {
    this.pause();
    this.currentTrackId = null;
    this.notify();
  }

  public toggle(trackId: string) {
    if (this.isPlaying && this.currentTrackId === trackId) {
      this.pause();
    } else {
      this.playTrack(trackId);
    }
  }

  public getStatus() {
    return {
      isPlaying: this.isPlaying,
      currentTrackId: this.currentTrackId,
    };
  }

  private tick() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Kick / 808 Sub on steps 0, 10, 16, 26
    if (this.step === 0 || this.step === 10 || this.step === 16 || this.step === 26) {
      this.trigger808(now, this.step === 16 ? 48.99 : 43.65); // G1 or F1
    }

    // Snare / Clap on step 8 and 24
    if (this.step === 8 || this.step === 24) {
      this.triggerSnare(now);
    }

    // Hi-hats on every even 16th note, with roll on step 14, 15
    if (this.step % 2 === 0 || this.step === 14 || this.step === 15) {
      this.triggerHiHat(now, this.step === 14 ? 0.08 : 0.15);
    }

    // Ambient chords on step 0 and 16
    if (this.step === 0) {
      this.triggerPadChord(now, [174.61, 220.0, 261.63, 329.63]); // F maj7
    } else if (this.step === 16) {
      this.triggerPadChord(now, [146.83, 174.61, 220.0, 261.63]); // D min7
    }
  }

  private trigger808(time: number, freq: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq * 1.8, time);
    osc.frequency.exponentialRampToValueAtTime(freq, time + 0.08);

    gain.gain.setValueAtTime(0.35, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.55);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + 0.55);
  }

  private triggerSnare(time: number) {
    if (!this.ctx) return;
    // Noise buffer
    const bufferSize = this.ctx.sampleRate * 0.12;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1000;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.18, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(time);
    noise.stop(time + 0.12);
  }

  private triggerHiHat(time: number, vol = 0.1) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(8000, time);

    gain.gain.setValueAtTime(vol, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + 0.04);
  }

  private triggerPadChord(time: number, freqs: number[]) {
    if (!this.ctx) return;
    freqs.forEach((f) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(f, time);

      const filter = this.ctx!.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, time);
      filter.frequency.exponentialRampToValueAtTime(750, time + 0.8);
      filter.frequency.exponentialRampToValueAtTime(300, time + 1.8);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(0.03, time + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 1.9);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(time);
      osc.stop(time + 2.0);
    });
  }
}

export const soundEngine = new SoundEngine();
