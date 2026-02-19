import { ThesisNode, ThesisEdge } from '@/types/graph';
import { calculateThesisStrength } from './scoring';
import { runPropagation } from './propagation';

/**
 * For each node, measure its impact on thesis strength by
 * running a "what if P = 0?" simulation and measuring score delta.
 * Returns nodes sorted by impact, highest first.
 */
export function runSensitivityAnalysis(
  nodes: ThesisNode[],
  edges: ThesisEdge[]
): Array<{ nodeId: string; impactScore: number; impactPercent: number }> {
  // Baseline score
  const baseScore = calculateThesisStrength(nodes, edges);
  if (baseScore === 0) return [];

  const results = [];

  for (const node of nodes) {
    // 1. Simulate this node crashing to 0% probability
    // We start by creating a hypothetical node state where this node is 0
    const originalProb = node.probability;
    
    // We need to run propagation for this change
    // Note: runPropagation returns a Map of *changed* nodes. 
    const updates = runPropagation(nodes, edges, node.id, originalProb, 0);
    
    // Create the full hypothetial node list
    const modifiedNodes = nodes.map(n => {
        if (n.id === node.id) return { ...n, probability: 0 };
        if (updates.has(n.id)) return { ...n, probability: updates.get(n.id)! };
        return n;
    });

    // 2. Calculate new score
    const stressScore = calculateThesisStrength(modifiedNodes, edges);
    const impact = baseScore - stressScore;

    results.push({
      nodeId: node.id,
      impactScore: impact,
      impactPercent: (impact / baseScore) * 100
    });
  }

  // Sort by highest impact
  return results.sort((a, b) => b.impactScore - a.impactScore);
}
