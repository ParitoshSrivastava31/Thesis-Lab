"use client"

import { useSimulationStore, useSimulationController } from '@/store/simulationStore';
import { Button } from '@/components/ui/Button';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Loader2, Play } from 'lucide-react';

export function MonteCarloChart() {
  const { monteCarloResult, isMonteCarloRunning } = useSimulationStore();
  const { runMonteCarloSimulation } = useSimulationController();

  // Transform scores into frequency buckets for the chart
  const data = monteCarloResult 
    ? processScoresToData(monteCarloResult.scores) 
    : [];

  return (
    <div className="flex flex-col h-full bg-bg-elevated/50 p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold font-syne text-text-primary leading-tight mb-2">
            Monte Carlo
        </h2>
        <p className="text-xs text-text-secondary">
          Simulate 1,000 parallel futures to see the range of possible outcomes.
        </p>
      </div>

      <div className="flex-1 min-h-[200px] w-full bg-bg-surface border border-bg-border rounded-lg relative overflow-hidden flex items-center justify-center">
        {!monteCarloResult && !isMonteCarloRunning && (
           <div className="text-center p-4">
              <p className="text-text-tertiary text-sm mb-4">No simulation data yet.</p>
              <Button onClick={runMonteCarloSimulation} disabled={isMonteCarloRunning}>
                 <Play className="w-4 h-4 mr-2" />
                 Run Simulation
              </Button>
           </div>
        )}

        {isMonteCarloRunning && (
           <div className="flex flex-col items-center text-text-secondary">
              <Loader2 className="w-8 h-8 animate-spin mb-2 text-brand-primary" />
              <span className="text-xs animate-pulse">Running 1,000 scenarios...</span>
           </div>
        )}

        {monteCarloResult && !isMonteCarloRunning && (
          <div className="w-full h-full p-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorFrequency" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4B7BFF" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#4B7BFF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                    dataKey="score" 
                    type="number" 
                    domain={[0, 100]} 
                    tick={{ fill: '#454D6D', fontSize: 10 }} 
                    axisLine={false}
                    tickLine={false}
                />
                <YAxis hide />
                <Tooltip 
                    contentStyle={{ backgroundColor: '#0C0E18', borderColor: '#1E2235', fontSize: '12px' }}
                    itemStyle={{ color: '#F0F2FF' }}
                    labelFormatter={(label) => `Score: ${label}`}
                />
                <Area 
                    type="monotone" 
                    dataKey="frequency" 
                    stroke="#4B7BFF" 
                    fillOpacity={1} 
                    fill="url(#colorFrequency)" 
                    isAnimationActive={true}
                />
                {/* Reference Lines for P10, P50, P90 */}
                <ReferenceLine x={monteCarloResult.p10} stroke="#F43F5E" strokeDasharray="3 3" label={{ value: 'P10', fill: '#F43F5E', fontSize: 10, position: 'top' }} />
                <ReferenceLine x={monteCarloResult.p50} stroke="#F59E0B" strokeDasharray="3 3" label={{ value: 'P50', fill: '#F59E0B', fontSize: 10, position: 'top' }} />
                <ReferenceLine x={monteCarloResult.p90} stroke="#10B981" strokeDasharray="3 3" label={{ value: 'P90', fill: '#10B981', fontSize: 10, position: 'top' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {monteCarloResult && (
        <div className="grid grid-cols-3 gap-2">
            <StatBox label="P10 (Bear)" value={monteCarloResult.p10} color="text-score-weak" />
            <StatBox label="P50 (Base)" value={monteCarloResult.p50} color="text-score-moderate" />
            <StatBox label="P90 (Bull)" value={monteCarloResult.p90} color="text-score-strong" />
        </div>
      )}
      
      {monteCarloResult && (
           <Button variant="outline" size="sm" onClick={runMonteCarloSimulation} disabled={isMonteCarloRunning} className="w-full">
              <Play className="w-3 h-3 mr-2" />
              Rerun Simulation
           </Button>
      )}
    </div>
  );
}

function StatBox({ label, value, color }: { label: string, value: number, color: string }) {
    return (
        <div className="bg-bg-surface border border-bg-border rounded p-2 text-center">
            <span className="text-[9px] text-text-tertiary uppercase block mb-1">{label}</span>
            <span className={`text-lg font-mono font-bold ${color}`}>{value.toFixed(1)}</span>
        </div>
    )
}

function processScoresToData(scores: number[]) {
    // Bucket scores into bins of 2
    const bins = new Array(51).fill(0); // 0-100 step 2
    scores.forEach(s => {
        const binIndex = Math.floor(s / 2);
        if (binIndex >= 0 && binIndex <= 50) {
            bins[binIndex]++;
        }
    });
    
    return bins.map((count, i) => ({
        score: i * 2,
        frequency: count
    }));
}
