import { ThesisNode, ThesisEdge, ConfidenceLevel } from '@/types/graph';

const CONFIDENCE_WEIGHT: Record<ConfidenceLevel, number> = {
  HIGH: 1.0,
  MEDIUM: 0.8,
  LOW: 0.6,
};

/**
 * Computes overall thesis strength (0–100).
 *
 * Formula:
 * 1. Compute weighted average of all node probabilities
 *    (weight = edge centrality + confidence weight)
 * 2. Apply risk cluster penalty (if >2 risk nodes with P < 50%)
 * 3. Apply confidence volatility penalty
 */
export function calculateThesisStrength(
  nodes: ThesisNode[],
  edges: ThesisEdge[]
): number {
  if (nodes.length === 0) return 0;

  // Step 1: Compute node centrality (how many edges touch each node)
  const centralityMap = new Map<string, number>();
  for (const node of nodes) {
    const edgeCount = edges.filter(
      e => e.source === node.id || e.target === node.id
    ).length;
    centralityMap.set(node.id, Math.max(1, edgeCount));
  }

  // Step 2: Weighted average
  let totalWeight = 0;
  let weightedSum = 0;

  for (const node of nodes) {
    const centrality = centralityMap.get(node.id) ?? 1;
    const confidenceW = CONFIDENCE_WEIGHT[node.confidence];
    const weight = centrality * confidenceW;

    weightedSum += (node.probability / 100) * weight;
    totalWeight += weight;
  }

  // Avoid division by zero
  const baseScore = totalWeight > 0 ? (weightedSum / totalWeight) * 100 : 0;

  // Step 3: Risk cluster penalty
  const riskNodes = nodes.filter(
    n => n.type === 'RISK_FACTOR' && n.probability < 50
  );
  // Penalty: 5 pts for each failing risk node, max 15
  const riskPenalty = Math.min(15, riskNodes.length * 5);

  // Step 4: Confidence volatility penalty (many LOW confidence nodes)
  const lowConfidenceCount = nodes.filter(n => n.confidence === 'LOW').length;
  // Penalty: up to 10 pts if 50% of nodes are low confidence
  const volatilityPenalty = Math.min(10, (lowConfidenceCount / nodes.length) * 20);

  const finalScore = Math.max(0, Math.min(100, 
    baseScore - riskPenalty - volatilityPenalty
  ));

  return Math.round(finalScore * 10) / 10; // round to 1 decimal
}
