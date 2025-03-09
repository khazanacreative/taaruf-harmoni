
import { Navigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Check if user is authenticated
  const authData = localStorage.getItem('taaruf_auth');
  const isAuthenticated = authData ? JSON.parse(authData).isAuthenticated : false;

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  // Wrap the children with our app layout
  return <AppLayout>{children}</AppLayout>;
};

export default ProtectedRoute;
