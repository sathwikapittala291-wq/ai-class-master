import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Shield,
  Camera,
  Save,
  Eye,
  EyeOff
} from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    address: '123 Education Street, Learning City, LC 12345',
    dateOfBirth: '1990-01-15',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSave = async () => {
    // In production, this would call your backend API
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '+1 (555) 123-4567',
      address: '123 Education Street, Learning City, LC 12345',
      dateOfBirth: '1990-01-15',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setIsEditing(false);
  };

  return (
    <DashboardLayout 
      title="Profile Settings" 
      subtitle="Manage your personal information and account settings"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <Button 
                  size="sm" 
                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0"
                  variant="outline"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-foreground">{user?.name}</h2>
                <p className="text-muted-foreground">{user?.email}</p>
                <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                  <Badge 
                    variant="outline" 
                    className="capitalize border-primary text-primary"
                  >
                    <Shield className="w-3 h-3 mr-1" />
                    {user?.role}
                  </Badge>
                  <Badge variant="outline" className="border-success text-success">
                    Active
                  </Badge>
                </div>
              </div>
              
              <div className="flex gap-2">
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave} className="bg-gradient-primary hover:opacity-90">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Your basic profile information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>

          {/* Address Information */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Address Information
              </CardTitle>
              <CardDescription>
                Your contact and location details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <textarea
                  id="address"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground resize-none"
                  rows={3}
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              
              {user?.role === 'teacher' && (
                <>
                  <div className="space-y-2">
                    <Label>Department</Label>
                    <Input
                      value="Computer Science"
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Employee ID</Label>
                    <Input
                      value="EMP001"
                      disabled
                      className="bg-muted"
                    />
                  </div>
                </>
              )}
              
              {user?.role === 'student' && (
                <>
                  <div className="space-y-2">
                    <Label>Student ID</Label>
                    <Input
                      value="STU2024001"
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Class</Label>
                    <Input
                      value="Grade 10-A"
                      disabled
                      className="bg-muted"
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Security Settings */}
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security Settings
            </CardTitle>
            <CardDescription>
              Manage your account security and password
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPassword ? "text" : "password"}
                      value={formData.currentPassword}
                      onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                      placeholder="Enter current password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={formData.newPassword}
                      onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                      placeholder="Enter new password"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
              </>
            )}
            
            <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-background/50">
              <div>
                <h4 className="font-medium text-foreground">Two-Factor Authentication</h4>
                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
              </div>
              <Button variant="outline" size="sm">
                Enable 2FA
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-background/50">
              <div>
                <h4 className="font-medium text-foreground">Login History</h4>
                <p className="text-sm text-muted-foreground">View your recent login activity</p>
              </div>
              <Button variant="outline" size="sm">
                View History
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Account Activity */}
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Account Activity
            </CardTitle>
            <CardDescription>
              Your recent account activities and sessions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-background/50">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <div>
                    <p className="font-medium text-foreground">Logged in from Chrome on Windows</p>
                    <p className="text-sm text-muted-foreground">Today at 9:30 AM • IP: 192.168.1.100</p>
                  </div>
                </div>
                <Badge variant="outline" className="border-success text-success">Current</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-background/50">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                  <div>
                    <p className="font-medium text-foreground">Logged in from Safari on iPhone</p>
                    <p className="text-sm text-muted-foreground">Yesterday at 6:45 PM • IP: 192.168.1.105</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-background/50">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                  <div>
                    <p className="font-medium text-foreground">Profile updated</p>
                    <p className="text-sm text-muted-foreground">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}