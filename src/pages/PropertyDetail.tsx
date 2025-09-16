import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, MapPin, Home, Calendar, Bed, Bath, Square,
  Phone, Mail, Share2, Camera, Play, Star, CheckCircle
} from 'lucide-react';
import EnquiryModal from '@/components/EnquiryModal';
import ShareModal from '@/components/ShareModal';

const PropertyDetail = () => {
  const { propertyId } = useParams();
  const [isFavorited, setIsFavorited] = useState(false);
  
  // Mock property data
  const property = {
    id: 1,
    title: "Prestige Lakeside Habitat",
    location: "Varthur, Bangalore",
    price: "₹85 Lakh - ₹1.2 Cr",
    originalPrice: "₹95 Lakh - ₹1.35 Cr",
    images: [
      "/src/assets/property-1.jpg",
      "/src/assets/property-2.jpg",
      "/src/assets/property-3.jpg"
    ],
    type: "Apartment",
    possession: "Dec 2024",
    configuration: "2,3 BHK",
    area: "1200-1800 sq ft",
    developer: "Prestige Group",
    status: "Under Construction",
    rating: 4.7,
    description: "Discover luxury living at Prestige Lakeside Habitat, where modern architecture meets serene lakeside views. This premium residential project offers thoughtfully designed apartments with world-class amenities.",
    amenities: [
      "Swimming Pool", "Gymnasium", "Clubhouse", "Children's Play Area",
      "Landscaped Gardens", "Security", "Power Backup", "Parking"
    ],
    specifications: {
      bedrooms: "2-3",
      bathrooms: "2-3",
      balconies: "1-2",
      facing: "East/West",
      flooring: "Vitrified Tiles",
      parking: "Covered"
    },
    floorPlans: [
      { type: "2 BHK", area: "1200 sq ft", price: "₹85 Lakh" },
      { type: "3 BHK", area: "1600 sq ft", price: "₹1.1 Cr" },
      { type: "3 BHK Premium", area: "1800 sq ft", price: "₹1.2 Cr" }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Property Gallery */}
          <div className="mb-8">
            <div className="relative">
              <img 
                src={property.images[0]} 
                alt={property.title}
                className="w-full h-[500px] object-cover rounded-lg"
              />
              <div className="absolute top-4 right-4 flex space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="bg-white/80 hover:bg-white"
                  onClick={() => setIsFavorited(!isFavorited)}
                >
                  <Heart className={`h-5 w-5 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <ShareModal
                  trigger={
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="bg-white/80 hover:bg-white"
                    >
                      <Share2 className="h-5 w-5" />
                    </Button>
                  }
                  title={property.title}
                />
              </div>
              <div className="absolute bottom-4 left-4 flex space-x-2">
                <Button variant="secondary" size="sm">
                  <Camera className="h-4 w-4 mr-2" />
                  View All Photos (15)
                </Button>
                <Button variant="secondary" size="sm">
                  <Play className="h-4 w-4 mr-2" />
                  Virtual Tour
                </Button>
              </div>
              {property.status && (
                <Badge className="absolute top-4 left-4">
                  {property.status}
                </Badge>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Property Header */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                <div className="flex items-center text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  {property.location}
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{property.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">By {property.developer}</span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-primary">{property.price}</span>
                  {property.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      {property.originalPrice}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {property.configuration} | {property.area}
                </p>
              </div>

              {/* Quick Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Bed className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="font-medium">{property.specifications.bedrooms}</p>
                  <p className="text-xs text-muted-foreground">Bedrooms</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Bath className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="font-medium">{property.specifications.bathrooms}</p>
                  <p className="text-xs text-muted-foreground">Bathrooms</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Square className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="font-medium">{property.area}</p>
                  <p className="text-xs text-muted-foreground">Carpet Area</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="font-medium">{property.possession}</p>
                  <p className="text-xs text-muted-foreground">Possession</p>
                </div>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="amenities">Amenities</TabsTrigger>
                  <TabsTrigger value="floorplans">Floor Plans</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4">About this Property</h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {property.description}
                      </p>
                      
                      <h4 className="font-semibold mb-3">Specifications</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(property.specifications).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-muted-foreground capitalize">{key}:</span>
                            <span className="font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="amenities" className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4">Amenities</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {property.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="floorplans" className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4">Available Floor Plans</h3>
                      <div className="space-y-4">
                        {property.floorPlans.map((plan, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <h4 className="font-medium">{plan.type}</h4>
                              <p className="text-sm text-muted-foreground">{plan.area}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-primary">{plan.price}</p>
                              <Button variant="outline" size="sm">View Plan</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="location" className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4">Location & Connectivity</h3>
                      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                        <span className="text-muted-foreground">Interactive Map View</span>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm"><strong>Distance to Airport:</strong> 25 km</p>
                        <p className="text-sm"><strong>Distance to Railway Station:</strong> 18 km</p>
                        <p className="text-sm"><strong>Distance to IT Hub:</strong> 5 km</p>
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
                  <h3 className="font-semibold mb-4">Contact Builder</h3>
                  <div className="space-y-3">
                    <Button 
                      className="w-full"
                      onClick={() => window.open('https://wa.me/919379822010?text=Hi, I am interested in ' + encodeURIComponent(property.title), '_blank')}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                    <EnquiryModal
                      trigger={
                        <Button variant="outline" className="w-full">
                          <Mail className="h-4 w-4 mr-2" />
                          Get Quote
                        </Button>
                      }
                      propertyTitle={property.title}
                    />
                    <EnquiryModal
                      trigger={
                        <Button variant="outline" className="w-full">
                          Schedule Site Visit
                        </Button>
                      }
                      propertyTitle={property.title}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">EMI Calculator</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Loan Amount</label>
                      <p className="text-2xl font-bold text-primary">₹75 Lakh</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Monthly EMI</label>
                      <p className="text-lg font-semibold">₹65,432</p>
                    </div>
                    <Button variant="outline" className="w-full" size="sm">
                      Calculate EMI
                    </Button>
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

export default PropertyDetail;