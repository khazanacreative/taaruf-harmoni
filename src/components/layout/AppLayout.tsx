
import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
