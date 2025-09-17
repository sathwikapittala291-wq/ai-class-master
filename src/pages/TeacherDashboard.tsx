import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Calendar, 
  CheckSquare, 
  BookOpen, 
  BarChart3, 
  Clock,
  TrendingUp,
  AlertCircle,
  Plus,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const mockStats = {
  totalStudents: 156,
  classesToday: 4,
  pendingAttendance: 2,
  averageAttendance: 87.5
};

const mockClasses = [
  { id: '1', name: 'Computer Science - A', time: '09:00 AM', students: 42, status: 'upcoming' },
  { id: '2', name: 'Mathematics - B', time: '11:00 AM', students: 38, status: 'completed' },
  { id: '3', name: 'Physics - A', time: '02:00 PM', students: 45, status: 'upcoming' },
  { id: '4', name: 'Computer Science - B', time: '04:00 PM', students: 41, status: 'pending' }
];

const mockRecentActivity = [
  { id: '1', action: 'Attendance marked for CS-A', time: '2 hours ago', type: 'attendance' },
  { id: '2', action: 'Grade updated for Math-B', time: '4 hours ago', type: 'grade' },
  { id: '3', action: 'Assignment created for Physics-A', time: '6 hours ago', type: 'assignment' },
  { id: '4', action: 'Parent meeting scheduled', time: '1 day ago', type: 'meeting' }
];

export default function TeacherDashboard() {
  return (
    <DashboardLayout 
      title="Teacher Dashboard" 
      subtitle="Manage your classes, students, and attendance"
    >
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalStudents}</div>
              <p className="text-xs text-muted-foreground">
                Across all classes
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Classes</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.classesToday}</div>
              <p className="text-xs text-muted-foreground">
                2 completed, 2 upcoming
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Attendance</CardTitle>
              <AlertCircle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{mockStats.pendingAttendance}</div>
              <p className="text-xs text-muted-foreground">
                Classes need attendance
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Attendance</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{mockStats.averageAttendance}%</div>
              <p className="text-xs text-muted-foreground">
                +2.1% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Frequently used features for efficient class management
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link to="/attendance">
                <Button className="w-full h-20 flex flex-col gap-2 bg-gradient-attendance hover:opacity-90">
                  <CheckSquare className="w-6 h-6" />
                  <span>Mark Attendance</span>
                </Button>
              </Link>
              <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                <BookOpen className="w-6 h-6" />
                <span>Create Assignment</span>
              </Button>
              <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                <BarChart3 className="w-6 h-6" />
                <span>View Reports</span>
              </Button>
              <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                <Plus className="w-6 h-6" />
                <span>Schedule Class</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Schedule */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Today's Schedule
              </CardTitle>
              <CardDescription>
                Your classes for today, {new Date().toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockClasses.map((cls) => (
                  <div key={cls.id} className="flex items-center justify-between p-3 border border-border rounded-lg bg-background/50">
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{cls.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {cls.time} • {cls.students} students
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={
                          cls.status === 'completed' ? 'default' : 
                          cls.status === 'pending' ? 'outline' : 'secondary'
                        }
                        className={
                          cls.status === 'completed' ? 'bg-success' :
                          cls.status === 'pending' ? 'border-warning text-warning' : ''
                        }
                      >
                        {cls.status}
                      </Badge>
                      {cls.status === 'pending' && (
                        <Link to="/attendance">
                          <Button size="sm" className="bg-gradient-attendance hover:opacity-90">
                            Mark Attendance
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest actions and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 border border-border rounded-lg bg-background/50">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      activity.type === 'attendance' ? 'bg-success' :
                      activity.type === 'grade' ? 'bg-primary' :
                      activity.type === 'assignment' ? 'bg-secondary' :
                      'bg-muted-foreground'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View All Activity
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Deadlines */}
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-warning" />
              Upcoming Deadlines
            </CardTitle>
            <CardDescription>
              Important tasks and deadlines to keep track of
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-warning/20 bg-warning/5 rounded-lg">
                <h4 className="font-medium text-foreground">Grade Submission</h4>
                <p className="text-sm text-muted-foreground">Due: Tomorrow</p>
                <p className="text-xs text-warning">Mid-term exams - CS A & B</p>
              </div>
              <div className="p-4 border border-primary/20 bg-primary/5 rounded-lg">
                <h4 className="font-medium text-foreground">Parent Meetings</h4>
                <p className="text-sm text-muted-foreground">Due: This Friday</p>
                <p className="text-xs text-primary">Schedule pending meetings</p>
              </div>
              <div className="p-4 border border-secondary/20 bg-secondary/5 rounded-lg">
                <h4 className="font-medium text-foreground">Lesson Plans</h4>
                <p className="text-sm text-muted-foreground">Due: Next Monday</p>
                <p className="text-xs text-secondary">Next week's curriculum</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}