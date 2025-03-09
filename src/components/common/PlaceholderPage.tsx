
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

const PlaceholderPage = ({ 
  title, 
  description = "Fitur ini akan segera tersedia di update berikutnya."
}: PlaceholderPageProps) => {
  return (
    <div className="container max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-2 text-gradient">{title}</h1>
      
      <div className="glass-card p-8 rounded-xl">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="bg-muted/50 p-4 rounded-full">
            <AlertCircle className="h-10 w-10 text-taaruf-blue" />
          </div>
          
          <h2 className="text-xl font-semibold">Dalam Pengembangan</h2>
          
          <p className="text-foreground/70 max-w-md">
            {description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-md mt-6">
            <div className="bg-white/50 p-4 rounded-lg shadow-sm border border-input/30 animate-pulse">
              <div className="h-3 bg-muted/50 rounded w-3/4 mx-auto"></div>
            </div>
            <div className="bg-white/50 p-4 rounded-lg shadow-sm border border-input/30 animate-pulse delay-75">
              <div className="h-3 bg-muted/50 rounded w-3/4 mx-auto"></div>
            </div>
            <div className="bg-white/50 p-4 rounded-lg shadow-sm border border-input/30 animate-pulse delay-150">
              <div className="h-3 bg-muted/50 rounded w-3/4 mx-auto"></div>
            </div>
          </div>
          
          <Button asChild className="mt-4">
            <Link to="/dashboard">Kembali ke Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderPage;
