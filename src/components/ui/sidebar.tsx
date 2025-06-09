"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Hook to detect viewport width
function useViewport() {
  const [isMobile, setIsMobile] = React.useState(false)
  
  React.useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Check on mount
    checkViewport()
    
    // Add resize listener
    window.addEventListener('resize', checkViewport)
    return () => window.removeEventListener('resize', checkViewport)
  }, [])
  
  return { isMobile }
}

// Simple context for sidebar state
const SidebarContext = React.createContext<{
  open: boolean
  setOpen: (open: boolean) => void
  isMobile: boolean
} | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    defaultOpen?: boolean
  }
>(({ defaultOpen = false, children, className, ...props }, ref) => {
  const { isMobile } = useViewport()
  const [open, setOpen] = React.useState(defaultOpen)
  
  // Auto-close when switching to mobile viewport
  React.useEffect(() => {
    if (isMobile && defaultOpen) {
      setOpen(false)
    }
  }, [isMobile, defaultOpen])

  return (
    <div
      data-sidebar={open ? "open" : "closed"}
      data-mobile={isMobile}
      ref={ref}
      className={cn("relative flex min-h-screen items-stretch", className)}
      {...props}
    >
      <SidebarContext.Provider value={{ open, setOpen, isMobile }}>
        {/* Mobile Overlay */}
        {isMobile && open && (
          <div 
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setOpen(false)}
          />
        )}
        {children}
      </SidebarContext.Provider>
    </div>
  )
})
SidebarProvider.displayName = "SidebarProvider"

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  const { open, isMobile } = useSidebar()
  
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col border-r bg-background transition-all duration-300",
        // Mobile: fixed positioning with overlay behavior
        isMobile ? [
          "fixed left-0 top-0 z-50 h-screen",
          "w-48", // Always maintain width for smooth animation
          open ? "translate-x-0" : "-translate-x-full"
        ] : [
          // Desktop: normal flow behavior
          "relative self-stretch",
          open ? "w-48" : "w-16"
        ],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
Sidebar.displayName = "Sidebar"

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex h-16 items-center justify-start border-b bg-background px-4 shrink-0 border-border", className)}
    style={{ lineHeight: 1 }}
    {...props}
  />
))
SidebarHeader.displayName = "SidebarHeader"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 overflow-auto py-4", className)}
    {...props}
  />
))
SidebarContent.displayName = "SidebarContent"

const SidebarNav = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    className={cn("px-2 space-y-1", className)}
    {...props}
  />
))
SidebarNav.displayName = "SidebarNav"

const SidebarNavItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    icon?: React.ReactNode
    active?: boolean
  }
>(({ children, icon, active, className, onClick, ...props }, ref) => {
  const { open } = useSidebar()
  
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer touch-target",
        "min-h-[44px] min-w-[44px]", // Minimum touch target size
        active && "bg-accent text-accent-foreground",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {icon && <div className="flex-shrink-0">{icon}</div>}
      {open && <span className="truncate">{children}</span>}
    </div>
  )
})
SidebarNavItem.displayName = "SidebarNavItem"

const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { setOpen, open } = useSidebar()
  
  return (
    <button
      ref={ref}
      onClick={() => setOpen(!open)}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground",
        "h-9 w-9 min-h-[44px] min-w-[44px] touch-target", // Enhanced touch target
        className
      )}
      aria-label="Toggle sidebar"
      type="button"
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="3" x2="21" y1="6" y2="6" />
        <line x1="3" x2="21" y1="12" y2="12" />
        <line x1="3" x2="21" y1="18" y2="18" />
      </svg>
      <span className="sr-only">Toggle sidebar</span>
    </button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

export {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarNav,
  SidebarNavItem,
  SidebarTrigger,
  useSidebar,
}
