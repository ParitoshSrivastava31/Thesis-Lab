import { useGraphStore } from "@/store/graphStore"
import { useSimulationStore } from "@/store/simulationStore"
import { StrengthGauge } from "@/components/ui/StrengthGauge"

export function StrengthScore() {
  const { thesisStrength } = useSimulationStore()
  
  return (
    <div className="border-b border-bg-border pb-4">
      <StrengthGauge score={Math.round(thesisStrength)} />
    </div>
  )
}
