
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Filter } from 'lucide-react';
import CriteriaSearch from '@/components/search/CriteriaSearch';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Dummy data for profiles
const dummyProfiles = [
  {
    id: 1,
    name: 'Ahmad',
    age: 28,
    location: 'Jakarta',
    education: 'S1 Teknik Informatika',
    occupation: 'Programmer',
    imageUrl: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 2,
    name: 'Fatimah',
    age: 25,
    location: 'Bandung',
    education: 'S1 Pendidikan',
    occupation: 'Guru',
    imageUrl: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 3,
    name: 'Umar',
    age: 30,
    location: 'Surabaya',
    education: 'S2 Manajemen',
    occupation: 'Dosen',
    imageUrl: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: 4,
    name: 'Aisyah',
    age: 27,
    location: 'Yogyakarta',
    education: 'S1 Kedokteran',
    occupation: 'Dokter',
    imageUrl: 'https://i.pravatar.cc/150?img=8',
  },
];

const Search = () => {
  const [filteredProfiles, setFilteredProfiles] = useState(dummyProfiles);
  const [showFilters, setShowFilters] = useState(false);
  
  const handleSearch = (criteria: any) => {
    console.log('Search criteria:', criteria);
    // In a real app, this would filter profiles based on criteria
    setFilteredProfiles(dummyProfiles);
    setShowFilters(false);
  };
  
  const handleTaarufRequest = (profileId: number) => {
    console.log('Taaruf request sent to profile:', profileId);
    // In a real app, this would send a taaruf request
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Cari Calon Pasangan</h1>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter Kriteria
            </Button>
          </div>
          
          {showFilters && (
            <div className="glass-card p-6 rounded-xl">
              <CriteriaSearch onSearch={handleSearch} />
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map((profile) => (
              <Card key={profile.id} className="hover:shadow-md transition-shadow overflow-hidden">
                <div className="aspect-[3/4] relative">
                  <img
                    src={profile.imageUrl}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{profile.name}, {profile.age}</h3>
                        <p className="text-sm text-foreground/70">{profile.location}</p>
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <p>Pendidikan: {profile.education}</p>
                      <p>Pekerjaan: {profile.occupation}</p>
                    </div>
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-taaruf-blue to-taaruf-green text-white hover:opacity-90 mt-2"
                      onClick={() => handleTaarufRequest(profile.id)}
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Ajukan Ta'aruf
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Search;
