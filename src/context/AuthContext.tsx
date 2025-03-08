
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

type User = {
  id: string;
  email: string;
  fullName: string;
  gender: string;
  hasCompletedCV: boolean;
  createdAt: string;
} | null;

type AuthContextType = {
  user: User;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string, gender: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('taaruf_user');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // This is mock authentication logic for demonstration
      // In a real app, we would make an API call to a backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'demo@example.com' && password === 'password') {
        const user = {
          id: '1',
          email,
          fullName: 'Demo User',
          gender: 'male',
          hasCompletedCV: false,
          createdAt: new Date().toISOString(),
        };
        
        setUser(user);
        localStorage.setItem('taaruf_user', JSON.stringify(user));
        
        toast({
          title: 'Logged in successfully',
          description: 'Welcome back to TaarufHarmoni!',
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast({
        title: 'Login failed',
        description: error instanceof Error ? error.message : 'Something went wrong',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, fullName: string, gender: string) => {
    setIsLoading(true);
    
    try {
      // This is mock registration logic for demonstration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = {
        id: Math.random().toString(36).substring(2, 15),
        email,
        fullName,
        gender,
        hasCompletedCV: false,
        createdAt: new Date().toISOString(),
      };
      
      setUser(user);
      localStorage.setItem('taaruf_user', JSON.stringify(user));
      
      toast({
        title: 'Registration successful',
        description: 'Your account has been created. Welcome to TaarufHarmoni!',
      });
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: error instanceof Error ? error.message : 'Something went wrong',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    // Clear user data
    setUser(null);
    localStorage.removeItem('taaruf_user');
    
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully.',
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      isAuthenticated: !!user,
      login, 
      register, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
