import { ThesisNode, ThesisEdge, DependencyType } from '@/types/graph';

interface GraphStructure {
  nodes: ThesisNode[];
  edges: ThesisEdge[];
}

/**
 * Propagates the effect of changing one node's probability through the graph.
 * Returns a map of nodeId → new probability for all affected nodes.
 */
export function runPropagation(
  nodes: ThesisNode[],
  edges: ThesisEdge[],
  changedNodeId: string,
  originalProbability: number,
  newProbability: number
): Map<string, number> {
  const delta = (newProbability - originalProbability) / 100;
  const updates = new Map<string, number>();
  const visited = new Set<string>();
  
  // BFS from changed node
  const queue: Array<{ nodeId: string; propagatedDelta: number }> = [
    { nodeId: changedNodeId, propagatedDelta: delta }
  ];

  // We need to keep track of accumulating effects to handle multiple paths
  // But for simple "dynamic ripple" propagation, applying deltas sequentially works for visualization
  // For more accuracy, we'd need a topological sort or matrix method, but BFS w/ decay is good for "feel"
  
  // To avoid infinite loops in cyclic graphs (which shouldn't exist in DAGs but might in user models),
  // we use visited set or max depth. Here visited set per "wave" is safer.
  
  // Actually, standard propagation might visit a node multiple times if multiple paths lead to it.
  // A simple visited check prevents loops but might miss multi-path reinforcement.
  // For the MVP visual effect, preventing cycles is more important.
  
  // Let's use a "processed" map to store the LATEST delta for a node to process
  // But queue is better for BFS.
  
  let iterations = 0;
  const MAX_ITERATIONS = 1000; // Safety break

  while (queue.length > 0 && iterations < MAX_ITERATIONS) {
    iterations++;
    const { nodeId, propagatedDelta } = queue.shift()!;
    
    // If we've already processed this node in this chain with a similar delta, skip to avoid loops
    // But we might need to re-process if delta is significant from another path
    // For MVP: Simplest cyclic protection = visited set. 
    // This means we only propagate from each node once per user interaction.
    if (visited.has(nodeId)) continue;
    visited.add(nodeId);

    // Find all outgoing edges from this node
    const outgoingEdges = edges.filter(e => e.source === nodeId);

    for (const edge of outgoingEdges) {
      const targetNode = nodes.find(n => n.id === edge.target);
      if (!targetNode) continue;

      // Calculate propagated impact with decay
      const decayFactor = 0.6; // Each hop loses 40% influence
      const effectMultiplier = getEffectMultiplier(edge.dependencyType);
      
      // Weight is 0-1, so we use it directly
      const edgeImpact = propagatedDelta * edge.weight * decayFactor * effectMultiplier;

      // Get current probability (either from initial state or already updated state)
      const currentProb = updates.get(edge.target) ?? targetNode.probability;
      
      // Calculate new probability, clamped 0-100
      const newProb = Math.max(0, Math.min(100, currentProb + (edgeImpact * 100)));
      
      // Only queue if the change is significant enough to propagate further
      // Threshold: 1% change
      if (Math.abs(newProb - currentProb) > 0.5) {
         updates.set(edge.target, newProb);
         queue.push({
           nodeId: edge.target,
           propagatedDelta: edgeImpact
         });
      }
    }
  }

  return updates;
}

function getEffectMultiplier(type: DependencyType): number {
  switch (type) {
    case 'CAUSAL': return 1.0;
    case 'CORRELATED': return 0.7;
    case 'CONDITIONAL': return 0.5;
    default: return 0.5;
  }
}
