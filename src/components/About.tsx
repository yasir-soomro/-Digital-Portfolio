import { motion } from 'motion/react';
import { SKILLS } from '../lib/data';

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative aspect-square rounded-3xl overflow-hidden glass-card group max-w-md mx-auto md:max-w-none w-full"
      >
        <img
          src="https://picsum.photos/seed/alex/800/800"
          alt="Alex Rivers"
          className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] to-transparent opacity-60" />
        <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
          <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">Alex Rivers</h3>
          <p className="text-sm sm:text-base text-[var(--text-secondary)]">Creative Developer / Designer</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center md:text-left"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 sm:mb-8">
          Crafting <span className="text-[var(--accent)] neon-text">Digital</span> Excellence
        </h2>
        <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
          <p>
            With over 6 years of experience in the digital space, I've had the privilege of 
            working with innovative startups and global brands to build experiences that 
            push the boundaries of what's possible on the web.
          </p>
          <p>
            My approach combines technical precision with artistic vision. I believe that 
            every interaction should be meaningful, every animation intentional, and every 
            pixel purposeful.
          </p>
        </div>

        <div className="mt-8 sm:mt-12 flex flex-wrap justify-center md:justify-start gap-2 sm:gap-3">
          {SKILLS.slice(0, 6).map((skill) => (
            <span
              key={skill.name}
              className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass text-xs sm:text-sm font-medium hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
