
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, MessageSquare, Users, Search } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-taaruf-blue/5 to-taaruf-green/5 -z-10" />
          <div className="absolute top-20 -left-48 w-96 h-96 bg-taaruf-blue/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 -right-48 w-96 h-96 bg-taaruf-green/10 rounded-full blur-3xl" />
          
          <div className="container px-4 max-w-6xl mx-auto text-center">
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-gradient-to-r from-taaruf-blue/10 to-taaruf-green/10 border border-taaruf-blue/20">
              <span className="text-sm font-medium text-gradient">Islamic Matchmaking</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Find Your <span className="text-gradient">Perfect Match</span> Through <span className="text-gradient">Taaruf</span>
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto mb-8">
              A respectful and halal way to find your life partner based on Islamic values and principles. Start your journey to a blessed marriage today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-taaruf-blue to-taaruf-green text-white hover:opacity-90">
                <Link to="/register">
                  <Heart className="mr-2 h-5 w-5" />
                  Start Your Journey
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                onClick={scrollToFeatures}
                className="border-taaruf-blue/30 text-taaruf-blue hover:bg-taaruf-blue/5"
              >
                Learn More
              </Button>
            </div>
            
            <div className="mt-12 md:mt-16 p-1 rounded-xl bg-gradient-to-r from-taaruf-blue/40 via-background to-taaruf-green/40">
              <div className="glass-card w-full overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" 
                  alt="Happy couple" 
                  className="w-full h-64 md:h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section ref={featuresRef} className="py-16 md:py-24">
          <div className="container px-4 max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How <span className="text-gradient">TaarufHarmoni</span> Works</h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Our platform follows the Islamic principles of finding a spouse through a structured and respectful process.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="glass-card p-6 rounded-xl hover-scale">
                <div className="h-12 w-12 rounded-full bg-taaruf-blue/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-taaruf-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Register & Create CV</h3>
                <p className="text-foreground/70">
                  Sign up and create your detailed biodata (CV) with important information about yourself.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="glass-card p-6 rounded-xl hover-scale">
                <div className="h-12 w-12 rounded-full bg-taaruf-green/10 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-taaruf-green" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Search Criteria</h3>
                <p className="text-foreground/70">
                  Find potential matches based on your preferences and Islamic values.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="glass-card p-6 rounded-xl hover-scale">
                <div className="h-12 w-12 rounded-full bg-taaruf-blue/10 flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-taaruf-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Taaruf Process</h3>
                <p className="text-foreground/70">
                  Engage in a structured communication process to get to know each other with proper intentions.
                </p>
              </div>
              
              {/* Feature 4 */}
              <div className="glass-card p-6 rounded-xl hover-scale">
                <div className="h-12 w-12 rounded-full bg-taaruf-green/10 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-taaruf-green" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Nadzor Meeting</h3>
                <p className="text-foreground/70">
                  Move forward with a meeting in the presence of family members or a trusted third party.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-taaruf-blue/5 to-taaruf-green/5">
          <div className="container px-4 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Begin Your <span className="text-gradient">Taaruf Journey</span>?</h2>
            <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
              Join our growing community of Muslims seeking marriage in a halal and respectful way. Your future spouse may be just a few steps away.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-taaruf-blue to-taaruf-green text-white hover:opacity-90">
                <Link to="/register">Create Account</Link>
              </Button>
              
              <Button asChild variant="outline" size="lg">
                <Link to="/login">Already Have Account</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
