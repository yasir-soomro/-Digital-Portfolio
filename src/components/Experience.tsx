import { motion } from 'motion/react';
import { EXPERIENCE } from '../lib/data';

export default function Experience() {
  return (
    <section id="experience" className="py-20 sm:py-32 px-4 sm:px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-12 sm:mb-20 text-center">
        Professional <span className="text-[var(--accent)] neon-text">Journey</span>
      </h2>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-[var(--glass-border)] md:-translate-x-1/2" />

        <div className="space-y-12 sm:space-y-20">
          {EXPERIENCE.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`relative flex flex-col md:flex-row gap-6 md:gap-8 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 top-0 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[var(--accent)] -translate-x-[5px] md:-translate-x-1/2 neon-border z-10 mt-6 md:mt-0" />

              <div className="pl-12 md:pl-0 md:w-1/2">
                <div className={`glass-card p-6 sm:p-8 ${
                  index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'
                }`}>
                  <span className="text-xs font-mono text-[var(--accent)] mb-2 block">
                    {exp.period}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold mb-1">{exp.role}</h3>
                  <h4 className="text-base sm:text-lg text-[var(--text-secondary)] mb-4">{exp.company}</h4>
                  <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
