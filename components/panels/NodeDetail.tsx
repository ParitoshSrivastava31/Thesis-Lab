import { useGraphStore } from "@/store/graphStore"
import { useSimulationStore, useSimulationController } from "@/store/simulationStore"
import { NodeBadge } from "@/components/ui/NodeBadge"
import { ConfidenceIndicator } from "@/components/ui/ConfidenceIndicator"
import { ProbabilitySlider } from "@/components/ui/ProbabilitySlider"
import { Button } from "@/components/ui/Button"
import { ArrowRight, Info, ExternalLink } from "lucide-react"

export function NodeDetail() {
  const { selectedNodeId, nodes } = useGraphStore()
  const { sensitivityRanking } = useSimulationStore()
  const { handleProbabilityChange } = useSimulationController()

  const node = nodes.find(n => n.id === selectedNodeId)

  if (!node) {
    return (
      <div className="p-8 text-center text-text-tertiary">
        <Info className="w-8 h-8 mx-auto mb-2 opacity-20" />
        <p>Select a node to view details</p>
      </div>
    )
  }

  // Find ranking
  const rankIndex = sensitivityRanking.findIndex(r => r.nodeId === node.id)
  const rank = rankIndex !== -1 ? rankIndex + 1 : '-'

  return (
    <div className="flex flex-col h-full bg-bg-elevated/50">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-xl font-bold font-syne text-text-primary leading-tight mb-2">
            {node.title}
          </h2>
          <div className="flex items-center justify-between text-xs text-text-secondary">
            <div className="flex gap-2">
              <NodeBadge type={node.type} />
              <span className="uppercase tracking-wider">{node.timeRelevance} TERM</span>
            </div>
          </div>
        </div>

        {/* Probability Control */}
        <div className="bg-bg-surface p-4 rounded-lg border border-bg-border space-y-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium text-text-secondary uppercase tracking-widest">Probability</span>
            <span className="font-mono text-brand-primary font-bold">{Math.round(node.probability)}%</span>
          </div>
          <ProbabilitySlider
            value={Math.round(node.probability)}
            onChange={(val) => handleProbabilityChange(node.id, val)}
            className="py-2"
          />
          <div className="flex justify-between text-[10px] text-text-tertiary pt-1">
            <span>IMPOSSIBLE</span>
            <span>CERTAIN</span>
          </div>
        </div>

        {/* Real-World Parameters Control */}
        <div className="bg-bg-surface p-4 rounded-lg border border-bg-border space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-text-secondary uppercase tracking-widest">Real-World Volatility</span>
            <div className="flex items-center gap-1">
              <input
                type="number"
                min="0" max="100"
                className="w-16 bg-bg-elevated border border-bg-border rounded px-2 py-1 text-sm font-mono text-right focus:outline-none focus:border-brand-primary"
                value={node.volatility ?? ""}
                placeholder="Auto"
                onChange={(e) => {
                  const val = e.target.value;
                  useGraphStore.getState().setNodes(
                    useGraphStore.getState().nodes.map(n =>
                      n.id === node.id
                        ? { ...n, volatility: val ? Number(val) : undefined }
                        : n
                    )
                  );
                }}
              />
              <span className="text-xs text-text-secondary font-mono">%</span>
            </div>
          </div>
          <p className="text-[10px] text-text-tertiary leading-tight">
            Overrides default standard deviation in Monte Carlo simulations. Leave blank for default confidence-based volatility.
          </p>
        </div>

        {/* Confidence & Sensitivity Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-bg-surface p-3 rounded border border-bg-border">
            <span className="text-[10px] text-text-tertiary block mb-1">CONFIDENCE</span>
            <div className="flex items-center gap-2">
              <ConfidenceIndicator level={node.confidence} />
              <span className="text-xs font-mono">{node.confidence}</span>
            </div>
          </div>
          <div className="bg-bg-surface p-3 rounded border border-bg-border">
            <span className="text-[10px] text-text-tertiary block mb-1">SENSITIVITY RANK</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-mono font-bold text-text-primary">#{rank}</span>
              <span className="text-[10px] text-text-secondary">of {nodes.length}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <span className="text-xs font-bold text-text-secondary uppercase mb-2 block">Description</span>
          <p className="text-sm text-text-secondary leading-relaxed bg-bg-surface/50 p-3 rounded border border-bg-border">
            {node.description || "No description provided."}
          </p>
        </div>

        {/* Evidence Links Placeholder */}
        <div>
          <span className="text-xs font-bold text-text-secondary uppercase mb-2 block">Evidence</span>
          <Button variant="outline" size="sm" className="w-full justify-start text-xs border-dashed text-text-tertiary">
            <ExternalLink className="w-3 h-3 mr-2" />
            Add Evidence Link
          </Button>
        </div>

      </div>
    </div>
  )
}
