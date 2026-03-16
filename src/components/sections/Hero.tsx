'use client';

import dynamic from 'next/dynamic';
import { useRef, useEffect, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { AvailabilityBadge } from '@/components/ui/AvailabilityBadge';
import { StatsRow } from '@/components/sections/StatsRow';
import { MagnetLines } from '@/components/ui/MagnetLines';
import { CanvasSkeleton } from '@/components/three/CanvasSkeleton';

// FuzzyText import removed — component was imported but never used in JSX

const Scene = dynamic(() => import('@/components/three/Scene').then((mod) => mod.Scene), {
  ssr: false,
  loading: () => <CanvasSkeleton />,
});

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subTitleRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobileCheck = window.matchMedia('(pointer: coarse)').matches;
    setIsMobile(mobileCheck);

    if (mobileCheck) return;

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 60,
        rotateX: -40,
        duration: 1.2,
        ease: 'power4.out',
      });

      gsap.from(subTitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
      });

      if (canvasWrapperRef.current) {
        gsap.to(canvasWrapperRef.current, {
          scale: 0.7,
          opacity: 0.5,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[100svh] flex flex-col justify-center px-6 py-24 overflow-hidden hero">
      <div className="absolute inset-0 -z-10">
        <MagnetLines rows={12} columns={12} color="rgba(123, 110, 246, 0.08)" className="opacity-50" />
      </div>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
        <div className="flex flex-col gap-6 z-10">
          <AvailabilityBadge />

          <div ref={titleRef} className="perspective-1000">
            <h1 className="text-display-h1 leading-[1.1] text-text-1 text-wrap-balance">
              I build <span className="text-accent underline-effect">fast</span>, beautiful <br />
              <span className="text-accent">web experiences.</span>
            </h1>
          </div>

          <p ref={subTitleRef} className="text-lg md:text-xl text-text-2 max-w-[560px] font-light leading-relaxed text-wrap-balance">
            Software Engineering student at UET Taxila. Building web apps, AI tools, and creative digital experiences with React, Python, and Three.js.
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            {/* Scroll to projects section */}
            <a
              href="#projects"
              data-magnetic
              className="px-8 py-4 bg-accent text-white font-medium rounded-full hover:bg-accent-2 transition-colors duration-300"
            >
              View my work
            </a>
            {/* Link to actual CV — update href when CV PDF is uploaded to /public/cv.pdf */}
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              className="px-8 py-4 bg-transparent border border-border-md text-text-1 font-medium rounded-full hover:bg-surface-1 transition-colors duration-300"
            >
              Download CV
            </a>
          </div>

          <StatsRow />
        </div>

        <div ref={canvasWrapperRef} className="hidden md:block h-[500px] lg:h-[700px] w-full relative">
          {isMobile ? <CanvasSkeleton /> : <Scene />}
        </div>
      </div>
    </section>
  );
}
