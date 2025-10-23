<!--
SYNC IMPACT REPORT
==================
Version Change: INITIAL → 1.0.0
Constitution Type: New constitution created for Modern Dashboard project

Core Principles Added:
- I. Component-First Architecture
- II. Type Safety & Code Quality (NON-NEGOTIABLE)
- III. User Experience Consistency
- IV. Performance Requirements

Sections Added:
- Development Standards
- Quality Gates
- Governance

Templates Status:
✅ plan-template.md - Aligned with constitution checks
✅ spec-template.md - Aligned with acceptance criteria format
✅ tasks-template.md - Aligned with test-first and quality gates
✅ agent-file-template.md - Compatible with development guidelines
✅ checklist-template.md - Compatible with checklist format

Follow-up Actions:
- Monitor constitution effectiveness over next 3 feature implementations
- Gather feedback on performance requirements applicability
- Review type-checking enforcement in CI/CD pipeline

Suggested Commit Message:
docs: establish Modern Dashboard constitution v1.0.0 (code quality, testing, UX, performance principles)
-->

# Modern Dashboard Constitution

## Core Principles

### I. Component-First Architecture

All features MUST be implemented as reusable, composable components following these rules:

- Components MUST be wrapped in `DashboardLayout` for consistency
- Components MUST use the `cn()` utility from `src/lib/utils.ts` for conditional styling
- Components MUST follow mobile-first responsive design patterns (`sm:`, `lg:` breakpoints)
- Components MUST leverage Shadcn UI primitives over custom implementations
- Static data MUST be centralized in `src/lib/constants.ts` with `as const` assertions
- Components SHOULD be memoized when rendering expensive visualizations (charts, tables)

**Rationale**: Component-first architecture ensures consistency across the dashboard, reduces duplication, and makes the codebase maintainable as it scales. Centralized data management prevents state synchronization issues.

### II. Type Safety & Code Quality (NON-NEGOTIABLE)

TypeScript strict mode is mandatory. All code changes MUST pass these gates before merge:

- `npm run type-check` MUST pass with zero errors
- `npm run lint` MUST pass with zero errors
- All components MUST have explicit TypeScript types (no implicit `any`)
- All props interfaces MUST be exported and documented
- All data constants MUST use `as const` for literal type inference
- ESLint rules MUST NOT be disabled without documented justification

**Rationale**: Type safety prevents runtime errors, improves IDE experience, enables safe refactoring, and serves as living documentation. This is non-negotiable because type errors compound exponentially in dashboard applications with complex data flows.

### III. User Experience Consistency

User experience MUST be consistent across all features and devices:

- Theme tokens MUST use CSS custom properties: `hsl(var(--primary))`, `hsl(var(--chart-1))`, etc.
- Dark mode MUST be fully supported via `next-themes` provider
- Navigation MUST be defined in `dashboard-layout.tsx` with Lucide icons
- Loading states MUST be handled with appropriate feedback (skeletons, spinners)
- Error boundaries MUST wrap components that fetch data or perform risky operations
- Mobile behavior MUST match desktop functionality (no feature gaps)
- Sidebar MUST maintain collapse state and animate smoothly (300ms transitions)

**Rationale**: Dashboard applications serve diverse users in varying contexts. Consistent UX reduces cognitive load, builds trust, and ensures accessibility across devices and environments.

### IV. Performance Requirements

Performance is a feature. All implementations MUST meet these benchmarks:

- **Initial page load**: < 3 seconds on 3G network
- **Time to Interactive**: < 5 seconds on 3G network
- **Chart rendering**: < 500ms for datasets up to 1000 points
- **Type checking**: `npm run type-check` completes in < 30 seconds
- **Bundle size**: New features MUST NOT increase main bundle by > 50KB uncompressed
- **Lighthouse score**: Maintain ≥ 90 for Performance, Accessibility, Best Practices

Performance testing MUST include:
- Chrome DevTools performance profiling for interactions
- Lighthouse CI integration for automated monitoring
- Bundle analysis for new dependencies (`npm run build:analyze`)

**Rationale**: Dashboard users expect snappy interactions with large datasets. Performance degradation compounds with feature growth. Early enforcement prevents technical debt.

