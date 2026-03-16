import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Float, Wireframe } from '@react-three/drei';
import * as THREE from 'three';
import { useDebugStore } from '@/store/debug.store';

export function FloatingModel() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { isDebug } = useDebugStore();

  const matcap = useLoader(THREE.TextureLoader, '/textures/matcap-purple.png');

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.2;
    meshRef.current.rotation.y = Math.cos(time * 0.3) * 0.2;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      {/*
        castShadow / receiveShadow removed: Scene has no lights and uses MeshMatcapMaterial
        which ignores the lighting system entirely. Those props had zero effect.
      */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.4, 4]} />
        <meshMatcapMaterial matcap={matcap} />
        {isDebug && <Wireframe stroke="#3ED9A4" fill="#3ED9A4" thickness={0.02} colorBackfaces={false} />}
      </mesh>
    </Float>
  );
}
