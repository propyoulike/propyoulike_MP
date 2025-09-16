import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  CreditCard, 
  Scale, 
  Calculator, 
  PaintBucket, 
  Shield,
  ArrowRight 
} from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: CreditCard,
      title: "Home Loans",
      description: "Get the best home loan deals with competitive interest rates",
      features: ["Pre-approved Loans", "Quick Processing", "Low Interest"],
      color: "text-success"
    },
    {
      icon: Scale,
      title: "Legal Services",
      description: "Expert legal assistance for all your property transactions",
      features: ["Document Verification", "Legal Clearance", "Registration"],
      color: "text-secondary"
    },
    {
      icon: PaintBucket,
      title: "Interior Design",
      description: "Transform your space with our interior design services",
      features: ["3D Design", "Furniture Selection", "Complete Makeover"],
      color: "text-success"
    },
  ];

{/*    {
      icon: Home,
      title: "Property Management",
      description: "Complete property management solutions for landlords and tenants",
      features: ["Tenant Screening", "Rent Collection", "Maintenance"],
      color: "text-primary"
    },
    {
      icon: Calculator,
      title: "Property Valuation",
      description: "Accurate property valuation by certified professionals",
      features: ["Market Analysis", "Price Estimation", "Investment Advice"],
      color: "text-primary"
    },
    {
      icon: Shield,
      title: "Property Insurance",
      description: "Protect your investment with comprehensive insurance coverage",
      features: ["Home Insurance", "Tenant Insurance", "Claims Support"],
      color: "text-secondary"
    } */}


  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Complete Real Estate Solutions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From finding your dream property to managing it, we provide end-to-end 
            real estate services to make your journey seamless.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-muted ${service.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-semibold">{service.title}</h3>
                    </div>
                    
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm">
                          <div className="w-1.5 h-1.5 bg-success rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      variant="ghost" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      asChild
                    >
                      <a href="/solutions">
                        Learn More
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-primary hover:bg-primary-hover" asChild>
            <a href="/solutions">
              Explore All Services
              <ArrowRight className="h-4 w-4 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;