import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Search, Clock, Users, Play, Download, Bookmark } from 'lucide-react';
import { paqPapers } from '@/data/mockData';
import { saveBookmark, removeBookmark, getBookmarks } from '@/lib/storage';

const MockPapers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [bookmarkedPapers, setBookmarkedPapers] = useState<Set<number>>(
    new Set(getBookmarks('mockpaper'))
  );

  // Get unique years and branches
  const years = ['all', ...new Set(paqPapers.map(p => p.year.toString())).sort().reverse()];
  const branches = ['all', ...new Set(paqPapers.map(p => p.branch))];

  // Filter papers
  const filteredPapers = useMemo(() => {
    return paqPapers.filter(paper => {
      const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           paper.branch.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesYear = selectedYear === 'all' || paper.year.toString() === selectedYear;
      const matchesBranch = selectedBranch === 'all' || paper.branch === selectedBranch;
      return matchesSearch && matchesYear && matchesBranch;
    });
  }, [searchTerm, selectedYear, selectedBranch]);

  // Group by year
  const papersGroupedByYear = useMemo(() => {
    const grouped: Record<number, typeof paqPapers> = {};
    filteredPapers.forEach(paper => {
      if (!grouped[paper.year]) grouped[paper.year] = [];
      grouped[paper.year].push(paper);
    });
    return Object.entries(grouped).sort(([a], [b]) => Number(b) - Number(a));
  }, [filteredPapers]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleBookmark = (paperId: number) => {
    const newBookmarked = new Set(bookmarkedPapers);
    if (bookmarkedPapers.has(paperId)) {
      newBookmarked.delete(paperId);
      removeBookmark('mockpaper', paperId);
    } else {
      newBookmarked.add(paperId);
      saveBookmark('mockpaper', paperId);
    }
    setBookmarkedPapers(newBookmarked);
  };

  const takeMockTest = (paperId: number, title: string) => {
    console.log('Starting mock test:', title);
  };

  const downloadPaper = (paperId: number, title: string) => {
    console.log('Downloading paper:', title);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Header */}
      <div className="bg-gradient-to-r from-primary/20 to-secondary/20 py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold mb-4 text-foreground">GATE Mock Papers</h1>
            <p className="text-lg text-muted-foreground">
              Practice with 30+ authentic GATE question papers across all 5 branches from 2019-2024
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search papers by branch..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year === 'all' ? 'All Years' : year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {branches.map((branch) => (
                      <SelectItem key={branch} value={branch}>
                        {branch === 'all' ? 'All Branches' : branch}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="text-sm text-muted-foreground flex items-center">
                  Total: {filteredPapers.length} papers
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-2">Total Papers</div>
              <div className="text-3xl font-bold">{paqPapers.length}+</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-2">Branches</div>
              <div className="text-3xl font-bold">{branches.length - 1}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-2">Years Covered</div>
              <div className="text-3xl font-bold">{years.length - 1}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-2">Bookmarked</div>
              <div className="text-3xl font-bold">{bookmarkedPapers.size}</div>
            </CardContent>
          </Card>
        </div>

        {/* Papers Grouped by Year */}
        <div className="space-y-10">
          {papersGroupedByYear.length > 0 ? (
            papersGroupedByYear.map(([year, papers]) => (
              <section key={year} className="space-y-4">
                <div className="flex items-center justify-between sticky top-0 bg-background py-2 border-b">
                  <h2 className="text-2xl font-bold text-foreground">{year} Papers</h2>
                  <Badge variant="secondary">{papers.length} papers</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {papers.map((paper) => (
                    <Card key={paper.id} className="hover:shadow-lg transition-shadow flex flex-col">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary" />
                            <Badge variant="outline" className="text-xs">{paper.year}</Badge>
                          </div>
                          <Badge className={getDifficultyColor(paper.difficulty)}>
                            {paper.difficulty}
                          </Badge>
                        </div>

                        <CardTitle className="text-lg leading-tight">{paper.title}</CardTitle>
                        <CardDescription className="mt-2">
                          Branch: {paper.branch}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4 flex-1">
                        {/* Paper Stats */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>180 min</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span>65 Questions</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{(paper.downloadCount || 0).toLocaleString()} downloads</span>
                          </div>
                          <div className="text-muted-foreground">
                            100 Marks
                          </div>
                        </div>

                        {/* Topics */}
                        {paper.topic && (
                          <div className="flex flex-wrap gap-1">
                            {paper.topic.split(',').slice(0, 3).map((t, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {t.trim()}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-2">
                          <Button
                            onClick={() => takeMockTest(paper.id, paper.title)}
                            className="flex-1"
                            size="sm"
                          >
                            <Play className="h-4 w-4 mr-2" />
                            Take Test
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleBookmark(paper.id)}
                            className={bookmarkedPapers.has(paper.id) ? 'text-yellow-500' : ''}
                          >
                            <Bookmark className={`h-4 w-4 ${bookmarkedPapers.has(paper.id) ? 'fill-current' : ''}`} />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => downloadPaper(paper.id, paper.title)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            ))
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No papers found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-primary/5 rounded-lg p-6 border border-primary/10">
          <h3 className="text-lg font-semibold text-primary mb-2">About GATE Mock Papers</h3>
          <p className="text-foreground/80 text-sm leading-relaxed">
            Practice with authentic GATE question papers from the last 6 years across all 5 branches (CS, ME, EE, EC, CE).
            Each paper is designed to simulate the actual exam environment with accurate timing, marking scheme, and difficulty level.
            All solutions are provided with detailed explanations. Bookmark papers for quick access and track your progress.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MockPapers;
