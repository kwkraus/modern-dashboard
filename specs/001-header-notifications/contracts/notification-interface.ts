/**
 * TypeScript Interface Contracts: Header Notifications
 * 
 * This file defines the public API contracts for the notification system.
 * All components and hooks must adhere to these interfaces.
 * 
 * Feature: 001-header-notifications
 * Date: October 23, 2025
 */

// ============================================================================
// Core Domain Types
// ============================================================================

/**
 * Category classification for notifications
 * Used for future filtering, icons, and grouping
 */
export type NotificationCategory = 'system' | 'user' | 'report' | 'alert' | 'info'

/**
 * Represents a single notification entity
 * 
 * @property id - Unique identifier (must be unique across all notifications)
 * @property title - Brief summary/heading (max 100 chars recommended)
 * @property message - Detailed content (truncated at 120 chars in UI)
 * @property timestamp - Creation time (used for sorting, cannot be future date)
 * @property isRead - Read status (updated when user clicks notification)
 * @property category - Classification type for notification
 */
export interface Notification {
  id: string
  title: string
  message: string
  timestamp: Date
  isRead: boolean
  category: NotificationCategory
}

// ============================================================================
// State Management Types
// ============================================================================

/**
 * Runtime state for notification system
 * Managed by useNotifications hook
 */
export interface NotificationState {
  /** All available notifications, unsorted */
  notifications: Notification[]
  
  /** Set of notification IDs that have been marked as read */
  readNotificationIds: Set<string>
}

/**
 * Computed/derived state values
 * Not stored directly, calculated on-demand from NotificationState
 */
export interface NotificationDerivedState {
  /** Count of unread notifications (where isRead === false) */
  unreadCount: number
  
  /** Top 3 most recent notifications for panel display */
  displayNotifications: Notification[]
  
  /** Formatted badge text: null (hide), "1"-"9", or "9+" */
  badgeDisplay: string | null
}

// ============================================================================
// Hook Contracts
// ============================================================================

/**
 * Return type for useNotifications hook
 * Primary state management interface for notification feature
 */
export interface UseNotificationsReturn {
  /** All notifications with merged read state */
  notifications: Notification[]
  
  /** Unread notification count (for badge) */
  unreadCount: number
  
  /** Formatted badge display text */
  badgeDisplay: string | null
  
  /** Top 3 most recent notifications (for dropdown panel) */
  displayNotifications: Notification[]
  
  /** Mark a specific notification as read */
  markAsRead: (notificationId: string) => void
  
  /** Mark all notifications as read */
  markAllAsRead: () => void
  
  /** Check if specific notification is read */
  isNotificationRead: (notificationId: string) => boolean
}

// ============================================================================
// Component Props Contracts
// ============================================================================

/**
 * Props for NotificationBell component
 * The button with badge that opens the dropdown
 */
export interface NotificationBellProps {
  /** Number of unread notifications (for badge) */
  unreadCount: number
  
  /** Formatted badge text */
  badgeDisplay: string | null
  
  /** Callback when bell is clicked */
  onClick?: () => void
  
  /** Additional CSS classes */
  className?: string
  
  /** Accessibility label override */
  ariaLabel?: string
}

/**
 * Props for NotificationPanel component
 * The dropdown panel displaying notifications
 */
export interface NotificationPanelProps {
  /** Array of notifications to display (max 3) */
  notifications: Notification[]
  
  /** Callback when a notification is clicked */
  onNotificationClick: (notificationId: string) => void
  
  /** Whether panel is currently open */
  isOpen: boolean
  
  /** Callback when panel should close */
  onClose: () => void
  
  /** Additional CSS classes */
  className?: string
}

/**
 * Props for NotificationItem component
 * Individual notification within the panel
 */
export interface NotificationItemProps {
  /** The notification to render */
  notification: Notification
  
  /** Callback when item is clicked */
  onClick: (notificationId: string) => void
  
  /** Additional CSS classes */
  className?: string
}

// ============================================================================
// Utility Function Contracts
// ============================================================================

/**
 * Formats a Date into relative time string
 * 
 * @param timestamp - The date to format
 * @returns Formatted string: "X minutes ago", "X hours ago", "Yesterday", or date
 * 
 * @example
 * formatRelativeTime(new Date(Date.now() - 300000)) // "5 minutes ago"
 * formatRelativeTime(new Date(Date.now() - 3600000)) // "1 hour ago"
 * formatRelativeTime(new Date(Date.now() - 86400000)) // "Yesterday"
 */
export type FormatRelativeTimeFunction = (timestamp: Date) => string

/**
 * Converts unread count to badge display string
 * 
 * @param unreadCount - Number of unread notifications
 * @returns null (hide badge), "1"-"9", or "9+" for 10+
 * 
 * @example
 * getBadgeDisplay(0) // null
 * getBadgeDisplay(5) // "5"
 * getBadgeDisplay(15) // "9+"
 */
export type GetBadgeDisplayFunction = (unreadCount: number) => string | null

/**
 * Filters and sorts notifications, returning top 3 most recent
 * 
 * @param notifications - All available notifications
 * @param readIds - Set of IDs that have been marked as read
 * @returns Array of max 3 notifications, sorted by timestamp descending
 */
export type GetDisplayNotificationsFunction = (
  notifications: Notification[],
  readIds: Set<string>
) => Notification[]

// ============================================================================
// localStorage Contracts
// ============================================================================

/**
 * localStorage key for persisting read notification IDs
 */
export const NOTIFICATION_STORAGE_KEY = 'notification-read-ids' as const

/**
 * Type for stored data in localStorage
 * Stored as JSON stringified array
 */
export type StoredReadIds = string[] // Array of notification IDs

// ============================================================================
// Validation Contracts
// ============================================================================

/**
 * Type guard to check if value is a valid Notification
 * 
 * @param value - Value to check
 * @returns true if value matches Notification interface
 */
export type IsNotificationFunction = (value: unknown) => value is Notification

/**
 * Type guard to check if value is a valid NotificationCategory
 * 
 * @param value - Value to check
 * @returns true if value is a valid category string
 */
export type IsNotificationCategoryFunction = (value: unknown) => value is NotificationCategory

// ============================================================================
// Future API Contracts (Out of Scope for MVP)
// ============================================================================

/**
 * Future: API response shape for fetching notifications
 * Not used in MVP (using static data), but defined for future migration
 */
export interface NotificationAPIResponse {
  notifications: Array<{
    id: string
    title: string
    message: string
    timestamp: string // ISO 8601 string from API
    isRead: boolean
    category: NotificationCategory
  }>
  total: number
  unreadCount: number
}

/**
 * Future: API request shape for marking notification as read
 * Not used in MVP, but defined for future migration
 */
export interface MarkAsReadRequest {
  notificationId: string
  userId?: string // Optional: for multi-user systems
}

/**
 * Future: API response for mark as read operation
 * Not used in MVP, but defined for future migration
 */
export interface MarkAsReadResponse {
  success: boolean
  notificationId: string
  updatedAt: string // ISO 8601 string
}

// ============================================================================
// Type Exports
// ============================================================================

/**
 * Union type of all possible notification states
 * Useful for exhaustive pattern matching
 */
export type NotificationStatus = 'read' | 'unread'

/**
 * Utility type for partial notification (used in updates)
 */
export type PartialNotification = Partial<Notification> & Pick<Notification, 'id'>

/**
 * Readonly version of Notification for display components
 */
export type ReadonlyNotification = Readonly<Notification>
