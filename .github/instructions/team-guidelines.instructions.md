applyTo: '**'
---

When reviewing code, focus on:

## Security Critical Issues

- Check for hardcoded secrets, API keys, or credentials  
- Look for SQL injection and XSS vulnerabilities  
- Verify proper input validation and sanitization  
- Review authentication and authorization logic  
- Ensure sensitive data (PII, tokens) is encrypted at rest and in transit  
- Confirm use of parameterized queries or ORM-safe methods  
- Validate correct handling of JWTs, cookies, and CSRF tokens  
- Check for proper error handling (no sensitive info in error messages)  
- Ensure dependencies are up-to-date and free from known vulnerabilities  
- Review secure storage and transmission of passwords (hashing/salting)  
- Verify least privilege principles are applied in service accounts and APIs  
- Confirm no use of insecure protocols (HTTP, FTP, etc.) where HTTPS/SFTP is expected  

---

## Performance Red Flags

- Identify N+1 database query problems  
- Spot inefficient loops and algorithmic issues  
- Check for memory leaks and resource cleanup  
- Review caching opportunities for expensive operations  
- Evaluate async vs sync logic — ensure no blocking on main threads  
- Look for redundant network calls or data fetching patterns  
- Ensure proper pagination or lazy loading for large datasets  
- Validate use of streaming or chunking for large file I/O  
- Review performance of logging — avoid excessive verbosity in loops  
- Check if data structures and collections are optimal for use case  
- Verify appropriate indexing and query optimization on databases  
- Ensure third-party API calls are batched or rate-limit aware

---

## Code Quality Essentials

- Functions should be focused and appropriately sized  
- Use clean, descriptive naming conventions  
- Ensure consistent code formatting and style (linting, spacing, braces)  
- Avoid duplicate logic; extract reusable functions or modules  
- Validate adherence to SOLID and DRY principles  
- Maintain clear separation of concerns between layers or components  
- Ensure adequate unit and integration test coverage  
- Review error handling and logging for clarity and completeness  
- Prefer dependency injection over hardcoded dependencies  
- Use constants or enums instead of magic numbers or strings  
- Verify that comments add value and don’t restate the obvious  
- Confirm that configuration, environment, and secrets are handled externally  
- Check for adherence to project-specific coding standards or style guides  
- Ensure functions and classes have single, well-defined responsibilities  
- Review for readability — avoid deep nesting or overly complex logic  
- Verify that new code includes proper documentation or inline rationale  
- Confirm that public APIs and interfaces are stable, clear, and versioned appropriately