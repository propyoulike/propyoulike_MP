import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { Save, FileText, Eye } from 'lucide-react';

interface Builder {
  id: string;
  name: string;
  slug: string;
}

const BuilderLandingPageEditor = () => {
  const { user } = useAuth();
  const [builders, setBuilders] = useState<Builder[]>([]);
  const [selectedBuilder, setSelectedBuilder] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pageData, setPageData] = useState({
    page_title: '',
    page_slug: '',
    hero_section: {
      title: '',
      subtitle: '',
      background_image: '',
      cta_text: 'Explore Projects',
      cta_link: ''
    },
    about_section: {
      title: 'About Our Company',
      content: '',
      features: ['']
    },
    projects_section: {
      title: 'Our Featured Projects',
      subtitle: 'Discover our latest developments',
      show_all_projects: true
    },
    testimonials_section: {
      title: 'What Our Customers Say',
      testimonials: [{
        name: '',
        comment: '',
        rating: 5,
        project: ''
      }]
    },
    contact_section: {
      title: 'Get In Touch',
      subtitle: 'Ready to find your dream home?',
      show_contact_form: true,
      show_phone: true,
      show_email: true,
      show_address: true
    },
    seo_meta: {
      title: '',
      description: '',
      keywords: ''
    }
  });

  useEffect(() => {
    fetchBuilders();
  }, []);

  const fetchBuilders = async () => {
    try {
      const { data, error } = await supabase
        .from('builders')
        .select('id, name, slug')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setBuilders(data || []);
    } catch (error) {
      console.error('Error fetching builders:', error);
    }
  };

  const generatePageSlug = (builderSlug: string, title: string) => {
    const baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    return `${builderSlug}-${baseSlug}`;
  };

  const handleBuilderChange = (builderId: string) => {
    setSelectedBuilder(builderId);
    const builder = builders.find(b => b.id === builderId);
    if (builder) {
      setPageData(prev => ({
        ...prev,
        page_slug: generatePageSlug(builder.slug, prev.page_title || 'landing'),
        seo_meta: {
          ...prev.seo_meta,
          title: `${builder.name} - Premium Real Estate Developer`,
          description: `Discover premium properties by ${builder.name}. Quality construction, innovative design, and timely delivery.`
        }
      }));
    }
  };

  const handleTitleChange = (title: string) => {
    setPageData(prev => {
      const builder = builders.find(b => b.id === selectedBuilder);
      return {
        ...prev,
        page_title: title,
        page_slug: builder ? generatePageSlug(builder.slug, title) : prev.page_slug
      };
    });
  };

  const updateHeroSection = (field: string, value: string) => {
    setPageData(prev => ({
      ...prev,
      hero_section: {
        ...prev.hero_section,
        [field]: value
      }
    }));
  };

  const updateAboutSection = (field: string, value: string) => {
    setPageData(prev => ({
      ...prev,
      about_section: {
        ...prev.about_section,
        [field]: value
      }
    }));
  };

  const addFeature = () => {
    setPageData(prev => ({
      ...prev,
      about_section: {
        ...prev.about_section,
        features: [...prev.about_section.features, '']
      }
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setPageData(prev => ({
      ...prev,
      about_section: {
        ...prev.about_section,
        features: prev.about_section.features.map((f, i) => i === index ? value : f)
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedBuilder) {
      toast({
        title: "Missing information",
        description: "Please select a builder and ensure you're logged in.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('builder_landing_pages')
        .insert([{
          builder_id: selectedBuilder,
          ...pageData
        }]);

      if (error) throw error;

      toast({
        title: "Landing page created",
        description: "The builder landing page has been created successfully."
      });

      // Reset form
      setPageData({
        page_title: '',
        page_slug: '',
        hero_section: {
          title: '',
          subtitle: '',
          background_image: '',
          cta_text: 'Explore Projects',
          cta_link: ''
        },
        about_section: {
          title: 'About Our Company',
          content: '',
          features: ['']
        },
        projects_section: {
          title: 'Our Featured Projects',
          subtitle: 'Discover our latest developments',
          show_all_projects: true
        },
        testimonials_section: {
          title: 'What Our Customers Say',
          testimonials: [{
            name: '',
            comment: '',
            rating: 5,
            project: ''
          }]
        },
        contact_section: {
          title: 'Get In Touch',
          subtitle: 'Ready to find your dream home?',
          show_contact_form: true,
          show_phone: true,
          show_email: true,
          show_address: true
        },
        seo_meta: {
          title: '',
          description: '',
          keywords: ''
        }
      });
      setSelectedBuilder('');
    } catch (error) {
      console.error('Error creating landing page:', error);
      toast({
        title: "Error creating landing page",
        description: "Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6 text-center">
          <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">Authentication Required</h3>
          <p className="text-muted-foreground">Please log in to create landing pages.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-5 w-5" />
          <span>Create Builder Landing Page</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Builder Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="builder">Select Builder *</Label>
              <Select value={selectedBuilder} onValueChange={handleBuilderChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a builder" />
                </SelectTrigger>
                <SelectContent>
                  {builders.map((builder) => (
                    <SelectItem key={builder.id} value={builder.id}>
                      {builder.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="page_title">Page Title *</Label>
              <Input
                id="page_title"
                value={pageData.page_title}
                onChange={(e) => handleTitleChange(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="page_slug">Page URL Slug</Label>
            <Input
              id="page_slug"
              value={pageData.page_slug}
              onChange={(e) => setPageData(prev => ({ ...prev, page_slug: e.target.value }))}
              placeholder="auto-generated"
            />
          </div>

          <Tabs defaultValue="hero" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="hero">Hero Section</TabsTrigger>
              <TabsTrigger value="about">About Section</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
            </TabsList>

            <TabsContent value="hero" className="space-y-4">
              <div>
                <Label htmlFor="hero_title">Hero Title</Label>
                <Input
                  id="hero_title"
                  value={pageData.hero_section.title}
                  onChange={(e) => updateHeroSection('title', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="hero_subtitle">Hero Subtitle</Label>
                <Textarea
                  id="hero_subtitle"
                  value={pageData.hero_section.subtitle}
                  onChange={(e) => updateHeroSection('subtitle', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="hero_bg">Background Image URL</Label>
                <Input
                  id="hero_bg"
                  value={pageData.hero_section.background_image}
                  onChange={(e) => updateHeroSection('background_image', e.target.value)}
                />
              </div>
            </TabsContent>

            <TabsContent value="about" className="space-y-4">
              <div>
                <Label htmlFor="about_title">Section Title</Label>
                <Input
                  id="about_title"
                  value={pageData.about_section.title}
                  onChange={(e) => updateAboutSection('title', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="about_content">Content</Label>
                <Textarea
                  id="about_content"
                  value={pageData.about_section.content}
                  onChange={(e) => updateAboutSection('content', e.target.value)}
                  rows={4}
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Key Features</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                    Add Feature
                  </Button>
                </div>
                <div className="space-y-2">
                  {pageData.about_section.features.map((feature, index) => (
                    <Input
                      key={index}
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      placeholder="Enter feature"
                    />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="projects" className="space-y-4">
              <div>
                <Label htmlFor="projects_title">Section Title</Label>
                <Input
                  id="projects_title"
                  value={pageData.projects_section.title}
                  onChange={(e) => setPageData(prev => ({
                    ...prev,
                    projects_section: { ...prev.projects_section, title: e.target.value }
                  }))}
                />
              </div>
              <div>
                <Label htmlFor="projects_subtitle">Section Subtitle</Label>
                <Input
                  id="projects_subtitle"
                  value={pageData.projects_section.subtitle}
                  onChange={(e) => setPageData(prev => ({
                    ...prev,
                    projects_section: { ...prev.projects_section, subtitle: e.target.value }
                  }))}
                />
              </div>
            </TabsContent>

            <TabsContent value="testimonials" className="space-y-4">
              <div>
                <Label htmlFor="testimonials_title">Section Title</Label>
                <Input
                  id="testimonials_title"
                  value={pageData.testimonials_section.title}
                  onChange={(e) => setPageData(prev => ({
                    ...prev,
                    testimonials_section: { ...prev.testimonials_section, title: e.target.value }
                  }))}
                />
              </div>
            </TabsContent>

            <TabsContent value="seo" className="space-y-4">
              <div>
                <Label htmlFor="seo_title">SEO Title</Label>
                <Input
                  id="seo_title"
                  value={pageData.seo_meta.title}
                  onChange={(e) => setPageData(prev => ({
                    ...prev,
                    seo_meta: { ...prev.seo_meta, title: e.target.value }
                  }))}
                />
              </div>
              <div>
                <Label htmlFor="seo_description">SEO Description</Label>
                <Textarea
                  id="seo_description"
                  value={pageData.seo_meta.description}
                  onChange={(e) => setPageData(prev => ({
                    ...prev,
                    seo_meta: { ...prev.seo_meta, description: e.target.value }
                  }))}
                />
              </div>
              <div>
                <Label htmlFor="seo_keywords">SEO Keywords</Label>
                <Input
                  id="seo_keywords"
                  value={pageData.seo_meta.keywords}
                  onChange={(e) => setPageData(prev => ({
                    ...prev,
                    seo_meta: { ...prev.seo_meta, keywords: e.target.value }
                  }))}
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex space-x-4">
            <Button type="submit" disabled={isLoading || !selectedBuilder} className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Creating...' : 'Create Landing Page'}
            </Button>
            {pageData.page_slug && (
              <Button type="button" variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BuilderLandingPageEditor;