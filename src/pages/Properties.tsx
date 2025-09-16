import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Grid, List } from 'lucide-react';
import property1 from '@/assets/property-1.jpg';
import property2 from '@/assets/property-2.jpg';
import property3 from '@/assets/property-3.jpg';

const Properties = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchParams] = useSearchParams();
  const typeFilter = searchParams.get('type');
  
  const allProperties = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    title: `Premium Property ${index + 1}`,
    location: "Bangalore, Karnataka",
    price: `₹${(50 + index * 10).toFixed(0)} Lac`,
    image: [property1, property2, property3][index % 3],
    type: ["Apartment", "Villa", "Plot"][index % 3],
    possession: ["Ready", "Under Construction", "New Launch"][index % 3],
    configuration: ["2 BHK", "3 BHK", "4 BHK"][index % 3],
    area: `${1000 + index * 100} sq ft`,
    developer: ["Prestige Group", "Brigade Group", "Sobha Limited"][index % 3],
    isPromoted: index % 4 === 0
  }));

  // Filter properties based on URL parameter
  const properties = typeFilter 
    ? allProperties.filter(property => property.type.toLowerCase() === typeFilter.toLowerCase())
    : allProperties;

  // Get page title based on filter
  const getPageTitle = () => {
    if (typeFilter) {
      const capitalizedType = typeFilter.charAt(0).toUpperCase() + typeFilter.slice(1) + 's';
      return `${capitalizedType} in Bangalore`;
    }
    return 'Properties in Bangalore';
  };

  const getPageDescription = () => {
    if (typeFilter) {
      const capitalizedType = typeFilter.charAt(0).toUpperCase() + typeFilter.slice(1).toLowerCase() + 's';
      return `Discover ${properties.length} premium ${capitalizedType.toLowerCase()} available for purchase`;
    }
    return `Discover ${properties.length} premium properties available for purchase`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{getPageTitle()}</h1>
            <p className="text-muted-foreground">
              {getPageDescription()}
            </p>
          </div>

          {/* Filters Section */}
          <div className="bg-card rounded-lg p-6 mb-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end mb-4">
              <div className="md:col-span-2">
                <label className="text-sm font-medium mb-2 block">Search Properties</label>
                <div className="relative">
                  <Input placeholder="Search by location, project name..." />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Property Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="plot">Plot</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Budget</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All Budgets" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-50">Under ₹50 Lac</SelectItem>
                    <SelectItem value="50-100">₹50-100 Lac</SelectItem>
                    <SelectItem value="100+">Above ₹100 Lac</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Ready to Move</Badge>
              <Badge variant="outline">2-3 BHK</Badge>
              <Badge variant="outline">South Bangalore</Badge>
              <Badge variant="outline">Premium Projects</Badge>
            </div>
          </div>

          {/* Results Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-muted-foreground">
              Showing {properties.length} properties
            </div>
            
            <div className="flex items-center space-x-4">
              <Select defaultValue="price">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price">Sort by Price</SelectItem>
                  <SelectItem value="area">Sort by Area</SelectItem>
                  <SelectItem value="date">Sort by Date</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Properties Grid */}
          <div className={`grid gap-6 mb-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {properties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              <Button variant="outline">Previous</Button>
              <Badge variant="default">1</Badge>
              <Badge variant="outline">2</Badge>
              <Badge variant="outline">3</Badge>
              <Badge variant="outline">4</Badge>
              <Button variant="outline">Next</Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Properties;