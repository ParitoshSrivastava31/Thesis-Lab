"use client";

import { useGraphStore } from '@/store/graphStore';
import { useScenarioStore } from '@/store/scenarioStore';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function CompareScenariosPage() {
    const params = useParams();
    const router = useRouter();
    const thesisId = params.id as string;
    
    const { nodes } = useGraphStore();
    const { scenarios } = useScenarioStore();
    
    // Simplistic split view heatmap logic could go here
    return (
        <div className="flex flex-col h-screen bg-bg-void text-text-primary p-6">
            <div className="flex items-center gap-4 mb-8">
                <button 
                    onClick={() => router.back()}
                    className="p-2 bg-bg-surface hover:bg-bg-elevated rounded transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                </button>
                <h1 className="font-syne text-2xl font-bold">Scenario Comparison Heatmap</h1>
            </div>
            
            <div className="flex-1 bg-bg-surface border border-bg-border rounded-lg p-6">
                <p className="text-text-secondary mb-4">
                    Select scenarios to compare against the baseline. The heatmap below compares node probabilities.
                </p>
                {/* Heatmap table mock */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-bg-elevated text-text-secondary">
                            <tr>
                                <th className="p-3">Assumption</th>
                                <th className="p-3">Baseline (Current)</th>
                                {scenarios.map(s => (
                                    <th key={s.id} className="p-3">{s.name}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {nodes.map(node => (
                                <tr key={node.id} className="border-b border-bg-border/50">
                                    <td className="p-3 font-medium text-text-primary">{node.title}</td>
                                    <td className="p-3 text-brand-primary">{node.probability}%</td>
                                    {scenarios.map(s => {
                                        const snapProb = s.nodesSnapshot[node.id];
                                        const diff = snapProb ? snapProb - node.probability : 0;
                                        return (
                                            <td key={s.id} className={`p-3 font-mono ${diff > 0 ? 'text-positive' : diff < 0 ? 'text-negative' : 'text-neutral'}`}>
                                                {snapProb !== undefined ? `${snapProb}% ` : '-'}
                                                {diff !== 0 && (
                                                    <span className="text-xs ml-1">
                                                        ({diff > 0 ? '+' : ''}{diff}%)
                                                    </span>
                                                )}
                                            </td>
                                        )
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {scenarios.length === 0 && (
                    <div className="text-center py-10 text-text-tertiary">
                        No scenarios saved yet. Create some scenarios first!
                    </div>
                )}
            </div>
        </div>
    );
}
