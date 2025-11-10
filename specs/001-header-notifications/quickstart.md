# Quickstart: Header Notifications

**Feature**: 001-header-notifications  
**Date**: October 23, 2025  
**For**: Developers implementing this feature

## Overview

This guide provides a step-by-step walkthrough to implement the header notifications feature. Follow the phases in order for a structured approach to development.

---

## Prerequisites

Before starting implementation:

- [x] Feature spec reviewed and approved (`spec.md`)
- [x] Research decisions documented (`research.md`)
- [x] Data model defined (`data-model.md`)
- [x] TypeScript contracts defined (`contracts/notification-interface.ts`)
- [x] Constitution compliance verified (all gates passed)
- [ ] Development environment running (`npm run dev`)
- [ ] TypeScript checks passing (`npm run type-check`)
- [ ] ESLint checks passing (`npm run lint`)

---

## Implementation Phases

### Phase 1: Foundation (30 min)

Create the core data structures and utility functions.

**Steps**:

1. **Add notification types** to `src/types/notifications.ts`:
   ```typescript
   // Copy types from contracts/notification-interface.ts
   export type NotificationCategory = 'system' | 'user' | 'report' | 'alert' | 'info'
   export interface Notification { /* ... */ }
   ```

2. **Add mock data** to `src/lib/constants.ts`:
   ```typescript
   export const MOCK_NOTIFICATIONS = [
     {
       id: "notif-001",
       title: "System Update Available",
       message: "A new version of the dashboard is available...",
       timestamp: new Date(Date.now() - 3600000),
       isRead: false,
       category: "system" as const,
     },
     // Add 4 more (see data-model.md)
   ] as const
   ```

3. **Create utility functions** in `src/lib/notifications.ts`:
   ```typescript
   export function formatRelativeTime(timestamp: Date): string { /* ... */ }
   export function getBadgeDisplay(unreadCount: number): string | null { /* ... */ }
   export function getDisplayNotifications(notifications, readIds) { /* ... */ }
   ```

4. **Run type check**: `npm run type-check` (should pass)

**Validation**:
- [ ] Types defined and exported
- [ ] Mock data compiles without errors
- [ ] Utility functions have proper TypeScript signatures
- [ ] No console errors when importing

---

### Phase 2: State Management (30 min)

Implement the custom React hook for managing notification state.

**Steps**:

1. **Create `src/lib/notifications.ts`** (if not done in Phase 1, extend it):
   ```typescript
   export function useNotifications(): UseNotificationsReturn {
     const [readIds, setReadIds] = useState<Set<string>>(new Set())
     
     // Load from localStorage on mount
     useEffect(() => {
       const stored = localStorage.getItem('notification-read-ids')
       if (stored) setReadIds(new Set(JSON.parse(stored)))
     }, [])
     
     // Save to localStorage on change
     useEffect(() => {
       localStorage.setItem('notification-read-ids', JSON.stringify([...readIds]))
     }, [readIds])
     
     const markAsRead = (id: string) => {
       setReadIds(prev => new Set([...prev, id]))
     }
     
     // ... implement remaining functions
     return { notifications, unreadCount, badgeDisplay, displayNotifications, markAsRead, ... }
   }
   ```

2. **Test in browser console**:
   ```javascript
   localStorage.setItem('notification-read-ids', JSON.stringify(['notif-001']))
   // Refresh page and verify read state persists
   ```

**Validation**:
- [ ] Hook compiles without TypeScript errors
- [ ] localStorage read/write works in browser
- [ ] State persists across page refreshes
- [ ] markAsRead function updates state immediately

---

### Phase 3: Badge Component (20 min)

Add the notification badge to the existing bell icon.

**Steps**:

1. **Verify Badge component exists**: Check `src/components/ui/badge.tsx`
   - If missing, run: `npx shadcn@latest add badge`

2. **Modify `src/components/header.tsx`**:
   ```tsx
   import { useNotifications } from '@/lib/notifications'
   import { Badge } from '@/components/ui/badge'
   
   export function Header() {
     const { unreadCount, badgeDisplay } = useNotifications()
     
     return (
       <header>
         {/* ... existing code ... */}
         <Button variant="ghost" size="sm" className="relative h-9 w-9 p-0">
           <Bell className="h-4 w-4" />
           {badgeDisplay && (
             <Badge 
               variant="default"
               className="absolute -right-1 -top-1 h-5 min-w-[1.25rem] px-1 text-[10px] 
                         bg-green-500 dark:bg-green-600 border-0"
               aria-label={`${unreadCount} unread notifications`}
             >
               {badgeDisplay}
             </Badge>
           )}
           <span className="sr-only">Notifications</span>
         </Button>
         {/* ... rest of header ... */}
       </header>
     )
   }
   ```

