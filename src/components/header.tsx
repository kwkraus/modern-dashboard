"use client"

import * as React from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Bell, Search, Settings } from "lucide-react"

export function Header() {
  const [searchOpen, setSearchOpen] = React.useState(false)

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6">
      <div className="flex items-center gap-2 sm:gap-4">
        <SidebarTrigger className="h-9 w-9" />
        <Separator orientation="vertical" className="hidden h-6 sm:block" />
        
        {/* Mobile Search Toggle */}
        <Button 
          variant="ghost" 
          size="sm"
          className="h-9 w-9 p-0 sm:hidden"
          onClick={() => setSearchOpen(!searchOpen)}
        >
          <Search className="h-4 w-4" />
          <span className="sr-only">Toggle search</span>
        </Button>
        
        {/* Desktop Search */}
        <div className="hidden items-center gap-2 sm:flex">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search..."
            className="w-48 bg-background text-sm placeholder:text-muted-foreground focus:outline-none lg:w-64"
          />
        </div>
      </div>
      
      {/* Mobile Search Bar */}
      {searchOpen && (
        <div className="absolute left-4 right-4 top-20 z-50 rounded-lg border bg-background p-3 shadow-lg sm:hidden">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="flex-1 bg-background text-sm placeholder:text-muted-foreground focus:outline-none"
              autoFocus
            />
          </div>
        </div>
      )}
      
      <div className="flex items-center gap-2 sm:gap-4">
        <ThemeToggle />
        
        {/* Hide secondary actions on mobile */}
        <Button variant="ghost" size="sm" className="hidden h-9 w-9 p-0 sm:flex">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="ghost" size="sm" className="hidden h-9 w-9 p-0 sm:flex">
          <Settings className="h-4 w-4" />
          <span className="sr-only">Settings</span>
        </Button>
        
        <Separator orientation="vertical" className="hidden h-6 sm:block" />
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
