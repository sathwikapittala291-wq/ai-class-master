import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Moon,
  Globe,
  Download,
  Trash2,
  AlertTriangle,
  Smartphone,
  Mail,
  Volume2
} from "lucide-react";

export default function Settings() {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    attendance: true,
    grades: true,
    assignments: true,
    announcements: false
  });
  
  const [preferences, setPreferences] = useState({
    language: 'en',
    timezone: 'UTC-5',
    theme: 'system',
    soundEnabled: true
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Settings Updated",
      description: `${key} notifications ${value ? 'enabled' : 'disabled'}`,
    });
  };

  const handlePreferenceChange = (key: string, value: string | boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Preference Updated",
      description: `${key} setting has been changed`,
    });
  };

  return (
    <DashboardLayout 
      title="Settings" 
      subtitle="Customize your experience and manage your preferences"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Notifications */}
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Preferences
            </CardTitle>
            <CardDescription>
              Choose how and when you want to receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Notification Methods */}
            <div>
              <h4 className="font-medium text-foreground mb-4">Notification Methods</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notifications.email}
                    onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <Label htmlFor="push-notifications" className="font-medium">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
                    </div>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={notifications.push}
                    onCheckedChange={(checked) => handleNotificationChange('push', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Volume2 className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <Label htmlFor="sms-notifications" className="font-medium">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive important updates via SMS</p>
                    </div>
                  </div>
                  <Switch
                    id="sms-notifications"
                    checked={notifications.sms}
                    onCheckedChange={(checked) => handleNotificationChange('sms', checked)}
                  />
                </div>
              </div>
            </div>

            {/* Notification Types */}
            <div>
              <h4 className="font-medium text-foreground mb-4">Notification Types</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="attendance-notifications" className="font-medium">Attendance Updates</Label>
                    <p className="text-sm text-muted-foreground">Get notified about attendance changes</p>
                  </div>
                  <Switch
                    id="attendance-notifications"
                    checked={notifications.attendance}
                    onCheckedChange={(checked) => handleNotificationChange('attendance', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="grades-notifications" className="font-medium">Grade Updates</Label>
                    <p className="text-sm text-muted-foreground">Get notified when grades are posted</p>
                  </div>
                  <Switch
                    id="grades-notifications"
                    checked={notifications.grades}
                    onCheckedChange={(checked) => handleNotificationChange('grades', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="assignments-notifications" className="font-medium">Assignment Reminders</Label>
                    <p className="text-sm text-muted-foreground">Get reminded about upcoming assignments</p>
                  </div>
                  <Switch
                    id="assignments-notifications"
                    checked={notifications.assignments}
                    onCheckedChange={(checked) => handleNotificationChange('assignments', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="announcements-notifications" className="font-medium">School Announcements</Label>
                    <p className="text-sm text-muted-foreground">Receive general school announcements</p>
                  </div>
                  <Switch
                    id="announcements-notifications"
                    checked={notifications.announcements}
                    onCheckedChange={(checked) => handleNotificationChange('announcements', checked)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* App Preferences */}
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="w-5 h-5" />
              App Preferences
            </CardTitle>
            <CardDescription>
              Customize your app experience and display settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select 
                  value={preferences.language} 
                  onValueChange={(value) => handlePreferenceChange('language', value)}
                >
                  <SelectTrigger id="language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="hi">Hindi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select 
                  value={preferences.timezone} 
                  onValueChange={(value) => handlePreferenceChange('timezone', value)}
                >
                  <SelectTrigger id="timezone">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                    <SelectItem value="UTC-7">Mountain Time (UTC-7)</SelectItem>
                    <SelectItem value="UTC-6">Central Time (UTC-6)</SelectItem>
                    <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                    <SelectItem value="UTC+0">UTC (UTC+0)</SelectItem>
                    <SelectItem value="UTC+5.5">India Standard Time (UTC+5:30)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select 
                  value={preferences.theme} 
                  onValueChange={(value) => handlePreferenceChange('theme', value)}
                >
                  <SelectTrigger id="theme">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sound-enabled" className="font-medium">Sound Effects</Label>
                  <p className="text-sm text-muted-foreground">Play sounds for notifications and interactions</p>
                </div>
                <Switch
                  id="sound-enabled"
                  checked={preferences.soundEnabled}
                  onCheckedChange={(checked) => handlePreferenceChange('soundEnabled', checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Privacy & Security
            </CardTitle>
            <CardDescription>
              Manage your privacy settings and data preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-background/50">
              <div>
                <h4 className="font-medium text-foreground">AI Data Usage</h4>
                <p className="text-sm text-muted-foreground">Allow AI attendance system to use your biometric data</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-background/50">
              <div>
                <h4 className="font-medium text-foreground">Analytics</h4>
                <p className="text-sm text-muted-foreground">Help improve the app by sharing usage analytics</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-background/50">
              <div>
                <h4 className="font-medium text-foreground">Data Export</h4>
                <p className="text-sm text-muted-foreground">Download a copy of your data</p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="bg-gradient-card border-0 shadow-card border-error/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-error">
              <AlertTriangle className="w-5 h-5" />
              Danger Zone
            </CardTitle>
            <CardDescription>
              Irreversible actions that affect your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-error/20 bg-error/5 rounded-lg">
              <div>
                <h4 className="font-medium text-foreground">Reset All Settings</h4>
                <p className="text-sm text-muted-foreground">Reset all preferences to default values</p>
              </div>
              <Button variant="outline" size="sm" className="border-error text-error hover:bg-error hover:text-white">
                Reset Settings
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border border-error/20 bg-error/5 rounded-lg">
              <div>
                <h4 className="font-medium text-foreground">Delete Account</h4>
                <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
              </div>
              <Button variant="outline" size="sm" className="border-error text-error hover:bg-error hover:text-white">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Information */}
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              System Information
            </CardTitle>
            <CardDescription>
              App version and system details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">App Version</span>
                <Badge variant="outline">v2.1.0</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Build</span>
                <Badge variant="outline">Production</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated</span>
                <span className="text-sm font-medium">2 days ago</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">API Version</span>
                <Badge variant="outline">v1.5.2</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}