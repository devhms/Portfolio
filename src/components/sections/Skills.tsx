'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { SkillCard } from './SkillCard';
import { Skill } from '@/types';

const SKILLS_DATA: Skill[] = [
  {
    name: 'Python',
    level: 'Advanced',
    percentage: 75,
    color: 'green',
    tags: ['BeautifulSoup', 'FastAPI', 'LangChain'],
  },
  {
    name: 'React / Next.js',
    level: 'Advanced',
    percentage: 68,
    color: 'accent',
    tags: ['App Router', 'RSC', 'Hooks'],
  },
  {
    name: 'TypeScript',
    level: 'Proficient',
    percentage: 60,
    color: 'accent',
    tags: ['Interfaces', 'Generics', 'Types'],
  },
  {
    name: 'C++ / OOP',
    level: 'Advanced',
    percentage: 72,
    color: 'green',
    tags: ['OOP', 'DSA', 'Algorithms'],
  },
  {
    name: 'Three.js / WebGL',
    level: 'Proficient',
    percentage: 50,
    color: 'amber',
    tags: ['R3F', 'Matcap', 'Drei'],
  },
  {
    name: 'AI / LangChain',
    level: 'Proficient',
    percentage: 55,
    color: 'amber',
    tags: ['Ollama', 'CrewAI', 'OCR'],
  },
];

export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      gsap.from('.skill-card', {
        opacity: 0,
        y: 40,
        stagger: 0.08,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      gsap.from('.skill-bar-fill', {
        width: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={containerRef} className="py-24 px-6 bg-bg overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col gap-2 mb-12">
          <span className="eyebrow">Expertise</span>
          <h2 className="text-3xl md:text-4xl text-text-1 text-wrap-balance">Skills that ship product</h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SKILLS_DATA.map((skill) => (
            <div key={skill.name} className="skill-card">
              <SkillCard {...skill} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
