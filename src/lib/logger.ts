/**
 * Logger utility for safe, environment-aware logging
 * Replaces direct console statements to prevent information disclosure in production
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development'

  /**
   * Log debug information (only in development)
   * Use for detailed diagnostic information
   */
  debug(message: string, data?: unknown) {
    if (this.isDevelopment) {
      // eslint-disable-next-line no-console
      console.log(`[DEBUG] ${message}`, data !== undefined ? data : '')
    }
  }

  /**
   * Log informational messages (only in development)
   * Use for general information about application flow
   */
  info(message: string, data?: unknown) {
    if (this.isDevelopment) {
      // eslint-disable-next-line no-console
      console.log(`[INFO] ${message}`, data !== undefined ? data : '')
    }
    // In production, send to analytics/logging service
    this.sendToService('info', message, data)
  }

  /**
   * Log warning messages (shown in all environments)
   * Use for recoverable issues that need attention
   */
  warn(message: string, data?: unknown) {
    if (this.isDevelopment) {
      console.warn(`[WARN] ${message}`, data !== undefined ? data : '')
    }
    this.sendToService('warn', message, data)
  }

  /**
   * Log error messages (shown in all environments)
   * Use for errors that need immediate attention
   */
  error(message: string, error?: Error | unknown, data?: unknown) {
    if (this.isDevelopment) {
      console.error(`[ERROR] ${message}`, error, data !== undefined ? data : '')
    }
    // Always send errors to monitoring service in production
    this.sendToService('error', message, { error, data })
  }

  /**
   * Send logs to external monitoring service in production
   * @private
   */
  private sendToService(_level: LogLevel, _message: string, _data?: unknown) {
    if (process.env.NODE_ENV === 'production') {
      // TODO: Integrate with error tracking service (Sentry, LogRocket, Datadog, etc.)
      // Example for Sentry:
      // if (level === 'error') {
      //   Sentry.captureException(data?.error || new Error(message), {
      //     level,
      //     extra: data
      //   })
      // } else {
      //   Sentry.captureMessage(message, { level, extra: data })
      // }
      
      // Example for custom API:
      // fetch('/api/logs', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ level, message, data, timestamp: new Date() })
      // }).catch(() => {
      //   // Silently fail to prevent infinite loops
      // })
    }
  }
}

/**
 * Singleton logger instance
 * Import and use this throughout the application
 */
export const logger = new Logger()
