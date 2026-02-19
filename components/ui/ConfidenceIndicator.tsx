import { ConfidenceLevel } from "@/types/graph"

interface ConfidenceIndicatorProps {
  level: ConfidenceLevel
}

export function ConfidenceIndicator({ level }: ConfidenceIndicatorProps) {
  const dots = {
    LOW: [true, false, false],
    MEDIUM: [true, true, false],
    HIGH: [true, true, true],
  }

  const activeColor = {
    LOW: "bg-score-weak",
    MEDIUM: "bg-score-moderate",
    HIGH: "bg-score-strong",
  }[level]

  return (
    <div className="flex gap-1" title={`Confidence: ${level}`}>
      {dots[level].map((filled, i) => (
        <div
          key={i}
          className={`h-1.5 w-1.5 rounded-full ${filled ? activeColor : "bg-bg-border"}`}
        />
      ))}
    </div>
  )
}
