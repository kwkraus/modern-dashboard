"use client"

import * as React from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NOTIFICATIONS } from "@/lib/constants"
import { cn } from "@/lib/utils"

// Type definitions
export interface Notification {
  id: string
  title: string
  message: string
  timestamp: number
  isRead: boolean
  category: "user" | "report" | "system" | "payment" | "team"
}

// Local storage key for notification read states
const STORAGE_KEY = "dashboard-notifications-read"

// Helper function to format relative time
function formatRelativeTime(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 1) return "Just now"
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`
  if (days === 1) return "Yesterday"
  return new Date(timestamp).toLocaleDateString()
}

export function Notifications() {
  const [readNotifications, setReadNotifications] = React.useState<Set<string>>(
    new Set()
  )
  const [isOpen, setIsOpen] = React.useState(false)

  // Load read notifications from localStorage on mount
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setReadNotifications(new Set(parsed))
      }
    } catch (error) {
      console.error("Failed to load notification state:", error)
    }
  }, [])

  // Save read notifications to localStorage whenever they change
  React.useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(Array.from(readNotifications))
      )
    } catch (error) {
      console.error("Failed to save notification state:", error)
    }
  }, [readNotifications])

  // Convert const notifications to mutable array with read state from localStorage
  const notifications: Notification[] = React.useMemo(() => {
    return NOTIFICATIONS.map((notification) => ({
      ...notification,
      isRead: readNotifications.has(notification.id) || notification.isRead,
    }))
  }, [readNotifications])

  // Get unread notifications
  const unreadNotifications = React.useMemo(() => {
    return notifications.filter((n) => !n.isRead)
  }, [notifications])

  // Get unread count for badge
  const unreadCount = unreadNotifications.length

  // Format badge text (show "9+" for 10 or more)
  const badgeText = unreadCount > 9 ? "9+" : unreadCount.toString()

  // Get the 3 most recent notifications to display
  const displayNotifications = React.useMemo(() => {
    return [...notifications]
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 3)
  }, [notifications])

  // Mark notification as read
  const markAsRead = React.useCallback((notificationId: string) => {
    setReadNotifications((prev) => new Set(prev).add(notificationId))
  }, [])

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="relative hidden h-9 w-9 p-0 sm:flex"
        >
          <Bell className="h-4 w-4" />
          <span className="sr-only">
            Notifications{unreadCount > 0 ? ` (${unreadCount} unread)` : ""}
          </span>
          {unreadCount > 0 && (
            <Badge
              className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full border-2 border-background bg-green-500 px-1 text-[10px] font-semibold text-white dark:border-background dark:bg-green-600"
              aria-label={`${unreadCount} unread notifications`}
            >
              {badgeText}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="px-2 py-2">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <span className="text-xs text-muted-foreground">
                {unreadCount} unread
              </span>
            )}
          </div>
          {displayNotifications.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No notifications
            </div>
          ) : (
            <div className="space-y-1">
              {displayNotifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={cn(
                    "flex cursor-pointer flex-col items-start gap-1 rounded-md p-3",
                    !notification.isRead &&
                      "bg-accent/50 hover:bg-accent/70 dark:bg-accent/30 dark:hover:bg-accent/50"
                  )}
                  onClick={() => {
                    if (!notification.isRead) {
                      markAsRead(notification.id)
                    }
                  }}
                >
                  <div className="flex w-full items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium leading-none">
                          {notification.title}
                        </p>
                        {!notification.isRead && (
                          <span
                            className="h-2 w-2 rounded-full bg-green-500 dark:bg-green-600"
                            aria-label="Unread"
                          />
                        )}
                      </div>
                      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatRelativeTime(notification.timestamp)}
                  </span>
                </DropdownMenuItem>
              ))}
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
