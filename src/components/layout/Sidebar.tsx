
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  ChevronLeft, 
  ChevronRight,
  LayoutDashboard, 
  User, 
  Search, 
  Heart, 
  MessageSquare, 
  CheckCircle, 
  Calendar,
  BookOpen,
  Users,
  Settings,
  HelpCircle,
  BarChart,
  UserCog,
  FileText,
  Bell,
  Clock,
  DollarSign,
  Cog,
  LineChart,
  History
} from 'lucide-react';

type MenuItemType = {
  title: string;
  icon: React.ElementType;
  path: string;
};

type MenuSectionType = {
  title: string;
  items: MenuItemType[];
};

// Define menu items for participant/user role
const participantMenu: MenuSectionType[] = [
  {
    title: "Utama",
    items: [
      { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
      { title: "Profil Saya", icon: User, path: "/profile" },
      { title: "Pencarian Pasangan", icon: Search, path: "/search" },
    ]
  },
  {
    title: "Ta'aruf",
    items: [
      { title: "Permintaan Ta'aruf", icon: Heart, path: "/taaruf-requests" },
      { title: "Proses Ta'aruf", icon: MessageSquare, path: "/taaruf-process" },
      { title: "Persetujuan & Murobbi", icon: CheckCircle, path: "/approvals" },
      { title: "Jadwal Pertemuan", icon: Calendar, path: "/meetings" },
    ]
  },
  {
    title: "Konten",
    items: [
      { title: "Galeri CV", icon: Users, path: "/gallery" },
      { title: "Artikel & Edukasi", icon: BookOpen, path: "/articles" },
      { title: "Kisah Sukses", icon: Users, path: "/success-stories" },
    ]
  },
  {
    title: "Lainnya",
    items: [
      { title: "Pengaturan", icon: Settings, path: "/settings" },
      { title: "Bantuan & FAQ", icon: HelpCircle, path: "/help" },
    ]
  }
];

// Define menu items for admin role
const adminMenu: MenuSectionType[] = [
  {
    title: "Admin",
    items: [
      { title: "Dashboard Admin", icon: BarChart, path: "/admin/dashboard" },
      { title: "Manajemen Pengguna", icon: UserCog, path: "/admin/users" },
      { title: "Manajemen Ta'aruf", icon: Heart, path: "/admin/taaruf" },
    ]
  },
  {
    title: "Pengelolaan",
    items: [
      { title: "Manajemen Konten", icon: FileText, path: "/admin/content" },
      { title: "Manajemen Komunikasi", icon: Bell, path: "/admin/communications" },
      { title: "Jadwal & Acara", icon: Clock, path: "/admin/events" },
      { title: "Pengelolaan Keuangan", icon: DollarSign, path: "/admin/finance" },
    ]
  },
  {
    title: "Sistem",
    items: [
      { title: "Pengaturan Sistem", icon: Cog, path: "/admin/settings" },
      { title: "Laporan & Analitik", icon: LineChart, path: "/admin/reports" },
      { title: "Log Aktivitas & Audit", icon: History, path: "/admin/logs" },
    ]
  }
];

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userRole, setUserRole] = useState<'participant' | 'admin'>('participant');
  const location = useLocation();
  
  // Get user role from local storage
  useEffect(() => {
    const authData = localStorage.getItem('taaruf_auth');
    if (authData) {
      const { role } = JSON.parse(authData);
      if (role === 'admin') {
        setUserRole('admin');
      } else {
        setUserRole('participant');
      }
    }
  }, []);
  
  // Determine which menu to show based on user role
  const menuSections = userRole === 'admin' ? adminMenu : participantMenu;
  
  // Toggle sidebar collapse state
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  return (
    <aside 
      className={cn(
        "flex flex-col h-screen bg-background border-r border-border transition-all duration-300",
        isCollapsed ? "w-[70px]" : "w-[260px]",
        className
      )}
    >
      <div className="py-4 px-3 flex justify-between items-center">
        {!isCollapsed && (
          <div className="font-semibold text-lg text-taaruf-blue">Taaruf AR</div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className="ml-auto" 
          onClick={toggleSidebar}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      
      <Separator />
      
      <div className="flex-1 overflow-y-auto py-2">
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="px-3 py-2">
            {!isCollapsed && (
              <h3 className="text-xs uppercase text-muted-foreground mb-2 mt-2">{section.title}</h3>
            )}
            <ul className="space-y-1">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <li key={itemIndex}>
                    <Link 
                      to={item.path}
                      className={cn(
                        "flex items-center px-3 py-2 rounded-md text-sm transition-colors",
                        isActive 
                          ? "bg-gradient-to-r from-taaruf-blue/20 to-taaruf-green/20 text-foreground font-medium" 
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      )}
                    >
                      <Icon className={cn("w-5 h-5", isActive ? "text-taaruf-blue" : "")} />
                      {!isCollapsed && <span className="ml-3">{item.title}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      
      <Separator />
      
      <div className="p-3">
        <Button 
          variant="outline" 
          className={cn(
            "w-full justify-start", 
            isCollapsed ? "px-2" : ""
          )}
          asChild
        >
          <Link to="/logout">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-5 h-5"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            {!isCollapsed && <span className="ml-2">Keluar</span>}
          </Link>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
