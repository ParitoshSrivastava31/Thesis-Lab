
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, GitGraph, Settings, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"

const items = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (

    <aside className="fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-16 flex flex-col items-center border-r border-bg-border bg-bg-surface py-4 gap-4 z-40">
      {items.map((item) => {
        const isActive = pathname.startsWith(item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "p-2 rounded-md transition-colors",
              isActive
                ? "bg-brand-primary/10 text-brand-primary"
                : "text-text-secondary hover:text-text-primary hover:bg-bg-elevated"
            )}
            title={item.title}
          >
            <item.icon className="w-5 h-5" />
          </Link>
        )
      })}
    </aside>
  )
}
