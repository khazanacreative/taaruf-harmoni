
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex items-center p-4 bg-white border-b">
      <Link to="/" className="text-lg font-bold text-gradient">
        Taaruf Arrahman
      </Link>
    </header>
  );
};

export default Header;
