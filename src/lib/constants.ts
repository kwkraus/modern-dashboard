// Dashboard data constants - moved out of components for better performance
import { DollarSign, Users, TrendingUp, Activity } from "lucide-react"

export const DASHBOARD_STATS = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    title: "Active Users",
    value: "2,350",
    change: "+180.1%", 
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Conversion Rate",
    value: "12.5%",
    change: "-4.3%",
    changeType: "negative" as const,
    icon: TrendingUp,
  },
  {
    title: "Active Sessions",
    value: "573",
    change: "+12.1%",
    changeType: "positive" as const,
    icon: Activity,
  },
] as const

export const RECENT_ACTIVITIES = [
  {
    user: "John Doe",
    action: "Created a new project",
    time: "2 minutes ago",
    avatar: "/placeholder-avatar-1.jpg",
    initials: "JD",
  },
  {
    user: "Jane Smith", 
    action: "Updated user settings",
    time: "5 minutes ago",
    avatar: "/placeholder-avatar-2.jpg",
    initials: "JS",
  },
  {
    user: "Mike Johnson",
    action: "Completed data analysis",
    time: "10 minutes ago", 
    avatar: "/placeholder-avatar-3.jpg",
    initials: "MJ",
  },
  {
    user: "Sarah Wilson",
    action: "Generated monthly report",
    time: "15 minutes ago",
    avatar: "/placeholder-avatar-4.jpg",
    initials: "SW",
  },
] as const

export const CHART_DATA = {
  line: [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 600 },
    { name: "Apr", value: 800 },
    { name: "May", value: 700 },
    { name: "Jun", value: 900 },
  ],
  bar: [
    { name: "Mon", value: 20 },
    { name: "Tue", value: 35 },
    { name: "Wed", value: 25 },
    { name: "Thu", value: 40 },
    { name: "Fri", value: 30 },
    { name: "Sat", value: 15 },
    { name: "Sun", value: 10 },
  ],
  pie: [
    { name: "Desktop", value: 45, color: "hsl(var(--chart-1))" },
    { name: "Mobile", value: 35, color: "hsl(var(--chart-2))" },
    { name: "Tablet", value: 20, color: "hsl(var(--chart-3))" },
  ],
}

// Notification data structure with sample notifications
export const NOTIFICATIONS = [
  {
    id: "1",
    title: "New user registered",
    message: "John Doe has created a new account and completed onboarding",
    timestamp: Date.now() - 1000 * 60 * 5, // 5 minutes ago
    isRead: false,
    category: "user" as const,
  },
  {
    id: "2",
    title: "Report generated",
    message: "Your monthly analytics report is ready to download",
    timestamp: Date.now() - 1000 * 60 * 30, // 30 minutes ago
    isRead: false,
    category: "report" as const,
  },
  {
    id: "3",
    title: "System update",
    message: "Dashboard has been updated to version 2.1.0 with new features",
    timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
    isRead: false,
    category: "system" as const,
  },
  {
    id: "4",
    title: "Payment received",
    message: "Invoice #1234 has been paid successfully",
    timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    isRead: true,
    category: "payment" as const,
  },
  {
    id: "5",
    title: "Team invitation",
    message: "You have been invited to join the Marketing team",
    timestamp: Date.now() - 1000 * 60 * 60 * 48, // 2 days ago
    isRead: true,
    category: "team" as const,
  },
] as const
