import { getCurrentKPIs, getExceptionsByCategory, detectAnomalies } from "./analytics"

export interface ExecutiveReport {
  reportDate: Date
  period: string
  summary: {
    overallHealth: number
    keyHighlights: string[]
    criticalIssues: string[]
    recommendations: string[]
  }
  kpis: {
    tradeVolume: { value: number; trend: string; status: string }
    reconciliationRate: { value: number; trend: string; status: string }
    exceptionRate: { value: number; trend: string; status: string }
    systemHealth: { value: number; trend: string; status: string }
  }
  riskMetrics: {
    criticalAlerts: number
    anomaliesDetected: number
    highSeverityExceptions: number
  }
  operationalMetrics: {
    avgProcessingTime: number
    successRate: number
    dataQuality: number
  }
}

export function generateExecutiveReport(): ExecutiveReport {
  const kpis = getCurrentKPIs()
  const exceptions = getExceptionsByCategory()
  const anomalies = detectAnomalies()

  const criticalExceptions = exceptions.reduce((sum, cat) => sum + cat.critical, 0)
  const highSeverityAnomalies = anomalies.filter((a) => a.severity === "high").length

  // Calculate overall health score
  const healthFactors = [
    kpis.reconciliationRate / 100, // 0-1 scale
    Math.max(0, 1 - kpis.exceptionRate / 10), // Lower is better
    kpis.systemHealth / 100,
    Math.max(0, 1 - kpis.criticalAlerts / 10),
  ]
  const overallHealth = (healthFactors.reduce((a, b) => a + b, 0) / healthFactors.length) * 100

  // Generate insights
  const keyHighlights: string[] = []
  const criticalIssues: string[] = []
  const recommendations: string[] = []

  if (kpis.reconciliationRate >= 98) {
    keyHighlights.push(`Excellent reconciliation rate of ${kpis.reconciliationRate.toFixed(2)}% maintained`)
  } else if (kpis.reconciliationRate < 95) {
    criticalIssues.push(`Reconciliation rate below target at ${kpis.reconciliationRate.toFixed(2)}%`)
    recommendations.push("Review reconciliation processes and increase automation")
  }

  if (kpis.exceptionRate < 1.5) {
    keyHighlights.push("Exception rate within acceptable limits")
  } else {
    criticalIssues.push(`Elevated exception rate at ${kpis.exceptionRate.toFixed(2)}%`)
    recommendations.push("Investigate root causes of exceptions and implement preventive measures")
  }

  if (kpis.criticalAlerts > 0) {
    criticalIssues.push(`${kpis.criticalAlerts} critical alerts require immediate attention`)
    recommendations.push("Prioritize resolution of critical alerts and review alert thresholds")
  }

  if (highSeverityAnomalies > 5) {
    criticalIssues.push(`${highSeverityAnomalies} high-severity anomalies detected`)
    recommendations.push("Conduct detailed analysis of anomaly patterns and adjust detection sensitivity")
  }

  if (kpis.systemHealth >= 98) {
    keyHighlights.push("System health optimal with minimal downtime")
  }

  if (keyHighlights.length === 0) {
    keyHighlights.push("Operations within normal parameters")
  }

  if (recommendations.length === 0) {
    recommendations.push("Continue monitoring current operational metrics")
  }

  return {
    reportDate: new Date(),
    period: "Last 24 Hours",
    summary: {
      overallHealth,
      keyHighlights,
      criticalIssues,
      recommendations,
    },
    kpis: {
      tradeVolume: {
        value: kpis.totalTradeVolume,
        trend: "up",
        status: "healthy",
      },
      reconciliationRate: {
        value: kpis.reconciliationRate,
        trend: "stable",
        status: kpis.reconciliationRate >= 95 ? "healthy" : "warning",
      },
      exceptionRate: {
        value: kpis.exceptionRate,
        trend: "down",
        status: kpis.exceptionRate < 2 ? "healthy" : "warning",
      },
      systemHealth: {
        value: kpis.systemHealth,
        trend: "up",
        status: kpis.systemHealth >= 95 ? "healthy" : "warning",
      },
    },
    riskMetrics: {
      criticalAlerts: kpis.criticalAlerts,
      anomaliesDetected: anomalies.length,
      highSeverityExceptions: criticalExceptions,
    },
    operationalMetrics: {
      avgProcessingTime: kpis.avgProcessingTime,
      successRate: kpis.systemHealth,
      dataQuality: 98.5,
    },
  }
}

export function exportReportAsJSON(report: ExecutiveReport): string {
  return JSON.stringify(report, null, 2)
}

export function exportReportAsCSV(report: ExecutiveReport): string {
  const rows = [
    ["Metric", "Value", "Status"],
    ["Report Date", report.reportDate.toISOString(), ""],
    ["Period", report.period, ""],
    ["Overall Health", `${report.summary.overallHealth.toFixed(1)}%`, ""],
    [""],
    ["KPI Metrics", "", ""],
    ["Trade Volume", `$${report.kpis.tradeVolume.value.toLocaleString()}`, report.kpis.tradeVolume.status],
    [
      "Reconciliation Rate",
      `${report.kpis.reconciliationRate.value.toFixed(2)}%`,
      report.kpis.reconciliationRate.status,
    ],
    ["Exception Rate", `${report.kpis.exceptionRate.value.toFixed(2)}%`, report.kpis.exceptionRate.status],
    ["System Health", `${report.kpis.systemHealth.value.toFixed(1)}%`, report.kpis.systemHealth.status],
    [""],
    ["Risk Metrics", "", ""],
    ["Critical Alerts", report.riskMetrics.criticalAlerts.toString(), ""],
    ["Anomalies Detected", report.riskMetrics.anomaliesDetected.toString(), ""],
    ["High Severity Exceptions", report.riskMetrics.highSeverityExceptions.toString(), ""],
  ]

  return rows.map((row) => row.join(",")).join("\n")
}
