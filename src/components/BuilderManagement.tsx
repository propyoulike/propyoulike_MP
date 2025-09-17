import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Plus, X, Save, Building, Eye, Trash2, Edit } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { builderTemplates } from '@/data/mockData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface Builder {
  id: string;
  name: string;
  slug: string;
  description?: string;
  mission?: string;
  year_established?: number;
  contact_phone?: string;
  contact_email?: string;
  contact_website?: string;
  contact_address?: string;
  logo_url?: string;
  hero_image_url?: string;
  specialties?: string[];
  awards?: string[];
  certifications?: string[];
  is_active: boolean;
  created_at: string;
}

const BuilderManagement = () => {
  const [builders, setBuilders] = useState<Builder[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingBuilder, setEditingBuilder] = useState<Builder | null>(null);
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

  useEffect(() => {
    fetchBuilders();
  }, []);

  const fetchBuilders = async () => {
    try {
      const { data, error } = await supabase
        .from('builders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBuilders(data || []);
    } catch (error) {
      console.error('Error fetching builders:', error);
      toast({
        title: "Error fetching builders",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  };

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

  const resetForm = () => {
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
    setEditingBuilder(null);
  };

  const handleEdit = (builder: Builder) => {
    setEditingBuilder(builder);
    setBuilderData({
      name: builder.name,
      slug: builder.slug,
      description: builder.description || '',
      mission: builder.mission || '',
      yearEstablished: builder.year_established?.toString() || '',
      contactPhone: builder.contact_phone || '',
      contactEmail: builder.contact_email || '',
      contactWebsite: builder.contact_website || '',
      contactAddress: builder.contact_address || '',
      logoUrl: builder.logo_url || '',
      heroImageUrl: builder.hero_image_url || '',
      specialties: builder.specialties && builder.specialties.length > 0 ? builder.specialties : [''],
      awards: builder.awards && builder.awards.length > 0 ? builder.awards : [''],
      certifications: builder.certifications && builder.certifications.length > 0 ? builder.certifications : ['']
    });
  };

  const handleDelete = async (builder: Builder) => {
    if (!confirm(`Are you sure you want to delete ${builder.name}?`)) return;

    try {
      const { error } = await supabase
        .from('builders')
        .delete()
        .eq('id', builder.id);

      if (error) throw error;

      toast({
        title: "Builder deleted",
        description: "The builder has been removed successfully."
      });
      
      fetchBuilders();
    } catch (error) {
      console.error('Error deleting builder:', error);
      toast({
        title: "Error deleting builder",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const builderPayload = {
        name: builderData.name,
        slug: builderData.slug,
        description: builderData.description || null,
        mission: builderData.mission || null,
        year_established: builderData.yearEstablished ? parseInt(builderData.yearEstablished) : null,
        contact_phone: builderData.contactPhone || null,
        contact_email: builderData.contactEmail || null,
        contact_website: builderData.contactWebsite || null,
        contact_address: builderData.contactAddress || null,
        logo_url: builderData.logoUrl || null,
        hero_image_url: builderData.heroImageUrl || null,
        specialties: builderData.specialties.filter(s => s.trim()),
        awards: builderData.awards.filter(a => a.trim()),
        certifications: builderData.certifications.filter(c => c.trim()),
        is_active: true
      };

      let error;
      if (editingBuilder) {
        const { error: updateError } = await supabase
          .from('builders')
          .update(builderPayload)
          .eq('id', editingBuilder.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('builders')
          .insert([builderPayload]);
        error = insertError;
      }

      if (error) throw error;

      toast({
        title: editingBuilder ? "Builder updated successfully" : "Builder added successfully",
        description: "The builder has been saved to the database."
      });

      resetForm();
      fetchBuilders();
    } catch (error) {
      console.error('Error saving builder:', error);
      toast({
        title: "Error saving builder",
        description: "Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building className="h-5 w-5" />
            <span>{editingBuilder ? 'Edit Builder' : 'Add New Builder'}</span>
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
                {isLoading ? (editingBuilder ? 'Updating...' : 'Adding Builder...') : (editingBuilder ? 'Update Builder' : 'Add Builder')}
              </Button>
              {editingBuilder && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
              <Button type="button" variant="outline" className="px-6">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Builders List */}
      <Card>
        <CardHeader>
          <CardTitle>Existing Builders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {builders.map((builder) => (
                <TableRow key={builder.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{builder.name}</div>
                      <div className="text-sm text-muted-foreground">/{builder.slug}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={builder.is_active ? "default" : "secondary"}>
                      {builder.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {builder.contact_email && <div>{builder.contact_email}</div>}
                      {builder.contact_phone && <div>{builder.contact_phone}</div>}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(builder.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(builder)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(builder)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuilderManagement;