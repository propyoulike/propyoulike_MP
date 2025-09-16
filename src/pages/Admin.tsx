import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BuilderManagement from '@/components/BuilderManagement';
import BuilderLandingPageEditor from '@/components/BuilderLandingPageEditor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Building, FileText, Settings, Users } from 'lucide-react';

const Admin = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-16">
          <div className="container mx-auto px-4 text-center">
            <Card className="max-w-md mx-auto">
              <CardContent className="p-8">
                <Settings className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h1 className="text-2xl font-bold mb-2">Admin Access Required</h1>
                <p className="text-muted-foreground mb-6">
                  Please log in to access the admin panel.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Admin Panel</h1>
            <p className="text-muted-foreground text-lg">
              Manage builders, create landing pages, and configure your platform.
            </p>
          </div>

          <Tabs defaultValue="builders" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="builders" className="flex items-center space-x-2">
                <Building className="h-4 w-4" />
                <span>Manage Builders</span>
              </TabsTrigger>
              <TabsTrigger value="landing-pages" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Landing Pages</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Users</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="builders">
              <BuilderManagement />
            </TabsContent>

            <TabsContent value="landing-pages">
              <BuilderLandingPageEditor />
            </TabsContent>

            <TabsContent value="users">
              <Card>
                <CardContent className="p-8 text-center">
                  <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">User Management</h3>
                  <p className="text-muted-foreground">
                    User management features will be available in a future update.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardContent className="p-8 text-center">
                  <Settings className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">System Settings</h3>
                  <p className="text-muted-foreground">
                    System configuration options will be available in a future update.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;