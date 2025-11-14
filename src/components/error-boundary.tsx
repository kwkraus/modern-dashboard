"use client"

import * as React from "react"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { logger } from "@/lib/logger"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error | undefined
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error | undefined; resetError?: () => void }>
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logger.error('ErrorBoundary caught an error', error, errorInfo)
  }
  resetError = () => {
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return <FallbackComponent error={this.state.error} resetError={this.resetError} />
    }

    return this.props.children
  }
}

function DefaultErrorFallback({ error, resetError }: { error?: Error | undefined; resetError?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <AlertCircle className="h-12 w-12 text-destructive mb-4" />
      <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
      <p className="text-sm text-muted-foreground mb-4">
        {error?.message || "An unexpected error occurred"}
      </p>
      <Button onClick={resetError} variant="outline">
        Try again
      </Button>
    </div>
  )
}

// Loading skeleton components
export function ChartSkeleton() {
  return (
    <div className="h-[250px] sm:h-[300px] w-full animate-pulse">
      <div className="h-full bg-muted rounded-md" />
    </div>
  )
}

export function StatCardSkeleton() {
  return (
    <div className="p-6 space-y-3 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-4 bg-muted rounded w-20" />
        <div className="h-4 w-4 bg-muted rounded" />
      </div>
      <div className="h-8 bg-muted rounded w-24" />
      <div className="h-3 bg-muted rounded w-32" />
    </div>
  )
}

export function ActivitySkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 animate-pulse">
          <div className="h-9 w-9 bg-muted rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-muted rounded w-32" />
            <div className="h-3 bg-muted rounded w-48" />
          </div>
          <div className="h-3 bg-muted rounded w-16" />
        </div>
      ))}
    </div>
  )
}
