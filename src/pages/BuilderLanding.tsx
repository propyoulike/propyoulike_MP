import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';

interface LandingPageData {
  id: string;
  page_title: string;
  hero_section: any;
  about_section: any;
  projects_section: any;
  contact_section: any;
  seo_meta: any;
  builder: {
    id: string;
    name: string;
    logo_url: string;
    rating: number;
    contact_phone: string;
    contact_email: string;
    contact_address: string;
    specialties: string[];
  };
}

const BuilderLanding = () => {
  const { pageSlug } = useParams();
  const [landingData, setLandingData] = useState<LandingPageData | null>(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pageSlug) {
      fetchLandingPageData();
    }
  }, [pageSlug]);

  const fetchLandingPageData = async () => {
    try {
      const { data, error } = await supabase
        .from('builder_landing_pages')
        .select(`
          *,
          builder:builders(
            id,
            name,
            logo_url,
            rating,
            contact_phone,
            contact_email,
            contact_address,
            specialties
          )
        `)
        .eq('page_slug', pageSlug)
        .eq('is_active', true)
        .single();

      if (error) throw error;

      setLandingData(data);

      // Fetch projects for this builder
      if (data.builder.id) {
        const { data: projectsData } = await supabase
          .from('builder_projects')
          .select('*')
          .eq('builder_id', data.builder.id)
          .limit(6);

        setProjects(projectsData || []);
      }

      // Set SEO meta tags
      if (data.seo_meta && typeof data.seo_meta === 'object' && (data.seo_meta as any).title) {
        document.title = (data.seo_meta as any).title;
      }
      
      if (data.seo_meta && typeof data.seo_meta === 'object' && (data.seo_meta as any).description) {
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', (data.seo_meta as any).description);
        } else {
          const meta = document.createElement('meta');
          meta.name = 'description';
          meta.content = (data.seo_meta as any).description;
          document.head.appendChild(meta);
        }
      }

    } catch (error) {
      console.error('Error fetching landing page:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!landingData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
            <p className="text-muted-foreground">The requested landing page could not be found.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { hero_section, about_section, projects_section, contact_section, builder } = landingData;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        {hero_section.background_image && (
          <img 
            src={hero_section.background_image} 
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl text-white">
              <div className="flex items-center space-x-4 mb-6">
                {builder.logo_url && (
                  <img
                    src={builder.logo_url}
                    alt={builder.name}
                    className="w-16 h-16 rounded-lg bg-white/10 backdrop-blur-sm p-2"
                  />
                )}
                <div>
                  <h1 className="text-5xl font-bold mb-2">
                    {hero_section.title || builder.name}
                  </h1>
                  {builder.rating && (
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg font-semibold">{builder.rating}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {hero_section.subtitle && (
                <p className="text-xl mb-8 opacity-90 max-w-2xl">
                  {hero_section.subtitle}
                </p>
              )}
              
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                {hero_section.cta_text || 'Explore Projects'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      {about_section.content && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">{about_section.title}</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {about_section.content}
              </p>
              
              {about_section.features && about_section.features.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {about_section.features.filter(f => f.trim()).map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-left">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              )}

              {builder.specialties && builder.specialties.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2">
                  {builder.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{projects_section.title}</h2>
              {projects_section.subtitle && (
                <p className="text-lg text-muted-foreground">{projects_section.subtitle}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project: any) => (
                <PropertyCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  location={project.location}
                  price={project.price_range}
                  image={project.image_url || '/src/assets/property-1.jpg'}
                  type={project.project_type}
                  possession={project.possession_date}
                  configuration={project.configuration}
                  area={project.area_range || '1200-1800 sq ft'}
                  developer={builder.name}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{contact_section.title}</h2>
            {contact_section.subtitle && (
              <p className="text-lg text-muted-foreground">{contact_section.subtitle}</p>
            )}
          </div>
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {contact_section.show_phone && builder.contact_phone && (
              <Card>
                <CardContent className="p-6 text-center">
                  <Phone className="h-8 w-8 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">Call Us</h3>
                  <p className="text-muted-foreground">{builder.contact_phone}</p>
                </CardContent>
              </Card>
            )}
            
            {contact_section.show_email && builder.contact_email && (
              <Card>
                <CardContent className="p-6 text-center">
                  <Mail className="h-8 w-8 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">Email Us</h3>
                  <p className="text-muted-foreground">{builder.contact_email}</p>
                </CardContent>
              </Card>
            )}
            
            {contact_section.show_address && builder.contact_address && (
              <Card>
                <CardContent className="p-6 text-center">
                  <MapPin className="h-8 w-8 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">Visit Us</h3>
                  <p className="text-muted-foreground">{builder.contact_address}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BuilderLanding;