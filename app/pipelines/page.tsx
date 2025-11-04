"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, CheckCircle2, XCircle, Clock, Database, GitBranch, TrendingUp } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"

interface PipelineRun {
  id: string
  name: string
  status: "running" | "success" | "failed" | "idle"
  lastRun?: Date
  duration?: number
  recordsProcessed?: number
}

export default function PipelinesPage() {
  const [pipelines, setPipelines] = useState<PipelineRun[]>([
    {
      id: "etl-trade",
      name: "Trade Data Ingestion",
      status: "idle",
      lastRun: new Date(Date.now() - 3600000),
      duration: 245,
      recordsProcessed: 4523,
    },
    {
      id: "reconciliation",
      name: "Reconciliation Process",
      status: "idle",
      lastRun: new Date(Date.now() - 1800000),
      duration: 180,
      recordsProcessed: 1000,
    },
    {
      id: "risk-calc",
      name: "Risk Metrics Calculation",
      status: "idle",
      lastRun: new Date(Date.now() - 7200000),
      duration: 120,
      recordsProcessed: 100,
    },
  ])

  const runPipeline = async (pipelineId: string) => {
    setPipelines((prev) => prev.map((p) => (p.id === pipelineId ? { ...p, status: "running" as const } : p)))

    // Simulate pipeline execution
    setTimeout(() => {
      setPipelines((prev) =>
        prev.map((p) =>
          p.id === pipelineId
            ? {
                ...p,
                status: Math.random() > 0.1 ? ("success" as const) : ("failed" as const),
                lastRun: new Date(),
                duration: Math.floor(Math.random() * 200) + 100,
                recordsProcessed: Math.floor(Math.random() * 5000) + 1000,
              }
            : p,
        ),
      )
    }, 3000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running":
        return <Clock className="h-5 w-5 animate-spin text-primary" />
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-success" />
      case "failed":
        return <XCircle className="h-5 w-5 text-destructive" />
      default:
        return <Database className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      running: "default",
      success: "secondary",
      failed: "destructive",
      idle: "outline",
    }
    return <Badge variant={variants[status]}>{status.toUpperCase()}</Badge>
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="p-6 space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-balance">Data Pipelines</h2>
          <p className="text-muted-foreground mt-2">Automated ETL processes and data workflows</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pipelines.map((pipeline) => (
            <Card key={pipeline.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(pipeline.status)}
                    <div>
                      <CardTitle className="text-lg text-balance">{pipeline.name}</CardTitle>
                      <CardDescription className="mt-1">{pipeline.id}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  {getStatusBadge(pipeline.status)}
                </div>

                {pipeline.lastRun && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Last Run</span>
                      <span className="text-sm font-medium">{pipeline.lastRun.toLocaleTimeString()}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Duration</span>
                      <span className="text-sm font-medium">{pipeline.duration}s</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Records</span>
                      <span className="text-sm font-medium">{pipeline.recordsProcessed?.toLocaleString()}</span>
                    </div>
                  </>
                )}

                <Button
                  className="w-full"
                  onClick={() => runPipeline(pipeline.id)}
                  disabled={pipeline.status === "running"}
                >
                  <Play className="h-4 w-4 mr-2" />
                  {pipeline.status === "running" ? "Running..." : "Run Pipeline"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-balance">Pipeline Architecture</CardTitle>
            <CardDescription>Data flow and processing stages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-chart-1" />
                <div>
                  <div className="font-medium">Source Systems</div>
                  <div className="text-xs text-muted-foreground">Bloomberg, Reuters, FIX</div>
                </div>
              </div>

              <GitBranch className="h-5 w-5 text-muted-foreground rotate-90" />

              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-chart-2" />
                <div>
                  <div className="font-medium">ETL Processing</div>
                  <div className="text-xs text-muted-foreground">Extract, Transform, Load</div>
                </div>
              </div>

              <GitBranch className="h-5 w-5 text-muted-foreground rotate-90" />

              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-chart-3" />
                <div>
                  <div className="font-medium">Data Warehouse</div>
                  <div className="text-xs text-muted-foreground">Centralized storage</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
