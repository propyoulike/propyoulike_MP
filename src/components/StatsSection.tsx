import { Card, CardContent } from '@/components/ui/card';
import { Users, Home, MapPin, Award } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      number: "50,000+",
      label: "Happy Customers",
      description: "Satisfied clients across India"
    },
    {
      icon: Home,
      number: "10,000+",
      label: "Properties Listed",
      description: "Premium properties available"
    },
    {
      icon: MapPin,
      number: "25+",
      label: "Cities Covered",
      description: "Major Indian metropolitan areas"
    },
    {
      icon: Award,
      number: "15+",
      label: "Years Experience",
      description: "Trusted real estate expertise"
    }
  ];

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Thousands Across India
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Our commitment to excellence has made us one of India's most trusted real estate platforms
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-white/10 border-white/20 text-center">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="p-3 bg-white/20 rounded-full">
                      <Icon className="h-8 w-8" />
                    </div>
                    <div className="space-y-2">
                      <div className="text-3xl font-bold">{stat.number}</div>
                      <div className="text-lg font-semibold">{stat.label}</div>
                      <div className="text-sm text-primary-foreground/80">
                        {stat.description}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;