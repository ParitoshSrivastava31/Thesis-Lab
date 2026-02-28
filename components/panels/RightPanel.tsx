"use client"

import { NodeDetail } from './NodeDetail';
import { EdgeDetail } from './EdgeDetail';
import { StrengthScore } from './StrengthScore';
import { MonteCarloChart } from '@/components/panels/MonteCarloChart';
import { useGraphStore } from '@/store/graphStore';
import { useUIStore } from '@/store/uiStore';
import { cn } from '@/lib/utils';
import { Activity, BarChart3, Target } from 'lucide-react';

export function RightPanel() {
   const { selectedNodeId, selectedEdgeId } = useGraphStore();
   const { activePanel, setActivePanel } = useUIStore();

   return (
      <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-white/40 backdrop-blur-xl border-l border-white/60 shadow-[-4px_0_30px_rgba(0,0,0,0.02)] overflow-y-auto w-[360px] rounded-bl-2xl">

         {/* Strength Score Header - Always Visible */}
         <div className="p-5 border-b border-bg-border/50 bg-white/50 backdrop-blur-md sticky top-0 z-10 shadow-sm shadow-brand-primary/5">
            <StrengthScore />

            {/* Tab Switcher */}
            <div className="flex bg-white/60 p-1.5 rounded-xl mt-5 border border-white shadow-inner shadow-black/5">
               <button
                  onClick={() => setActivePanel('details')}
                  className={cn(
                     "flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold font-syne uppercase tracking-wider rounded-lg transition-all duration-300",
                     activePanel === 'details' ? "bg-white text-brand-primary shadow-sm shadow-brand-glow" : "text-text-secondary hover:text-text-primary hover:bg-white/40"
                  )}
               >
                  <Activity className="w-3.5 h-3.5" />
                  Details
               </button>
               <button
                  onClick={() => setActivePanel('monte-carlo')}
                  className={cn(
                     "flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold font-syne uppercase tracking-wider rounded-lg transition-all duration-300",
                     activePanel === 'monte-carlo' ? "bg-white text-brand-primary shadow-sm shadow-brand-glow" : "text-text-secondary hover:text-text-primary hover:bg-white/40"
                  )}
               >
                  <BarChart3 className="w-3.5 h-3.5" />
                  Monte Carlo
               </button>
            </div>
         </div>

         <div className="flex-1 overflow-y-auto px-1">
            {activePanel === 'monte-carlo' ? (
               <div className="animate-in slide-in-from-right-4 fade-in duration-300 h-full"><MonteCarloChart /></div>
            ) : (
               selectedEdgeId ? (
                  <div className="animate-in slide-in-from-right-4 fade-in duration-300 h-full"><EdgeDetail /></div>
               ) : selectedNodeId ? (
                  <div className="animate-in slide-in-from-right-4 fade-in duration-300 h-full"><NodeDetail /></div>
               ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center p-8 space-y-4 opacity-80 animate-in fade-in duration-500">
                     <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-white/80 to-white/30 border border-white/90 shadow-sm flex items-center justify-center">
                        <Target className="w-8 h-8 text-brand-primary/40" />
                     </div>
                     <div>
                        <h3 className="text-sm font-bold font-syne text-text-primary mb-2 tracking-wide">Select a Node or Edge</h3>
                        <p className="text-sm text-text-secondary leading-relaxed">Click any node or relationship line in the constellation to view details.</p>
                     </div>
                  </div>
               )
            )}
         </div>
      </div>
   );
}

