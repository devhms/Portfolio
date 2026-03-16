/**
 * useMagneticEffect — UNUSED HOOK
 *
 * The magnetic effect is handled globally in ClientProviders.tsx via a delegated
 * mousemove listener on window that targets all [data-magnetic] elements.
 * This per-element hook approach was superseded and is kept here only for reference.
 *
 * If you ever need a one-off magnetic element outside the [data-magnetic] system,
 * attach this hook to that element's ref.
 */
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export function useMagneticEffect() {
  const magneticRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = magneticRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { width, height, left, top } = el.getBoundingClientRect();
      const ox = clientX - (left + width / 2);
      const oy = clientY - (top + height / 2);

      gsap.to(el, { x: ox * 0.35, y: oy * 0.35, duration: 0.6, ease: 'power3.out' });
    };

    const handleMouseLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return magneticRef;
}
