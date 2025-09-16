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
import { Plus, X, Save, Home, Calendar, MapPin } from 'lucide-react';
import { Builder, Project } from '@/types/builder';
import { mockBuilders, projectTemplates } from '@/data/mockData';

const LocalProjectManagement = () => {
  const [builders, setBuilders] = useState<Builder[]>([]);
  const [selectedBuilder, setSelectedBuilder] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
    // Load builders from localStorage and mock data
    const localBuilders = JSON.parse(localStorage.getItem('builders') || '[]');
    setBuilders([...mockBuilders, ...localBuilders]);
  }, []);

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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newProject: Project = {
        id: Date.now().toString(),
        builderId: selectedBuilder,
        name: projectData.name,
        slug: projectData.slug,
        description: projectData.description,
        location: projectData.location,
        priceRange: projectData.priceRange,
        propertyType: projectData.propertyType,
        status: projectData.status,
        amenities: projectData.amenities.filter(a => a.trim()),
        specifications: projectData.specifications.filter(s => s.trim()),
        images: projectData.images.filter(img => img.trim()),
        floorPlans: projectData.floorPlans.filter(plan => plan.trim()),
        brochureUrl: projectData.brochureUrl,
        totalUnits: projectData.totalUnits ? parseInt(projectData.totalUnits) : 0,
        availableUnits: projectData.availableUnits ? parseInt(projectData.availableUnits) : 0,
        completionDate: projectData.completionDate ? new Date(projectData.completionDate) : new Date(),
        isActive: true,
        createdAt: new Date()
      };

      // Save to localStorage for demo
      const projects = JSON.parse(localStorage.getItem('projects') || '[]');
      projects.push(newProject);
      localStorage.setItem('projects', JSON.stringify(projects));

      toast({
        title: "Project added successfully",
        description: "The project has been saved locally."
      });

      // Reset form
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
    } catch (error) {
      console.error('Error adding project:', error);
      toast({
        title: "Error adding project",
        description: "Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectedBuilderData = builders.find(b => b.id === selectedBuilder);

  return (
    <Card className="max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Home className="h-5 w-5" />
          <span>Add New Project</span>
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
              <div>
                <Label htmlFor="description">Project Description *</Label>
                <Textarea
                  id="description"
                  value={projectData.description}
                  onChange={(e) => setProjectData(prev => ({ ...prev, description: e.target.value }))}
                  required
                  className="mt-1"
                  rows={3}
                />
              </div>

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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="totalUnits">Total Units</Label>
                  <Input
                    id="totalUnits"
                    type="number"
                    value={projectData.totalUnits}
                    onChange={(e) => setProjectData(prev => ({ ...prev, totalUnits: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="availableUnits">Available Units</Label>
                  <Input
                    id="availableUnits"
                    type="number"
                    value={projectData.availableUnits}
                    onChange={(e) => setProjectData(prev => ({ ...prev, availableUnits: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="completionDate" className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Completion Date</span>
                  </Label>
                  <Input
                    id="completionDate"
                    type="date"
                    value={projectData.completionDate}
                    onChange={(e) => setProjectData(prev => ({ ...prev, completionDate: e.target.value }))}
                    className="mt-1"
                  />
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
                        placeholder="Image URL"
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

              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label>Floor Plans</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayField('floorPlans')}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Floor Plan
                  </Button>
                </div>
                <div className="space-y-2">
                  {projectData.floorPlans.map((plan: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={plan}
                        onChange={(e) => updateArrayField('floorPlans', index, e.target.value)}
                        placeholder="Floor plan URL"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayField('floorPlans', index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="brochureUrl">Brochure URL</Label>
                <Input
                  id="brochureUrl"
                  value={projectData.brochureUrl}
                  onChange={(e) => setProjectData(prev => ({ ...prev, brochureUrl: e.target.value }))}
                  placeholder="https://example.com/brochure.pdf"
                  className="mt-1"
                />
              </div>
            </TabsContent>
          </Tabs>

          <Button type="submit" disabled={isLoading || !selectedBuilder} className="w-full">
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? 'Adding Project...' : 'Add Project'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LocalProjectManagement;