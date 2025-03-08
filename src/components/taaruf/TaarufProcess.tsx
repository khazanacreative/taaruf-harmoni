
import { useState } from 'react';
import { 
  MessageSquare, 
  Eye, 
  Check, 
  X, 
  Heart, 
  Loader2, 
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

// Mock active taaruf for demonstration
const MOCK_ACTIVE_TAARUF = {
  id: 123,
  partner: {
    id: 2,
    name: "Fatima Zahra",
    age: 26,
    location: "Bandung"
  },
  status: "in_progress", // in_progress, nadzor_requested, nadzor_approved, completed, rejected
  progress: 70,
  currentStage: 3,
  totalStages: 5,
  startDate: "2023-06-15",
  messages: [
    {
      id: 1,
      date: "June 15, 2023",
      content: "Assalamu'alaikum, I'm interested in getting to know you better through this taaruf process.",
      sender: "partner"
    },
    {
      id: 2,
      date: "June 16, 2023",
      content: "Wa'alaikumussalam, I appreciate your interest. I'm looking forward to our conversation.",
      sender: "user"
    },
    {
      id: 3,
      date: "June 18, 2023",
      content: "What are your thoughts on raising children with strong Islamic values in today's world?",
      sender: "partner"
    }
  ]
};

// Define the TaarufProcess component
const TaarufProcess = () => {
  const [activeTaaruf, setActiveTaaruf] = useState(MOCK_ACTIVE_TAARUF);
  const [message, setMessage] = useState("");
  const [isNadzorRequested, setIsNadzorRequested] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showRejectionDialog, setShowRejectionDialog] = useState(false);
  const { toast } = useToast();
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const newMessage = {
        id: activeTaaruf.messages.length + 1,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        content: message,
        sender: "user"
      };
      
      setActiveTaaruf(prev => ({
        ...prev,
        messages: [...prev.messages, newMessage],
        progress: Math.min(prev.progress + 5, 100),
        currentStage: prev.progress >= 95 ? prev.currentStage + 1 : prev.currentStage
      }));
      
      setMessage("");
      setIsLoading(false);
      
      toast({
        title: "Message Sent",
        description: "Your message has been sent successfully.",
      });
    }, 1000);
  };
  
  const handleRequestNadzor = () => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setActiveTaaruf(prev => ({
        ...prev,
        status: "nadzor_requested"
      }));
      
      setIsNadzorRequested(true);
      setIsLoading(false);
      
      toast({
        title: "Nadzor Meeting Requested",
        description: "Your request for a Nadzor meeting has been sent. Waiting for approval.",
      });
    }, 1500);
  };
  
  const handleRejectTaaruf = () => {
    if (!rejectionReason.trim()) {
      toast({
        title: "Reason Required",
        description: "Please provide a reason for rejecting the taaruf process.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setActiveTaaruf(prev => ({
        ...prev,
        status: "rejected"
      }));
      
      setIsLoading(false);
      setShowRejectionDialog(false);
      
      toast({
        title: "Taaruf Process Ended",
        description: "You have ended the taaruf process. You can now start a new search.",
      });
    }, 1500);
  };
  
  // Render empty state if no active taaruf
  if (!activeTaaruf) {
    return (
      <Card className="border-dashed">
        <CardContent className="pt-6 text-center">
          <div className="rounded-full bg-muted w-12 h-12 mx-auto flex items-center justify-center mb-4">
            <Heart className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No Active Taaruf Process</h3>
          <p className="text-muted-foreground mb-6">
            You don't have any active taaruf process at the moment.
          </p>
          <Button asChild>
            <a href="/search">Start Searching</a>
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  if (activeTaaruf.status === "rejected") {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <div className="rounded-full bg-red-100 w-12 h-12 mx-auto flex items-center justify-center mb-4">
            <X className="h-6 w-6 text-destructive" />
          </div>
          <h3 className="text-lg font-medium mb-2">Taaruf Process Ended</h3>
          <p className="text-muted-foreground mb-6">
            This taaruf process has been ended. You can start a new search.
          </p>
          <Button asChild>
            <a href="/search">Return to Search</a>
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  // Render active taaruf process
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Active Taaruf Process</CardTitle>
            <Badge
              variant={
                activeTaaruf.status === "in_progress"
                  ? "default"
                  : activeTaaruf.status === "nadzor_requested"
                  ? "secondary"
                  : activeTaaruf.status === "nadzor_approved"
                  ? "default"
                  : "outline"
              }
              className={
                activeTaaruf.status === "in_progress"
                  ? "bg-taaruf-blue text-white"
                  : activeTaaruf.status === "nadzor_requested"
                  ? "bg-taaruf-green/20 text-taaruf-green border-taaruf-green/30"
                  : ""
              }
            >
              {activeTaaruf.status === "in_progress"
                ? "In Progress"
                : activeTaaruf.status === "nadzor_requested"
                ? "Nadzor Requested"
                : activeTaaruf.status === "nadzor_approved"
                ? "Nadzor Approved"
                : "Unknown"}
            </Badge>
          </div>
          <div className="flex justify-between items-center mt-1">
            <div className="text-sm text-muted-foreground">
              Started on {activeTaaruf.startDate}
            </div>
            <div className="text-sm font-medium">
              Stage {activeTaaruf.currentStage} of {activeTaaruf.totalStages}
            </div>
          </div>
          <Progress value={activeTaaruf.progress} className="h-2 mt-1" />
        </CardHeader>
        
        <CardContent>
          <div className="flex items-center gap-4 mb-4 pb-4 border-b">
            <div className="h-12 w-12 rounded-full bg-taaruf-blue/10 flex items-center justify-center">
              <Heart className="h-6 w-6 text-taaruf-blue" />
            </div>
            <div>
              <h3 className="font-semibold">{activeTaaruf.partner.name}</h3>
              <p className="text-sm text-muted-foreground">
                {activeTaaruf.partner.age} years • {activeTaaruf.partner.location}
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" /> Communication
            </h4>
            
            <div className="border rounded-lg p-4 max-h-[300px] overflow-y-auto space-y-4">
              {activeTaaruf.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.sender === "user"
                        ? "bg-taaruf-blue text-white rounded-tr-none"
                        : "bg-muted rounded-tl-none"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        msg.sender === "user" ? "text-blue-100" : "text-muted-foreground"
                      }`}
                    >
                      {msg.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Textarea
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="resize-none"
              />
              <Button 
                className="bg-taaruf-blue hover:bg-taaruf-blue-dark" 
                onClick={handleSendMessage}
                disabled={!message.trim() || isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col sm:flex-row gap-2 pt-4 border-t">
          {activeTaaruf.status === "in_progress" ? (
            <>
              <Button 
                className="bg-taaruf-green hover:bg-taaruf-green-dark text-white w-full sm:w-auto"
                onClick={handleRequestNadzor}
                disabled={isLoading || activeTaaruf.progress < 50}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Eye className="mr-2 h-4 w-4" />
                )}
                Request Nadzor Meeting
              </Button>
              
              <Dialog open={showRejectionDialog} onOpenChange={setShowRejectionDialog}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline"
                    className="border-destructive/30 text-destructive hover:text-destructive hover:bg-destructive/10 w-full sm:w-auto"
                  >
                    <X className="mr-2 h-4 w-4" />
                    End Process
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>End Taaruf Process</DialogTitle>
                    <DialogDescription>
                      Please provide a respectful reason for ending this taaruf process.
                      This will help both parties learn and grow.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <Textarea
                    placeholder="Reason for ending the taaruf process..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="resize-none min-h-[100px]"
                  />
                  
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setShowRejectionDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleRejectTaaruf}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        "Confirm"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          ) : activeTaaruf.status === "nadzor_requested" ? (
            <div className="w-full p-3 bg-taaruf-green/10 rounded-lg border border-taaruf-green/20 flex items-center">
              <AlertCircle className="h-5 w-5 text-taaruf-green mr-2" />
              <p className="text-sm text-taaruf-green-dark">
                Nadzor meeting request sent. Waiting for response from the other party.
              </p>
            </div>
          ) : null}
        </CardFooter>
      </Card>
      
      {activeTaaruf.status === "nadzor_requested" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Nadzor Meeting</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                The Nadzor meeting is an important step in the taaruf process where both parties meet in person
                with the presence of wali (guardian) or a trusted third party.
              </p>
              
              <div className="rounded-lg bg-muted p-4">
                <h4 className="font-medium mb-2">Preparing for your meeting:</h4>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-taaruf-green mt-0.5" />
                    <span>Arrange for your wali (guardian) to be present</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-taaruf-green mt-0.5" />
                    <span>Prepare questions you wish to ask in person</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-taaruf-green mt-0.5" />
                    <span>Choose a public or family setting for the meeting</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-taaruf-green mt-0.5" />
                    <span>Maintain proper Islamic etiquette during the meeting</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TaarufProcess;
