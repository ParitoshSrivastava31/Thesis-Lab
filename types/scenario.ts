export interface ScenarioSnapshot {
  [nodeId: string]: number; // probability
}

export interface Scenario {
  id: string;
  thesisId: string;
  name: string;
  description?: string;
  isBaseline: boolean;
  nodesSnapshot: ScenarioSnapshot;
  strengthScore: number;
  createdAt: string;
}
