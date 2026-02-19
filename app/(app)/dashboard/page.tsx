

import { StatsBar } from "@/components/dashboard/StatsBar"
import { ThesisGrid } from "@/components/dashboard/ThesisGrid"
import { NewThesisModal } from "@/components/dashboard/NewThesisModal"


export default function DashboardPage() {
  return (
    <div className="container mx-auto max-w-7xl pt-8 pb-16">

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-syne text-text-primary">Your Theses</h1>
          <p className="text-text-secondary mt-1">3 active · Avg strength: 72</p>
        </div>

        <NewThesisModal />

      </div>

      <StatsBar />
      <ThesisGrid />
    </div>
  )
}
