# Security Headers Documentation

This document describes the HTTP security headers configured for the Modern Dashboard application.

## Configured Security Headers

### 1. Strict-Transport-Security (HSTS)
**Value:** `max-age=31536000; includeSubDomains`

**Purpose:** Forces browsers to use HTTPS connections exclusively, preventing protocol downgrade attacks and cookie hijacking.

**Configuration:**
- `max-age=31536000` (1 year): Tells browsers to remember to use HTTPS for 1 year
- `includeSubDomains`: Applies HSTS to all subdomains
- **Note:** Does NOT include `preload` directive for safety. Adding `preload` requires careful consideration as it's difficult to remove once enabled. See https://hstspreload.org/ for details.

### 2. X-XSS-Protection
**Value:** `1; mode=block`

**Purpose:** Enables browser-level XSS protection (defense in depth for older browsers).

**Configuration:**
- `1`: Enable XSS filtering
- `mode=block`: Block rendering if XSS attack detected

**Note:** Modern browsers rely on Content-Security-Policy (CSP) instead, but this header provides additional protection for legacy browsers.

### 3. Cache-Control for HTML Pages
**Value:** `public, max-age=0, must-revalidate`

**Purpose:** Prevents inappropriate caching of HTML pages while allowing proper caching of static assets.

**Configuration:**
- Applied to all routes via `/:path*` source pattern
- `public`: Response can be cached by any cache
- `max-age=0`: Content expires immediately
- `must-revalidate`: Must check with server before using cached copy

**Static Assets:** Static files (images, fonts, etc.) use aggressive caching: `public, max-age=31536000, immutable`

### 4. Other Security Headers (Previously Configured)
- **X-Frame-Options:** `DENY` - Prevents clickjacking attacks
- **X-Content-Type-Options:** `nosniff` - Prevents MIME-sniffing
- **Referrer-Policy:** `origin-when-cross-origin` - Controls referrer information
- **Permissions-Policy:** Disables camera, microphone, geolocation, browsing-topics
- **Content-Security-Policy:** Comprehensive CSP configuration (see `src/lib/security.ts`)
- **X-DNS-Prefetch-Control:** `on` - Enables DNS prefetching for performance

## Testing Security Headers

### Option 1: Online Security Scanners
1. **Security Headers:** https://securityheaders.com/
   - Enter your domain after deployment
   - Target: Grade A or higher

2. **Mozilla Observatory:** https://observatory.mozilla.org/
   - Comprehensive security analysis
   - Target: A+ rating

### Option 2: Manual Testing with cURL
```bash
# Test production deployment
curl -I https://yourdomain.com

# Look for these headers in the response:
# Strict-Transport-Security: max-age=31536000; includeSubDomains
# X-XSS-Protection: 1; mode=block
# Cache-Control: public, max-age=0, must-revalidate
# X-Frame-Options: DENY
# X-Content-Type-Options: nosniff
# Content-Security-Policy: ...
```

### Option 3: Browser DevTools
1. Open your application in the browser
2. Open Developer Tools (F12)
3. Go to Network tab
4. Refresh the page
5. Click on the main document request
6. Check "Response Headers" section
7. Verify all security headers are present

### Option 4: Local Testing
```bash
# Build and start production server
npm run build
npm start

# In another terminal, test the headers
curl -I http://localhost:3000

# Or test with a specific page
curl -I http://localhost:3000/analytics
```

## Security Considerations

### HSTS Preload
The current configuration does NOT include the `preload` directive. Before adding preload:
1. Ensure HTTPS works on ALL subdomains
2. Have valid SSL certificates in place
3. Understand that preload is difficult to remove
4. Submit to https://hstspreload.org/ only after testing

To enable preload, update `next.config.ts`:
```typescript
{
  key: 'Strict-Transport-Security',
  value: 'max-age=63072000; includeSubDomains; preload', // 2 years + preload
}
```

### X-XSS-Protection Deprecation
While `X-XSS-Protection` is considered legacy (Chrome deprecated it in 2019), it provides defense-in-depth protection for older browsers. Modern security relies on Content-Security-Policy.

### Cache-Control Precedence
Headers are processed in order. The static asset cache rule comes after the HTML cache rule, so static files get the correct long-term caching while HTML pages are always revalidated.

## Resources
- [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/)
- [Mozilla Web Security Guidelines](https://infosec.mozilla.org/guidelines/web_security)
- [Next.js Security Headers Docs](https://nextjs.org/docs/advanced-features/security-headers)
- [HSTS Preload List](https://hstspreload.org/)

## Compliance
These headers help meet requirements for:
- ✅ OWASP Application Security Verification Standard (ASVS)
- ✅ PCI DSS compliance
- ✅ SOC 2 security controls
- ✅ General security best practices
