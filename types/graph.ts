// Node types
export type NodeType =
  | 'MACRO_FACTOR'
  | 'SECTOR_TREND'
  | 'COMPANY_FACTOR'
  | 'RISK_FACTOR'
  | 'CATALYST'
  | 'STRUCTURAL_DRIVER';

export type ConfidenceLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type TimeRelevance = 'SHORT' | 'MEDIUM' | 'LONG';

export interface ThesisNode {
  id: string;
  thesisId: string;
  title: string;
  description?: string;
  type: NodeType;
  probability: number;
  confidence: ConfidenceLevel;
  timeRelevance: TimeRelevance;
  sensitivityScore: number;
  position: [number, number, number];
  volatility?: number; // Standard deviation for Monte Carlo
}

export type EdgeStrength = 'WEAK' | 'MODERATE' | 'STRONG' | 'CRITICAL';
export type DependencyType = 'CAUSAL' | 'CORRELATED' | 'CONDITIONAL';

export interface ThesisEdge {
  id: string;
  thesisId: string;
  source: string;
  target: string;
  weight: number;
  strength: EdgeStrength;
  dependencyType: DependencyType;
  decayFactor?: number; // Ripple signal loss factor 
  multiplier?: number; // Effect elasticity/amplification
}
