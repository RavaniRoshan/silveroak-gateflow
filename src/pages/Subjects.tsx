import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Search, Users, Clock, Star } from 'lucide-react';

const subjects = [
  {
    id: 1,
    name: "Engineering Mathematics",
    code: "XE-A",
    category: "Core",
    topics: 45,
    students: 1234,
    difficulty: "Medium",
    description: "Linear Algebra, Calculus, Differential Equations, Complex Variables, Probability and Statistics",
    color: "bg-blue-500"
  },
  {
    id: 2,
    name: "General Aptitude",
    code: "GA",
    category: "Common",
    topics: 25,
    students: 2156,
    difficulty: "Easy",
    description: "Verbal Ability, Numerical Ability, Analytical & Logical Reasoning",
    color: "bg-green-500"
  },
  {
    id: 3,
    name: "Computer Science & IT",
    code: "CS",
    category: "Engineering",
    topics: 78,
    students: 892,
    difficulty: "Hard",
    description: "Programming, Data Structures, Algorithms, Computer Networks, Database Management",
    color: "bg-purple-500"
  },
  {
    id: 4,
    name: "Mechanical Engineering",
    code: "ME",
    category: "Engineering",
    topics: 65,
    students: 567,
    difficulty: "Hard",
    description: "Thermodynamics, Fluid Mechanics, Machine Design, Manufacturing, Heat Transfer",
    color: "bg-orange-500"
  },
  {
    id: 5,
    name: "Electronics & Communication",
    code: "EC",
    category: "Engineering",
    topics: 72,
    students: 743,
    difficulty: "Hard",
    description: "Electronic Devices, Analog Circuits, Digital Circuits, Control Systems, Communications",
    color: "bg-indigo-500"
  },
  {
    id: 6,
    name: "Civil Engineering",
    code: "CE",
    category: "Engineering",
    topics: 58,
    students: 445,
    difficulty: "Medium",
    description: "Structural Engineering, Geotechnical Engineering, Water Resources, Transportation",
    color: "bg-yellow-500"
  },
  {
    id: 7,
    name: "Electrical Engineering",
    code: "EE",
    category: "Engineering",
    topics: 69,
    students: 654,
    difficulty: "Hard",
    description: "Electric Circuits, Electromagnetic Fields, Electrical Machines, Power Systems, Control Systems",
    color: "bg-red-500"
  },
  {
    id: 8,
    name: "Chemical Engineering",
    code: "CH",
    category: "Engineering",
    topics: 52,
    students: 298,
    difficulty: "Medium",
    description: "Process Calculations, Thermodynamics, Fluid Mechanics, Heat Transfer, Mass Transfer",
    color: "bg-teal-500"
  }
];

const Subjects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Core', 'Common', 'Engineering'];

  const filteredSubjects = subjects.filter(subject => {
    const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subject.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || subject.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-success/10 text-success border border-success/20';
      case 'Medium': return 'bg-warning/10 text-warning border border-warning/20';
      case 'Hard': return 'bg-destructive/10 text-destructive border border-destructive/20';
      default: return 'bg-muted text-muted-foreground border border-border';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-university-primary to-university-forest text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">GATE Subjects</h1>
            <p className="text-xl opacity-90">
              Comprehensive study materials for all GATE subjects, curated by Silver Oak University faculty
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search subjects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubjects.map((subject) => (
            <Card key={subject.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-lg ${subject.color} flex items-center justify-center mb-3`}>
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <Badge className={getDifficultyColor(subject.difficulty)}>
                    {subject.difficulty}
                  </Badge>
                </div>
                
                <CardTitle className="text-lg">{subject.name}</CardTitle>
                <CardDescription>{subject.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Subject Code: {subject.code}</span>
                    <Badge variant="outline">{subject.category}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{subject.topics} Topics</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{subject.students} Students</span>
                    </div>
                  </div>
                  
                  <Button className="w-full" variant="outline">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Start Learning
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSubjects.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No subjects found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subjects;