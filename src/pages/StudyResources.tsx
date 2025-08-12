import { useState } from 'react';
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
  Pause,
  BookOpen,
  ExternalLink,
  Clock,
  User,
  Star,
  Search,
  Filter,
  Upload,
  Eye,
  ThumbsUp,
  MessageSquare,
  Bookmark,
  Share2
} from 'lucide-react';

interface Lecture {
  id: string;
  title: string;
  instructor: string;
  subject: string;
  topic: string;
  duration: number; // in minutes
  watchTime: number; // watched time in minutes
  thumbnail: string;
  uploadDate: string;
  views: number;
  rating: number;
  isBookmarked: boolean;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface StudyMaterial {
  id: string;
  title: string;
  type: 'PDF' | 'DOC' | 'PPT' | 'Link';
  subject: string;
  topic: string;
  uploadedBy: string;
  uploadDate: string;
  downloads: number;
  rating: number;
  fileSize?: string;
  description: string;
  isOfficial: boolean;
}

interface Note {
  id: string;
  title: string;
  author: string;
  subject: string;
  topic: string;
  uploadDate: string;
  downloads: number;
  rating: number;
  views: number;
  fileType: 'PDF' | 'DOC';
  fileSize: string;
  description: string;
  isVerified: boolean; // verified by mentor
  tags: string[];
}

const StudyResources = () => {
  const { student } = useAuth();
  const [activeTab, setActiveTab] = useState('lectures');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  // Sample data - would come from API
  const lectures: Lecture[] = [
    {
      id: '1',
      title: 'Dynamic Programming: From Basics to Advanced',
      instructor: 'Prof. Sarah Johnson',
      subject: 'Algorithms',
      topic: 'Dynamic Programming',
      duration: 45,
      watchTime: 30,
      thumbnail: '/thumbnails/dp-lecture.jpg',
      uploadDate: '2024-01-10',
      views: 2340,
      rating: 4.8,
      isBookmarked: true,
      description: 'Comprehensive introduction to dynamic programming with practical examples and problem-solving techniques.',
      difficulty: 'Intermediate'
    },
    {
      id: '2',
      title: 'Graph Algorithms Masterclass',
      instructor: 'Dr. Michael Chen',
      subject: 'Algorithms',
      topic: 'Graph Theory',
      duration: 52,
      watchTime: 52,
      thumbnail: '/thumbnails/graph-lecture.jpg',
      uploadDate: '2024-01-08',
      views: 1890,
      rating: 4.9,
      isBookmarked: false,
      description: 'Complete coverage of graph algorithms including BFS, DFS, shortest path, and minimum spanning trees.',
      difficulty: 'Advanced'
    },
    {
      id: '3',
      title: 'Database Normalization Explained',
      instructor: 'Prof. Emily Wilson',
      subject: 'Database Systems',
      topic: 'Normalization',
      duration: 38,
      watchTime: 15,
      thumbnail: '/thumbnails/db-lecture.jpg',
      uploadDate: '2024-01-05',
      views: 1560,
      rating: 4.7,
      isBookmarked: true,
      description: 'Step-by-step guide to database normalization forms with practical examples.',
      difficulty: 'Beginner'
    }
  ];

  const officialResources: StudyMaterial[] = [
    {
      id: '1',
      title: 'GATE 2024 Official Syllabus',
      type: 'PDF',
      subject: 'General',
      topic: 'Syllabus',
      uploadedBy: 'GATE Official',
      uploadDate: '2023-09-15',
      downloads: 15420,
      rating: 5.0,
      fileSize: '2.3 MB',
      description: 'Complete official syllabus for GATE 2024 examination covering all subjects.',
      isOfficial: true
    },
    {
      id: '2',
      title: 'GATE Mathematical Foundation',
      type: 'PDF',
      subject: 'Mathematics',
      topic: 'Foundation',
      uploadedBy: 'GATE Official',
      uploadDate: '2023-10-01',
      downloads: 8940,
      rating: 4.8,
      fileSize: '5.7 MB',
      description: 'Essential mathematical concepts and formulas for GATE preparation.',
      isOfficial: true
    },
    {
      id: '3',
      title: 'Previous Year Analysis Report',
      type: 'PDF',
      subject: 'General',
      topic: 'Analysis',
      uploadedBy: 'GATE Official',
      uploadDate: '2023-11-20',
      downloads: 6780,
      rating: 4.9,
      fileSize: '12.4 MB',
      description: 'Detailed analysis of previous year questions and marking patterns.',
      isOfficial: true
    }
  ];

  const collegeNotes: Note[] = [
    {
      id: '1',
      title: 'Data Structures Complete Notes',
      author: 'Rahul Sharma (Final Year)',
      subject: 'Data Structures',
      topic: 'Complete Course',
      uploadDate: '2024-01-12',
      downloads: 450,
      rating: 4.6,
      views: 1200,
      fileType: 'PDF',
      fileSize: '8.2 MB',
      description: 'Comprehensive notes covering all data structures with examples and code implementations.',
      isVerified: true,
      tags: ['Arrays', 'Linked Lists', 'Trees', 'Graphs', 'Hashing']
    },
    {
      id: '2',
      title: 'Operating Systems Quick Reference',
      author: 'Priya Patel (Mentor)',
      subject: 'Operating Systems',
      topic: 'Quick Reference',
      uploadDate: '2024-01-10',
      downloads: 320,
      rating: 4.8,
      views: 890,
      fileType: 'PDF',
      fileSize: '4.5 MB',
      description: 'Concise notes perfect for last-minute revision with important formulas and concepts.',
      isVerified: true,
      tags: ['Process Management', 'Memory Management', 'File Systems', 'Synchronization']
    },
    {
      id: '3',
      title: 'DBMS Transaction Management',
      author: 'Amit Kumar (Alumni)',
      subject: 'Database Systems',
      topic: 'Transactions',
      uploadDate: '2024-01-08',
      downloads: 280,
      rating: 4.4,
      views: 650,
      fileType: 'PDF',
      fileSize: '3.1 MB',
      description: 'Detailed explanation of transaction management, ACID properties, and concurrency control.',
      isVerified: false,
      tags: ['ACID', 'Concurrency Control', 'Recovery', 'Locking']
    }
  ];

  const subjects = ['Data Structures', 'Algorithms', 'Operating Systems', 'Database Systems', 'Computer Networks', 'Mathematics'];

  const filteredLectures = lectures.filter(lecture => {
    const matchesSearch = lecture.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lecture.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || lecture.subject === selectedSubject;
    const matchesDifficulty = selectedDifficulty === 'all' || lecture.difficulty === selectedDifficulty;
    return matchesSearch && matchesSubject && matchesDifficulty;
  });

  const playLecture = (lectureId: string) => {
    console.log('Playing lecture:', lectureId);
  };

  const downloadResource = (resourceId: string) => {
    console.log('Downloading resource:', resourceId);
  };

  const toggleBookmark = (lectureId: string) => {
    console.log('Toggling bookmark for lecture:', lectureId);
  };

  const uploadNote = () => {
    console.log('Opening upload dialog');
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
            Access recorded lectures, official GATE resources, and peer-contributed notes
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Video Lectures</p>
                  <p className="text-2xl font-bold">{lectures.length}</p>
                </div>
                <Video className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Official Resources</p>
                  <p className="text-2xl font-bold">{officialResources.length}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">College Notes</p>
                  <p className="text-2xl font-bold">{collegeNotes.length}</p>
                </div>
                <BookOpen className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Watch Time</p>
                  <p className="text-2xl font-bold">{Math.round(lectures.reduce((acc, l) => acc + l.watchTime, 0) / 60)}h</p>
                </div>
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                <Label>Subject</Label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Subjects" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    {subjects.map(subject => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Difficulty</Label>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
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
            <TabsTrigger value="lectures">Recorded Lectures</TabsTrigger>
            <TabsTrigger value="official">GATE Resources</TabsTrigger>
            <TabsTrigger value="notes">College Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="lectures" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredLectures.map((lecture) => (
                <Card key={lecture.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="relative">
                      <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center mb-3">
                        <Play className="h-12 w-12 text-primary" />
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        {lecture.duration}m
                      </div>
                    </div>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg leading-tight">{lecture.title}</CardTitle>
                        <CardDescription className="mt-1">
                          by {lecture.instructor}
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleBookmark(lecture.id)}
                        className={lecture.isBookmarked ? 'text-yellow-500' : 'text-muted-foreground'}
                      >
                        <Bookmark className={`h-4 w-4 ${lecture.isBookmarked ? 'fill-current' : ''}`} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">{lecture.difficulty}</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm">{lecture.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {lecture.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{Math.round((lecture.watchTime / lecture.duration) * 100)}%</span>
                      </div>
                      <Progress value={(lecture.watchTime / lecture.duration) * 100} />
                    </div>
                    
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{lecture.views.toLocaleString()} views</span>
                      <span>{lecture.uploadDate}</span>
                    </div>
                    
                    <Button onClick={() => playLecture(lecture.id)} className="w-full">
                      <Play className="h-4 w-4 mr-2" />
                      {lecture.watchTime > 0 ? 'Continue Watching' : 'Start Watching'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="official" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {officialResources.map((resource) => (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        <CardDescription>Official GATE Resource</CardDescription>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">Official</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {resource.description}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">{resource.type}</span>
                        {resource.fileSize && (
                          <span className="text-sm text-muted-foreground">• {resource.fileSize}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm">{resource.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{resource.downloads.toLocaleString()} downloads</span>
                      <span>{resource.uploadDate}</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button onClick={() => downloadResource(resource.id)} className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="notes" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">College Notes from Peers & Mentors</h2>
              <Button onClick={uploadNote}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Notes
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {collegeNotes.map((note) => (
                <Card key={note.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{note.title}</CardTitle>
                        <CardDescription>
                          by {note.author}
                        </CardDescription>
                      </div>
                      {note.isVerified && (
                        <Badge className="bg-green-100 text-green-800">Verified</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {note.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1">
                      {note.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">{note.fileType}</span>
                        <span className="text-sm text-muted-foreground">• {note.fileSize}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm">{note.rating}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        {note.downloads} downloads
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {note.views} views
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button onClick={() => downloadResource(note.id)} className="flex-1">
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
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default StudyResources;
