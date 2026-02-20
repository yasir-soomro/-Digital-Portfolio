import { useEffect } from 'react';
import Lenis from 'lenis';
import { useThemeStore } from './store';
import ThreeBackground from './components/ThreeBackground';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import AILab from './components/AILab';
import SectionTracker from './components/SectionTracker';

export default function App() {
  const { theme, mode } = useThemeStore();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div data-theme={theme} data-mode={mode} className="relative min-h-screen selection:bg-[var(--accent)] selection:text-black">
      <ThreeBackground />
      <CustomCursor />
      <Navbar />
      
      <main>
        <SectionTracker section="hero">
          <Hero />
        </SectionTracker>
        
        <SectionTracker section="about">
          <About />
        </SectionTracker>
        
        <SectionTracker section="skills">
          <Skills />
        </SectionTracker>

        <SectionTracker section="ai-lab">
          <AILab />
        </SectionTracker>
        
        <SectionTracker section="projects">
          <Projects />
        </SectionTracker>
        
        <SectionTracker section="experience">
          <Experience />
        </SectionTracker>
        
        <SectionTracker section="contact">
          <Contact />
        </SectionTracker>
      </main>
    </div>
  );
}
