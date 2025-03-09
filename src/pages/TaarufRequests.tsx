
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, X, Heart, Clock, UserRound } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// SVG components for gender-specific icons
const MaleIcon = () => (
  <svg 
    xmlns="https://www.svgrepo.com/show/420361/avatar-man-muslim.svg" 
    viewBox="0 0 512 512" 
    className="w-full h-full"
    fill="currentColor"
  >
    <path d="M255.998,30C131.667,30,30,131.667,30,256c0,123.333,101.667,226,225.998,226C380.333,482,482,380.333,482,256C482,131.667,380.333,30,255.998,30z M287.358,404.363c0,2.881-2.319,5.2-5.2,5.2h-52.318c-2.882,0-5.2-2.319-5.2-5.2v-52.318c0-2.881,2.318-5.2,5.2-5.2h52.318c2.881,0,5.2,2.319,5.2,5.2V404.363z M320.029,206.223c-1.182,1.468-2.442,2.796-3.774,3.979c-1.336,1.178-2.735,2.17-4.193,2.906c-1.465,0.771-2.914,1.462-4.359,2.089c-1.439,0.627-2.785,1.252-4.054,1.878c-1.267,0.588-2.398,1.336-3.389,2.22c-0.979,0.903-1.754,1.931-2.304,3.09c-0.549,1.173-0.818,2.609-0.818,4.348v13.83c0,2.881-2.318,5.2-5.2,5.2h-71.837c-2.881,0-5.2-2.319-5.2-5.2v-13.376c0-10.471,1.798-19.284,5.417-26.444c3.622-7.151,8.059-13.2,13.3-18.147c5.25-4.897,10.708-9.187,16.396-12.835c5.685-3.657,10.998-7.284,15.968-10.957c4.95-3.663,8.969-7.639,12.049-11.954c3.096-4.309,4.631-9.494,4.631-15.572c0-6.367-2.358-11.507-7.078-15.438c-4.707-3.937-10.996-5.896-18.851-5.896c-5.227,0-9.587,0.626-13.088,1.878c-3.5,1.275-6.368,2.88-8.59,4.827c-2.22,1.959-4.012,4.132-5.353,6.521c-1.353,2.43-2.604,4.88-3.774,7.382c-0.518,1.121-1.4,2.027-2.508,2.585c-1.121,0.565-2.351,0.753-3.582,0.545l-37.979-6.538c-1.211-0.209-2.28-0.864-3.016-1.812c-0.74-0.941-1.041-2.138-0.844-3.317c1.607-9.345,4.622-17.574,9.011-24.688c4.399-7.085,10.057-13.1,16.995-18.010c6.925-4.909,15.141-8.615,24.629-11.101c9.505-2.486,20.15-3.72,31.937-3.72c12.578,0,23.947,1.665,34.129,4.978c10.16,3.318,18.85,7.896,26.059,13.756c7.223,5.845,12.793,12.793,16.756,20.825c3.956,8.032,5.954,16.763,5.954,26.186C327.398,188.894,324.975,197.936,320.029,206.223z"/>
  </svg>
);

const FemaleIcon = () => (
  <svg 
    xmlns="https://www.svgrepo.com/show/420332/avatar-muslim-paranja.svg" 
    viewBox="0 0 512 512" 
    className="w-full h-full"
    fill="currentColor"
  >
    <path d="M256.9,25.9c-121,0-219.3,98.3-219.3,219.3c0,68.7,31.7,130.1,81.3,170.2l-0.1,0.1c6.8,5.5,20.1,3.7,37,2.9c0,0.2-0.1,0.5-0.1,0.7c0,7.1,5.8,12.9,12.9,12.9c0.2,0,0.5,0,0.7-0.1c0,0,10.1,2.3,14.8,2.5v49.6c0,7.1,5.8,12.9,12.9,12.9h119.6c7.1,0,12.9-5.8,12.9-12.9v-49.6c4.8-0.3,14.8-2.5,14.8-2.5c0.2,0,0.5,0.1,0.7,0.1c7.1,0,12.9-5.8,12.9-12.9c0-0.2,0-0.5-0.1-0.7c16.9,0.8,30.2,2.6,37-2.9l-0.1-0.1c49.6-40.1,81.3-101.5,81.3-170.2C476.2,124.2,377.9,25.9,256.9,25.9z M347.8,239.5c-5.5,5.6-10.5,8.5-17.2,8.5s-23.2-10.4-35.1-10.4c-11.9,0-37,14.2-37,14.2s-25.1-14.2-37-14.2c-11.9,0-28.4,10.4-35.1,10.4c-6.7,0-11.7-2.9-17.2-8.5c-5.5-5.6-7.9-11.4-6.9-26.9c0.9-15.5,11.8-115.8,13.7-120.8c1.9-5,5.9-9.3,12.9-12.9c7-3.6,52.9-6.8,69.6-6.8c16.8,0,62.6,3.2,69.6,6.8c7,3.6,11,7.8,12.9,12.9c1.9,5,12.8,105.3,13.7,120.8C355.7,228.1,353.3,233.9,347.8,239.5z"/>
  </svg>
);

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
    gender: 'female',
  },
  {
    id: 2,
    name: 'Khadijah',
    age: 27,
    location: 'Jakarta',
    message: 'Assalamu\'alaikum, saya melihat profil Anda dan merasa kita memiliki kecocokan dalam hal pendidikan dan tujuan hidup.',
    date: '2023-08-10',
    status: 'pending',
    gender: 'female',
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
    gender: 'male',
  },
  {
    id: 2,
    name: 'Umar',
    age: 30,
    location: 'Surabaya',
    message: 'Assalamu\'alaikum, saya melihat profil Anda dan merasa kita memiliki kecocokan dalam hal pendidikan dan tujuan hidup.',
    date: '2023-08-05',
    status: 'rejected',
    gender: 'male',
  },
];

