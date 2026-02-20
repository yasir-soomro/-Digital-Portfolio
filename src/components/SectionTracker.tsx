import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useThemeStore, SectionType } from '../store';

export default function SectionTracker({ section, children, className }: { section: SectionType; children: React.ReactNode; className?: string }) {
  const setActiveSection = useThemeStore((state) => state.setActiveSection);
  const { ref, inView } = useInView({
    threshold: 0.5, // Trigger when 50% of the section is visible
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      setActiveSection(section);
    }
  }, [inView, section, setActiveSection]);

  return (
    <div ref={ref} id={section} className={className}>
      {children}
    </div>
  );
}
