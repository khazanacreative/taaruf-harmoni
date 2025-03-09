
import { Link } from 'react-router-dom';
import { LogOut, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b h-[72px]">
      <Link to="/" className="text-lg font-bold text-gradient">
        Taaruf Ar Rahman
      </Link>
      
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost" size="sm">
          <Link to="/dashboard">
            <Home className="h-4 w-4 mr-2" />
            Dashboard
          </Link>
        </Button>
        <Button asChild variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
          <Link to="/logout">
            <LogOut className="h-4 w-4 mr-2" />
            Keluar
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
