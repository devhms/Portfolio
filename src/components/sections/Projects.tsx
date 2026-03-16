'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { ProjectCard } from './ProjectCard';
import { Project } from '@/types';

const PROJECTS_DATA: Project[] = [
  {
    id: 'p1',
    type: 'AI × Full-Stack',
    year: '2025',
    title: 'AI-Powered Analytics Dashboard',
    description: 'Real-time platform with NL querying, LangChain agents, 10k+ DAU and automated predictive insights.',
    stack: ['React', 'LangChain', 'FastAPI', 'PostgreSQL', 'Docker'],
    featured: true,
  },
  {
    id: 'p2',
    type: 'Frontend',
    year: '2024',
    title: '3D Product Configurator',
    description: 'High-performance WebGL configurator allowing users to customize complex 3D assets in real-time with physics-based materials and instant AR preview.',
    stack: ['Three.js', 'R3F', 'GLSL', 'React'],
    featured: false,
  },
  {
    id: 'p3',
    type: 'Full-Stack',
    year: '2024',
    title: 'Real-time Collaboration Suite',
    description: 'A distributed document editor supporting simultaneous multi-user editing with conflict-free data sync and live cursor presence.',
    stack: ['Next.js', 'Yjs', 'WebSockets', 'CRDTs'],
    featured: false,
  },
];

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      gsap.from('.project-card', {
        opacity: 0,
        y: 60,
        rotateX: -15,
        stagger: 0.15,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          once: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={containerRef} className="py-24 px-6 bg-bg overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col gap-2 mb-12">
          <span className="eyebrow">Portfolio</span>
          <h2 className="text-3xl md:text-4xl text-text-1">Featured Work</h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {PROJECTS_DATA.map((project) => (
            <div key={project.id} className="project-card perspective-1000">
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
