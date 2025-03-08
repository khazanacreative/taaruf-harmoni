
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AuthForm } from '@/components/auth/AuthForm';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Login = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container max-w-md mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Masuk ke Akun Anda</h1>
            <p className="text-sm text-foreground/70 mt-2">
              Lanjutkan perjalanan ta'aruf Anda
            </p>
          </div>
          
          <div className="glass-card p-6 rounded-xl">
            <AuthForm isRegister={false} />
            
            <div className="mt-6 text-center text-sm">
              Belum memiliki akun?{' '}
              <Link to="/register" className="font-medium text-taaruf-blue hover:underline">
                Daftar di sini
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