3. **Test badge display**:
   - Open app in browser
   - Verify green badge appears with correct count
   - Test dark mode (badge should remain visible)
   - Test 10+ notifications (should show "9+")

**Validation**:
- [ ] Badge appears in header
- [ ] Badge shows correct count (1-9 or "9+")
- [ ] Badge disappears when count is 0
- [ ] Dark mode renders correctly
- [ ] No console errors

---

### Phase 4: Dropdown Panel (45 min)

Create the notification panel component with dropdown behavior.

**Steps**:

1. **Install Dropdown Menu** (if not exists):
   ```bash
   npx shadcn@latest add dropdown-menu
   ```

2. **Create `src/components/notification-item.tsx`**:
   ```tsx
   import { Notification } from '@/types/notifications'
   import { formatRelativeTime } from '@/lib/notifications'
   import { cn } from '@/lib/utils'
   
   interface NotificationItemProps {
     notification: Notification
     onClick: (id: string) => void
     className?: string
   }
   
   export function NotificationItem({ notification, onClick, className }: NotificationItemProps) {
     return (
       <button
         onClick={() => onClick(notification.id)}
         className={cn(
           'w-full text-left px-4 py-3 hover:bg-accent transition-colors',
           'border-b border-border last:border-0',
           notification.isRead && 'opacity-60',
           className
         )}
       >
         <div className="flex flex-col gap-1">
           <div className="flex items-start justify-between gap-2">
             <span className="font-medium text-sm line-clamp-1">{notification.title}</span>
             {!notification.isRead && (
               <span className="h-2 w-2 rounded-full bg-green-500 shrink-0 mt-1" />
             )}
           </div>
           <p className="text-sm text-muted-foreground line-clamp-2">
             {notification.message}
           </p>
           <span className="text-xs text-muted-foreground">
             {formatRelativeTime(notification.timestamp)}
           </span>
         </div>
       </button>
     )
   }
   ```

3. **Create `src/components/notification-panel.tsx`**:
   ```tsx
   import { NotificationItem } from './notification-item'
   import { Notification } from '@/types/notifications'
   import {
     DropdownMenu,
     DropdownMenuContent,
     DropdownMenuTrigger,
   } from '@/components/ui/dropdown-menu'
   
   interface NotificationPanelProps {
     notifications: Notification[]
     onNotificationClick: (id: string) => void
     children: React.ReactNode // The bell button trigger
   }
   
   export function NotificationPanel({ 
     notifications, 
     onNotificationClick,
     children 
   }: NotificationPanelProps) {
     return (
       <DropdownMenu>
         <DropdownMenuTrigger asChild>
           {children}
         </DropdownMenuTrigger>
         <DropdownMenuContent 
           align="end" 
           className="w-[calc(100vw-2rem)] sm:w-96 max-h-[80vh] overflow-y-auto p-0"
         >
           {notifications.length === 0 ? (
             <div className="px-4 py-8 text-center text-muted-foreground">
               <p>No notifications</p>
             </div>
           ) : (
             <div className="flex flex-col">
               {notifications.map(notification => (
                 <NotificationItem
                   key={notification.id}
                   notification={notification}
                   onClick={onNotificationClick}
                 />
               ))}
             </div>
           )}
         </DropdownMenuContent>
       </DropdownMenu>
     )
   }
   ```

4. **Integrate into `src/components/header.tsx`**:
   ```tsx
   import { NotificationPanel } from './notification-panel'
   
   export function Header() {
     const { unreadCount, badgeDisplay, displayNotifications, markAsRead } = useNotifications()
     
     return (
       <header>
         {/* ... existing code ... */}
         <NotificationPanel 
           notifications={displayNotifications}
           onNotificationClick={markAsRead}
         >
           <Button variant="ghost" size="sm" className="relative h-9 w-9 p-0">
             <Bell className="h-4 w-4" />
             {badgeDisplay && (
               <Badge
                 className="bg-green-500 dark:bg-green-600 absolute -top-1 -right-1 h-5 min-w-[1.25rem] px-1.5 text-xs font-semibold text-white"
                 aria-label={`${badgeDisplay} unread notifications`}
               >
                 {badgeDisplay}
               </Badge>
             )}
           </Button>
         </NotificationPanel>
         {/* ... rest of header ... */}
       </header>
     )
   }
   ```

