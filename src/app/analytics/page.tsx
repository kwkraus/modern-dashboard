import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MemoizedLineChart, MemoizedPieChart } from "@/components/charts"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp,
  Target,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Activity
} from "lucide-react"

// Analytics-specific data
const analyticsStats = [
  {
    title: "Page Views",
    value: "1,234,567",
    change: "+15.2%",
    changeType: "positive" as const,
    icon: Activity,
    period: "vs last month"
  },
  {
    title: "Unique Visitors",
    value: "89,431",
    change: "+8.7%",
    changeType: "positive" as const,
    icon: Users,
    period: "vs last month"
  },
  {
    title: "Bounce Rate",
    value: "32.1%",
    change: "-5.3%",
    changeType: "positive" as const,
    icon: Target,
    period: "vs last month"
  },
  {
    title: "Avg. Session Duration",
    value: "4m 23s",
    change: "+12.8%",
    changeType: "positive" as const,
    icon: TrendingUp,
    period: "vs last month"
  },
]

const topPages = [
  { page: "/dashboard", views: "45,234", percentage: "18.2%" },
  { page: "/analytics", views: "32,891", percentage: "13.2%" },
  { page: "/users", views: "28,743", percentage: "11.5%" },
  { page: "/reports", views: "21,456", percentage: "8.6%" },
  { page: "/trends", views: "18,932", percentage: "7.6%" },
]

const trafficSources = [
  { source: "Direct", visitors: "34,567", percentage: "45.2%" },
  { source: "Organic Search", visitors: "23,891", percentage: "31.3%" },
  { source: "Social Media", visitors: "12,456", percentage: "16.3%" },
  { source: "Referral", visitors: "5,432", percentage: "7.1%" },
]

export default function Analytics() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Analytics</h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              Detailed insights into your website performance and user behavior.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Badge variant="secondary">Real-time</Badge>
            <Badge variant="outline">Last 30 days</Badge>
          </div>
        </div>

        {/* Analytics Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {analyticsStats.map((stat) => (
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
                    {stat.changeType === 'positive' ? (
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                    )}
                    {stat.change}
                  </span>
                  {" "}{stat.period}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Traffic Trends</CardTitle>
              <CardDescription>
                Daily website traffic over the past 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MemoizedLineChart />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Device Breakdown</CardTitle>
              <CardDescription>
                Visitor distribution by device type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MemoizedPieChart />
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
              <CardDescription>
                Most visited pages this month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{page.page}</p>
                      <p className="text-xs text-muted-foreground">{page.views} views</p>
                    </div>
                    <Badge variant="secondary">{page.percentage}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>
                Where your visitors are coming from
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trafficSources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{source.source}</p>
                      <p className="text-xs text-muted-foreground">{source.visitors} visitors</p>
                    </div>
                    <Badge variant="outline">{source.percentage}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
