import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Mic } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import heroBg from '@/assets/hero-bg.jpg';

const HeroSection = () => {
  const [searchValue, setSearchValue] = useState('');

  const propertyTypes = [
    { id: 'buy', label: 'Buy', icon: '🏠' },
    { id: 'rental', label: 'Rental', icon: '🔑' },
    { id: 'projects', label: 'Projects', icon: '🏗️' },
    { id: 'pg', label: 'PG / Hostels', icon: '🏨' },
    { id: 'land', label: 'Plot & Land', icon: '🌳' },
    { id: 'commercial', label: 'Commercial', icon: '🏢' },
    { id: 'agents', label: 'Agents', icon: '👥' },
  ];

  const [activeType, setActiveType] = useState('buy');

  return (
    <section 
      className="relative min-h-[600px] flex items-center justify-center bg-hero-gradient"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(37, 99, 235, 0.9) 100%), url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Bangalore
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Real Estate Made Real Easy
            </h2>
            <p className="text-xl mb-8 opacity-90">
              We've got you covered! From finding the perfect property to{' '}
              <span className="font-semibold">Transactions</span>
            </p>
          </div>

          {/* Property Type Tabs */}
{/*          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {propertyTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  activeType === type.id
                    ? 'bg-white text-primary shadow-lg'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <span>{type.icon}</span>
                <span className="font-medium">{type.label}</span>
              </button>
            ))}
          </div>
*/}

          {/* Search Form */}
          <div className="bg-white rounded-2xl p-6 shadow-xl max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Location</label>
                <Select defaultValue="bangalore">
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="East Bangalore">East Bangalore</SelectItem>
                    <SelectItem value="West Bangalore">West Bangalore</SelectItem>
                    <SelectItem value="South Bangalore">South Bangalore</SelectItem>
                    <SelectItem value="North Bangalore">North Bangalore</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Search */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-gray-600">
                  Search by Project, Locality, or Builder
                </label>
                <div className="relative">
                  <Input
                    placeholder="Search properties..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="pr-20"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MapPin className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Mic className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <div className="space-y-2">
                <div className="h-5"></div>
                <Button className="w-full h-11 bg-success hover:bg-success/90 text-white">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t">
              <Select>
                <SelectTrigger className="w-auto min-w-32">
                  <SelectValue placeholder="Budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="20-40">₹20L - ₹40L</SelectItem>
                  <SelectItem value="40-60">₹40L - ₹60L</SelectItem>
                  <SelectItem value="60-80">₹60L - ₹80L</SelectItem>
                  <SelectItem value="80+">₹80L+</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-auto min-w-40">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="plot">Plot</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-auto min-w-44">
                  <SelectValue placeholder="Possession Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ready">Ready to Move</SelectItem>
                  <SelectItem value="construction">Under Construction</SelectItem>
                  <SelectItem value="new-launch">New Launch</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
              Search by 🚇 Commute Time
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
              Search by 🚇 Metro Station
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;