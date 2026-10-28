// Web Audio API procedural audio synthesizer & sound engine

class CinematicAudioEngine {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private masterGain: GainNode | null = null;
  private ambientOsc1: OscillatorNode | null = null;
  private ambientOsc2: OscillatorNode | null = null;
  private ambientFilter: BiquadFilterNode | null = null;
  private ambientGain: GainNode | null = null;
  private customAudio: HTMLAudioElement | null = null;
  private lastTriggeredTransition: number = -1;

  public init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioContextClass();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  public setVolume(volume: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(Math.max(0, Math.min(volume, 1)), this.ctx.currentTime, 0.05);
    }
    if (this.customAudio) {
      this.customAudio.volume = Math.max(0, Math.min(volume, 1));
    }
  }

  public startAmbient() {
    if (!this.ctx) this.init();
    if (!this.ctx || this.isRunning) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    // Warm deep sub/mid drone: D minor chord tone (approx 73.4Hz D2 & 110Hz A2)
    this.ambientFilter = this.ctx.createBiquadFilter();
    this.ambientFilter.type = 'lowpass';
    this.ambientFilter.frequency.setValueAtTime(320, this.ctx.currentTime);
    this.ambientFilter.Q.setValueAtTime(1.5, this.ctx.currentTime);

    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    this.ambientGain.gain.exponentialRampToValueAtTime(0.25, this.ctx.currentTime + 2.0);

    this.ambientOsc1 = this.ctx.createOscillator();
    this.ambientOsc1.type = 'sine';
    this.ambientOsc1.frequency.setValueAtTime(73.42, this.ctx.currentTime); // D2

    this.ambientOsc2 = this.ctx.createOscillator();
    this.ambientOsc2.type = 'triangle';
    this.ambientOsc2.frequency.setValueAtTime(110.0, this.ctx.currentTime); // A2

    this.ambientOsc1.connect(this.ambientFilter);
    this.ambientOsc2.connect(this.ambientFilter);
    this.ambientFilter.connect(this.ambientGain);

    if (this.masterGain) {
      this.ambientGain.connect(this.masterGain);
    }

    this.ambientOsc1.start();
    this.ambientOsc2.start();
    this.isRunning = true;
  }

  public stopAmbient() {
    if (!this.isRunning || !this.ctx) return;
    try {
      if (this.ambientGain) {
        this.ambientGain.gain.setTargetAtTime(0.001, this.ctx.currentTime, 0.3);
      }
      setTimeout(() => {
        try {
          this.ambientOsc1?.stop();
          this.ambientOsc2?.stop();
          this.ambientOsc1?.disconnect();
          this.ambientOsc2?.disconnect();
          this.ambientFilter?.disconnect();
          this.ambientGain?.disconnect();
        } catch {
          // ignore cleanup errors
        }
        this.isRunning = false;
      }, 400);
    } catch {
      this.isRunning = false;
    }
  }

  // Soft whoosh on scene transition
  public playTransitionWhoosh(sceneIndex: number) {
    if (this.lastTriggeredTransition === sceneIndex) return;
    this.lastTriggeredTransition = sceneIndex;

    if (!this.ctx || !this.masterGain) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    try {
      const now = this.ctx.currentTime;
      // White noise buffer for whoosh
      const bufferSize = this.ctx.sampleRate * 0.45;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(180, now);
      filter.frequency.exponentialRampToValueAtTime(1400, now + 0.18);
      filter.frequency.exponentialRampToValueAtTime(220, now + 0.45);
      filter.Q.setValueAtTime(2.2, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.28, now + 0.16);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noise.start(now);
      noise.stop(now + 0.45);
    } catch {
      // Audio playback failure recovery
    }
  }

  // Soft click on cursor / button press
  public playClickSound() {
    if (!this.ctx || !this.masterGain) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // Audio playback failure recovery
    }
  }

  // Play custom audio file
  public setCustomAudio(url?: string) {
    if (this.customAudio) {
      this.customAudio.pause();
      this.customAudio = null;
    }
    if (url) {
      this.customAudio = new Audio(url);
      this.customAudio.loop = true;
    }
  }

  public syncPlayback(isPlaying: boolean, currentTime: number) {
    if (this.customAudio) {
      if (isPlaying) {
        if (Math.abs(this.customAudio.currentTime - currentTime) > 0.3) {
          this.customAudio.currentTime = currentTime;
        }
        this.customAudio.play().catch(() => {});
      } else {
        this.customAudio.pause();
      }
    }
  }
}

export const audioEngine = new CinematicAudioEngine();
