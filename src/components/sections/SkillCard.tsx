'use client';

import { useRef } from 'react';
import { Skill } from '@/types';
import { cn } from '@/lib/utils';

// Note: internal bar animation is handled by staggered ScrollTrigger in parent Skills.tsx

export function SkillCard({ name, level, percentage, color, tags }: Skill) {
  const barRef = useRef<HTMLDivElement>(null);

  const colorMap = {
    accent: 'bg-accent',
    green: 'bg-green',
    amber: 'bg-amber',
    red: 'bg-red',
  };

  return (
    <div
      data-magnetic
      className="group p-6 bg-surface-1 border border-border-sm rounded-xl hover:bg-surface-2 hover:border-border-md transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-syne font-bold text-text-1">{name}</h3>
          <p className="text-xs text-text-3 font-mono uppercase tracking-widest">{level}</p>
        </div>
        <span className="text-sm font-mono text-text-2 tabular-nums">{percentage}%</span>
      </div>

      <div className="h-1 w-full bg-surface-3 rounded-full mb-6 overflow-hidden">
        <div
          ref={barRef}
          className={cn('h-full rounded-full transition-shadow duration-500 skill-bar-fill', colorMap[color])}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-[10px] bg-white/5 border border-white/5 text-text-2 rounded-md group-hover:border-accent/20 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
