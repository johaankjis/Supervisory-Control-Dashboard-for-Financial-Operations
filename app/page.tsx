"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { KPICard } from "@/components/kpi-card"
import { AlertBanner } from "@/components/alert-banner"
import { TradeVolumeChart } from "@/components/trade-volume-chart"
import { ReconciliationTrendChart } from "@/components/reconciliation-trend-chart"
import { ExceptionBreakdown } from "@/components/exception-breakdown"
import { TrendingUp, CheckCircle2, AlertTriangle, Clock, Activity, Shield } from "lucide-react"
import {
  getCurrentKPIs,
  getTradeVolumeByProduct,
  getReconciliationTrend,
  getExceptionsByCategory,
  detectAnomalies,
} from "@/lib/analytics"
import { dataStore } from "@/lib/mock-data"

export default function DashboardPage() {
  const [kpis, setKpis] = useState(getCurrentKPIs())
  const [tradeVolumes, setTradeVolumes] = useState(getTradeVolumeByProduct())
  const [reconciliationTrend, setReconciliationTrend] = useState(getReconciliationTrend(7))
  const [exceptions, setExceptions] = useState(getExceptionsByCategory())
  const [anomalies, setAnomalies] = useState(detectAnomalies())
  const [lastUpdate, setLastUpdate] = useState(new Date())

  const refreshData = () => {
    dataStore.refresh()
    setKpis(getCurrentKPIs())
    setTradeVolumes(getTradeVolumeByProduct())
    setReconciliationTrend(getReconciliationTrend(7))
    setExceptions(getExceptionsByCategory())
    setAnomalies(detectAnomalies())
    setLastUpdate(new Date())
  }

  useEffect(() => {
    // Auto-refresh every 30 seconds
    const interval = setInterval(refreshData, 30000)
    return () => clearInterval(interval)
  }, [])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value)
  }

  const criticalAnomalies = anomalies.filter((a) => a.severity === "high")

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader onRefresh={refreshData} />
      <Navigation />

      <main className="p-6 space-y-6">
        {/* Critical Alerts */}
        {criticalAnomalies.length > 0 && (
          <div className="space-y-2">
            {criticalAnomalies.slice(0, 2).map((anomaly) => (
              <AlertBanner
                key={anomaly.id}
                severity="critical"
                title={`Anomaly Detected: ${anomaly.metricName}`}
                description={`Expected ${formatNumber(anomaly.expectedValue)}, actual ${formatNumber(anomaly.actualValue)} (${anomaly.deviation.toFixed(1)}% deviation)`}
                timestamp={anomaly.timestamp}
              />
            ))}
          </div>
        )}

        {kpis.criticalAlerts > 0 && (
          <AlertBanner
            severity="warning"
            title={`${kpis.criticalAlerts} Critical Alert${kpis.criticalAlerts > 1 ? "s" : ""} Require Attention`}
            description="Review exception dashboard for details and assign resolution tasks."
          />
        )}

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <KPICard
            title="Trade Volume"
            value={formatCurrency(kpis.totalTradeVolume)}
            change={2.5}
            changeLabel="vs yesterday"
            trend="up"
            status="success"
            icon={<TrendingUp className="h-4 w-4" />}
            subtitle="Total daily volume"
          />

          <KPICard
            title="Reconciliation Rate"
            value={`${kpis.reconciliationRate.toFixed(2)}%`}
            change={0.3}
            changeLabel="vs yesterday"
            trend="up"
            status={kpis.reconciliationRate >= 95 ? "success" : "warning"}
            icon={<CheckCircle2 className="h-4 w-4" />}
            subtitle="Target: 95%"
          />

          <KPICard
            title="Exception Rate"
            value={`${kpis.exceptionRate.toFixed(2)}%`}
            change={-0.5}
            changeLabel="vs yesterday"
            trend="down"
            status={kpis.exceptionRate < 2 ? "success" : "warning"}
            icon={<AlertTriangle className="h-4 w-4" />}
            subtitle="Lower is better"
          />

          <KPICard
            title="Avg Processing Time"
            value={`${Math.round(kpis.avgProcessingTime)}s`}
            change={-5.2}
            changeLabel="vs yesterday"
            trend="down"
            status="success"
            icon={<Clock className="h-4 w-4" />}
            subtitle="All processes"
          />

          <KPICard
            title="Critical Alerts"
            value={kpis.criticalAlerts}
            status={kpis.criticalAlerts === 0 ? "success" : "error"}
            icon={<Activity className="h-4 w-4" />}
            subtitle="Requires immediate action"
          />

          <KPICard
            title="System Health"
            value={`${kpis.systemHealth.toFixed(1)}%`}
            change={0.2}
            changeLabel="vs yesterday"
            trend="up"
            status={kpis.systemHealth >= 95 ? "success" : "warning"}
            icon={<Shield className="h-4 w-4" />}
            subtitle="Overall system status"
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid gap-4 md:grid-cols-2">
          <TradeVolumeChart data={tradeVolumes} />
          <ReconciliationTrendChart data={reconciliationTrend} />
        </div>

        {/* Charts Row 2 */}
        <div className="grid gap-4 md:grid-cols-2">
          <ExceptionBreakdown data={exceptions} />

          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">Last updated: {lastUpdate.toLocaleTimeString()}</div>
          </div>
        </div>
      </main>
    </div>
  )
}
