import { create } from 'zustand';
import { Version, VersionSnapshot } from '@/types/version';
import { useGraphStore } from './graphStore';
import { useSimulationStore } from './simulationStore';
import { nanoid } from 'nanoid';

interface VersionStore {
  versions: Version[];
  viewingVersionId: string | null;

  setVersions: (versions: Version[]) => void;
  setViewingVersionId: (id: string | null) => void;
  addVersion: (version: Version) => void;
}

export const useVersionStore = create<VersionStore>((set) => ({
  versions: [],
  viewingVersionId: null,

  setVersions: (versions) => set({ versions }),
  setViewingVersionId: (id) => set({ viewingVersionId: id }),
  addVersion: (version) => set((state) => ({ versions: [version, ...state.versions] })),
}));

// Controller hooks are kept alongside store for easy actions
export function useVersionController() {
  const { nodes, edges } = useGraphStore();
  const { thesisStrength } = useSimulationStore();
  const { versions, viewingVersionId, addVersion, setViewingVersionId } = useVersionStore();

  const createVersion = (changeNote?: string) => {
    // Current snapshot
    const nodesSnapshot = nodes.map(n => ({ id: n.id, probability: n.probability }));
    const edgesSnapshot = edges.map(e => ({ id: e.id, weight: e.weight }));

    const newVersion: Version = {
      id: nanoid(),
      thesisId: nodes[0]?.thesisId || 'unknown',
      snapshot: {
        nodes: nodesSnapshot,
        edges: edgesSnapshot,
        strengthScore: thesisStrength
      },
      changeNote,
      createdAt: new Date().toISOString(),
    };

    addVersion(newVersion);
  };

  return {
    versions,
    viewingVersionId,
    createVersion,
    setViewingVersionId,
  };
}
