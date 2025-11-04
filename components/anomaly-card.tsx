import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, TrendingUp, TrendingDown } from "lucide-react"
import type { AnomalyDetection } from "@/lib/types"

interface AnomalyCardProps {
  anomaly: AnomalyDetection
}

export function AnomalyCard({ anomaly }: AnomalyCardProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      default:
        return "secondary"
    }
  }

  const getIcon = () => {
    if (anomaly.actualValue > anomaly.expectedValue) {
      return <TrendingUp className="h-4 w-4 text-destructive" />
    } else {
      return <TrendingDown className="h-4 w-4 text-warning" />
    }
  }

  const formatValue = (value: number) => {
    if (value > 1000000) {
      return `${(value / 1000000).toFixed(2)}M`
    } else if (value > 1000) {
      return `${(value / 1000).toFixed(2)}K`
    }
    return value.toFixed(2)
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <CardTitle className="text-base text-balance">{anomaly.metricName}</CardTitle>
          </div>
          <Badge variant={getSeverityColor(anomaly.severity)}>{anomaly.severity.toUpperCase()}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Expected</span>
          <span className="font-mono">{formatValue(anomaly.expectedValue)}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Actual</span>
          <div className="flex items-center gap-2">
            {getIcon()}
            <span className="font-mono font-medium">{formatValue(anomaly.actualValue)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Deviation</span>
          <span className="font-semibold text-destructive">{anomaly.deviation.toFixed(1)}%</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Confidence</span>
          <span className="font-medium">{anomaly.confidence.toFixed(1)}%</span>
        </div>

        <div className="pt-2 border-t text-xs text-muted-foreground">{anomaly.timestamp.toLocaleString()}</div>
      </CardContent>
    </Card>
  )
}