**Validation**:
- [ ] Panel opens when bell is clicked
- [ ] Panel shows max 3 notifications
- [ ] Panel closes when clicking outside
- [ ] Panel closes when clicking bell again
- [ ] Notifications display correctly (title, message, timestamp)
- [ ] Read vs unread styling is visible

---

### Phase 5: Interactivity (20 min)

Implement mark-as-read functionality.

**Steps**:

1. **Test clicking notifications**:
   - Click an unread notification in panel
   - Verify badge count decreases immediately
   - Verify notification styling updates (becomes dimmed)
   - Refresh page and verify state persists

2. **Add aria-live region** to `header.tsx` for screen reader support:
   ```tsx
   <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
     {unreadCount > 0 && `${unreadCount} unread notifications`}
   </div>
   ```

**Validation**:
- [ ] Clicking notification marks it as read
- [ ] Badge count updates immediately (<100ms)
- [ ] Visual feedback clear (dimmed styling)
- [ ] State persists after refresh
- [ ] Screen reader announces changes

---

### Phase 6: Responsive & Accessibility (30 min)

Ensure mobile compatibility and accessibility compliance.

**Steps**:

1. **Test mobile viewports**:
   - Open DevTools (F12) → Device toolbar
   - Test at 320px, 375px, 640px widths
   - Verify panel fits within viewport
   - Verify bell button is visible on mobile

2. **Test keyboard navigation**:
   - Tab to bell button → press Enter → panel opens
   - Arrow keys navigate between notifications
   - Press Enter on notification → marks as read
   - Press Escape → panel closes

3. **Test screen reader** (optional but recommended):
   - Enable screen reader (NVDA on Windows, VoiceOver on Mac)
   - Tab to bell button → should announce count
   - Open panel → should announce menu role
   - Navigate notifications → should read content

**Validation**:
- [ ] Mobile viewports (320px-640px) display correctly
- [ ] Panel doesn't overflow viewport
- [ ] Bell button visible on all screen sizes
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Screen reader announces state changes
- [ ] Focus management is correct

---

### Phase 7: Dark Mode & Theming (15 min)

Verify dark mode support across all notification components.

**Steps**:

1. **Toggle theme** using theme toggle button in header

2. **Check components in dark mode**:
   - Badge: Should use `dark:bg-green-600`
   - Panel: Should use `bg-background`, `border-border`
   - Text: Should use `text-foreground`, `text-muted-foreground`
   - Hover states: Should use `hover:bg-accent`

**Validation**:
- [ ] Badge visible and readable in dark mode
- [ ] Panel background adapts to theme
- [ ] Text has proper contrast in both modes
- [ ] Hover states work in both modes
- [ ] No hardcoded colors (all use CSS custom properties)

---

### Phase 8: Testing & QA (30 min)

Comprehensive testing against success criteria and quality gates.

**Manual Test Checklist**:

1. **Functional Requirements**:
   - [ ] FR-001: Badge displays with count when > 0
   - [ ] FR-002: Badge shows "9+" for 10+ notifications
   - [ ] FR-003: Badge hidden when count = 0
   - [ ] FR-004: Panel opens on bell click
   - [ ] FR-005: Panel shows max 3 notifications
   - [ ] FR-006: Notifications sorted by date (newest first)
   - [ ] FR-007: Panel closes on bell re-click (toggle)
   - [ ] FR-008: Panel closes on outside click
   - [ ] FR-009: Click notification marks as read
   - [ ] FR-010: Badge updates immediately on mark read
   - [ ] FR-011: Each notification shows title, message, timestamp
   - [ ] FR-012: Read vs unread visually distinguishable
   - [ ] FR-013: State persists across refresh
   - [ ] FR-014: Panel positioned to avoid viewport overflow
   - [ ] FR-015: Long messages truncated with ellipsis

2. **Performance Criteria**:
   - [ ] Panel opens in <200ms (use DevTools Performance tab)
   - [ ] Badge updates in <100ms
   - [ ] Bundle size increase <50KB (check next build output)
   - [ ] No Lighthouse score degradation

3. **Quality Criteria**:
   - [ ] `npm run type-check` passes
   - [ ] `npm run lint` passes
   - [ ] Dark mode fully supported
   - [ ] Mobile viewports work (320px-2560px)
   - [ ] No console errors or warnings

**Edge Cases to Test**:
- [ ] 0 notifications (badge hidden, panel shows "No notifications")
- [ ] Exactly 10 notifications (badge shows "9+")
- [ ] Very long notification title (truncates)
- [ ] Very long notification message (truncates at 2 lines)
- [ ] Clicking outside panel while bell is focused
- [ ] Rapid clicking on notifications (no race conditions)
- [ ] localStorage disabled (graceful degradation)

