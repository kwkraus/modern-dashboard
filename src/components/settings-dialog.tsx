"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { SETTINGS_OPTIONS } from "@/lib/constants"
import { cn } from "@/lib/utils"

interface SettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const [settings, setSettings] = React.useState(() => {
    // Initialize settings with default values
    return SETTINGS_OPTIONS.reduce((acc, option) => {
      acc[option.id] = option.defaultEnabled
      return acc
    }, {} as Record<string, boolean>)
  })

  const dialogRef = React.useRef<HTMLDivElement>(null)
  const closeButtonRef = React.useRef<HTMLButtonElement>(null)
  const previousFocusRef = React.useRef<HTMLElement | null>(null)

  // Handle Escape key
  React.useEffect(() => {
    if (!open) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [open, onOpenChange])

  // Focus management
  React.useEffect(() => {
    if (open) {
      // Save the currently focused element
      previousFocusRef.current = document.activeElement as HTMLElement
      
      // Focus the dialog after a small delay to ensure it's rendered
      setTimeout(() => {
        closeButtonRef.current?.focus()
      }, 0)
    } else {
      // Restore focus when dialog closes
      if (previousFocusRef.current) {
        previousFocusRef.current.focus()
      }
    }
  }, [open])

  // Focus trap
  React.useEffect(() => {
    if (!open || !dialogRef.current) return

    const dialog = dialogRef.current
    const focusableElements = dialog.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    dialog.addEventListener("keydown", handleTab)
    return () => dialog.removeEventListener("keydown", handleTab)
  }, [open])

  // Prevent body scroll when dialog is open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const handleToggle = (id: string) => {
    setSettings(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    // Only close if clicking the overlay itself, not its children
    if (e.target === e.currentTarget) {
      onOpenChange(false)
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
      role="presentation"
    >
      {/* Gradient blur overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-dialog-title"
        className={cn(
          "relative z-10 w-full max-w-md rounded-lg border bg-background p-6 shadow-lg",
          "animate-in fade-in-0 zoom-in-95 duration-200"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 
            id="settings-dialog-title" 
            className="text-lg font-semibold text-foreground"
          >
            Settings
          </h2>
          <Button
            ref={closeButtonRef}
            variant="ghost"
            size="sm"
            className="h-11 w-11 p-0 hover:bg-muted"
            onClick={() => onOpenChange(false)}
            aria-label="Close settings dialog"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Settings options */}
        <div className="space-y-6">
          {SETTINGS_OPTIONS.map((option) => (
            <div key={option.id} className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <label 
                  htmlFor={option.id}
                  className="text-sm font-medium text-foreground cursor-pointer"
                >
                  {option.label}
                </label>
                {option.description && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {option.description}
                  </p>
                )}
              </div>
              <Switch
                id={option.id}
                checked={settings[option.id] ?? false}
                onCheckedChange={() => handleToggle(option.id)}
                aria-label={option.label}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
