import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseScrollSmootherOptions {
  smooth?: number;
  effects?: boolean;
  normalizeScroll?: boolean;
  ignoreMobileResize?: boolean;
}

export const useScrollSmoother = (options: UseScrollSmootherOptions = {}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const smootherRef = useRef<any>(null);

  const {
    smooth = 1.0,
    effects = true,
    normalizeScroll = true,
    ignoreMobileResize = true
  } = options;

  useEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return;

    let scrollTarget = 0;
    let currentScroll = 0;
    let requestId: number;
    let isScrolling = false;

    // Create smooth scroll animation
    const updateScroll = () => {
      const diff = scrollTarget - currentScroll;
      currentScroll += diff * (1 / (smooth * 60));

      if (contentRef.current) {
        gsap.set(contentRef.current, {
          y: -currentScroll,
          force3D: true
        });
      }

      if (Math.abs(diff) > 0.1) {
        requestId = requestAnimationFrame(updateScroll);
      } else {
        isScrolling = false;
        currentScroll = scrollTarget;
      }
    };

    // Handle wheel events for smooth scrolling
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      scrollTarget += e.deltaY * 1.2;
      
      const maxScroll = contentRef.current ? 
        Math.max(0, contentRef.current.scrollHeight - window.innerHeight) : 0;
      scrollTarget = Math.max(0, Math.min(scrollTarget, maxScroll));

      if (!isScrolling) {
        isScrolling = true;
        updateScroll();
      }
    };

    // Handle touch events for mobile
    let touchStartY = 0;
    let touchCurrentY = 0;
    let isTouch = false;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      isTouch = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isTouch) return;
      e.preventDefault();
      
      touchCurrentY = e.touches[0].clientY;
      const deltaY = (touchStartY - touchCurrentY) * 2.5;
      
      scrollTarget += deltaY;
      const maxScroll = contentRef.current ? 
        Math.max(0, contentRef.current.scrollHeight - window.innerHeight) : 0;
      scrollTarget = Math.max(0, Math.min(scrollTarget, maxScroll));
      
      touchStartY = touchCurrentY;

      if (!isScrolling) {
        isScrolling = true;
        updateScroll();
      }
    };

    const handleTouchEnd = () => {
      isTouch = false;
    };

    // Setup parallax effects for elements with data attributes
    const setupParallaxEffects = () => {
      if (!effects || !contentRef.current) return;
      
      const parallaxElements = contentRef.current.querySelectorAll('[data-speed], [data-lag]');
      
      parallaxElements.forEach((element) => {
        const speed = element.getAttribute('data-speed');
        const lag = element.getAttribute('data-lag');
        
        if (speed) {
          const isClamp = speed.includes('clamp(');
          const speedValue = isClamp ? 
            parseFloat(speed.replace(/clamp\(|\)/g, '')) : parseFloat(speed);

          ScrollTrigger.create({
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            animation: gsap.fromTo(element, {
              y: isClamp ? 0 : -200 * speedValue
            }, {
              y: isClamp ? 100 * (1 - speedValue) : 200 * speedValue,
              ease: "none",
              force3D: true
            })
          });
        }
        
        if (lag) {
          const lagValue = parseFloat(lag);
          
          ScrollTrigger.create({
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: lagValue * 2,
            animation: gsap.fromTo(element, {
              y: -100 * lagValue
            }, {
              y: 100 * lagValue,
              ease: "none",
              force3D: true
            })
          });
        }
      });
    };

    // Add event listeners
    const wrapper = wrapperRef.current;
    wrapper.addEventListener('wheel', handleWheel, { passive: false });
    wrapper.addEventListener('touchstart', handleTouchStart, { passive: false });
    wrapper.addEventListener('touchmove', handleTouchMove, { passive: false });
    wrapper.addEventListener('touchend', handleTouchEnd);

    // Normalize scroll
    if (normalizeScroll) {
      document.body.style.overflow = 'hidden';
    }

    // Setup parallax effects
    setupParallaxEffects();

    // Store smoother instance reference
    smootherRef.current = {
      scrollTo: (target: string | number, animate = true) => {
        if (typeof target === 'number') {
          if (animate) {
            gsap.to({ value: scrollTarget }, {
              value: target,
              duration: 1.5,
              ease: "power2.out",
              onUpdate: function() {
                scrollTarget = this.targets()[0].value;
                if (!isScrolling) {
                  isScrolling = true;
                  updateScroll();
                }
              }
            });
          } else {
            scrollTarget = target;
            if (!isScrolling) {
              isScrolling = true;
              updateScroll();
            }
          }
        } else {
          const element = document.querySelector(target);
          if (element) {
            const rect = element.getBoundingClientRect();
            const targetScroll = rect.top + scrollTarget;
            
            if (animate) {
              gsap.to({ value: scrollTarget }, {
                value: targetScroll,
                duration: 1.5,
                ease: "power2.out",
                onUpdate: function() {
                  scrollTarget = this.targets()[0].value;
                  if (!isScrolling) {
                    isScrolling = true;
                    updateScroll();
                  }
                }
              });
            } else {
              scrollTarget = targetScroll;
              if (!isScrolling) {
                isScrolling = true;
                updateScroll();
              }
            }
          }
        }
      },
      
      progress: () => {
        const maxScroll = contentRef.current ? 
          Math.max(0, contentRef.current.scrollHeight - window.innerHeight) : 0;
        return maxScroll > 0 ? scrollTarget / maxScroll : 0;
      },

      scrollTop: (value?: number) => {
        if (value !== undefined) {
          scrollTarget = value;
          if (!isScrolling) {
            isScrolling = true;
            updateScroll();
          }
          return smootherRef.current;
        }
        return scrollTarget;
      }
    };

    // Cleanup function
    return () => {
      wrapper.removeEventListener('wheel', handleWheel);
      wrapper.removeEventListener('touchstart', handleTouchStart);
      wrapper.removeEventListener('touchmove', handleTouchMove);
      wrapper.removeEventListener('touchend', handleTouchEnd);
      
      if (requestId) {
        cancelAnimationFrame(requestId);
      }
      
      if (normalizeScroll) {
        document.body.style.overflow = '';
      }
      
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [smooth, effects, normalizeScroll, ignoreMobileResize]);

  // Refresh ScrollTrigger when content changes
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return {
    wrapperRef,
    contentRef,
    smoother: smootherRef.current
  };
};

export default useScrollSmoother;