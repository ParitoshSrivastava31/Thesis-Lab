"use client";

import { useGraphStore } from '@/store/graphStore';
import { useSimulationStore } from '@/store/simulationStore';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Share2, Download, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { format } from 'date-fns';
import { useState } from 'react';

export default function ScenarioReportPage() {
    const params = useParams();
    const router = useRouter();
    const thesisId = params.id as string;
    
    const { nodes, edges } = useGraphStore();
    const { thesisStrength, sensitivityRanking } = useSimulationStore();
    const [copied, setCopied] = useState(false);

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Derived stats
    const criticalRisks = nodes.filter(n => n.type === 'RISK_FACTOR' && n.probability < 50);
    const topSensitivity = sensitivityRanking.slice(0, 3).map(r => nodes.find(n => n.id === r.nodeId)).filter(Boolean);

    return (
        <div className="flex flex-col min-h-screen bg-bg-surface text-text-primary p-6 items-center">
            
            <div className="w-full max-w-4xl flex items-center justify-between mb-8">
                <button 
                    onClick={() => router.back()}
                    className="p-2 bg-bg-void border border-bg-border hover:bg-bg-elevated rounded transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                </button>
                <div className="flex gap-4">
                    <Button variant="outline" onClick={handleShare} className="border-bg-border">
                        {copied ? <CheckCircle2 className="w-4 h-4 text-positive mr-2" /> : <Share2 className="w-4 h-4 mr-2" />}
                        {copied ? 'Copied Link' : 'Share Report'}
                    </Button>
                    <Button className="bg-brand-primary text-white">
                        <Download className="w-4 h-4 mr-2" />
                        Export PDF
                    </Button>
                </div>
            </div>

            <div className="w-full max-w-4xl bg-bg-void border border-bg-border rounded-xl shadow-2xl p-10 print:shadow-none print:border-none">
                {/* Header */}
                <div className="border-b border-bg-border/50 pb-8 mb-8">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <span className="text-text-tertiary text-xs font-syne uppercase tracking-widest font-bold">
                                ThesisLab Analysis Report
                            </span>
                            <h1 className="font-syne text-4xl font-extrabold mt-2 text-text-primary">
                                AI Infrastructure Expansion
                            </h1>
                            <p className="text-text-secondary mt-2">
                                Generated on {format(new Date(), 'MMMM do, yyyy')}
                            </p>
                        </div>
                        <div className="text-center bg-bg-elevated border border-bg-border rounded-lg p-4 min-w-[140px]">
                            <div className="text-xs text-text-secondary uppercase tracking-widest font-syne font-bold mb-1">
                                Strength Score
                            </div>
                            <div className={`text-4xl font-jetbrains font-bold ${thesisStrength >= 70 ? 'text-positive' : thesisStrength >= 40 ? 'text-warning' : 'text-negative'}`}>
                                {thesisStrength.toFixed(1)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Executive Summary */}
                <div className="mb-10">
                    <h2 className="font-syne text-xl font-bold mb-4 border-b border-bg-border/50 pb-2">1. Executive Summary</h2>
                    <p className="text-text-secondary leading-relaxed font-syne">
                        This model evaluates the conviction level across {nodes.length} core assumptions and {edges.length} dependencies. 
                        The overall structural integrity of the thesis is 
                        <span className={`font-bold ml-1 ${thesisStrength >= 70 ? 'text-positive' : thesisStrength >= 40 ? 'text-warning' : 'text-negative'}`}>
                            {thesisStrength >= 70 ? 'Strong' : thesisStrength >= 40 ? 'Moderate' : 'Weak'}
                        </span>. 
                        There are currently {criticalRisks.length} critical risks identified that materially impact the expected outcome.
                    </p>
                </div>

                {/* Top Sensitivities */}
                <div className="mb-10">
                    <h2 className="font-syne text-xl font-bold mb-4 border-b border-bg-border/50 pb-2">2. Key Sensitivities</h2>
                    <p className="text-text-secondary mb-4 text-sm font-syne">
                        These are the assumptions that, if proven false, have the most catastrophic mathematical impact on the thesis strength.
                    </p>
                    <div className="grid gap-3">
                        {topSensitivity.map((node, i) => node && (
                            <div key={node.id} className="flex items-center justify-between p-4 bg-bg-surface border border-bg-border rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="h-8 w-8 rounded-full bg-bg-elevated flex items-center justify-center font-jetbrains text-brand-pulse text-sm">
                                        #{i + 1}
                                    </div>
                                    <div>
                                        <div className="font-bold text-text-primary">{node.title}</div>
                                        <div className="text-xs text-text-tertiary">{node.type.replace('_', ' ')}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-jetbrains text-lg text-text-primary">{node.probability}%</div>
                                    <div className="text-[10px] uppercase tracking-widest text-text-tertiary">Current Prob</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Assumption Ledger */}
                <div className="mb-10">
                    <h2 className="font-syne text-xl font-bold mb-4 border-b border-bg-border/50 pb-2">3. Assumption Ledger</h2>
                    <table className="w-full text-left text-sm font-syne">
                        <thead className="bg-bg-surface text-text-secondary border border-bg-border">
                            <tr>
                                <th className="p-3 font-semibold">Node</th>
                                <th className="p-3 font-semibold">Type</th>
                                <th className="p-3 font-semibold">Probability</th>
                                <th className="p-3 font-semibold">Confidence</th>
                            </tr>
                        </thead>
                        <tbody>
                            {nodes.map(node => (
                                <tr key={node.id} className="border-b border-x border-bg-border/50">
                                    <td className="p-3 font-medium text-text-primary">{node.title}</td>
                                    <td className="p-3 text-text-tertiary text-xs">{node.type.replace('_', ' ')}</td>
                                    <td className="p-3">
                                        <span className={`font-jetbrains ${node.probability > 70 ? 'text-positive' : node.probability < 40 ? 'text-negative' : 'text-warning'}`}>
                                            {node.probability}%
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 rounded text-[10px] uppercase tracking-widest font-bold ${
                                            node.confidence === 'HIGH' ? 'bg-positive/10 text-positive border border-positive/20' : 
                                            node.confidence === 'LOW' ? 'bg-negative/10 text-negative border border-negative/20' : 
                                            'bg-warning/10 text-warning border border-warning/20'
                                        }`}>
                                            {node.confidence}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer Notice */}
                <div className="text-center text-text-tertiary text-xs border-t border-bg-border/50 pt-8 mt-12 mb-4 font-syne">
                    Generated by ThesisLab Engine. Not investment advice. This is a probabilistic model driven by user inputs.
                </div>
            </div>
        </div>
    );
}