## Development Standards

### Code Organization

- **Pages**: `src/app/[route]/page.tsx` - each route in separate directory
- **Reusable UI**: `src/components/ui/` - Shadcn components only
- **Layout Components**: `src/components/` - dashboard-specific wrappers
- **Data**: `src/lib/constants.ts` - centralized static data with types
- **Utilities**: `src/lib/utils.ts` - shared helpers (must have tests if complex logic)

### Styling Standards

- Use Tailwind utility classes exclusively (no custom CSS unless absolutely necessary)
- Follow responsive pattern: `base mobile → sm: → lg:`
- Grid layouts: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
- Icon sizing: `h-4 w-4` (small), `h-6 w-6` (standard), `h-8 w-8` (large)
- Spacing: Prefer Tailwind spacing scale over arbitrary values

### Component Standards

- Use Lucide React for all icons
- Memoize expensive components: charts, large lists, complex calculations
- Extract reusable patterns to `src/components/ui/` via Shadcn
- Document complex components with JSDoc comments
- Use `React.memo()` judiciously (profile first, optimize based on data)

### Data Management Standards

- Chart data MUST be typed and stored in `src/lib/constants.ts`
- API data MUST be validated with explicit type guards
- State management MUST use React hooks (Context for global, useState/useReducer for local)
- No client-side data fetching without loading states and error boundaries

## Quality Gates

All features MUST pass these gates in sequence:

### Gate 1: Pre-Development (Required before coding)

- [ ] Feature has documented user scenarios with acceptance criteria
- [ ] Component structure is defined (files, props, data flow)
- [ ] Data requirements are identified (static, API, computed)
- [ ] Performance implications are assessed (bundle size, rendering complexity)
- [ ] Constitution compliance is reviewed

### Gate 2: Implementation (Required during development)

- [ ] TypeScript types are defined before implementation
- [ ] Components are built incrementally with hot reload validation
- [ ] Console errors/warnings are addressed immediately
- [ ] Mobile responsiveness is tested during development (not after)
- [ ] Theme tokens are used (no hardcoded colors)

### Gate 3: Pre-Commit (Required before commit)

- [ ] `npm run type-check` passes
- [ ] `npm run lint:fix` applied and verified
- [ ] Manual testing in both light and dark modes
- [ ] Manual testing on mobile viewport (DevTools or device)
- [ ] No console errors in browser DevTools

### Gate 4: Pre-Merge (Required before PR approval)

- [ ] All Quality Gates 1-3 documented as passing
- [ ] Performance benchmarks met (Lighthouse, bundle size)
- [ ] Accessibility scan passes (no critical issues)
- [ ] Cross-browser testing (Chrome, Safari, Firefox minimum)
- [ ] Documentation updated (README, copilot-instructions.md if architecture changes)

## Governance

### Authority

This constitution supersedes all other development practices. When conflicts arise between this document and other guidance, this constitution takes precedence.

### Amendment Process

Constitution amendments require:

1. **Proposal**: Document the change rationale, impacted principles, and migration plan
2. **Review**: Assess impact on existing features and templates
3. **Approval**: Maintainer sign-off required
4. **Migration**: Update all templates in `.specify/templates/` to reflect changes
5. **Communication**: Update `copilot-instructions.md` and team documentation

### Versioning Policy

Version format: `MAJOR.MINOR.PATCH`

- **MAJOR**: Breaking changes to principles (e.g., changing type safety requirements)
- **MINOR**: New principles added or significant expansions
- **PATCH**: Clarifications, examples, wording improvements

### Compliance Review

- Every feature implementation plan MUST include a "Constitution Check" section
- Every PR review MUST verify compliance with applicable principles
- Violations MUST be documented and justified before approval
- Repeated violations trigger constitution review (adjust or enforce)

### Runtime Development Guidance

For day-to-day development patterns, refer to `.github/copilot-instructions.md`. The instructions file provides tactical guidance while this constitution defines strategic principles.

**Version**: 1.0.0 | **Ratified**: 2025-10-23 | **Last Amended**: 2025-10-23
