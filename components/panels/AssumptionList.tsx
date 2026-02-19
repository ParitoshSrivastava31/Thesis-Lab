import { useGraphStore } from "@/store/graphStore"
import { useSimulationController } from "@/store/simulationStore"
import { ProbabilitySlider } from "@/components/ui/ProbabilitySlider"
import { NodeBadge } from "@/components/ui/NodeBadge"
import { ConfidenceIndicator } from "@/components/ui/ConfidenceIndicator"
import { cn } from "@/lib/utils"

export function AssumptionList() {
  const { nodes, selectedNodeId, selectNode } = useGraphStore()
  const { handleProbabilityChange } = useSimulationController()

  if (nodes.length === 0) {
    return <div className="p-4 text-text-tertiary text-sm">No assumptions yet.</div>
  }

  return (
    <div className="flex flex-col divide-y divide-bg-border">
      {nodes.map((node) => (
        <div 
          key={node.id}
          onClick={() => selectNode(node.id)}
          className={cn(
            "p-4 hover:bg-bg-elevated/50 transition-colors cursor-pointer group relative",
            selectedNodeId === node.id && "bg-bg-elevated border-l-2 border-brand-primary"
          )}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex flex-col gap-1">
               <span className="text-sm font-medium text-text-primary group-hover:text-brand-primary transition-colors">
                  {node.title}
               </span>
               <div className="flex items-center gap-2">
                 <NodeBadge type={node.type} />
                 <ConfidenceIndicator level={node.confidence} />
               </div>
            </div>
          </div>
          
          <div className="mt-2 relative z-10" onClick={(e) => e.stopPropagation()}>
             <ProbabilitySlider 
                value={Math.round(node.probability)} 
                onChange={(val) => handleProbabilityChange(node.id, val)}
             />
          </div>
        </div>
      ))}
    </div>
  )
}
