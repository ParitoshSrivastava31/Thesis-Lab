import { Canvas } from '@react-three/fiber';
import { Suspense, useMemo } from 'react';
import { useGraphStore } from '@/store/graphStore';
import { useUIStore } from '@/store/uiStore';
import { useVersionStore } from '@/store/versionStore';
import { NodeMesh } from './NodeMesh';
import { EdgeLine } from './EdgeLine';
import { ConstellationCore } from './ConstellationCore';
import { CameraController } from './CameraController';

export function ConstellationCanvas() {
  const { nodes, edges, selectedNodeId, hoveredNodeId, selectNode, setHoveredNode } = useGraphStore();
  const { isSensitivityMode } = useUIStore();
  const { viewingVersionId, versions } = useVersionStore();

  const previewNodesSnapshot = useMemo(() => {
    if (!viewingVersionId) return null;
    const version = versions.find(v => v.id === viewingVersionId);
    if (!version) return null;
    const snapshot: Record<string, number> = {};
    version.snapshot.nodes.forEach(n => {
        snapshot[n.id] = n.probability;
    });
    return snapshot;
  }, [viewingVersionId, versions]);
  
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
            {/* Lighting - Clean & Bright */}
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 10, 5]} intensity={0.8} color="#FFFFFF" />
            <directionalLight position={[-5, -10, -5]} intensity={0.3} color="#F3F4F6" />
            
            {/* Core */}
            <ConstellationCore strengthScore={derivedScore} />
            
            {/* Nodes */}
            {nodes.map(node => {
                const prevProb = previewNodesSnapshot ? previewNodesSnapshot[node.id] : undefined;
                return (
                    <NodeMesh 
                        key={node.id} 
                        node={node} 
                        isSelected={selectedNodeId === node.id}
                        isHovered={hoveredNodeId === node.id}
                        isSensitivityMode={isSensitivityMode}
                        previousProbability={prevProb}
                        onSelect={selectNode}
                        onHover={setHoveredNode}
                    />
                );
            })}
            
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
