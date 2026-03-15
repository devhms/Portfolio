'use client';

import { useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { useDebugMode } from '@/hooks/useDebugMode';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { DebugPanel } from '@/components/ui/DebugPanel';
import { useCursorStore } from '@/store/cursor.store';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  useDebugMode();
  const { setHovered, setLabel } = useCursorStore();

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-magnetic]') as HTMLElement;
      if (target) {
        const { clientX, clientY } = e;
        const { width, height, left, top } = target.getBoundingClientRect();
        const ox = clientX - (left + width / 2);
        const oy = clientY - (top + height / 2);

        gsap.to(target, {
          x: ox * 0.35,
          y: oy * 0.35,
          duration: 0.6,
          ease: 'power3.out',
        });
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const magnetTarget = (e.target as HTMLElement).closest('[data-magnetic]');
      if (magnetTarget) {
        setHovered(true);
      }

      const labelTarget = (e.target as HTMLElement).closest('[data-cursor-label]') as HTMLElement;
      if (labelTarget) {
        setHovered(true);
        setLabel(labelTarget.getAttribute('data-cursor-label') || '');
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const magnetTarget = (e.target as HTMLElement).closest('[data-magnetic]');
      if (magnetTarget) {
        setHovered(false);
        gsap.to(magnetTarget, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: 'elastic.out(1, 0.4)',
        });
      }

      const labelTarget = (e.target as HTMLElement).closest('[data-cursor-label]');
      if (labelTarget) {
        setHovered(false);
        setLabel('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [setHovered, setLabel]);

  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <DebugPanel />
      {children}
    </>
  );
}
