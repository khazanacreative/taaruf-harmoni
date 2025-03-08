
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, X, Heart, Clock, UserRound } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Dummy data for taaruf requests
const incomingRequests = [
  {
    id: 1,
    name: 'Fatimah',
    age: 25,
    location: 'Bandung',
    message: 'Assalamu\'alaikum, saya tertarik untuk berkenalan lebih jauh dengan Anda karena kesamaan visi dan misi dalam hidup.',
    date: '2023-08-15',
    status: 'pending',
    imageUrl: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 2,
    name: 'Khadijah',
    age: 27,
    location: 'Jakarta',
    message: 'Assalamu\'alaikum, saya melihat profil Anda dan merasa kita memiliki kecocokan dalam hal pendidikan dan tujuan hidup.',
    date: '2023-08-10',
    status: 'pending',
    imageUrl: 'https://i.pravatar.cc/150?img=9',
  },
];

const outgoingRequests = [
  {
    id: 1,
    name: 'Ahmad',
    age: 28,
    location: 'Jakarta',
    message: 'Assalamu\'alaikum, saya tertarik untuk berkenalan lebih jauh dengan Anda karena kesamaan visi dan misi dalam hidup.',
    date: '2023-08-12',
    status: 'pending',
    imageUrl: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 2,
    name: 'Umar',
    age: 30,
    location: 'Surabaya',
    message: 'Assalamu\'alaikum, saya melihat profil Anda dan merasa kita memiliki kecocokan dalam hal pendidikan dan tujuan hidup.',
    date: '2023-08-05',
    status: 'rejected',
    imageUrl: 'https://i.pravatar.cc/150?img=3',
  },
];

const TaarufRequests = () => {
  const [incoming, setIncoming] = useState(incomingRequests);
  const [outgoing, setOutgoing] = useState(outgoingRequests);
  
  const handleAccept = (requestId: number) => {
    console.log('Accepted request:', requestId);
    // In a real app, this would update the request status in the database
    setIncoming(incoming.filter((req) => req.id !== requestId));
  };
  
  const handleReject = (requestId: number) => {
    console.log('Rejected request:', requestId);
    // In a real app, this would update the request status in the database
    setIncoming(incoming.filter((req) => req.id !== requestId));
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-center">Permintaan Ta'aruf</h1>
          
          <Tabs defaultValue="incoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="incoming">
                Permintaan Masuk <span className="ml-2 bg-taaruf-blue/10 text-taaruf-blue px-2 py-0.5 rounded-full text-xs">{incoming.length}</span>
              </TabsTrigger>
              <TabsTrigger value="outgoing">
                Permintaan Keluar <span className="ml-2 bg-taaruf-green/10 text-taaruf-green px-2 py-0.5 rounded-full text-xs">{outgoing.length}</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="incoming" className="mt-6 space-y-4">
              {incoming.length === 0 ? (
                <div className="text-center py-10 glass-card rounded-xl">
                  <UserRound className="mx-auto h-10 w-10 text-foreground/30 mb-3" />
                  <p className="text-foreground/70">Tidak ada permintaan ta'aruf masuk saat ini</p>
                </div>
              ) : (
                incoming.map((request) => (
                  <Card key={request.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4">
                          <img
                            src={request.imageUrl}
                            alt={request.name}
                            className="w-full h-40 md:h-full object-cover"
                          />
                        </div>
                        <div className="p-4 md:w-3/4">
                          <div className="flex flex-col md:flex-row justify-between">
                            <div>
                              <h3 className="font-semibold">{request.name}, {request.age}</h3>
                              <p className="text-sm text-foreground/70">{request.location}</p>
                              <div className="flex items-center mt-1 text-xs text-foreground/60">
                                <Clock className="h-3 w-3 mr-1" />
                                {request.date}
                              </div>
                            </div>
                            <div className="flex mt-4 md:mt-0 space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-500/50 text-red-500 hover:bg-red-500/10 hover:text-red-600"
                                onClick={() => handleReject(request.id)}
                              >
                                <X className="h-4 w-4 mr-1" />
                                Tolak
                              </Button>
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-taaruf-blue to-taaruf-green text-white hover:opacity-90"
                                onClick={() => handleAccept(request.id)}
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Terima
                              </Button>
                            </div>
                          </div>
                          <p className="mt-3 text-sm">{request.message}</p>
                          <Button
                            variant="link"
                            size="sm"
                            className="p-0 h-auto mt-2"
                          >
                            Lihat profil lengkap
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
            
            <TabsContent value="outgoing" className="mt-6 space-y-4">
              {outgoing.length === 0 ? (
                <div className="text-center py-10 glass-card rounded-xl">
                  <Heart className="mx-auto h-10 w-10 text-foreground/30 mb-3" />
                  <p className="text-foreground/70">Anda belum mengajukan permintaan ta'aruf</p>
                </div>
              ) : (
                outgoing.map((request) => (
                  <Card key={request.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4">
                          <img
                            src={request.imageUrl}
                            alt={request.name}
                            className="w-full h-40 md:h-full object-cover"
                          />
                        </div>
                        <div className="p-4 md:w-3/4">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-semibold">{request.name}, {request.age}</h3>
                              <p className="text-sm text-foreground/70">{request.location}</p>
                              <div className="flex items-center mt-1 text-xs text-foreground/60">
                                <Clock className="h-3 w-3 mr-1" />
                                {request.date}
                              </div>
                            </div>
                            <div>
                              {request.status === 'pending' ? (
                                <span className="text-sm py-1 px-3 bg-yellow-100 text-yellow-800 rounded-full">
                                  Menunggu
                                </span>
                              ) : request.status === 'accepted' ? (
                                <span className="text-sm py-1 px-3 bg-green-100 text-green-800 rounded-full">
                                  Diterima
                                </span>
                              ) : (
                                <span className="text-sm py-1 px-3 bg-red-100 text-red-800 rounded-full">
                                  Ditolak
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="mt-3 text-sm">{request.message}</p>
                          <Button
                            variant="link"
                            size="sm"
                            className="p-0 h-auto mt-2"
                          >
                            Lihat profil lengkap
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TaarufRequests;
