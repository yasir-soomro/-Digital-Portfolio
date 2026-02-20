import { create } from 'zustand';

export type ThemeType = 'cyan' | 'emerald' | 'purple' | 'ember';
export type ModeType = 'dark' | 'light';
export type SectionType = 'hero' | 'about' | 'skills' | 'projects' | 'experience' | 'contact' | 'ai-lab';

interface ThemeState {
  theme: ThemeType;
  mode: ModeType;
  activeSection: SectionType;
  setTheme: (theme: ThemeType) => void;
  toggleMode: () => void;
  setActiveSection: (section: SectionType) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'cyan',
  mode: 'dark',
  activeSection: 'hero',
  setTheme: (theme) => set({ theme }),
  toggleMode: () => set((state) => ({ mode: state.mode === 'dark' ? 'light' : 'dark' })),
  setActiveSection: (section) => set({ activeSection: section }),
}));

interface ScrollState {
  scrollY: number;
  setScrollY: (y: number) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  scrollY: 0,
  setScrollY: (y) => set({ scrollY: y }),
}));
