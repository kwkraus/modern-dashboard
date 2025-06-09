"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarNav, 
  SidebarNavItem,
  useSidebar
} from "@/components/ui/sidebar"
import { Header } from "@/components/header"
import { 
  BarChart3, 
  Home, 
  Users, 
  Settings, 
  FileText, 
  TrendingUp,
  Calendar,
  Mail
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home, active: true },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Users", href: "/users", icon: Users },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Trends", href: "/trends", icon: TrendingUp },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Messages", href: "/messages", icon: Mail },
  { name: "Settings", href: "/settings", icon: Settings },
]

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { open, isMobile } = useSidebar()
  return (    <div className={cn(
      "flex min-h-screen flex-col flex-1 transition-all duration-300", // Changed from h-screen to min-h-screen
      // Mobile: always full width, no margin adjustments
      isMobile ? "w-full" : [
        // Desktop: adjust margin based on sidebar state
        "transition-all duration-300",
        open ? "ml-0" : "ml-0"  // Let the sidebar handle its own width changes
      ]
    )} style={{ marginTop: 0, paddingTop: 0 }}>
      <Header />      <main className={cn(
        "flex-1 w-full p-4 sm:p-6 transition-all duration-300" // Removed ml-16 compensation
      )}>
        {children}
      </main>
    </div>
  )
}

function SidebarHeaderContent() {
  const { open } = useSidebar()
  
  return (
    <div className="flex items-center gap-2 font-semibold">
      <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
        <BarChart3 className="h-4 w-4 text-primary-foreground" />
      </div>
      {open && <span className="text-lg truncate">Dashboard</span>}
    </div>
  )
}

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar>
        <SidebarHeader>
          <SidebarHeaderContent />
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav>
            {navigation.map((item) => (
              <SidebarNavItem
                key={item.name}
                icon={<item.icon className="h-6 w-6" />}
                active={item.active}
              >
                {item.name}
              </SidebarNavItem>
            ))}
          </SidebarNav>
        </SidebarContent>
      </Sidebar>
      <DashboardContent>{children}</DashboardContent>
    </SidebarProvider>
  )
}
