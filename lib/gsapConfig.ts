import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({
    ease: 'power2.out',
    duration: 0.8,
  });
}

export function setupGsap() {
  // Initialization logic is run at module level above
}

export const scrollConfig = {
  markers: false,
};

export function createScrollTimeline(triggerElement: Element | string, options: ScrollTrigger.Vars = {}): gsap.core.Timeline {
  return gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      start: 'top center',
      end: 'bottom center',
      scrub: false,
      ...options,
    },
  });
}
