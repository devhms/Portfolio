'use client';

import { useEffect } from 'react';
import { initLenis, destroyLenis } from '@/lib/lenis';

export function SmoothScroll() {
  useEffect(() => {
    initLenis();
    return () => {
      destroyLenis();
    };
  }, []);

  return null;
}
