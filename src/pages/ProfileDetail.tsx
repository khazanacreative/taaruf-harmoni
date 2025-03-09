
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Book, 
  Phone, 
  Mail, 
  Heart, 
  Calendar,
  ArrowLeft,
  User
} from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';

// Muslim icons as SVG components
const MaleIcon = () => (
  <svg 
    xmlns="https://www.svgrepo.com/show/420361/avatar-man-muslim.svg" 
    viewBox="0 0 400 400" 
    className="w-full h-full"
    fill="currentColor"
  >
    <path d="M255.998,30C131.667,30,30,131.667,30,256c0,123.333,101.667,226,225.998,226C380.333,482,482,380.333,482,256C482,131.667,380.333,30,255.998,30z M287.358,404.363c0,2.881-2.319,5.2-5.2,5.2h-52.318c-2.882,0-5.2-2.319-5.2-5.2v-52.318c0-2.881,2.318-5.2,5.2-5.2h52.318c2.881,0,5.2,2.319,5.2,5.2V404.363z M320.029,206.223c-1.182,1.468-2.442,2.796-3.774,3.979c-1.336,1.178-2.735,2.17-4.193,2.906c-1.465,0.771-2.914,1.462-4.359,2.089c-1.439,0.627-2.785,1.252-4.054,1.878c-1.267,0.588-2.398,1.336-3.389,2.22c-0.979,0.903-1.754,1.931-2.304,3.09c-0.549,1.173-0.818,2.609-0.818,4.348v13.83c0,2.881-2.318,5.2-5.2,5.2h-71.837c-2.881,0-5.2-2.319-5.2-5.2v-13.376c0-10.471,1.798-19.284,5.417-26.444c3.622-7.151,8.059-13.2,13.3-18.147c5.25-4.897,10.708-9.187,16.396-12.835c5.685-3.657,10.998-7.284,15.968-10.957c4.95-3.663,8.969-7.639,12.049-11.954c3.096-4.309,4.631-9.494,4.631-15.572c0-6.367-2.358-11.507-7.078-15.438c-4.707-3.937-10.996-5.896-18.851-5.896c-5.227,0-9.587,0.626-13.088,1.878c-3.5,1.275-6.368,2.88-8.59,4.827c-2.22,1.959-4.012,4.132-5.353,6.521c-1.353,2.43-2.604,4.88-3.774,7.382c-0.518,1.121-1.4,2.027-2.508,2.585c-1.121,0.565-2.351,0.753-3.582,0.545l-37.979-6.538c-1.211-0.209-2.28-0.864-3.016-1.812c-0.74-0.941-1.041-2.138-0.844-3.317c1.607-9.345,4.622-17.574,9.011-24.688c4.399-7.085,10.057-13.1,16.995-18.01c6.925-4.909,15.141-8.615,24.629-11.101c9.505-2.486,20.15-3.72,31.937-3.72c12.578,0,23.947,1.665,34.129,4.978c10.16,3.318,18.85,7.896,26.059,13.756c7.223,5.845,12.793,12.793,16.756,20.825c3.956,8.032,5.954,16.763,5.954,26.186C327.398,188.894,324.975,197.936,320.029,206.223z"/>
  </svg>
);

const FemaleIcon = () => (
  <svg 
    xmlns="https://www.svgrepo.com/show/420332/avatar-muslim-paranja.svg" 
    viewBox="0 0 400 400" 
    className="w-full h-full"
    fill="currentColor"
  >
    <path d="M256.9,25.9c-121,0-219.3,98.3-219.3,219.3c0,68.7,31.7,130.1,81.3,170.2l-0.1,0.1c6.8,5.5,20.1,3.7,37,2.9c0,0.2-0.1,0.5-0.1,0.7c0,7.1,5.8,12.9,12.9,12.9c0.2,0,0.5,0,0.7-0.1c0,0,10.1,2.3,14.8,2.5v49.6c0,7.1,5.8,12.9,12.9,12.9h119.6c7.1,0,12.9-5.8,12.9-12.9v-49.6c4.8-0.3,14.8-2.5,14.8-2.5c0.2,0,0.5,0.1,0.7,0.1c7.1,0,12.9-5.8,12.9-12.9c0-0.2,0-0.5-0.1-0.7c16.9,0.8,30.2,2.6,37-2.9l-0.1-0.1c49.6-40.1,81.3-101.5,81.3-170.2C476.2,124.2,377.9,25.9,256.9,25.9z M347.8,239.5c-5.5,5.6-10.5,8.5-17.2,8.5s-23.2-10.4-35.1-10.4c-11.9,0-37,14.2-37,14.2s-25.1-14.2-37-14.2c-11.9,0-28.4,10.4-35.1,10.4c-6.7,0-11.7-2.9-17.2-8.5c-5.5-5.6-7.9-11.4-6.9-26.9c0.9-15.5,11.8-115.8,13.7-120.8c1.9-5,5.9-9.3,12.9-12.9c7-3.6,52.9-6.8,69.6-6.8c16.8,0,62.6,3.2,69.6,6.8c7,3.6,11,7.8,12.9,12.9c1.9,5,12.8,105.3,13.7,120.8C355.7,228.1,353.3,233.9,347.8,239.5z"/>
  </svg>
);

