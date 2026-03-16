'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { Zap, Bot, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
 
const ICON_WRAPPER_CLASSES = "w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center";

interface RoleCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay?: number;
}

function RoleCard({ icon: Icon, title, description, delay = 0 }: RoleCardProps) {
  return (
    <div data-magnetic className="role-card p-6 bg-surface-1 border border-border-sm rounded-xl hover:border-accent/40 transition-colors duration-300">
      <div className="flex items-center gap-4 mb-3">
        <div className={ICON_WRAPPER_CLASSES}>
          <Icon className="w-5 h-5 text-accent" />
        </div>
        <h4 className="font-syne font-bold text-text-1">{title}</h4>
      </div>
      <p className="text-sm text-text-2 leading-relaxed font-light">{description}</p>
    </div>
  );
}

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      gsap.from('.about-text p', {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-text',
          start: 'top 85%',
        },
      });

      gsap.from('.role-card', {
        opacity: 0,
        x: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.role-cards-container',
          start: 'top 85%',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="py-24 px-6 bg-bg overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="about-text flex flex-col gap-6">
            <span className="eyebrow">Biography</span>
            <h2 className="text-4xl md:text-5xl text-text-1 font-syne font-bold leading-tight text-wrap-balance">
              Building from <span className="text-accent underline decoration-accent/30 underline-offset-8">Taxila</span> to the world.
            </h2>
            <p className="text-lg text-text-2 font-light leading-relaxed">
              I am <span className="text-text-1 font-medium text-accent">Ibrahim Salman</span>, a Senior Frontend Architect and Creative Developer based in Taxila, Pakistan. My journey is defined by a relentless obsession with the "Goldilocks Zone" of engineering—where high-performance code meets museum-grade visual design.
            </p>
            <p className="text-lg text-text-2 font-light leading-relaxed">
              With over half a decade of experience, I specialize in architecting complex React ecosystems and immersive 3D WebGL experiences. I don&apos;t just ship features; I ship precision-engineered digital products that feel as good as they look.
            </p>
          </div>

          <div className="role-cards-container flex flex-col gap-4">
            <RoleCard 
              icon={Zap}
              title="Senior Frontend Architect"
              description="React, TypeScript, performance-first architecture and design system scaling."
            />
            <RoleCard 
              icon={Bot}
              title="Fullstack Engineer"
              description="End-to-end products, robust APIs, AI agent integration and cloud infrastructure."
            />
            <RoleCard 
              icon={Palette}
              title="UI Developer"
              description="Motion design, WebGL/Three.js, and crafting high-fidelity accessible interfaces."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
