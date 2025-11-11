# Feature Tasks: Settings Dialog Modal

## Phase 1: Setup

- [ ] T001 Install Shadcn switch component via CLI (documentation only; run manually) 
- [ ] T002 Add SETTINGS_OPTIONS constant to `src/lib/constants.ts`
- [ ] T003 Create placeholder `src/components/settings-dialog.tsx` file with component scaffold
- [ ] T004 Create placeholder `src/components/settings-toggle.tsx` wrapper scaffold (optional abstraction)
- [ ] T005 Add cog icon button placeholder in `src/components/header.tsx` for future dialog trigger

## Phase 2: Foundational

- [ ] T006 Implement Shadcn `switch.tsx` styling confirmation (verify file present) 
- [ ] T007 Implement focus trap hook in `src/components/hooks/useFocusTrap.ts` (custom hook for dialog) 
- [ ] T008 [P] Add accessibility utilities (helper functions) in `src/lib/accessibility.ts` (if needed for labeling)
- [ ] T009 Integrate SETTINGS_OPTIONS import and types into dialog scaffold
- [ ] T010 [P] Define TypeScript interfaces for `SettingOption` and dialog props in `src/components/settings-dialog.tsx`

## Phase 3: User Story 1 (US1) - Open & View Settings

Goal: User opens dialog, sees overlay + four toggles, can dismiss.
Independent Test: Open via cog; overlay & dialog appear; toggles visible; close by overlay click & 'X'.

- [ ] T011 [US1] Implement gradient blur overlay in `settings-dialog.tsx` (Tailwind classes) 
- [ ] T012 [P] [US1] Implement centered dialog panel structure with title and four toggle placeholders 
- [ ] T013 [US1] Implement open state management (header trigger + dialog) in `header.tsx` 
- [ ] T014 [P] [US1] Add top-right 44px 'X' close button with accessible label 
- [ ] T015 [US1] Implement overlay click detection to invoke `onClose` 
- [ ] T016 [US1] Ensure focus origin capture & restore on open/close (integrate with useFocusTrap) 
- [ ] T017 [P] [US1] Add initial Playwright test: open & close dialog, verify overlay presence

## Phase 4: User Story 2 (US2) - Toggle Interaction Feedback

Goal: Visual on/off state changes per toggle; independent of external behavior.
Independent Test: Each toggle can be switched, visual state updates, rapid toggling consistent.

- [ ] T018 [US2] Implement `settings-toggle.tsx` mapping to Shadcn Switch for single option
- [ ] T019 [P] [US2] Map SETTINGS_OPTIONS to individual toggle instances with local state
- [ ] T020 [US2] Add visual state classes (on/off) leveraging theme tokens
- [ ] T021 [US2] Prevent side effects (confirm no external calls) & document ephemeral nature in component comment
- [ ] T022 [P] [US2] Unit test: toggle renders and state flips (React Testing Library)
- [ ] T023 [US2] Unit test: rapid sequential toggle interactions preserve correct final states

## Phase 5: User Story 3 (US3) - Accessible Interaction & Keyboard Control

Goal: Full keyboard navigation, proper ARIA roles/labels, Escape close.
Independent Test: Open, Tab cycles inside, Switch accessible names, Escape closes, focus returns.

- [ ] T024 [US3] Add `role="dialog"` `aria-modal="true"` and `aria-labelledby` to dialog container
- [ ] T025 [P] [US3] Implement initial focus placement (dialog heading or first toggle)
- [ ] T026 [US3] Integrate Escape key handler for closing dialog
- [ ] T027 [US3] Ensure tab/shift+tab cycles within dialog (use focus trap hook)
- [ ] T028 [P] [US3] Accessibility test (Playwright): keyboard navigation & screen reader attributes
- [ ] T029 [US3] Add accessible labels to toggles (associate label element or aria-label)

## Final Phase: Polish & Cross-Cutting

- [ ] T030 Add dark mode visual verification adjustments (contrast tweaks if needed)
- [ ] T031 [P] Refine animation transitions (<300ms) for dialog open/close (Tailwind + CSS) 
- [ ] T032 Conduct Lighthouse performance & accessibility run (manual action) and document results in `specs/002-settings-dialog/research.md` append section
- [ ] T033 [P] Bundle size measurement (record delta) and add note in `plan.md`
- [ ] T034 Clean up unused optional abstraction if `settings-toggle.tsx` not needed (remove file & references)
- [ ] T035 Final Playwright E2E test suite: overlay click, 'X', Escape, mobile viewport interactions, focus restoration
- [ ] T036 Documentation update: add usage snippet to `README.md` referencing new dialog component

## Dependencies & Story Order

1. US1 must complete before US2 (toggle rendering depends on dialog structure)
2. US2 must complete before US3 (accessibility enhancements rely on existing interactive toggles)

## Parallel Execution Examples

- During Phase 3: T012 and T014 can run in parallel (structure vs close button)
- During Phase 4: T019 and T022 can run in parallel (implementation vs testing)
- During Phase 5: T025 and T029 can run in parallel (focus vs labels)
- Final Phase: T031, T033, and T035 can proceed in parallel (animations vs measurement vs extended tests)

## Implementation Strategy

MVP Scope: Complete Phase 3 (US1) — delivers open/close visibility of settings modalities.
Incremental Delivery:
1. MVP (US1) → basic visibility & closure
2. Add interactive feedback (US2)
3. Add accessibility completeness (US3)
4. Polish & performance refinements

## Task Counts

- Setup: 5
- Foundational: 5
- US1: 7
- US2: 6
- US3: 6
- Polish: 7
- Total: 36

All tasks follow required checklist format.
