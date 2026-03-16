'use client';

import { useEffect } from 'react';

export function ConsoleBreadcrumb() {
  useEffect(() => {
    console.log(
      '%c[Ibrahim Salman — Portfolio]',
      'color:#7B6EF6;font-weight:bold;font-size:14px',
      '\n👤 Software Engineering Student @ UET Taxila',
      '\n🔍 Hint: try #debug for dev mode',
      '\n⚡ Stack: Next.js 14 · Three.js · GSAP · TypeScript'
    );
  }, []);

  return null;
}
