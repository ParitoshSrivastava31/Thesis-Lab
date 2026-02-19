"use client"

import { NodeDetail } from './NodeDetail';
import { StrengthScore } from './StrengthScore';
import { MonteCarloChart } from '@/components/panels/MonteCarloChart';
import { useGraphStore } from '@/store/graphStore';
import { useUIStore } from '@/store/uiStore';
import { cn } from '@/lib/utils';
import { Activity, BarChart3 } from 'lucide-react';

export function RightPanel() {
  const { selectedNodeId } = useGraphStore();
  const { activePanel, setActivePanel } = useUIStore();

  return (
    <div className="flex flex-col h-full bg-bg-elevated border-l border-bg-border overflow-y-auto w-[360px]">
      
      {/* Strength Score Header - Always Visible */}
      <div className="p-4 border-b border-bg-border bg-bg-elevated sticky top-0 z-10">
         <StrengthScore />
         
         {/* Tab Switcher */}
         <div className="flex bg-bg-surface p-1 rounded-lg mt-4 border border-bg-border">
            <button
               onClick={() => setActivePanel('details')}
               className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-medium rounded-md transition-all",
                  activePanel === 'details' ? "bg-bg-elevated text-text-primary shadow-sm" : "text-text-secondary hover:text-text-primary"
               )}
            >
               <Activity className="w-3 h-3" />
               Details
            </button>
            <button
               onClick={() => setActivePanel('monte-carlo')}
               className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-medium rounded-md transition-all",
                  activePanel === 'monte-carlo' ? "bg-bg-elevated text-brand-primary shadow-sm" : "text-text-secondary hover:text-text-primary"
               )}
            >
               <BarChart3 className="w-3 h-3" />
               Monte Carlo
            </button>
         </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {activePanel === 'monte-carlo' ? (
            <MonteCarloChart />
        ) : (
            selectedNodeId ? (
                <NodeDetail />
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-8 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-bg-surface border border-bg-border flex items-center justify-center opacity-50">
                        <span className="text-2xl">⚡</span>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-text-primary mb-1">Select a Node</h3>
                        <p className="text-xs text-text-secondary">Click any node in the constellation or assumption list to view details.</p>
                    </div>
                </div>
            )
        )}
      </div>
    </div>
  );
}
