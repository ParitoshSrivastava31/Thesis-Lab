
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"


const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 disabled:pointer-events-none disabled:opacity-50 hover-lift",
  {
    variants: {
      variant: {
        default:
          "bg-brand-primary text-white shadow-md shadow-brand-glow hover:bg-brand-pulse",
        destructive:
          "bg-negative text-white shadow-md shadow-negative/20 hover:bg-negative/90",
        outline:
          "border border-bg-border bg-white/50 backdrop-blur-sm shadow-sm hover:bg-bg-elevated hover:text-text-primary hover:border-brand-primary/30",
        secondary:
          "bg-bg-elevated text-text-primary shadow-sm active:scale-95 hover:bg-bg-elevated/80",
        ghost: "hover:bg-brand-primary/5 hover:text-brand-primary active:scale-95",
        link: "text-brand-primary underline-offset-4 hover:underline",

      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
