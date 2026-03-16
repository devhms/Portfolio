'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useCursorStore } from '@/store/cursor.store';
import { cn } from '@/lib/utils';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const { isHovered, label } = useCursorStore();
  const [mounted, setMounted] = useState(false);
  const mousePos = useRef({ x: -100, y: -100 }); // Start off-screen, not at (0,0)
  const cursorPos = useRef({ x: -100, y: -100 });
  const hasMovedRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!hasMovedRef.current) {
        // Snap to real position immediately on first move — no visible flash at (0,0)
        cursorPos.current = { x: e.clientX, y: e.clientY };
        hasMovedRef.current = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      const lerp = 0.12;
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * lerp;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * lerp;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0)`;
      }

      requestAnimationFrame(animate);
    };

    const rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!mounted || (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)) {
    return null;
  }

  return createPortal(
    <div
      ref={cursorRef}
      className={cn(
        'fixed top-0 left-0 w-2.5 h-2.5 bg-accent rounded-full pointer-events-none z-[9999] mix-blend-difference',
        // Scale via transform — listed in the transition so it animates smoothly
        isHovered ? 'scale-[4]' : 'scale-100'
      )}
      style={{
        willChange: 'transform',
        transition: 'transform 0.3s ease, background-color 0.3s',
      }}
    >
      {label && (
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-mono text-white whitespace-nowrap uppercase tracking-tighter transition-opacity duration-300">
          {label}
        </span>
      )}
    </div>,
    document.body
  );
}
