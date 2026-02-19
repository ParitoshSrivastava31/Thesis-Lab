import { Slider } from "@/components/ui/Slider"
import { cn } from "@/lib/utils"

interface ProbabilitySliderProps {
  value: number
  onChange: (value: number) => void
  disabled?: boolean
  className?: string
}

export function ProbabilitySlider({ value, onChange, disabled, className }: ProbabilitySliderProps) {
  // Color based on value
  const getColorClass = (val: number) => {
    if (val < 40) return "bg-score-weak"
    if (val < 70) return "bg-score-moderate"
    return "bg-score-strong"
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Slider
        defaultValue={[value]}
        value={[value]}
        min={0}
        max={100}
        step={1}
        onValueChange={(vals: number[]) => onChange(vals[0])}
        disabled={disabled}
        className={cn("w-full transition-all duration-300", disabled && "opacity-50")}
        // We'll need to customize the Slider primitive to accept color classes or styles if we want dynamic track colors
        // For now, let's assume the Slider component has standard styling and we might need inline styles or a complex primitive override
        // But let's try just passing a colored class to a wrapper or utilizing the fact that Radix Slider usually allows customization.
        // Actually, our standard shadcn Slider usually uses `bg-primary` for the range.
        // We might want to pass a color prop to the Slider if we modified it, or we can just rely on the text color for now.
      />
      <span className={cn("font-mono text-sm w-9 text-right", 
        value < 40 ? "text-score-weak" : value < 70 ? "text-score-moderate" : "text-score-strong"
      )}>
        {value}%
      </span>
    </div>
  )
}
