
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  MessageSquare, 
  Calendar, 
  Heart, 
  ChevronRight, 
  UserRound, 
  Check,
  Send
} from 'lucide-react';
import { TaarufProcess as TaarufProcessComponent } from '@/components/taaruf/TaarufProcess';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Dummy data for active taaruf process
const activeTaaruf = {
  id: 1,
  partner: {
    id: 1,
    name: 'Fatimah',
    age: 25,
    location: 'Bandung',
    imageUrl: 'https://i.pravatar.cc/150?img=5',
  },
  startDate: '15 Agustus 2023',
  currentStep: 2, // 1: Initial communication, 2: Deeper discussion, 3: Family involvement, 4: Nadzor meeting
  totalSteps: 4,
  messages: [
    {
      id: 1,
      sender: 'partner',
      text: 'Assalamu\'alaikum, alhamdulillah kita sudah memasuki proses ta\'aruf. Saya ingin mengetahui lebih dalam tentang visi Anda dalam pernikahan.',
      timestamp: '15 Agustus 2023, 14:30',
    },
    {
      id: 2,
      sender: 'user',
      text: 'Wa\'alaikumsalam warahmatullah. Visi saya dalam pernikahan adalah membangun keluarga sakinah yang berlandaskan nilai-nilai Islam, saling mendukung dalam kebaikan, dan berkontribusi positif untuk masyarakat.',
      timestamp: '15 Agustus 2023, 15:45',
    },
    {
      id: 3,
      sender: 'partner',
      text: 'Alhamdulillah, visi kita sejalan. Bagaimana pandangan Anda tentang pembagian peran dalam rumah tangga?',
      timestamp: '16 Agustus 2023, 09:15',
    },
  ],
};

const TaarufProcess = () => {
  const [newMessage, setNewMessage] = useState('');
  const [taaruf, setTaaruf] = useState(activeTaaruf);
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message = {
      id: taaruf.messages.length + 1,
      sender: 'user',
      text: newMessage,
      timestamp: new Date().toLocaleString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    
    setTaaruf({
      ...taaruf,
      messages: [...taaruf.messages, message],
    });
    
    setNewMessage('');
  };
  
  const handleRequestNadzor = () => {
    console.log('Requesting nadzor meeting');
    // In a real app, this would send a nadzor meeting request
  };
  
  const renderStepLabel = (step: number) => {
    switch (step) {
      case 1:
        return 'Komunikasi Awal';
      case 2:
        return 'Diskusi Mendalam';
      case 3:
        return 'Pelibatan Keluarga';
      case 4:
        return 'Pertemuan Nadzor';
      default:
        return '';
    }
  };
  
  const renderStepIcon = (step: number) => {
    switch (step) {
      case 1:
        return <MessageSquare className="h-5 w-5" />;
      case 2:
        return <UserRound className="h-5 w-5" />;
      case 3:
        return <Calendar className="h-5 w-5" />;
      case 4:
        return <Heart className="h-5 w-5" />;
      default:
        return null;
    }
  };
  
  const progressPercentage = (taaruf.currentStep / taaruf.totalSteps) * 100;
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-center">Proses Ta'aruf</h1>
          
          {taaruf ? (
            <>
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 bg-gradient-to-br from-taaruf-blue/10 to-taaruf-green/10">
                      <div className="p-4 text-center">
                        <div className="rounded-full overflow-hidden w-24 h-24 mx-auto mb-3 border-4 border-white">
                          <img
                            src={taaruf.partner.imageUrl}
                            alt={taaruf.partner.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="font-semibold">{taaruf.partner.name}, {taaruf.partner.age}</h3>
                        <p className="text-sm text-foreground/70">{taaruf.partner.location}</p>
                        <p className="text-xs mt-2 text-foreground/60">
                          Dimulai pada: {taaruf.startDate}
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-4 md:w-3/4">
                      <div className="mb-4">
                        <h3 className="text-sm font-medium text-foreground/70 mb-1">Progress Ta'aruf</h3>
                        <Progress value={progressPercentage} className="h-2 bg-gray-100" />
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                        {[1, 2, 3, 4].map((step) => (
                          <div 
                            key={step} 
                            className={`text-xs rounded-lg p-2 flex items-center justify-center flex-col text-center ${
                              step === taaruf.currentStep 
                                ? 'bg-gradient-to-r from-taaruf-blue/20 to-taaruf-green/20 border border-taaruf-blue/30 font-medium' 
                                : step < taaruf.currentStep 
                                  ? 'bg-muted/50 text-foreground/70' 
                                  : 'bg-muted/20 text-foreground/50'
                            }`}
                          >
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center mb-1 ${
                              step === taaruf.currentStep 
                                ? 'bg-gradient-to-r from-taaruf-blue to-taaruf-green text-white' 
                                : step < taaruf.currentStep 
                                  ? 'bg-foreground/20 text-foreground' 
                                  : 'bg-foreground/10 text-foreground/50'
                            }`}>
                              {step < taaruf.currentStep ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                renderStepIcon(step)
                              )}
                            </div>
                            {renderStepLabel(step)}
                          </div>
                        ))}
                      </div>
                      
                      <TaarufProcessComponent currentStep={taaruf.currentStep} />
                      
                      {taaruf.currentStep === 3 && (
                        <div className="mt-4">
                          <Button 
                            className="w-full bg-gradient-to-r from-taaruf-blue to-taaruf-green text-white hover:opacity-90"
                            onClick={handleRequestNadzor}
                          >
                            <Heart className="h-4 w-4 mr-2" />
                            Ajukan Pertemuan Nadzor
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="glass-card p-4 rounded-xl overflow-hidden">
                <h3 className="text-lg font-medium mb-4">Percakapan Ta'aruf</h3>
                
                <div className="space-y-4 max-h-80 overflow-y-auto mb-4 p-2">
                  {taaruf.messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-xl p-3 ${
                          message.sender === 'user' 
                            ? 'bg-gradient-to-r from-taaruf-blue to-taaruf-green text-white' 
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-white/70' : 'text-foreground/60'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ketik pesan Anda..."
                    className="flex-1 p-2 border border-border rounded-lg"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button 
                    size="icon" 
                    onClick={handleSendMessage}
                    className="bg-gradient-to-r from-taaruf-blue to-taaruf-green text-white hover:opacity-90"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-20 glass-card rounded-xl">
              <Heart className="mx-auto h-16 w-16 text-foreground/20 mb-4" />
              <h2 className="text-xl font-medium mb-2">Tidak Ada Proses Ta'aruf Aktif</h2>
              <p className="text-foreground/70 max-w-md mx-auto mb-6">
                Anda belum memiliki proses ta'aruf yang aktif saat ini. Mulai dengan mencari calon pasangan dan mengirim permintaan ta'aruf.
              </p>
              <Button 
                className="bg-gradient-to-r from-taaruf-blue to-taaruf-green text-white hover:opacity-90"
                asChild
              >
                <a href="/search">
                  Cari Calon Pasangan
                  <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TaarufProcess;
