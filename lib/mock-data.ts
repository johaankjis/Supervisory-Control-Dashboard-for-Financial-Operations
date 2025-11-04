import type {
  TradeVolume,
  ReconciliationRecord,
  Exception,
  ProcessingMetric,
  RiskMetric,
  KPISummary,
  AnomalyDetection,
} from "./types"

// Generate realistic mock data for the dashboard

export function generateTradeVolumes(days = 30): TradeVolume[] {
  const volumes: TradeVolume[] = []
  const productTypes: Array<"equities" | "fixed-income" | "derivatives" | "fx"> = [
    "equities",
    "fixed-income",
    "derivatives",
    "fx",
  ]

  for (let i = 0; i < days; i++) {
    const date = new Date()
    date.setDate(date.getDate() - i)

    productTypes.forEach((productType) => {
      const baseVolume = {
        equities: 50000000,
        "fixed-income": 30000000,
        derivatives: 20000000,
        fx: 40000000,
      }[productType]

      const variance = 0.15 // 15% variance
      const volume = baseVolume * (1 + (Math.random() - 0.5) * variance)

      volumes.push({
        id: `tv-${date.toISOString()}-${productType}`,
        date,
        productType,
        volume,
        value: volume * (Math.random() * 50 + 100), // Price per unit
        tradeCount: Math.floor(volume / (Math.random() * 10000 + 5000)),
      })
    })
  }

  return volumes
}

export function generateReconciliationRecords(count = 1000): ReconciliationRecord[] {
  const records: ReconciliationRecord[] = []
  const statuses: Array<"matched" | "unmatched" | "pending"> = ["matched", "unmatched", "pending"]
  const currencies = ["USD", "EUR", "GBP", "JPY"]

  for (let i = 0; i < count; i++) {
    const date = new Date()
    date.setHours(date.getHours() - Math.floor(Math.random() * 72))

    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const amount = Math.random() * 1000000 + 10000

    const record: ReconciliationRecord = {
      id: `rec-${i}`,
      date,
      accountId: `ACC${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(6, "0")}`,
      status,
      amount,
      currency: currencies[Math.floor(Math.random() * currencies.length)],
    }

    if (status === "unmatched") {
      record.discrepancy = (Math.random() - 0.5) * amount * 0.01 // Small discrepancy
    }

    if (status === "matched" && Math.random() > 0.5) {
      record.resolvedAt = new Date(date.getTime() + Math.random() * 3600000)
    }

    records.push(record)
  }

  return records
}

export function generateExceptions(count = 50): Exception[] {
  const exceptions: Exception[] = []
  const categories: Array<"settlement-fail" | "pricing-error" | "data-quality" | "compliance" | "operational"> = [
    "settlement-fail",
    "pricing-error",
    "data-quality",
    "compliance",
    "operational",
  ]
  const severities: Array<"low" | "medium" | "high" | "critical"> = ["low", "medium", "high", "critical"]
  const statuses: Array<"open" | "investigating" | "resolved"> = ["open", "investigating", "resolved"]

  const descriptions = {
    "settlement-fail": "Trade settlement failed due to insufficient funds",
    "pricing-error": "Pricing discrepancy detected in market data feed",
    "data-quality": "Missing or invalid data in trade records",
    compliance: "Regulatory reporting threshold exceeded",
    operational: "System processing delay detected",
  }

  for (let i = 0; i < count; i++) {
    const timestamp = new Date()
    timestamp.setHours(timestamp.getHours() - Math.floor(Math.random() * 168)) // Last week

    const category = categories[Math.floor(Math.random() * categories.length)]
    const severity = severities[Math.floor(Math.random() * severities.length)]

    exceptions.push({
      id: `exc-${i}`,
      timestamp,
      category,
      severity,
      description: descriptions[category],
      affectedTrades: Math.floor(Math.random() * 100) + 1,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      assignedTo: Math.random() > 0.3 ? `analyst-${Math.floor(Math.random() * 10)}` : undefined,
    })
  }

  return exceptions
}

export function generateProcessingMetrics(hours = 24): ProcessingMetric[] {
  const metrics: ProcessingMetric[] = []
  const processes = [
    "Trade Ingestion",
    "Position Calculation",
    "Risk Analytics",
    "Reconciliation",
    "Regulatory Reporting",
  ]

  for (let i = 0; i < hours; i++) {
    const timestamp = new Date()
    timestamp.setHours(timestamp.getHours() - i)

    processes.forEach((processName) => {
      const baseDuration = {
        "Trade Ingestion": 300,
        "Position Calculation": 600,
        "Risk Analytics": 900,
        Reconciliation: 1200,
        "Regulatory Reporting": 450,
      }[processName]

      const duration = baseDuration * (1 + (Math.random() - 0.5) * 0.3)
      const recordsProcessed = Math.floor(Math.random() * 50000) + 10000
      const status = Math.random() > 0.05 ? "success" : Math.random() > 0.5 ? "partial" : "failed"

      metrics.push({
        id: `pm-${timestamp.toISOString()}-${processName}`,
        timestamp,
        processName,
        duration,
        recordsProcessed,
        status,
        errorCount: status === "success" ? 0 : Math.floor(Math.random() * 10),
      })
    })
  }

  return metrics
}

