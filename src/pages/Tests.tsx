import { useState } from 'react';
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
  XCircle,
  Trophy,
  BarChart3,
  Users,
  Calendar,
  Zap,
  Award,
  ChevronRight,
  Star
} from 'lucide-react';

interface MockTest {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  totalQuestions: number;
  totalMarks: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  subjects: string[];
  attempts: number;
  averageScore: number;
  bestScore?: number;
  lastAttempted?: string;
  isCompleted: boolean;
  timeLimit: string;
}

interface SpeedTest {
  id: string;
  title: string;
  subject: string;
  topic: string;
  duration: number; // in minutes
  totalQuestions: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  attempts: number;
  bestTime?: number; // in seconds
  bestScore?: number;
  averageAccuracy: number;
  isCompleted: boolean;
}

const Tests = () => {
  const { student } = useAuth();
  const [activeTab, setActiveTab] = useState('mock-tests');

  // Sample data - would come from API
  const mockTests: MockTest[] = [
    {
      id: '1',
      title: 'GATE 2024 Full Mock Test - Set 1',
      description: 'Complete GATE pattern test covering all subjects',
      duration: 180,
      totalQuestions: 65,
      totalMarks: 100,
      difficulty: 'Medium',
      subjects: ['Data Structures', 'Algorithms', 'OS', 'DBMS', 'Networks'],
      attempts: 1250,
      averageScore: 68,
      bestScore: 85,
      lastAttempted: '2024-01-15',
      isCompleted: true,
      timeLimit: '3 hours'
    },
    {
      id: '2',
      title: 'GATE 2024 Full Mock Test - Set 2',
      description: 'Advanced level mock test with recent pattern',
      duration: 180,
      totalQuestions: 65,
      totalMarks: 100,
      difficulty: 'Hard',
      subjects: ['TOC', 'Compiler Design', 'COA', 'Mathematics'],
      attempts: 890,
      averageScore: 62,
      isCompleted: false,
      timeLimit: '3 hours'
    },
    {
      id: '3',
      title: 'Subject-wise Mock Test - DSA',
      description: 'Focused test on Data Structures and Algorithms',
      duration: 90,
      totalQuestions: 30,
      totalMarks: 50,
      difficulty: 'Medium',
      subjects: ['Data Structures', 'Algorithms'],
      attempts: 2100,
      averageScore: 72,
      bestScore: 92,
      lastAttempted: '2024-01-12',
      isCompleted: true,
      timeLimit: '1.5 hours'
    }
  ];

  const speedTests: SpeedTest[] = [
    {
      id: '1',
      title: 'Quick Sort Implementation',
      subject: 'Data Structures',
      topic: 'Sorting Algorithms',
      duration: 15,
      totalQuestions: 10,
      difficulty: 'Easy',
      attempts: 3450,
      bestTime: 420, // 7 minutes
      bestScore: 90,
      averageAccuracy: 85,
      isCompleted: true
    },
    {
      id: '2',
      title: 'Binary Tree Traversals',
      subject: 'Data Structures',
      topic: 'Trees',
      duration: 20,
      totalQuestions: 15,
      difficulty: 'Medium',
      attempts: 2780,
      bestTime: 850, // 14.2 minutes
      bestScore: 87,
      averageAccuracy: 78,
      isCompleted: true
    },
    {
      id: '3',
      title: 'Dynamic Programming Basics',
      subject: 'Algorithms',
      topic: 'Dynamic Programming',
      duration: 25,
      totalQuestions: 12,
      difficulty: 'Hard',
      attempts: 1560,
      averageAccuracy: 65,
      isCompleted: false
    }
  ];

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

  const startMockTest = (testId: string) => {
    console.log('Starting mock test:', testId);
    // Navigate to test interface
  };

  const startSpeedTest = (testId: string) => {
    console.log('Starting speed test:', testId);
    // Navigate to speed test interface
  };

  const viewResults = (testId: string, type: 'mock' | 'speed') => {
    console.log('Viewing results for:', type, testId);
    // Navigate to results page
  };

  const testStats = {
    totalMockTests: mockTests.length,
    completedMockTests: mockTests.filter(t => t.isCompleted).length,
    totalSpeedTests: speedTests.length,
    completedSpeedTests: speedTests.filter(t => t.isCompleted).length,
    averageMockScore: Math.round(mockTests.filter(t => t.bestScore).reduce((acc, t) => acc + (t.bestScore || 0), 0) / mockTests.filter(t => t.bestScore).length),
    averageSpeedAccuracy: Math.round(speedTests.filter(t => t.bestScore).reduce((acc, t) => acc + (t.bestScore || 0), 0) / speedTests.filter(t => t.bestScore).length)
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
                  <p className="text-2xl font-bold">{testStats.completedMockTests}/{testStats.totalMockTests}</p>
                </div>
                <Target className="h-8 w-8 text-primary" />
              </div>
              <Progress value={(testStats.completedMockTests / testStats.totalMockTests) * 100} className="mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Speed Tests</p>
                  <p className="text-2xl font-bold">{testStats.completedSpeedTests}/{testStats.totalSpeedTests}</p>
                </div>
                <Zap className="h-8 w-8 text-yellow-500" />
              </div>
              <Progress value={(testStats.completedSpeedTests / testStats.totalSpeedTests) * 100} className="mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Mock Score</p>
                  <p className="text-2xl font-bold">{testStats.averageMockScore || 0}%</p>
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
                  <p className="text-2xl font-bold">{testStats.averageSpeedAccuracy || 0}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Test Sections */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="mock-tests">Mock Tests</TabsTrigger>
            <TabsTrigger value="speed-tests">Speed Tests</TabsTrigger>
          </TabsList>

          <TabsContent value="mock-tests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Full-Length Mock Tests
                </CardTitle>
                <CardDescription>
                  Complete GATE pattern tests with detailed analysis and performance tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {mockTests.map((test) => (
                    <Card key={test.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <CardTitle className="text-lg leading-tight">{test.title}</CardTitle>
                            <CardDescription className="mt-1">{test.description}</CardDescription>
                          </div>
                          {test.isCompleted && (
                            <CheckCircle className="h-5 w-5 text-green-500 ml-2 flex-shrink-0" />
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                          <Badge className={getDifficultyColor(test.difficulty)}>
                            {test.difficulty}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {test.timeLimit}
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
                        
                        <div className="flex flex-wrap gap-1">
                          {test.subjects.map((subject, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                        
                        {test.isCompleted && test.bestScore && (
                          <div className="bg-accent/50 p-3 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">Your Best Score</span>
                              <Badge variant="default">{test.bestScore}%</Badge>
                            </div>
                            <Progress value={test.bestScore} className="h-2" />
                            <p className="text-xs text-muted-foreground mt-1">
                              Last attempted: {test.lastAttempted}
                            </p>
                          </div>
                        )}
                        
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>{test.attempts.toLocaleString()} attempts</span>
                          <span>Avg: {test.averageScore}%</span>
                        </div>
                        
                        <div className="flex gap-2">
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
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {speedTests.map((test) => (
                    <Card key={test.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <CardTitle className="text-lg leading-tight">{test.title}</CardTitle>
                            <CardDescription className="mt-1">
                              {test.subject} • {test.topic}
                            </CardDescription>
                          </div>
                          {test.isCompleted && (
                            <CheckCircle className="h-5 w-5 text-green-500 ml-2 flex-shrink-0" />
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
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
                        
                        {test.isCompleted && test.bestScore && test.bestTime && (
                          <div className="bg-accent/50 p-3 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">Personal Best</span>
                              <div className="flex items-center gap-2">
                                <Badge variant="default">{test.bestScore}%</Badge>
                                <Badge variant="outline">{formatTime(test.bestTime)}</Badge>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-muted-foreground">Speed</span>
                              <span className="text-xs text-muted-foreground">Accuracy</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-1">
                              <Progress value={(test.duration * 60 - test.bestTime) / (test.duration * 60) * 100} className="h-2" />
                              <Progress value={test.bestScore} className="h-2" />
                            </div>
                          </div>
                        )}
                        
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>{test.attempts.toLocaleString()} attempts</span>
                          {test.bestTime && (
                            <span>Best: {formatTime(test.bestTime)}</span>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
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
                  {[
                    { name: 'Data Structures', tests: 12, icon: '🌳' },
                    { name: 'Algorithms', tests: 8, icon: '⚡' },
                    { name: 'Operating Systems', tests: 6, icon: '💻' },
                    { name: 'Database Systems', tests: 5, icon: '🗄️' }
                  ].map((category, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl mb-2">{category.icon}</div>
                        <h3 className="font-medium mb-1">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">{category.tests} speed tests</p>
                        <Button variant="ghost" size="sm" className="mt-2">
                          Explore <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
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
