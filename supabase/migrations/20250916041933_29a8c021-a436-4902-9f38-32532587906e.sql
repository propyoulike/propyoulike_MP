-- Create builders table with comprehensive information
CREATE TABLE public.builders (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  logo_url text,
  hero_image_url text,
  description text,
  mission text,
  year_established integer,
  rating decimal(2,1) DEFAULT 0,
  total_projects integer DEFAULT 0,
  total_locations integer DEFAULT 0,
  total_area_delivered text,
  employee_count text,
  specialties text[],
  awards text[],
  certifications text[],
  contact_phone text,
  contact_email text,
  contact_website text,
  contact_address text,
  is_featured boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create builder_projects table to link projects to builders
CREATE TABLE public.builder_projects (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  builder_id uuid NOT NULL REFERENCES public.builders(id) ON DELETE CASCADE,
  title text NOT NULL,
  slug text NOT NULL,
  location text,
  price_range text,
  image_url text,
  project_type text,
  possession_date text,
  configuration text,
  area_range text,
  status text DEFAULT 'upcoming',
  is_promoted boolean DEFAULT false,
  amenities text[],
  floor_plans jsonb,
  gallery_images text[],
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(builder_id, slug)
);

-- Create builder_landing_pages table for custom landing pages
CREATE TABLE public.builder_landing_pages (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  builder_id uuid NOT NULL REFERENCES public.builders(id) ON DELETE CASCADE,
  page_title text NOT NULL,
  page_slug text UNIQUE NOT NULL,
  hero_section jsonb,
  about_section jsonb,
  projects_section jsonb,
  testimonials_section jsonb,
  contact_section jsonb,
  seo_meta jsonb,
  custom_css text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.builders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.builder_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.builder_landing_pages ENABLE ROW LEVEL SECURITY;

-- Public read access for builders and projects (no auth required for viewing)
CREATE POLICY "Anyone can view active builders" 
ON public.builders 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Anyone can view builder projects" 
ON public.builder_projects 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can view active landing pages" 
ON public.builder_landing_pages 
FOR SELECT 
USING (is_active = true);

-- Admin policies for managing builders (you can add admin role later)
CREATE POLICY "Authenticated users can manage builders" 
ON public.builders 
FOR ALL 
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can manage builder projects" 
ON public.builder_projects 
FOR ALL 
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can manage landing pages" 
ON public.builder_landing_pages 
FOR ALL 
TO authenticated
USING (true)
WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_builders_slug ON public.builders(slug);
CREATE INDEX idx_builders_featured ON public.builders(is_featured, is_active);
CREATE INDEX idx_builder_projects_builder_id ON public.builder_projects(builder_id);
CREATE INDEX idx_builder_projects_slug ON public.builder_projects(slug);
CREATE INDEX idx_builder_landing_pages_slug ON public.builder_landing_pages(page_slug);

-- Create trigger for updating timestamps
CREATE TRIGGER update_builders_updated_at
  BEFORE UPDATE ON public.builders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_builder_projects_updated_at
  BEFORE UPDATE ON public.builder_projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_builder_landing_pages_updated_at
  BEFORE UPDATE ON public.builder_landing_pages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for testing
INSERT INTO public.builders (name, slug, description, year_established, rating, total_projects, total_locations, specialties, awards, is_featured) VALUES
('Prestige Group', 'prestige-group', 'Leading real estate developer in South India with premium residential and commercial projects.', 1986, 4.8, 45, 12, ARRAY['Luxury Apartments', 'Commercial Spaces', 'Premium Villas'], ARRAY['CREDAI Award 2023', 'Best Developer South India'], true),
('Brigade Group', 'brigade-group', 'Trusted name in Bangalore real estate with innovative and sustainable development practices.', 1995, 4.7, 38, 8, ARRAY['Residential Communities', 'IT Parks', 'Mixed-Use Development'], ARRAY['Green Building Award', 'Innovation in Real Estate'], true),
('Sobha Limited', 'sobha-limited', 'Award-winning developer known for quality construction, innovative design, and timely delivery.', 1995, 4.9, 52, 15, ARRAY['Premium Apartments', 'Luxury Villas', 'Plotted Development'], ARRAY['FIABCI Award', 'Best Quality Construction'], true);