
import Link from "next/link"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"

interface ThesisCardProps {
  id: string
  title: string
  horizon: string
  nodeCount: number
  edgeCount: number
  strength: number
  updatedAt: string
}

export function ThesisCard({ id, title, horizon, nodeCount, edgeCount, strength, updatedAt }: ThesisCardProps) {
  return (

    <div className="group relative bg-bg-surface border border-bg-border rounded-xl overflow-hidden hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-md hover:shadow-brand-glow">
      {/* Mini Constellation Preview Placeholder */}
      <div className="h-[180px] w-full bg-bg-void relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-brand-glow)_0%,transparent_70%)] opacity-20" />
        <span className="text-text-tertiary text-xs">Constellation Preview</span>
      </div>

      <div className="p-5 flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-bold text-text-primary line-clamp-1 group-hover:text-brand-primary transition-colors">
            {title}
          </h3>
          <p className="text-xs text-text-secondary mt-1">
            {horizon} · {nodeCount} nodes · {edgeCount} edges
          </p>
        </div>

        <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono text-text-secondary">
                <span>STRENGTH</span>
                <span className={strength >= 70 ? "text-score-strong" : "text-score-moderate"}>{strength}</span>
            </div>
          <div className="h-1.5 w-full bg-bg-elevated rounded-full overflow-hidden">
            <div 
              className="h-full bg-linear-to-r from-score-moderate to-score-strong" 
              style={{ width: `${strength}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-bg-border">
          <span className="text-[10px] text-text-tertiary">
            Modified {updatedAt}
          </span>
          <div className="flex gap-2">
             <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                Compare
             </Button>
             <Link href={`/thesis/${id}`}>
                <Button size="sm" className="h-7 text-xs">
                    Open
                </Button>
             </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
