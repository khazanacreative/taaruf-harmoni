
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserRound, Search, Heart, LogIn, Menu, X } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Mock authentication state (replace with actual auth context)
  const isAuthenticated = false;
  
  const navLinks = [
    { path: '/', label: 'Beranda' },
    { path: '/search', label: 'Cari', icon: <Search className="h-4 w-4 mr-1" />, authRequired: true },
    { path: '/taaruf-requests', label: 'Permintaan', icon: <Heart className="h-4 w-4 mr-1" />, authRequired: true },
    { path: '/profile', label: 'Profil', icon: <UserRound className="h-4 w-4 mr-1" />, authRequired: true },
  ];
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  
  const filteredLinks = navLinks.filter(link => !link.authRequired || isAuthenticated);
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between py-4">
        <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-taaruf-blue to-taaruf-green flex items-center justify-center">
            <Heart className="h-4 w-4 text-white" />
          </div>
          <span className="text-xl font-bold">Taaruf<span className="text-taaruf-blue">ArRahman</span></span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          {filteredLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center text-sm font-medium transition-colors hover:text-taaruf-blue ${
                location.pathname === link.path ? 'text-taaruf-blue' : 'text-foreground/70'
              }`}
            >
              {link.icon && link.icon}
              {link.label}
            </Link>
          ))}
          
          {isAuthenticated ? (
            <Button variant="ghost" size="sm" asChild>
              <Link to="/logout">Keluar</Link>
            </Button>
          ) : (
            <Button className="bg-gradient-to-r from-taaruf-blue to-taaruf-green hover:opacity-90" size="sm" asChild>
              <Link to="/login">
                <LogIn className="h-4 w-4 mr-1.5" />
                Masuk
              </Link>
            </Button>
          )}
        </nav>
        
        <div className="md:hidden flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-50 bg-background/95 backdrop-blur-sm animate-fade-in">
          <nav className="container flex flex-col gap-4 p-6">
            {filteredLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center text-lg font-medium py-3 border-b border-border/50 transition-colors hover:text-taaruf-blue ${
                  location.pathname === link.path ? 'text-taaruf-blue' : 'text-foreground/70'
                }`}
                onClick={closeMenu}
              >
                {link.icon && <span className="mr-2">{link.icon}</span>}
                {link.label}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <Button 
                variant="outline" 
                size="lg" 
                className="mt-4" 
                asChild
              >
                <Link to="/logout" onClick={closeMenu}>Keluar</Link>
              </Button>
            ) : (
              <Button 
                className="bg-gradient-to-r from-taaruf-blue to-taaruf-green text-white hover:opacity-90 mt-4"
                size="lg"
                asChild
              >
                <Link to="/login" onClick={closeMenu}>
                  <LogIn className="h-5 w-5 mr-2" />
                  Masuk
                </Link>
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
