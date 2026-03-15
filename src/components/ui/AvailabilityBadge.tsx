import { cn } from '@/lib/utils';

export function AvailabilityBadge() {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-1 border border-border-sm">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green"></span>
      </span>
      <span className="text-[11px] font-medium text-text-2 uppercase tracking-eyebrow">
        Available for work
      </span>
    </div>
  );
}
