import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  image: string;
  type: string;
  configuration?: string;
  developer?: string;
  isPromoted?: boolean;
  possession?: string;
}

interface NetflixWidgetProps {
  title: string;
  subtitle?: string;
  properties: Property[];
  category?: 'hot' | 'apartments' | 'villas' | 'plots';
}

const NetflixWidget: React.FC<NetflixWidgetProps> = ({ title, subtitle, properties, category }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const newScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollContainerRef.current.scrollTo({ left: newScroll, behavior: 'smooth' });
      
      // Update scroll button states
      setTimeout(() => {
        if (scrollContainerRef.current) {
          setCanScrollLeft(scrollContainerRef.current.scrollLeft > 0);
          setCanScrollRight(
            scrollContainerRef.current.scrollLeft < 
            scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth
          );
        }
      }, 300);
    }
  };

  const getCategoryColor = () => {
    switch (category) {
      case 'hot': return 'bg-gradient-to-r from-red-500 to-orange-500';
      case 'apartments': return 'bg-gradient-to-r from-blue-500 to-cyan-500';
      case 'villas': return 'bg-gradient-to-r from-green-500 to-emerald-500';
      case 'plots': return 'bg-gradient-to-r from-purple-500 to-pink-500';
      default: return 'bg-gradient-to-r from-primary to-primary-hover';
    }
  };

  return (
    <section className="py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="luxury-heading text-3xl md:text-4xl mb-2">{title}</h2>
            {subtitle && (
              <p className="luxury-subtitle text-muted-foreground text-lg">{subtitle}</p>
            )}
          </div>
          
          {/* Navigation Buttons */}
          <div className="hidden md:flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Properties Carousel */}
        <div className="relative group">
          <div
            ref={scrollContainerRef}
            className="flex space-x-4 overflow-x-auto netflix-scroll pb-4"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {properties.map((property, index) => (
              <Card
                key={property.id}
                className="flex-none w-72 md:w-80 group/card hover:scale-105 transition-all duration-300 cursor-pointer widget-card shadow-lg hover:shadow-xl"
                style={{ scrollSnapAlign: 'start' }}
              >
                <CardContent className="p-0 relative overflow-hidden">
                  {/* Image Container */}
                  <div className="relative h-44 overflow-hidden rounded-t-lg">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      {property.isPromoted && (
                        <Badge className={`${getCategoryColor()} text-white text-xs font-semibold px-2 py-1`}>
                          HOT
                        </Badge>
                      )}
                      <Badge variant="secondary" className="text-xs font-medium bg-black/30 text-white backdrop-blur-sm">
                        {property.type}
                      </Badge>
                    </div>

                    {/* Hover Actions */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                      <div className="flex space-x-3">
                        <Button size="icon" className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                          <Play className="h-5 w-5 text-white" />
                        </Button>
                        <Button size="icon" variant="ghost" className="w-12 h-12 rounded-full bg-black/20 hover:bg-black/30 backdrop-blur-sm">
                          <Info className="h-5 w-5 text-white" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg leading-tight group-hover/card:text-primary transition-colors">
                        {property.title}
                      </h3>
                      <p className="text-sm text-location-text mt-1">{property.location}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xl font-bold text-price-text">{property.price}</p>
                        {property.configuration && (
                          <p className="text-xs text-muted-foreground">{property.configuration}</p>
                        )}
                      </div>
                      {property.possession && (
                        <Badge variant="outline" className="text-xs">
                          {property.possession}
                        </Badge>
                      )}
                    </div>

                    {property.developer && (
                      <p className="text-xs text-muted-foreground border-t pt-2">
                        by {property.developer}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile Navigation Dots */}
          <div className="flex justify-center mt-4 md:hidden">
            <div className="flex space-x-2">
              {Array.from({ length: Math.ceil(properties.length / 2) }).map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 rounded-full bg-muted-foreground/30"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NetflixWidget;