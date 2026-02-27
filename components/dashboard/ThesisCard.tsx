import Link from "next/link"
import { MoreHorizontal, ArrowRight } from "lucide-react"
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
    <div className="group relative bg-white/70 backdrop-blur-md border border-white/80 rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 ease-out shadow-sm hover:shadow-xl hover:shadow-brand-glow/40 cursor-pointer">
      {/* Mini Constellation Preview Placeholder */}
      <div className="h-[180px] w-full bg-gradient-to-b from-transparent to-bg-elevated/50 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-brand-glow)_0%,transparent_70%)] opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
        <span className="text-text-tertiary text-xs font-syne uppercase tracking-widest font-bold">Constellation Preview</span>
      </div>

      <div className="p-6 flex flex-col gap-5 bg-white/50 backdrop-blur-sm border-t border-white/60">
        <div>
          <h3 className="text-xl font-bold font-syne text-text-primary line-clamp-1 group-hover:text-brand-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-text-secondary mt-1.5 font-medium">
            {horizon} · {nodeCount} nodes · {edgeCount} edges
          </p>
        </div>

        <div className="space-y-2 bg-white/40 p-3 rounded-lg border border-white/60">
          <div className="flex justify-between text-xs font-bold font-syne uppercase tracking-wider text-text-secondary">
            <span>Strength Summary</span>
            <span className={strength >= 70 ? "text-score-strong" : "text-score-moderate"}>{strength} / 100</span>
          </div>
          <div className="h-2 w-full bg-bg-border/40 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-score-moderate to-score-strong rounded-full relative"
              style={{ width: `${strength}%` }}
            >
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white/40 to-transparent" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-xs font-medium text-text-tertiary">
            Modified {updatedAt}
          </span>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
            <Link href={`/thesis/${id}`}>
              <Button size="sm" className="h-8 text-xs rounded-full px-5 py-0 group/btn">
                Open <ArrowRight className="w-3 h-3 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
