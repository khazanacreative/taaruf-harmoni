
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b">
      <Link to="/" className="text-lg font-bold text-gradient">
        Taaruf Arrahman
      </Link>
      <Button variant="outline" asChild>
        <Link to="/logout" className="flex items-center">
          <LogOut className="w-4 h-4 mr-1" />
          Keluar
        </Link>
      </Button>
    </header>
  );
};

export default Header;
