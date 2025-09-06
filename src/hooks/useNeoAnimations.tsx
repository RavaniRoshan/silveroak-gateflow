import { useRef, useCallback, useEffect } from 'react';

/**
 * Neo-Minimal Animation Hooks - Simplified without GSAP
 * Provides basic animation patterns using CSS animations
 */

export interface AnimationOptions {
  duration?: number;
  delay?: number;
  ease?: string;
  repeat?: number;
  yoyo?: boolean;
}

// Hook for entrance animations
export const useNeoEntrance = (options: AnimationOptions = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Simplified without GSAP - using CSS animations
  const slideUp = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.animation = 'slideUp 0.8s ease-out forwards';
  }, []);

  const fadeIn = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.animation = 'fadeIn 0.6s ease-out forwards';
  }, []);

  const brutalistSlam = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.animation = 'brutalistSlam 0.4s ease-out forwards';
  }, []);

  return { ref, slideUp, fadeIn, brutalistSlam };
};

// Hook for hover animations
export const useNeoHover = <T extends HTMLElement = HTMLDivElement>(options: AnimationOptions = {}) => {
  const ref = useRef<T>(null);
  
  // Simplified without GSAP
  const glowPulse = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.animation = 'glowPulse 0.6s ease-out';
  }, []);

  const neoScale = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = 'scale(1.05)';
    ref.current.style.transition = 'transform 0.2s ease-out';
  }, []);

  const neoScaleDown = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = 'scale(1)';
    ref.current.style.transition = 'transform 0.2s ease-out';
  }, []);

  const brutalistShake = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.animation = 'brutalistShake 0.5s ease-in-out';
  }, []);

  return { 
    ref, 
    glowPulse, 
    neoScale, 
    neoScaleDown, 
    brutalistShake,
    onMouseEnter: neoScale,
    onMouseLeave: neoScaleDown
  };
};

// Hook for typing animations
export const useNeoTyping = (text: string, options: AnimationOptions = {}) => {
  const ref = useRef<HTMLElement>(null);
  
  // Simplified without GSAP
  const typeText = useCallback(() => {
    if (!ref.current) return;
    ref.current.textContent = text;
    ref.current.style.animation = 'neoTyping 2s steps(20, end)';
  }, [text]);

  const stopTyping = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.animation = '';
  }, []);

  return { ref, typeText, stopTyping };
};

// Hook for page transitions
export const useNeoPageTransition = (options: AnimationOptions = {}) => {
  const containerRef = useRef<HTMLElement>(null);
  
  const slideIn = useCallback(() => {
    if (!containerRef.current) return;
    containerRef.current.style.animation = 'slideIn 0.6s ease-out forwards';
  }, []);

  const slideOut = useCallback(() => {
    if (!containerRef.current) return;
    containerRef.current.style.animation = 'slideOut 0.4s ease-in forwards';
  }, []);

  return { containerRef, slideIn, slideOut };
};

// Hook for scroll-triggered animations
export const useNeoScrollTrigger = (options: AnimationOptions = {}) => {
  const ref = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.animation = 'fadeInUp 1s ease-out forwards';
          }
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(ref.current);
    
    return () => observer.disconnect();
  }, []);

  return { ref };
};

// Hook for 3D perspective animations
export const useNeo3D = (options: AnimationOptions = {}) => {
  const ref = useRef<HTMLElement>(null);
  
  const tiltForward = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(1000px) rotateX(-5deg)';
    ref.current.style.transition = 'transform 0.3s ease-out';
  }, []);
  
  const resetTilt = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(1000px) rotateX(0deg)';
    ref.current.style.transition = 'transform 0.3s ease-out';
  }, []);

  return { ref, tiltForward, resetTilt };
};