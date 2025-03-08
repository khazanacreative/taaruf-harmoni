
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-6 mt-auto border-t border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-taaruf-blue to-taaruf-green flex items-center justify-center">
            <Heart className="h-3 w-3 text-white" />
          </div>
          <span className="text-sm font-medium">TaarufHarmoni</span>
        </div>
        
        <div className="flex items-center gap-6">
          <Link to="/about" className="text-xs text-foreground/70 hover:text-taaruf-blue transition-colors">
            About
          </Link>
          <Link to="/privacy" className="text-xs text-foreground/70 hover:text-taaruf-blue transition-colors">
            Privacy
          </Link>
          <Link to="/terms" className="text-xs text-foreground/70 hover:text-taaruf-blue transition-colors">
            Terms
          </Link>
          <Link to="/faq" className="text-xs text-foreground/70 hover:text-taaruf-blue transition-colors">
            FAQ
          </Link>
        </div>
        
        <div className="text-xs text-foreground/60">
          &copy; {currentYear} TaarufHarmoni. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
