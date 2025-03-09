
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Filter } from 'lucide-react';
import CriteriaSearch from '@/components/search/CriteriaSearch';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Dummy data for potential matches
const potentialMatches = [
  {
    id: 1,
    name: 'Ahmad',
    age: 28,
    location: 'Jakarta',
    education: 'S1 Teknik Informatika',
    occupation: 'Software Engineer',
    about: 'Saya seorang Muslim yang berkomitmen untuk menikah dengan niat baik dan menjalankan sunnah Rasulullah SAW.',
    gender: 'male'
  },
  {
    id: 2,
    name: 'Fatimah',
    age: 25,
    location: 'Bandung',
    education: 'S1 Pendidikan',
    occupation: 'Guru',
    about: 'Alhamdulillah, saya siap menikah untuk menyempurnakan separuh agama saya. Saya mencari pasangan yang baik agamanya.',
    gender: 'female'
  },
  {
    id: 3,
    name: 'Umar',
    age: 30,
    location: 'Surabaya',
    education: 'S2 Ekonomi Syariah',
    occupation: 'Dosen',
    about: 'Saya senang berbagi ilmu dan mencari pasangan yang bisa menjadi sahabat dalam menuntut ilmu dan beribadah.',
    gender: 'male'
  },
  {
    id: 4,
    name: 'Khadijah',
    age: 27,
    location: 'Yogyakarta',
    education: 'S1 Farmasi',
    occupation: 'Apoteker',
    about: 'Mencari seseorang yang bertakwa kepada Allah dan serius dalam membangun rumah tangga yang sakinah, mawaddah wa rahmah.',
    gender: 'female'
  },
];

const Search = () => {
  const [matches, setMatches] = useState(potentialMatches);
  
  // Handle search based on criteria
  const handleSearch = (criteria: any) => {
    // In a real app, this would filter based on criteria or call an API
    console.log('Searching with criteria:', criteria);
    
    // Simple filtering example
    let filtered = potentialMatches;
    
    if (criteria.ageRange) {
      filtered = filtered.filter(
        match => match.age >= criteria.ageRange[0] && match.age <= criteria.ageRange[1]
      );
    }
    
    if (criteria.location && criteria.location !== 'all') {
      filtered = filtered.filter(match => match.location === criteria.location);
    }
    
    setMatches(filtered);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-center">Cari Calon Pasangan</h1>
          
          <Card>
            <CardContent className="p-6">
              <CriteriaSearch onSearch={handleSearch} />
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.length === 0 ? (
              <div className="col-span-full text-center py-10">
                <Heart className="mx-auto h-10 w-10 text-foreground/30 mb-3" />
                <p className="text-foreground/70">Tidak ada kecocokan ditemukan dengan kriteria Anda</p>
              </div>
            ) : (
              matches.map((match) => (
                <Card key={match.id} className="overflow-hidden hover-scale">
                  <CardContent className="p-0">
                    <div className="aspect-[4/3] bg-gradient-to-br from-taaruf-blue/10 to-taaruf-green/10 flex items-center justify-center">
                      {match.gender === 'male' ? (
                        <div className="w-32 h-32 flex flex-col items-center justify-center bg-taaruf-blue/10 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 text-taaruf-blue/50">
                            <path d="M12 2a9 9 0 0 0-9 9c0 3.882 2.383 7.2 5.85 8.682.596.245 1.096-.29.908-.873-.494-1.537-.157-2.345.386-2.675-2.08-.796-3.144-3.179-3.144-5.495 0-3.139 2.246-5.475 5-5.475s5 2.336 5 5.475c0 2.316-1.064 4.699-3.144 5.495.543.33.88 1.138.385 2.675-.187.584.313 1.118.909.873C18.617 18.2 21 14.882 21 11a9 9 0 0 0-9-9z"/>
                            <circle cx="12" cy="10" r="3" />
                            <path d="M6.5 9.5 L6.5 12.5 L4 12.5" />
                          </svg>
                          <span className="mt-1 text-xs text-taaruf-blue/70">Ikhwan</span>
                        </div>
                      ) : (
                        <div className="w-32 h-32 flex flex-col items-center justify-center bg-taaruf-green/10 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 text-taaruf-green/50">
                            <path d="M12 2a9 9 0 0 0-9 9c0 3.882 2.383 7.2 5.85 8.682.596.245 1.096-.29.908-.873-.494-1.537-.157-2.345.386-2.675-2.08-.796-3.144-3.179-3.144-5.495 0-3.139 2.246-5.475 5-5.475s5 2.336 5 5.475c0 2.316-1.064 4.699-3.144 5.495.543.33.88 1.138.385 2.675-.187.584.313 1.118.909.873C18.617 18.2 21 14.882 21 11a9 9 0 0 0-9-9z"/>
                            <circle cx="12" cy="10" r="3" />
                            <path d="M7.5 14.5 L12 19 L16.5 14.5" />
                          </svg>
                          <span className="mt-1 text-xs text-taaruf-green/70">Akhwat</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-semibold">{match.name}, {match.age}</h3>
                          <p className="text-sm text-foreground/70">{match.location}</p>
                        </div>
                        <Button 
                          size="sm" 
                          className="h-8 bg-gradient-to-r from-taaruf-blue to-taaruf-green text-white hover:opacity-90"
                        >
                          <Heart className="h-4 w-4 mr-1" />
                          Taaruf
                        </Button>
                      </div>
                      <div className="mt-3 space-y-2">
                        <p className="text-sm"><span className="font-medium">Pendidikan:</span> {match.education}</p>
                        <p className="text-sm"><span className="font-medium">Pekerjaan:</span> {match.occupation}</p>
                        <p className="text-sm mt-2">{match.about}</p>
                      </div>
                      <Button
                        variant="link"
                        size="sm"
                        className="p-0 h-auto mt-2"
                      >
                        Lihat profil lengkap
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
      
    </div>
  );
};

export default Search;
