"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { AnomalyDetection } from "@/lib/types"
import { AlertCircle, AlertTriangle, Info } from "lucide-react"

interface AnomalyTimelineProps {
  anomalies: AnomalyDetection[]
}

export function AnomalyTimeline({ anomalies }: AnomalyTimelineProps) {
  const sortedAnomalies = [...anomalies].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 10)

  const getIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertCircle className="h-4 w-4 text-destructive" />
      case "medium":
        return <AlertTriangle className="h-4 w-4 text-warning" />
      default:
        return <Info className="h-4 w-4 text-primary" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "border-l-destructive bg-destructive/5"
      case "medium":
        return "border-l-warning bg-warning/5"
      default:
        return "border-l-primary bg-primary/5"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-balance">Recent Anomalies</CardTitle>
        <CardDescription>Timeline of detected anomalies</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sortedAnomalies.map((anomaly) => (
            <div key={anomaly.id} className={`border-l-4 pl-4 py-3 rounded-r ${getSeverityColor(anomaly.severity)}`}>
              <div className="flex items-start gap-3">
                {getIcon(anomaly.severity)}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm text-balance">{anomaly.metricName}</span>
                    <span className="text-xs text-muted-foreground">{anomaly.timestamp.toLocaleTimeString()}</span>
                  </div>
                  <p className="text-xs text-muted-foreground text-pretty">
                    Deviation of {anomaly.deviation.toFixed(1)}% detected with {anomaly.confidence.toFixed(0)}%
                    confidence
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
