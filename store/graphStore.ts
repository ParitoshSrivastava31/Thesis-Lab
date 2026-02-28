import { create } from 'zustand';
import { ThesisNode, ThesisEdge } from '@/types/graph';

interface GraphStore {
  nodes: ThesisNode[];
  edges: ThesisEdge[];
  selectedNodeId: string | null;
  selectedEdgeId: string | null;
  hoveredNodeId: string | null;

  // Actions
  setNodes: (nodes: ThesisNode[]) => void;
  setEdges: (edges: ThesisEdge[]) => void;
  selectNode: (nodeId: string | null) => void;
  selectEdge: (edgeId: string | null) => void;
  setHoveredNode: (nodeId: string | null) => void;
  updateNodeProbability: (nodeId: string, probability: number) => void;
  updateNodePosition: (nodeId: string, position: [number, number, number]) => void;
  addNode: (node: ThesisNode) => void;
  removeNode: (nodeId: string) => void;
  addEdge: (edge: ThesisEdge) => void;
  removeEdge: (edgeId: string) => void;
}

export const useGraphStore = create<GraphStore>((set) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  selectedEdgeId: null,
  hoveredNodeId: null,

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),

  selectNode: (nodeId) => set({ selectedNodeId: nodeId, selectedEdgeId: null }),
  selectEdge: (edgeId) => set({ selectedEdgeId: edgeId, selectedNodeId: null }),
  setHoveredNode: (nodeId) => set({ hoveredNodeId: nodeId }),

  updateNodeProbability: (nodeId, probability) => set((state) => ({
    nodes: state.nodes.map((node) =>
      node.id === nodeId ? { ...node, probability } : node
    )
  })),

  updateNodePosition: (nodeId, position) => set((state) => ({
    nodes: state.nodes.map((node) =>
      node.id === nodeId ? { ...node, position } : node
    )
  })),

  addNode: (node) => set((state) => ({
    nodes: [...state.nodes, node]
  })),

  removeNode: (nodeId) => set((state) => ({
    nodes: state.nodes.filter((n) => n.id !== nodeId),
    edges: state.edges.filter((e) => e.source !== nodeId && e.target !== nodeId)
  })),

  addEdge: (edge) => set((state) => ({
    edges: [...state.edges, edge]
  })),

  removeEdge: (edgeId) => set((state) => ({
    edges: state.edges.filter((e) => e.id !== edgeId)
  })),
}));
