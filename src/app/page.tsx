import { Hero } from '@/components/sections/Hero';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <Skills />
      <Projects />
      <About />
      <Contact />
      {/* Other sections will be added here */}
    </main>
  );
}
