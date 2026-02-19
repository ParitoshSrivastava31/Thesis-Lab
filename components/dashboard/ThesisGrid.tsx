
import { ThesisCard } from "./ThesisCard"

// Mock data for now
const theses = [
  {
    id: "1",
    title: "AI Infrastructure Bull Case",
    horizon: "5Y horizon",
    nodeCount: 7,
    edgeCount: 3,
    strength: 78,
    updatedAt: "2 days ago",
  },
  {
    id: "2",
    title: "SaaS Market Consolidation",
    horizon: "3Y horizon",
    nodeCount: 12,
    edgeCount: 8,
    strength: 62,
    updatedAt: "1 week ago",
  },
  {
    id: "3",
    title: "Energy Transition Risks",
    horizon: "10Y horizon",
    nodeCount: 5,
    edgeCount: 4,
    strength: 45,
    updatedAt: "3 days ago",
  },
]

export function ThesisGrid() {
  if (theses.length === 0) {

    return (
        <div className="flex flex-col items-center justify-center h-64 border border-dashed border-bg-border rounded-xl bg-bg-elevated/30">
            <p className="text-text-secondary mb-4">Your constellation awaits.</p>
            <p className="text-sm text-text-tertiary">Start by defining your first investment thesis.</p>
        </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {theses.map((thesis) => (
        <ThesisCard key={thesis.id} {...thesis} />
      ))}
    </div>
  )
}
