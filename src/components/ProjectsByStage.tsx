import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Home, Hammer, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProjectsByStage = () => {
  const stages = [
    {
      id: 'eoi',
      title: 'EOI Projects',
      description: 'Express your interest in upcoming premium projects',
      icon: Clock,
      color: 'bg-blue-500',
      projects: 12,
      route: '/projects/eoi',
      highlights: ['Early Bird Pricing', 'Prime Locations', 'Limited Units']
    },
    {
      id: 'ready',
      title: 'Ready to Move',
      description: 'Immediate possession available properties',
      icon: Home,
      color: 'bg-green-500',
      projects: 28,
      route: '/projects/ready-to-move',
      highlights: ['Immediate Possession', 'No Waiting', 'Move-in Ready']
    },
    {
      id: 'construction',
      title: 'Under Construction',
      description: 'Ongoing projects with attractive payment plans',
      icon: Hammer,
      color: 'bg-orange-500',
      projects: 35,
      route: '/projects/under-construction',
      highlights: ['Construction Linked', 'Progress Updates', 'Quality Assurance']
    },
    {
      id: 'resale',
      title: 'Resale Properties',
      description: 'Pre-owned properties from verified sellers',
      icon: RefreshCw,
      color: 'bg-purple-500',
      projects: 42,
      route: '/projects/resale',
      highlights: ['Negotiable Prices', 'Established Areas', 'Quick Deals']
    }
  ];

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">
            Projects by Development Stage
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Choose properties based on your timeline and investment strategy. From upcoming launches 
            to ready-to-move homes, find the perfect match for your needs.
          </p>
        </div>

        {/* Stage Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stages.map((stage) => {
            const IconComponent = stage.icon;
            return (
              <Card key={stage.id} className="relative overflow-hidden group hover:shadow-lg transition-all">
                <div className={`absolute top-0 left-0 right-0 h-1 ${stage.color}`} />
                
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-3 rounded-lg ${stage.color} text-white`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{stage.title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {stage.projects} Projects
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    {stage.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    {stage.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${stage.color}`} />
                        <span className="text-xs text-muted-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <Link to={stage.route}>
                    <Button className="w-full group-hover:bg-primary/90 transition-colors">
                      Explore Projects
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-card rounded-lg">
            <div className="text-2xl font-bold text-primary mb-1">117</div>
            <div className="text-sm text-muted-foreground">Total Projects</div>
          </div>
          <div className="p-4 bg-card rounded-lg">
            <div className="text-2xl font-bold text-primary mb-1">₹45L+</div>
            <div className="text-sm text-muted-foreground">Starting Price</div>
          </div>
          <div className="p-4 bg-card rounded-lg">
            <div className="text-2xl font-bold text-primary mb-1">25+</div>
            <div className="text-sm text-muted-foreground">Locations</div>
          </div>
          <div className="p-4 bg-card rounded-lg">
            <div className="text-2xl font-bold text-primary mb-1">5K+</div>
            <div className="text-sm text-muted-foreground">Happy Customers</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsByStage;