"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { ExecutiveSummaryCard } from "@/components/executive-summary-card"
import { InsightsPanel } from "@/components/insights-panel"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, FileSpreadsheet, Calendar } from "lucide-react"
import { generateExecutiveReport, exportReportAsJSON, exportReportAsCSV } from "@/lib/report-generator"

export default function ReportsPage() {
  const [report] = useState(generateExecutiveReport())

  const downloadReport = (format: "json" | "csv") => {
    let content: string
    let filename: string
    let mimeType: string

    if (format === "json") {
      content = exportReportAsJSON(report)
      filename = `executive-report-${report.reportDate.toISOString().split("T")[0]}.json`
      mimeType = "application/json"
    } else {
      content = exportReportAsCSV(report)
      filename = `executive-report-${report.reportDate.toISOString().split("T")[0]}.csv`
      mimeType = "text/csv"
    }

    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const getHealthColor = (health: number) => {
    if (health >= 90) return "text-success"
    if (health >= 70) return "text-warning"
    return "text-destructive"
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-balance">Executive Report</h2>
            <p className="text-muted-foreground mt-2">Comprehensive operational summary and insights</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => downloadReport("csv")}>
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="outline" onClick={() => downloadReport("json")}>
              <FileText className="h-4 w-4 mr-2" />
              Export JSON
            </Button>
          </div>
        </div>

        {/* Report Metadata */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {report.reportDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <Badge variant="outline">{report.period}</Badge>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Overall Health:</span>
                <span className={`text-3xl font-bold ${getHealthColor(report.summary.overallHealth)}`}>
                  {report.summary.overallHealth.toFixed(1)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KPI Summary */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-balance">Key Performance Indicators</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <ExecutiveSummaryCard
              title="Trade Volume"
              value={formatCurrency(report.kpis.tradeVolume.value)}
              trend={report.kpis.tradeVolume.trend as any}
              status={report.kpis.tradeVolume.status as any}
              subtitle="Total daily volume"
            />
            <ExecutiveSummaryCard
              title="Reconciliation Rate"
              value={`${report.kpis.reconciliationRate.value.toFixed(2)}%`}
              trend={report.kpis.reconciliationRate.trend as any}
              status={report.kpis.reconciliationRate.status as any}
              subtitle="Target: 95%"
            />
            <ExecutiveSummaryCard
              title="Exception Rate"
              value={`${report.kpis.exceptionRate.value.toFixed(2)}%`}
              trend={report.kpis.exceptionRate.trend as any}
              status={report.kpis.exceptionRate.status as any}
              subtitle="Lower is better"
            />
            <ExecutiveSummaryCard
              title="System Health"
              value={`${report.kpis.systemHealth.value.toFixed(1)}%`}
              trend={report.kpis.systemHealth.trend as any}
              status={report.kpis.systemHealth.status as any}
              subtitle="Overall system status"
            />
          </div>
        </div>

        {/* Insights */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-balance">Executive Insights</h3>
          <InsightsPanel
            highlights={report.summary.keyHighlights}
            issues={report.summary.criticalIssues}
            recommendations={report.summary.recommendations}
          />
        </div>

        {/* Risk & Operational Metrics */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-balance">Risk Metrics</CardTitle>
              <CardDescription>Current risk exposure and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Critical Alerts</span>
                <span className="text-2xl font-bold text-destructive">{report.riskMetrics.criticalAlerts}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Anomalies Detected</span>
                <span className="text-2xl font-bold">{report.riskMetrics.anomaliesDetected}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">High Severity Exceptions</span>
                <span className="text-2xl font-bold text-warning">{report.riskMetrics.highSeverityExceptions}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-balance">Operational Metrics</CardTitle>
              <CardDescription>System performance indicators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Avg Processing Time</span>
                <span className="text-2xl font-bold">{Math.round(report.operationalMetrics.avgProcessingTime)}s</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Success Rate</span>
                <span className="text-2xl font-bold text-success">
                  {report.operationalMetrics.successRate.toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Data Quality</span>
                <span className="text-2xl font-bold text-success">
                  {report.operationalMetrics.dataQuality.toFixed(1)}%
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
