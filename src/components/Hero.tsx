import { motion } from 'motion/react';
import { Typewriter } from 'react-simple-typewriter';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full z-10"
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter mb-6 leading-[1.1]">
          Hi, I'm <span className="text-[var(--accent)] neon-text block sm:inline">Alex Rivers</span>
          <br className="hidden sm:block" />
          <span className="text-2xl sm:text-3xl md:text-5xl text-[var(--text-secondary)] mt-4 block h-[60px] sm:h-auto">
            <Typewriter
              words={[
                'I craft digital experiences.',
                'I build the future of web.',
                'I design 3D interfaces.',
                'I engineer performance.'
              ]}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
          Award-winning Creative Developer specializing in high-end web applications, 
          immersive 3D environments, and cutting-edge digital products.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto px-4 sm:px-0">
          <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[var(--accent)] text-black font-bold text-lg hover:scale-105 transition-all neon-border shadow-[0_0_20px_var(--accent-glow)] active:scale-95">
            View My Work
          </button>
          <button className="w-full sm:w-auto px-8 py-4 rounded-xl glass font-bold text-lg hover:bg-[var(--glass-border)] transition-all active:scale-95">
            Get In Touch
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] opacity-40">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown size={20} className="opacity-40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
