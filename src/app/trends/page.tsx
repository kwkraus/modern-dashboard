import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MemoizedLineChart, MemoizedBarChart } from "@/components/charts"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp,
  TrendingDown,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  DollarSign
} from "lucide-react"

// Trends-specific data
const trendStats = [
  {
    title: "Growth Rate",
    value: "24.8%",
    change: "+3.2%",
    changeType: "positive" as const,
    icon: TrendingUp,
    period: "vs last quarter"
  },
  {
    title: "Market Share",
    value: "18.5%",
    change: "+1.8%",
    changeType: "positive" as const,
    icon: BarChart3,
    period: "vs last quarter"
  },
  {
    title: "Customer Acquisition",
    value: "1,247",
    change: "-5.2%",
    changeType: "negative" as const,
    icon: Activity,
    period: "vs last month"
  },
  {
    title: "Revenue Trend",
    value: "$142,350",
    change: "+18.7%",
    changeType: "positive" as const,
    icon: DollarSign,
    period: "vs last month"
  },
]

const trendingTopics = [
  { topic: "Mobile Apps", growth: "+45.2%", category: "Technology", trend: "up" },
  { topic: "AI/ML", growth: "+38.7%", category: "Technology", trend: "up" },
  { topic: "E-commerce", growth: "+28.3%", category: "Business", trend: "up" },
  { topic: "Remote Work", growth: "+15.9%", category: "Workplace", trend: "up" },
  { topic: "Social Media", growth: "-8.2%", category: "Marketing", trend: "down" },
]

const industryBenchmarks = [
  { industry: "SaaS", average: "12.5%", yourPerformance: "18.2%", status: "above" },
  { industry: "E-commerce", average: "8.7%", yourPerformance: "11.3%", status: "above" },
  { industry: "Fintech", average: "15.2%", yourPerformance: "9.8%", status: "below" },
  { industry: "Healthcare", average: "6.8%", yourPerformance: "7.1%", status: "above" },
]

export default function Trends() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Trends</h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              Track market trends, growth patterns, and performance insights.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Badge variant="secondary">Live Data</Badge>
            <Badge variant="outline">Q4 2024</Badge>
          </div>
        </div>

        {/* Trends Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trendStats.map((stat) => (
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
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Growth Trend</CardTitle>
              <CardDescription>
                Monthly growth rate over the past 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MemoizedLineChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance by Category</CardTitle>
              <CardDescription>
                Weekly performance across different categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MemoizedBarChart />
            </CardContent>
          </Card>
        </div>

        {/* Trending Topics and Benchmarks */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Trending Topics</CardTitle>
              <CardDescription>
                Most popular topics and their growth trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trendingTopics.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{item.topic}</p>
                      <p className="text-xs text-muted-foreground">{item.category}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${
                        item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.growth}
                      </span>
                      {item.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Industry Benchmarks</CardTitle>
              <CardDescription>
                How you compare against industry averages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {industryBenchmarks.map((benchmark, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{benchmark.industry}</p>
                      <Badge variant={benchmark.status === 'above' ? 'default' : 'secondary'}>
                        {benchmark.status === 'above' ? 'Above Average' : 'Below Average'}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Industry: {benchmark.average}</span>
                      <span>You: {benchmark.yourPerformance}</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          benchmark.status === 'above' ? 'bg-green-600' : 'bg-orange-500'
                        }`}
                        style={{ 
                          width: `${Math.min(
                            (parseFloat(benchmark.yourPerformance) / parseFloat(benchmark.average)) * 50, 
                            100
                          )}%` 
                        }}
                      />
                    </div>
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
