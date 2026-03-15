'use client';

import { cn } from '@/lib/utils';

interface FuzzyTextProps {
  text: string;
  className?: string;
  baseFrequency?: string;
}

export function FuzzyText({ text, className, baseFrequency = '0.02' }: FuzzyTextProps) {
  return (
    <span className={cn('relative inline-block', className)}>
      <span className="relative z-10">{text}</span>
      <svg className="absolute inset-0 -z-10 pointer-events-none opacity-50" width="100%" height="100%">
        <filter id="fuzzy">
          <feTurbulence type="fractalNoise" baseFrequency={baseFrequency} numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
        </filter>
        <text
          x="0"
          y="80%"
          className={cn('font-syne font-extrabold', className)}
          filter="url(#fuzzy)"
          style={{ fill: 'currentColor' }}
        >
          {text}
        </text>
      </svg>
    </span>
  );
}
