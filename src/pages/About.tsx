import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StatsSection from '@/components/StatsSection';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Target, Award, Heart } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Users,
      title: "Customer First",
      description: "We prioritize our customers' needs and provide personalized service to help them find their perfect property."
    },
    {
      icon: Target,
      title: "Innovation",
      description: "We leverage cutting-edge technology to make property search, buying, and selling more efficient and transparent."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from property curation to customer service and market analysis."
    },
    {
      icon: Heart,
      title: "Trust & Integrity",
      description: "We build lasting relationships based on trust, transparency, and ethical business practices in all our dealings."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-hero-gradient text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About PropYoulike
            </h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              We're on a mission to revolutionize the Indian real estate market by making 
              property transactions transparent, efficient, and accessible to everyone.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Founded in 2009, PropYoulike began with a simple vision: to make real estate 
                    transactions in India more transparent and accessible. What started as a small 
                    team of real estate enthusiasts has grown into one of India's most trusted 
                    property platforms.
                  </p>
                  <p>
                    Over the years, we've helped thousands of families find their dream homes, 
                    assisted investors in making smart property decisions, and enabled property 
                    owners to get the best value for their investments.
                  </p>
                  <p>
                    Today, PropYoulike operates across 25+ major Indian cities, offering a 
                    comprehensive suite of real estate services including buying, selling, 
                    renting, property management, and financial services.
                  </p>
                </div>
                <Button className="mt-6" size="lg">
                  Join Our Journey
                </Button>
              </div>
              
              <div className="bg-card rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-center">Our Mission</h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  To democratize real estate by leveraging technology, data, and human expertise 
                  to create a seamless, transparent, and trustworthy platform where everyone can 
                  find, buy, sell, or rent properties with confidence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These core values guide everything we do and help us deliver exceptional 
                service to our customers and partners.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index} className="text-center">
                    <CardContent className="p-6">
                      <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                      <p className="text-muted-foreground text-sm">{value.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <StatsSection />

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Leadership Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Meet the experienced professionals leading PropYoulike's mission to 
                transform India's real estate landscape.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Rajesh Kumar", role: "Founder & CEO", experience: "15+ years in Real Estate" },
                { name: "Priya Sharma", role: "Chief Technology Officer", experience: "12+ years in PropTech" },
                { name: "Amit Patel", role: "Head of Operations", experience: "10+ years in Operations" }
              ].map((member, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4"></div>
                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-primary font-medium mb-2">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.experience}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;