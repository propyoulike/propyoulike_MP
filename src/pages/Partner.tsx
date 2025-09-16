import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Building, 
  Users, 
  TrendingUp, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  Handshake,
  Target,
  Award,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

const Partner = () => {
  const partnerTypes = [
    {
      title: 'Real Estate Developers',
      icon: Building,
      description: 'Partner with us to showcase your premium projects to qualified buyers.',
      benefits: ['Wider market reach', 'Qualified lead generation', 'Digital marketing support', 'Sales team assistance'],
      color: 'text-blue-500',
      bgColor: 'bg-blue-500'
    },
    {
      title: 'Property Agents',
      icon: Users,
      description: 'Join our network of trusted agents and grow your real estate business.',
      benefits: ['Access to exclusive listings', 'Lead management system', 'Training and certification', 'Higher commission rates'],
      color: 'text-green-500',
      bgColor: 'bg-green-500'
    },
    {
      title: 'Financial Partners',
      icon: TrendingUp,
      description: 'Banks and NBFCs can partner with us for home loan referrals.',
      benefits: ['Quality loan applications', 'Pre-verified customers', 'Digital integration', 'Reduced acquisition costs'],
      color: 'text-purple-500',
      bgColor: 'bg-purple-500'
    },
    {
      title: 'Service Providers',
      icon: Shield,
      description: 'Legal, interior design, and other real estate service providers.',
      benefits: ['Steady customer pipeline', 'Brand association', 'Marketing support', 'Preferred vendor status'],
      color: 'text-orange-500',
      bgColor: 'bg-orange-500'
    }
  ];

  const stats = [
    { number: '500+', label: 'Partner Network' },
    { number: '₹1000Cr+', label: 'Sales Facilitated' },
    { number: '25,000+', label: 'Happy Customers' },
    { number: '95%', label: 'Partner Satisfaction' }
  ];

  const benefits = [
    'Increased visibility and brand recognition',
    'Access to our qualified customer database',
    'Digital marketing and promotional support',
    'Dedicated relationship manager',
    'Performance-based incentives and bonuses',
    'Training and development programs',
    'Technology and tools support',
    'Regular business reviews and optimization'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
                <Handshake className="h-10 w-10 text-primary" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Partner with PropYoulike
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Join India's fastest-growing real estate platform and unlock new opportunities for your business. 
                Together, we can revolutionize the property experience.
              </p>
              <Button size="lg" className="mr-4">
                Become a Partner
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg">
                Download Partnership Brochure
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Partnership Impact</h2>
              <p className="text-muted-foreground">Numbers that speak for our growing partner ecosystem</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partner Types */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Partnership Opportunities</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We welcome various types of partners to join our ecosystem and grow together.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {partnerTypes.map((partner, index) => {
                const Icon = partner.icon;
                return (
                  <Card key={index} className="h-full">
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`p-3 rounded-lg ${partner.bgColor} text-white`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle>{partner.title}</CardTitle>
                          <CardDescription>{partner.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-semibold mb-3">Key Benefits:</h4>
                      <div className="space-y-2">
                        {partner.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <CheckCircle className={`h-4 w-4 ${partner.color}`} />
                            <span className="text-sm">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Why Partner with Us?</h2>
                <p className="text-muted-foreground mb-8">
                  Our partnership program is designed to help you grow your business while providing 
                  exceptional value to customers in the real estate ecosystem.
                </p>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Target className="h-6 w-6 text-primary" />
                      <CardTitle>Dedicated Support</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Get assigned a dedicated relationship manager who will help you maximize your partnership potential.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Award className="h-6 w-6 text-primary" />
                      <CardTitle>Performance Rewards</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Earn attractive incentives and bonuses based on your performance and contribution to our ecosystem.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Ready to Partner with Us?</h2>
                <p className="text-muted-foreground">
                  Fill out the form below and our partnership team will get in touch with you within 24 hours.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <Card>
                  <CardHeader>
                    <CardTitle>Partnership Inquiry</CardTitle>
                    <CardDescription>
                      Tell us about your business and how you'd like to partner with us.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="First Name" />
                      <Input placeholder="Last Name" />
                    </div>
                    <Input placeholder="Email Address" />
                    <Input placeholder="Phone Number" />
                    <Input placeholder="Company Name" />
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Partnership Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="developer">Real Estate Developer</SelectItem>
                        <SelectItem value="agent">Property Agent</SelectItem>
                        <SelectItem value="financial">Financial Partner</SelectItem>
                        <SelectItem value="service">Service Provider</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <Textarea 
                      placeholder="Tell us about your business and partnership goals..."
                      className="min-h-[100px]"
                    />
                    <Button className="w-full">
                      Submit Partnership Request
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Get in Touch</CardTitle>
                      <CardDescription>
                        Prefer to speak directly? Contact our partnership team.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Partnership Helpline</p>
                          <p className="text-sm text-muted-foreground">+91 9379822010</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Partnership Email</p>
                          <p className="text-sm text-muted-foreground">partners@propyoulike.com</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Office Address</p>
                          <p className="text-sm text-muted-foreground">Bangalore, Karnataka, India</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <Badge variant="secondary" className="mb-4">
                          Partnership Benefits
                        </Badge>
                        <h3 className="font-semibold mb-2">Fast Track Your Growth</h3>
                        <p className="text-sm text-muted-foreground">
                          Join our partner network and accelerate your business growth with our proven platform and support system.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Partner;