// Mock profile data
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
    vision: 'Membangun keluarga yang berlandaskan nilai-nilai Islam, dan menjadi ladang dakwah di masyarakat.',
    maritalStatus: 'Belum Menikah',
    height: 175,
    weight: 70,
    birthplace: 'Bandung',
    birthdate: '15 Agustus 1995',
    phone: '+6281234567890',
    email: 'ahmad@example.com',
    gender: 'male',
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
    vision: 'Membangun keluarga sakinah dengan landasan ilmu dan taqwa.',
    maritalStatus: 'Belum Menikah',
    height: 180,
    weight: 75,
    birthplace: 'Surabaya',
    birthdate: '10 Januari 1993',
    phone: '+6281234567891',
    email: 'umar@example.com',
    gender: 'male',
    isBookmarked: true
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
    vision: 'Membangun keluarga yang sakinah, mawaddah, warahmah dengan pendidikan islam sebagai pondasinya.',
    maritalStatus: 'Belum Menikah',
    height: 160,
    weight: 55,
    birthplace: 'Jakarta',
    birthdate: '20 Maret 1998',
    phone: '+6281234567892',
    email: 'fatimah@example.com',
    gender: 'female',
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
    vision: 'Menjadi keluarga yang produktif secara ekonomi dan bermanfaat untuk umat.',
    maritalStatus: 'Belum Menikah',
    height: 165,
    weight: 58,
    birthplace: 'Semarang',
    birthdate: '15 Juni 1996',
    phone: '+6281234567893',
    email: 'khadijah@example.com',
    gender: 'female',
    isBookmarked: false
  },
];

const ProfileDetail = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to fetch profile details
    setTimeout(() => {
      const maleProfile = maleProfiles.find(p => p.id === Number(id));
      const femaleProfile = femaleProfiles.find(p => p.id === Number(id));
      const foundProfile = maleProfile || femaleProfile;
      
      setProfile(foundProfile || null);
      setLoading(false);
    }, 500);
  }, [id]);
  
  if (!profile) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <User className="h-16 w-16 mx-auto text-foreground/20 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Profil Tidak Ditemukan</h2>
          <p className="text-foreground/70 mb-6">
            Profil yang Anda cari tidak ditemukan atau telah dihapus.
          </p>
          <Button asChild>
            <Link to="/gallery">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Galeri
            </Link>
          </Button>
        </div>
      </AppLayout>
    );
  }
  
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center">
          <Button variant="ghost" asChild className="mr-2">
            <Link to="/gallery">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Galeri
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="w-40 h-40 bg-gradient-to-br from-taaruf-blue/10 to-taaruf-green/10 rounded-full flex items-center justify-center mb-4">
                    <div className="w-32 h-32 text-taaruf-blue/50">
                      {profile.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-1">{profile.name}, {profile.age}</h2>
                  <div className="flex items-center text-foreground/70 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    {profile.location}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 w-full mt-4">
                    <div className="text-center p-3 bg-muted/20 rounded-lg">
                      <p className="text-xs text-foreground/60">Tinggi</p>
                      <p className="font-medium">{profile.height} cm</p>
                    </div>
                    <div className="text-center p-3 bg-muted/20 rounded-lg">
                      <p className="text-xs text-foreground/60">Berat</p>
                      <p className="font-medium">{profile.weight} kg</p>
                    </div>
                    <div className="text-center p-3 bg-muted/20 rounded-lg">
                      <p className="text-xs text-foreground/60">Status</p>
                      <p className="font-medium">{profile.maritalStatus}</p>
                    </div>
                    <div className="text-center p-3 bg-muted/20 rounded-lg">
                      <p className="text-xs text-foreground/60">Lahir</p>
                      <p className="font-medium">{profile.birthplace}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <h3 className="text-lg font-semibold">Kontak</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 mr-3 text-foreground/70" />
                    <div>
                      <p className="text-sm text-foreground/70">Telepon</p>
                      <p>{profile.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 mr-3 text-foreground/70" />
                    <div>
                      <p className="text-sm text-foreground/70">Email</p>
                      <p>{profile.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 mr-3 text-foreground/70" />
                    <div>
                      <p className="text-sm text-foreground/70">Tanggal Lahir</p>
                      <p>{profile.birthdate}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Tentang {profile.name}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 mb-6">{profile.about}</p>
                
                <div className="mb-6">
                  <h4 className="text-md font-medium mb-2">Visi Pernikahan</h4>
                  <p className="text-foreground/80">{profile.vision}</p>
                </div>
                
                <div className="grid grid-cols-1 gap-4 mb-6">
                  <div className="flex items-start">
                    <GraduationCap className="h-5 w-5 mr-3 text-foreground/70" />
                    <div>
                      <p className="text-sm text-foreground/70">Pendidikan</p>
                      <p>{profile.education}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Briefcase className="h-5 w-5 mr-3 text-foreground/70" />
                    <div>
                      <p className="text-sm text-foreground/70">Pekerjaan</p>
                      <p>{profile.occupation}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-start">
                    <Book className="h-5 w-5 mr-3 text-foreground/70" />
                    <div>
                      <p className="text-sm text-foreground/70 mb-2">Minat & Hobi</p>
                      <div className="flex flex-wrap gap-2">
                        {profile.interests.map((interest: string, idx: number) => (
                          <Badge key={idx} variant="outline">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-6 glass-card p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">Langkah Selanjutnya</h3>
              <p className="text-foreground/80 mb-4">
                Jika Anda tertarik untuk melanjutkan proses ta'aruf dengan {profile.name}, silakan kirim permintaan ta'aruf. 
                Permintaan Anda akan diteruskan kepada yang bersangkutan dan wali/murobbi.
              </p>
              
              <div className="flex flex-col space-y-4">
                <Button 
                  className="w-full bg-gradient-to-r from-taaruf-blue to-taaruf-green text-white hover:opacity-90"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Kirim Permintaan Ta'aruf
                </Button>
                
                <p className="text-center text-xs text-foreground/60">
                  Dengan mengirim permintaan, Anda menyetujui untuk membuka biodata diri kepada pihak yang bersangkutan
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProfileDetail;
