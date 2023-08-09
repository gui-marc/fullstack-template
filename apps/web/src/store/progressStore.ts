import { create } from 'zustand';

import sleep from '@/utils/sleep';

interface ProgressStore {
  progress: number;
  show: boolean;
  actions: {
    start(): void;
    setProgress(newProgress: number): void;
    complete(): void;
  };
}

export const progressStore = create<ProgressStore>((set) => ({
  progress: 0,
  show: false,
  actions: {
    start: () => set({ progress: 10, show: true }),
    setProgress: (newProgress: number) =>
      set({ progress: Math.min(100, Math.max(0, newProgress)) }),
    complete: async () => {
      set({ progress: 100 });
      await sleep(500);
      set({ show: false });
    },
  },
}));

export const useProgressStore = progressStore;
