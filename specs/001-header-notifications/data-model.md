# Data Model: Header Notifications

**Feature**: 001-header-notifications  
**Date**: October 23, 2025  
**Status**: Complete

## Overview

This document defines the data structures, entities, and state management patterns for the header notifications feature.

---

## Core Entities

### 1. Notification

Represents a single notification item that can be displayed to the user.

**Properties**:

| Property | Type | Required | Description | Constraints |
|----------|------|----------|-------------|-------------|
| `id` | `string` | Yes | Unique identifier for the notification | Must be unique across all notifications |
| `title` | `string` | Yes | Brief summary/heading of the notification | Max 100 characters for display |
| `message` | `string` | Yes | Detailed notification content | Truncated at 120 chars in UI with ellipsis |
| `timestamp` | `Date` | Yes | When the notification was created | Used for sorting (most recent first) |
| `isRead` | `boolean` | Yes | Whether user has marked notification as read | Defaults to `false` for new notifications |
| `category` | `NotificationCategory` | Yes | Classification of notification type | Used for potential future filtering/icons |

**TypeScript Interface**:
```typescript
export interface Notification {
  id: string
  title: string
  message: string
  timestamp: Date
  isRead: boolean
  category: NotificationCategory
}

export type NotificationCategory = 'system' | 'user' | 'report' | 'alert' | 'info'
```

**Validation Rules** (from functional requirements):
- `id`: Must be unique, non-empty string
- `title`: Non-empty, max 100 characters
- `message`: Non-empty, max 500 characters (UI truncates at 120)
- `timestamp`: Valid Date object, not in future
- `isRead`: Boolean (no validation needed)
- `category`: Must be one of defined NotificationCategory values

**Relationships**:
- Notification has no direct relationships to other entities in MVP
- Future: May relate to User entity (recipient) and Action entity (actionable notifications)

---

### 2. NotificationState

Represents the runtime state of the notification system.

**Properties**:

| Property | Type | Description |
|----------|------|-------------|
| `notifications` | `Notification[]` | Array of all notifications, sorted by timestamp descending |
| `readNotificationIds` | `Set<string>` | Set of notification IDs that user has marked as read |
| `unreadCount` | `number` | Computed: Count of notifications where isRead is false |
| `displayNotifications` | `Notification[]` | Computed: Top 3 most recent notifications for panel display |

**TypeScript Interface**:
```typescript
export interface NotificationState {
  notifications: Notification[]
  readNotificationIds: Set<string>
}

// Computed properties (not stored, derived on-the-fly)
export interface NotificationDerivedState {
  unreadCount: number
  displayNotifications: Notification[]
  badgeDisplay: string // "3", "9+", or null
}
```

**State Transitions**:
```
Initial State:
  notifications = MOCK_NOTIFICATIONS (from constants.ts)
  readNotificationIds = Set<string> (loaded from localStorage)

User clicks notification in panel:
  readNotificationIds.add(clickedNotificationId)
  localStorage.setItem('notification-read-ids', [...readNotificationIds])
  Re-compute unreadCount
  Update badge display
  
User refreshes page:
  Load readNotificationIds from localStorage
  Merge with notifications to compute isRead status
```

---

## Data Storage

### Client-Side Persistence (localStorage)

**Key**: `notification-read-ids`  
**Value**: JSON stringified array of notification IDs  
**Example**:
```json
["notif-001", "notif-003", "notif-007"]
```

**Operations**:

1. **Load on mount**:
```typescript
const loadReadIds = (): Set<string> => {
  const stored = localStorage.getItem('notification-read-ids')
  return stored ? new Set(JSON.parse(stored)) : new Set()
}
```

2. **Save on change**:
```typescript
const saveReadIds = (readIds: Set<string>): void => {
  localStorage.setItem('notification-read-ids', JSON.stringify([...readIds]))
}
```

3. **Clear** (for testing/reset):
```typescript
localStorage.removeItem('notification-read-ids')
```

**Storage Limits**:
- localStorage typically allows 5-10MB per domain
- Storing 1000 notification IDs (~10 chars each) = ~10KB
- Well within limits, no cleanup/rotation needed for MVP

---

## Static Data (src/lib/constants.ts)

### MOCK_NOTIFICATIONS

Centralized source of notification data following constitutional requirement.

**Structure**:
```typescript
export const MOCK_NOTIFICATIONS = [
  {
    id: "notif-001",
    title: "System Update Available",
    message: "A new version of the dashboard is available. Click to learn more about new features.",
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    isRead: false,
    category: "system" as const,
  },
  {
    id: "notif-002",
    title: "New User Registered",
    message: "John Smith (john.smith@example.com) has joined your organization.",
    timestamp: new Date(Date.now() - 7200000), // 2 hours ago
    isRead: false,
    category: "user" as const,
  },
  {
    id: "notif-003",
    title: "Monthly Report Ready",
    message: "Your analytics report for October 2025 has been generated and is ready for review.",
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
    isRead: false,
    category: "report" as const,
  },
  {
    id: "notif-004",
    title: "High Activity Detected",
    message: "Unusual activity spike detected at 2:30 PM. Review your dashboard for details.",
    timestamp: new Date(Date.now() - 172800000), // 2 days ago
    isRead: false,
    category: "alert" as const,
  },
  {
    id: "notif-005",
    title: "Scheduled Maintenance",
    message: "System maintenance scheduled for next Sunday 2-4 AM EST. Expect brief downtime.",
    timestamp: new Date(Date.now() - 259200000), // 3 days ago
    isRead: false,
    category: "info" as const,
  },
] as const

/**
 * `MockNotification` is a type derived from the `MOCK_NOTIFICATIONS` array using `as const`.
 * It represents the exact shape and literal values of the mock notification data.
 * Use `MockNotification` for type-safe operations on the mock data itself (e.g., in tests or stories).
 * For general application logic, component props, and runtime data, use the broader `Notification` type.
 */
export type MockNotification = typeof MOCK_NOTIFICATIONS[number]
```

