'use client';

import { useDebugStore } from '@/store/debug.store';
import { useCursorStore } from '@/store/cursor.store';

// useFrame and useRef imports removed — were present after the export (orphaned, unused)

export function DebugPanel() {
  const { isDebug, fps } = useDebugStore();
  const cursor = useCursorStore();

  if (!isDebug) return null;

  return (
    <>
      <div className="fixed top-4 right-4 font-mono text-[10px] text-green bg-black/80 px-2 py-1 rounded border border-green/20 z-[10000]">
        FPS: {fps}
      </div>
      <div className="fixed bottom-4 left-4 max-w-xs w-full bg-black/90 p-4 rounded-lg border border-white/10 font-mono text-[10px] text-text-2 z-[10000] max-h-[40vh] overflow-y-auto custom-scrollbar">
        <div className="flex justify-between items-center mb-2">
          <h5 className="text-accent uppercase tracking-widest font-bold">Zustand Inspector</h5>
          <span className="text-[8px] bg-accent/20 text-accent px-1 rounded">LIVE</span>
        </div>
        <pre className="whitespace-pre-wrap">
          {JSON.stringify({
            debug: useDebugStore.getState(),
            cursor: { x: cursor.x, y: cursor.y, isHovered: cursor.isHovered, label: cursor.label },
          }, null, 2)}
        </pre>
      </div>
    </>
  );
}