export function generateRiskMetrics(count = 100): RiskMetric[] {
  const metrics: RiskMetric[] = []
  const metricTypes: Array<"var" | "credit-exposure" | "liquidity" | "operational"> = [
    "var",
    "credit-exposure",
    "liquidity",
    "operational",
  ]

  for (let i = 0; i < count; i++) {
    const timestamp = new Date()
    timestamp.setMinutes(timestamp.getMinutes() - i * 15) // Every 15 minutes

    metricTypes.forEach((metricType) => {
      const baseValue = {
        var: 5000000,
        "credit-exposure": 10000000,
        liquidity: 50000000,
        operational: 1000000,
      }[metricType]

      const threshold = baseValue * 1.2
      const value = baseValue * (1 + (Math.random() - 0.5) * 0.4)

      let status: "normal" | "warning" | "breach" = "normal"
      if (value > threshold) status = "breach"
      else if (value > threshold * 0.9) status = "warning"

      metrics.push({
        id: `rm-${timestamp.toISOString()}-${metricType}`,
        timestamp,
        metricType,
        value,
        threshold,
        status,
      })
    })
  }

  return metrics
}

export function generateKPISummary(days = 30): KPISummary[] {
  const summaries: KPISummary[] = []

  for (let i = 0; i < days; i++) {
    const date = new Date()
    date.setDate(date.getDate() - i)

    summaries.push({
      date,
      totalTradeVolume: Math.random() * 200000000 + 100000000,
      reconciliationRate: Math.random() * 5 + 95, // 95-100%
      exceptionRate: Math.random() * 2 + 0.5, // 0.5-2.5%
      avgProcessingTime: Math.random() * 300 + 600, // 600-900 seconds
      criticalAlerts: Math.floor(Math.random() * 5),
      systemHealth: Math.random() * 10 + 90, // 90-100%
    })
  }

  return summaries
}

export function generateAnomalies(count = 20): AnomalyDetection[] {
  const anomalies: AnomalyDetection[] = []
  const metricNames = ["Trade Volume", "Reconciliation Rate", "Processing Time", "Exception Rate", "System Latency"]

  for (let i = 0; i < count; i++) {
    const timestamp = new Date()
    timestamp.setHours(timestamp.getHours() - Math.floor(Math.random() * 72))

    const metricName = metricNames[Math.floor(Math.random() * metricNames.length)]
    const expectedValue = Math.random() * 1000000
    const deviation = (Math.random() - 0.5) * 0.4 // -20% to +20%
    const actualValue = expectedValue * (1 + deviation)

    anomalies.push({
      id: `anom-${i}`,
      timestamp,
      metricName,
      expectedValue,
      actualValue,
      deviation: Math.abs(deviation) * 100,
      confidence: Math.random() * 20 + 80, // 80-100%
      severity: Math.abs(deviation) > 0.15 ? "high" : Math.abs(deviation) > 0.08 ? "medium" : "low",
    })
  }

  return anomalies
}

// Data store singleton
class DataStore {
  private static instance: DataStore

  tradeVolumes: TradeVolume[]
  reconciliationRecords: ReconciliationRecord[]
  exceptions: Exception[]
  processingMetrics: ProcessingMetric[]
  riskMetrics: RiskMetric[]
  kpiSummaries: KPISummary[]
  anomalies: AnomalyDetection[]

  private constructor() {
    this.tradeVolumes = generateTradeVolumes(30)
    this.reconciliationRecords = generateReconciliationRecords(1000)
    this.exceptions = generateExceptions(50)
    this.processingMetrics = generateProcessingMetrics(24)
    this.riskMetrics = generateRiskMetrics(100)
    this.kpiSummaries = generateKPISummary(30)
    this.anomalies = generateAnomalies(20)
  }

  static getInstance(): DataStore {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore()
    }
    return DataStore.instance
  }

  refresh() {
    this.tradeVolumes = generateTradeVolumes(30)
    this.reconciliationRecords = generateReconciliationRecords(1000)
    this.exceptions = generateExceptions(50)
    this.processingMetrics = generateProcessingMetrics(24)
    this.riskMetrics = generateRiskMetrics(100)
    this.kpiSummaries = generateKPISummary(30)
    this.anomalies = generateAnomalies(20)
  }
}

export const dataStore = DataStore.getInstance()
