
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Users, 
  Heart, 
  User, 
  GraduationCap, 
  Briefcase, 
  MapPin,
  Book
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

// Mock data for gallery profiles
const maleProfiles = [
  {
    id: 1,
    name: 'Ahmad',
    age: 28,
    location: 'Jakarta',
    education: 'S1 Teknik Informatika',
    occupation: 'Software Engineer',
    interests: ['Membaca', 'Olahraga', 'Dakwah'],
    about: 'Alhamdulillah, saya seorang profesional IT yang aktif di kegiatan dakwah kampus. Mencari pasangan yang solehah dan berorientasi pada akhirat.',
    isBookmarked: false
  },
  {
    id: 2,
    name: 'Umar',
    age: 30,
    location: 'Surabaya',
    education: 'S2 Ekonomi Syariah',
    occupation: 'Dosen',
    interests: ['Menulis', 'Mengajar', 'Traveling'],
    about: 'Bismillah, saya dosen yang sedang menempuh S3. Mencari pasangan yang mendukung karir akademis dan bersemangat dalam tholabul ilmi.',
    isBookmarked: true
  },
  {
    id: 3,
    name: 'Ibrahim',
    age: 26,
    location: 'Bandung',
    education: 'S1 Arsitektur',
    occupation: 'Arsitek',
    interests: ['Desain', 'Fotografi', 'Kaligrafi'],
    about: 'Seorang arsitek yang mendalami kaligrafi islami. Mencari pasangan yang mencintai seni dan keindahan dalam bingkai syariat.',
    isBookmarked: false
  },
  {
    id: 4,
    name: 'Yusuf',
    age: 32,
    location: 'Yogyakarta',
    education: 'S1 Kedokteran',
    occupation: 'Dokter',
    interests: ['Kesehatan', 'Membaca', 'Berkebun'],
    about: 'Dokter yang aktif dalam kegiatan sosial. Ingin menikah dan membangun keluarga yang bermanfaat untuk masyarakat.',
    isBookmarked: false
  },
];

