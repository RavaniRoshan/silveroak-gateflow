import { useState, useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Target,
  Timer,
  TrendingUp,
  Clock,
  Play,
  CheckCircle,
  Trophy,
  BarChart3,
  Award,
  ChevronRight,
  Zap,
  Search
} from 'lucide-react';
import { mockTests, speedTests } from '@/data/mockData';
import { saveTestResult, getTestResults, getAllTestResults } from '@/lib/storage';

const Tests = () => {
  const { student } = useAuth();
  const [activeTab, setActiveTab] = useState('mock-tests');
  const [mockTestDifficulty, setMockTestDifficulty] = useState('all');
  const [speedTestSubject, setSpeedTestSubject] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Get all test results from localStorage
  const allResults = getAllTestResults();

  // Filter mock tests
  const filteredMockTests = useMemo(() => {
    return mockTests
      .filter(test => {
        const matchesDifficulty = mockTestDifficulty === 'all' || test.difficulty === mockTestDifficulty;
        const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesDifficulty && matchesSearch;
      })
      .map(test => {
        const testResults = getTestResults(test.id);
        return {
          ...test,
          results: testResults,
          isCompleted: testResults.length > 0,
          bestScore: testResults.length > 0 ? Math.max(...testResults.map(r => r.score)) : 0,
          averageScore: testResults.length > 0 ? Math.round(testResults.reduce((acc, r) => acc + r.score, 0) / testResults.length) : 0,
          attemptCount: testResults.length
        };
      });
  }, [mockTestDifficulty, searchQuery]);

  // Filter speed tests
  const filteredSpeedTests = useMemo(() => {
    return speedTests
      .filter(test => {
        const matchesSubject = speedTestSubject === 'all' || test.subject === speedTestSubject;
        const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSubject && matchesSearch;
      })
      .map(test => {
        const testResults = getTestResults(test.id);
        return {
          ...test,
          results: testResults,
          isCompleted: testResults.length > 0,
          bestScore: testResults.length > 0 ? Math.max(...testResults.map(r => r.score)) : 0,
          bestTime: testResults.length > 0 ? Math.min(...testResults.map(r => r.duration)) : 0,
          averageAccuracy: testResults.length > 0 ? Math.round(testResults.reduce((acc, r) => acc + r.accuracy, 0) / testResults.length) : 0,
          attemptCount: testResults.length
        };
      });
  }, [speedTestSubject, searchQuery]);

  // Calculate overall stats
  const stats = {
    totalMockTests: mockTests.length,
    completedMockTests: mockTests.filter(t => getTestResults(t.id).length > 0).length,
    totalSpeedTests: speedTests.length,
    completedSpeedTests: speedTests.filter(t => getTestResults(t.id).length > 0).length,
    averageMockScore: allResults.filter(r => {
      const test = mockTests.find(t => t.id === r.testId);
      return test && test.duration === 180;
    }).length > 0 ? Math.round(allResults.filter(r => {
      const test = mockTests.find(t => t.id === r.testId);
      return test && test.duration === 180;
    }).reduce((acc, r) => acc + r.score, 0) / allResults.filter(r => {
      const test = mockTests.find(t => t.id === r.testId);
      return test && test.duration === 180;
    }).length) : 0,
    averageSpeedAccuracy: allResults.filter(r => {
      const test = speedTests.find(t => t.id === r.testId);
      return test;
    }).length > 0 ? Math.round(allResults.filter(r => {
      const test = speedTests.find(t => t.id === r.testId);
      return test;
    }).reduce((acc, r) => acc + r.accuracy, 0) / allResults.filter(r => {
      const test = speedTests.find(t => t.id === r.testId);
      return test;
    }).length) : 0
  };

  // Get unique subjects for speed test filter
  const speedTestSubjects = ['all', ...new Set(speedTests.map(t => t.subject))];
  const mockTestDifficulties = ['all', 'Easy', 'Medium', 'Hard'];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const startMockTest = (testId: number) => {
    // Mock implementation: navigate to test interface
    console.log('Starting mock test:', testId);
  };

  const startSpeedTest = (testId: number) => {
    // Mock implementation: navigate to speed test interface
    console.log('Starting speed test:', testId);
  };

  const viewResults = (testId: number, type: 'mock' | 'speed') => {
    // Mock implementation: navigate to results page
    console.log('Viewing results for:', type, testId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Practice Tests
          </h1>
          <p className="text-muted-foreground">
            Improve your GATE preparation with mock tests and speed tests
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Mock Tests</p>
                  <p className="text-2xl font-bold">{stats.completedMockTests}/{stats.totalMockTests}</p>
                </div>
                <Target className="h-8 w-8 text-primary" />
              </div>
              <Progress value={(stats.completedMockTests / stats.totalMockTests) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Speed Tests</p>
                  <p className="text-2xl font-bold">{stats.completedSpeedTests}/{stats.totalSpeedTests}</p>
                </div>
                <Zap className="h-8 w-8 text-yellow-500" />
              </div>
              <Progress value={(stats.completedSpeedTests / stats.totalSpeedTests) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Mock Score</p>
                  <p className="text-2xl font-bold">{stats.averageMockScore}%</p>
                </div>
                <Trophy className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Speed Accuracy</p>
                  <p className="text-2xl font-bold">{stats.averageSpeedAccuracy}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Test Sections */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="mock-tests">Mock Tests ({mockTests.length})</TabsTrigger>
            <TabsTrigger value="speed-tests">Speed Tests ({speedTests.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="mock-tests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Full-Length Mock Tests
                </CardTitle>
                <CardDescription>
                  Complete GATE pattern tests (3 hours) with detailed analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search tests..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground"
                    />
                  </div>
                  <select
                    value={mockTestDifficulty}
                    onChange={(e) => setMockTestDifficulty(e.target.value)}
                    className="px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                  >
                    {mockTestDifficulties.map(diff => (
                      <option key={diff} value={diff}>
                        {diff === 'all' ? 'All Difficulties' : diff}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tests Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredMockTests.map((test) => (
                    <Card key={test.id} className="hover:shadow-lg transition-shadow flex flex-col">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <CardTitle className="text-lg leading-tight">{test.name}</CardTitle>
                            <CardDescription className="mt-1 text-xs">{test.description}</CardDescription>
                          </div>
                          {test.isCompleted && (
                            <CheckCircle className="h-5 w-5 text-green-500 ml-2 flex-shrink-0" />
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4 flex-1">
                        <div className="flex justify-between items-center">
                          <Badge className={getDifficultyColor(test.difficulty)}>
                            {test.difficulty}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {test.duration}m
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Questions</p>
                            <p className="font-medium">{test.totalQuestions}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Total Marks</p>
                            <p className="font-medium">{test.totalMarks}</p>
                          </div>
                        </div>

                        {test.isCompleted && (
                          <div className="bg-accent/50 p-3 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">Best Score</span>
                              <Badge variant="default">{test.bestScore}%</Badge>
                            </div>
                            <Progress value={test.bestScore} className="h-2" />
                            <div className="flex justify-between text-xs text-muted-foreground mt-2">
                              <span>Avg: {test.averageScore}%</span>
                              <span>{test.attemptCount} attempt{test.attemptCount !== 1 ? 's' : ''}</span>
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2 pt-2">
                          <Button
                            onClick={() => startMockTest(test.id)}
                            className="flex-1"
                            variant={test.isCompleted ? "outline" : "default"}
                          >
                            <Play className="h-4 w-4 mr-1" />
                            {test.isCompleted ? 'Retake' : 'Start Test'}
                          </Button>
                          {test.isCompleted && (
                            <Button
                              onClick={() => viewResults(test.id, 'mock')}
                              variant="ghost"
                              size="sm"
                            >
                              <BarChart3 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredMockTests.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No tests matching your filters</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="speed-tests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Speed Tests
                </CardTitle>
                <CardDescription>
                  Quick topic-wise tests to improve your speed and accuracy
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search speed tests..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground"
                    />
                  </div>
                  <select
                    value={speedTestSubject}
                    onChange={(e) => setSpeedTestSubject(e.target.value)}
                    className="px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                  >
                    {speedTestSubjects.map(subject => (
                      <option key={subject} value={subject}>
                        {subject === 'all' ? 'All Subjects' : subject}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tests Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredSpeedTests.map((test) => (
                    <Card key={test.id} className="hover:shadow-lg transition-shadow flex flex-col">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <CardTitle className="text-lg leading-tight">{test.name}</CardTitle>
                            <CardDescription className="mt-1">
                              {test.subject} • {test.topic}
                            </CardDescription>
                          </div>
                          {test.isCompleted && (
                            <CheckCircle className="h-5 w-5 text-green-500 ml-2 flex-shrink-0" />
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4 flex-1">
                        <div className="flex justify-between items-center">
                          <Badge className={getDifficultyColor(test.difficulty)}>
                            {test.difficulty}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Timer className="h-4 w-4" />
                            {test.duration} min
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Questions</p>
                            <p className="font-medium">{test.totalQuestions}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Accuracy</p>
                            <p className="font-medium">{test.averageAccuracy}%</p>
                          </div>
                        </div>

                        {test.isCompleted && (
                          <div className="bg-accent/50 p-3 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">Personal Best</span>
                              <div className="flex items-center gap-2">
                                <Badge variant="default">{test.bestScore}%</Badge>
                                <Badge variant="outline">{formatTime(test.bestTime)}</Badge>
                              </div>
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Speed: {test.attemptCount} attempt{test.attemptCount !== 1 ? 's' : ''}</span>
                              <span>{test.averageAccuracy}% avg</span>
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2 pt-2">
                          <Button
                            onClick={() => startSpeedTest(test.id)}
                            className="flex-1"
                            variant={test.isCompleted ? "outline" : "default"}
                          >
                            <Zap className="h-4 w-4 mr-1" />
                            {test.isCompleted ? 'Retry' : 'Start'}
                          </Button>
                          {test.isCompleted && (
                            <Button
                              onClick={() => viewResults(test.id, 'speed')}
                              variant="ghost"
                              size="sm"
                            >
                              <BarChart3 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredSpeedTests.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No tests matching your filters</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Speed Test Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Test Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {speedTestSubjects.filter(s => s !== 'all').map((subject, index) => {
                    const subjectCount = speedTests.filter(t => t.subject === subject).length;
                    return (
                      <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl mb-2">📋</div>
                          <h3 className="font-medium mb-1">{subject}</h3>
                          <p className="text-sm text-muted-foreground">{subjectCount} speed test{subjectCount !== 1 ? 's' : ''}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2"
                            onClick={() => setSpeedTestSubject(subject)}
                          >
                            Explore <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Tests;
