import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface Favorite {
  id: string;
  property_id: string;
  property_title: string;
  property_image: string;
  property_price: string;
  property_location: string;
  created_at: string;
}

export const useFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchFavorites();
    } else {
      setFavorites([]);
      setLoading(false);
    }
  }, [user]);

  const fetchFavorites = async () => {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFavorites(data || []);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      toast({
        title: "Failed to load favorites",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (property: {
    id: string;
    title: string;
    image: string;
    price: string;
    location: string;
  }) => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to add favorites.",
        variant: "destructive",
      });
      return false;
    }

    try {
      const { error } = await supabase
        .from('favorites')
        .insert({
          user_id: user.id,
          property_id: property.id,
          property_title: property.title,
          property_image: property.image,
          property_price: property.price,
          property_location: property.location,
        });

      if (error) throw error;

      toast({
        title: "Added to favorites",
        description: `${property.title} has been added to your favorites.`,
      });

      fetchFavorites();
      return true;
    } catch (error: any) {
      if (error.code === '23505') {
        toast({
          title: "Already in favorites",
          description: "This property is already in your favorites.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Failed to add favorite",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
      return false;
    }
  };

  const removeFromFavorites = async (propertyId: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('property_id', propertyId);

      if (error) throw error;

      toast({
        title: "Removed from favorites",
        description: "Property has been removed from your favorites.",
      });

      fetchFavorites();
      return true;
    } catch (error) {
      toast({
        title: "Failed to remove favorite",
        description: "Please try again later.",
        variant: "destructive",
      });
      return false;
    }
  };

  const isFavorite = (propertyId: string) => {
    return favorites.some(fav => fav.property_id === propertyId);
  };

  return {
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    refetch: fetchFavorites,
  };
};