import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface Student {
  id: string;
  email: string;
  enrollment_no: string;
  first_name: string | null;
  last_name: string | null;
  department: string | null;
  year_of_study: number | null;
  is_active: boolean;
  branch_selected: boolean;
}

interface AuthContextType {
  student: Student | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  updateBranchSelection: (department: string) => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const studentData = localStorage.getItem('gate_club_student');
      if (!studentData) {
        setLoading(false);
        return;
      }

      const student = JSON.parse(studentData);
      setStudent(student);
    } catch (error) {
      localStorage.removeItem('gate_club_student');
      setStudent(null);
    }
    setLoading(false);
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Validate university email domain
      if (!email.endsWith('@university.edu')) {
        return { error: 'Only university email addresses (@university.edu) are allowed' };
      }

      // Demo user credentials
      const demoUsers = {
        'rudraksh@university.edu': {
          id: '1',
          email: 'rudraksh@university.edu',
          enrollment_no: 'SOE2021CS001',
          first_name: 'Rudraksh',
          last_name: 'Patel',
          department: null,
          year_of_study: 4,
          is_active: true,
          branch_selected: false,
          password: 'test'
        }
      };

      const userData = demoUsers[email as keyof typeof demoUsers];
      if (!userData) {
        return { error: 'Email not found or account is inactive. Please contact admin for account approval.' };
      }

      if (userData.password !== password) {
        return { error: 'Invalid password' };
      }

      // Store user data in localStorage
      localStorage.setItem('gate_club_student', JSON.stringify(userData));
      setStudent(userData);
      return { error: null };
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  };

  const signUp = async (email: string, password: string) => {
    // For this system, signup is just first-time login since emails are pre-registered by admin
    return signIn(email, password);
  };

  const updateBranchSelection = async (department: string) => {
    try {
      if (!student) {
        return { error: 'Not authenticated' };
      }

      // Update local student state
      const updatedStudent = { ...student, department, branch_selected: true };
      setStudent(updatedStudent);
      localStorage.setItem('gate_club_student', JSON.stringify(updatedStudent));
      return { error: null };
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  };

  const signOut = async () => {
    localStorage.removeItem('gate_club_student');
    setStudent(null);
  };

  const value = {
    student,
    loading,
    signIn,
    signUp,
    signOut,
    updateBranchSelection,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
