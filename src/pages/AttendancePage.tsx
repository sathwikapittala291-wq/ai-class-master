import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  CheckCircle2, 
  XCircle, 
  Camera, 
  Mic, 
  Brain,
  Upload,
  Play,
  AlertTriangle,
  Download
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  avatar?: string;
  status: 'present' | 'absent' | 'unmarked';
  aiConfidence?: number;
  aiSuggestion?: 'present' | 'absent';
}

interface AttendanceSession {
  classId: string;
  className: string;
  sectionId: string;
  sectionName: string;
  date: string;
  students: Student[];
}

// Mock data - replace with API calls
const mockClasses = [
  { id: 'class-1', name: 'Computer Science' },
  { id: 'class-2', name: 'Mathematics' },
  { id: 'class-3', name: 'Physics' }
];

const mockSections = [
  { id: 'sec-a', name: 'Section A', classId: 'class-1' },
  { id: 'sec-b', name: 'Section B', classId: 'class-1' },
  { id: 'sec-c', name: 'Section C', classId: 'class-2' }
];

const mockStudents: Student[] = [
  { id: '1', name: 'Alice Johnson', rollNumber: 'CS001', status: 'unmarked' },
  { id: '2', name: 'Bob Smith', rollNumber: 'CS002', status: 'unmarked' },
  { id: '3', name: 'Charlie Brown', rollNumber: 'CS003', status: 'unmarked' },
  { id: '4', name: 'Diana Prince', rollNumber: 'CS004', status: 'unmarked' },
  { id: '5', name: 'Edward Wilson', rollNumber: 'CS005', status: 'unmarked' },
  { id: '6', name: 'Fiona Davis', rollNumber: 'CS006', status: 'unmarked' },
  { id: '7', name: 'George Miller', rollNumber: 'CS007', status: 'unmarked' },
  { id: '8', name: 'Hannah Lee', rollNumber: 'CS008', status: 'unmarked' }
];

