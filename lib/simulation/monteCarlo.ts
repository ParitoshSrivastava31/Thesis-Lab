import { ThesisNode, ThesisEdge, ConfidenceLevel } from '@/types/graph';
import { calculateThesisStrength } from './scoring';

const CONFIDENCE_SIGMA: Record<ConfidenceLevel, number> = {
  LOW: 15,     // High variance (std dev = 15%)
  MEDIUM: 8,   // Moderate variance (std dev = 8%)
  HIGH: 3,     // Low variance (std dev = 3%)
};

// Box-Muller transform for Gaussian noise
function gaussianNoise(mean: number, stdDev: number): number {
  const u1 = Math.random();
  const u2 = Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  return mean + z * stdDev;
}

export interface MonteCarloResult {
  scores: number[];
  p10: number; // 10th percentile (bear case)
  p50: number; // Median (base case)
  p90: number; // 90th percentile (bull case)
}

/**
 * Runs N Monte Carlo iterations.
 * For each iteration, it perturbs every node's probability based on its confidence level using Gaussian noise.
 * Then it recalculates the thesis strength.
 */
export function runMonteCarlo(
  nodes: ThesisNode[],
  edges: ThesisEdge[],
  iterations: number = 1000
): MonteCarloResult {
  const scores: number[] = [];

  for (let i = 0; i < iterations; i++) {
    // strict clone isn't needed if we just map a new array of objects with changed probs
    const noisyNodes = nodes.map(node => {
      // Add noise to the current probability
      // We assume the user's set probability is the "mean"
      const sigma = node.volatility !== undefined ? node.volatility : CONFIDENCE_SIGMA[node.confidence];
      const noise = gaussianNoise(0, sigma);
      const newProb = Math.max(0, Math.min(100, node.probability + noise));

      return {
        ...node,
        probability: newProb
      };
    });

    const score = calculateThesisStrength(noisyNodes, edges);
    scores.push(score);
  }

  // Sort scores to find percentiles
  scores.sort((a, b) => a - b);

  return {
    scores,
    p10: scores[Math.floor(iterations * 0.1)],
    p50: scores[Math.floor(iterations * 0.5)],
    p90: scores[Math.floor(iterations * 0.9)],
  };
}
