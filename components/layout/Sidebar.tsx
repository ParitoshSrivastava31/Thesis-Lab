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
    <aside className="fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-16 flex flex-col items-center border-r border-bg-border/40 bg-white/40 backdrop-blur-2xl py-6 gap-6 z-40 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      {items.map((item) => {
        const isActive = pathname.startsWith(item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "p-3 rounded-xl transition-all duration-300 hover-lift",
              isActive
                ? "bg-brand-primary text-white shadow-md shadow-brand-glow"
                : "text-text-secondary hover:text-brand-primary hover:bg-white/60"
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
