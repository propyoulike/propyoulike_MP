export interface Builder {
  id: string;
  name: string;
  slug: string;
  description: string;
  mission: string;
  yearEstablished: number;
  contactPhone: string;
  contactEmail: string;
  contactWebsite: string;
  contactAddress: string;
  logoUrl: string;
  heroImageUrl: string;
  specialties: string[];
  awards: string[];
  certifications: string[];
  isActive: boolean;
  createdAt: Date;
}

export interface Project {
  id: string;
  builderId: string;
  name: string;
  slug: string;
  description: string;
  location: string;
  priceRange: string;
  propertyType: 'apartment' | 'villa' | 'plot' | 'commercial';
  status: 'planning' | 'construction' | 'completed';
  amenities: string[];
  specifications: string[];
  images: string[];
  floorPlans: string[];
  brochureUrl: string;
  totalUnits: number;
  availableUnits: number;
  completionDate: Date;
  isActive: boolean;
  createdAt: Date;
}

export interface BuilderTemplate {
  id: string;
  name: string;
  description: string;
  heroSection: {
    title: string;
    subtitle: string;
    backgroundImage: string;
    ctaText: string;
  };
  aboutSection: {
    title: string;
    content: string;
    features: string[];
  };
  contactSection: {
    title: string;
    subtitle: string;
    showContactForm: boolean;
    showPhone: boolean;
    showEmail: boolean;
    showAddress: boolean;
  };
}

export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  propertyType: 'apartment' | 'villa' | 'plot' | 'commercial';
  defaultAmenities: string[];
  defaultSpecifications: string[];
  layoutSections: {
    heroSection: boolean;
    featuresSection: boolean;
    amenitiesSection: boolean;
    locationSection: boolean;
    floorPlansSection: boolean;
    priceSection: boolean;
    gallerySection: boolean;
    contactSection: boolean;
  };
}