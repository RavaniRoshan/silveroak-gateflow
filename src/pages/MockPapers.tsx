import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Search, Clock, Users, Calendar, Play, Download } from 'lucide-react';

const mockPapers = [
  {
    id: 1,
    title: "GATE 2024 - Computer Science",
    year: 2024,
    subject: "Computer Science",
    subjectCode: "CS",
    duration: "3 hours",
    questions: 65,
    marks: 100,
    attempts: 1456,
    avgScore: 68.5,
    difficulty: "Hard",
    type: "Official"
  },
  {
    id: 2,
    title: "GATE 2024 - Mechanical Engineering",
    year: 2024,
    subject: "Mechanical Engineering",
    subjectCode: "ME",
    duration: "3 hours",
    questions: 65,
    marks: 100,
    attempts: 892,
    avgScore: 62.3,
    difficulty: "Hard",
    type: "Official"
  },
  {
    id: 3,
    title: "GATE 2023 - Computer Science",
    year: 2023,
    subject: "Computer Science",
    subjectCode: "CS",
    duration: "3 hours",
    questions: 65,
    marks: 100,
    attempts: 2134,
    avgScore: 71.2,
    difficulty: "Medium",
    type: "Official"
  },
  {
    id: 4,
    title: "GATE 2023 - Electronics & Communication",
    year: 2023,
    subject: "Electronics & Communication",
    subjectCode: "EC",
    duration: "3 hours",
    questions: 65,
    marks: 100,
    attempts: 743,
    avgScore: 58.9,
    difficulty: "Hard",
    type: "Official"
  },
  {
    id: 5,
    title: "GATE 2022 - Civil Engineering",
    year: 2022,
    subject: "Civil Engineering",
    subjectCode: "CE",
    duration: "3 hours",
    questions: 65,
    marks: 100,
    attempts: 567,
    avgScore: 64.7,
    difficulty: "Medium",
    type: "Official"
  },
  {
    id: 6,
    title: "GATE 2022 - Electrical Engineering",
    year: 2022,
    subject: "Electrical Engineering",
    subjectCode: "EE",
    duration: "3 hours",
    questions: 65,
    marks: 100,
    attempts: 678,
    avgScore: 59.4,
    difficulty: "Hard",
    type: "Official"
  },
  {
    id: 7,
    title: "GATE 2021 - Computer Science",
    year: 2021,
    subject: "Computer Science",
    subjectCode: "CS",
    duration: "3 hours",
    questions: 65,
    marks: 100,
    attempts: 1834,
    avgScore: 66.8,
    difficulty: "Medium",
    type: "Official"
  },
  {
    id: 8,
    title: "GATE 2020 - Mechanical Engineering",
    year: 2020,
    subject: "Mechanical Engineering",
    subjectCode: "ME",
    duration: "3 hours",
    questions: 65,
    marks: 100,
    attempts: 945,
    avgScore: 61.5,
    difficulty: "Medium",
    type: "Official"
  }
];

const MockPapers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');

  const years = ['All', '2024', '2023', '2022', '2021', '2020'];
  const subjects = ['All', 'Computer Science', 'Mechanical Engineering', 'Electronics & Communication', 'Civil Engineering', 'Electrical Engineering'];

  const filteredPapers = mockPapers.filter(paper => {
    const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.subjectCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = selectedYear === 'All' || paper.year.toString() === selectedYear;
    const matchesSubject = selectedSubject === 'All' || paper.subject === selectedSubject;
    return matchesSearch && matchesYear && matchesSubject;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-success/10 text-success border border-success/20';
      case 'Medium': return 'bg-warning/10 text-warning border border-warning/20';
      case 'Hard': return 'bg-destructive/10 text-destructive border border-destructive/20';
      default: return 'bg-muted text-muted-foreground border border-border';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-university-primary to-university-forest text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">GATE Mock Papers</h1>
            <p className="text-xl opacity-90">
              Previous 5 years GATE question papers with detailed solutions
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search papers by title, subject, or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-full md:w-60">
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Papers Grouped by Year */}
        {Object.entries(
          filteredPapers.reduce((acc: Record<string, typeof filteredPapers>, paper) => {
            const y = paper.year.toString();
            (acc[y] ||= []).push(paper);
            return acc;
          }, {} as Record<string, typeof filteredPapers>)
        )
          .sort(([a], [b]) => Number(b) - Number(a))
          .map(([year, papers]) => (
            <section key={year} aria-labelledby={`year-${year}`} className="mb-10">
              <div className="flex items-center justify-between mb-3">
                <h2 id={`year-${year}`} className="text-xl font-semibold">{year} Papers</h2>
                <Badge variant="outline">{papers.length}</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {papers.map((paper) => (
                  <Card key={paper.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-university-primary" />
                          <Badge variant="outline">{paper.year}</Badge>
                        </div>
                        <Badge className={getDifficultyColor(paper.difficulty)}>
                          {paper.difficulty}
                        </Badge>
                      </div>
                      
                      <CardTitle className="text-lg">{paper.title}</CardTitle>
                      <CardDescription>
                        {paper.subject} ({paper.subjectCode})
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        {/* Paper Stats */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{paper.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span>{paper.questions} Questions</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{paper.attempts} Attempts</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-muted-foreground">Avg Score:</span>
                            <span className={`font-semibold ${getScoreColor(paper.avgScore)}`}>
                              {paper.avgScore}%
                            </span>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button className="flex-1" size="sm">
                            <Play className="h-4 w-4 mr-2" />
                            Take Test
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
        ))}

        {filteredPapers.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No papers found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-12 bg-primary/5 rounded-lg p-6 border border-primary/10">
          <h3 className="text-lg font-semibold text-primary mb-2">About GATE Mock Papers</h3>
          <p className="text-primary/80 text-sm leading-relaxed">
            Practice with authentic GATE question papers from the last 5 years. Each paper is designed to simulate 
            the actual exam environment with accurate timing, marking scheme, and difficulty level. All solutions 
            are provided with detailed explanations by our Silver Oak University faculty.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MockPapers;