import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Plus, X, Save, Building } from 'lucide-react';

const BuilderManagement = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [builderData, setBuilderData] = useState({
    name: '',
    slug: '',
    description: '',
    mission: '',
    year_established: '',
    contact_phone: '',
    contact_email: '',
    contact_website: '',
    contact_address: '',
    logo_url: '',
    hero_image_url: '',
    specialties: [''],
    awards: [''],
    certifications: ['']
  });

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  };

  const handleNameChange = (name: string) => {
    setBuilderData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name)
    }));
  };

  const addArrayField = (field: 'specialties' | 'awards' | 'certifications') => {
    setBuilderData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const updateArrayField = (field: 'specialties' | 'awards' | 'certifications', index: number, value: string) => {
    setBuilderData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const removeArrayField = (field: 'specialties' | 'awards' | 'certifications', index: number) => {
    setBuilderData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to add a builder.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const cleanedData = {
        ...builderData,
        year_established: builderData.year_established ? parseInt(builderData.year_established) : null,
        specialties: builderData.specialties.filter(s => s.trim()),
        awards: builderData.awards.filter(a => a.trim()),
        certifications: builderData.certifications.filter(c => c.trim())
      };

      const { error } = await supabase
        .from('builders')
        .insert([cleanedData]);

      if (error) throw error;

      toast({
        title: "Builder added successfully",
        description: "The builder has been added to the database."
      });

      // Reset form
      setBuilderData({
        name: '',
        slug: '',
        description: '',
        mission: '',
        year_established: '',
        contact_phone: '',
        contact_email: '',
        contact_website: '',
        contact_address: '',
        logo_url: '',
        hero_image_url: '',
        specialties: [''],
        awards: [''],
        certifications: ['']
      });
    } catch (error) {
      console.error('Error adding builder:', error);
      toast({
        title: "Error adding builder",
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
          <Building className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">Authentication Required</h3>
          <p className="text-muted-foreground">Please log in to manage builders.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Building className="h-5 w-5" />
          <span>Add New Builder</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Builder Name *</Label>
              <Input
                id="name"
                value={builderData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="slug">URL Slug</Label>
              <Input
                id="slug"
                value={builderData.slug}
                onChange={(e) => setBuilderData(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="auto-generated"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={builderData.description}
              onChange={(e) => setBuilderData(prev => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="mission">Mission Statement</Label>
            <Textarea
              id="mission"
              value={builderData.mission}
              onChange={(e) => setBuilderData(prev => ({ ...prev, mission: e.target.value }))}
            />
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="year_established">Year Established</Label>
              <Input
                id="year_established"
                type="number"
                value={builderData.year_established}
                onChange={(e) => setBuilderData(prev => ({ ...prev, year_established: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="contact_phone">Contact Phone</Label>
              <Input
                id="contact_phone"
                value={builderData.contact_phone}
                onChange={(e) => setBuilderData(prev => ({ ...prev, contact_phone: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contact_email">Contact Email</Label>
              <Input
                id="contact_email"
                type="email"
                value={builderData.contact_email}
                onChange={(e) => setBuilderData(prev => ({ ...prev, contact_email: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="contact_website">Website</Label>
              <Input
                id="contact_website"
                value={builderData.contact_website}
                onChange={(e) => setBuilderData(prev => ({ ...prev, contact_website: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="contact_address">Address</Label>
            <Textarea
              id="contact_address"
              value={builderData.contact_address}
              onChange={(e) => setBuilderData(prev => ({ ...prev, contact_address: e.target.value }))}
            />
          </div>

          {/* Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="logo_url">Logo URL</Label>
              <Input
                id="logo_url"
                value={builderData.logo_url}
                onChange={(e) => setBuilderData(prev => ({ ...prev, logo_url: e.target.value }))}
                placeholder="https://example.com/logo.jpg"
              />
            </div>
            <div>
              <Label htmlFor="hero_image_url">Hero Image URL</Label>
              <Input
                id="hero_image_url"
                value={builderData.hero_image_url}
                onChange={(e) => setBuilderData(prev => ({ ...prev, hero_image_url: e.target.value }))}
                placeholder="https://example.com/hero.jpg"
              />
            </div>
          </div>

          {/* Dynamic Arrays */}
          {['specialties', 'awards', 'certifications'].map((field) => (
            <div key={field}>
              <div className="flex items-center justify-between mb-2">
                <Label className="capitalize">{field}</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addArrayField(field as any)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add {field.slice(0, -1)}
                </Button>
              </div>
              <div className="space-y-2">
                {(builderData[field as keyof typeof builderData] as string[]).map((item: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={item}
                      onChange={(e) => updateArrayField(field as any, index, e.target.value)}
                      placeholder={`Enter ${field.slice(0, -1)}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayField(field as any, index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <Button type="submit" disabled={isLoading} className="w-full">
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? 'Adding Builder...' : 'Add Builder'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BuilderManagement;