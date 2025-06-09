import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Users as UsersIcon,
  UserPlus,
  UserCheck,
  UserX,
  Mail,
  Calendar,
  MoreHorizontal
} from "lucide-react"

// Users page data
const userStats = [
  {
    title: "Total Users",
    value: "2,847",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: UsersIcon,
  },
  {
    title: "Active Users",
    value: "1,923",
    change: "+8.2%",
    changeType: "positive" as const,
    icon: UserCheck,
  },
  {
    title: "New Registrations",
    value: "156",
    change: "+23.1%",
    changeType: "positive" as const,
    icon: UserPlus,
  },
  {
    title: "Inactive Users",
    value: "924",
    change: "-4.3%",
    changeType: "positive" as const,
    icon: UserX,
  },
]

const recentUsers = [
  {
    id: "1",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    role: "Admin",
    status: "Active",
    avatar: "/placeholder-avatar-1.jpg",
    initials: "SW",
    joinDate: "2024-01-15",
    lastSeen: "2 minutes ago"
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    role: "Editor",
    status: "Active",
    avatar: "/placeholder-avatar-2.jpg",
    initials: "MC",
    joinDate: "2024-01-10",
    lastSeen: "1 hour ago"
  },
  {
    id: "3",
    name: "Emma Thompson",
    email: "emma.thompson@example.com",
    role: "Viewer",
    status: "Inactive",
    avatar: "/placeholder-avatar-3.jpg",
    initials: "ET",
    joinDate: "2024-01-08",
    lastSeen: "2 days ago"
  },
  {
    id: "4",
    name: "David Rodriguez",
    email: "david.rodriguez@example.com",
    role: "Editor",
    status: "Active",
    avatar: "/placeholder-avatar-4.jpg",
    initials: "DR",
    joinDate: "2024-01-05",
    lastSeen: "30 minutes ago"
  },
  {
    id: "5",
    name: "Lisa Anderson",
    email: "lisa.anderson@example.com",
    role: "Admin",
    status: "Active",
    avatar: "/placeholder-avatar-5.jpg",
    initials: "LA",
    joinDate: "2024-01-03",
    lastSeen: "5 minutes ago"
  },
]

const userRoleDistribution = [
  { role: "Viewer", count: 1245, percentage: "43.7%" },
  { role: "Editor", count: 892, percentage: "31.3%" },
  { role: "Admin", count: 356, percentage: "12.5%" },
  { role: "Manager", count: 354, percentage: "12.4%" },
]

export default function Users() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Users</h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              Manage and monitor user accounts, roles, and activity.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Button variant="outline" size="sm">
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
            <Button size="sm">
              Export Users
            </Button>
          </div>
        </div>

        {/* User Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {userStats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold sm:text-2xl">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={`inline-flex items-center ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  {" "}from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* User List */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>
                Latest registered users and their activity status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.initials}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {user.email}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Calendar className="h-3 w-3" />
                          Joined {user.joinDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                        {user.status}
                      </Badge>
                      <Badge variant="outline">{user.role}</Badge>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* User Role Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Role Distribution</CardTitle>
              <CardDescription>
                User distribution by role type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userRoleDistribution.map((role, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{role.role}</p>
                      <p className="text-xs text-muted-foreground">{role.count} users</p>
                    </div>
                    <Badge variant="secondary">{role.percentage}</Badge>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <h4 className="text-sm font-medium mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Invite New User
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Notifications
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <UserCheck className="h-4 w-4 mr-2" />
                    Manage Permissions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
