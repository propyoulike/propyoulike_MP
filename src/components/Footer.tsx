import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  MapPin,
  Phone,
  Mail,
  ArrowRight
} from 'lucide-react';

const Footer = () => {
  const cities = ['Bangalore']; //'Delhi', 'Chennai', 'Hyderabad', 'Pune', 'Ahmedabad', 'Mumbai', 'Kolkata'

  const quickLinks = [
    'Buy Properties', 'Home Loans']; // 'Rent Properties', 'Property Management', 'Property Valuation', 'Legal Services', 'Interior Design', 'Sell Properties'

  const propertyTypes = [
    'Apartments', 'Villas', 'Plots & Land']; // 'Commercial Properties', 'PG & Hostels', 'Office Spaces', 'Retail Shops', 'Warehouses'

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        {/* Newsletter Section */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold mb-4">Stay Updated with PropYoulike</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Get the latest property news, market insights, and exclusive deals delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
            <Input 
              placeholder="Enter your email address" 
              className="flex-1"
            />
            <Button className="bg-primary hover:bg-primary-hover">
              Subscribe
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        <Separator className="mb-12" />

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/9d86baa8-1b29-4411-81b8-02d3e4527617.png" 
                alt="PropYoulike" 
                className="h-8 w-auto"
              />
            </div>
            <p className="text-muted-foreground text-sm">
              Your trusted partner in real estate. Find and buy with ease across Bengaluru.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-2 text-primary" />
                Bangalore, Karnataka, India
              </div>
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-2 text-primary" />
                +91 9379822010
              </div>
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-2 text-primary" />
                hi@propyoulike.com
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h4 className="font-semibold mb-4">Property Types</h4>
            <ul className="space-y-2">
              {propertyTypes.map((type, index) => (
                <li key={index}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {type}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h4 className="font-semibold mb-4">Popular Cities</h4>
            <ul className="space-y-2">
              {cities.slice(0, 8).map((city, index) => (
                <li key={index}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {city} Properties
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2024 PropYoulike. All rights reserved. | Privacy Policy | Terms of Service
          </div>
          
          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">Follow us:</span>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;