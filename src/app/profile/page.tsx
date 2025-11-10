import { DashboardLayout } from "@/components/dashboard-layout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"

export default function ProfilePage() {
  // In a real app, this would come from authentication context or API
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/placeholder-avatar.jpg",
    initials: "JD",
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">
            View and manage your profile information
          </p>
        </div>

        <Card className="p-6">
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-6 sm:space-y-0">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-2xl">{user.initials}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-2 text-center sm:text-left">
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">About</h3>
          <p className="text-muted-foreground">
            Additional profile information and settings will be available here in future updates.
          </p>
        </Card>
      </div>
    </DashboardLayout>
  )
}
