
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
              <span className="text-sm font-medium text-gradient">Ta'aruf Islami</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Temukan <span className="text-gradient">Pasangan Hidup</span> Melalui <span className="text-gradient">Ta'aruf</span>
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto mb-8">
              Cara halal dan terhormat untuk menemukan pasangan hidup berdasarkan nilai-nilai Islam. Mulai perjalanan menuju pernikahan yang berkah hari ini.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-taaruf-blue to-taaruf-green text-white hover:opacity-90">
                <Link to="/register">
                  <Heart className="mr-2 h-5 w-5" />
                  Mulai Perjalanan
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                onClick={scrollToFeatures}
                className="border-taaruf-blue/30 text-taaruf-blue hover:bg-taaruf-blue/5"
              >
                Pelajari Selengkapnya
              </Button>
            </div>
            
            <div className="mt-12 md:mt-16 p-1 rounded-xl bg-gradient-to-r from-taaruf-blue/40 via-background to-taaruf-green/40">
              <div className="glass-card w-full overflow-hidden rounded-lg">
                <img 
                  src="https://cdn.pixabay.com/photo/2021/02/26/16/37/muslim-6052483_1280.jpg" 
                  alt="Pasangan Muslim" 
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Bagaimana <span className="text-gradient">Taaruf Ar Rahman</span> Bekerja</h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Platform kami mengikuti prinsip-prinsip Islam dalam mencari jodoh melalui proses yang terstruktur dan terhormat.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="glass-card p-6 rounded-xl hover-scale">
                <div className="h-12 w-12 rounded-full bg-taaruf-blue/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-taaruf-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Daftar & Buat CV</h3>
                <p className="text-foreground/70">
                  Daftar dan buat biodata (CV) lengkap dengan informasi penting tentang diri Anda.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="glass-card p-6 rounded-xl hover-scale">
                <div className="h-12 w-12 rounded-full bg-taaruf-green/10 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-taaruf-green" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Cari Kriteria</h3>
                <p className="text-foreground/70">
                  Temukan calon pasangan potensial berdasarkan preferensi dan nilai-nilai Islam.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="glass-card p-6 rounded-xl hover-scale">
                <div className="h-12 w-12 rounded-full bg-taaruf-blue/10 flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-taaruf-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Proses Ta'aruf</h3>
                <p className="text-foreground/70">
                  Jalani proses komunikasi terstruktur untuk saling mengenal dengan niat yang baik.
                </p>
              </div>
              
              {/* Feature 4 */}
              <div className="glass-card p-6 rounded-xl hover-scale">
                <div className="h-12 w-12 rounded-full bg-taaruf-green/10 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-taaruf-green" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Pertemuan Nadzor</h3>
                <p className="text-foreground/70">
                  Lanjutkan dengan pertemuan yang didampingi keluarga atau pihak ketiga yang terpercaya.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-taaruf-blue/5 to-taaruf-green/5">
          <div className="container px-4 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Siap Memulai <span className="text-gradient">Perjalanan Ta'aruf</span>?</h2>
            <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
              Bergabunglah dengan komunitas Muslim yang mencari pernikahan dengan cara halal dan terhormat. Calon pasangan Anda mungkin hanya beberapa langkah lagi.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-taaruf-blue to-taaruf-green text-white hover:opacity-90">
                <Link to="/register">Buat Akun</Link>
              </Button>
              
              <Button asChild variant="outline" size="lg">
                <Link to="/login">Sudah Punya Akun</Link>
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
