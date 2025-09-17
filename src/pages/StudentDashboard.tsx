import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Calendar, 
  CheckSquare, 
  BarChart3, 
  Clock,
  TrendingUp,
  FileText,
  Award,
  AlertCircle
} from "lucide-react";

const mockStats = {
  totalSubjects: 6,
  attendanceRate: 92.5,
  assignmentsPending: 3,
  averageGrade: 85.2
};

const mockSubjects = [
  { id: '1', name: 'Computer Science', attendance: 95, grade: 'A', nextClass: '09:00 AM Tomorrow' },
  { id: '2', name: 'Mathematics', attendance: 88, grade: 'B+', nextClass: '11:00 AM Tomorrow' },
  { id: '3', name: 'Physics', attendance: 94, grade: 'A-', nextClass: '02:00 PM Today' },
  { id: '4', name: 'Chemistry', attendance: 91, grade: 'B+', nextClass: '04:00 PM Today' },
  { id: '5', name: 'English', attendance: 96, grade: 'A', nextClass: '10:00 AM Tomorrow' },
  { id: '6', name: 'History', attendance: 89, grade: 'B', nextClass: '03:00 PM Tomorrow' }
];

const mockAssignments = [
  { id: '1', title: 'Data Structures Project', subject: 'Computer Science', dueDate: 'Tomorrow', status: 'pending' },
  { id: '2', title: 'Calculus Problem Set', subject: 'Mathematics', dueDate: '3 days', status: 'pending' },
  { id: '3', title: 'Physics Lab Report', subject: 'Physics', dueDate: '1 week', status: 'pending' },
  { id: '4', title: 'Essay on Renaissance', subject: 'History', dueDate: 'Completed', status: 'completed' }
];

export default function StudentDashboard() {
  return (
    <DashboardLayout 
      title="Student Dashboard" 
      subtitle="Track your academic progress and stay organized"
    >
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subjects</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalSubjects}</div>
              <p className="text-xs text-muted-foreground">
                This semester
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{mockStats.attendanceRate}%</div>
              <p className="text-xs text-muted-foreground">
                Above 90% target
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
              <AlertCircle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{mockStats.assignmentsPending}</div>
              <p className="text-xs text-muted-foreground">
                Assignments due soon
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
              <Award className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{mockStats.averageGrade}</div>
              <p className="text-xs text-muted-foreground">
                +3.2 from last term
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* My Subjects */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                My Subjects
              </CardTitle>
              <CardDescription>
                Your enrolled subjects and performance overview
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockSubjects.map((subject) => (
                  <div key={subject.id} className="p-4 border border-border rounded-lg bg-background/50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">{subject.name}</h4>
                      <Badge variant="outline" className={
                        subject.grade.startsWith('A') ? 'border-success text-success' :
                        subject.grade.startsWith('B') ? 'border-primary text-primary' : 
                        'border-warning text-warning'
                      }>
                        {subject.grade}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Attendance</span>
                        <span className="font-medium">{subject.attendance}%</span>
                      </div>
                      <Progress 
                        value={subject.attendance} 
                        className="h-2"
                      />
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        Next class: {subject.nextClass}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Assignments & Tasks */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Assignments & Tasks
              </CardTitle>
              <CardDescription>
                Keep track of your upcoming deadlines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAssignments.map((assignment) => (
                  <div key={assignment.id} className="p-4 border border-border rounded-lg bg-background/50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground mb-1">{assignment.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{assignment.subject}</p>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={assignment.status === 'completed' ? 'default' : 'outline'}
                            className={
                              assignment.status === 'completed' ? 'bg-success' :
                              assignment.dueDate === 'Tomorrow' ? 'border-error text-error' :
                              'border-warning text-warning'
                            }
                          >
                            {assignment.status === 'completed' ? 'Completed' : `Due ${assignment.dueDate}`}
                          </Badge>
                        </div>
                      </div>
                      {assignment.status === 'pending' && (
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View All Assignments
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Schedule */}
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Today's Schedule
            </CardTitle>
            <CardDescription>
              Your classes for today, {new Date().toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 border border-border rounded-lg bg-background/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Physics</span>
                  <Badge variant="secondary">2:00 PM</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Room 201 • Prof. Johnson</p>
              </div>
              <div className="p-4 border border-border rounded-lg bg-background/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Chemistry</span>
                  <Badge variant="secondary">4:00 PM</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Lab 3 • Dr. Smith</p>
              </div>
              <div className="p-4 border border-muted-foreground/20 rounded-lg bg-muted/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">No more classes</span>
                  <Badge variant="outline">Rest</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Enjoy your evening!</p>
              </div>
              <div className="p-4 border border-primary/20 bg-primary/5 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Study Time</span>
                  <Badge variant="outline" className="border-primary text-primary">Suggested</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Review today's lessons</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}