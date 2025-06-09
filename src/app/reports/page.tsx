import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MemoizedBarChart, MemoizedLineChart } from "@/components/charts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  FileText,
  Download,
  Calendar,
  TrendingUp,
  BarChart3,
  PieChart,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle
} from "lucide-react"

// Reports page data
const reportStats = [
  {
    title: "Total Reports",
    value: "1,247",
    change: "+18.2%",
    changeType: "positive" as const,
    icon: FileText,
  },
  {
    title: "Generated Today",
    value: "23",
    change: "+5.1%",
    changeType: "positive" as const,
    icon: Calendar,
  },
  {
    title: "Success Rate",
    value: "94.8%",
    change: "+2.3%",
    changeType: "positive" as const,
    icon: CheckCircle,
  },
  {
    title: "Processing Time",
    value: "2.4s",
    change: "-12.5%",
    changeType: "positive" as const,
    icon: Clock,
  },
]

const recentReports = [
  {
    id: "RPT-001",
    name: "Monthly Sales Report",
    type: "Sales",
    status: "Completed",
    createdBy: "Sarah Wilson",
    createdAt: "2024-01-15",
    size: "2.4 MB",
    format: "PDF"
  },
  {
    id: "RPT-002",
    name: "User Analytics Dashboard",
    type: "Analytics",
    status: "Processing",
    createdBy: "Michael Chen",
    createdAt: "2024-01-15",
    size: "1.8 MB",
    format: "Excel"
  },
  {
    id: "RPT-003",
    name: "Financial Summary Q4",
    type: "Financial",
    status: "Completed",
    createdBy: "Emma Thompson",
    createdAt: "2024-01-14",
    size: "3.2 MB",
    format: "PDF"
  },
  {
    id: "RPT-004",
    name: "Inventory Status Report",
    type: "Inventory",
    status: "Failed",
    createdBy: "David Rodriguez",
    createdAt: "2024-01-14",
    size: "0 MB",
    format: "CSV"
  },
  {
    id: "RPT-005",
    name: "Customer Satisfaction Survey",
    type: "Survey",
    status: "Completed",
    createdBy: "Lisa Anderson",
    createdAt: "2024-01-13",
    size: "1.1 MB",
    format: "PDF"
  },
]

const reportTypes = [
  { type: "Sales Reports", count: 342, icon: TrendingUp },
  { type: "Analytics Reports", count: 289, icon: BarChart3 },
  { type: "Financial Reports", count: 234, icon: PieChart },
  { type: "User Reports", count: 187, icon: FileText },
  { type: "System Reports", count: 195, icon: AlertCircle },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'text-green-600 bg-green-50 border-green-200'
    case 'Processing':
      return 'text-blue-600 bg-blue-50 border-blue-200'
    case 'Failed':
      return 'text-red-600 bg-red-50 border-red-200'
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Completed':
      return <CheckCircle className="h-3 w-3" />
    case 'Processing':
      return <Clock className="h-3 w-3" />
    case 'Failed':
      return <XCircle className="h-3 w-3" />
    default:
      return <AlertCircle className="h-3 w-3" />
  }
}

export default function Reports() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Reports</h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              Generate, manage, and download various business reports and analytics.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Report
            </Button>
            <Button size="sm">
              <FileText className="h-4 w-4 mr-2" />
              New Report
            </Button>
          </div>
        </div>

        {/* Report Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reportStats.map((stat) => (
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

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Report Generation Trends</CardTitle>
              <CardDescription>
                Daily report generation over the past month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MemoizedLineChart />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Report Types Distribution</CardTitle>
              <CardDescription>
                Most popular report types this month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MemoizedBarChart />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Recent Reports */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>
                Latest generated reports and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium truncate">{report.name}</p>
                        <Badge variant="outline" className="text-xs">
                          {report.format}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        ID: {report.id} • Created by {report.createdBy}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {report.createdAt} • {report.size}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getStatusColor(report.status)}`}
                      >
                        {getStatusIcon(report.status)}
                        <span className="ml-1">{report.status}</span>
                      </Badge>
                      {report.status === 'Completed' && (
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Report Types */}
          <Card>
            <CardHeader>
              <CardTitle>Report Categories</CardTitle>
              <CardDescription>
                Available report types and counts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportTypes.map((type, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <type.icon className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{type.type}</p>
                        <p className="text-xs text-muted-foreground">{type.count} reports</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <h4 className="text-sm font-medium mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Automated
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Export All
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
