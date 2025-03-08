
import { useState } from 'react';
import { 
  Filter, 
  Search as SearchIcon, 
  User, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Heart, 
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

// Mock data for demonstration
const MOCK_USERS = [
  {
    id: 1,
    name: "Ahmad Farhan",
    age: 29,
    location: "Jakarta",
    occupation: "Software Engineer",
    education: "Bachelor in Computer Science",
    status: null
  },
  {
    id: 2,
    name: "Fatima Zahra",
    age: 26,
    location: "Bandung",
    occupation: "Architect",
    education: "Master in Architecture",
    status: null
  },
  {
    id: 3,
    name: "Muhammad Rizki",
    age: 32,
    location: "Surabaya",
    occupation: "Doctor",
    education: "Medical Degree",
    status: "requested"
  },
  {
    id: 4,
    name: "Nadia Humaira",
    age: 27,
    location: "Yogyakarta",
    occupation: "Teacher",
    education: "Bachelor in Education",
    status: null
  },
  {
    id: 5,
    name: "Ilham Abdullah",
    age: 30,
    location: "Medan",
    occupation: "Business Analyst",
    education: "MBA",
    status: null
  },
];

const CriteriaSearch = () => {
  const [ageRange, setAgeRange] = useState<number[]>([20, 40]);
  const [location, setLocation] = useState<string>("");
  const [occupation, setOccupation] = useState<string>("");
  const [education, setEducation] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isRequesting, setIsRequesting] = useState<number | null>(null);
  const { toast } = useToast();
  
  const handleSearch = () => {
    setIsSearching(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const filteredResults = MOCK_USERS.filter(user => {
        const meetsAgeRange = user.age >= ageRange[0] && user.age <= ageRange[1];
        const meetsLocation = !location || user.location.toLowerCase().includes(location.toLowerCase());
        const meetsOccupation = !occupation || user.occupation.toLowerCase().includes(occupation.toLowerCase());
        const meetsEducation = !education || user.education.includes(education);
        
        return meetsAgeRange && meetsLocation && meetsOccupation && meetsEducation;
      });
      
      setSearchResults(filteredResults);
      setIsSearching(false);
    }, 1000);
  };
  
  const handleRequestTaaruf = (userId: number) => {
    setIsRequesting(userId);
    
    // Simulate API call with timeout
    setTimeout(() => {
      toast({
        title: "Taaruf Request Sent",
        description: "Your request has been sent successfully. You'll be notified when they respond.",
      });
      
      // Update UI to show requested status
      setSearchResults(prev => 
        prev.map(user => 
          user.id === userId ? { ...user, status: "requested" } : user
        )
      );
      
      setIsRequesting(null);
    }, 1500);
  };
  
  const handleResetFilters = () => {
    setAgeRange([20, 40]);
    setLocation("");
    setOccupation("");
    setEducation("");
    setSearchResults([]);
  };
  
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-taaruf-blue" />
          <h2 className="text-lg font-semibold">Search Criteria</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">Age Range</label>
            <div className="pt-2 px-2">
              <Slider
                defaultValue={ageRange}
                value={ageRange}
                min={18}
                max={60}
                step={1}
                onValueChange={setAgeRange}
                className="my-5"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{ageRange[0]} years</span>
                <span>{ageRange[1]} years</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <Input 
              placeholder="City or region" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Occupation</label>
            <Input 
              placeholder="Job title" 
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Education Level</label>
            <Select value={education} onValueChange={setEducation}>
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any</SelectItem>
                <SelectItem value="High School">High School</SelectItem>
                <SelectItem value="Bachelor">Bachelor's Degree</SelectItem>
                <SelectItem value="Master">Master's Degree</SelectItem>
                <SelectItem value="PhD">PhD</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button 
            onClick={handleSearch} 
            className="flex-1 bg-gradient-to-r from-taaruf-blue to-taaruf-blue-dark text-white hover:opacity-90"
            disabled={isSearching}
          >
            {isSearching ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <SearchIcon className="mr-2 h-4 w-4" />
                Search
              </>
            )}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleResetFilters}
            className="flex-1 sm:flex-none"
          >
            Reset Filters
          </Button>
        </div>
      </div>
      
      {searchResults.length > 0 && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">
              Search Results <span className="text-muted-foreground">({searchResults.length})</span>
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {searchResults.map(user => (
              <Card key={user.id} className="overflow-hidden transform transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4 items-center">
                      <div className="h-12 w-12 rounded-full bg-taaruf-blue/10 flex items-center justify-center">
                        <User className="h-6 w-6 text-taaruf-blue" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">{user.age} years old</p>
                      </div>
                    </div>
                    
                    {user.status === "requested" ? (
                      <div className="text-xs bg-taaruf-blue/10 text-taaruf-blue py-1 px-3 rounded-full">
                        Requested
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        className="bg-taaruf-green hover:bg-taaruf-green-dark text-white"
                        onClick={() => handleRequestTaaruf(user.id)}
                        disabled={isRequesting === user.id}
                      >
                        {isRequesting === user.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <Heart className="h-3 w-3 mr-1" /> 
                            Request
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{user.location}</span>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{user.occupation}</span>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <GraduationCap className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{user.education}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CriteriaSearch;