**Design Notes**:
- `as const` provides type inference for TypeScript
- Timestamps are dynamic (relative to Date.now()) to always show "recent" notifications
- All start with `isRead: false` - localStorage overrides this in runtime
- 5 total notifications (panel shows 3 most recent)

---

## Computed Values

### Badge Display Logic

Maps unread count to badge text per FR-002:

```typescript
export function getBadgeDisplay(unreadCount: number): string | null {
  if (unreadCount === 0) return null
  if (unreadCount > 9) return '9+'
  return String(unreadCount)
}
```

**Truth Table**:

| Unread Count | Badge Display | Badge Visible |
|--------------|---------------|---------------|
| 0 | null | No |
| 1 | "1" | Yes |
| 5 | "5" | Yes |
| 9 | "9" | Yes |
| 10 | "9+" | Yes |
| 50 | "9+" | Yes |

---

### Display Notifications (Top 3)

Filters and limits notifications for panel display per FR-005, FR-006:

```typescript
export function getDisplayNotifications(
  notifications: Notification[],
  readIds: Set<string>
): Notification[] {
  return notifications
    .map(notif => ({
      ...notif,
      isRead: readIds.has(notif.id)
    }))
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 3)
}
```

**Logic**:
1. Merge notifications with read state from localStorage
2. Sort by timestamp descending (most recent first)
3. Take first 3 items
4. Return array of max 3 notifications

---

### Relative Timestamp Formatting

Converts Date to human-readable relative time per FR-011:

```typescript
export function formatRelativeTime(timestamp: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - timestamp.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  
  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  
  // For older notifications, show date
  return timestamp.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: timestamp.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
  })
}
```

**Examples**:

| Time Difference | Output |
|-----------------|--------|
| 30 seconds | "Just now" |
| 5 minutes | "5 minutes ago" |
| 1 hour | "1 hour ago" |
| 3 hours | "3 hours ago" |
| 1 day | "Yesterday" |
| 3 days | "3 days ago" |
| 10 days | "Oct 13" |
| 200 days | "May 7, 2025" (if different year) |

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                       Page Load                              │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
        ┌────────────────────────────────┐
        │  Load MOCK_NOTIFICATIONS       │
        │  from src/lib/constants.ts     │
        └────────────┬───────────────────┘
                     │
                     ▼
        ┌────────────────────────────────┐
        │  Load readNotificationIds      │
        │  from localStorage             │
        └────────────┬───────────────────┘
                     │
                     ▼
        ┌────────────────────────────────┐
        │  Merge to compute isRead       │
        │  Calculate unreadCount         │
        │  Get top 3 for display         │
        └────────────┬───────────────────┘
                     │
                     ▼
        ┌────────────────────────────────┐
        │  Render Header with Badge      │
        │  Badge shows: "3"              │
        └────────────┬───────────────────┘
                     │
          User clicks Bell Icon
                     │
                     ▼
        ┌────────────────────────────────┐
        │  Open Dropdown Panel           │
        │  Display 3 notifications       │
        └────────────┬───────────────────┘
                     │
       User clicks Notification Item
                     │
                     ▼
        ┌────────────────────────────────┐
        │  Add ID to readNotificationIds │
        │  Save to localStorage          │
        └────────────┬───────────────────┘
                     │
                     ▼
        ┌────────────────────────────────┐
        │  Re-calculate unreadCount      │
        │  Update Badge: "3" → "2"       │
        │  Update notification styling   │
        └────────────────────────────────┘
```

---

## Migration Path (Future API Integration)

When replacing static data with real API:

**Changes Required**:
1. Replace `MOCK_NOTIFICATIONS` import with API call
2. Add loading/error states
3. Implement real-time updates (WebSocket/polling)
4. Move read state to backend (user_notification_reads table)

**Data Model Stays Same**:
- `Notification` interface remains unchanged
- localStorage used as optimistic cache
- Same computed properties and display logic

**Backwards Compatibility**:
- Components don't know if data is static or from API
- State management pattern supports both sources

---

## Summary

**Core Data Structures**:
- `Notification`: Single notification entity with id, title, message, timestamp, isRead, category
- `NotificationState`: Runtime state with notifications array and read IDs set
- `localStorage`: Persists read notification IDs across sessions

**Key Relationships**:
- Notifications are independent entities (no foreign keys in MVP)
- Read state is many-to-many (multiple users can mark same notification, one user marks many)

**Computed Properties**:
- `unreadCount`: Derived from notifications + readIds
- `badgeDisplay`: Formatted string for badge (null, "1"-"9", "9+")
- `displayNotifications`: Top 3 most recent notifications

**State Persistence**:
- Only read IDs stored in localStorage (not full notifications)
- Notifications come from constants.ts (static source of truth)
- Merging happens at runtime in React component

---

**Phase 1 Complete**: Data model defined. Ready for contracts generation.
