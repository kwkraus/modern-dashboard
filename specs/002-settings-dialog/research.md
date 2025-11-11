# Research: Settings Dialog Modal

| Decision | Rationale | Alternatives Considered |
|----------|-----------|-------------------------|
| Custom focus trap hook | Single modal scope; minimal logic (capture first/last focusable, loop on Tab/Shift+Tab, restore origin focus). Reduces dependency footprint. | `focus-trap` (larger dependency), Headless UI Dialog (adds broader abstraction) |
| CSS backdrop-filter + gradient overlay | Provides modern aesthetic blur; GPU accelerated; concise implementation using Tailwind utilities and a gradient layer for visual depth. | Pseudo-element duplicate layering; Canvas/WebGL blur (overkill); static semi-transparent scrim (less visual quality) |
| Shadcn Switch component | Consistency with existing UI system; accessibility built-in; leverages design tokens; rapid integration. | Styled native checkbox; custom toggle (risk of a11y issues) |
| Ephemeral local state only | No persistence required in phase; simplest approach; avoids premature abstraction. | LocalStorage persistence; backend preference API |
| Top-right 'X' + overlay tap dismissal | Aligns with common modal patterns; ensures finger reach; meets 44px tap target spec. | Top-left only; swipe gesture (less discoverable); bottom bar close button |

No remaining unknowns; decisions reflected in implementation plan.
