"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Activity, GitBranch, FileText } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/anomalies", label: "Anomalies", icon: Activity },
    { href: "/pipelines", label: "Pipelines", icon: GitBranch },
    { href: "/reports", label: "Reports", icon: FileText },
  ]

  return (
    <nav className="border-b bg-card">
      <div className="flex h-14 items-center px-6 gap-6">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                isActive ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
