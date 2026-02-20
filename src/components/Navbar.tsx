import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useThemeStore, ThemeType } from '../store';
import { Sun, Moon, Zap, Flame, Monitor, Lightbulb, Menu, X, User, Cpu, Briefcase, TrendingUp, Mail, Brain } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const themes: { id: ThemeType; icon: any; color: string }[] = [
  { id: 'cyan', icon: Zap, color: 'bg-cyan-primary' },
  { id: 'emerald', icon: Sun, color: 'bg-emerald-primary' },
  { id: 'purple', icon: Moon, color: 'bg-purple-primary' },
  { id: 'ember', icon: Flame, color: 'bg-ember-primary' },
];

const navItems = [
  { name: 'About', icon: User },
  { name: 'Skills', icon: Cpu },
  { name: 'AI Lab', icon: Brain },
  { name: 'Projects', icon: Briefcase },
  { name: 'Experience', icon: TrendingUp },
  { name: 'Contact', icon: Mail },
];

export default function Navbar() {
  const { theme, setTheme, mode, toggleMode } = useThemeStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 w-full z-50 px-6 py-4 transition-all duration-300",
          isScrolled ? "glass border-b border-[var(--glass-border)] py-3" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.a
            href="#"
            className="text-2xl font-display font-bold tracking-tighter relative z-50 text-[var(--text-primary)]"
            whileHover={{ scale: 1.05 }}
          >
            ALEX<span className="text-[var(--accent)]">.</span>RIVERS
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6 text-sm font-medium opacity-80 text-[var(--text-primary)]">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={`#${item.name.toLowerCase().replace(' ', '-')}`}
                  className="hover:text-[var(--accent)] hover:opacity-100 transition-all relative group flex items-center gap-2"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--accent)] transition-all group-hover:w-full" />
                </a>
              ))}
            </div>

            <div className="h-6 w-[1px] bg-[var(--text-primary)] opacity-20" />

            <div className="flex items-center gap-4">
              {/* Theme Switcher */}
              <div className="flex items-center gap-1 p-1 glass rounded-full">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={cn(
                      "relative p-2 rounded-full transition-all duration-300",
                      theme === t.id ? (mode === 'light' ? "text-white" : "text-black") : "text-[var(--text-primary)] opacity-50 hover:opacity-100"
                    )}
                  >
                    {theme === t.id && (
                      <motion.div
                        layoutId="theme-pill"
                        className={cn("absolute inset-0 rounded-full", t.color)}
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <t.icon size={14} className="relative z-10" />
                  </button>
                ))}
              </div>

              {/* Mode Toggle */}
              <button
                onClick={toggleMode}
                className="p-2.5 rounded-full glass hover:bg-[var(--accent)] hover:text-black transition-all text-[var(--text-primary)]"
              >
                {mode === 'dark' ? <Lightbulb size={18} /> : <Monitor size={18} />}
              </button>
            </div>

            <button className="px-6 py-2 rounded-full bg-[var(--accent)] text-black font-bold text-sm hover:scale-105 transition-transform active:scale-95 shadow-[0_0_20px_var(--accent-glow)]">
              HIRE ME
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden relative z-50 p-2 glass rounded-full text-[var(--text-primary)]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-[var(--bg-primary)]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden overflow-y-auto py-20"
          >
            <div className="w-full max-w-sm px-6 flex flex-col gap-4">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={`#${item.name.toLowerCase().replace(' ', '-')}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="glass-card p-4 flex items-center gap-4 group active:scale-95 transition-transform relative overflow-hidden"
                >
                  <motion.div
                    className="p-3 rounded-xl bg-[var(--bg-secondary)] text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black transition-colors relative z-10 shadow-sm"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <item.icon size={24} />
                  </motion.div>
                  <span className="text-2xl font-display font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors relative z-10">
                    {item.name}
                  </span>
                  
                  {/* Hover Background Layer */}
                  <motion.div
                    className="absolute inset-0 bg-[var(--accent)] opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                  />
                  <motion.div
                    className="absolute -right-4 -bottom-4 text-[var(--accent)] opacity-0 group-hover:opacity-10 transition-all duration-300 group-hover:scale-150 group-hover:-rotate-12"
                  >
                    <item.icon size={64} />
                  </motion.div>
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col items-center gap-6 mt-4 w-full max-w-sm px-6"
            >
              <div className="flex items-center justify-between w-full glass-card p-4">
                 <span className="text-sm font-medium text-[var(--text-secondary)]">Theme</span>
                 <div className="flex items-center gap-2">
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id)}
                      className={cn(
                        "relative p-3 rounded-full transition-all",
                        theme === t.id ? (mode === 'light' ? "text-white" : "text-black") : "text-[var(--text-primary)] opacity-50"
                      )}
                    >
                      {theme === t.id && (
                        <motion.div
                          layoutId="theme-pill-mobile"
                          className={cn("absolute inset-0 rounded-full", t.color)}
                        />
                      )}
                      <t.icon size={20} className="relative z-10" />
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between w-full glass-card p-4">
                <span className="text-sm font-medium text-[var(--text-secondary)]">Mode</span>
                <button
                  onClick={toggleMode}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--accent)] hover:text-black transition-all"
                >
                  {mode === 'dark' ? (
                    <>
                      <Lightbulb size={20} /> Dark
                    </>
                  ) : (
                    <>
                      <Monitor size={20} /> Light
                    </>
                  )}
                </button>
              </div>

              <button className="w-full py-4 rounded-xl bg-[var(--accent)] text-black font-bold text-lg shadow-[0_0_20px_var(--accent-glow)] active:scale-95 transition-transform">
                HIRE ME
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
