import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Clock, Home, Hammer, RefreshCw } from 'lucide-react';
import property1 from '@/assets/property-1.jpg';
import property2 from '@/assets/property-2.jpg';
import property3 from '@/assets/property-3.jpg';

const ProjectsByStageDetail = () => {
  const { stage } = useParams();
  const [searchTerm, setSearchTerm] = useState('');

  const stageConfig = {
    'eoi': {
      title: 'EOI Projects',
      description: 'Express your interest in upcoming premium projects with early bird pricing',
      icon: Clock,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500',
      benefits: ['Early Bird Pricing up to 15% off', 'Prime Location Selection', 'Limited Units Available', 'Flexible Payment Plans']
    },
    'ready-to-move': {
      title: 'Ready to Move Properties',
      description: 'Immediate possession available properties - move in right away',
      icon: Home,
      color: 'text-green-500',
      bgColor: 'bg-green-500',
      benefits: ['Immediate Possession', 'No Construction Delays', 'Completed Amenities', 'Ready Infrastructure']
    },
    'under-construction': {
      title: 'Under Construction Projects',
      description: 'Ongoing projects with attractive payment plans and construction updates',
      icon: Hammer,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500',
      benefits: ['Construction Linked Payment', 'Regular Progress Updates', 'Quality Monitoring', 'Pre-Launch Pricing']
    },
    'resale': {
      title: 'Resale Properties',
      description: 'Pre-owned properties from verified sellers in established communities',
      icon: RefreshCw,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500',
      benefits: ['Negotiable Pricing', 'Established Neighborhoods', 'Quick Registration', 'Immediate Deals']
    }
  };

  const currentStage = stageConfig[stage as keyof typeof stageConfig] || stageConfig['ready-to-move'];
  const IconComponent = currentStage.icon;

  // Sample properties - in real app, filter by stage
  const properties = Array.from({ length: 16 }, (_, index) => ({
    id: index + 1,
    title: `${currentStage.title.split(' ')[0]} Property ${index + 1}`,
    location: ["Whitefield", "Electronic City", "Marathahalli", "HSR Layout", "Indiranagar"][index % 5] + ", Bangalore",
    price: `₹${(45 + index * 8).toFixed(0)} Lac`,
    originalPrice: index % 3 === 0 ? `₹${(55 + index * 8).toFixed(0)} Lac` : undefined,
    image: [property1, property2, property3][index % 3],
    type: ["Apartment", "Villa", "Plot"][index % 3],
    possession: stage === 'ready-to-move' ? 'Ready' : 
                stage === 'under-construction' ? `${['Mar', 'Jun', 'Dec'][index % 3]} 202${5 + (index % 2)}` :
                stage === 'eoi' ? 'Pre-Launch' : 'Resale',
    configuration: ["1, 2 BHK", "2, 3 BHK", "3, 4 BHK"][index % 3],
    area: `${800 + index * 100}-${1200 + index * 150} sq ft`,
    developer: ["Prestige Group", "Brigade Group", "Sobha Limited", "Godrej Properties"][index % 4],
    isPromoted: index % 5 === 0
  }));

  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-3 rounded-lg ${currentStage.bgColor} text-white`}>
                <IconComponent className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">{currentStage.title}</h1>
                <p className="text-muted-foreground text-lg">
                  {currentStage.description}
                </p>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-card rounded-lg p-6 mb-8 shadow-sm">
            <h3 className="font-semibold mb-4">Why Choose {currentStage.title}?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentStage.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${currentStage.bgColor}`} />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-card rounded-lg p-6 mb-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end mb-4">
              <div className="md:col-span-2">
                <label className="text-sm font-medium mb-2 block">Search Properties</label>
                <div className="relative">
                  <Input 
                    placeholder="Search by project name or location..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
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
              <Badge variant="secondary">{currentStage.title}</Badge>
              <Badge variant="outline">Premium Projects</Badge>
              <Badge variant="outline">Verified Sellers</Badge>
              <Badge variant="outline">Best Deals</Badge>
            </div>
          </div>

          {/* Results Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-muted-foreground">
              Showing {filteredProperties.length} properties
            </div>
            
            <Select defaultValue="price">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price">Sort by Price</SelectItem>
                <SelectItem value="area">Sort by Area</SelectItem>
                <SelectItem value="date">Sort by Date</SelectItem>
                <SelectItem value="possession">Sort by Possession</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {filteredProperties.map((property) => (
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

export default ProjectsByStageDetail;