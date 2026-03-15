'use client';

import { useSpring, animated } from '@react-spring/web';
import { useEffect, useState, useRef } from 'react';

interface StatItemProps {
  value: number;
  label: string;
  suffix?: string;
}

function StatItem({ value, label, suffix = '' }: StatItemProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { number } = useSpring({
    from: { number: 0 },
    to: { number: inView ? value : 0 },
    config: { mass: 1, tension: 20, friction: 10 },
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <div className="text-3xl font-syne font-bold text-text-1">
        <animated.span>{number.to((n) => Math.floor(n))}</animated.span>
        {suffix}
      </div>
      <div className="text-xs text-text-3 uppercase tracking-eyebrow">{label}</div>
    </div>
  );
}

export function StatsRow() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 mt-16 border-t border-border-sm">
      <StatItem value={48} label="Projects" suffix="+" />
      <StatItem value={5} label="Experience" suffix="yr" />
      <StatItem value={4096} label="Git Commits" />
      <StatItem value={10} label="AI Projects" />
    </div>
  );
}
