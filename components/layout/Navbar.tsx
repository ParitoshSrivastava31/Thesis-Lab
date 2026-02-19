
import Link from "next/link"
import { Badge } from "@/components/ui/Badge"

export function Navbar() {
  return (

    <nav className="h-14 border-b border-bg-border bg-bg-void/80 backdrop-blur-md px-6 flex items-center justify-between fixed top-0 w-full z-50">
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="font-bold text-xl tracking-tight text-text-primary">
          ThesisLab
        </Link>
        <div className="h-4 w-px bg-bg-border" />
        <span className="text-text-secondary text-sm font-medium">Dashboard</span>
      </div>
      <div className="flex items-center gap-4">
        <Badge variant="outline" className="text-text-secondary border-text-tertiary">FREE</Badge>
        <div className="w-8 h-8 rounded-full bg-linear-to-br from-brand-primary to-brand-pulse" />
      </div>
    </nav>
  )
}
