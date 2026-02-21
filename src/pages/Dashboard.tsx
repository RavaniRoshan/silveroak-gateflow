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
  BookOpen,
  Clock,
  Trophy,
  TrendingUp,
  Users,
  Calendar,
  FileText,
  Video,
  Star,
  Download,
  Play,
  Timer,
  Target,
  Award,
  Bell,
  GraduationCap,
  Flame
} from 'lucide-react';
import {
  studentStats,
  recentTests,
  upcomingTests,
  notificationsData,
  leaderboardData,
  studyResources,
  mockTests
} from '@/data/mockData';

const Dashboard = () => {
  const { student } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const quickStats = {
    totalTests: 42,
    completedTests: 12,
    averageScore: Math.round(studentStats.accuracy),
    studyHours: 156,
    rank: studentStats.currentRank,
    totalStudents: 8900,
    streak: studentStats.streakDays,
    resourcesViewed: studentStats.resourcesViewed
  };

  // Get recent test results from mock data
  const recentTestsData = recentTests.slice(0, 3);

  // Get upcoming tests from mock data
  const upcomingTestsData = upcomingTests.slice(0, 3);

  // Get recent notifications
  const notificationsDisplay = notificationsData.slice(0, 3);

  // Get top leaderboard
  const topLeaderboard = leaderboardData.slice(0, 5);

  // Get recent lectures
  const recentLectures = studyResources
    .filter((r) => r.type === 'lecture')
    .slice(0, 3)
    .map((r) => ({
      id: r.id,
      title: r.title,
      instructor: r.instructor || 'Instructor',
      duration: `${r.duration}m`,
      watched: Math.round((r.views / r.downloads) * 100 * Math.random())
    }));

  // Get study materials
  const studyMaterials = studyResources
    .filter((r) => r.type === 'document')
    .slice(0, 3)
    .map((r) => ({
      id: r.id,
      title: r.title,
      type: 'PDF',
      downloads: r.downloads
    }));

  // Alumni data (example)
  const alumni = [
    { id: 1, name: 'Arjun Singh', year: '2023', rank: 'AIR 45', company: 'Google', branch: 'CS' },
    { id: 2, name: 'Priya Sharma', year: '2022', rank: 'AIR 23', company: 'Microsoft', branch: 'CS' },
    { id: 3, name: 'Rohit Kumar', year: '2021', rank: 'AIR 67', company: 'Amazon', branch: 'ME' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {student?.first_name}!
          </h1>
          <p className="text-muted-foreground">
            Continue your GATE preparation journey for {student?.department?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tests Completed</p>
                  <p className="text-2xl font-bold">{quickStats.completedTests}/{quickStats.totalTests}</p>
                </div>
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <Progress value={(quickStats.completedTests / quickStats.totalTests) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                  <p className="text-2xl font-bold">{quickStats.averageScore}%</p>
                </div>
                <Trophy className="h-8 w-8 text-yellow-500" />
              </div>
              <Progress value={quickStats.averageScore} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Current Rank</p>
                  <p className="text-2xl font-bold">#{quickStats.rank}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Out of {quickStats.totalStudents.toLocaleString()} students</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Study Streak</p>
                  <p className="text-2xl font-bold">{quickStats.streak} days</p>
                </div>
                <Flame className="h-8 w-8 text-orange-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Keep it going!</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-card border border-border text-foreground">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="tests"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200"
            >
              Tests
            </TabsTrigger>
            <TabsTrigger
              value="pyqs"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200"
            >
              PYQs
            </TabsTrigger>
            <TabsTrigger
              value="resources"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200"
            >
              Resources
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="alumni"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200"
            >
              Alumni
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Test Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Recent Test Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTestsData.map((test) => (
                      <div key={test.id} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{test.name}</p>
                          <p className="text-xs text-muted-foreground">{new Date(test.attemptDate).toLocaleDateString()}</p>
                        </div>
                        <Badge variant={test.score >= 70 ? "default" : "secondary"}>
                          {test.score}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">View All Results</Button>
                </CardContent>
              </Card>

              {/* Upcoming Tests */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Upcoming Tests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingTestsData.map((test) => (
                      <div key={test.id} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{test.name}</p>
                          <p className="text-xs text-muted-foreground">{new Date(test.date).toLocaleDateString()}</p>
                        </div>
                        <Badge variant="outline">Scheduled</Badge>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">View Calendar</Button>
                </CardContent>
              </Card>
            </div>

            {/* Leaderboard & Notifications */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Performers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Top Performers This Week
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topLeaderboard.map((student, idx) => (
                      <div key={student.rank} className="flex items-center justify-between p-2 bg-accent/30 rounded">
                        <div className="flex items-center gap-3 flex-1">
                          <Badge className="bg-primary min-w-fit">#{student.rank}</Badge>
                          <div>
                            <p className="font-medium text-sm">{student.name}</p>
                            <p className="text-xs text-muted-foreground">{student.branch}</p>
                          </div>
                        </div>
                        <span className="font-bold text-sm">{student.score}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Notifications & Announcements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Recent Announcements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notificationsDisplay.map((notification) => (
                      <div key={notification.id} className="flex items-start gap-3 p-3 bg-accent/50 rounded-lg border-l-4 border-primary">
                        <Bell className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{notification.title}</p>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {new Date(notification.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tests">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Full Mock Tests
                  </CardTitle>
                  <CardDescription>Complete 3-hour GATE pattern tests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {mockTests.slice(0, 6).map((test) => (
                      <div key={test.id} className="p-3 border border-border rounded-lg hover:bg-accent/50 transition">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-sm font-medium">{test.name}</h4>
                          <Badge variant="outline" className="text-xs">{test.difficulty}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          {test.totalQuestions} questions • {test.totalMarks} marks • {test.duration} min
                        </p>
                        <div className="flex gap-2 justify-between">
                          <span className="text-xs text-muted-foreground">
                            {test.completedBy.toLocaleString()} students completed
                          </span>
                          <Button size="sm" variant="ghost">Start</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4">View All Tests</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Timer className="h-5 w-5" />
                    Speed Tests
                  </CardTitle>
                  <CardDescription>Quick subject/topic-wise tests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm space-y-2">
                      <p className="text-muted-foreground">25+ subject-wise tests available</p>
                      <ul className="text-xs space-y-1 ml-4">
                        <li>• DSA Basics (10 questions, 15 min)</li>
                        <li>• Trees & Graphs (15 questions, 20 min)</li>
                        <li>• DBMS Basics (10 questions, 15 min)</li>
                        <li>• OS Concepts (15 questions, 20 min)</li>
                        <li>• Networks Basics (10 questions, 15 min)</li>
                        <li>• And 20+ more topics...</li>
                      </ul>
                    </div>
                    <Button variant="outline" className="w-full">Start Speed Test</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="pyqs">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Previous Year Questions (All 5 Branches)
                </CardTitle>
                <CardDescription>
                  Access 30+ PYQ papers across CS, ME, EE, EC, and CE branches from 2019-2024
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { branch: 'CS', name: 'Computer Science', icon: '💻' },
                    { branch: 'ME', name: 'Mechanical', icon: '⚙️' },
                    { branch: 'EE', name: 'Electrical', icon: '⚡' },
                    { branch: 'EC', name: 'Electronics', icon: '🔌' },
                    { branch: 'CE', name: 'Civil', icon: '🏗️' },
                  ].map((b) => (
                    <Card key={b.branch} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="text-3xl mb-2">{b.icon}</div>
                        <h3 className="font-semibold mb-1">{b.name} ({b.branch})</h3>
                        <p className="text-xs text-muted-foreground mb-3">
                          6 years of papers with solutions
                        </p>
                        <Button size="sm" className="w-full">View Papers</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5" />
                    Video Lectures
                  </CardTitle>
                  <CardDescription>
                    {recentLectures.length} lectures available
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentLectures.slice(0, 2).map((lecture) => (
                      <div key={lecture.id} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{lecture.title}</p>
                          <p className="text-xs text-muted-foreground">{lecture.instructor} • {lecture.duration}</p>
                          <Progress value={lecture.watched} className="mt-2 h-1.5" />
                          <p className="text-xs text-muted-foreground mt-1">{lecture.watched}% watched</p>
                        </div>
                        <Button size="sm" variant="outline" className="ml-2">
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">View All Lectures (25+)</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Study Materials
                  </CardTitle>
                  <CardDescription>
                    {studyMaterials.length} documents available
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {studyMaterials.slice(0, 2).map((material) => (
                      <div key={material.id} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{material.title}</p>
                          <p className="text-xs text-muted-foreground">{material.downloads.toLocaleString()} downloads</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">View All Resources (50+)</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Leaderboard Top 10
                  </CardTitle>
                  <CardDescription>University-wide rankings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/20">
                      <div className="flex items-center gap-3 flex-1">
                        <Badge className="bg-primary">#{quickStats.rank}</Badge>
                        <div>
                          <p className="font-medium text-sm">{student?.first_name} {student?.last_name}</p>
                          <p className="text-xs text-muted-foreground">YOU</p>
                        </div>
                      </div>
                      <span className="font-bold text-sm">{quickStats.averageScore}%</span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mb-4 pb-4 border-b">
                    Your rank out of {quickStats.totalStudents.toLocaleString()} students
                  </div>
                  <div className="space-y-2">
                    {topLeaderboard.slice(0, 5).map((student) => (
                      <div key={student.rank} className="flex items-center justify-between text-xs p-2 rounded">
                        <div className="flex items-center gap-2 flex-1">
                          <Badge variant="outline" className="min-w-fit">#{student.rank}</Badge>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-muted-foreground">{student.branch}</p>
                          </div>
                        </div>
                        <span className="font-bold">{student.score}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Your Analytics
                  </CardTitle>
                  <CardDescription>Personalized performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-accent rounded-lg text-center">
                        <p className="text-2xl font-bold text-primary">{quickStats.studyHours}</p>
                        <p className="text-xs text-muted-foreground">Study Hours</p>
                      </div>
                      <div className="p-3 bg-accent rounded-lg text-center">
                        <p className="text-2xl font-bold text-green-500">{quickStats.completedTests}</p>
                        <p className="text-xs text-muted-foreground">Tests Done</p>
                      </div>
                      <div className="p-3 bg-accent rounded-lg text-center">
                        <p className="text-2xl font-bold text-yellow-500">{quickStats.streak}</p>
                        <p className="text-xs text-muted-foreground">Day Streak</p>
                      </div>
                      <div className="p-3 bg-accent rounded-lg text-center">
                        <p className="text-2xl font-bold text-blue-500">{quickStats.resourcesViewed}</p>
                        <p className="text-xs text-muted-foreground">Resources</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <p className="text-xs font-medium mb-2">Average Improvement</p>
                      <Progress value={65} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">+8% from last month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="alumni">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Success Stories - GATE Toppers
                </CardTitle>
                <CardDescription>
                  Learn from students who achieved their goals using our platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {alumni.map((person) => (
                    <Card key={person.id} className="hover:shadow-lg transition-shadow border-l-4 border-primary">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <GraduationCap className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="font-semibold text-base">{person.name}</h3>
                        <p className="text-sm text-primary font-bold mb-1 mt-2">{person.rank}</p>
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <Badge variant="secondary" className="text-xs">{person.branch}</Badge>
                          <Badge variant="outline" className="text-xs">GATE {person.year}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          <Star className="h-3 w-3 inline mr-1 text-yellow-500" />
                          {person.company}
                        </p>
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

export default Dashboard;
