import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { User, LogOut } from 'lucide-react';

const Header = () => {
  const authData = localStorage.getItem('taaruf_auth');
  const isAuthenticated = authData ? JSON.parse(authData).isAuthenticated : false;

  return (
    <header className="flex items-center justify-between p-4 bg-white border-b">
      <Link to="/" className="text-lg font-bold text-taaruf-blue">
        Taaruf AR
      </Link>
      <div className="flex items-center space-x-4">
        {isAuthenticated && (
          <Link to="/profile" className="flex items-center text-sm text-muted-foreground">
            <User className="w-4 h-4 mr-1" />
            Profil
          </Link>
        )}
        <Button variant="outline" asChild>
          <Link to="/logout" className="flex items-center">
            <LogOut className="w-4 h-4 mr-1" />
            Keluar
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
