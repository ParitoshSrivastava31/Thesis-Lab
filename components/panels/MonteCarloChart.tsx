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
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="score"
                  type="number"
                  domain={[0, 100]}
                  tick={{ fill: '#6B7280', fontSize: 10, fontFamily: 'var(--font-jetbrains)' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(8px)', borderColor: '#E5E7EB', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', fontSize: '12px', fontFamily: 'var(--font-jetbrains)', color: '#1F2937' }}
                  itemStyle={{ color: '#6366F1', fontWeight: 'bold' }}
                  labelFormatter={(label) => `Score: ${label}`}
                />
                <Area
                  type="monotone"
                  dataKey="frequency"
                  stroke="#6366F1"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorFrequency)"
                  isAnimationActive={true}
                />
                {/* Reference Lines for P10, P50, P90 */}
                <ReferenceLine x={monteCarloResult.p10} stroke="#FB7185" strokeDasharray="3 3" label={{ value: 'P10', fill: '#FB7185', fontSize: 10, position: 'top', fontFamily: 'var(--font-syne)', fontWeight: 'bold' }} />
                <ReferenceLine x={monteCarloResult.p50} stroke="#FBBF24" strokeDasharray="3 3" label={{ value: 'P50', fill: '#FBBF24', fontSize: 10, position: 'top', fontFamily: 'var(--font-syne)', fontWeight: 'bold' }} />
                <ReferenceLine x={monteCarloResult.p90} stroke="#34D399" strokeDasharray="3 3" label={{ value: 'P90', fill: '#34D399', fontSize: 10, position: 'top', fontFamily: 'var(--font-syne)', fontWeight: 'bold' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {monteCarloResult && (
        <div className="grid grid-cols-3 gap-2">
          <StatBox label="P10 (Bear)" value={monteCarloResult.p10} color="text-negative" />
          <StatBox label="P50 (Base)" value={monteCarloResult.p50} color="text-warning" />
          <StatBox label="P90 (Bull)" value={monteCarloResult.p90} color="text-positive" />
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
    <div className="bg-white/50 backdrop-blur-sm border border-white/80 shadow-sm rounded-lg p-2.5 text-center transition-transform hover:-translate-y-0.5" >
      <span className="text-[10px] font-bold font-syne text-text-tertiary uppercase tracking-widest block mb-1.5">{label}</span>
      <span className={`text-xl font-jetbrains font-light tracking-tighter ${color}`}>{value.toFixed(1)}</span>
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
