
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Filter, Search as SearchIcon } from 'lucide-react';

interface CriteriaSearchProps {
  onSearch: (criteria: any) => void;
}

const CriteriaSearch = ({ onSearch }: CriteriaSearchProps) => {
  const [ageRange, setAgeRange] = useState([20, 40]);
  const [location, setLocation] = useState('all');
  const [education, setEducation] = useState('all');
  const [occupation, setOccupation] = useState('all');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      ageRange,
      location,
      education,
      occupation
    });
  };
  
  return (
    <div>
      <h3 className="text-lg font-medium mb-4 flex items-center">
        <Filter className="h-5 w-5 mr-2" />
        Filter Pencarian
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Rentang Usia</label>
            <div className="px-2">
              <Slider
                value={ageRange}
                min={18}
                max={60}
                step={1}
                onValueChange={setAgeRange}
              />
            </div>
            <div className="text-sm flex justify-between">
              <span>{ageRange[0]} tahun</span>
              <span>{ageRange[1]} tahun</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Lokasi</label>
            <select
              className="w-full p-2 border border-input rounded-md bg-background"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="all">Semua Lokasi</option>
              <option value="Jakarta">Jakarta</option>
              <option value="Bandung">Bandung</option>
              <option value="Surabaya">Surabaya</option>
              <option value="Yogyakarta">Yogyakarta</option>
              <option value="Makassar">Makassar</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Pendidikan</label>
            <select
              className="w-full p-2 border border-input rounded-md bg-background"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
            >
              <option value="all">Semua Pendidikan</option>
              <option value="SMA">SMA/Sederajat</option>
              <option value="D3">Diploma</option>
              <option value="S1">Sarjana (S1)</option>
              <option value="S2">Magister (S2)</option>
              <option value="S3">Doktor (S3)</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Pekerjaan</label>
            <select
              className="w-full p-2 border border-input rounded-md bg-background"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
            >
              <option value="all">Semua Pekerjaan</option>
              <option value="PNS">PNS</option>
              <option value="Swasta">Karyawan Swasta</option>
              <option value="Wiraswasta">Wiraswasta</option>
              <option value="Profesional">Profesional (Dokter, Pengacara, dll)</option>
              <option value="Guru/Dosen">Guru/Dosen</option>
              <option value="Mahasiswa">Mahasiswa</option>
            </select>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full md:w-auto bg-gradient-to-r from-taaruf-blue to-taaruf-green text-white hover:opacity-90"
        >
          <SearchIcon className="h-4 w-4 mr-2" />
          Cari Calon Pasangan
        </Button>
      </form>
    </div>
  );
};

export default CriteriaSearch;
