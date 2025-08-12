import { ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
  requireBranch?: boolean;
}

const ProtectedRoute = ({ children, requireBranch = true }: ProtectedRouteProps) => {
  const { student, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loading) return;

    // Not authenticated - redirect to auth
    if (!student) {
      navigate('/auth');
      return;
    }

    // Authenticated but no branch selected - redirect to branch selection
    if (requireBranch && !student.branch_selected && location.pathname !== '/branch-selection') {
      navigate('/branch-selection');
      return;
    }

    // Has branch selected but on branch selection page - redirect to dashboard
    if (student.branch_selected && location.pathname === '/branch-selection') {
      navigate('/dashboard');
      return;
    }
  }, [student, loading, navigate, location.pathname, requireBranch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Don't render children if redirecting
  if (!student || (requireBranch && !student.branch_selected && location.pathname !== '/branch-selection')) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