export default function AttendancePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [session, setSession] = useState<AttendanceSession | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [aiResults, setAiResults] = useState<any[]>([]);

  // Check for unsaved changes when navigating away
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const loadAttendanceSession = () => {
    if (!selectedClass || !selectedSection) return;

    const classInfo = mockClasses.find(c => c.id === selectedClass);
    const sectionInfo = mockSections.find(s => s.id === selectedSection);
    
    if (classInfo && sectionInfo) {
      setSession({
        classId: selectedClass,
        className: classInfo.name,
        sectionId: selectedSection,
        sectionName: sectionInfo.name,
        date: selectedDate,
        students: mockStudents.map(s => ({ ...s, status: 'unmarked' as const }))
      });
      setHasUnsavedChanges(false);
    }
  };

  const updateStudentStatus = (studentId: string, status: 'present' | 'absent') => {
    if (!session) return;
    
    setSession({
      ...session,
      students: session.students.map(s => 
        s.id === studentId ? { ...s, status, aiSuggestion: undefined, aiConfidence: undefined } : s
      )
    });
    setHasUnsavedChanges(true);
  };

  const handleFaceRecognition = async () => {
    setIsAiProcessing(true);
    toast({
      title: "Starting Face Recognition",
      description: "Processing images for attendance marking...",
    });

    // Simulate AI processing
    setTimeout(() => {
      const aiSuggestions = [
        { studentId: '1', confidence: 0.95, suggested: 'present' },
        { studentId: '3', confidence: 0.88, suggested: 'present' },
        { studentId: '5', confidence: 0.92, suggested: 'present' },
      ];

      setAiResults(aiSuggestions);
      
      if (session) {
        setSession({
          ...session,
          students: session.students.map(s => {
            const suggestion = aiSuggestions.find(ai => ai.studentId === s.id);
            return suggestion 
              ? { ...s, aiSuggestion: suggestion.suggested as 'present' | 'absent', aiConfidence: suggestion.confidence }
              : s;
          })
        });
      }

      setIsAiProcessing(false);
      toast({
        title: "Face Recognition Complete",
        description: `Found ${aiSuggestions.length} students. Review suggestions below.`,
      });
    }, 3000);
  };

  const handleVoiceRecognition = async () => {
    setIsAiProcessing(true);
    toast({
      title: "Starting Voice Recognition",
      description: "Processing audio for attendance marking...",
    });

    // Simulate AI processing
    setTimeout(() => {
      const aiSuggestions = [
        { studentId: '2', confidence: 0.91, suggested: 'present' },
        { studentId: '4', confidence: 0.87, suggested: 'present' },
      ];

      setAiResults(prev => [...prev, ...aiSuggestions]);
      
      if (session) {
        setSession({
          ...session,
          students: session.students.map(s => {
            const suggestion = aiSuggestions.find(ai => ai.studentId === s.id);
            return suggestion 
              ? { ...s, aiSuggestion: suggestion.suggested as 'present' | 'absent', aiConfidence: suggestion.confidence }
              : s;
          })
        });
      }

      setIsAiProcessing(false);
      toast({
        title: "Voice Recognition Complete",
        description: `Found ${aiSuggestions.length} additional students.`,
      });
    }, 2500);
  };

  const acceptAiSuggestion = (studentId: string) => {
    if (!session) return;
    
    const student = session.students.find(s => s.id === studentId);
    if (student?.aiSuggestion) {
      updateStudentStatus(studentId, student.aiSuggestion);
    }
  };

  const submitAttendance = async () => {
    if (!session) return;

    try {
      // In production, this would call your backend API
      // POST /api/attendance with session data
      
      toast({
        title: "Attendance Submitted",
        description: `Successfully recorded attendance for ${session.className} - ${session.sectionName}`,
      });
      
      setHasUnsavedChanges(false);
      navigate(`/${user?.role}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit attendance. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getPresentCount = () => session?.students.filter(s => s.status === 'present').length || 0;
  const getAbsentCount = () => session?.students.filter(s => s.status === 'absent').length || 0;
  const getUnmarkedCount = () => session?.students.filter(s => s.status === 'unmarked').length || 0;

  if (user?.role !== 'teacher' && user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Only teachers and administrators can access the attendance marking page.
            </p>
            <Link to={`/${user?.role}`}>
              <Button>Return to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="px-4 py-4 lg:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to={`/${user?.role}`}>
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Mark Attendance</h1>
                <p className="text-muted-foreground">
                  AI-powered attendance tracking system
                </p>
              </div>
            </div>
            
            {hasUnsavedChanges && (
              <Badge variant="outline" className="border-warning text-warning">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Unsaved Changes
              </Badge>
            )}
          </div>
        </div>
      </header>

      <div className="p-4 lg:p-6 max-w-7xl mx-auto">
        {/* Controls */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Session Details
            </CardTitle>
            <CardDescription>
              Select class, section, and date to begin attendance marking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  {mockClasses.map(cls => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedSection} onValueChange={setSelectedSection}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Section" />
                </SelectTrigger>
                <SelectContent>
                  {mockSections
                    .filter(sec => sec.classId === selectedClass)
                    .map(sec => (
                      <SelectItem key={sec.id} value={sec.id}>
                        {sec.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-2 border border-input rounded-md bg-background"
              />

              <Button onClick={loadAttendanceSession} disabled={!selectedClass || !selectedSection}>
                Load Students
              </Button>
            </div>
          </CardContent>
        </Card>

        {session && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Student List */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        {session.className} - {session.sectionName}
                      </CardTitle>
                      <CardDescription>
                        {new Date(session.date).toLocaleDateString()} • {session.students.length} students
                      </CardDescription>
                    </div>
                    <div className="flex gap-2 text-sm">
                      <Badge variant="outline" className="border-success text-success">
                        Present: {getPresentCount()}
                      </Badge>
                      <Badge variant="outline" className="border-error text-error">
                        Absent: {getAbsentCount()}
                      </Badge>
                      <Badge variant="outline">
                        Unmarked: {getUnmarkedCount()}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {session.students.map((student) => (
                      <div 
                        key={student.id} 
                        className="flex items-center justify-between p-3 border border-border rounded-lg bg-gradient-card"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                              {student.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{student.name}</p>
                            <p className="text-sm text-muted-foreground">Roll: {student.rollNumber}</p>
                            {student.aiSuggestion && (
                              <div className="flex items-center gap-2 mt-1">
                                <Brain className="w-3 h-3 text-primary" />
                                <span className="text-xs text-primary">
                                  AI suggests: {student.aiSuggestion} ({Math.round((student.aiConfidence || 0) * 100)}%)
                                </span>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="h-5 px-2 text-xs"
                                  onClick={() => acceptAiSuggestion(student.id)}
                                >
                                  Accept
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant={student.status === 'present' ? 'default' : 'outline'}
                            className={student.status === 'present' ? 'bg-success hover:bg-success/90' : ''}
                            onClick={() => updateStudentStatus(student.id, 'present')}
                          >
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                            Present
                          </Button>
                          <Button
                            size="sm"
                            variant={student.status === 'absent' ? 'default' : 'outline'}
                            className={student.status === 'absent' ? 'bg-error hover:bg-error/90' : ''}
                            onClick={() => updateStudentStatus(student.id, 'absent')}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Absent
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Panel */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    AI Attendance
                  </CardTitle>
                  <CardDescription>
                    Use AI to automatically detect and mark attendance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    onClick={handleFaceRecognition}
                    disabled={isAiProcessing}
                    className="w-full"
                    variant="outline"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    {isAiProcessing ? 'Processing...' : 'Face Recognition'}
                  </Button>
                  
                  <Button 
                    onClick={handleVoiceRecognition}
                    disabled={isAiProcessing}
                    className="w-full"
                    variant="outline"
                  >
                    <Mic className="w-4 h-4 mr-2" />
                    {isAiProcessing ? 'Processing...' : 'Voice Recognition'}
                  </Button>

                  <Button 
                    className="w-full"
                    variant="outline"
                    disabled={isAiProcessing}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Batch Upload
                  </Button>

                  {isAiProcessing && (
                    <div className="flex items-center justify-center p-4">
                      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                      <span className="ml-2 text-sm text-muted-foreground">Processing AI recognition...</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total Students:</span>
                    <span className="font-medium">{session.students.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-success">Present:</span>
                    <span className="font-medium text-success">{getPresentCount()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-error">Absent:</span>
                    <span className="font-medium text-error">{getAbsentCount()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Unmarked:</span>
                    <span className="font-medium">{getUnmarkedCount()}</span>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex justify-between font-medium">
                      <span>Attendance Rate:</span>
                      <span>{Math.round((getPresentCount() / (getPresentCount() + getAbsentCount()) || 0) * 100)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Sticky Footer */}
        {session && (
          <div className="sticky bottom-0 bg-card border-t border-border mt-6 p-4 -mx-4 lg:-mx-6">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="text-sm text-muted-foreground">
                {hasUnsavedChanges ? 'You have unsaved changes' : 'All changes saved'}
              </div>
              <div className="flex gap-3">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    if (hasUnsavedChanges) {
                      const confirm = window.confirm('You have unsaved changes. Are you sure you want to cancel?');
                      if (confirm) navigate(`/${user?.role}`);
                    } else {
                      navigate(`/${user?.role}`);
                    }
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={submitAttendance}
                  disabled={getUnmarkedCount() > 0}
                  className="bg-gradient-attendance hover:opacity-90"
                >
                  Submit Attendance
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}