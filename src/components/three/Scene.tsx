import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { FloatingModel } from './FloatingModel';
import { Center } from '@react-three/drei';
import { ErrorBoundary } from './ErrorBoundary';
import { ThreeDebug } from './ThreeDebug';
import { CanvasSkeleton } from './CanvasSkeleton';

export function Scene() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <ErrorBoundary fallback={<CanvasSkeleton />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: false, stencil: false, depth: true }}
          dpr={[1, 1.5]}
        >
          <Suspense fallback={null}>
            <ThreeDebug />
            <Center>
              <FloatingModel />
            </Center>
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
