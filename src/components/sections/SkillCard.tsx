'use client';

import { useRef } from 'react';
import { Skill } from '@/types';
import { cn } from '@/lib/utils';

// Note: internal bar animation is handled by staggered ScrollTrigger in parent Skills.tsx

export function SkillCard({ name, level, info, color, tags }: Skill) {
  // colorMap used for border accent on hover
  const colorMap = {
    accent: 'group-hover:border-accent/40',
    green: 'group-hover:border-green/40',
    amber: 'group-hover:border-amber/40',
    red: 'group-hover:border-red/40',
  };

  return (
    <div
      data-magnetic
      className={cn(
        'group p-6 bg-surface-1 border border-border-sm rounded-xl hover:bg-surface-2 transition-all duration-300',
        colorMap[color]
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-syne font-bold text-text-1 group-hover:text-accent transition-colors">{name}</h3>
          <p className="text-[10px] text-text-3 font-mono uppercase tracking-widest">{level}</p>
        </div>
      </div>

      <p className="text-sm text-text-2 font-light leading-relaxed mb-6">
        {info}
      </p>

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
