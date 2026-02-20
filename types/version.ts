export interface VersionSnapshot {
  nodes: { id: string; probability: number }[];
  edges: { id: string; weight: number }[];
  strengthScore: number;
}

export interface Version {
  id: string;
  thesisId: string;
  snapshot: VersionSnapshot;
  changeNote?: string;
  createdAt: string;
}
