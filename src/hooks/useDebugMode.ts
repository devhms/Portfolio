'use client';

import { useEffect } from 'react';
import { useDebugStore } from '@/store/debug.store';

export function useDebugMode() {
  const { setDebug } = useDebugStore();

  useEffect(() => {
    const handleHashChange = () => {
      setDebug(window.location.hash === '#debug');
    };

    handleHashChange(); // Check on mount
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [setDebug]);
}
