import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  FileText,
  Link as LinkIcon,
  Download,
  BookOpen,
  Star,
  Eye,
  Search,
  Clock,
  ExternalLink
} from 'lucide-react';

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Comprehensive GATE resources
  const resources = [
    // Syllabus & Exam Pattern
    {
      id: 1,
      title: 'GATE 2025 Official Syllabus',
      category: 'Syllabus',
      description: 'Complete official syllabus for all 5 branches with detailed topics and weightage',
      type: 'pdf',
      downloads: 12500,
      views: 45000,
      rating: 4.8,
      branch: 'All',
      size: '2.4 MB'
    },
    {
      id: 2,
      title: 'GATE Exam Pattern & Marking Scheme',
      category: 'Syllabus',
      description: 'Official exam pattern, marking scheme, negative marking rules, and question distribution',
      type: 'pdf',
      downloads: 8900,
      views: 32000,
      rating: 4.9,
      branch: 'All',
      size: '1.8 MB'
    },
    {
      id: 3,
      title: 'Branch-wise Topic Distribution',
      category: 'Syllabus',
      description: 'Detailed breakdown of topics by branch with approximate weights in previous exams',
      type: 'pdf',
      downloads: 6700,
      views: 24000,
      rating: 4.7,
      branch: 'All',
      size: '1.2 MB'
    },

    // Cheatsheets
    {
      id: 4,
      title: 'Engineering Mathematics Cheatsheet',
      category: 'Cheatsheets',
      description: 'All formulas, theorems, and quick reference for Engineering Mathematics',
      type: 'pdf',
      downloads: 15800,
      views: 52000,
      rating: 4.9,
      branch: 'All',
      size: '3.1 MB'
    },
    {
      id: 5,
      title: 'Digital Logic & Microprocessor Cheatsheet',
      category: 'Cheatsheets',
      description: 'Quick reference guide for Digital Logic, Microprocessors, and Computer Architecture',
      type: 'pdf',
      downloads: 10200,
      views: 38000,
      rating: 4.8,
      branch: 'CS, EC',
      size: '2.2 MB'
    },
    {
      id: 6,
      title: 'Thermodynamics & Heat Transfer Quick Reference',
      category: 'Cheatsheets',
      description: 'Essential formulas and derivations for Thermodynamics and Heat Transfer topics',
      type: 'pdf',
      downloads: 7500,
      views: 28000,
      rating: 4.6,
      branch: 'ME',
      size: '1.9 MB'
    },
    {
      id: 7,
      title: 'Circuit Theory Essential Formulas',
      category: 'Cheatsheets',
      description: 'All important circuit theorems, formulas, and analysis techniques in one document',
      type: 'pdf',
      downloads: 9100,
      views: 31000,
      rating: 4.7,
      branch: 'EE, EC',
      size: '2.1 MB'
    },
    {
      id: 8,
      title: 'Data Structures & Algorithms Reference',
      category: 'Cheatsheets',
      description: 'Complex algorithm complexities, data structure operations, and implementation tips',
      type: 'pdf',
      downloads: 13500,
      views: 44000,
      rating: 4.9,
      branch: 'CS',
      size: '2.8 MB'
    },

    // Study Guides
    {
      id: 9,
      title: 'GATE Preparation Strategy Guide',
      category: 'Guides',
      description: 'Comprehensive strategy for 6-12 month preparation including study schedule and tips',
      type: 'pdf',
      downloads: 11200,
      views: 42000,
      rating: 4.8,
      branch: 'All',
      size: '2.5 MB'
    },
    {
      id: 10,
      title: 'Time Management for GATE Exam',
      category: 'Guides',
      description: 'Proven time management strategies and techniques used by GATE toppers',
      type: 'pdf',
      downloads: 8900,
      views: 33000,
      rating: 4.7,
      branch: 'All',
      size: '1.7 MB'
    },
    {
      id: 11,
      title: 'Stress Management & Test-Taking Strategies',
      category: 'Guides',
      description: 'Psychological preparation, stress management, and exam-day strategies for success',
      type: 'pdf',
      downloads: 7600,
      views: 26000,
      rating: 4.6,
      branch: 'All',
      size: '1.4 MB'
    },
    {
      id: 12,
      title: 'CS Branch Subject-wise Study Plan',
      category: 'Guides',
      description: 'Detailed 12-month study plan for CS branch with weightage and resource allocation',
      type: 'pdf',
      downloads: 6800,
      views: 22000,
      rating: 4.8,
      branch: 'CS',
      size: '1.9 MB'
    },

    // Tools & Utilities
    {
      id: 13,
      title: 'Virtual Scientific Calculator',
      category: 'Tools',
      description: 'Web-based scientific calculator identical to the one used in GATE exam',
      type: 'tool',
      downloads: 14230,
      views: 48000,
      rating: 4.9,
      branch: 'All',
      size: 'Online'
    },
    {
      id: 14,
      title: 'GATE Score Predictor',
      category: 'Tools',
      description: 'Calculate your probable GATE score based on mock test performance',
      type: 'tool',
      downloads: 9800,
      views: 35000,
      rating: 4.7,
      branch: 'All',
      size: 'Online'
    },
    {
      id: 15,
      title: 'Interview Preparation Toolkit',
      category: 'Tools',
      description: 'Collection of resources for preparing group discussions and technical interviews',
      type: 'tool',
      downloads: 7200,
      views: 25000,
      rating: 4.6,
      branch: 'All',
      size: 'Online'
    },

    // Reference Materials
    {
      id: 16,
      title: 'Standard Reference Books List',
      category: 'References',
      description: 'Recommended reference books for each subject across all branches',
      type: 'pdf',
      downloads: 10500,
      views: 39000,
      rating: 4.8,
      branch: 'All',
      size: '1.6 MB'
    },
    {
      id: 17,
      title: 'Online Learning Resources Compilation',
      category: 'References',
      description: 'Curated list of free and premium online courses, tutorials, and learning platforms',
      type: 'pdf',
      downloads: 8700,
      views: 31000,
      rating: 4.7,
      branch: 'All',
      size: '1.5 MB'
    },
    {
      id: 18,
      title: 'Previous Year Paper Analysis',
      category: 'References',
      description: 'Topic-wise analysis of GATE papers from last 10 years with difficulty trends',
      type: 'pdf',
      downloads: 12400,
      views: 43000,
      rating: 4.9,
      branch: 'All',
      size: '2.3 MB'
    }
  ];

  const categories = ['all', ...new Set(resources.map(r => r.category))];

  // Filter resources
  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const downloadResource = (resourceTitle: string) => {
    console.log('Downloading resource:', resourceTitle);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Header */}
      <div className="bg-gradient-to-r from-primary/20 to-secondary/20 py-12 border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-foreground">GATE Resources</h1>
          <p className="text-lg text-muted-foreground">
            Curated, high-quality study materials and tools for effective GATE preparation
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-2">Total Resources</div>
              <div className="text-3xl font-bold">{resources.length}+</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-2">Categories</div>
              <div className="text-3xl font-bold">{categories.length - 1}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-2">Total Downloads</div>
              <div className="text-3xl font-bold">
                {(resources.reduce((a, r) => a + (r.downloads || 0), 0) / 1000).toFixed(0)}K
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-2">Avg Rating</div>
              <div className="text-3xl font-bold">
                {(resources.reduce((a, r) => a + (r.rating || 0), 0) / resources.length).toFixed(1)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filter */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex gap-4 flex-col sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-border rounded-lg bg-background text-foreground"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredResources.map((resource) => (
            <Card key={resource.id} className="hover:shadow-lg transition-shadow flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                    <CardDescription className="mt-2">{resource.description}</CardDescription>
                  </div>
                  <Badge variant="outline">{resource.category}</Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 flex-1">
                {/* Metadata */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Branch</p>
                    <p className="font-medium">{resource.branch}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Size</p>
                    <p className="font-medium">{resource.size}</p>
                  </div>
                </div>

                {/* Rating & Stats */}
                <div className="flex justify-between items-center pt-2 border-t">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{resource.rating}</span>
                  </div>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      {resource.downloads.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {resource.views.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  onClick={() => downloadResource(resource.title)}
                  className="w-full"
                >
                  {resource.type === 'tool' ? (
                    <>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open Tool
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No resources found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Information Section */}
        <Card className="mt-12 bg-blue-50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900">
          <CardHeader>
            <CardTitle className="text-blue-900 dark:text-blue-100">About These Resources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <p>
              All resources listed here are either official GATE materials or carefully curated by our team of experienced educators and toppers.
            </p>
            <p>
              The resources are organized by category for easy navigation and include study guides, cheatsheets, reference materials, and online tools to support your GATE preparation journey.
            </p>
            <p>
              Download counts and ratings reflect community engagement and usefulness of each resource. Higher ratings indicate more useful and widely adopted materials.
            </p>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Resources;
