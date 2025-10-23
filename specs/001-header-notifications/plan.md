# Implementation Plan: Header Notifications

**Branch**: `001-header-notifications` | **Date**: October 23, 2025 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-header-notifications/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implement a notification system within the existing header Bell icon that displays a green badge with unread count, opens a dropdown panel showing up to 3 most recent notifications, and allows users to mark notifications as read. The feature will use React hooks for state management, localStorage for persistence, and leverage existing Shadcn UI patterns for the dropdown panel component. All components will follow the project's component-first architecture with TypeScript strict mode and mobile-first responsive design.

## Technical Context

**Language/Version**: TypeScript 5.x with Next.js 15.3.3 (App Router)  
**Primary Dependencies**: React 19.0.0, next-themes 0.4.6, lucide-react 0.513.0, Radix UI primitives, Tailwind CSS 4  
**Storage**: localStorage (client-side persistence for notification read/unread state)  
**Testing**: Manual testing (no test framework currently configured in project)  
**Target Platform**: Web browsers (Chrome, Safari, Firefox), responsive design 320px-2560px viewports
**Project Type**: Web application (Next.js App Router with TypeScript)  
**Performance Goals**: Panel opens <200ms, badge updates <100ms, bundle increase <50KB uncompressed  
**Constraints**: Must not degrade existing Lighthouse scores (≥90), maintain 3s page load on 3G, TypeScript strict mode compliance  
**Scale/Scope**: Single feature addition to existing header component, ~3-5 new component files, integration with existing DashboardLayout pattern

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Review feature against Modern Dashboard Constitution (`.specify/memory/constitution.md`):

- [x] **Component-First Architecture**: Feature integrates into existing Header component, will use cn() utility for conditional styling, follows mobile-first responsive design with sm:/lg: breakpoints. Notification data will be centralized in src/lib/constants.ts following existing patterns.
- [x] **Type Safety**: All TypeScript interfaces will be explicitly defined (Notification type, NotificationState, props interfaces). No implicit any types. Will pass npm run type-check.
- [x] **UX Consistency**: Will use CSS custom properties for theme tokens (hsl(var(--primary)), hsl(var(--success))). Dark mode fully supported via existing next-themes provider. Uses Lucide Bell icon already in header. Will implement proper click-outside-to-close behavior with event handling.
- [x] **Performance Requirements**: Bundle size impact minimal (~15-20KB estimated: dropdown component + state logic). No chart rendering involved. Panel render time <200ms per spec. Lighthouse scores will be maintained as feature adds minimal DOM nodes.
- [x] **Development Standards**: Follows src/components/ structure for new NotificationPanel component. Uses Tailwind utilities exclusively. Will leverage Radix UI Dropdown primitive (Shadcn pattern). Memoization not needed as notification list is limited to 3 items.

**Violations Justification** (if any): None. Feature fully complies with all constitutional principles.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── header.tsx                      # MODIFY: Add notification bell with badge
│   ├── notification-panel.tsx          # NEW: Dropdown panel component
│   ├── notification-item.tsx           # NEW: Individual notification component
│   └── ui/
│       ├── badge.tsx                   # EXISTS: Reuse for notification count
│       └── dropdown-menu.tsx           # NEW: Add via Shadcn (if not exists)
├── lib/
│   ├── constants.ts                    # MODIFY: Add MOCK_NOTIFICATIONS constant
│   ├── utils.ts                        # EXISTS: Use cn() utility
│   └── notifications.ts                # NEW: Notification state management & helpers
└── types/
    └── notifications.ts                # NEW: TypeScript interfaces

specs/001-header-notifications/
├── plan.md                             # This file
├── research.md                         # Phase 0 output
├── data-model.md                       # Phase 1 output
├── quickstart.md                       # Phase 1 output
└── contracts/                          # Phase 1 output
    └── notification-interface.ts       # TypeScript interface contracts
```

**Structure Decision**: This is a web application feature using Next.js App Router structure. The feature modifies the existing Header component and adds new notification-specific components following the established `src/components/` pattern. State management will use React hooks with localStorage persistence. No backend API changes needed as this uses mock/static data initially per constitutional requirement to centralize data in `src/lib/constants.ts`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations. Feature complexity is appropriate and aligned with constitutional principles.

---

## Phase 1 Design Complete - Constitution Re-Check

**Status**: ✅ All constitutional principles confirmed after detailed design

**Post-Design Validation**:

- ✅ **Component-First Architecture**: Detailed design maintains component composition pattern with NotificationPanel wrapping NotificationItem components. All styling uses cn() utility. Mobile-first responsive classes confirmed in quickstart.md.

- ✅ **Type Safety**: Complete TypeScript interface contracts defined in `contracts/notification-interface.ts`. All component props, hook returns, and utility functions have explicit types. Zero implicit any types. Type-check will pass.

- ✅ **UX Consistency**: Theme token usage documented in research.md (bg-background, border-border, text-foreground). Dark mode classes applied (dark:bg-green-600 for badge). Radix UI Dropdown Menu provides built-in accessibility and click-outside behavior per research.

- ✅ **Performance Requirements**: Bundle size impact refined to ~12KB (Dropdown: 8KB, logic: 3KB, styles: 1KB) - well under 50KB limit. Panel render <200ms guaranteed (max 3 items, simple DOM). No memoization needed per design decision.

- ✅ **Development Standards**: Source structure documented in plan.md follows src/components/ pattern. Tailwind utilities exclusively (no custom CSS). Shadcn Dropdown Menu primitive confirmed. localStorage pattern matches constitutional state management guidance.

**Design Artifacts Complete**:
- [x] research.md - All technical decisions documented with rationales
- [x] data-model.md - Complete entity definitions and state transitions
- [x] contracts/notification-interface.ts - TypeScript interface contracts
- [x] quickstart.md - Implementation guide with constitutional compliance checks

**Ready for Phase 2**: Task breakdown (`/speckit.tasks` command)
