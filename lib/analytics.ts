import { dataStore } from "./mock-data"
import type { KPISummary, AnomalyDetection } from "./types"

// Analytics and calculation functions

export function getCurrentKPIs(): KPISummary {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Calculate from current data
  const recentRecords = dataStore.reconciliationRecords.filter(
    (r) => r.date.getTime() > Date.now() - 24 * 60 * 60 * 1000,
  )

  const matchedCount = recentRecords.filter((r) => r.status === "matched").length
  const reconciliationRate = (matchedCount / recentRecords.length) * 100

  const recentExceptions = dataStore.exceptions.filter((e) => e.timestamp.getTime() > Date.now() - 24 * 60 * 60 * 1000)

  const criticalAlerts = recentExceptions.filter((e) => e.severity === "critical").length

  const recentMetrics = dataStore.processingMetrics.filter(
    (m) => m.timestamp.getTime() > Date.now() - 24 * 60 * 60 * 1000,
  )

  const avgProcessingTime = recentMetrics.reduce((sum, m) => sum + m.duration, 0) / recentMetrics.length

  const successRate = (recentMetrics.filter((m) => m.status === "success").length / recentMetrics.length) * 100

  const todayVolumes = dataStore.tradeVolumes.filter((v) => {
    const vDate = new Date(v.date)
    vDate.setHours(0, 0, 0, 0)
    return vDate.getTime() === today.getTime()
  })

  const totalTradeVolume = todayVolumes.reduce((sum, v) => sum + v.volume, 0)

  return {
    date: new Date(),
    totalTradeVolume,
    reconciliationRate,
    exceptionRate: (recentExceptions.length / recentRecords.length) * 100,
    avgProcessingTime,
    criticalAlerts,
    systemHealth: successRate,
  }
}

export function detectAnomalies(): AnomalyDetection[] {
  return dataStore.anomalies
    .filter((a) => a.timestamp.getTime() > Date.now() - 24 * 60 * 60 * 1000)
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}

export function getExceptionsByCategory() {
  const categories = ["settlement-fail", "pricing-error", "data-quality", "compliance", "operational"]
  return categories.map((category) => ({
    category,
    count: dataStore.exceptions.filter((e) => e.category === category).length,
    critical: dataStore.exceptions.filter((e) => e.category === category && e.severity === "critical").length,
  }))
}

export function getReconciliationTrend(days = 7) {
  const trend = []
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    date.setHours(0, 0, 0, 0)

    const dayRecords = dataStore.reconciliationRecords.filter((r) => {
      const rDate = new Date(r.date)
      rDate.setHours(0, 0, 0, 0)
      return rDate.getTime() === date.getTime()
    })

    const matched = dayRecords.filter((r) => r.status === "matched").length
    const rate = dayRecords.length > 0 ? (matched / dayRecords.length) * 100 : 0

    trend.push({
      date: date.toISOString().split("T")[0],
      rate,
      total: dayRecords.length,
    })
  }

  return trend
}

export function getTradeVolumeByProduct() {
  const products = ["equities", "fixed-income", "derivatives", "fx"]
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return products.map((product) => {
    const volumes = dataStore.tradeVolumes.filter((v) => {
      const vDate = new Date(v.date)
      vDate.setHours(0, 0, 0, 0)
      return v.productType === product && vDate.getTime() === today.getTime()
    })

    const totalVolume = volumes.reduce((sum, v) => sum + v.volume, 0)
    const totalValue = volumes.reduce((sum, v) => sum + v.value, 0)

    return {
      product,
      volume: totalVolume,
      value: totalValue,
    }
  })
}
