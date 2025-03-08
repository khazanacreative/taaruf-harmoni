
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  Heart, 
  Users, 
  Bell, 
  Calendar, 
  ChevronRight,
  MessageSquare,
  Star
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data for dashboard statistics
  const stats = {
    totalRequests: 5,
    pendingRequests: 2,
    ongoingTaaruf: 1,
    completedTaaruf: 3,
    profileViews: 28,
    profileCompletion: 85,
  };
  
  // Mock data for recent notifications
  const notifications = [
    {
      id: 1,
      type: 'request',
      message: 'Anda menerima permintaan ta\'aruf baru dari Ahmad',
      time: '2 jam yang lalu',
    },
    {
      id: 2,
      type: 'message',
      message: 'Khadijah mengirim pesan baru dalam proses ta\'aruf Anda',
      time: '1 hari yang lalu',
    },
    {
      id: 3,
      type: 'system',
      message: 'Profile Anda telah dilihat oleh 5 orang hari ini',
      time: '1 hari yang lalu',
    },
    {
      id: 4,
      type: 'reminder',
      message: 'Jangan lupa untuk melengkapi CV ta\'aruf Anda',
      time: '3 hari yang lalu',
    },
  ];
  
  // Mock data for upcoming events
  const events = [
    {
      id: 1,
      title: 'Pertemuan Nadzor',
      date: '25 Agustus 2023',
      description: 'Pertemuan dengan keluarga Fatimah untuk membicarakan kelanjutan ta\'aruf',
    },
    {
      id: 2,
      title: 'Kajian Pra Nikah',
      date: '2 September 2023',
      description: 'Kajian online tentang persiapan menuju pernikahan islami',
    },
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-foreground/70">Selamat datang di Taaruf Ar Rahman</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button asChild variant="outline">
              <Link to="/profile">
                Lengkapi Profil
              </Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-taaruf-blue to-taaruf-green text-white hover:opacity-90">
              <Link to="/search">
                Cari Pasangan
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-4 flex items-center">
              <div className="w-12 h-12 rounded-full bg-taaruf-blue/10 flex items-center justify-center mr-4">
                <Heart className="h-6 w-6 text-taaruf-blue" />
              </div>
              <div>
                <p className="text-sm text-foreground/70">Total Permintaan</p>
                <h3 className="text-2xl font-bold">{stats.totalRequests}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center">
              <div className="w-12 h-12 rounded-full bg-taaruf-green/10 flex items-center justify-center mr-4">
                <MessageSquare className="h-6 w-6 text-taaruf-green" />
              </div>
              <div>
                <p className="text-sm text-foreground/70">Ta'aruf Aktif</p>
                <h3 className="text-2xl font-bold">{stats.ongoingTaaruf}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mr-4">
                <Users className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-foreground/70">Dilihat Profil</p>
                <h3 className="text-2xl font-bold">{stats.profileViews}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-foreground/70">Profil Lengkap</p>
                <h3 className="text-2xl font-bold">{stats.profileCompletion}%</h3>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full md:w-auto">
            <TabsTrigger value="overview">Ikhtisar</TabsTrigger>
            <TabsTrigger value="notifications">
              Notifikasi
              <Badge className="ml-2 bg-taaruf-blue" variant="default">{notifications.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="events">Agenda</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Status Ta'aruf</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <span className="text-sm">Permintaan Menunggu</span>
                      </div>
                      <Badge variant="outline">{stats.pendingRequests}</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-taaruf-blue"></div>
                        <span className="text-sm">Ta'aruf Aktif</span>
                      </div>
                      <Badge variant="outline">{stats.ongoingTaaruf}</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-taaruf-green"></div>
                        <span className="text-sm">Ta'aruf Selesai</span>
                      </div>
                      <Badge variant="outline">{stats.completedTaaruf}</Badge>
                    </div>
                    
                    <div className="pt-2">
                      <Button asChild variant="outline" className="w-full">
                        <Link to="/taaruf-requests">
                          Lihat Semua Permintaan
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Profil Ta'aruf</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Kelengkapan Profil</span>
                        <span className="text-sm font-medium">{stats.profileCompletion}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-taaruf-blue to-taaruf-green" 
                          style={{ width: `${stats.profileCompletion}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="pt-2 space-y-3">
                      <p className="text-sm text-foreground/70">
                        Profil yang lengkap akan meningkatkan peluang Anda mendapatkan permintaan ta'aruf.
                      </p>
                      <Button asChild className="w-full bg-gradient-to-r from-taaruf-blue to-taaruf-green text-white hover:opacity-90">
                        <Link to="/profile">
                          Lengkapi Profil
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Aktivitas Terbaru</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {notifications.length > 0 ? (
                  <div className="space-y-4">
                    {notifications.slice(0, 3).map((notification) => (
                      <div key={notification.id} className="flex items-start gap-3 pb-3 border-b border-gray-100">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                          ${notification.type === 'request' ? 'bg-taaruf-blue/10' : 
                            notification.type === 'message' ? 'bg-taaruf-green/10' : 
                            notification.type === 'system' ? 'bg-yellow-100' : 'bg-purple-100'}`}>
                          {notification.type === 'request' ? (
                            <Heart className="h-4 w-4 text-taaruf-blue" />
                          ) : notification.type === 'message' ? (
                            <MessageSquare className="h-4 w-4 text-taaruf-green" />
                          ) : notification.type === 'system' ? (
                            <Bell className="h-4 w-4 text-yellow-600" />
                          ) : (
                            <Calendar className="h-4 w-4 text-purple-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{notification.message}</p>
                          <p className="text-xs text-foreground/60">{notification.time}</p>
                        </div>
                      </div>
                    ))}
                    
                    <Button variant="link" className="p-0 h-auto" onClick={() => setActiveTab('notifications')}>
                      Lihat semua notifikasi
                    </Button>
                  </div>
                ) : (
                  <p className="text-sm text-foreground/70">Belum ada aktivitas terbaru.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Semua Notifikasi</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {notifications.length > 0 ? (
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="flex items-start gap-3 pb-4 border-b border-gray-100">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                          ${notification.type === 'request' ? 'bg-taaruf-blue/10' : 
                            notification.type === 'message' ? 'bg-taaruf-green/10' : 
                            notification.type === 'system' ? 'bg-yellow-100' : 'bg-purple-100'}`}>
                          {notification.type === 'request' ? (
                            <Heart className="h-4 w-4 text-taaruf-blue" />
                          ) : notification.type === 'message' ? (
                            <MessageSquare className="h-4 w-4 text-taaruf-green" />
                          ) : notification.type === 'system' ? (
                            <Bell className="h-4 w-4 text-yellow-600" />
                          ) : (
                            <Calendar className="h-4 w-4 text-purple-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{notification.message}</p>
                          <p className="text-xs text-foreground/60">{notification.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-foreground/70">Belum ada notifikasi.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="events" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Agenda Mendatang</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {events.length > 0 ? (
                  <div className="space-y-4">
                    {events.map((event) => (
                      <div key={event.id} className="border rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Calendar className="h-5 w-5 text-taaruf-blue" />
                          <h4 className="font-medium">{event.title}</h4>
                        </div>
                        <p className="text-sm text-foreground/70 mb-2">{event.date}</p>
                        <p className="text-sm">{event.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-foreground/70">Belum ada agenda mendatang.</p>
                )}
                
                <div className="mt-4">
                  <Button variant="outline" className="w-full">
                    Tambah Agenda
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