---

## Constitution Compliance Check

Before marking feature complete, verify compliance with all constitutional gates:

### Gate 1: Pre-Development ✅
- [x] Feature has documented user scenarios with acceptance criteria
- [x] Component structure is defined (files, props, data flow)
- [x] Data requirements are identified (static, API, computed)
- [x] Performance implications are assessed (bundle size, rendering complexity)
- [x] Constitution compliance is reviewed

### Gate 2: Implementation ✅
- [x] TypeScript types are defined before implementation
- [x] Components are built incrementally with hot reload validation
- [x] Console errors/warnings are addressed immediately
- [x] Mobile responsiveness is tested during development (not after)
- [x] Theme tokens are used (no hardcoded colors)

### Gate 3: Pre-Commit
- [ ] `npm run type-check` passes
- [ ] `npm run lint:fix` applied and verified
- [ ] Manual testing in both light and dark modes
- [ ] Manual testing on mobile viewport (DevTools or device)
- [ ] No console errors in browser DevTools

### Gate 4: Pre-Merge (Before PR)
- [ ] All Quality Gates 1-3 documented as passing
- [ ] Performance benchmarks met (Lighthouse, bundle size)
- [ ] Accessibility scan passes (no critical issues)
- [ ] Cross-browser testing (Chrome, Safari, Firefox minimum)
- [ ] Documentation updated (README, copilot-instructions.md if needed)

---

## Common Issues & Solutions

### Issue: Badge not showing
**Solution**: Check that `useNotifications` hook is called and `badgeDisplay` is not null. Verify mock data has notifications with `isRead: false`.

### Issue: Panel doesn't close on outside click
**Solution**: Ensure using `DropdownMenu` from Shadcn (not custom implementation). Radix UI handles this automatically.

### Issue: localStorage not persisting
**Solution**: Check browser console for localStorage errors. Ensure JSON.stringify/parse is used correctly. Test in non-incognito window.

### Issue: TypeScript errors on Date objects
**Solution**: MOCK_NOTIFICATIONS uses `new Date()` which is dynamic. Ensure types allow `Date` objects, not just strings.

### Issue: Badge not visible in dark mode
**Solution**: Use `dark:bg-green-600` class. Test with theme toggle. Verify Tailwind dark mode is enabled.

### Issue: Panel overflows on mobile
**Solution**: Use `w-[calc(100vw-2rem)]` class for mobile, `sm:w-96` for desktop. Add `max-h-[80vh] overflow-y-auto`.

---

## Next Steps After Implementation

Once all phases complete and tests pass:

1. **Run pre-commit checks**:
   ```bash
   npm run precommit  # Runs lint + type-check
   ```

2. **Create commit**:
   ```bash
   git add src/components/header.tsx src/components/notification-*.tsx src/lib/notifications.ts src/lib/constants.ts src/types/notifications.ts
   git commit -m "feat: implement header notifications with badge and dropdown panel"
   ```

3. **Performance validation**:
   ```bash
   npm run build
   # Check build output for bundle size impact
   # Run Lighthouse audit on production build
   ```

4. **Prepare for PR**:
   - Document all tested scenarios
   - Add screenshots of feature in light/dark mode
   - List any deviations from spec (should be none)
   - Confirm all constitutional gates passed

---

## Time Estimate

| Phase | Estimated Time | Cumulative |
|-------|----------------|------------|
| Phase 1: Foundation | 30 min | 30 min |
| Phase 2: State Management | 30 min | 1 hour |
| Phase 3: Badge Component | 20 min | 1h 20m |
| Phase 4: Dropdown Panel | 45 min | 2h 5m |
| Phase 5: Interactivity | 20 min | 2h 25m |
| Phase 6: Responsive & A11y | 30 min | 2h 55m |
| Phase 7: Dark Mode | 15 min | 3h 10m |
| Phase 8: Testing & QA | 30 min | 3h 40m |

**Total: ~4 hours** for complete implementation and testing.

---

## Success Criteria Verification

After implementation, verify all success criteria from spec.md:

- [ ] **SC-001**: Users identify unread count within 1 second
- [ ] **SC-002**: Users open panel within 2 clicks (1 click actually)
- [ ] **SC-003**: Badge updates within 500ms (<100ms achieved)
- [ ] **SC-004**: 100% notifications display complete info
- [ ] **SC-005**: Functional on 320px-2560px viewports

---

**Implementation Guide Complete**. Follow phases sequentially for best results. Refer to `data-model.md` and `contracts/notification-interface.ts` for detailed specifications.
