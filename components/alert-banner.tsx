import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, AlertCircle, Info, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface AlertBannerProps {
  severity: "critical" | "warning" | "info" | "success"
  title: string
  description: string
  timestamp?: Date
}

export function AlertBanner({ severity, title, description, timestamp }: AlertBannerProps) {
  const getIcon = () => {
    switch (severity) {
      case "critical":
        return <AlertCircle className="h-4 w-4" />
      case "warning":
        return <AlertTriangle className="h-4 w-4" />
      case "success":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const getVariant = () => {
    if (severity === "critical") return "destructive"
    return "default"
  }

  const getColorClass = () => {
    switch (severity) {
      case "critical":
        return "border-destructive/50 bg-destructive/10"
      case "warning":
        return "border-warning/50 bg-warning/10"
      case "success":
        return "border-success/50 bg-success/10"
      default:
        return "border-primary/50 bg-primary/10"
    }
  }

  return (
    <Alert variant={getVariant()} className={cn(getColorClass())}>
      {getIcon()}
      <AlertTitle className="text-balance">{title}</AlertTitle>
      <AlertDescription className="text-pretty">
        {description}
        {timestamp && <span className="block text-xs text-muted-foreground mt-1">{timestamp.toLocaleString()}</span>}
      </AlertDescription>
    </Alert>
  )
}
