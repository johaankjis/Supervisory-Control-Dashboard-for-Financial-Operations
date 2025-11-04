import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus, CheckCircle2, AlertTriangle } from "lucide-react"

interface ExecutiveSummaryCardProps {
  title: string
  value: string
  trend?: "up" | "down" | "stable"
  status?: "healthy" | "warning" | "critical"
  subtitle?: string
}

export function ExecutiveSummaryCard({ title, value, trend, status = "healthy", subtitle }: ExecutiveSummaryCardProps) {
  const getTrendIcon = () => {
    if (trend === "up") return <TrendingUp className="h-4 w-4" />
    if (trend === "down") return <TrendingDown className="h-4 w-4" />
    return <Minus className="h-4 w-4" />
  }

  const getStatusBadge = () => {
    switch (status) {
      case "healthy":
        return (
          <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Healthy
          </Badge>
        )
      case "warning":
        return (
          <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Warning
          </Badge>
        )
      case "critical":
        return (
          <Badge variant="destructive">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Critical
          </Badge>
        )
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground text-balance">{title}</CardTitle>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-3xl font-bold text-balance">{value}</div>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          {trend && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              {getTrendIcon()}
              <span className="capitalize">{trend}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
