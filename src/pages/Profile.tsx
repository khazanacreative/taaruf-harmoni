
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CVForm from '@/components/profile/CVForm';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Profile = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Profil Saya</h1>
            <p className="text-sm text-foreground/70 mt-2">
              Lengkapi profil dan CV ta'aruf Anda
            </p>
          </div>
          
          <Tabs defaultValue="cv" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="cv">Biodata / CV</TabsTrigger>
              <TabsTrigger value="pengaturan">Pengaturan Akun</TabsTrigger>
            </TabsList>
            
            <TabsContent value="cv" className="mt-6">
              <div className="glass-card p-6 rounded-xl">
                <CVForm />
              </div>
            </TabsContent>
            
            <TabsContent value="pengaturan" className="mt-6">
              <div className="glass-card p-6 rounded-xl space-y-4">
                <h3 className="text-lg font-medium">Pengaturan Akun</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input 
                      type="email" 
                      className="w-full p-2 border border-border rounded-md"
                      value="contoh@email.com" 
                      disabled
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Kata Sandi</label>
                    <Button variant="outline" size="sm">Ubah Kata Sandi</Button>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Notifikasi</label>
                    <div className="flex items-center">
                      <input type="checkbox" id="notifications" className="mr-2" />
                      <label htmlFor="notifications">Aktifkan notifikasi email</label>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4">Simpan Perubahan</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
