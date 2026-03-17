export interface Project {
  id: string;
  type: string;
  year: string;
  title: string;
  description: string;
  stack: string[];
  link?: string;
  featured?: boolean;
}

export interface Skill {
  name: string;
  level: 'Expert' | 'Advanced' | 'Proficient';
  info: string; // e.g. "8+ Projects", "2yrs exp"
  color: 'accent' | 'green' | 'amber' | 'red';
  tags: string[];
}

export interface CursorState {
  x: number;
  y: number;
  isHovered: boolean;
  label: string;
  setLabel: (label: string) => void;
  setHovered: (hovered: boolean) => void;
  setPosition: (x: number, y: number) => void;
}

export interface DebugState {
  isDebug: boolean;
  fps: number;
  setFps: (fps: number) => void;
  toggleDebug: () => void;
  setDebug: (isDebug: boolean) => void;
}
