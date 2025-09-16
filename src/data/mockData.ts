import { Builder, Project, BuilderTemplate, ProjectTemplate } from '@/types/builder';

export const mockBuilders: Builder[] = [
  {
    id: '1',
    name: 'Premium Homes',
    slug: 'premium-homes',
    description: 'Leading real estate developer with 20+ years of experience in luxury residential projects.',
    mission: 'To create exceptional living spaces that inspire and elevate lifestyles.',
    yearEstablished: 2003,
    contactPhone: '+91 98765 43210',
    contactEmail: 'info@premiumhomes.com',
    contactWebsite: 'https://premiumhomes.com',
    contactAddress: 'Brigade Road, Bangalore - 560001',
    logoUrl: '/api/placeholder/200/80',
    heroImageUrl: '/api/placeholder/1200/600',
    specialties: ['Luxury Apartments', 'Premium Villas', 'Commercial Spaces'],
    awards: ['Best Developer 2023', 'Excellence in Construction'],
    certifications: ['ISO 9001:2015', 'Green Building Certified'],
    isActive: true,
    createdAt: new Date('2023-01-01')
  },
  {
    id: '2',
    name: 'Urban Lifestyle',
    slug: 'urban-lifestyle',
    description: 'Modern living solutions with innovative designs and sustainable construction.',
    mission: 'Building tomorrow\'s communities today with sustainable and smart living solutions.',
    yearEstablished: 2010,
    contactPhone: '+91 98765 43211',
    contactEmail: 'contact@urbanlifestyle.com',
    contactWebsite: 'https://urbanlifestyle.com',
    contactAddress: 'MG Road, Bangalore - 560002',
    logoUrl: '/api/placeholder/200/80',
    heroImageUrl: '/api/placeholder/1200/600',
    specialties: ['Smart Homes', 'Eco-Friendly Construction', 'Urban Planning'],
    awards: ['Sustainable Developer 2023', 'Innovation Award'],
    certifications: ['LEED Certified', 'IGBC Platinum'],
    isActive: true,
    createdAt: new Date('2023-01-15')
  }
];

export const mockProjects: Project[] = [
  {
    id: '1',
    builderId: '1',
    name: 'Skyline Residences',
    slug: 'skyline-residences',
    description: 'Luxury 3 & 4 BHK apartments with panoramic city views and world-class amenities.',
    location: 'Whitefield, Bangalore',
    priceRange: '₹1.2 - 2.5 Cr',
    propertyType: 'apartment',
    status: 'construction',
    amenities: ['Swimming Pool', 'Gym', 'Club House', 'Children\'s Play Area', 'Landscaped Gardens'],
    specifications: ['Vitrified Tiles', 'Modular Kitchen', 'Premium Fixtures', 'VRV Air Conditioning'],
    images: ['/api/placeholder/800/600', '/api/placeholder/800/600'],
    floorPlans: ['/api/placeholder/600/800'],
    brochureUrl: '/api/placeholder/brochure.pdf',
    totalUnits: 240,
    availableUnits: 85,
    completionDate: new Date('2025-12-31'),
    isActive: true,
    createdAt: new Date('2023-06-01')
  }
];

export const builderTemplates: BuilderTemplate[] = [
  {
    id: '1',
    name: 'Luxury Builder Template',
    description: 'Premium template for luxury real estate developers',
    heroSection: {
      title: 'Crafting Exceptional Living Experiences',
      subtitle: 'Discover luxury redefined with our premium residential and commercial developments',
      backgroundImage: '/api/placeholder/1920/800',
      ctaText: 'Explore Our Projects'
    },
    aboutSection: {
      title: 'About Our Excellence',
      content: 'With decades of experience in luxury construction, we deliver unparalleled quality and sophistication in every project.',
      features: ['Premium Construction', 'Timely Delivery', 'World-Class Amenities', 'Strategic Locations']
    },
    contactSection: {
      title: 'Get In Touch',
      subtitle: 'Ready to invest in your dream home?',
      showContactForm: true,
      showPhone: true,
      showEmail: true,
      showAddress: true
    }
  },
  {
    id: '2',
    name: 'Modern Builder Template',
    description: 'Contemporary template for modern builders',
    heroSection: {
      title: 'Building Tomorrow\'s Communities',
      subtitle: 'Smart, sustainable, and stylish homes for the modern lifestyle',
      backgroundImage: '/api/placeholder/1920/800',
      ctaText: 'Discover Projects'
    },
    aboutSection: {
      title: 'Our Vision',
      content: 'Creating innovative living spaces that blend modern technology with sustainable construction practices.',
      features: ['Smart Home Technology', 'Green Building', 'Modern Architecture', 'Community Focus']
    },
    contactSection: {
      title: 'Connect With Us',
      subtitle: 'Let\'s build your future together',
      showContactForm: true,
      showPhone: true,
      showEmail: true,
      showAddress: true
    }
  }
];

export const projectTemplates: ProjectTemplate[] = [
  {
    id: '1',
    name: 'Luxury Apartment Template',
    description: 'Template for high-end apartment projects',
    propertyType: 'apartment',
    defaultAmenities: [
      'Swimming Pool', 'Gym & Fitness Center', 'Club House', 'Children\'s Play Area',
      'Landscaped Gardens', 'Security', '24/7 Power Backup', 'Parking'
    ],
    defaultSpecifications: [
      'Vitrified Tiles', 'Modular Kitchen', 'Premium Sanitary Fittings',
      'VRV Air Conditioning', 'High-Speed Elevators', 'Video Door Phone'
    ],
    layoutSections: {
      heroSection: true,
      featuresSection: true,
      amenitiesSection: true,
      locationSection: true,
      floorPlansSection: true,
      priceSection: true,
      gallerySection: true,
      contactSection: true
    }
  },
  {
    id: '2',
    name: 'Villa Template',
    description: 'Template for villa and independent house projects',
    propertyType: 'villa',
    defaultAmenities: [
      'Private Garden', 'Parking Space', 'Security', 'Club House',
      'Swimming Pool', 'Children\'s Play Area', 'Jogging Track', 'Guest Parking'
    ],
    defaultSpecifications: [
      'Italian Marble', 'Modular Kitchen', 'Designer Bathrooms',
      'Split Air Conditioning', 'Home Automation', 'Solar Water Heating'
    ],
    layoutSections: {
      heroSection: true,
      featuresSection: true,
      amenitiesSection: true,
      locationSection: true,
      floorPlansSection: true,
      priceSection: true,
      gallerySection: true,
      contactSection: true
    }
  },
  {
    id: '3',
    name: 'Plot Template',
    description: 'Template for residential plot projects',
    propertyType: 'plot',
    defaultAmenities: [
      'Gated Community', 'Security', 'Street Lighting', 'Water Supply',
      'Underground Drainage', 'Club House', 'Children\'s Park', 'Landscaping'
    ],
    defaultSpecifications: [
      'Clear Title', 'BMRDA/DTCP Approved', 'Corner Plots Available',
      'Wide Roads', 'Underground Utilities', 'Compound Wall'
    ],
    layoutSections: {
      heroSection: true,
      featuresSection: true,
      amenitiesSection: true,
      locationSection: true,
      floorPlansSection: false,
      priceSection: true,
      gallerySection: true,
      contactSection: true
    }
  }
];