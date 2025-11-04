"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"

interface ReconciliationTrendChartProps {
  data: Array<{
    date: string
    rate: number
    total: number
  }>
}

export function ReconciliationTrendChart({ data }: ReconciliationTrendChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-balance">Reconciliation Rate Trend</CardTitle>
        <CardDescription>7-day reconciliation success rate</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="date"
              className="text-xs"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
              tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            />
            <YAxis
              className="text-xs"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
              domain={[90, 100]}
              label={{ value: "Rate (%)", angle: -90, position: "insideLeft" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              formatter={(value: number) => [`${value.toFixed(2)}%`, "Rate"]}
            />
            <ReferenceLine y={95} stroke="hsl(var(--warning))" strokeDasharray="3 3" label="Target" />
            <Line
              type="monotone"
              dataKey="rate"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--chart-2))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
