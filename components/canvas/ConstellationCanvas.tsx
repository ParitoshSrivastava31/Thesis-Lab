import { Canvas } from '@react-three/fiber';
import { Suspense, useMemo } from 'react';
import { useGraphStore } from '@/store/graphStore';
import { useUIStore } from '@/store/uiStore';
import { NodeMesh } from './NodeMesh';
import { EdgeLine } from './EdgeLine';
import { ParticleField } from './ParticleField';
import { ConstellationCore } from './ConstellationCore';
import { CameraController } from './CameraController';

export function ConstellationCanvas() {
  const { nodes, edges, selectedNodeId, hoveredNodeId, selectNode, setHoveredNode } = useGraphStore();
  const { isSensitivityMode } = useUIStore();
  
  // Calculate average score - simpler proxy for now since scoring engine calculates it
  // We should ideally pass this as a prop or get from simulationStore
  const derivedScore = useMemo(() => {
     if (nodes.length === 0) return 0;
     const sum = nodes.reduce((acc, n) => acc + n.probability, 0);
     return Math.round(sum / nodes.length);
  }, [nodes]);

  return (
    <div className="w-full h-full bg-bg-void relative overflow-hidden">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 45 }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
            {/* Lighting */}
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4B7BFF" />
            
            {/* Environment */}
            <ParticleField />
            
            {/* Core */}
            <ConstellationCore strengthScore={derivedScore} />
            
            {/* Nodes */}
            {nodes.map(node => (
                <NodeMesh 
                    key={node.id} 
                    node={node} 
                    isSelected={selectedNodeId === node.id}
                    isHovered={hoveredNodeId === node.id}
                    isSensitivityMode={isSensitivityMode}
                    onSelect={selectNode}
                    onHover={setHoveredNode}
                />
            ))}
            
            {/* Edges */}
            {edges.map(edge => {
                const source = nodes.find(n => n.id === edge.source);
                const target = nodes.find(n => n.id === edge.target);
                if (!source || !target) return null;
                
                return (
                    <EdgeLine 
                        key={edge.id} 
                        edge={edge} 
                        sourceNode={source} 
                        targetNode={target}
                        isSensitivityMode={isSensitivityMode}
                    />
                );
            })}
            
            <CameraController />
            
        </Suspense>
      </Canvas>
      
      {/* UI Overlays (Zoom controls etc) could go here */}
    </div>
  );
}
