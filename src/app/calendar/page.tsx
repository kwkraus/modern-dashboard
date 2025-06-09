import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Calendar as CalendarIcon,
  Clock,
  Users,
  MapPin,
  Video,
  Plus,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

// Calendar-specific data
const calendarStats = [  {
    title: "Today&apos;s Meetings",
    value: "8",
    change: "+2",
    changeType: "neutral" as const,
    icon: CalendarIcon,
    period: "from yesterday"
  },
  {
    title: "This Week",
    value: "24",
    change: "+6",
    changeType: "positive" as const,
    icon: Clock,
    period: "from last week"
  },
  {
    title: "Team Events",
    value: "12",
    change: "0",
    changeType: "neutral" as const,
    icon: Users,
    period: "this month"
  },
  {
    title: "Available Hours",
    value: "18",
    change: "-4",
    changeType: "negative" as const,
    icon: Clock,
    period: "this week"
  },
]

const upcomingEvents = [
  {
    id: 1,
    title: "Team Standup",
    time: "9:00 AM",
    duration: "30 min",
    type: "meeting",
    attendees: ["JD", "JS", "MJ"],
    location: "Conference Room A",
    isOnline: false
  },
  {
    id: 2,
    title: "Client Presentation",
    time: "11:00 AM",
    duration: "1 hr",
    type: "presentation",
    attendees: ["JD", "SW", "AB"],
    location: "Zoom",
    isOnline: true
  },
  {
    id: 3,
    title: "Design Review",
    time: "2:00 PM",
    duration: "45 min",
    type: "review",
    attendees: ["JS", "MJ", "KW"],
    location: "Design Studio",
    isOnline: false
  },
  {
    id: 4,
    title: "All Hands Meeting",
    time: "4:00 PM",
    duration: "1 hr",
    type: "meeting",
    attendees: ["All Team"],
    location: "Main Hall",
    isOnline: false
  },
]

const quickActions = [
  { title: "Schedule Meeting", icon: Plus, color: "bg-blue-500" },
  { title: "Book Room", icon: MapPin, color: "bg-green-500" },
  { title: "Join Call", icon: Video, color: "bg-purple-500" },
  { title: "View Week", icon: CalendarIcon, color: "bg-orange-500" },
]

// Simple calendar grid for the current month
const currentDate = new Date()
const currentMonth = currentDate.getMonth()
const currentYear = currentDate.getFullYear()
const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export default function Calendar() {
  const generateCalendarDays = () => {
    const days = []
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null)
    }
    
    // Days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }
    
    return days
  }

  const calendarDays = generateCalendarDays()
  const today = currentDate.getDate()

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Calendar</h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              Manage your schedule, meetings, and events all in one place.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Badge variant="secondary">Today</Badge>
            <Badge variant="outline">{monthNames[currentMonth]} {currentYear}</Badge>
          </div>
        </div>

        {/* Calendar Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {calendarStats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold sm:text-2xl">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={`inline-flex items-center ${
                    stat.changeType === 'positive' ? 'text-green-600' : 
                    stat.changeType === 'negative' ? 'text-red-600' : 'text-muted-foreground'
                  }`}>
                    {stat.change !== "0" && (stat.change.startsWith('+') ? '+' : '')}
                    {stat.change}
                  </span>
                  {" "}{stat.period}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Calendar and Events */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Calendar Grid */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{monthNames[currentMonth]} {currentYear}</CardTitle>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-accent rounded-md">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button className="p-2 hover:bg-accent rounded-md">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map((day) => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => (
                  <div
                    key={index}
                    className={`aspect-square p-2 text-center text-sm cursor-pointer rounded-md hover:bg-accent ${
                      day === today ? 'bg-primary text-primary-foreground' : 
                      day ? 'hover:bg-accent' : ''
                    } ${
                      !day ? 'invisible' : ''
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>            <CardHeader>
              <CardTitle>Today&apos;s Schedule</CardTitle>
              <CardDescription>
                Your upcoming meetings and events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="space-y-2 p-3 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">{event.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {event.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{event.time} • {event.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {event.isOnline ? (
                        <Video className="h-3 w-3" />
                      ) : (
                        <MapPin className="h-3 w-3" />
                      )}
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {event.attendees.slice(0, 3).map((attendee, idx) => (
                        <Avatar key={idx} className="h-6 w-6">
                          <AvatarImage src={`/placeholder-avatar-${idx + 1}.jpg`} />
                          <AvatarFallback className="text-xs">{attendee}</AvatarFallback>
                        </Avatar>
                      ))}
                      {event.attendees.length > 3 && (
                        <span className="text-xs text-muted-foreground ml-1">
                          +{event.attendees.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common calendar actions and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg border hover:bg-accent transition-colors"
                >
                  <div className={`p-2 rounded-full ${action.color}`}>
                    <action.icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">{action.title}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
