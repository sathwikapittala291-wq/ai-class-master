import React, { createContext, useContext, useEffect, useState } from 'react';

export type UserRole = 'admin' | 'teacher' | 'student' | 'parent';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  schoolId?: string;
  classIds?: string[];
  studentIds?: string[]; // For parents
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth token and validate
    const token = localStorage.getItem('auth_token');
    if (token) {
      // In production, validate token with backend
      // For now, use demo user
      setUser({
        id: '1',
        email: 'teacher@school.edu',
        name: 'John Teacher',
        role: 'teacher',
        schoolId: 'school-1',
        classIds: ['class-1', 'class-2']
      });
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In production, this would call your backend API
      // Mock login for demo
      const mockUsers: User[] = [
        {
          id: '1',
          email: 'teacher@school.edu',
          name: 'John Teacher',
          role: 'teacher',
          schoolId: 'school-1',
          classIds: ['class-1', 'class-2']
        },
        {
          id: '2',
          email: 'student@school.edu',
          name: 'Jane Student',
          role: 'student',
          schoolId: 'school-1'
        },
        {
          id: '3',
          email: 'parent@email.com',
          name: 'Bob Parent',
          role: 'parent',
          schoolId: 'school-1',
          studentIds: ['student-1']
        },
        {
          id: '4',
          email: 'admin@school.edu',
          name: 'Alice Admin',
          role: 'admin',
          schoolId: 'school-1'
        }
      ];

      const foundUser = mockUsers.find(u => u.email === email);
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('auth_token', 'demo-token');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // In production, this would call your backend API
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        role,
        schoolId: 'school-1'
      };
      setUser(newUser);
      localStorage.setItem('auth_token', 'demo-token');
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};