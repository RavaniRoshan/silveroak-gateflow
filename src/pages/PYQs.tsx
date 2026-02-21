import { useState, useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  FileText,
  Download,
  Eye,
  Search,
  Filter,
  Clock,
  Star,
  Bookmark,
  Calendar,
  BookOpen,
  TrendingUp
} from 'lucide-react';
import { paqPapers } from '@/data/mockData';
import { saveBookmark, removeBookmark, getBookmarks, isBookmarked } from '@/lib/storage';

interface PYQPaper {
  id: number;
  branch: string;
  year: number;
  topic: string;
  title: string;
  totalQuestions: number;
  markingScheme: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  session: string;
  syllabus: string[];
  bookmark: boolean;
  downloadCount: number;
}

const PYQs = () => {
  const { student } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'year' | 'downloads' | 'difficulty'>('year');
  const [bookmarkedPapers, setBookmarkedPapers] = useState<Set<number>>(
    new Set(getBookmarks('pyq'))
  );

  // Get unique branches, years from mockData
  const branches = useMemo(() => [...new Set(paqPapers.map(p => p.branch))].sort(), []);
  const years = useMemo(() => [...new Set(paqPapers.map(p => p.year))].sort((a, b) => b - a), []);

  const filteredPapers = useMemo(() => {
    return paqPapers
      .filter(paper => {
        const matchesSearch =
          paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          paper.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
          paper.branch.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesBranch = selectedBranch === 'all' || paper.branch === selectedBranch;
        const matchesYear = selectedYear === 'all' || paper.year.toString() === selectedYear;
        const matchesDifficulty = selectedDifficulty === 'all' || paper.difficulty === selectedDifficulty;

        return matchesSearch && matchesBranch && matchesYear && matchesDifficulty;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'year':
            return b.year - a.year;
          case 'downloads':
            return b.downloadCount - a.downloadCount;
          case 'difficulty': {
            const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
            return difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty];
          }
          default:
            return 0;
        }
      });
  }, [searchTerm, selectedBranch, selectedYear, selectedDifficulty, sortBy]);

  const toggleBookmark = (paperId: number) => {
    const isCurrentlyBookmarked = bookmarkedPapers.has(paperId);
    const newBookmarked = new Set(bookmarkedPapers);

    if (isCurrentlyBookmarked) {
      newBookmarked.delete(paperId);
      removeBookmark('pyq', paperId);
    } else {
      newBookmarked.add(paperId);
      saveBookmark('pyq', paperId);
    }

    setBookmarkedPapers(newBookmarked);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBranchIcon = (branch: string) => {
    const icons: Record<string, string> = {
      'CS': '💻',
      'ME': '⚙️',
      'EE': '⚡',
      'EC': '🔌',
      'CE': '🏗️'
    };
    return icons[branch] || '📄';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Previous Year Questions (PYQs)
          </h1>
          <p className="text-muted-foreground">
            Access 30+ GATE papers across all 5 branches (CS, ME, EE, EC, CE) from 2019-2024
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Papers</p>
                  <p className="text-2xl font-bold">{paqPapers.length}</p>
                </div>
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Branches</p>
                  <p className="text-2xl font-bold">{branches.length}</p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Bookmarked</p>
                  <p className="text-2xl font-bold">{bookmarkedPapers.size}</p>
                </div>
                <Bookmark className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Downloads</p>
                  <p className="text-2xl font-bold">{paqPapers.reduce((sum, p) => sum + p.downloadCount, 0).toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="lg:col-span-2">
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search papers, topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label>Branch</Label>
                <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Branches" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Branches</SelectItem>
                    {branches.map(branch => (
                      <SelectItem key={branch} value={branch}>
                        {branch}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Year</Label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Years" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    {years.map(year => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
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
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Sort By</Label>
                <Select value={sortBy} onValueChange={(value: 'year' | 'downloads' | 'difficulty') => setSortBy(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="year">Year</SelectItem>
                    <SelectItem value="downloads">Downloads</SelectItem>
                    <SelectItem value="difficulty">Difficulty</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Papers Grid/List */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {filteredPapers.length} Papers Found
            </h2>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                Grid
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                List
              </Button>
            </div>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPapers.map((paper) => (
                <Card key={paper.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{getBranchIcon(paper.branch)}</span>
                        <div>
                          <CardTitle className="text-lg">{paper.branch} {paper.year}</CardTitle>
                          <CardDescription>{paper.topic}</CardDescription>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleBookmark(paper.id)}
                        className={bookmarkedPapers.has(paper.id) ? 'text-yellow-500' : 'text-muted-foreground'}
                      >
                        {bookmarkedPapers.has(paper.id) ? <Star className="h-4 w-4 fill-current" /> : <Star className="h-4 w-4" />}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Badge className={getDifficultyColor(paper.difficulty)}>
                          {paper.difficulty}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          3 hours
                        </div>
                      </div>

                      <div className="text-xs space-y-1">
                        <p className="text-muted-foreground">{paper.totalQuestions} questions • {paper.markingScheme}</p>
                        <p className="text-muted-foreground">{paper.downloadCount.toLocaleString()} downloads</p>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPapers.map((paper) => (
                <Card key={paper.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl">{getBranchIcon(paper.branch)}</span>
                        <div>
                          <h3 className="font-semibold">{paper.branch} {paper.year} - {paper.topic}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getDifficultyColor(paper.difficulty)}>
                              {paper.difficulty}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{paper.totalQuestions} questions</span>
                            <span className="text-sm text-muted-foreground">{paper.downloadCount.toLocaleString()} downloads</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleBookmark(paper.id)}
                          className={bookmarkedPapers.has(paper.id) ? 'text-yellow-500' : 'text-muted-foreground'}
                        >
                          {bookmarkedPapers.has(paper.id) ? <Star className="h-4 w-4 fill-current" /> : <Star className="h-4 w-4" />}
                        </Button>
                        <Button size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PYQs;
