import { create } from 'zustand';
import { Scenario, ScenarioSnapshot } from '@/types/scenario';
import { useGraphStore } from './graphStore';
import { useSimulationStore } from './simulationStore';
import { calculateThesisStrength } from '@/lib/simulation/scoring';
import { nanoid } from 'nanoid';

interface ScenarioStore {
  scenarios: Scenario[];
  activeScenarioId: string | null;

  setScenarios: (scenarios: Scenario[]) => void;
  setActiveScenarioId: (id: string | null) => void;
  addScenario: (scenario: Scenario) => void;
  updateScenario: (id: string, updates: Partial<Scenario>) => void;
  removeScenario: (id: string) => void;
}

export const useScenarioStore = create<ScenarioStore>((set) => ({
  scenarios: [],
  activeScenarioId: null,

  setScenarios: (scenarios) => set({ scenarios }),
  setActiveScenarioId: (id) => set({ activeScenarioId: id }),
  addScenario: (scenario) => set((state) => ({ scenarios: [...state.scenarios, scenario] })),
  updateScenario: (id, updates) =>
    set((state) => ({
      scenarios: state.scenarios.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    })),
  removeScenario: (id) =>
    set((state) => ({
      scenarios: state.scenarios.filter((s) => s.id !== id),
      activeScenarioId: state.activeScenarioId === id ? null : state.activeScenarioId,
    })),
}));

// Imports moved to top


export function useScenarioController() {
  const { nodes, edges, setNodes } = useGraphStore();
  const { setThesisStrength } = useSimulationStore();
  const { scenarios, activeScenarioId, addScenario, removeScenario, setActiveScenarioId } = useScenarioStore();

  const createScenario = (name: string, description?: string) => {
    // Current snapshot
    const nodesSnapshot: ScenarioSnapshot = {};
    nodes.forEach(n => {
        nodesSnapshot[n.id] = n.probability;
    });

    const strengthScore = calculateThesisStrength(nodes, edges);

    const newScenario: Scenario = {
      id: nanoid(),
      thesisId: nodes[0]?.thesisId || 'unknown',
      name,
      description,
      isBaseline: false,
      nodesSnapshot,
      strengthScore,
      createdAt: new Date().toISOString(),
    };

    addScenario(newScenario);
    setActiveScenarioId(newScenario.id);
  };

  const loadScenario = (scenarioId: string) => {
    const scenario = scenarios.find(s => s.id === scenarioId);
    if (!scenario) return;

    // Apply snapshot to nodes
    const newNodes = nodes.map(n => {
        const prob = scenario.nodesSnapshot[n.id];
        if (prob !== undefined) {
            return { ...n, probability: prob };
        }
        return n;
    });

    setNodes(newNodes);
    
    // Recalculate score (it should match saved, but just in case)
    const score = calculateThesisStrength(newNodes, edges);
    setThesisStrength(score);
    
    setActiveScenarioId(scenarioId);
  };

  const deleteScenario = (scenarioId: string) => {
    removeScenario(scenarioId);
  };

  return {
    scenarios,
    activeScenarioId,
    createScenario,
    loadScenario,
    deleteScenario
  };
}
