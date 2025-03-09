
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import TaarufRequests from "./pages/TaarufRequests";
import TaarufProcess from "./pages/TaarufProcess";
import Dashboard from "./pages/Dashboard";
import Gallery from "./pages/Gallery";
import MarriageProcess from "./pages/MarriageProcess";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./components/common/PlaceholderPage";
import ProfileDetail from "./pages/ProfileDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          
          {/* Protected routes with sidebar */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/profile/:id" element={
            <ProtectedRoute>
              <ProfileDetail />
            </ProtectedRoute>
          } />
          <Route path="/search" element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          } />
          <Route path="/taaruf-requests" element={
            <ProtectedRoute>
              <TaarufRequests />
            </ProtectedRoute>
          } />
          <Route path="/taaruf-process" element={
            <ProtectedRoute>
              <TaarufProcess />
            </ProtectedRoute>
          } />
          <Route path="/gallery" element={
            <ProtectedRoute>
              <Gallery />
            </ProtectedRoute>
          } />
          <Route path="/marriage-process" element={
            <ProtectedRoute>
              <MarriageProcess />
            </ProtectedRoute>
          } />
          
          {/* Placeholder routes for new menu items */}
          <Route path="/approvals" element={
            <ProtectedRoute>
              <PlaceholderPage title="Persetujuan & Murobbi" />
            </ProtectedRoute>
          } />
          <Route path="/meetings" element={
            <ProtectedRoute>
              <PlaceholderPage title="Jadwal Pertemuan" description="Fitur pengaturan jadwal taaruf offline/online dengan notifikasi & pengingat akan segera hadir." />
            </ProtectedRoute>
          } />
          <Route path="/articles" element={
            <ProtectedRoute>
              <PlaceholderPage title="Artikel & Edukasi" description="Artikel seputar taaruf syar'i dan video kajian & nasihat pernikahan akan segera hadir." />
            </ProtectedRoute>
          } />
          <Route path="/success-stories" element={
            <ProtectedRoute>
              <PlaceholderPage title="Kisah Sukses" description="Testimoni pengguna yang berhasil menikah dan cerita pengalaman taaruf akan segera hadir." />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <PlaceholderPage title="Pengaturan" description="Pengaturan keamanan akun, notifikasi, dan bahasa akan segera hadir." />
            </ProtectedRoute>
          } />
          <Route path="/help" element={
            <ProtectedRoute>
              <PlaceholderPage title="Bantuan & FAQ" description="Panduan penggunaan aplikasi dan kontak admin akan segera hadir." />
            </ProtectedRoute>
          } />
          
          {/* Admin routes */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <PlaceholderPage title="Admin Dashboard" description="Ringkasan statistik pengguna, grafik jumlah permintaan taaruf, dan status keanggotaan akan segera hadir." />
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute>
              <PlaceholderPage title="Manajemen Pengguna" />
            </ProtectedRoute>
          } />
          <Route path="/admin/taaruf" element={
            <ProtectedRoute>
              <PlaceholderPage title="Manajemen Ta'aruf" />
            </ProtectedRoute>
          } />
          <Route path="/admin/content" element={
            <ProtectedRoute>
              <PlaceholderPage title="Manajemen Konten" />
            </ProtectedRoute>
          } />
          <Route path="/admin/communications" element={
            <ProtectedRoute>
              <PlaceholderPage title="Manajemen Komunikasi" />
            </ProtectedRoute>
          } />
          <Route path="/admin/events" element={
            <ProtectedRoute>
              <PlaceholderPage title="Jadwal & Acara" />
            </ProtectedRoute>
          } />
          <Route path="/admin/finance" element={
            <ProtectedRoute>
              <PlaceholderPage title="Pengelolaan Keuangan" />
            </ProtectedRoute>
          } />
          <Route path="/admin/settings" element={
            <ProtectedRoute>
              <PlaceholderPage title="Pengaturan Sistem" />
            </ProtectedRoute>
          } />
          <Route path="/admin/reports" element={
            <ProtectedRoute>
              <PlaceholderPage title="Laporan & Analitik" />
            </ProtectedRoute>
          } />
          <Route path="/admin/logs" element={
            <ProtectedRoute>
              <PlaceholderPage title="Log Aktivitas & Audit" />
            </ProtectedRoute>
          } />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
