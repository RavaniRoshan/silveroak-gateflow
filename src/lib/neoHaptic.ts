/**
 * Neo-Minimal Haptic Feedback Simulation - Simplified
 * Simulates haptic feedback through visual cues for web interfaces
 */

export type FeedbackType = 
  | 'light' 
  | 'medium' 
  | 'heavy' 
  | 'success' 
  | 'error' 
  | 'warning'
  | 'brutal';

export interface HapticOptions {
  type?: FeedbackType;
  duration?: number;
  intensity?: number;
  element?: HTMLElement | null;
  sound?: boolean;
}

class NeoHapticFeedback {
  private audioContext: AudioContext | null = null;
  private isSupported: boolean = false;

  constructor() {
    this.initializeAudioContext();
    this.detectHapticSupport();
  }

  private initializeAudioContext() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.warn('Audio context not supported');
    }
  }

  private detectHapticSupport() {
    this.isSupported = 'vibrate' in navigator;
  }

  /**
   * Trigger haptic feedback with visual animation
   */
  public trigger(options: HapticOptions = {}): Promise<void> {
    const {
      type = 'medium',
      duration = 100,
      intensity = 1,
      element = null,
      sound = true
    } = options;

    return new Promise((resolve) => {
      // Native haptic feedback (mobile devices)
      this.triggerNativeHaptic(type, duration);

      // Visual feedback animation
      if (element) {
        this.triggerVisualFeedback(element, type, intensity);
      }

      // Audio feedback
      if (sound && this.audioContext) {
        this.triggerAudioFeedback(type, duration, intensity);
      }

      // Resolve after animation completes
      setTimeout(resolve, duration + 50);
    });
  }

  /**
   * Native vibration API (mobile devices)
   */
  private triggerNativeHaptic(type: FeedbackType, duration: number) {
    if (!this.isSupported) return;

    const patterns: Record<FeedbackType, number[]> = {
      light: [50],
      medium: [100],
      heavy: [200],
      success: [50, 50, 100],
      error: [100, 50, 100, 50, 200],
      warning: [150, 50, 150],
      brutal: [300, 100, 300]
    };

    const pattern = patterns[type] || [duration];
    navigator.vibrate(pattern);
  }

  /**
   * Visual feedback using CSS animations
   */
  private triggerVisualFeedback(element: HTMLElement, type: FeedbackType, intensity: number) {
    const animations: Record<FeedbackType, () => void> = {
      light: () => {
        element.style.animation = 'neoScale 0.2s ease-out';
      },

      medium: () => {
        element.style.animation = 'neoScale 0.3s ease-out';
      },

      heavy: () => {
        element.style.animation = 'neoScale 0.4s ease-out';
      },

      success: () => {
        element.style.backgroundColor = '#10B981';
        element.style.animation = 'neoScale 0.3s ease-out';
        setTimeout(() => {
          element.style.backgroundColor = '';
        }, 300);
      },

      error: () => {
        element.style.backgroundColor = '#EF4444';
        element.style.animation = 'neoShake 0.5s ease-in-out';
        setTimeout(() => {
          element.style.backgroundColor = '';
        }, 300);
      },

      warning: () => {
        element.style.backgroundColor = '#F59E0B';
        element.style.animation = 'neoScale 0.3s ease-out';
        setTimeout(() => {
          element.style.backgroundColor = '';
        }, 300);
      },

      brutal: () => {
        element.style.animation = 'neoShake 0.8s ease-in-out';
      }
    };

    const animation = animations[type];
    if (animation) {
      animation();
    }
  }

  /**
   * Audio feedback using Web Audio API
   */
  private triggerAudioFeedback(type: FeedbackType, duration: number, intensity: number) {
    if (!this.audioContext) return;

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      // Configure audio based on feedback type
      const audioConfig: Record<FeedbackType, { frequency: number; volume: number }> = {
        light: { frequency: 800, volume: 0.1 },
        medium: { frequency: 600, volume: 0.2 },
        heavy: { frequency: 400, volume: 0.3 },
        success: { frequency: 1000, volume: 0.15 },
        error: { frequency: 200, volume: 0.25 },
        warning: { frequency: 700, volume: 0.2 },
        brutal: { frequency: 150, volume: 0.4 }
      };

      const config = audioConfig[type];
      oscillator.frequency.setValueAtTime(config.frequency, this.audioContext.currentTime);
      gainNode.gain.setValueAtTime(config.volume * intensity, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration / 1000);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration / 1000);
    } catch (error) {
      console.warn('Audio feedback failed:', error);
    }
  }
}

// Create singleton instance
export const neoHaptic = new NeoHapticFeedback();