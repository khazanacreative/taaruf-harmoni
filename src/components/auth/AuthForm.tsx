
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

type AuthFormProps = {
  type: 'login' | 'register';
};

const AuthForm = ({ type }: AuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [role, setRole] = useState('participant');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (type === 'register' && password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // This would be replaced with actual authentication logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: type === 'login' ? 'Logged in successfully!' : 'Registered successfully!',
        description: type === 'login' ? 'Welcome back!' : 'Please complete your profile.',
      });
      
      // Set user authentication in localStorage (simple auth)
      localStorage.setItem('taaruf_auth', JSON.stringify({
        isAuthenticated: true,
        email: email,
        fullName: type === 'login' ? 'User' : fullName,
        gender: type === 'login' ? 'male' : gender,
        role: role // Save the selected role
      }));
      
      // Redirect after successful authentication
      if (type === 'login') {
        navigate('/dashboard');
      } else {
        navigate('/profile');
      }
    } catch (error) {
      toast({
        title: 'Authentication failed',
        description: 'Please check your credentials and try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="glass-card w-full max-w-md p-8 mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gradient">
          {type === 'login' ? 'Welcome Back' : 'Create an Account'}
        </h2>
        <p className="text-foreground/60 mt-2">
          {type === 'login' 
            ? 'Sign in to continue your Taaruf journey' 
            : 'Begin your journey to finding a compatible partner'}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        {type === 'register' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input 
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                required
                className="border-input/60 focus:border-taaruf-blue"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                className="flex h-10 w-full rounded-md border border-input/60 bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="" disabled>Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="border-input/60 focus:border-taaruf-blue"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input 
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="border-input/60 focus:border-taaruf-blue pr-10"
            />
            <button 
              type="button" 
              onClick={toggleShowPassword}
              className="absolute right-3 top-2.5 text-foreground/60 hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        
        {type === 'register' && (
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input 
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                className="border-input/60 focus:border-taaruf-blue pr-10"
              />
              <button 
                type="button" 
                onClick={toggleShowPassword}
                className="absolute right-3 top-2.5 text-foreground/60 hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        )}
        
        {/* Role selection */}
        <div className="space-y-2">
          <Label>Select Role</Label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole('participant')}
              className={`p-3 rounded-md border text-center transition-colors ${
                role === 'participant' 
                  ? 'bg-gradient-to-r from-taaruf-blue/20 to-taaruf-green/20 border-taaruf-blue text-foreground font-medium' 
                  : 'border-input/60 text-muted-foreground hover:border-taaruf-blue/50'
              }`}
            >
              Peserta Ta'aruf
            </button>
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`p-3 rounded-md border text-center transition-colors ${
                role === 'admin' 
                  ? 'bg-gradient-to-r from-taaruf-blue/20 to-taaruf-green/20 border-taaruf-blue text-foreground font-medium' 
                  : 'border-input/60 text-muted-foreground hover:border-taaruf-blue/50'
              }`}
            >
              Admin
            </button>
          </div>
        </div>
        
        {type === 'login' && (
          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-taaruf-blue hover:underline">
              Forgot password?
            </Link>
          </div>
        )}
        
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-taaruf-blue to-taaruf-green text-white hover:opacity-90"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {type === 'login' ? 'Signing in...' : 'Creating account...'}
            </>
          ) : (
            type === 'login' ? 'Sign In' : 'Create Account'
          )}
        </Button>
        
        <div className="text-center text-sm text-foreground/70 mt-4">
          {type === 'login' ? (
            <>
              Don't have an account?{' '}
              <Link to="/register" className="text-taaruf-blue hover:underline font-medium">
                Register
              </Link>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Link to="/login" className="text-taaruf-blue hover:underline font-medium">
                Login
              </Link>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
