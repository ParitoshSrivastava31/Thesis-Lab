import { useGraphStore } from "@/store/graphStore"
import { useSimulationController } from "@/store/simulationStore"
import { Button } from "@/components/ui/Button"
import { Info, ExternalLink, Activity } from "lucide-react"

export function EdgeDetail() {
    const { selectedEdgeId, edges, nodes, setEdges } = useGraphStore()
    const { initializeSimulation } = useSimulationController()

    const edge = edges.find(e => e.id === selectedEdgeId)

    if (!edge) {
        return (
            <div className="p-8 text-center text-text-tertiary">
                <Info className="w-8 h-8 mx-auto mb-2 opacity-20" />
                <p>Select an edge to view relationship details</p>
            </div>
        )
    }

    const sourceNode = nodes.find(n => n.id === edge.source)
    const targetNode = nodes.find(n => n.id === edge.target)

    const updateEdge = (updates: Partial<typeof edge>) => {
        setEdges(edges.map(e => e.id === edge.id ? { ...e, ...updates } : e))
        // Trigger a re-calculation of the score if the edge weights change
        // Even though 'weight' isn't directly changed here, multiplier/decay affects propagation
        // For immediate score updates if we had live propagation, we'd call a re-run
    }

    return (
        <div className="flex flex-col h-full bg-bg-elevated/50">
            <div className="p-6 space-y-6">
                {/* Header */}
                <div>
                    <h2 className="text-xl font-bold font-syne text-text-primary leading-tight mb-2">
                        Relationship Inspector
                    </h2>
                    <div className="text-xs text-text-secondary leading-relaxed bg-bg-surface/50 p-3 rounded border border-bg-border">
                        From <span className="font-bold text-brand-primary">"{sourceNode?.title}"</span><br />
                        To <span className="font-bold text-brand-primary">"{targetNode?.title}"</span>
                    </div>
                </div>

                {/* Real-World Ripple Parameters */}
                <div className="bg-bg-surface p-4 rounded-lg border border-bg-border space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-4 h-4 text-brand-primary" />
                        <span className="text-xs font-bold font-syne uppercase tracking-wider text-text-primary">Ripple Parameters</span>
                    </div>

                    {/* Decay Factor */}
                    <div className="space-y-1">
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Decay Factor</span>
                            <div className="flex items-center gap-1">
                                <input
                                    type="number"
                                    step="0.1" min="0" max="1"
                                    className="w-16 bg-bg-elevated border border-bg-border rounded px-2 py-1 text-sm font-mono text-right focus:outline-none focus:border-brand-primary"
                                    value={edge.decayFactor ?? ""}
                                    placeholder="0.6"
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        updateEdge({ decayFactor: val ? Number(val) : undefined })
                                    }}
                                />
                            </div>
                        </div>
                        <p className="text-[10px] text-text-tertiary leading-tight">
                            Signal strength retained per hop (0.0 - 1.0). Default is 0.6.
                        </p>
                    </div>

                    <div className="h-px w-full border-t border-bg-border/50 my-2"></div>

                    {/* Ripple Multiplier */}
                    <div className="space-y-1">
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Effect Multiplier</span>
                            <div className="flex items-center gap-1">
                                <input
                                    type="number"
                                    step="0.1" min="0" max="5"
                                    className="w-16 bg-bg-elevated border border-bg-border rounded px-2 py-1 text-sm font-mono text-right focus:outline-none focus:border-brand-primary"
                                    value={edge.multiplier ?? ""}
                                    placeholder="Auto"
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        updateEdge({ multiplier: val ? Number(val) : undefined })
                                    }}
                                />
                            </div>
                        </div>
                        <p className="text-[10px] text-text-tertiary leading-tight">
                            Elasticity/amplification factor. Defaults based on dependency type (Causal: 1.0, Correlated: 0.7).
                        </p>
                    </div>
                </div>

                {/* Existing Edge Properties */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-bg-surface p-3 rounded border border-bg-border">
                        <span className="text-[10px] text-text-tertiary block mb-1">STRENGTH</span>
                        <span className="text-xs font-mono font-bold text-text-primary">{edge.strength}</span>
                    </div>
                    <div className="bg-bg-surface p-3 rounded border border-bg-border">
                        <span className="text-[10px] text-text-tertiary block mb-1">TYPE</span>
                        <span className="text-xs font-mono font-bold text-text-primary">{edge.dependencyType}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
