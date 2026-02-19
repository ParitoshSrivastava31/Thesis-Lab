import { create } from 'zustand';
import { ThesisNode, ThesisEdge } from '@/types/graph';
import { runPropagation } from '@/lib/simulation/propagation';
import { calculateThesisStrength } from '@/lib/simulation/scoring';
import { runSensitivityAnalysis } from '@/lib/simulation/sensitivity';
import { useGraphStore } from './graphStore';

interface SimulationStore {
  thesisStrength: number;
  sensitivityRanking: Array<{ nodeId: string; impactScore: number; impactPercent: number }>;
  monteCarloResult: { scores: number[]; p10: number; p50: number; p90: number } | null;
  isRunning: boolean;
  isMonteCarloRunning: boolean;
  
  // Actions
  setThesisStrength: (score: number) => void;
  setSensitivityRanking: (ranking: Array<{ nodeId: string; impactScore: number; impactPercent: number }>) => void;
  setMonteCarloResult: (result: { scores: number[]; p10: number; p50: number; p90: number } | null) => void;
  setIsMonteCarloRunning: (isRunning: boolean) => void;
  
  // The 'run' actions might physically live here or be helpers that dispatch here.
  // Let's keep state simple.
}

export const useSimulationStore = create<SimulationStore>((set) => ({
  thesisStrength: 0,
  sensitivityRanking: [],
  monteCarloResult: null,
  isRunning: false,
  isMonteCarloRunning: false,

  setThesisStrength: (score) => set({ thesisStrength: score }),
  setSensitivityRanking: (ranking) => set({ sensitivityRanking: ranking }),
  setMonteCarloResult: (result) => set({ monteCarloResult: result }),
  setIsMonteCarloRunning: (isRunning) => set({ isMonteCarloRunning: isRunning }),
}));

// Helper hook to bridge GraphStore and Simulation logic
// This effectively acts as the "Controller" for the simulation
export function useSimulationController() {
    // We don't subscribe here to avoid unnecessary re-renders in components that just want the actions.
    // actions should use getState() to access current data.
    
    const handleProbabilityChange = (nodeId: string, newProbability: number) => {
        const { nodes, edges, updateNodeProbability, setNodes } = useGraphStore.getState();
        const { setThesisStrength } = useSimulationStore.getState();

        // 1. Get original node
        const node = nodes.find(n => n.id === nodeId);
        if (!node) return;
        
        // 2. Optimistic update of source node
        updateNodeProbability(nodeId, newProbability);
        
        // 3. Run propagation
        const updates = runPropagation(nodes, edges, nodeId, node.probability, newProbability);
        
        // 4. Apply updates to other nodes
        // We need to re-fetch nodes because updateNodeProbability updated the store synchronously
        // OR just rely on logic. updateNodeProbability updates the store.
        // runPropagation used the 'nodes' snapshot from before the update? 
        // Actually runPropagation takes current probability.
        // It returns a map of *target* probabilities.
        
        if (updates.size > 0) {
             // We need to construct the new nodes array from the CURRENT store state (which has the updated source node)
             const currentNodes = useGraphStore.getState().nodes;
             
             const newNodes = currentNodes.map(n => {
                 if (updates.has(n.id)) return { ...n, probability: updates.get(n.id)! };
                 return n;
             });
             setNodes(newNodes);
             
             // 5. Recalculate Score
             const newScore = calculateThesisStrength(newNodes, edges);
             setThesisStrength(newScore);
        } else {
             // Even if no propagation, score might change due to the source node itself changing
             // The store already has the updated source node from step 2
             const currentNodes = useGraphStore.getState().nodes;
             const newScore = calculateThesisStrength(currentNodes, edges);
             setThesisStrength(newScore);
        }
    };

    const runSensitivity = () => {
        const { nodes, edges, setNodes } = useGraphStore.getState();
        const { setSensitivityRanking } = useSimulationStore.getState();
        
        const ranking = runSensitivityAnalysis(nodes, edges);
        setSensitivityRanking(ranking);
        
        // Also update nodes with their sensitivity sensitivityScore
        const updatedNodes = nodes.map(n => {
            const rank = ranking.find(r => r.nodeId === n.id);
            const visualScore = rank ? Math.min(100, rank.impactScore * 4) : 0;
            return { ...n, sensitivityScore: visualScore };
        });
        setNodes(updatedNodes);
    };
    
    // Initializer to run on mount
    const initializeSimulation = () => {
        const { nodes, edges } = useGraphStore.getState();
        const { setThesisStrength } = useSimulationStore.getState();
        
        const score = calculateThesisStrength(nodes, edges);
        setThesisStrength(score);
    };

    const runMonteCarloSimulation = async () => {
        const { nodes, edges } = useGraphStore.getState();
        const { setIsMonteCarloRunning, setMonteCarloResult } = useSimulationStore.getState();
        
        setIsMonteCarloRunning(true);
        
        // Yield to let UI update
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Import dynamically to avoid circle deps if any (though logic is separate)
        const { runMonteCarlo } = await import('@/lib/simulation/monteCarlo');
        const result = runMonteCarlo(nodes, edges);
        
        setMonteCarloResult(result);
        setIsMonteCarloRunning(false);
    };

    return {
        handleProbabilityChange,
        runSensitivity,
        runMonteCarloSimulation,
        initializeSimulation
    };
}
