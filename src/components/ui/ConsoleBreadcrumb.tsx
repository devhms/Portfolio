'use client';

import { useEffect } from 'react';

export function ConsoleBreadcrumb() {
  useEffect(() => {
    console.log(
      '%c[PORTFOLIO]',
      'color:#7B6EF6;font-weight:bold;font-size:14px',
      '\n👤 Built by Senior Frontend Architect',
      '\n🔍 Hint: try yoursite.com/#debug',
      '\n⚡ Stack: Next.js 14 · Three.js · GSAP · TypeScript'
    );
  }, []);

  return null;
}
