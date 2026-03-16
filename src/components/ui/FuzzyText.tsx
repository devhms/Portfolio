'use client';

import { useId } from 'react';
import { cn } from '@/lib/utils';

interface FuzzyTextProps {
  text: string;
  className?: string;
  baseFrequency?: string;
}

export function FuzzyText({ text, className, baseFrequency = '0.02' }: FuzzyTextProps) {
  // useId ensures each instance gets a unique filter ID — prevents SVG filter collision
  const id = useId();
  const filterId = `fuzzy-${id.replace(/:/g, '')}`;

  return (
    <span className={cn('relative inline-block', className)}>
      <span className="relative z-10">{text}</span>
      <svg className="absolute inset-0 -z-10 pointer-events-none opacity-50" width="100%" height="100%">
        <filter id={filterId}>
          <feTurbulence type="fractalNoise" baseFrequency={baseFrequency} numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
        </filter>
        {/* SVG text cannot use Tailwind font classes — use inline style instead */}
        <text
          x="0"
          y="80%"
          filter={`url(#${filterId})`}
          style={{
            fill: 'currentColor',
            fontFamily: 'var(--font-syne), sans-serif',
            fontWeight: 800,
          }}
        >
          {text}
        </text>
      </svg>
    </span>
  );
}
