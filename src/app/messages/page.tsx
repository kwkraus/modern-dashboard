import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Mail,
  MessageSquare,
  Send,
  Archive,
  Star,
  Search,
  Filter,
  MoreVertical,
  Paperclip,
  Phone,
  Video
} from "lucide-react"

// Messages-specific data
const messageStats = [
  {
    title: "Unread Messages",
    value: "24",
    change: "+8",
    changeType: "neutral" as const,
    icon: Mail,
    period: "from yesterday"
  },
  {
    title: "Conversations",
    value: "156",
    change: "+12",
    changeType: "positive" as const,
    icon: MessageSquare,
    period: "this week"
  },
  {
    title: "Response Rate",
    value: "94%",
    change: "+2%",
    changeType: "positive" as const,
    icon: Send,
    period: "vs last week"
  },  {
    title: "Avg Response Time",
    value: "1.2h",
    change: "-0.3h",
    changeType: "positive" as const,
    icon: MessageSquare,
    period: "vs last week"
  },
]

const conversations = [
  {
    id: 1,
    contact: "John Doe",
    initials: "JD",
    avatar: "/placeholder-avatar-1.jpg",
    lastMessage: "Thanks for the update on the project. Could we schedule a call to discuss the next steps?",
    timestamp: "2 min ago",
    unread: 2,
    isOnline: true,
    type: "direct"
  },
  {
    id: 2,
    contact: "Design Team",
    initials: "DT",
    avatar: "/placeholder-avatar-2.jpg",
    lastMessage: "The new mockups are ready for review. Please check them when you have a moment.",
    timestamp: "15 min ago",
    unread: 0,
    isOnline: false,
    type: "group"
  },
  {
    id: 3,
    contact: "Sarah Wilson",
    initials: "SW",
    avatar: "/placeholder-avatar-3.jpg",
    lastMessage: "I've completed the user research analysis. The results look promising!",
    timestamp: "1 hr ago",
    unread: 1,
    isOnline: true,
    type: "direct"
  },
  {
    id: 4,
    contact: "Project Alpha",
    initials: "PA",
    avatar: "/placeholder-avatar-4.jpg",
    lastMessage: "Meeting rescheduled to tomorrow at 3 PM. Please confirm your attendance.",
    timestamp: "3 hrs ago",
    unread: 0,
    isOnline: false,
    type: "group"
  },
  {
    id: 5,
    contact: "Mike Johnson",
    initials: "MJ",
    avatar: "/placeholder-avatar-5.jpg",
    lastMessage: "The deployment went smoothly. All systems are running normally.",
    timestamp: "5 hrs ago",
    unread: 0,
    isOnline: false,
    type: "direct"
  },
]

const currentConversation = {
  contact: "John Doe",
  initials: "JD",
  avatar: "/placeholder-avatar-1.jpg",
  isOnline: true,
  messages: [
    {
      id: 1,
      sender: "John Doe",
      content: "Hey! I wanted to follow up on our conversation about the new feature.",
      timestamp: "10:30 AM",
      isOwn: false
    },
    {
      id: 2,
      sender: "You",
      content: "Sure! I've been working on the specifications. Should have them ready by end of day.",
      timestamp: "10:32 AM",
      isOwn: true
    },
    {
      id: 3,
      sender: "John Doe",
      content: "Perfect! Also, I noticed some edge cases we might need to consider. Can we discuss them in our next meeting?",
      timestamp: "10:35 AM",
      isOwn: false
    },
    {
      id: 4,
      sender: "You",
      content: "Absolutely. I'll prepare a list of potential scenarios we should cover.",
      timestamp: "10:38 AM",
      isOwn: true
    },
    {
      id: 5,
      sender: "John Doe",
      content: "Thanks for the update on the project. Could we schedule a call to discuss the next steps?",
      timestamp: "10:42 AM",
      isOwn: false
    },
  ]
}

const quickActions = [
  { title: "Compose", icon: Send, color: "bg-blue-500" },
  { title: "Archive", icon: Archive, color: "bg-gray-500" },
  { title: "Star", icon: Star, color: "bg-yellow-500" },
  { title: "Search", icon: Search, color: "bg-green-500" },
]

export default function Messages() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Messages</h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              Stay connected with your team and manage all your conversations.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Badge variant="secondary">Online</Badge>
            <Badge variant="outline">24 Unread</Badge>
          </div>
        </div>

        {/* Messages Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {messageStats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold sm:text-2xl">{stat.value}</div>                <p className="text-xs text-muted-foreground">
                  <span className={`inline-flex items-center ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-muted-foreground'
                  }`}>
                    {stat.change}
                  </span>
                  {" "}{stat.period}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Messages Interface */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Conversations List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Conversations</CardTitle>
                <div className="flex items-center gap-1">
                  <button className="p-1 hover:bg-accent rounded-md">
                    <Search className="h-4 w-4" />
                  </button>
                  <button className="p-1 hover:bg-accent rounded-md">
                    <Filter className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-3 cursor-pointer hover:bg-accent transition-colors ${
                      conversation.id === 1 ? 'bg-accent' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={conversation.avatar} />
                          <AvatarFallback>{conversation.initials}</AvatarFallback>
                        </Avatar>
                        {conversation.isOnline && (
                          <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-background rounded-full" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium truncate">
                            {conversation.contact}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            {conversation.timestamp}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate mt-1">
                          {conversation.lastMessage}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <Badge variant="outline" className="text-xs">
                            {conversation.type}
                          </Badge>
                          {conversation.unread > 0 && (
                            <Badge variant="default" className="text-xs h-5 w-5 p-0 flex items-center justify-center">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Interface */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={currentConversation.avatar} />
                      <AvatarFallback>{currentConversation.initials}</AvatarFallback>
                    </Avatar>
                    {currentConversation.isOnline && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-background rounded-full" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">{currentConversation.contact}</h3>
                    <p className="text-xs text-muted-foreground">
                      {currentConversation.isOnline ? 'Online' : 'Last seen 2 hours ago'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-accent rounded-md">
                    <Phone className="h-4 w-4" />
                  </button>
                  <button className="p-2 hover:bg-accent rounded-md">
                    <Video className="h-4 w-4" />
                  </button>
                  <button className="p-2 hover:bg-accent rounded-md">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Messages */}
              <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
                {currentConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.isOwn
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="flex items-center gap-2 p-3 border rounded-lg">
                <button className="p-1 hover:bg-accent rounded-md">
                  <Paperclip className="h-4 w-4" />
                </button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent border-none outline-none text-sm"
                />
                <button className="p-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common messaging actions and shortcuts
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
