import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Home, 
  Calculator, 
  FileText, 
  Shield, 
  PaintBucket, 
  Settings,
  CheckCircle,
  ArrowRight,
  Users,
  Award,
  Clock
} from 'lucide-react';

const Solutions = () => {
  const [activeService, setActiveService] = useState('home-loans');

  const services = [
    {
      id: 'home-loans',
      title: 'Home Loans',
      icon: Home,
      description: 'Get the best home loan deals with competitive interest rates and flexible EMI options.',
      features: ['Pre-approved loans up to ₹5 Crores', 'Interest rates starting from 8.5%', 'Minimal documentation', 'Quick approval in 24-48 hours'],
      benefits: 'Save up to ₹5 Lakhs on processing fees',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500'
    },
    {
      id: 'legal-services',
      title: 'Legal Services',
      icon: FileText,
      description: 'Complete legal assistance for property transactions, documentation, and compliance.',
      features: ['Property verification', 'Title deed clearance', 'Registration assistance', 'Legal documentation'],
      benefits: 'Hassle-free property transactions',
      color: 'text-green-500',
      bgColor: 'bg-green-500'
    },
    {
      id: 'interior-design',
      title: 'Interior Design',
      icon: PaintBucket,
      description: 'Transform your space with our expert interior design and home renovation services.',
      features: ['3D design visualization', 'Complete home makeover', 'Modular kitchen solutions', 'Custom furniture'],
      benefits: 'Up to 30% off on design packages',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500'
    },
    {
      id: 'property-management',
      title: 'Property Management',
      icon: Settings,
      description: 'End-to-end property management services for property owners and investors.',
      features: ['Tenant management', 'Rent collection', 'Property maintenance', 'Legal compliance'],
      benefits: 'Guaranteed rent collection',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500'
    },
    {
      id: 'valuation',
      title: 'Property Valuation',
      icon: Calculator,
      description: 'Professional property valuation services for accurate market pricing.',
      features: ['Market analysis', 'Comparative pricing', 'Investment assessment', 'Certified reports'],
      benefits: 'Free valuation for premium members',
      color: 'text-red-500',
      bgColor: 'bg-red-500'
    },
    {
      id: 'insurance',
      title: 'Property Insurance',
      icon: Shield,
      description: 'Protect your investment with comprehensive property insurance solutions.',
      features: ['Home insurance coverage', 'Natural disaster protection', 'Theft and burglary cover', 'Quick claim process'],
      benefits: 'Up to 25% discount on premiums',
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-500'
    }
  ];

  const currentService = services.find(s => s.id === activeService) || services[0];
  const ServiceIcon = currentService.icon;

  const stats = [
    { number: '10,000+', label: 'Happy Customers', icon: Users },
    { number: '5+', label: 'Years Experience', icon: Award },
    { number: '24/7', label: 'Support Available', icon: Clock }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Complete Real Estate Solutions
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                From property search to home loans, legal services to interior design - 
                we provide end-to-end solutions for all your real estate needs.
              </p>
              <Button size="lg" className="mr-4">
                Get Started
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg">
                Book Consultation
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => {
                const StatIcon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                      <StatIcon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="text-3xl font-bold mb-2">{stat.number}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive real estate solutions designed to make your property journey seamless and successful.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Service Tabs */}
              <div className="space-y-2">
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <button
                      key={service.id}
                      onClick={() => setActiveService(service.id)}
                      className={`w-full p-4 text-left rounded-lg border transition-all ${
                        activeService === service.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${service.bgColor} text-white`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{service.title}</h3>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Service Details */}
              <div className="lg:col-span-2">
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`p-3 rounded-lg ${currentService.bgColor} text-white`}>
                        <ServiceIcon className="h-8 w-8" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{currentService.title}</CardTitle>
                        <CardDescription className="text-lg">
                          {currentService.description}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary" className="w-fit">
                      {currentService.benefits}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold mb-4">Key Features:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                      {currentService.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className={`h-5 w-5 ${currentService.color}`} />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Separator className="mb-6" />
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                      <Button>
                        Get Started
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                      <Button variant="outline">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary-hover text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Contact our experts today and let us help you with your real estate needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" variant="secondary">
                Call Now: +91 9379822010
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Solutions;