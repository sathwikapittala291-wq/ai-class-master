import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  GraduationCap, 
  UserCheck, 
  BarChart3, 
  Settings,
  TrendingUp,
  AlertTriangle,
  Shield,
  Database,
  Server,
  Activity,
  Plus
} from "lucide-react";
import { Link } from "react-router-dom";

const mockStats = {
  totalUsers: 1247,
  totalStudents: 892,
  totalTeachers: 47,
  totalParents: 308,
  systemHealth: 98.5,
  activeUsers: 234,
  attendanceToday: 87.3
};

const mockSystemAlerts = [
  { id: '1', type: 'warning', message: 'Database backup scheduled in 2 hours', time: '30 min ago' },
  { id: '2', type: 'info', message: 'New user registrations: 12 pending approval', time: '1 hour ago' },
  { id: '3', type: 'error', message: 'Failed login attempts detected from IP 192.168.1.100', time: '2 hours ago' },
  { id: '4', type: 'success', message: 'AI attendance system updated successfully', time: '4 hours ago' }
];

const mockRecentActivity = [
  { id: '1', action: 'New teacher registered: John Smith', time: '5 min ago', type: 'user' },
  { id: '2', action: 'Class schedule updated for Grade 10-A', time: '15 min ago', type: 'system' },
  { id: '3', action: 'AI attendance accuracy improved to 98.5%', time: '1 hour ago', type: 'ai' },
  { id: '4', action: 'Parent meeting scheduled by Sarah Johnson', time: '2 hours ago', type: 'event' }
];

export default function AdminDashboard() {
  return (
    <DashboardLayout 
      title="Administrator Dashboard" 
      subtitle="Manage users, monitor system health, and oversee school operations"
    >
      <div className="space-y-6">
        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +12 new this week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Activity className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{mockStats.activeUsers}</div>
              <p className="text-xs text-muted-foreground">
                Currently online
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Health</CardTitle>
              <Server className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{mockStats.systemHealth}%</div>
              <p className="text-xs text-muted-foreground">
                All systems operational
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Attendance</CardTitle>
              <UserCheck className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{mockStats.attendanceToday}%</div>
              <p className="text-xs text-muted-foreground">
                Across all classes
              </p>
            </CardContent>
          </Card>
        </div>

        {/* User Distribution */}
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              User Distribution
            </CardTitle>
            <CardDescription>
              Overview of user roles and their distribution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Students</span>
                  <span className="text-sm text-muted-foreground">{mockStats.totalStudents}</span>
                </div>
                <Progress value={(mockStats.totalStudents / mockStats.totalUsers) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {Math.round((mockStats.totalStudents / mockStats.totalUsers) * 100)}% of total users
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Parents</span>
                  <span className="text-sm text-muted-foreground">{mockStats.totalParents}</span>
                </div>
                <Progress value={(mockStats.totalParents / mockStats.totalUsers) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {Math.round((mockStats.totalParents / mockStats.totalUsers) * 100)}% of total users
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Teachers</span>
                  <span className="text-sm text-muted-foreground">{mockStats.totalTeachers}</span>
                </div>
                <Progress value={(mockStats.totalTeachers / mockStats.totalUsers) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {Math.round((mockStats.totalTeachers / mockStats.totalUsers) * 100)}% of total users
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardHeader>
            <CardTitle>Administrator Actions</CardTitle>
            <CardDescription>
              Essential management tasks and system controls
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button className="h-20 flex flex-col gap-2" variant="outline">
                <Plus className="w-6 h-6" />
                <span>Add User</span>
              </Button>
              <Button className="h-20 flex flex-col gap-2" variant="outline">
                <GraduationCap className="w-6 h-6" />
                <span>Manage Classes</span>
              </Button>
              <Link to="/attendance">
                <Button className="w-full h-20 flex flex-col gap-2 bg-gradient-attendance hover:opacity-90">
                  <UserCheck className="w-6 h-6" />
                  <span>View Attendance</span>
                </Button>
              </Link>
              <Button className="h-20 flex flex-col gap-2" variant="outline">
                <BarChart3 className="w-6 h-6" />
                <span>Generate Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* System Alerts */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                System Alerts
              </CardTitle>
              <CardDescription>
                Important system notifications and security alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockSystemAlerts.map((alert) => (
                  <div key={alert.id} className="p-3 border border-border rounded-lg bg-background/50">
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        alert.type === 'error' ? 'bg-error' :
                        alert.type === 'warning' ? 'bg-warning' :
                        alert.type === 'success' ? 'bg-success' :
                        'bg-primary'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">{alert.time}</p>
                      </div>
                      {alert.type === 'error' && (
                        <AlertTriangle className="w-4 h-4 text-error flex-shrink-0" />
                      )}
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View All Alerts
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Latest system activities and user actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentActivity.map((activity) => (
                  <div key={activity.id} className="p-3 border border-border rounded-lg bg-background/50">
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        activity.type === 'user' ? 'bg-primary' :
                        activity.type === 'system' ? 'bg-secondary' :
                        activity.type === 'ai' ? 'bg-success' :
                        'bg-warning'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View Activity Log
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Performance Metrics */}
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              AI System Performance
            </CardTitle>
            <CardDescription>
              Monitor AI attendance recognition accuracy and system performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 border border-success/20 bg-success/5 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Face Recognition</span>
                  <Badge variant="outline" className="border-success text-success">98.5%</Badge>
                </div>
                <Progress value={98.5} className="h-2 mb-2" />
                <p className="text-xs text-muted-foreground">Accuracy over last 30 days</p>
              </div>
              
              <div className="p-4 border border-primary/20 bg-primary/5 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Voice Recognition</span>
                  <Badge variant="outline" className="border-primary text-primary">96.2%</Badge>
                </div>
                <Progress value={96.2} className="h-2 mb-2" />
                <p className="text-xs text-muted-foreground">Accuracy over last 30 days</p>
              </div>
              
              <div className="p-4 border border-secondary/20 bg-secondary/5 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">System Uptime</span>
                  <Badge variant="outline" className="border-secondary text-secondary">99.9%</Badge>
                </div>
                <Progress value={99.9} className="h-2 mb-2" />
                <p className="text-xs text-muted-foreground">Last 30 days availability</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}