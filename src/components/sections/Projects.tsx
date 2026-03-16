'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { ProjectCard } from './ProjectCard';
import { Project } from '@/types';

const PROJECTS_DATA: Project[] = [
  {
    id: 'p1',
    type: 'Python · Web Scraping',
    year: '2025',
    title: 'Dawn News Scraper',
    description: 'Automated news aggregator using Python and BeautifulSoup that scrapes Dawn.com, parses headlines, categories, and article bodies, and exports structured data for downstream analysis.',
    stack: ['Python', 'BeautifulSoup', 'Requests', 'JSON'],
    link: 'https://github.com/devhms',
    featured: true,
  },
  {
    id: 'p2',
    type: 'Python · Finance',
    year: '2025',
    title: 'B.L.A.S.T. — PSX Data Pipeline',
    description: 'Real-time Pakistan Stock Exchange data pipeline that fetches live quotes and pushes them to Google Sheets for tracking and analysis.',
    stack: ['Python', 'gspread', 'Google Sheets API', 'Requests'],
    link: 'https://github.com/devhms',
    featured: false,
  },
  {
    id: 'p3',
    type: 'React · Next.js',
    year: '2025',
    title: 'This Portfolio',
    description: 'Performance-first personal portfolio built with Next.js 14, Three.js, GSAP scroll animations, and a physics-based magnetic cursor system.',
    stack: ['Next.js', 'Three.js', 'GSAP', 'TypeScript', 'Tailwind'],
    link: 'https://github.com/devhms/Portfolio',
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
