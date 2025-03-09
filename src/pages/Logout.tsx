
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Logout = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    // Clear auth data from localStorage
    localStorage.removeItem('taaruf_auth');
    
    // Show success toast
    toast({
      title: 'Logged out successfully',
      description: 'You have been logged out of your account.',
    });
  }, [toast]);
  
  // Redirect to login page
  return <Navigate to="/login" replace />;
};

export default Logout;
