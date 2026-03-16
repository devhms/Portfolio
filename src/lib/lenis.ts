import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';

let lenis: Lenis | null = null;

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => 1 - Math.pow(1 - t, 3),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 2,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time: number) => {
    lenis?.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}

export { lenis };
