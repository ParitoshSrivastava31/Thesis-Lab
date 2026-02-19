import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

export function ParticleField({ count = 200 }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    // Random positions in a sphere/box around origin
    positions[i * 3] = (Math.random() - 0.5) * 30; // x
    positions[i * 3 + 1] = (Math.random() - 0.5) * 30; // y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 30; // z
  }

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <group>
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#8891B8"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
    </group>
  );
}
