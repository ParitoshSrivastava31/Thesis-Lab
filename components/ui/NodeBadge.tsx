import { ThesisNode } from "@/types/graph"

const TYPE_CONFIG = {
  MACRO_FACTOR: { label: "MACRO", color: "bg-node-macro", text: "text-node-macro" },
  SECTOR_TREND: { label: "SECTOR", color: "bg-node-sector", text: "text-node-sector" },
  COMPANY_FACTOR: { label: "COMPANY", color: "bg-node-company", text: "text-node-company" },
  RISK_FACTOR: { label: "RISK", color: "bg-node-risk", text: "text-node-risk" },
  CATALYST: { label: "CATALYST", color: "bg-node-catalyst", text: "text-node-catalyst" },
  STRUCTURAL_DRIVER: { label: "STRUCTURAL", color: "bg-node-structural", text: "text-node-structural" },
}

interface NodeBadgeProps {
  type: ThesisNode["type"]
}

export function NodeBadge({ type }: NodeBadgeProps) {
  const config = TYPE_CONFIG[type]
  if (!config) return null

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[0.6rem] font-medium ring-1 ring-inset ${config.text} ring-current/20 bg-opacity-10 ${config.color}`}>
      {config.label}
    </span>
  )
}
