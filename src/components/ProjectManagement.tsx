import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Plus, X, Save, Home, Calendar, MapPin, Edit, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { projectTemplates } from '@/data/mockData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Builder {
  id: string;
  name: string;
  slug: string;
}

interface Project {
  id: string;
  builder_id: string;
  title: string;
  slug: string;
  location?: string;
  price_range?: string;
  project_type?: string;
  status?: string;
  amenities?: string[];
  gallery_images?: string[];
  floor_plans?: any;
  created_at: string;
  is_promoted: boolean;
  builders?: { name: string };
}

const ProjectManagement = () => {
  const [builders, setBuilders] = useState<Builder[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedBuilder, setSelectedBuilder] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectData, setProjectData] = useState({
    name: '',
    slug: '',
    description: '',
    location: '',
    priceRange: '',
    propertyType: 'apartment' as 'apartment' | 'villa' | 'plot' | 'commercial',
    status: 'planning' as 'planning' | 'construction' | 'completed',
    amenities: [''],
    specifications: [''],
    images: [''],
    floorPlans: [''],
    brochureUrl: '',
    totalUnits: '',
    availableUnits: '',
    completionDate: ''
  });

  useEffect(() => {
    fetchBuilders();
    fetchProjects();
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

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('builder_projects')
        .select(`
          *,
          builders (name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const generateSlug = (name: string, builderSlug?: string) => {
    const baseSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    return builderSlug ? `${builderSlug}-${baseSlug}` : baseSlug;
  };

  const handleNameChange = (name: string) => {
    const builder = builders.find(b => b.id === selectedBuilder);
    setProjectData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name, builder?.slug)
    }));
  };

  const applyTemplate = (templateId: string) => {
    const template = projectTemplates.find(t => t.id === templateId);
    if (template) {
      setProjectData(prev => ({
        ...prev,
        propertyType: template.propertyType,
        amenities: [...template.defaultAmenities],
        specifications: [...template.defaultSpecifications]
      }));
      toast({
        title: "Template applied",
        description: `${template.name} has been applied to your project.`
      });
    }
  };

  const addArrayField = (field: 'amenities' | 'specifications' | 'images' | 'floorPlans') => {
    setProjectData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const updateArrayField = (field: 'amenities' | 'specifications' | 'images' | 'floorPlans', index: number, value: string) => {
    setProjectData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const removeArrayField = (field: 'amenities' | 'specifications' | 'images' | 'floorPlans', index: number) => {
    setProjectData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const resetForm = () => {
    setProjectData({
      name: '',
      slug: '',
      description: '',
      location: '',
      priceRange: '',
      propertyType: 'apartment',
      status: 'planning',
      amenities: [''],
      specifications: [''],
      images: [''],
      floorPlans: [''],
      brochureUrl: '',
      totalUnits: '',
      availableUnits: '',
      completionDate: ''
    });
    setSelectedBuilder('');
    setSelectedTemplate('');
    setEditingProject(null);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setSelectedBuilder(project.builder_id);
    setProjectData({
      name: project.title,
      slug: project.slug,
      description: '', // Not stored in current schema
      location: project.location || '',
      priceRange: project.price_range || '',
      propertyType: (project.project_type as any) || 'apartment',
      status: (project.status as any) || 'planning',
      amenities: project.amenities && project.amenities.length > 0 ? project.amenities : [''],
      specifications: [''], // Not in current schema
      images: project.gallery_images && project.gallery_images.length > 0 ? project.gallery_images : [''],
      floorPlans: [''], // floor_plans is jsonb, would need conversion
      brochureUrl: '',
      totalUnits: '',
      availableUnits: '',
      completionDate: ''
    });
  };

  const handleDelete = async (project: Project) => {
    if (!confirm(`Are you sure you want to delete ${project.title}?`)) return;

    try {
      const { error } = await supabase
        .from('builder_projects')
        .delete()
        .eq('id', project.id);

      if (error) throw error;

      toast({
        title: "Project deleted",
        description: "The project has been removed successfully."
      });
      
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Error deleting project",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBuilder) {
      toast({
        title: "Missing information",
        description: "Please select a builder for this project.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const projectPayload = {
        builder_id: selectedBuilder,
        title: projectData.name,
        slug: projectData.slug,
        location: projectData.location || null,
        price_range: projectData.priceRange || null,
        project_type: projectData.propertyType,
        status: projectData.status,
        amenities: projectData.amenities.filter(a => a.trim()),
        gallery_images: projectData.images.filter(img => img.trim()),
        floor_plans: null, // Could be enhanced to store floor plan data
        is_promoted: false
      };

      let error;
      if (editingProject) {
        const { error: updateError } = await supabase
          .from('builder_projects')
          .update(projectPayload)
          .eq('id', editingProject.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('builder_projects')
          .insert([projectPayload]);
        error = insertError;
      }

      if (error) throw error;

      toast({
        title: editingProject ? "Project updated successfully" : "Project added successfully",
        description: "The project has been saved to the database."
      });

      resetForm();
      fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      toast({
        title: "Error saving project",
        description: "Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectedBuilderData = builders.find(b => b.id === selectedBuilder);

  return (
    <div className="space-y-6">
      <Card className="max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Home className="h-5 w-5" />
            <span>{editingProject ? 'Edit Project' : 'Add New Project'}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Builder & Template Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="builder">Select Builder *</Label>
                <Select value={selectedBuilder} onValueChange={setSelectedBuilder}>
                  <SelectTrigger className="mt-1">
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
                {selectedBuilderData && (
                  <Badge variant="secondary" className="mt-2">
                    {selectedBuilderData.name}
                  </Badge>
                )}
              </div>
              
              <div>
                <Label htmlFor="template">Project Template</Label>
                <div className="flex gap-2 mt-1">
                  <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectTemplates.map((template) => (
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
                    size="sm"
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Project Name *</Label>
                <Input
                  id="name"
                  value={projectData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={projectData.slug}
                  onChange={(e) => setProjectData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="auto-generated"
                  className="mt-1"
                />
              </div>
            </div>

            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Project Details</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location" className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>Location *</span>
                    </Label>
                    <Input
                      id="location"
                      value={projectData.location}
                      onChange={(e) => setProjectData(prev => ({ ...prev, location: e.target.value }))}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="priceRange">Price Range</Label>
                    <Input
                      id="priceRange"
                      value={projectData.priceRange}
                      onChange={(e) => setProjectData(prev => ({ ...prev, priceRange: e.target.value }))}
                      placeholder="₹50 L - 1 Cr"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="propertyType">Property Type</Label>
                    <Select 
                      value={projectData.propertyType} 
                      onValueChange={(value: any) => setProjectData(prev => ({ ...prev, propertyType: value }))}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="plot">Plot</SelectItem>  
                        <SelectItem value="commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="status">Project Status</Label>
                    <Select 
                      value={projectData.status} 
                      onValueChange={(value: any) => setProjectData(prev => ({ ...prev, status: value }))}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planning">Planning</SelectItem>
                        <SelectItem value="construction">Construction</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="amenities" className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Project Amenities</Label>
                  <Button
                    type="button"  
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayField('amenities')}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Amenity
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {projectData.amenities.map((amenity: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={amenity}
                        onChange={(e) => updateArrayField('amenities', index, e.target.value)}
                        placeholder="Enter amenity"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayField('amenities', index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="specifications" className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Technical Specifications</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayField('specifications')}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Specification
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {projectData.specifications.map((spec: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={spec}
                        onChange={(e) => updateArrayField('specifications', index, e.target.value)}
                        placeholder="Enter specification"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayField('specifications', index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="media" className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label>Project Images</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayField('images')}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Image
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {projectData.images.map((image: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={image}
                          onChange={(e) => updateArrayField('images', index, e.target.value)}
                          placeholder="https://example.com/image.jpg"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayField('images', index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex space-x-4">
              <Button type="submit" disabled={isLoading} className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? (editingProject ? 'Updating...' : 'Adding Project...') : (editingProject ? 'Update Project' : 'Add Project')}
              </Button>
              {editingProject && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Projects List */}
      <Card>
        <CardHeader>
          <CardTitle>Existing Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Builder</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{project.title}</div>
                      <div className="text-sm text-muted-foreground">/{project.slug}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {project.builders?.name}
                  </TableCell>
                  <TableCell>{project.location}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="capitalize">
                    {project.project_type}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(project)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(project)}>
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

export default ProjectManagement;