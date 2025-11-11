# Implementation Plan: Settings Dialog Modal

**Branch**: `002-settings-dialog` | **Date**: 2025-11-10 | **Spec**: `specs/002-settings-dialog/spec.md`
**Input**: Feature specification from `/specs/002-settings-dialog/spec.md`

## Summary

Add an accessible, responsive settings modal triggered by the header cog icon, displaying four non-functional toggle switches. Provide gradient blur overlay, focus trap, keyboard & touch dismissal (overlay tap, Escape, top-right 44px 'X'), and mobile-friendly layout. No persistence or backend integration in this phase; all state is ephemeral UI state.

## Technical Context

**Language/Version**: TypeScript (Strict) / Next.js 15 / React 18
**Primary Dependencies**: Next.js App Router, Tailwind CSS, Lucide React (icons), Shadcn UI primitives (need Switch component addition), `next-themes` (existing), optional lightweight focus-trap utility (evaluate necessity)
**Storage**: N/A (in-memory component state only)
**Testing**: Playwright (e2e existing), React Testing Library + Jest (assumed available; if not, add for component tests)
**Target Platform**: Modern evergreen browsers (desktop + mobile) via web app
**Project Type**: Single Next.js web application (dashboard)
**Performance Goals**: Dialog open transition <300ms; no measurable impact on initial page load; bundle delta < 30KB (target) hard cap 50KB
**Constraints**: Accessibility WCAG 2.1 AA compliance; 44px minimum touch targets; focus trap reliability; avoid layout shift
**Scale/Scope**: Single modal component + integration into existing header (`src/components/header.tsx`); 4 toggle controls

UNKNOWNS (Phase 0 to resolve):
1. Focus trap implementation choice (custom vs small lib) — NEEDS CLARIFICATION
2. Overlay gradient blur technique (CSS backdrop-filter vs positioned pseudo-element) — NEEDS CLARIFICATION
3. Toggle primitive: add Shadcn Switch vs reuse checkbox styled — NEEDS CLARIFICATION

## Constitution Check (Pre-Design)

- [x] **Component-First Architecture**: New `SettingsDialog` component, wrapped usage within `DashboardLayout` page context; uses existing `cn()`; responsive utilities planned.
- [x] **Type Safety**: Interfaces for `SettingOption`, dialog props; strict TS; no implicit any.
- [x] **UX Consistency**: Theme tokens for colors; dark/light support via existing provider; consistent icon usage; accessible focus states defined.
- [x] **Performance Requirements**: Small incremental bundle (<30KB target); no heavy libraries; CSS-only gradient blur.
- [x] **Development Standards**: Place component in `src/components/`; toggle UI in `src/components/ui/`; Tailwind utilities; avoid custom CSS except minimal overlay.

**Violations Justification**: None.

## Project Structure

### Documentation (this feature)

```text
specs/002-settings-dialog/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/        # remains empty (no external API) with README
└── tasks.md          # created later by /speckit.tasks
```

### Source Code (repository root excerpt for feature)

```text
src/
├── components/
│   ├── header.tsx              # integrate trigger
│   ├── settings-dialog.tsx     # new modal component
│   ├── settings-toggle.tsx     # wrapper around shadcn Switch (optional)
│   └── dashboard-layout.tsx
│
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       ├── switch.tsx          # added via shadcn generator
│       └── ...
```

**Structure Decision**: Single Next.js project; feature adds 1-2 new component files + optional `switch.tsx` in existing `ui/` directory. No backend/API additions.

## Complexity Tracking

Not applicable (no violations).

## Phase 0: Research & Decisions

| Topic | Decision | Rationale | Alternatives |
|-------|----------|-----------|--------------|
| Focus trap | Use lightweight custom hook (manage initial focus, tab cycling, Escape) | Avoid extra dependency; logic simple for single modal | `focus-trap` library (larger), Headless UI Dialog (adds dependency) |
| Overlay blur | CSS `backdrop-filter: blur()` with gradient overlay layer | Simpler, leverages GPU; acceptable performance; widely supported | Pseudo-element with duplicated gradient, canvas filter |
| Toggle primitive | Add Shadcn Switch component | Consistent with existing design system; accessible; minimal code gen | Styled checkbox; custom toggle implementation |

All UNKNOWNs resolved; no remaining clarifications.

## Phase 1: Data Model

See `data-model.md` for detailed entities:

- `SettingOption { id: string; label: string; description?: string; enabled: boolean }`
- `SettingsDialogState { open: boolean; options: SettingOption[] }`

Relationships: Dialog holds array of options; all in-memory.

## Phase 1: Contracts

No external API endpoints in this phase. A `contracts/README.md` documents absence of network contracts since toggles are non-functional.

## Phase 1: Quickstart

See `quickstart.md` for step-by-step implementation (add Switch component, create dialog, integrate trigger, accessibility & testing steps).

## Agent Context Update

Updated via `.specify/scripts/powershell/update-agent-context.ps1 -AgentType copilot` after adding design artifacts to include new component names and decisions.

## Constitution Check (Post-Design)

- [x] Component pattern preserved
- [x] Type safety maintained
- [x] UX consistency (labels, theme tokens, accessible patterns)
- [x] Performance constraints respected (no heavy libs)
- [x] Development standards followed

## Implementation Phases (Summary)

1. Scaffold Switch component (shadcn add) & settings constants.
2. Implement `SettingsDialog` with overlay + focus trap.
3. Integrate trigger in `header.tsx`; manage open state in header or top-level layout provider.
4. Add accessibility tests (Playwright) + component unit tests.
5. Verify performance & bundle impact (analyze build size).

## Testing Strategy

- Unit: Toggle renders & state changes; focus trap behavior.
- Accessibility: ARIA role, labels, Escape close, tab order.
- E2E: Open/close modal; toggle visual states; mobile viewport interactions.

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Backdrop-filter performance on low-end devices | Use minimal blur radius; test Lighthouse; allow graceful degradation (solid semi-transparent) |
| Focus trap edge cases (Shift+Tab) | Include both forward/backward cycling logic; automated tests |
| Switch component styling inconsistency | Rely on Shadcn defaults; minimal overrides with theme tokens |

## Rollback Plan

Feature isolated to new components; removal involves deleting dialog components and header trigger modifications; no data migrations.

## Definition of Done

- All success criteria met (SC-001..004)
- `npm run type-check` & `npm run lint` pass
- Playwright tests green including accessibility
- Bundle delta measured <30KB
- Mobile & dark mode verified manually

## Next Steps

Proceed to task breakdown (`/speckit.tasks`) then implementation.
