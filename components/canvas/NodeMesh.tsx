import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';
import { ThesisNode } from '@/types/graph';

interface NodeMeshProps {
  node: ThesisNode;
  isSelected: boolean;
  isHovered: boolean;
  isSensitivityMode: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}

const TYPE_COLORS: Record<ThesisNode['type'], string> = {
  MACRO_FACTOR: '#4B7BFF',      // Blue
  SECTOR_TREND: '#A855F7',      // Purple
  COMPANY_FACTOR: '#22D3EE',    // Cyan
  RISK_FACTOR: '#F43F5E',       // Red
  CATALYST: '#F59E0B',          // Amber
  STRUCTURAL_DRIVER: '#10B981', // Emerald
};

export function NodeMesh({ 
  node, 
  isSelected, 
  isHovered, 
  isSensitivityMode,
  onSelect, 
  onHover 
}: NodeMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Calculate visual properties
  const baseRadius = 0.3 + (node.sensitivityScore / 100) * 0.25;
  const color = TYPE_COLORS[node.type];
  
  // Target values for animation
  const targetScale = isSelected ? 1.3 : isHovered ? 1.15 : 1.0;
  
  // In sensitivity mode, dim if not high impact (simplified logic for now)
  // The guide says "dim all nodes except top 3 sensitivityRanking nodes"
  // We'll trust the parent to pass down a simplified "isDimmed" prop eventually, 
  // but for now let's just use sensitivityScore threshold if mode is active
  const isDimmed = isSensitivityMode && node.sensitivityScore < 50; 
  const targetOpacity = isDimmed ? 0.2 : 1.0;
  const targetEmissiveIntensity = (node.probability / 100) * (isDimmed ? 0.2 : 1.0) + (isSelected ? 0.5 : 0);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Smoothly interpolate scale
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 10);
    
    // Animate material properties if possible
    // (Note: mutating material uniforms/props in useFrame is standard Three.js)
    const material = meshRef.current.material as THREE.MeshStandardMaterial;
    if (material) {
        material.emissiveIntensity = THREE.MathUtils.lerp(material.emissiveIntensity, targetEmissiveIntensity, delta * 5);
        material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, delta * 5);
        
        // Pulse effect if hovered
        if (isHovered) {
             // subtle pulse
        }
    }
  });

  return (
    <group position={node.position}>
      <Sphere 
        ref={meshRef}
        args={[baseRadius, 32, 32]}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(node.id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(node.id);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          onHover(null);
          document.body.style.cursor = 'auto';
        }}
      >
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={node.probability / 100}
          roughness={0.4}
          metalness={0.6}
          transparent
          opacity={1}
        />
      </Sphere>
      
      {/* Node Label - simplified for clarity */}
      {(isHovered || isSelected) && (
        <Html position={[0, baseRadius + 0.2, 0]} center pointerEvents="none">
          <div className="bg-bg-elevated/90 backdrop-blur px-2 py-1 rounded border border-bg-border text-xs text-text-primary whitespace-nowrap z-50 pointer-events-none select-none">
            {node.title} <span className="text-text-tertiary ml-1">{node.probability}%</span>
          </div>
        </Html>
      )}
    </group>
  );
}
