import { create } from 'zustand';
import { CursorState } from '@/types';

export const useCursorStore = create<CursorState>((set) => ({
  x: 0,
  y: 0,
  isHovered: false,
  label: '',
  setLabel: (label) => set({ label }),
  setHovered: (isHovered) => set({ isHovered }),
  setPosition: (x, y) => set({ x, y }),
}));
