import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Plus, X, Save, Building, Eye } from 'lucide-react';
import { Builder } from '@/types/builder';
import { builderTemplates } from '@/data/mockData';

const LocalBuilderManagement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [builderData, setBuilderData] = useState({
    name: '',
    slug: '',
    description: '',
    mission: '',
    yearEstablished: '',
    contactPhone: '',
    contactEmail: '',
    contactWebsite: '',
    contactAddress: '',
    logoUrl: '',
    heroImageUrl: '',
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

  const applyTemplate = (templateId: string) => {
    const template = builderTemplates.find(t => t.id === templateId);
    if (template) {
      setBuilderData(prev => ({
        ...prev,
        description: template.aboutSection.content,
        mission: template.heroSection.subtitle
      }));
      toast({
        title: "Template applied",
        description: `${template.name} has been applied to your builder profile.`
      });
    }
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
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newBuilder: Builder = {
        id: Date.now().toString(),
        name: builderData.name,
        slug: builderData.slug,
        description: builderData.description,
        mission: builderData.mission,
        yearEstablished: builderData.yearEstablished ? parseInt(builderData.yearEstablished) : 0,
        contactPhone: builderData.contactPhone,
        contactEmail: builderData.contactEmail,
        contactWebsite: builderData.contactWebsite,
        contactAddress: builderData.contactAddress,
        logoUrl: builderData.logoUrl,
        heroImageUrl: builderData.heroImageUrl,
        specialties: builderData.specialties.filter(s => s.trim()),
        awards: builderData.awards.filter(a => a.trim()),
        certifications: builderData.certifications.filter(c => c.trim()),
        isActive: true,
        createdAt: new Date()
      };

      // Save to localStorage for demo
      const builders = JSON.parse(localStorage.getItem('builders') || '[]');
      builders.push(newBuilder);
      localStorage.setItem('builders', JSON.stringify(builders));

      toast({
        title: "Builder added successfully",
        description: "The builder has been saved locally."
      });

      // Reset form
      setBuilderData({
        name: '',
        slug: '',
        description: '',
        mission: '',
        yearEstablished: '',
        contactPhone: '',
        contactEmail: '',
        contactWebsite: '',
        contactAddress: '',
        logoUrl: '',
        heroImageUrl: '',
        specialties: [''],
        awards: [''],
        certifications: ['']
      });
      setSelectedTemplate('');
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
          {/* Template Selection */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <Label htmlFor="template" className="text-base font-semibold">Choose a Template</Label>
            <p className="text-sm text-muted-foreground mb-3">Select a pre-designed template to quickly populate your builder profile</p>
            <div className="flex gap-3">
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  {builderTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                type="button" 
                onClick={() => selectedTemplate && applyTemplate(selectedTemplate)}
                disabled={!selectedTemplate}
              >
                Apply Template
              </Button>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Builder Name *</Label>
              <Input
                id="name"
                value={builderData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="slug">URL Slug</Label>
              <Input
                id="slug"
                value={builderData.slug}
                onChange={(e) => setBuilderData(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="auto-generated"
                className="mt-1"
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
              className="mt-1"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="mission">Mission Statement</Label>
            <Textarea
              id="mission"
              value={builderData.mission}
              onChange={(e) => setBuilderData(prev => ({ ...prev, mission: e.target.value }))}
              className="mt-1"
              rows={2}
            />
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="year_established">Year Established</Label>
              <Input
                id="year_established"
                type="number"
                value={builderData.yearEstablished}
                onChange={(e) => setBuilderData(prev => ({ ...prev, yearEstablished: e.target.value }))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="contact_phone">Contact Phone</Label>
              <Input
                id="contact_phone"
                value={builderData.contactPhone}
                onChange={(e) => setBuilderData(prev => ({ ...prev, contactPhone: e.target.value }))}
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contact_email">Contact Email</Label>
              <Input
                id="contact_email"
                type="email"
                value={builderData.contactEmail}
                onChange={(e) => setBuilderData(prev => ({ ...prev, contactEmail: e.target.value }))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="contact_website">Website</Label>
              <Input
                id="contact_website"
                value={builderData.contactWebsite}
                onChange={(e) => setBuilderData(prev => ({ ...prev, contactWebsite: e.target.value }))}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="contact_address">Address</Label>
            <Textarea
              id="contact_address"
              value={builderData.contactAddress}
              onChange={(e) => setBuilderData(prev => ({ ...prev, contactAddress: e.target.value }))}
              className="mt-1"
              rows={2}
            />
          </div>

          {/* Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="logo_url">Logo URL</Label>
              <Input
                id="logo_url"
                value={builderData.logoUrl}
                onChange={(e) => setBuilderData(prev => ({ ...prev, logoUrl: e.target.value }))}
                placeholder="https://example.com/logo.jpg"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="hero_image_url">Hero Image URL</Label>
              <Input
                id="hero_image_url"
                value={builderData.heroImageUrl}
                onChange={(e) => setBuilderData(prev => ({ ...prev, heroImageUrl: e.target.value }))}
                placeholder="https://example.com/hero.jpg"
                className="mt-1"
              />
            </div>
          </div>

          {/* Dynamic Arrays */}
          {(['specialties', 'awards', 'certifications'] as const).map((field) => (
            <div key={field} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="capitalize">{field}</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addArrayField(field)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add {field.slice(0, -1)}
                </Button>
              </div>
              <div className="space-y-2">
                {builderData[field].map((item: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={item}
                      onChange={(e) => updateArrayField(field, index, e.target.value)}
                      placeholder={`Enter ${field.slice(0, -1)}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayField(field, index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex space-x-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Adding Builder...' : 'Add Builder'}
            </Button>
            <Button type="button" variant="outline" className="px-6">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LocalBuilderManagement;