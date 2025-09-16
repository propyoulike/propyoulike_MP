import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Star, MapPin, Building, Calendar, Award, Phone, Mail, 
  Globe, Users, Trophy, CheckCircle 
} from 'lucide-react';

const BuilderDetail = () => {
  const { builderId } = useParams();
  
  // Mock builder data - in real app this would come from API
  const builder = {
    id: 1,
    name: "Prestige Group",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop&crop=center",
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=400&fit=crop",
    rating: 4.8,
    projects: 45,
    locations: 12,
    yearEstablished: 1986,
    totalArea: "50M+ sq ft",
    employees: "5000+",
    description: "Prestige Group is one of South India's leading real estate developers with over 35 years of experience in creating landmark residential and commercial projects. Known for quality construction, innovative design, and timely delivery.",
    mission: "To create world-class living and working spaces that enhance the quality of life for our customers while contributing to the development of sustainable communities.",
    specialties: ["Luxury Apartments", "Commercial Spaces", "Premium Villas", "Integrated Townships"],
    awards: [
      "CREDAI Award 2023 - Best Developer",
      "FIABCI Prix d'Excellence Award",
      "CNN-IBN Indian of the Year Award",
      "Best Developer South India 2022"
    ],
    certifications: ["ISO 9001:2015", "ISO 14001:2015", "OHSAS 18001:2007"],
    contact: {
      phone: "+91-80-4337-4337",
      email: "info@prestigeconstructions.com",
      website: "www.prestigeconstructions.com",
      address: "Prestige Meridian I & II, 29, MG Road, Bangalore - 560001"
    },
    featured: true
  };

  const projects = [
    {
      id: 1,
      title: "Prestige Lakeside Habitat",
      location: "Varthur, Bangalore",
      price: "₹85 Lakh - ₹1.2 Cr",
      image: "/src/assets/property-1.jpg",
      type: "Apartment",
      possession: "Dec 2024",
      configuration: "2,3 BHK",
      area: "1200-1800 sq ft",
      developer: "Prestige Group",
      status: "Under Construction"
    },
    {
      id: 2,
      title: "Prestige High Fields",
      location: "Gachibowli, Hyderabad",
      price: "₹95 Lakh - ₹1.8 Cr",
      originalPrice: "₹1.1 Cr - ₹2.0 Cr",
      image: "/src/assets/property-2.jpg",
      type: "Villa",
      possession: "Ready to Move",
      configuration: "3,4 BHK",
      area: "1800-2500 sq ft",
      developer: "Prestige Group",
      isPromoted: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <div className="relative h-[400px] overflow-hidden">
          <img 
            src={builder.heroImage} 
            alt={builder.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="flex items-center space-x-6 text-white">
                <img
                  src={builder.logo}
                  alt={builder.name}
                  className="w-24 h-24 rounded-lg border-4 border-white/20 bg-white/10 backdrop-blur-sm p-2"
                />
                <div>
                  <h1 className="text-4xl font-bold mb-2">{builder.name}</h1>
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="flex items-center space-x-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg font-semibold">{builder.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-5 w-5" />
                      <span>Established {builder.yearEstablished}</span>
                    </div>
                  </div>
                  <p className="text-lg opacity-90 max-w-2xl">
                    {builder.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="border-b border-border">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <Building className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold">{builder.projects}</span>
                </div>
                <p className="text-sm text-muted-foreground">Projects Completed</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold">{builder.locations}</span>
                </div>
                <p className="text-sm text-muted-foreground">Cities</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold">{builder.employees}</span>
                </div>
                <p className="text-sm text-muted-foreground">Employees</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <Trophy className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold">{builder.totalArea}</span>
                </div>
                <p className="text-sm text-muted-foreground">Area Delivered</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="awards">Awards</TabsTrigger>
                  <TabsTrigger value="contact">Contact</TabsTrigger>
                </TabsList>
                
                <TabsContent value="about" className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4">About {builder.name}</h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {builder.description}
                      </p>
                      
                      <h4 className="font-semibold mb-3">Mission</h4>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {builder.mission}
                      </p>

                      <h4 className="font-semibold mb-3">Specialties</h4>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {builder.specialties.map((specialty, index) => (
                          <Badge key={index} variant="secondary">
                            {specialty}
                          </Badge>
                        ))}
                      </div>

                      <h4 className="font-semibold mb-3">Certifications</h4>
                      <div className="space-y-2">
                        {builder.certifications.map((cert, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">{cert}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="projects" className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Current Projects</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {projects.map((project) => (
                        <PropertyCard key={project.id} {...project} />
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="awards" className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                        <Award className="h-5 w-5 text-primary" />
                        <span>Awards & Recognition</span>
                      </h3>
                      <div className="space-y-4">
                        {builder.awards.map((award, index) => (
                          <div key={index} className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg">
                            <Trophy className="h-5 w-5 text-yellow-500 mt-0.5" />
                            <span>{award}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="contact" className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <Phone className="h-5 w-5 text-primary" />
                          <span>{builder.contact.phone}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-primary" />
                          <span>{builder.contact.email}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Globe className="h-5 w-5 text-primary" />
                          <span>{builder.contact.website}</span>
                        </div>
                        <div className="flex items-start space-x-3">
                          <MapPin className="h-5 w-5 text-primary mt-0.5" />
                          <span>{builder.contact.address}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Quick Contact</h3>
                  <div className="space-y-3">
                    <Button className="w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Enquiry
                    </Button>
                    <Button variant="outline" className="w-full">
                      View All Projects
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Builder Highlights</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Experience</span>
                      <span className="font-medium">{new Date().getFullYear() - builder.yearEstablished}+ Years</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Rating</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{builder.rating}/5</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Active Projects</span>
                      <span className="font-medium">{builder.projects}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BuilderDetail;