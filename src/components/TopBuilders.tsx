import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const TopBuilders = () => {
  const builders = [
    {
      id: 1,
      name: "Prestige Group",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=120&fit=crop&crop=center",
      projects: 45,
      yearEstablished: 1986,
      description: "Leading real estate developer in South India with premium residential and commercial projects."
    },
    {
      id: 2,
      name: "Brigade Group",
      logo: "https://images.unsplash.com/photo-1560472355-536de3962603?w=120&h=120&fit=crop&crop=center",
      projects: 38,
      yearEstablished: 1995,
      description: "Trusted name in Bangalore real estate with innovative and sustainable development."
    },
    {
      id: 3,
      name: "Sobha Limited",
      logo: "https://images.unsplash.com/photo-1560472354-af33c92cd8cd?w=120&h=120&fit=crop&crop=center",
      projects: 52,
      yearEstablished: 1995,
      description: "Award-winning developer known for quality construction and timely delivery."
    },
    {
      id: 4,
      name: "Godrej Properties",
      logo: "https://images.unsplash.com/photo-1560472355-a9a6c8866ff2?w=120&h=120&fit=crop&crop=center",
      projects: 31,
      yearEstablished: 1990,
      description: "Part of the Godrej Group, delivering sustainable and innovative living spaces."
    },
    {
      id: 5,
      name: "Shriram Properties",
      logo: "https://images.unsplash.com/photo-1560472355-536de3962603?w=120&h=120&fit=crop&crop=center",
      projects: 29,
      yearEstablished: 2000,
      description: "Focused on affordable and mid-segment housing with excellent connectivity."
    },
    {
      id: 6,
      name: "Puravankara Limited",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=120&fit=crop&crop=center",
      projects: 26,
      yearEstablished: 1975,
      description: "Pioneer in Bangalore real estate with focus on quality and customer satisfaction."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Premier Builders
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Partner with Bangalore's most trusted developers who deliver excellence in every project
          </p>
        </div>

        {/* Builder Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {builders.map((builder) => (
            <Link 
              key={builder.id}
              to={`/builder/${builder.id}`}
              className="group relative flex flex-col items-center space-y-4 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-card"
            >
              <div className="relative">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border-2 border-border/30 group-hover:border-primary/50 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <img
                    src={builder.logo}
                    alt={builder.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-sm md:text-base group-hover:text-primary transition-colors duration-300">
                  {builder.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Since {builder.yearEstablished}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link to="/builders">
            <Button variant="outline" size="lg" className="bg-background/50 backdrop-blur-sm border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              Explore All Builders
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopBuilders;