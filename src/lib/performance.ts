// Performance monitoring utilities
import * as React from "react"

/**
 * Web Vitals tracking
 */
export function reportWebVitals(metric: {
  id: string
  name: string
  value: number
  label: 'web-vital' | 'custom'
}) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vital] ${metric.name}:`, metric.value)
  }
  
  // In production, send to analytics service
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to Google Analytics
    // gtag('event', metric.name, {
    //   custom_parameter: metric.value,
    // })
    
    // Example: Send to custom analytics
    // fetch('/api/analytics', {
    //   method: 'POST',
    //   body: JSON.stringify(metric),
    // })
  }
}

/**
 * Performance observer for custom metrics
 */
export function observePerformance() {
  if (typeof window === 'undefined') return
  
  // Observe Long Tasks
  if ('PerformanceObserver' in window) {    try {
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.warn(`Long task detected: ${entry.duration}ms`)
        }
      })
      longTaskObserver.observe({ entryTypes: ['longtask'] })
    } catch {
      // Long task observation not supported
    }
  }
}

/**
 * Memory usage monitoring
 */
export function getMemoryUsage() {
  if (typeof window === 'undefined') return null
  
  const memory = (performance as { memory?: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number } }).memory
  
  if (memory) {
    return {
      used: Math.round(memory.usedJSHeapSize / 1048576), // MB
      total: Math.round(memory.totalJSHeapSize / 1048576), // MB
      limit: Math.round(memory.jsHeapSizeLimit / 1048576), // MB
    }
  }
  
  return null
}

/**
 * Resource timing analyzer
 */
export function analyzeResourceTiming() {
  if (typeof window === 'undefined') return []
  
  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
  
  return resources
    .filter(resource => resource.duration > 100) // Only slow resources
    .map(resource => ({
      name: resource.name,
      duration: Math.round(resource.duration),
      size: resource.transferSize,
      type: resource.initiatorType,
    }))
    .sort((a, b) => b.duration - a.duration)
}

/**
 * Component render performance tracker
 */
export function useRenderTracker(componentName: string) {
  const renderCount = React.useRef(0)
  const startTime = React.useRef<number | undefined>(undefined)
  
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      renderCount.current++
      const endTime = performance.now()
      
      if (startTime.current) {
        const renderTime = endTime - startTime.current
        console.log(`[Render] ${componentName} #${renderCount.current}: ${renderTime.toFixed(2)}ms`)
      }
      
      startTime.current = performance.now()
    }
  })
}

/**
 * Bundle size reporter (for development)
 */
export function reportBundleSize() {
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    // This would be used with webpack-bundle-analyzer
    console.log('Bundle analysis available at: http://localhost:8888')
  }
}
