'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { useDebugStore } from '@/store/debug.store';

export function ThreeDebug() {
  const { setFps, isDebug } = useDebugStore();
  const frames = useRef<number[]>([]);
  const lastTime = useRef(performance.now());

  useFrame(() => {
    if (!isDebug) return;

    const now = performance.now();
    const delta = now - lastTime.current;
    lastTime.current = now;
    
    // Calculate FPS
    const currentFps = 1000 / delta;
    frames.current.push(currentFps);
    
    // Rolling average of 30 frames
    if (frames.current.length > 30) {
      frames.current.shift();
    }
    
    if (frames.current.length === 30) {
      const averageFps = Math.round(
        frames.current.reduce((a, b) => a + b, 0) / frames.current.length
      );
      setFps(averageFps);
    }
  });

  return null;
}
