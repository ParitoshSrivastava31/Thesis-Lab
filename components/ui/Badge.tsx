
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"


const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-brand-primary text-white hover:bg-brand-primary/80",
        secondary:
          "border-transparent bg-bg-elevated text-text-secondary hover:bg-bg-elevated/80",
        destructive:
          "border-transparent bg-negative text-white hover:bg-negative/80",
        outline: "text-text-primary border-bg-border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