const femaleProfiles = [
  {
    id: 1,
    name: 'Fatimah',
    age: 25,
    location: 'Bandung',
    education: 'S1 Pendidikan',
    occupation: 'Guru',
    interests: ['Mengajar', 'Memasak', 'Membaca'],
    about: 'Alhamdulillah, saya guru yang senang berbagi ilmu. Mencari pasangan yang mencintai ilmu dan menyayangi anak-anak.',
    isBookmarked: true
  },
  {
    id: 2,
    name: 'Khadijah',
    age: 27,
    location: 'Jakarta',
    education: 'S1 Ekonomi',
    occupation: 'Wiraswasta',
    interests: ['Bisnis', 'Sosial', 'Memasak'],
    about: 'Bismillah, saya seorang wiraswasta yang menjalankan bisnis fashion syar\'i. Mencari pasangan yang mendukung karir dan mendambakan keluarga sakinah.',
    isBookmarked: false
  },
  {
    id: 3,
    name: 'Aisyah',
    age: 24,
    location: 'Surabaya',
    education: 'S1 Psikologi',
    occupation: 'Psikolog',
    interests: ['Konseling', 'Membaca', 'Traveling'],
    about: 'Psikolog yang berfokus pada kesehatan mental remaja. Mencari pasangan yang memiliki kepedulian sosial dan mencintai sunnah.',
    isBookmarked: false
  },
  {
    id: 4,
    name: 'Maryam',
    age: 26,
    location: 'Makassar',
    education: 'S1 Kedokteran Gigi',
    occupation: 'Dokter Gigi',
    interests: ['Kesehatan', 'Kuliner', 'Qira\'ah'],
    about: 'Dokter gigi yang hobi memasak dan mengaji. Ingin membangun rumah tangga yang berlandaskan Al-Qur\'an dan Sunnah.',
    isBookmarked: true
  },
];

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('male');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredMaleProfiles = maleProfiles.filter(profile => 
    profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.occupation.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredFemaleProfiles = femaleProfiles.filter(profile => 
    profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.occupation.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const toggleBookmark = (id: number, gender: 'male' | 'female') => {
    if (gender === 'male') {
      const updatedProfiles = maleProfiles.map(profile => 
        profile.id === id ? { ...profile, isBookmarked: !profile.isBookmarked } : profile
      );
      // In a real app, this would update the state
      console.log('Updated male profiles:', updatedProfiles);
    } else {
      const updatedProfiles = femaleProfiles.map(profile => 
        profile.id === id ? { ...profile, isBookmarked: !profile.isBookmarked } : profile
      );
      // In a real app, this would update the state
      console.log('Updated female profiles:', updatedProfiles);
    }
  };
  
  const renderProfile = (profile: any, gender: 'male' | 'female') => (
    <Card key={profile.id} className="overflow-hidden hover-scale">
      <CardContent className="p-0">
        <div className="aspect-[3/2] bg-gradient-to-br from-taaruf-blue/10 to-taaruf-green/10 flex items-center justify-center">
          <div className="w-28 h-28 flex flex-col items-center justify-center bg-foreground/5 rounded-full">
            {gender === 'male' ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 text-taaruf-blue/50">
                <path d="M12 2a9 9 0 0 0-9 9c0 3.882 2.383 7.2 5.85 8.682.596.245 1.096-.29.908-.873-.494-1.537-.157-2.345.386-2.675-2.08-.796-3.144-3.179-3.144-5.495 0-3.139 2.246-5.475 5-5.475s5 2.336 5 5.475c0 2.316-1.064 4.699-3.144 5.495.543.33.88 1.138.385 2.675-.187.584.313 1.118.909.873C18.617 18.2 21 14.882 21 11a9 9 0 0 0-9-9z"/>
                <circle cx="12" cy="10" r="3" />
                <path d="M6.5 9.5 L6.5 12.5 L4 12.5" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 text-taaruf-green/50">
                <path d="M12 2a9 9 0 0 0-9 9c0 3.882 2.383 7.2 5.85 8.682.596.245 1.096-.29.908-.873-.494-1.537-.157-2.345.386-2.675-2.08-.796-3.144-3.179-3.144-5.495 0-3.139 2.246-5.475 5-5.475s5 2.336 5 5.475c0 2.316-1.064 4.699-3.144 5.495.543.33.88 1.138.385 2.675-.187.584.313 1.118.909.873C18.617 18.2 21 14.882 21 11a9 9 0 0 0-9-9z"/>
                <circle cx="12" cy="10" r="3" />
                <path d="M7.5 14.5 L12 19 L16.5 14.5" />
              </svg>
            )}
            <span className="mt-1 text-xs text-muted-foreground">
              {gender === 'male' ? 'Ikhwan' : 'Akhwat'}
            </span>
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{profile.name}, {profile.age}</h3>
              <div className="flex items-center text-sm text-foreground/70">
                <MapPin className="h-3 w-3 mr-1" />
                {profile.location}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => toggleBookmark(profile.id, gender)}
            >
              <Heart className={`h-4 w-4 ${profile.isBookmarked ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 gap-2 mt-3">
            <div className="flex items-start">
              <GraduationCap className="h-4 w-4 mr-2 mt-0.5 text-foreground/70" />
              <p className="text-sm">{profile.education}</p>
            </div>
            <div className="flex items-start">
              <Briefcase className="h-4 w-4 mr-2 mt-0.5 text-foreground/70" />
              <p className="text-sm">{profile.occupation}</p>
            </div>
            <div className="flex items-start">
              <Book className="h-4 w-4 mr-2 mt-0.5 text-foreground/70" />
              <div>
                <p className="text-xs text-foreground/70 mb-1">Minat:</p>
                <div className="flex flex-wrap gap-1">
                  {profile.interests.map((interest: string, idx: number) => (
                    <Badge key={idx} variant="outline" className="text-xs py-0 px-2">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-4 py-3 border-t bg-muted/10">
        <Button 
          variant="link" 
          className="p-0 h-auto text-taaruf-blue"
          asChild
        >
          <Link to={`/profile/${profile.id}`}>
            Lihat profil lengkap
          </Link>
        </Button>
        <Button 
          size="sm"
          className="ml-auto bg-gradient-to-r from-taaruf-blue to-taaruf-green text-white hover:opacity-90"
        >
          <Heart className="h-4 w-4 mr-1" />
          Kirim Permintaan Ta'aruf
        </Button>
      </CardFooter>
    </Card>
  );
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Galeri Peserta Ta'aruf</h1>
            <p className="text-sm text-foreground/70 mt-2">
              Lihat ringkasan CV peserta yang telah mendaftar di platform Taaruf Ar Rahman
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari berdasarkan nama, lokasi, atau pekerjaan..."
                className="w-full pl-10 pr-4 py-2 border border-input rounded-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button asChild variant="outline">
                <Link to="/search">
                  <Search className="h-4 w-4 mr-2" />
                  Pencarian Detail
                </Link>
              </Button>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="male">
                <User className="h-4 w-4 mr-2" />
                Ikhwan ({filteredMaleProfiles.length})
              </TabsTrigger>
              <TabsTrigger value="female">
                <User className="h-4 w-4 mr-2" />
                Akhwat ({filteredFemaleProfiles.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="male">
              {filteredMaleProfiles.length === 0 ? (
                <div className="text-center py-10 glass-card rounded-xl">
                  <Users className="mx-auto h-10 w-10 text-foreground/30 mb-3" />
                  <p className="text-foreground/70">Tidak ada profil ikhwan yang sesuai dengan pencarian Anda</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMaleProfiles.map(profile => renderProfile(profile, 'male'))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="female">
              {filteredFemaleProfiles.length === 0 ? (
                <div className="text-center py-10 glass-card rounded-xl">
                  <Users className="mx-auto h-10 w-10 text-foreground/30 mb-3" />
                  <p className="text-foreground/70">Tidak ada profil akhwat yang sesuai dengan pencarian Anda</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFemaleProfiles.map(profile => renderProfile(profile, 'female'))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Gallery;
