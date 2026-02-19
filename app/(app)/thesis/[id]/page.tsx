'use client';

import { useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { ConstellationCanvas } from '@/components/canvas/ConstellationCanvas';
import { GraphCanvas2D } from '@/components/canvas/GraphCanvas2D';
import { CanvasToolbar } from '@/components/canvas/CanvasToolbar';
import { LeftPanel } from '@/components/panels/LeftPanel';
import { RightPanel } from '@/components/panels/RightPanel';
import { useGraphStore } from '@/store/graphStore';
import { useUIStore } from '@/store/uiStore';
import { useSimulationController } from '@/store/simulationStore';
import { ThesisNode, ThesisEdge } from '@/types/graph';

// Mock data for development - remove when API integration is ready
const MOCK_NODES: ThesisNode[] = [
  { id: '1', thesisId: 't1', title: 'AI Compute Cost Decline', type: 'MACRO_FACTOR', probability: 91, confidence: 'HIGH', timeRelevance: 'SHORT', sensitivityScore: 80, position: [-2, 1, 0] },
  { id: '2', thesisId: 't1', title: 'Enterprise AI Adoption', type: 'SECTOR_TREND', probability: 84, confidence: 'HIGH', timeRelevance: 'MEDIUM', sensitivityScore: 60, position: [2, 1, 0] },
  { id: '3', thesisId: 't1', title: 'Regulatory Stability', type: 'RISK_FACTOR', probability: 45, confidence: 'LOW', timeRelevance: 'MEDIUM', sensitivityScore: 90, position: [0, -2, 0] },
  { id: '4', thesisId: 't1', title: 'Hyperscaler Demand', type: 'COMPANY_FACTOR', probability: 78, confidence: 'MEDIUM', timeRelevance: 'SHORT', sensitivityScore: 70, position: [0, 0, 0] },
];

const MOCK_EDGES: ThesisEdge[] = [
  { id: 'e1', thesisId: 't1', source: '1', target: '4', weight: 0.8, strength: 'STRONG', dependencyType: 'CAUSAL' },
  { id: 'e2', thesisId: 't1', source: '2', target: '4', weight: 0.7, strength: 'MODERATE', dependencyType: 'CORRELATED' },
  { id: 'e3', thesisId: 't1', source: '3', target: '4', weight: 0.9, strength: 'CRITICAL', dependencyType: 'CONDITIONAL' },
];

export default function ThesisPage() {
  const params = useParams();
  const id = params.id as string;
  const { setNodes, setEdges } = useGraphStore();
  const { mode } = useUIStore();
  const { initializeSimulation, runSensitivity } = useSimulationController();
  useEffect(() => {
    // In Week 2/3, we load mock data to test visualization
    console.log("Setting mock nodes...", MOCK_NODES);
    setNodes(MOCK_NODES);
    setEdges(MOCK_EDGES);
    
    // Initialize simulation with a small delay to ensure store update
    setTimeout(() => {
        initializeSimulation();
        runSensitivity();
    }, 100);

    // TODO: implement API fetch here in Week 3
  }, []); 

  return (
    <div className="flex h-[calc(100vh-56px)] overflow-hidden">
      {/* Left Panel */}
      <LeftPanel />

      {/* Main Canvas Area */}
      <div className="flex-1 relative bg-bg-void">
        {mode === '3D' ? (
          <ConstellationCanvas />
        ) : (
          <GraphCanvas2D />
        )}
        
        <CanvasToolbar />
      </div>

      {/* Right Panel */}
      <RightPanel />
    </div>
  );
}
