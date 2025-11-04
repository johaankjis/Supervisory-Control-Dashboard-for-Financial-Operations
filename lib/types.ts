// Core data types for financial operations dashboard

export interface TradeVolume {
  id: string
  date: Date
  productType: "equities" | "fixed-income" | "derivatives" | "fx"
  volume: number
  value: number
  tradeCount: number
}

export interface ReconciliationRecord {
  id: string
  date: Date
  accountId: string
  status: "matched" | "unmatched" | "pending"
  amount: number
  currency: string
  discrepancy?: number
  resolvedAt?: Date
}

export interface Exception {
  id: string
  timestamp: Date
  category: "settlement-fail" | "pricing-error" | "data-quality" | "compliance" | "operational"
  severity: "low" | "medium" | "high" | "critical"
  description: string
  affectedTrades: number
  status: "open" | "investigating" | "resolved"
  assignedTo?: string
}

export interface ProcessingMetric {
  id: string
  timestamp: Date
  processName: string
  duration: number // in seconds
  recordsProcessed: number
  status: "success" | "failed" | "partial"
  errorCount: number
}

export interface RiskMetric {
  id: string
  timestamp: Date
  metricType: "var" | "credit-exposure" | "liquidity" | "operational"
  value: number
  threshold: number
  status: "normal" | "warning" | "breach"
}

export interface KPISummary {
  date: Date
  totalTradeVolume: number
  reconciliationRate: number
  exceptionRate: number
  avgProcessingTime: number
  criticalAlerts: number
  systemHealth: number
}

export interface AnomalyDetection {
  id: string
  timestamp: Date
  metricName: string
  expectedValue: number
  actualValue: number
  deviation: number
  confidence: number
  severity: "low" | "medium" | "high"
}
