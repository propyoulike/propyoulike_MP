import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Star, MapPin, Building, Calendar, Award } from 'lucide-react';

const Builders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const builders = [
    {
      id: 1,
      name: "Prestige Group",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=120&fit=crop&crop=center",
      rating: 4.8,
      projects: 45,
      locations: 12,
      yearEstablished: 1986,
      totalArea: "50M+ sq ft",
      description: "Leading real estate developer in South India with premium residential and commercial projects. Known for quality construction and timely delivery.",
      specialties: ["Luxury Apartments", "Commercial Spaces", "Premium Villas"],
      awards: ["CREDAI Award 2023", "Best Developer South India"],
      featured: true
    },
    {
      id: 2,
      name: "Brigade Group",
      logo: "https://images.unsplash.com/photo-1560472355-536de3962603?w=120&h=120&fit=crop&crop=center",
      rating: 4.7,
      projects: 38,
      locations: 8,
      yearEstablished: 1995,
      totalArea: "35M+ sq ft",
      description: "Trusted name in Bangalore real estate with innovative and sustainable development practices.",
      specialties: ["Residential Communities", "IT Parks", "Mixed-Use Development"],
      awards: ["Green Building Award", "Innovation in Real Estate"],
      featured: true
    },
    {
      id: 3,
      name: "Sobha Limited",
      logo: "https://images.unsplash.com/photo-1560472354-af33c92cd8cd?w=120&h=120&fit=crop&crop=center",
      rating: 4.9,
      projects: 52,
      locations: 15,
      yearEstablished: 1995,
      totalArea: "60M+ sq ft",
      description: "Award-winning developer known for quality construction, innovative design, and timely delivery across multiple cities.",
      specialties: ["Premium Apartments", "Luxury Villas", "Plotted Development"],
      awards: ["FIABCI Award", "Best Quality Construction"],
      featured: true
    },
    {
      id: 4,
      name: "Godrej Properties",
      logo: "https://images.unsplash.com/photo-1560472355-a9a6c8866ff2?w=120&h=120&fit=crop&crop=center",
      rating: 4.6,
      projects: 31,
      locations: 9,
      yearEstablished: 1990,
      totalArea: "25M+ sq ft",
      description: "Part of the Godrej Group, delivering sustainable and innovative living spaces with focus on green building practices.",
      specialties: ["Sustainable Living", "Affordable Housing", "Smart Homes"],
      awards: ["Sustainability Award", "IGBC Green Champion"],
      featured: false
    },
    {
      id: 5,
      name: "Shriram Properties",
      logo: "https://images.unsplash.com/photo-1560472355-536de3962603?w=120&h=120&fit=crop&crop=center",
      rating: 4.5,
      projects: 29,
      locations: 7,
      yearEstablished: 2000,
      totalArea: "20M+ sq ft",
      description: "Focused on affordable and mid-segment housing with excellent connectivity and value-for-money propositions.",
      specialties: ["Affordable Housing", "Mid-Segment Homes", "Value Housing"],
      awards: ["Best Value Developer", "Customer Choice Award"],
      featured: false
    },
    {
      id: 6,
      name: "Puravankara Limited",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=120&fit=crop&crop=center",
      rating: 4.4,
      projects: 26,
      locations: 6,
      yearEstablished: 1975,
      totalArea: "18M+ sq ft",
      description: "Pioneer in Bangalore real estate with focus on quality construction and customer satisfaction for over four decades.",
      specialties: ["Premium Residentials", "Luxury Apartments", "Gated Communities"],
      awards: ["Heritage Developer Award", "Excellence in Construction"],
      featured: false
    }
  ];

  const filteredBuilders = builders.filter(builder =>
    builder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    builder.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Top Builders in Bangalore</h1>
            <p className="text-muted-foreground text-lg max-w-3xl">
              Discover Bangalore's most trusted and experienced real estate developers. Each builder 
              has been carefully evaluated based on their track record, quality standards, and customer satisfaction.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-card rounded-lg p-6 mb-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-4">
              <div className="md:col-span-2">
                <label className="text-sm font-medium mb-2 block">Search Builders</label>
                <div className="relative">
                  <Input 
                    placeholder="Search by builder name or expertise..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Experience</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All Experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10+">10+ Years</SelectItem>
                    <SelectItem value="20+">20+ Years</SelectItem>
                    <SelectItem value="30+">30+ Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>More Filters</span>
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Featured Builders</Badge>
              <Badge variant="outline">Award Winners</Badge>
              <Badge variant="outline">Premium Developers</Badge>
              <Badge variant="outline">Sustainable Building</Badge>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredBuilders.length} of {builders.length} builders
            </p>
          </div>

          {/* Builders Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {filteredBuilders.map((builder) => (
              <Card key={builder.id} className={`relative overflow-hidden hover:shadow-lg transition-all ${
                builder.featured ? 'ring-2 ring-primary/20' : ''
              }`}>
                {builder.featured && (
                  <Badge className="absolute top-4 right-4 z-10">Featured</Badge>
                )}
                
                <CardContent className="p-6">
                  {/* Builder Header */}
                  <div className="flex items-start space-x-4 mb-6">
                    <img
                      src={builder.logo}
                      alt={builder.name}
                      className="w-20 h-20 rounded-lg object-cover border-2 border-border"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-xl mb-2">{builder.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Est. {builder.yearEstablished}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{builder.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {builder.description}
                      </p>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Building className="h-4 w-4 text-primary" />
                        <span className="font-semibold">{builder.projects}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Projects</p>
                    </div>
                    
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="font-semibold">{builder.locations}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Cities</p>
                    </div>

                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <span className="font-semibold text-sm">{builder.totalArea}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Delivered</p>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="mb-4">
                    <h4 className="font-medium mb-2 text-sm">Specialties</h4>
                    <div className="flex flex-wrap gap-1">
                      {builder.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Awards */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-2 text-sm flex items-center space-x-1">
                      <Award className="h-4 w-4" />
                      <span>Recent Awards</span>
                    </h4>
                    <div className="space-y-1">
                      {builder.awards.map((award, index) => (
                        <p key={index} className="text-xs text-muted-foreground flex items-center space-x-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span>{award}</span>
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1" size="sm">
                      View All Projects
                    </Button>
                    <Button className="flex-1" size="sm">
                      Contact Builder
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center">
            <Button variant="outline" size="lg">
              Load More Builders
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Builders;