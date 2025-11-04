"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface TradeVolumeChartProps {
  data: Array<{
    product: string
    volume: number
    value: number
  }>
}

export function TradeVolumeChart({ data }: TradeVolumeChartProps) {
  const chartData = data.map((item) => ({
    name: item.product.replace("-", " ").toUpperCase(),
    volume: Math.round(item.volume / 1000000), // Convert to millions
    value: Math.round(item.value / 1000000),
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-balance">Trade Volume by Product</CardTitle>
        <CardDescription>Today's trading activity across product types</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="name" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
            <YAxis
              className="text-xs"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
              label={{ value: "Volume (M)", angle: -90, position: "insideLeft" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Bar dataKey="volume" fill="hsl(var(--chart-1))" name="Volume (M)" />
            <Bar dataKey="value" fill="hsl(var(--chart-2))" name="Value (M)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
