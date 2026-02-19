
import { cn } from "@/lib/utils"

interface StatCardProps {
  label: string
  value: string | number
  subtext?: string
}

function StatCard({ label, value, subtext }: StatCardProps) {
  return (

    <div className="bg-bg-surface border border-bg-border rounded-lg p-4 flex flex-col gap-1 min-w-[140px]">
      <span className="text-3xl font-mono text-text-primary">{value}</span>
      <span className="text-xs uppercase tracking-wider text-text-secondary font-semibold">{label}</span>
      {subtext && <span className="text-xs text-text-tertiary">{subtext}</span>}
    </div>
  )
}

export function StatsBar() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <StatCard label="Theses" value="3" />
      <StatCard label="Avg Score" value="72" />
      <StatCard label="Assumptions" value="14" subtext="TOTAL" />
      <StatCard label="Scenarios" value="2" subtext="SAVED" />
    </div>
  )
}
