import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Flip);
}

export * from 'gsap';
export * from 'gsap/ScrollTrigger';
export * from 'gsap/Flip';
export { gsap };
