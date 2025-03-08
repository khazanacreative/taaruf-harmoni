
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { useToast } from '@/hooks/use-toast';

// Types
type TaarufPartner = {
  id: string;
  name: string;
  age: number;
  location: string;
};

type TaarufMessage = {
  id: number;
  content: string;
  date: string;
  sender: 'user' | 'partner';
};

type TaarufProcess = {
  id: string;
  partner: TaarufPartner;
  status: 'pending' | 'in_progress' | 'nadzor_requested' | 'nadzor_approved' | 'completed' | 'rejected';
  progress: number;
  currentStage: number;
  totalStages: number;
  startDate: string;
  messages: TaarufMessage[];
};

type TaarufRequest = {
  id: string;
  from: {
    id: string;
    name: string;
    age: number;
    location: string;
  };
  status: 'pending' | 'accepted' | 'rejected';
  requestDate: string;
};

type TaarufContextType = {
  activeTaaruf: TaarufProcess | null;
  taarufRequests: TaarufRequest[];
  isLoading: boolean;
  sendTaarufRequest: (userId: string) => Promise<void>;
  acceptTaarufRequest: (requestId: string) => Promise<void>;
  rejectTaarufRequest: (requestId: string) => Promise<void>;
  sendMessage: (message: string) => Promise<void>;
  requestNadzor: () => Promise<void>;
  endTaarufProcess: (reason: string) => Promise<void>;
};

// Create context
const TaarufContext = createContext<TaarufContextType | undefined>(undefined);

// Provider
export const TaarufProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTaaruf, setActiveTaaruf] = useState<TaarufProcess | null>(null);
  const [taarufRequests, setTaarufRequests] = useState<TaarufRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load data when user changes
  useEffect(() => {
    if (user) {
      loadTaarufData();
    } else {
      // Reset state when logged out
      setActiveTaaruf(null);
      setTaarufRequests([]);
      setIsLoading(false);
    }
  }, [user]);

  const loadTaarufData = async () => {
    setIsLoading(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockRequests: TaarufRequest[] = [
        {
          id: '1',
          from: {
            id: '101',
            name: 'Ahmad Ibrahim',
            age: 29,
            location: 'Jakarta'
          },
          status: 'pending',
          requestDate: '2023-06-10'
        }
      ];
      
      // Mock active taaruf (optional)
      const mockActiveTaaruf: TaarufProcess | null = null;
      
      setTaarufRequests(mockRequests);
      setActiveTaaruf(mockActiveTaaruf);
    } catch (error) {
      toast({
        title: 'Error loading data',
        description: 'Failed to load taaruf data. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Actions
  const sendTaarufRequest = async (userId: string) => {
    setIsLoading(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Request sent',
        description: 'Your taaruf request has been sent successfully.',
      });
    } catch (error) {
      toast({
        title: 'Request failed',
        description: 'Failed to send taaruf request. Please try again.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const acceptTaarufRequest = async (requestId: string) => {
    setIsLoading(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find the request
      const request = taarufRequests.find(req => req.id === requestId);
      
      if (!request) {
        throw new Error('Request not found');
      }
      
      // Create new taaruf process
      const newTaarufProcess: TaarufProcess = {
        id: `taaruf-${Math.random().toString(36).substring(2, 9)}`,
        partner: {
          id: request.from.id,
          name: request.from.name,
          age: request.from.age,
          location: request.from.location
        },
        status: 'in_progress',
        progress: 0,
        currentStage: 1,
        totalStages: 5,
        startDate: new Date().toISOString().split('T')[0],
        messages: []
      };
      
      // Update state
      setActiveTaaruf(newTaarufProcess);
      setTaarufRequests(prev => prev.filter(req => req.id !== requestId));
      
      toast({
        title: 'Request accepted',
        description: 'You have accepted the taaruf request. The process has started.',
      });
    } catch (error) {
      toast({
        title: 'Action failed',
        description: 'Failed to accept taaruf request. Please try again.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const rejectTaarufRequest = async (requestId: string) => {
    setIsLoading(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update state
      setTaarufRequests(prev => prev.filter(req => req.id !== requestId));
      
      toast({
        title: 'Request rejected',
        description: 'You have rejected the taaruf request.',
      });
    } catch (error) {
      toast({
        title: 'Action failed',
        description: 'Failed to reject taaruf request. Please try again.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (message: string) => {
    if (!activeTaaruf) {
      toast({
        title: 'No active taaruf',
        description: 'You need an active taaruf process to send messages.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new message
      const newMessage: TaarufMessage = {
        id: activeTaaruf.messages.length + 1,
        content: message,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        sender: 'user'
      };
      
      // Update state
      setActiveTaaruf(prev => {
        if (!prev) return null;
        
        const newProgress = Math.min(prev.progress + 5, 100);
        const newStage = newProgress >= 95 ? Math.min(prev.currentStage + 1, prev.totalStages) : prev.currentStage;
        
        return {
          ...prev,
          messages: [...prev.messages, newMessage],
          progress: newProgress,
          currentStage: newStage
        };
      });
      
      toast({
        title: 'Message sent',
        description: 'Your message has been sent successfully.',
      });
    } catch (error) {
      toast({
        title: 'Failed to send message',
        description: 'There was an error sending your message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const requestNadzor = async () => {
    if (!activeTaaruf) {
      toast({
        title: 'No active taaruf',
        description: 'You need an active taaruf process to request a nadzor meeting.',
        variant: 'destructive',
      });
      return;
    }
    
    if (activeTaaruf.progress < 50) {
      toast({
        title: 'Process not ready',
        description: 'The taaruf process needs to progress further before requesting a nadzor meeting.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update state
      setActiveTaaruf(prev => {
        if (!prev) return null;
        
        return {
          ...prev,
          status: 'nadzor_requested'
        };
      });
      
      toast({
        title: 'Nadzor requested',
        description: 'Your request for a nadzor meeting has been sent. Waiting for response.',
      });
    } catch (error) {
      toast({
        title: 'Request failed',
        description: 'Failed to request nadzor meeting. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const endTaarufProcess = async (reason: string) => {
    if (!activeTaaruf) {
      toast({
        title: 'No active taaruf',
        description: 'You do not have an active taaruf process to end.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update state
      setActiveTaaruf(prev => {
        if (!prev) return null;
        
        return {
          ...prev,
          status: 'rejected'
        };
      });
      
      toast({
        title: 'Process ended',
        description: 'The taaruf process has been ended. You can now start a new search.',
      });
    } catch (error) {
      toast({
        title: 'Action failed',
        description: 'Failed to end the taaruf process. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TaarufContext.Provider value={{
      activeTaaruf,
      taarufRequests,
      isLoading,
      sendTaarufRequest,
      acceptTaarufRequest,
      rejectTaarufRequest,
      sendMessage,
      requestNadzor,
      endTaarufProcess
    }}>
      {children}
    </TaarufContext.Provider>
  );
};

// Hook
export const useTaaruf = () => {
  const context = useContext(TaarufContext);
  
  if (context === undefined) {
    throw new Error('useTaaruf must be used within a TaarufProvider');
  }
  
  return context;
};
