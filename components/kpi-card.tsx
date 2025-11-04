import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface KPICardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  trend?: "up" | "down" | "neutral"
  status?: "success" | "warning" | "error" | "neutral"
  icon?: React.ReactNode
  subtitle?: string
}

export function KPICard({
  title,
  value,
  change,
  changeLabel,
  trend,
  status = "neutral",
  icon,
  subtitle,
}: KPICardProps) {
  const getTrendIcon = () => {
    if (trend === "up") return <ArrowUpIcon className="h-4 w-4" />
    if (trend === "down") return <ArrowDownIcon className="h-4 w-4" />
    return <MinusIcon className="h-4 w-4" />
  }

  const getStatusColor = () => {
    switch (status) {
      case "success":
        return "text-success"
      case "warning":
        return "text-warning"
      case "error":
        return "text-destructive"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-balance">{value}</div>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
        {change !== undefined && (
          <div className={cn("flex items-center gap-1 text-xs mt-2", getStatusColor())}>
            {getTrendIcon()}
            <span className="font-medium">
              {change > 0 ? "+" : ""}
              {change.toFixed(2)}%
            </span>
            {changeLabel && <span className="text-muted-foreground">{changeLabel}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
