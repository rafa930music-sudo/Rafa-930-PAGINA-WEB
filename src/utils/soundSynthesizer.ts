/**
 * Web Audio API ambient beat & melodic synthesizer for RAFA 930
 * Plays urban trap chords, sub bass 808s, ambient keys, and low-volume echo FX
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private currentTrackId: string | null = null;
  private timer: number | null = null;
  private step = 0;
  private listeners: ((playing: boolean, trackId: string | null) => void)[] = [];
  private echoGain: GainNode | null = null;
  private delayNode: DelayNode | null = null;
  private feedbackGain: GainNode | null = null;
  private echoFilter: BiquadFilterNode | null = null;
  private masterGain: GainNode | null = null;
  private masterVolume: number = 0.05;
  private echoLevel: number = 0.42;
  private isMuted: boolean = false;

  public initCtx() {
    if (!this.ctx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
      this.setupEchoBus();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private setupEchoBus() {
    if (!this.ctx) return;
    try {
      // Master gain node
      this.masterGain = this.ctx.createGain();
      const effectiveVol = this.isMuted ? 0 : this.masterVolume;
      this.masterGain.gain.setValueAtTime(effectiveVol, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Create master echo output with low volume for subtle background presence
      this.echoGain = this.ctx.createGain();
      this.echoGain.gain.setValueAtTime(this.echoLevel * 0.08, this.ctx.currentTime);

      // Create Delay Node (350ms delay time)
      this.delayNode = this.ctx.createDelay(1.0);
      this.delayNode.delayTime.setValueAtTime(0.35, this.ctx.currentTime);

      // Create Feedback Node
      this.feedbackGain = this.ctx.createGain();
      this.feedbackGain.gain.setValueAtTime(this.echoLevel, this.ctx.currentTime);

      // Create Low-pass Filter Node for soft, warm echo tails
      this.echoFilter = this.ctx.createBiquadFilter();
      this.echoFilter.type = 'lowpass';
      this.echoFilter.frequency.setValueAtTime(900, this.ctx.currentTime);

      // Routing: Delay -> Filter -> Feedback -> Delay
      this.delayNode.connect(this.echoFilter);
      this.echoFilter.connect(this.feedbackGain);
      this.feedbackGain.connect(this.delayNode);

      // Send filter output to master echo gain and then to master output
      this.echoFilter.connect(this.echoGain);
      this.echoGain.connect(this.masterGain);
    } catch {
      // AudioContext fallback
    }
  }

  public setVolume(vol: number) {
    this.masterVolume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      const target = this.isMuted ? 0 : this.masterVolume;
      this.masterGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.05);
    }
  }

  public setEchoLevel(level: number) {
    this.echoLevel = Math.max(0, Math.min(0.85, level));
    if (this.ctx) {
      if (this.feedbackGain) {
        this.feedbackGain.gain.setTargetAtTime(this.echoLevel, this.ctx.currentTime, 0.05);
      }
      if (this.echoGain) {
        this.echoGain.gain.setTargetAtTime(this.echoLevel * 0.08, this.ctx.currentTime, 0.05);
      }
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      const target = this.isMuted ? 0 : this.masterVolume;
      this.masterGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.05);
    }
    this.notify();
  }

  public getMasterDestination(): AudioNode | null {
    this.initCtx();
    return this.masterGain;
  }

  public getDelayNode(): DelayNode | null {
    this.initCtx();
    return this.delayNode;
  }

  public getContext(): AudioContext | null {
    this.initCtx();
    return this.ctx;
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

    // 100 BPM tempo for "De Vuelta" ambient echo mode
    const isDeVuelta = trackId === 'de-vuelta' || trackId === 'de-vuelta-echo';
    const bpm = isDeVuelta ? 100 : 130;
    const intervalMs = (60 / bpm / 4) * 1000; // 16th notes

    this.timer = window.setInterval(() => {
      if (isDeVuelta) {
        this.tickDeVueltaEcho();
      } else {
        this.tick();
      }
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

  public toggle(trackId: string = 'de-vuelta') {
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

  // Low-volume echo synthesizer loop for "De Vuelta"
  private tickDeVueltaEcho() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Deep sub bass on step 0 and 16
    if (this.step === 0) {
      this.triggerEcho808(now, 41.2); // E1 low sub
      this.triggerEchoKeys(now, [164.81, 196.0, 246.94, 293.66]); // E min9
    } else if (this.step === 8) {
      this.triggerEchoKeys(now, [146.83, 185.0, 220.0, 293.66]); // D maj
    } else if (this.step === 16) {
      this.triggerEcho808(now, 36.71); // D1 low sub
      this.triggerEchoKeys(now, [130.81, 164.81, 196.0, 246.94]); // C maj7
    } else if (this.step === 24) {
      this.triggerEchoKeys(now, [123.47, 146.83, 185.0, 220.0]); // B min7
    }

    // Soft percussion echo tick on steps 4, 12, 20, 28
    if (this.step % 4 === 2) {
      this.triggerSoftRimEcho(now);
    }
  }

  private tick() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Kick / 808 Sub on steps 0, 10, 16, 26
    if (this.step === 0 || this.step === 10 || this.step === 16 || this.step === 26) {
      this.trigger808(now, this.step === 16 ? 48.99 : 43.65);
    }

    // Snare / Clap on step 8 and 24
    if (this.step === 8 || this.step === 24) {
      this.triggerSnare(now);
    }

    // Hi-hats on every even 16th note
    if (this.step % 2 === 0 || this.step === 14 || this.step === 15) {
      this.triggerHiHat(now, this.step === 14 ? 0.08 : 0.15);
    }

    // Ambient chords on step 0 and 16
    if (this.step === 0) {
      this.triggerPadChord(now, [174.61, 220.0, 261.63, 329.63]);
    } else if (this.step === 16) {
      this.triggerPadChord(now, [146.83, 174.61, 220.0, 261.63]);
    }
  }

  private triggerEcho808(time: number, freq: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq * 1.5, time);
    osc.frequency.exponentialRampToValueAtTime(freq, time + 0.1);

    // Very low volume (~0.04)
    gain.gain.setValueAtTime(0.04, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.9);

    osc.connect(gain);
    gain.connect(this.masterGain || this.ctx.destination);
    if (this.delayNode) gain.connect(this.delayNode);

    osc.start(time);
    osc.stop(time + 0.9);
  }

  private triggerEchoKeys(time: number, freqs: number[]) {
    if (!this.ctx) return;
    freqs.forEach((f) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      const filter = this.ctx!.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, time);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(500, time);

      // Low subtle volume (~0.015)
      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(0.015, time + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 1.8);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain || this.ctx!.destination);
      if (this.delayNode) gain.connect(this.delayNode);

      osc.start(time);
      osc.stop(time + 1.8);
    });
  }

  private triggerSoftRimEcho(time: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400, time);

    gain.gain.setValueAtTime(0.01, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.05);

    osc.connect(gain);
    gain.connect(this.masterGain || this.ctx.destination);
    if (this.delayNode) gain.connect(this.delayNode);

    osc.start(time);
    osc.stop(time + 0.05);
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
    gain.connect(this.masterGain || this.ctx.destination);

    osc.start(time);
    osc.stop(time + 0.55);
  }

  private triggerSnare(time: number) {
    if (!this.ctx) return;
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
    gain.connect(this.masterGain || this.ctx.destination);

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
    gain.connect(this.masterGain || this.ctx.destination);

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
      gain.connect(this.masterGain || this.ctx!.destination);

      osc.start(time);
      osc.stop(time + 2.0);
    });
  }
}

export const soundEngine = new SoundEngine();

