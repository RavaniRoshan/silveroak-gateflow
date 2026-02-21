import { useState, useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Video,
  FileText,
  Download,
  Play,
  BookOpen,
  ExternalLink,
  Clock,
  Star,
  Search,
  Filter,
  Eye,
  Bookmark,
  Share2
} from 'lucide-react';
import { studyResources } from '@/data/mockData';
import { saveBookmark, removeBookmark, getBookmarks, isBookmarked } from '@/lib/storage';

const StudyResources = () => {
  const { student } = useAuth();
  const [activeTab, setActiveTab] = useState('lectures');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [resourceType, setResourceType] = useState('all');
  const [bookmarkedResources, setBookmarkedResources] = useState<Set<number>>(
    new Set(getBookmarks('resource'))
  );

  // Separate resources by type
  const lectures = studyResources.filter(r => r.type === 'lecture');
  const documents = studyResources.filter(r => r.type === 'document');
  const notes = studyResources.filter(r => r.type === 'notes');

  // Get unique subjects
  const subjects = ['all', ...new Set(studyResources.map(r => r.branch).filter(Boolean))];

  // Filter lectures
  const filteredLectures = useMemo(() => {
    return lectures.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.instructor?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSubject = selectedSubject === 'all' || resource.branch === selectedSubject;
      return matchesSearch && matchesSubject;
    });
  }, [searchTerm, selectedSubject]);

  // Filter documents
  const filteredDocuments = useMemo(() => {
    return documents.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSubject = selectedSubject === 'all' || resource.branch === selectedSubject;
      return matchesSearch && matchesSubject;
    });
  }, [searchTerm, selectedSubject]);

  // Filter notes
  const filteredNotes = useMemo(() => {
    return notes.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSubject = selectedSubject === 'all' || resource.branch === selectedSubject;
      return matchesSearch && matchesSubject;
    });
  }, [searchTerm, selectedSubject]);

  const toggleBookmark = (resourceId: number) => {
    const newBookmarked = new Set(bookmarkedResources);
    if (bookmarkedResources.has(resourceId)) {
      newBookmarked.delete(resourceId);
      removeBookmark('resource', resourceId);
    } else {
      newBookmarked.add(resourceId);
      saveBookmark('resource', resourceId);
    }
    setBookmarkedResources(newBookmarked);
  };

  const downloadResource = (resourceId: number, resourceTitle: string) => {
    console.log('Downloading resource:', resourceTitle);
  };

  const playLecture = (resourceId: number, resourceTitle: string) => {
    console.log('Playing lecture:', resourceTitle);
  };

  // Calculate stats
  const stats = {
    totalLectures: lectures.length,
    totalDocuments: documents.length,
    totalNotes: notes.length,
    totalResources: studyResources.length,
    totalWatchTime: Math.round(lectures.reduce((acc, l) => acc + (l.duration || 0), 0) / 60)
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Study Resources
          </h1>
          <p className="text-muted-foreground">
            Access 50+ video lectures, official documents, and peer notes
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Video Lectures</p>
                  <p className="text-2xl font-bold">{stats.totalLectures}</p>
                </div>
                <Video className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Documents</p>
                  <p className="text-2xl font-bold">{stats.totalDocuments}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Notes</p>
                  <p className="text-2xl font-bold">{stats.totalNotes}</p>
                </div>
                <BookOpen className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Resources</p>
                  <p className="text-2xl font-bold">{stats.totalResources}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search resources..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label>Branch/Subject</Label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Branches" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map(subject => (
                      <SelectItem key={subject} value={subject}>
                        {subject === 'all' ? 'All Branches' : subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button variant="outline" className="w-full">
                  <Filter className="h-4 w-4 mr-2" />
                  Apply Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="lectures">Lectures ({stats.totalLectures})</TabsTrigger>
            <TabsTrigger value="documents">Documents ({stats.totalDocuments})</TabsTrigger>
            <TabsTrigger value="notes">Notes ({stats.totalNotes})</TabsTrigger>
          </TabsList>

          <TabsContent value="lectures" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredLectures.map((resource) => (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="relative mb-3">
                      <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                        <Play className="h-12 w-12 text-primary" />
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        {resource.duration}m
                      </div>
                    </div>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                        <CardDescription className="mt-1">
                          by {resource.instructor}
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleBookmark(resource.id)}
                        className={bookmarkedResources.has(resource.id) ? 'text-yellow-500' : 'text-muted-foreground'}
                      >
                        <Bookmark className={`h-4 w-4 ${bookmarkedResources.has(resource.id) ? 'fill-current' : ''}`} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-1">
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">{resource.difficulty || 'Intermediate'}</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm">{resource.rating}</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {resource.description}
                    </p>

                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{resource.views?.toLocaleString()} views</span>
                      <span>{new Date(resource.uploadedDate).toLocaleDateString()}</span>
                    </div>

                    <Button onClick={() => playLecture(resource.id, resource.title)} className="w-full">
                      <Play className="h-4 w-4 mr-2" />
                      Watch Lecture
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            {filteredLectures.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No lectures matching your filters</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredDocuments.map((resource) => (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        <CardDescription>{resource.branch} • {resource.category}</CardDescription>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">Document</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-1">
                    <p className="text-sm text-muted-foreground">
                      {resource.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">PDF</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm">{resource.rating}</span>
                      </div>
                    </div>

                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{resource.downloads?.toLocaleString()} downloads</span>
                      <span>{new Date(resource.uploadedDate).toLocaleDateString()}</span>
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={() => downloadResource(resource.id, resource.title)} className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {filteredDocuments.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No documents matching your filters</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="notes" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredNotes.map((resource) => (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        <CardDescription>{resource.branch}</CardDescription>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Notes</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-1">
                    <p className="text-sm text-muted-foreground">
                      {resource.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">PDF</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm">{resource.rating}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        {resource.downloads?.toLocaleString()} downloads
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {resource.views?.toLocaleString()} views
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={() => downloadResource(resource.id, resource.title)} className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {filteredNotes.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No notes matching your filters</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default StudyResources;
