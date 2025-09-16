import { Link } from 'react-router-dom';
import { Building2, Home, TreePine } from 'lucide-react';

const PropertyTypes = () => {
  const propertyTypes = [
    {
      id: 'apartments',
      title: 'Apartments',
      description: 'Modern living spaces with premium amenities',
      icon: Building2,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop&crop=center',
      link: '/properties?type=apartment'
    },
    {
      id: 'villas',
      title: 'Villas',
      description: 'Luxury independent homes with private gardens',
      icon: Home,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop&crop=center',
      link: '/properties?type=villa'
    },
    {
      id: 'plots',
      title: 'Plots',
      description: 'Premium land parcels for your dream home',
      icon: TreePine,
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop&crop=center',
      link: '/properties?type=plot'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Explore Property Types
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover the perfect property type that matches your lifestyle and investment goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {propertyTypes.map((type) => (
            <Link
              key={type.id}
              to={type.link}
              className="group relative overflow-hidden rounded-2xl bg-card shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={type.image}
                  alt={type.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                    <type.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold">{type.title}</h3>
                </div>
                <p className="text-white/90 text-sm">{type.description}</p>
              </div>

              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground text-sm">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyTypes;