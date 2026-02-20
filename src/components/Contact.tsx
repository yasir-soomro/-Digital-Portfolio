import { motion } from 'motion/react';
import { Mail, Github, Twitter, Linkedin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 md:gap-20">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-6 sm:mb-8">
            Let's build <br />
            <span className="text-[var(--accent)] neon-text">something great</span>.
          </h2>
          <p className="text-lg sm:text-xl text-[var(--text-secondary)] mb-8 sm:mb-12 max-w-md">
            I'm currently available for freelance projects and full-time opportunities. 
            Have an idea? Let's talk.
          </p>

          <div className="space-y-6">
            <a href="mailto:hello@alexrivers.dev" className="flex items-center gap-4 group">
              <div className="p-3 sm:p-4 rounded-2xl glass group-hover:bg-[var(--accent)] group-hover:text-black transition-all">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-xs sm:text-sm opacity-40 uppercase tracking-widest">Email</p>
                <p className="text-base sm:text-lg font-bold">hello@alexrivers.dev</p>
              </div>
            </a>
          </div>

          <div className="flex gap-4 mt-8 sm:mt-12">
            {[Github, Twitter, Linkedin].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ y: -5, scale: 1.1 }}
                className="p-3 sm:p-4 rounded-2xl glass hover:text-[var(--accent)] transition-colors"
              >
                <Icon size={24} />
              </motion.a>
            ))}
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card p-6 sm:p-10 rounded-3xl space-y-6"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest opacity-40">Name</label>
              <input
                type="text"
                className="w-full bg-[var(--bg-secondary)] border border-[var(--glass-border)] rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest opacity-40">Email</label>
              <input
                type="email"
                className="w-full bg-[var(--bg-secondary)] border border-[var(--glass-border)] rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] transition-colors"
                placeholder="john@example.com"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest opacity-40">Message</label>
            <textarea
              rows={5}
              className="w-full bg-[var(--bg-secondary)] border border-[var(--glass-border)] rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] transition-colors resize-none"
              placeholder="Tell me about your project..."
            />
          </div>
          <button className="w-full py-4 rounded-xl bg-[var(--accent)] text-black font-bold text-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_15px_var(--accent-glow)]">
            Send Message <Send size={18} />
          </button>
        </motion.form>
      </div>

      <footer className="mt-20 sm:mt-32 pt-8 sm:pt-12 border-t border-[var(--glass-border)] flex flex-col md:flex-row justify-between items-center gap-6 opacity-40 text-sm text-center md:text-left">
        <p>© 2026 Alex Rivers. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-[var(--text-primary)] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[var(--text-primary)] transition-colors">Terms of Service</a>
        </div>
      </footer>
    </section>
  );
}
