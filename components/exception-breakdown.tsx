"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ExceptionBreakdownProps {
  data: Array<{
    category: string
    count: number
    critical: number
  }>
}

export function ExceptionBreakdown({ data }: ExceptionBreakdownProps) {
  const getCategoryLabel = (category: string) => {
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-balance">Exception Breakdown</CardTitle>
        <CardDescription>Current exceptions by category</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item) => (
            <div key={item.category} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="font-medium">{getCategoryLabel(item.category)}</div>
                {item.critical > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {item.critical} Critical
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{item.count}</span>
                <span className="text-sm text-muted-foreground">total</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
