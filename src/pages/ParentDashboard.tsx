import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Bell, 
  CheckSquare, 
  BarChart3, 
  Calendar,
  TrendingUp,
  AlertTriangle,
  FileText,
  MessageSquare,
  Download
} from "lucide-react";

const mockChildren = [
  {
    id: '1',
    name: 'Emma Johnson',
    class: 'Grade 10-A',
    attendance: 94.5,
    averageGrade: 87.2,
    status: 'excellent',
    recentActivity: 'Submitted Math assignment'
  },
  {
    id: '2',
    name: 'Alex Johnson',
    class: 'Grade 8-B',
    attendance: 89.1,
    averageGrade: 82.5,
    status: 'good',
    recentActivity: 'Attended Science class'
  }
];

const mockNotifications = [
  { id: '1', type: 'attendance', message: 'Emma was absent from Math class', time: '2 hours ago', urgent: true },
  { id: '2', type: 'grade', message: 'Alex received A+ in Science project', time: '1 day ago', urgent: false },
  { id: '3', type: 'event', message: 'Parent-teacher meeting scheduled for Friday', time: '2 days ago', urgent: false },
  { id: '4', type: 'assignment', message: 'Emma has 2 assignments due this week', time: '3 days ago', urgent: false }
];

const mockUpcomingEvents = [
  { id: '1', title: 'Parent-Teacher Conference', date: 'Friday, 2:00 PM', child: 'Emma Johnson' },
  { id: '2', title: 'Science Fair', date: 'Next Monday, 10:00 AM', child: 'Alex Johnson' },
  { id: '3', title: 'Sports Day', date: 'Next Wednesday, 9:00 AM', child: 'Both children' }
];

export default function ParentDashboard() {
  return (
    <DashboardLayout 
      title="Parent Dashboard" 
      subtitle="Monitor your children's academic progress and stay connected"
    >
      <div className="space-y-6">
        {/* Children Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockChildren.map((child) => (
            <Card key={child.id} className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{child.name}</CardTitle>
                    <CardDescription>{child.class}</CardDescription>
                  </div>
                  <Badge 
                    variant="outline"
                    className={
                      child.status === 'excellent' ? 'border-success text-success' :
                      child.status === 'good' ? 'border-primary text-primary' :
                      'border-warning text-warning'
                    }
                  >
                    {child.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Attendance</span>
                      <span className="text-sm font-medium">{child.attendance}%</span>
                    </div>
                    <Progress value={child.attendance} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Avg. Grade</span>
                      <span className="text-sm font-medium">{child.averageGrade}</span>
                    </div>
                    <Progress value={child.averageGrade} className="h-2" />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-sm text-muted-foreground">{child.recentActivity}</span>
                  <Button size="sm" variant="outline">View Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Children</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockChildren.length}</div>
              <p className="text-xs text-muted-foreground">
                Enrolled students
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Attendance</CardTitle>
              <CheckSquare className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {Math.round(mockChildren.reduce((acc, child) => acc + child.attendance, 0) / mockChildren.length)}%
              </div>
              <p className="text-xs text-muted-foreground">
                Across all children
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Notifications</CardTitle>
              <Bell className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">
                {mockNotifications.filter(n => n.urgent).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Urgent alerts
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{mockUpcomingEvents.length}</div>
              <p className="text-xs text-muted-foreground">
                This week
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Notifications */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Recent Notifications
              </CardTitle>
              <CardDescription>
                Stay updated with your children's activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockNotifications.map((notification) => (
                  <div key={notification.id} className="p-3 border border-border rounded-lg bg-background/50">
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        notification.urgent ? 'bg-error' :
                        notification.type === 'grade' ? 'bg-success' :
                        notification.type === 'attendance' ? 'bg-warning' :
                        'bg-primary'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                      {notification.urgent && (
                        <AlertTriangle className="w-4 h-4 text-error flex-shrink-0" />
                      )}
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View All Notifications
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Upcoming Events
              </CardTitle>
              <CardDescription>
                Important dates and meetings to remember
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockUpcomingEvents.map((event) => (
                  <div key={event.id} className="p-4 border border-border rounded-lg bg-background/50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">{event.title}</h4>
                      <Badge variant="outline">{event.date}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Involves: {event.child}</p>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View School Calendar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and communications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button className="h-20 flex flex-col gap-2" variant="outline">
                <FileText className="w-6 h-6" />
                <span>View Reports</span>
              </Button>
              <Button className="h-20 flex flex-col gap-2" variant="outline">
                <MessageSquare className="w-6 h-6" />
                <span>Message Teachers</span>
              </Button>
              <Button className="h-20 flex flex-col gap-2" variant="outline">
                <Download className="w-6 h-6" />
                <span>Download Records</span>
              </Button>
              <Button className="h-20 flex flex-col gap-2" variant="outline">
                <Calendar className="w-6 h-6" />
                <span>Schedule Meeting</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}