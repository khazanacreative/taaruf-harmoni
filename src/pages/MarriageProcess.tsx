
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Heart, 
  Calendar, 
  Users, 
  CheckCircle, 
  User, 
  MessageSquare, 
  Eye, 
  Ring, 
  Home,
  ArrowRight,
  FileText
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const MarriageProcess = () => {
  const [activeStep, setActiveStep] = useState(3); // Assuming the user is at step 3 of the process
  
  const steps = [
    {
      id: 1,
      title: 'Ta\'aruf',
      description: 'Proses perkenalan awal untuk mengenal visi, misi, dan nilai-nilai calon pasangan',
      icon: MessageSquare,
      completed: activeStep > 1,
      active: activeStep === 1,
    },
    {
      id: 2,
      title: 'Nadzor',
      description: 'Pertemuan dengan wali atau pihak keluarga untuk membicarakan kelanjutan hubungan',
      icon: Eye,
      completed: activeStep > 2,
      active: activeStep === 2,
    },
    {
      id: 3,
      title: 'Khitbah',
      description: 'Proses lamaran atau pinangan resmi kepada pihak keluarga',
      icon: Ring,
      completed: activeStep > 3,
      active: activeStep === 3,
    },
    {
      id: 4,
      title: 'Akad Nikah',
      description: 'Prosesi pernikahan secara islami dan sah secara agama dan negara',
      icon: Users,
      completed: activeStep > 4,
      active: activeStep === 4,
    },
    {
      id: 5,
      title: 'Walimah',
      description: 'Resepsi pernikahan untuk mengumumkan pernikahan ke masyarakat',
      icon: Calendar,
      completed: activeStep > 5,
      active: activeStep === 5,
    },
    {
      id: 6,
      title: 'Sakinah Family',
      description: 'Membangun keluarga sakinah, mawaddah, warahmah',
      icon: Home,
      completed: activeStep > 6,
      active: activeStep === 6,
    },
  ];
  
  const progress = ((activeStep - 1) / (steps.length - 1)) * 100;
  
  const currentPartner = {
    name: "Fatimah",
    age: 25,
    location: "Bandung",
    status: "Khitbah - Menuju Akad Nikah",
    startDate: "15 Agustus 2023",
    planningDate: "24 Oktober 2023",
  };
  
  const tasks = [
    { id: 1, title: "Mempersiapkan dokumen pernikahan", completed: true },
    { id: 2, title: "Menghadiri kursus pra-nikah", completed: true },
    { id: 3, title: "Menentukan mahar", completed: true },
    { id: 4, title: "Mendiskusikan rencana walimah", completed: false },
    { id: 5, title: "Mempersiapkan tempat tinggal", completed: false },
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Proses Menuju Pernikahan</h1>
            <p className="text-sm text-foreground/70 mt-2">
              Pantau dan kelola proses menuju pernikahan Anda
            </p>
          </div>
          
          <Card className="overflow-hidden">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="md:w-1/3">
                  <div className="glass-card p-4 rounded-xl text-center">
                    <div className="rounded-full bg-gradient-to-r from-taaruf-blue/10 to-taaruf-green/10 w-20 h-20 flex items-center justify-center mx-auto mb-4 border-4 border-white">
                      <Heart className="h-8 w-8 text-taaruf-blue" />
                    </div>
                    <h3 className="font-semibold">{currentPartner.name}, {currentPartner.age}</h3>
                    <p className="text-sm text-foreground/70">{currentPartner.location}</p>
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-xs text-foreground/70">Status Saat Ini</p>
                      <p className="text-sm font-medium text-taaruf-blue">{currentPartner.status}</p>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-sm font-medium">Progress Menuju Pernikahan</h3>
                      <span className="text-sm">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex gap-2 items-center">
                      <Calendar className="h-5 w-5 text-taaruf-blue" />
                      <div>
                        <p className="text-sm font-medium">Dimulai pada</p>
                        <p className="text-sm">{currentPartner.startDate}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 items-center">
                      <Calendar className="h-5 w-5 text-taaruf-green" />
                      <div>
                        <p className="text-sm font-medium">Rencana Akad Nikah</p>
                        <p className="text-sm">{currentPartner.planningDate}</p>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-2 bg-gradient-to-r from-taaruf-blue to-taaruf-green text-white hover:opacity-90">
                      <FileText className="h-4 w-4 mr-2" />
                      Lihat Dokumen Persiapan Nikah
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="relative mb-8 px-4">
                <div className="absolute top-0 left-1/2 h-full w-0.5 bg-muted -translate-x-1/2"></div>
                {steps.map((step) => (
                  <div key={step.id} className="relative flex items-start mb-8 last:mb-0">
                    <div 
                      className={`z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                        step.completed 
                          ? 'bg-taaruf-green border-taaruf-green text-white' 
                          : step.active 
                            ? 'bg-taaruf-blue border-taaruf-blue text-white' 
                            : 'bg-background border-muted text-foreground/40'
                      }`}
                    >
                      {step.completed ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <step.icon className="h-5 w-5" />
                      )}
                    </div>
                    
                    <div className="ml-4 pb-2">
                      <h3 className={`text-lg font-semibold ${
                        step.completed ? 'text-taaruf-green' : step.active ? 'text-taaruf-blue' : 'text-foreground/70'
                      }`}>
                        {step.title}
                      </h3>
                      <p className="text-sm text-foreground/70 mt-1">{step.description}</p>
                      
                      {step.active && (
                        <div className="mt-3 flex flex-col space-y-2">
                          <p className="text-sm font-medium">Persiapan yang perlu dilakukan:</p>
                          <div className="space-y-2">
                            {tasks.map(task => (
                              <div key={task.id} className="flex items-start">
                                <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center ${
                                  task.completed ? 'bg-taaruf-green text-white' : 'border border-foreground/30'
                                }`}>
                                  {task.completed && <CheckCircle className="h-3 w-3" />}
                                </div>
                                <span className={`ml-2 text-sm ${
                                  task.completed ? 'line-through text-foreground/50' : 'text-foreground/80'
                                }`}>
                                  {task.title}
                                </span>
                              </div>
                            ))}
                          </div>
                          
                          <Button className="w-full md:w-auto mt-4 bg-gradient-to-r from-taaruf-blue to-taaruf-green text-white hover:opacity-90">
                            Lanjut ke Tahap Berikutnya
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Materi dan Referensi Pernikahan Islami</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start h-auto py-3">
                  <FileText className="h-4 w-4 mr-2" />
                  <div className="text-left">
                    <p className="font-medium">Kursus Pra-Nikah</p>
                    <p className="text-xs text-foreground/70">Panduan persiapan menikah</p>
                  </div>
                </Button>
                
                <Button variant="outline" className="justify-start h-auto py-3">
                  <FileText className="h-4 w-4 mr-2" />
                  <div className="text-left">
                    <p className="font-medium">Fiqih Pernikahan</p>
                    <p className="text-xs text-foreground/70">Ketentuan syar'i tentang pernikahan</p>
                  </div>
                </Button>
                
                <Button variant="outline" className="justify-start h-auto py-3">
                  <FileText className="h-4 w-4 mr-2" />
                  <div className="text-left">
                    <p className="font-medium">Keluarga Sakinah</p>
                    <p className="text-xs text-foreground/70">Panduan membangun keluarga bahagia</p>
                  </div>
                </Button>
                
                <Button variant="outline" className="justify-start h-auto py-3">
                  <FileText className="h-4 w-4 mr-2" />
                  <div className="text-left">
                    <p className="font-medium">Hak & Kewajiban Suami Istri</p>
                    <p className="text-xs text-foreground/70">Panduan peran dalam pernikahan</p>
                  </div>
                </Button>
              </div>
              
              <div className="mt-4 pt-4 border-t text-center">
                <p className="text-sm mb-2">Butuh bantuan atau konsultasi?</p>
                <Button className="bg-gradient-to-r from-taaruf-blue to-taaruf-green text-white hover:opacity-90">
                  Hubungi Konsultan Pernikahan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MarriageProcess;
