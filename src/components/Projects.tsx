import { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react';
import { PROJECTS } from '../lib/data';
import { ExternalLink, Github } from 'lucide-react';

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

function ProjectCard({ project, index }: { project: typeof PROJECTS[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="group relative rounded-3xl glass-card flex flex-col h-full"
    >
      <div 
        style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }} 
        className="absolute inset-4 sm:inset-6 rounded-2xl shadow-lg"
      />
      
      <div 
        className="aspect-video overflow-hidden relative rounded-t-3xl"
        style={{ transform: "translateZ(50px)" }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
      </div>
      
      <div 
        className="p-6 sm:p-8 flex-1 flex flex-col bg-[var(--glass-bg)] rounded-b-3xl backdrop-blur-xl"
        style={{ transform: "translateZ(20px)" }}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl sm:text-2xl font-bold group-hover:text-[var(--accent)] transition-colors">
            {project.title}
          </h3>
          <div className="flex gap-4">
            <Github size={20} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer" />
            <ExternalLink size={20} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer" />
          </div>
        </div>
        
        <p className="text-[var(--text-secondary)] mb-6 line-clamp-3 text-sm sm:text-base flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag) => (
            <span key={tag} className="text-[10px] sm:text-xs font-mono px-2 py-1 sm:px-3 sm:py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--glass-border)]">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Neon Border Glow Animation */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[var(--accent)] transition-colors duration-300 pointer-events-none" />
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-[0_0_30px_-5px_var(--accent-glow)]" />
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-20 sm:py-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto mb-12 sm:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-4">
            Selected <span className="text-[var(--accent)] neon-text">Work</span>
          </h2>
          <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-xl">
            A collection of projects that showcase my passion for design, 
            technology, and user experience.
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="h-[1px] w-16 sm:w-24 bg-[var(--accent)] opacity-30 hidden md:block" />
          <span className="text-xs sm:text-sm uppercase tracking-widest opacity-40">2023 — 2026</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 max-w-7xl mx-auto perspective-1000">
        {PROJECTS.map((project, index) => (
          <div key={project.id} className="h-full">
            <ProjectCard project={project} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}
