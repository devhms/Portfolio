'use client';

import { useEffect } from 'react';
import { lenis } from '@/lib/lenis';

export function SmoothScroll() {
  useEffect(() => {
    // This effect ensures the lenis module is loaded and side effects run
    // lenis is a singleton already configured in lib/lenis.ts
    return () => {
      lenis?.destroy();
    };
  }, []);

  return null;
}
