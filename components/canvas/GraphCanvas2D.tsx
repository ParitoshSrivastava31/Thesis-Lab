import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useGraphStore } from '@/store/graphStore';
import { useMemo } from 'react';

export function GraphCanvas2D() {
  const { nodes, edges, selectNode, selectEdge } = useGraphStore();

  // Map internal model to React Flow model
  const rfNodes: Node[] = useMemo(() => nodes.map(n => ({
    id: n.id,
    position: { x: n.position[0] * 50 + 200, y: n.position[1] * 50 + 200 }, // rough projection
    data: { label: n.title, probability: n.probability },
    type: 'default', // Using default for now, custom later
    style: {
      background: '#0C0E18',
      color: '#F0F2FF',
      border: `1px solid #4B7BFF`,
      borderRadius: '8px',
      width: 150,
      fontSize: '12px'
    }
  })), [nodes]);

  const rfEdges: Edge[] = useMemo(() => edges.map(e => ({
    id: e.id,
    source: e.source,
    target: e.target,
    animated: true,
    style: { stroke: '#454D6D' }
  })), [edges]);

  return (
    <div className="w-full h-full bg-bg-void">
      <ReactFlow
        nodes={rfNodes}
        edges={rfEdges}
        onNodeClick={(_, node) => selectNode(node.id)}
        onEdgeClick={(_, edge) => selectEdge(edge.id)}
        fitView
      >
        <Background color="#1E2235" gap={20} />
        <Controls className="bg-bg-elevated border-bg-border text-text-primary" />
        <MiniMap style={{ background: '#0C0E18' }} nodeColor="#4B7BFF" />
      </ReactFlow>
    </div>
  );
}
