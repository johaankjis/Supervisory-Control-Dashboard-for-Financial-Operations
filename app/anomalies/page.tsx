"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { AnomalyCard } from "@/components/anomaly-card"
import { AnomalyTimeline } from "@/components/anomaly-timeline"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { detectAnomalies } from "@/lib/analytics"
import { dataStore } from "@/lib/mock-data"
import { AlertTriangle, CheckCircle2, Activity, RefreshCw } from "lucide-react"

export default function AnomaliesPage() {
  const [anomalies, setAnomalies] = useState(detectAnomalies())
  const [isRefreshing, setIsRefreshing] = useState(false)

  const refreshData = () => {
    setIsRefreshing(true)
    dataStore.refresh()
    setAnomalies(detectAnomalies())
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  useEffect(() => {
    const interval = setInterval(refreshData, 60000) // Refresh every minute
    return () => clearInterval(interval)
  }, [])

  const criticalCount = anomalies.filter((a) => a.severity === "high").length
  const mediumCount = anomalies.filter((a) => a.severity === "medium").length
  const lowCount = anomalies.filter((a) => a.severity === "low").length

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader onRefresh={refreshData} />

      <main className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-balance">Anomaly Detection</h2>
            <p className="text-muted-foreground mt-2">Real-time monitoring and alerting for unusual patterns</p>
          </div>
          <Button variant="outline" onClick={refreshData} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Anomalies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                <span className="text-3xl font-bold">{anomalies.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">High Severity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <span className="text-3xl font-bold text-destructive">{criticalCount}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Medium Severity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <span className="text-3xl font-bold text-warning">{mediumCount}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Low Severity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <span className="text-3xl font-bold">{lowCount}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Anomaly Cards */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-balance">Detected Anomalies</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {anomalies.slice(0, 6).map((anomaly) => (
                  <AnomalyCard key={anomaly.id} anomaly={anomaly} />
                ))}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="lg:col-span-1">
            <AnomalyTimeline anomalies={anomalies} />
          </div>
        </div>

        {/* Detection Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="text-balance">Detection Methods</CardTitle>
            <CardDescription>Statistical algorithms used for anomaly detection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Statistical</Badge>
                </div>
                <h4 className="font-medium text-balance">Z-Score Analysis</h4>
                <p className="text-sm text-muted-foreground text-pretty">
                  Detects values that deviate significantly from the mean using standard deviation
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Pattern</Badge>
                </div>
                <h4 className="font-medium text-balance">Moving Average</h4>
                <p className="text-sm text-muted-foreground text-pretty">
                  Identifies breaks in historical patterns using rolling window analysis
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Temporal</Badge>
                </div>
                <h4 className="font-medium text-balance">Rate of Change</h4>
                <p className="text-sm text-muted-foreground text-pretty">
                  Flags sudden spikes or drops in metric values over time
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
