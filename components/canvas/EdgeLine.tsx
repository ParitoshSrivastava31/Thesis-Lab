import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import { ThesisEdge, ThesisNode } from '@/types/graph';

interface EdgeLineProps {
  edge: ThesisEdge;
  sourceNode: ThesisNode;
  targetNode: ThesisNode;
  isSensitivityMode: boolean;
}

const STRENGTH_OPACITY = {
  WEAK: 0.3,
  MODERATE: 0.5,
  STRONG: 0.8,
  CRITICAL: 1.0,
};

// Colors based on source node type
const TYPE_COLORS: Record<ThesisNode['type'], string> = {
  MACRO_FACTOR: '#4B7BFF',
  SECTOR_TREND: '#A855F7',
  COMPANY_FACTOR: '#22D3EE',
  RISK_FACTOR: '#F43F5E',
  CATALYST: '#F59E0B',
  STRUCTURAL_DRIVER: '#10B981',
};

export function EdgeLine({ edge, sourceNode, targetNode, isSensitivityMode }: EdgeLineProps) {
  const lineRef = useRef<any>(null);
  
  const color = TYPE_COLORS[sourceNode.type];
  const baseOpacity = STRENGTH_OPACITY[edge.strength] || 0.5;
  
  // In sensitivity mode, dim edges unless they are critical or connected to high impact nodes
  // Simplified: just dim if global mode is on
  const opacity = isSensitivityMode ? baseOpacity * 0.2 : baseOpacity;

  // Animate specific edges (like critical ones) using dash offset
  useFrame((state, delta) => {
    // Optional: animate pulses
    if (lineRef.current && edge.strength === 'CRITICAL') {
       // lineRef.current.material.dashOffset -= delta * 0.5;
    }
  });

  if (!sourceNode || !targetNode) return null;

  return (
    <Line
      ref={lineRef}
      points={[sourceNode.position, targetNode.position]}
      color={color}
      lineWidth={edge.strength === 'CRITICAL' ? 2 : 1}
      transparent
      opacity={opacity}
      dashed={edge.dependencyType === 'CONDITIONAL' || edge.dependencyType === 'CORRELATED'}
    />
  );
}
