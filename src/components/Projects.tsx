import { motion } from 'motion/react';
import { PROJECTS } from '../lib/data';
import { ExternalLink, Github } from 'lucide-react';

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-7xl mx-auto">
        {PROJECTS.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative rounded-3xl overflow-hidden glass-card flex flex-col"
          >
            <div className="aspect-video overflow-hidden relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            </div>
            
            <div className="p-6 sm:p-8 flex-1 flex flex-col">
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

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-[var(--accent)] opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
