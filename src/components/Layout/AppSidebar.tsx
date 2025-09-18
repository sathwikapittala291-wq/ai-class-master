import { useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  CheckSquare, 
  BarChart3, 
  Settings, 
  User,
  GraduationCap,
  BookOpen,
  UserCheck,
  Bell,
  FileText
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const getNavigationItems = (role: string) => {
  const baseItems = [
    { title: "Dashboard", url: `/${role}`, icon: LayoutDashboard },
    { title: "Profile", url: "/profile", icon: User },
    { title: "Settings", url: "/settings", icon: Settings },
  ];

  const roleSpecificItems = {
    teacher: [
      { title: "Classes", url: "/teacher/classes", icon: BookOpen },
      { title: "Attendance", url: "/attendance", icon: UserCheck },
      { title: "Gradebook", url: "/teacher/gradebook", icon: BarChart3 },
      { title: "Schedule", url: "/teacher/schedule", icon: Calendar },
    ],
    student: [
      { title: "My Classes", url: "/student/classes", icon: BookOpen },
      { title: "My Attendance", url: "/student/attendance", icon: CheckSquare },
      { title: "Grades", url: "/student/grades", icon: BarChart3 },
      { title: "Schedule", url: "/student/schedule", icon: Calendar },
      { title: "Assignments", url: "/student/assignments", icon: FileText },
    ],
    parent: [
      { title: "Children", url: "/parent/children", icon: Users },
      { title: "Attendance", url: "/parent/attendance", icon: CheckSquare },
      { title: "Grades", url: "/parent/grades", icon: BarChart3 },
      { title: "Notifications", url: "/parent/notifications", icon: Bell },
      { title: "Reports", url: "/parent/reports", icon: FileText },
    ],
    admin: [
      { title: "Users", url: "/admin/users", icon: Users },
      { title: "Classes", url: "/admin/classes", icon: GraduationCap },
      { title: "Attendance", url: "/attendance", icon: UserCheck },
      { title: "Reports", url: "/admin/reports", icon: BarChart3 },
      { title: "System", url: "/admin/system", icon: Settings },
    ]
  };

  return [
    ...baseItems.slice(0, 1), // Dashboard first
    ...(roleSpecificItems[role as keyof typeof roleSpecificItems] || []),
    ...baseItems.slice(1) // Profile and Settings last
  ];
};

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { user } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  const items = user ? getNavigationItems(user.role) : [];
  
  const isActive = (path: string) => {
    if (path === `/${user?.role}` && currentPath === `/${user?.role}`) return true;
    if (path !== `/${user?.role}` && currentPath.startsWith(path)) return true;
    return false;
  };

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    `w-full justify-start transition-colors ${
      isActive 
        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
        : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
    }`;

  if (!user) return null;

  return (
    <Sidebar
      className={`${isCollapsed ? "w-14" : "w-64"} bg-sidebar border-r border-sidebar-border transition-all duration-300`}
      collapsible="icon"
    >
      <SidebarContent className="bg-sidebar">
        {/* Logo/Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="text-sidebar-foreground font-semibold text-sm">SmartEdu</h2>
                <p className="text-sidebar-foreground/70 text-xs capitalize">{user.role} Portal</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup className="px-2 py-4">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavCls({ isActive: isActive(item.url) })}
                    >
                      <item.icon className={`h-4 w-4 ${isCollapsed ? 'mx-auto' : 'mr-3'}`} />
                      {!isCollapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User info at bottom */}
        {!isCollapsed && (
          <div className="mt-auto p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sidebar-foreground text-sm font-medium truncate">
                  {user.name}
                </p>
                <p className="text-sidebar-foreground/70 text-xs truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}