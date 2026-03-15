import { create } from 'zustand';
import { DebugState } from '@/types';

export const useDebugStore = create<DebugState>((set) => ({
  isDebug: false,
  fps: 0,
  setFps: (fps) => set({ fps }),
  toggleDebug: () => set((state) => ({ isDebug: !state.isDebug })),
  setDebug: (isDebug) => set({ isDebug }),
}));
