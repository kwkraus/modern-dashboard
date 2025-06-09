// Security utilities for the dashboard application

/**
 * Content Security Policy configuration
 * Restricts resource loading to prevent XSS attacks
 */
export const CSP_DIRECTIVES = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-eval'", // Required for Next.js development
    process.env.NODE_ENV === 'development' ? "'unsafe-inline'" : '',
  ].filter(Boolean),
  'style-src': ["'self'", "'unsafe-inline'"], // Required for Tailwind
  'img-src': ["'self'", "data:", "https:"],
  'font-src': ["'self'", "https:", "data:"],
  'connect-src': ["'self'"],
  'frame-ancestors': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
} as const

/**
 * Generate CSP header value from directives
 */
export function generateCSP(): string {
  return Object.entries(CSP_DIRECTIVES)
    .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
    .join('; ')
}

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim()
    .slice(0, 1000) // Limit length
}

/**
 * Validate environment variables
 */
export function validateEnv() {
  const required: string[] = [
    // Add required environment variables here
  ]
  
  const missing = required.filter(key => !process.env[key])
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}

/**
 * Rate limiting helper (client-side)
 */
export class RateLimiter {
  private timestamps: Map<string, number[]> = new Map()
  
  constructor(
    private maxRequests: number = 10,
    private windowMs: number = 60000 // 1 minute
  ) {}
  
  canMakeRequest(identifier: string): boolean {
    const now = Date.now()
    const windowStart = now - this.windowMs
    
    const timestamps = this.timestamps.get(identifier) || []
    const recentTimestamps = timestamps.filter(ts => ts > windowStart)
    
    if (recentTimestamps.length >= this.maxRequests) {
      return false
    }
    
    recentTimestamps.push(now)
    this.timestamps.set(identifier, recentTimestamps)
    
    return true
  }
}
