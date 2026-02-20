import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Torus, GradientTexture, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ConstellationCoreProps {
  strengthScore: number; // 0-100
}

export function ConstellationCore({ strengthScore }: ConstellationCoreProps) {
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  
  // Color interpolation logic based on score
  // 0-39: Red (#EF4444), 40-69: Amber (#F59E0B), 70-100: Emerald (#10B981)
  const coreColor = strengthScore < 40 ? '#EF4444' : strengthScore < 70 ? '#F59E0B' : '#10B981';

  useFrame((state, delta) => {
    if (coreRef.current) {
        // Pulse scale
        const t = state.clock.getElapsedTime();
        const scale = 1 + Math.sin(t * 2) * 0.05;
        coreRef.current.scale.set(scale, scale, scale);
    }
    if (ringRef.current) {
        // Rotate ring
        ringRef.current.rotation.z += delta * 0.2;
        ringRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Orb */}
      <Sphere ref={coreRef} args={[0.4, 64, 64]}>
        <MeshDistortMaterial 
          color={coreColor}
          emissive={coreColor}
          emissiveIntensity={0.1}
          roughness={0.1}
          metalness={0.2}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          distort={0.4}
          speed={2}
        >
          <GradientTexture attach="map" stops={[0, 1]} colors={['#ffffff', coreColor]} size={128} />
        </MeshDistortMaterial>
      </Sphere>
      
      {/* Stability Ring */}
      <Torus ref={ringRef} args={[0.7, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
         <meshStandardMaterial 
            color="#E5E7EB" 
            emissive="#E5E7EB"
            emissiveIntensity={0.1}
            transparent 
            opacity={0.8} 
         />
      </Torus>
      
      {/* Glow effect (Billboard sprite or similar) - omitted for simplicity, relying on bloom if added later */}
    </group>
  );
}
