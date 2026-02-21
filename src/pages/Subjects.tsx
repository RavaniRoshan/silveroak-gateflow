import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Search, Users, Grid3x3, List } from 'lucide-react';
import { subjectsData } from '@/data/mockData';

const Subjects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [expandedSubject, setExpandedSubject] = useState<number | null>(null);

  // Filter subjects
  const filteredSubjects = useMemo(() => {
    return subjectsData.filter(subject => {
      return subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
             subject.topics?.some(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()));
    });
  }, [searchTerm]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate stats
  const totalTopics = subjectsData.reduce((acc, s) => acc + (s.topics?.length || 0), 0);
  const totalResources = subjectsData.reduce((acc, s) => acc + (s.enrolledStudents || 0), 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Header */}
      <div className="bg-gradient-to-r from-primary/20 to-secondary/20 py-12 border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-foreground">GATE Subjects</h1>
          <p className="text-lg text-muted-foreground">
            Master 8 engineering subjects with 40+ topics each
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-2">Total Subjects</div>
              <div className="text-3xl font-bold">{subjectsData.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-2">Total Topics</div>
              <div className="text-3xl font-bold">{totalTopics}+</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-2">Students Enrolled</div>
              <div className="text-3xl font-bold">{(totalResources / 1000).toFixed(1)}K</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-2">Coverage</div>
              <div className="text-3xl font-bold">100%</div>
            </CardContent>
          </Card>
        </div>

        {/* Search & View Toggle */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex gap-4 flex-col sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search subjects or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subjects Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubjects.map((subject) => (
              <Card key={subject.id} className="hover:shadow-lg transition-shadow flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-3xl">{subject.icon}</div>
                    <Badge className={getDifficultyColor(subject.difficulty)}>
                      {subject.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{subject.name}</CardTitle>
                  <CardDescription>{subject.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 flex-1">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground whitespace-nowrap">Topics</p>
                      <p className="text-2xl font-bold">{subject.topics?.length || 40}+</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground whitespace-nowrap">Enrolled</p>
                      <p className="text-2xl font-bold">{(subject.enrolledStudents / 1000).toFixed(1)}K</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{subject.completionPercentage}%</span>
                    </div>
                    <Progress value={subject.completionPercentage} />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => setExpandedSubject(expandedSubject === subject.id ? null : subject.id)}
                    >
                      {expandedSubject === subject.id ? 'Hide' : 'Show'} Topics
                    </Button>
                    <Button size="sm" className="flex-1">
                      Enroll
                    </Button>
                  </div>

                  {expandedSubject === subject.id && (
                    <div className="pt-4 border-t space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground">Topics:</p>
                      <div className="space-y-1">
                        {subject.topics?.slice(0, 5).map((topic, idx) => (
                          <div key={idx} className="text-xs p-2 bg-accent rounded">
                            {topic.name}
                          </div>
                        ))}
                        {(subject.topics?.length || 0) > 5 && (
                          <div className="text-xs text-muted-foreground p-2">
                            +{(subject.topics?.length || 0) - 5} more topics
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSubjects.map((subject) => (
              <Card key={subject.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{subject.icon}</span>
                        <div>
                          <h3 className="text-lg font-semibold">{subject.name}</h3>
                          <p className="text-sm text-muted-foreground">{subject.description}</p>
                        </div>
                      </div>
                      <div className="flex gap-4 mt-3">
                        <Badge variant="outline">{subject.topics?.length || 40}+ Topics</Badge>
                        <Badge variant="outline">{(subject.enrolledStudents / 1000).toFixed(1)}K Enrolled</Badge>
                        <Badge className={getDifficultyColor(subject.difficulty)}>
                          {subject.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline">View</Button>
                      <Button>Enroll</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredSubjects.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No subjects found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Subjects;
