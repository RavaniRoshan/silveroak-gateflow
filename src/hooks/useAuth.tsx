import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

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
  signIn: (enrollmentNo: string, password: string) => Promise<{ error: string | null }>;
  signUp: (enrollmentNo: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
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
      const token = localStorage.getItem('gate_club_token');
      if (!token) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('auth_sessions')
        .select(`
          student_id,
          expires_at,
          students (
            id,
            enrollment_no,
            first_name,
            last_name,
            department,
            year_of_study,
            is_active
          )
        `)
        .eq('session_token', token)
        .gt('expires_at', new Date().toISOString())
        .maybeSingle();

      if (error || !data || !data.students) {
        localStorage.removeItem('gate_club_token');
        setStudent(null);
      } else {
        setStudent(data.students as Student);
      }
    } catch (error) {
      localStorage.removeItem('gate_club_token');
      setStudent(null);
    }
    setLoading(false);
  };

  const signIn = async (enrollmentNo: string, password: string) => {
    try {
      // First check if student exists
      const { data: studentData, error: studentError } = await supabase
        .from('students')
        .select('*')
        .eq('enrollment_no', enrollmentNo)
        .eq('is_active', true)
        .maybeSingle();

      if (studentError || !studentData) {
        return { error: 'Enrollment number not found or account is inactive' };
      }

      // If no password set, this is first time login - set password
      if (!studentData.password_hash) {
        const hashedPassword = btoa(password); // Simple encoding for demo
        
        const { error: updateError } = await supabase
          .from('students')
          .update({ password_hash: hashedPassword })
          .eq('id', studentData.id);

        if (updateError) {
          return { error: 'Failed to set password' };
        }
      } else {
        // Verify password
        const hashedPassword = btoa(password);
        if (studentData.password_hash !== hashedPassword) {
          return { error: 'Invalid password' };
        }
      }

      // Create session
      const sessionToken = btoa(JSON.stringify({ id: studentData.id, time: Date.now() }));
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

      const { error: sessionError } = await supabase
        .from('auth_sessions')
        .insert({
          student_id: studentData.id,
          session_token: sessionToken,
          expires_at: expiresAt.toISOString()
        });

      if (sessionError) {
        return { error: 'Failed to create session' };
      }

      localStorage.setItem('gate_club_token', sessionToken);
      setStudent(studentData);
      return { error: null };
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  };

  const signUp = async (enrollmentNo: string, password: string) => {
    // For this system, signup is just first-time login since enrollment numbers are pre-registered
    return signIn(enrollmentNo, password);
  };

  const signOut = async () => {
    const token = localStorage.getItem('gate_club_token');
    if (token) {
      await supabase
        .from('auth_sessions')
        .delete()
        .eq('session_token', token);
    }
    
    localStorage.removeItem('gate_club_token');
    setStudent(null);
  };

  const value = {
    student,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
