import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/hooks/useFavorites';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, MapPin, Home, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Favorites = () => {
  const { user } = useAuth();
  const { favorites, loading, removeFromFavorites } = useFavorites();

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">Please Sign In</h1>
            <p className="text-muted-foreground mb-6">
              You need to be signed in to view your favorites.
            </p>
            <Link to="/auth">
              <Button>Sign In</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading your favorites...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">My Favorites</h1>
            <p className="text-muted-foreground">
              {favorites.length} {favorites.length === 1 ? 'property' : 'properties'} saved
            </p>
          </div>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">No Favorites Yet</h2>
            <p className="text-muted-foreground mb-6">
              Start exploring properties and save your favorites to see them here.
            </p>
            <Link to="/">
              <Button>
                <Home className="mr-2 h-4 w-4" />
                Browse Properties
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((favorite) => (
              <Card key={favorite.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={favorite.property_image}
                    alt={favorite.property_title}
                    className="w-full h-48 object-cover"
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-3 right-3 bg-background/80 hover:bg-background"
                    onClick={() => removeFromFavorites(favorite.property_id)}
                  >
                    <Heart className="h-4 w-4 fill-current text-red-500" />
                  </Button>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {favorite.property_title}
                  </h3>
                  
                  <div className="flex items-center gap-1 text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{favorite.property_location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">
                      {favorite.property_price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Added {new Date(favorite.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Favorites;