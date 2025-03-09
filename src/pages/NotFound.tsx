
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <AppLayout>
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4 text-taaruf-blue">404</h1>
          <p className="text-xl text-gray-600 mb-6">Oops! Halaman tidak ditemukan</p>
          <Button asChild>
            <Link to="/dashboard">Kembali ke Beranda</Link>
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default NotFound;
