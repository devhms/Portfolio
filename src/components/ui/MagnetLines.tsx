'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface MagnetLinesProps {
  rows?: number;
  columns?: number;
  color?: string;
  className?: string;
}

export function MagnetLines({
  rows = 9,
  columns = 9,
  color = 'rgba(123, 110, 246, 0.1)',
  className,
}: MagnetLinesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  const rafIdRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();

    // Intersection observer — pause RAF when canvas is off-screen
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const draw = () => {
      rafIdRef.current = requestAnimationFrame(draw);
      if (!isVisible) return; // Skip drawing when off-screen

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;

      const cellW = canvas.width / columns;
      const cellH = canvas.height / rows;

      // Default: point lines downward if mouse hasn't entered yet
      const mx = mouseRef.current.x ?? canvas.width / 2;
      const my = mouseRef.current.y ?? canvas.height * 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
          const x = c * cellW + cellW / 2;
          const y = r * cellH + cellH / 2;
          const angle = Math.atan2(my - y, mx - x);
          const length = 15;

          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(angle);
          ctx.beginPath();
          ctx.moveTo(-length, 0);
          ctx.lineTo(length, 0);
          ctx.stroke();
          ctx.restore();
        }
      }
    };

    rafIdRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafIdRef.current);
      observer.disconnect();
    };
  }, [rows, columns, color]);

  return <canvas ref={canvasRef} className={cn('w-full h-full pointer-events-none', className)} />;
}
