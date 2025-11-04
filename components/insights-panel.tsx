import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react"

interface InsightsPanelProps {
  highlights: string[]
  issues: string[]
  recommendations: string[]
}

export function InsightsPanel({ highlights, issues, recommendations }: InsightsPanelProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-success text-balance">
            <CheckCircle2 className="h-5 w-5" />
            Key Highlights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {highlights.map((highlight, index) => (
              <li key={index} className="text-sm text-pretty flex items-start gap-2">
                <span className="text-success mt-0.5">•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive text-balance">
            <AlertTriangle className="h-5 w-5" />
            Critical Issues
          </CardTitle>
        </CardHeader>
        <CardContent>
          {issues.length > 0 ? (
            <ul className="space-y-2">
              {issues.map((issue, index) => (
                <li key={index} className="text-sm text-pretty flex items-start gap-2">
                  <span className="text-destructive mt-0.5">•</span>
                  <span>{issue}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No critical issues detected</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary text-balance">
            <Lightbulb className="h-5 w-5" />
            Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {recommendations.map((rec, index) => (
              <li key={index} className="text-sm text-pretty flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
