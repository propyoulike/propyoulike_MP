import { useState } from 'react';
import PropertyCard from './PropertyCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import property1 from '@/assets/property-1.jpg';
import property2 from '@/assets/property-2.jpg';
import property3 from '@/assets/property-3.jpg';

const PropertyListings = () => {
  const [activeTab, setActiveTab] = useState('All');
  
  const tabs = [
    'All',
    'South Bangalore', 
    'Central Bangalore',
    'North Bangalore',
    'East Bangalore',
    'West Bangalore'
  ];

  const allProperties = [
    {
      id: 1,
      title: "Shriram Songs Of The Earth",
      location: "Madiwala, Bangalore",
      zone: "South Bangalore",
      price: "₹1.02 Cr to 1.50 Cr",
      image: property1,
      type: "Apartment",
      possession: "Dec 2025",
      configuration: "2, 3 BHK",
      area: "1200-1800 sq ft",
      developer: "Shriram Properties",
      isPromoted: true
    },
    {
      id: 2,
      title: "Provident Equinox 4",
      location: "Mysore Road, Bangalore",
      zone: "West Bangalore",
      price: "₹62.99 Lac to 74.99 Lac",
      originalPrice: "₹75 Lac",
      image: property2,
      type: "Apartment",
      possession: "Mar 2026",
      configuration: "2, 3 BHK",
      area: "1050-1500 sq ft",
      developer: "Provident Housing"
    },
    {
      id: 3,
      title: "Godrej MSR City",
      location: "Shelbgore, Bangalore",
      zone: "South Bangalore",
      price: "₹1.22 Cr to 1.80 Cr",
      image: property3,
      type: "Villa",
      possession: "Ready",
      configuration: "3, 4 BHK",
      area: "1800-2500 sq ft",
      developer: "Godrej Properties"
    },
    {
      id: 4,
      title: "Embassy Edge",
      location: "Devanahalli, Bangalore",
      zone: "North Bangalore",
      price: "₹60.95 Lac to 87.17 Lac",
      image: property1,
      type: "Apartment",
      possession: "Jun 2025",
      configuration: "1, 2 BHK",
      area: "800-1200 sq ft",
      developer: "Embassy Group",
      isPromoted: true
    },
    {
      id: 5,
      title: "Prestige Lakeside Habitat",
      location: "Varthur, Bangalore",
      zone: "East Bangalore",
      price: "₹85 Lakh - 1.2 Cr",
      image: property2,
      type: "Apartment",
      possession: "Dec 2024",
      configuration: "2, 3 BHK",
      area: "1200-1600 sq ft",
      developer: "Prestige Group"
    },
    {
      id: 6,
      title: "Brigade Cornerstone Utopia",
      location: "Whitefield, Bangalore",
      zone: "East Bangalore",
      price: "₹1.1 Cr to 1.8 Cr",
      image: property3,
      type: "Apartment",
      possession: "Dec 2025",
      configuration: "2, 3, 4 BHK",
      area: "1400-2200 sq ft",
      developer: "Brigade Group"
    },
    {
      id: 7,
      title: "Sobha Neopolis",
      location: "Panathur, Bangalore",
      zone: "East Bangalore",
      price: "₹72 Lakh - 1.05 Cr",
      image: property1,
      type: "Apartment",
      possession: "Mar 2025",
      configuration: "2, 3 BHK",
      area: "1180-1650 sq ft",
      developer: "Sobha Limited"
    },
    {
      id: 8,
      title: "Purva Atmosphere",
      location: "Thanisandra, Bangalore",
      zone: "North Bangalore",
      price: "₹95 Lakh - 1.45 Cr",
      image: property2,
      type: "Apartment",
      possession: "Jun 2026",
      configuration: "2, 3 BHK",
      area: "1250-1850 sq ft",
      developer: "Puravankara"
    }
  ];

  const properties = activeTab === 'All' 
    ? allProperties 
    : allProperties.filter(property => property.zone === activeTab);

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">
            Hot Selling Real Estate Projects in Bangalore
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Planning on a hot-selling home in Bangalore? Check out the properties that are being 
            snapped up the fastest! These projects offer great locations, strong builder reputations, 
            and unmatched lifestyle value.
          </p>
        </div>

        {/* Location Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "outline"}
              onClick={() => setActiveTab(tab)}
              className="rounded-full"
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center space-x-4">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex space-x-2">
            <Badge variant="default">1</Badge>
            <Badge variant="outline">2</Badge>
            <Badge variant="outline">3</Badge>
            <Badge variant="outline">4</Badge>
          </div>

          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* View More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            View All Properties
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PropertyListings;