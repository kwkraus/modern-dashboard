# Quickstart: Implement Settings Dialog Modal

## 1. Generate Switch Component (Shadcn)
Run:
```bash
npx shadcn@latest add switch
```
Adds `src/components/ui/switch.tsx`.

## 2. Define Options Constant
Create `src/lib/constants.ts` addition:
```ts
export const SETTINGS_OPTIONS = [
  { id: 'auto-updates', label: 'Auto updates', enabled: false },
  { id: 'validate-incoming-data', label: 'Validate Incoming Data', enabled: false },
  { id: 'clear-cache-after-refresh', label: 'Clear Cache After Refresh', enabled: false },
  { id: 'preview-features', label: 'Turn On Preview Features', enabled: false },
] as const;
```

## 3. Implement `SettingsDialog`
File: `src/components/settings-dialog.tsx`
Responsibilities:
- Accept `open`, `onClose` props.
- Render overlay (fixed, full screen) with gradient + backdrop blur.
- Trap focus (custom hook) while open.
- Provide top-right 44px 'X' button and overlay click for dismissal.
- Map over `SETTINGS_OPTIONS` maintaining local enabled state via `useState`.

## 4. Integrate Trigger
Update `src/components/header.tsx` to include a cog icon button that sets dialog open state.

## 5. Accessibility Checklist
- Dialog container `role="dialog"` `aria-modal="true"`.
- Title element with `id` referenced by `aria-labelledby`.
- Each Switch has accessible label (wrap in `<label>` or use `aria-label`).
- Initial focus on heading or first toggle when opened.
- Escape key closes dialog.

## 6. Styling
Tailwind utilities:
- Overlay: `fixed inset-0 bg-gradient-to-br from-background/70 to-background/40 backdrop-blur-sm`.
- Dialog panel: responsive max width (`max-w-md w-full mx-auto p-6 rounded-lg border bg-card shadow-lg`).
- 44px close button: `h-11 w-11 flex items-center justify-center rounded-full hover:bg-accent focus-visible:outline-none focus-visible:ring`.

## 7. Testing
Playwright E2E:
- Open dialog via cog icon.
- Verify focus trap (Tab cycles within elements).
- Toggle switches change state visually.
- Dismiss via overlay click, Escape, and 'X'.
- Mobile viewport (e.g., 390x844) interactions.

Unit Tests (React Testing Library):
- Renders all four options.
- Close button calls `onClose`.
- Toggle state updates.
- Focus trap cycles.

## 8. Performance Verification
- Run `npm run build` and compare bundle size delta (<30KB target).
- Lighthouse accessibility score ≥90 after feature enabled.

## 9. Dark Mode Check
Open dialog in both light & dark; ensure tokens produce legible contrast.

## 10. Ready for Tasks
Proceed to `/speckit.tasks` to generate granular task breakdown.
