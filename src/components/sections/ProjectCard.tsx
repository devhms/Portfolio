'use client';

import { Project } from '@/types';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';
import { useCursorStore } from '@/store/cursor.store';

export function ProjectCard({ type, year, title, description, stack, link, featured }: Project) {
  const { setHovered, setLabel } = useCursorStore();

  const handleMouseEnter = () => {
    setHovered(true);
    setLabel('View →');
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setLabel('');
  };

  const Wrapper = link ? 'a' : 'div';
  const wrapperProps = link
    ? { href: link, target: '_blank' as const, rel: 'noopener noreferrer' }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      data-cursor-label="View →"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-border-sm transition-all duration-500 hover:bg-surface-2 hover:-translate-y-0.5',
        link && 'cursor-pointer',
        featured
          ? 'col-span-full bg-gradient-to-br from-[#141420] to-[#18182a] p-8 md:p-12 border-accent/20'
          : 'bg-surface-1 p-8'
      )}
    >
      {/* Top Border Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Hover Background Glow */}
      <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent">{type}</span>
            <span className="text-xs text-text-3 font-mono">{year}</span>
          </div>
        </div>

        <h3 className={cn(
          'font-syne font-bold text-text-1 mb-4 leading-tight group-hover:text-accent transition-colors duration-300 text-wrap-balance',
          featured ? 'text-4xl md:text-5xl lg:text-6xl' : 'text-2xl md:text-3xl'
        )}>
          {title}
        </h3>

        <p className={cn(
          'text-text-2 mb-8 font-light leading-relaxed text-wrap-balance',
          featured ? 'text-lg md:text-xl max-w-2xl' : 'text-sm max-w-lg'
        )}>
          {description}
        </p>

        {link && (
          <div
            aria-hidden="true"
            className="absolute bottom-8 right-8 w-12 h-12 rounded-full border border-border-sm flex items-center justify-center bg-surface-1 shadow-2xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500"
          >
            <ArrowUpRight className="w-6 h-6 text-accent" />
          </div>
        )}

        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          {stack.map((item) => (
            <span
              key={item}
              className="px-3 py-1 text-[11px] font-mono bg-white/5 text-text-2 border border-white/5 rounded-full group-hover:border-accent/10 transition-colors"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}
