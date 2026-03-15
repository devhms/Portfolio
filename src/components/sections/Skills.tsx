'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { SkillCard } from './SkillCard';
import { Skill } from '@/types';

const SKILLS_DATA: Skill[] = [
  {
    name: 'React / Next.js',
    level: 'Expert',
    percentage: 95,
    color: 'accent',
    tags: ['R19', 'RSC', 'Zustand'],
  },
  {
    name: 'TypeScript',
    level: 'Expert',
    percentage: 92,
    color: 'accent',
    tags: ['Strict', 'Generics', 'Zod'],
  },
  {
    name: 'Python / AI',
    level: 'Advanced',
    percentage: 82,
    color: 'green',
    tags: ['LangChain', 'FastAPI', 'PyTorch'],
  },
  {
    name: 'Three.js / WebGL',
    level: 'Advanced',
    percentage: 78,
    color: 'green',
    tags: ['R3F', 'GLSL', 'Draco'],
  },
  {
    name: 'Node.js / DevOps',
    level: 'Advanced',
    percentage: 80,
    color: 'green',
    tags: ['Docker', 'CI/CD', 'Linux'],
  },
  {
    name: 'Algorithms / DSA',
    level: 'Proficient',
    percentage: 72,
    color: 'amber',
    tags: ['C++', 'Competitive', 'OOP'],
  },
];

export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      // Card entry animation
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

      // Skill bar fill animation
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