const TaarufRequests = () => {
  const [incoming, setIncoming] = useState(incomingRequests);
  const [outgoing, setOutgoing] = useState(outgoingRequests);
  const [userGender, setUserGender] = useState<'male' | 'female'>('male');
  const { toast } = useToast();
  
  // Determine user's gender from local storage on component mount
  useEffect(() => {
    const authData = localStorage.getItem('taaruf_auth');
    if (authData) {
      const { gender } = JSON.parse(authData);
      if (gender) {
        setUserGender(gender);
      }
    }
  }, []);

  // Filter requests based on user's gender
  const filteredIncoming = incoming.filter(req => 
    userGender === 'male' ? req.gender === 'female' : req.gender === 'male'
  );
  
  const filteredOutgoing = outgoing.filter(req => 
    userGender === 'male' ? req.gender === 'female' : req.gender === 'male'
  );
  
  const handleAccept = (requestId: number) => {
    console.log('Accepted request:', requestId);
    // In a real app, this would update the request status in the database
    setIncoming(incoming.filter((req) => req.id !== requestId));
    
    toast({
      title: "Permintaan Diterima",
      description: "Anda telah menerima permintaan ta'aruf ini.",
    });
  };
  
  const handleReject = (requestId: number) => {
    console.log('Rejected request:', requestId);
    // In a real app, this would update the request status in the database
    setIncoming(incoming.filter((req) => req.id !== requestId));
    
    toast({
      title: "Permintaan Ditolak",
      description: "Anda telah menolak permintaan ta'aruf ini.",
    });
  };
  
  return (
    <div className="flex flex-col">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Permintaan Ta'aruf</h1>
        
        <Tabs defaultValue="incoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="incoming">
              Permintaan Masuk <span className="ml-2 bg-taaruf-blue/10 text-taaruf-blue px-2 py-0.5 rounded-full text-xs">{filteredIncoming.length}</span>
            </TabsTrigger>
            <TabsTrigger value="outgoing">
              Permintaan Keluar <span className="ml-2 bg-taaruf-green/10 text-taaruf-green px-2 py-0.5 rounded-full text-xs">{filteredOutgoing.length}</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="incoming" className="mt-6 space-y-4">
            {filteredIncoming.length === 0 ? (
              <div className="text-center py-10 glass-card rounded-xl">
                <UserRound className="mx-auto h-10 w-10 text-foreground/30 mb-3" />
                <p className="text-foreground/70">Tidak ada permintaan ta'aruf masuk saat ini</p>
              </div>
            ) : (
              filteredIncoming.map((request) => (
                <Card key={request.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4 flex justify-center items-center bg-gradient-to-br from-taaruf-blue/10 to-taaruf-green/10 p-4">
                        <div className="w-24 h-24 text-taaruf-green">
                          {request.gender === 'female' ? <FemaleIcon /> : <MaleIcon />}
                        </div>
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
            {filteredOutgoing.length === 0 ? (
              <div className="text-center py-10 glass-card rounded-xl">
                <Heart className="mx-auto h-10 w-10 text-foreground/30 mb-3" />
                <p className="text-foreground/70">Anda belum mengajukan permintaan ta'aruf</p>
              </div>
            ) : (
              filteredOutgoing.map((request) => (
                <Card key={request.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4 flex justify-center items-center bg-gradient-to-br from-taaruf-blue/10 to-taaruf-green/10 p-4">
                        <div className="w-24 h-24 text-taaruf-blue">
                          {request.gender === 'female' ? <FemaleIcon /> : <MaleIcon />}
                        </div>
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
    </div>
  );
};

export default TaarufRequests;
