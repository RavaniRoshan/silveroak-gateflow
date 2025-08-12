import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MessageCircle, Video, Search, Users, Award, GraduationCap } from 'lucide-react';

const mentors = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    title: "Senior Faculty, Computer Science",
    specialization: "Computer Science & IT",
    gateRank: "AIR 15 (2019)",
    experience: "8 years",
    rating: 4.9,
    reviews: 156,
    students: 45,
    image: "/placeholder.svg",
    availability: "Available",
    sessionsCompleted: 342,
    subjects: ["Data Structures", "Algorithms", "DBMS", "Computer Networks"]
  },
  {
    id: 2,
    name: "Prof. Anita Sharma",
    title: "Associate Professor, Mathematics",
    specialization: "Engineering Mathematics",
    gateRank: "AIR 8 (2018)",
    experience: "12 years",
    rating: 4.8,
    reviews: 203,
    students: 67,
    image: "/placeholder.svg",
    availability: "Available",
    sessionsCompleted: 578,
    subjects: ["Linear Algebra", "Calculus", "Probability", "Statistics"]
  },
  {
    id: 3,
    name: "Dr. Vikram Singh",
    title: "Head of Department, Mechanical",
    specialization: "Mechanical Engineering",
    gateRank: "AIR 22 (2017)",
    experience: "15 years",
    rating: 4.9,
    reviews: 189,
    students: 38,
    image: "/placeholder.svg",
    availability: "Busy",
    sessionsCompleted: 423,
    subjects: ["Thermodynamics", "Fluid Mechanics", "Machine Design", "Manufacturing"]
  },
  {
    id: 4,
    name: "Dr. Priya Patel",
    title: "Assistant Professor, Electronics",
    specialization: "Electronics & Communication",
    gateRank: "AIR 31 (2020)",
    experience: "6 years",
    rating: 4.7,
    reviews: 134,
    students: 52,
    image: "/placeholder.svg",
    availability: "Available",
    sessionsCompleted: 267,
    subjects: ["Analog Circuits", "Digital Electronics", "Control Systems", "Communications"]
  },
  {
    id: 5,
    name: "Prof. Amit Gupta",
    title: "Senior Faculty, Civil Engineering",
    specialization: "Civil Engineering",
    gateRank: "AIR 19 (2016)",
    experience: "11 years",
    rating: 4.8,
    reviews: 167,
    students: 43,
    image: "/placeholder.svg",
    availability: "Available",
    sessionsCompleted: 389,
    subjects: ["Structural Analysis", "Geotechnical", "Water Resources", "Transportation"]
  },
  {
    id: 6,
    name: "Dr. Neha Agarwal",
    title: "Associate Professor, Electrical",
    specialization: "Electrical Engineering",
    gateRank: "AIR 12 (2019)",
    experience: "9 years",
    rating: 4.9,
    reviews: 178,
    students: 49,
    image: "/placeholder.svg",
    availability: "Available",
    sessionsCompleted: 356,
    subjects: ["Electric Circuits", "Power Systems", "Electrical Machines", "Control Systems"]
  }
];

const ConnectMentor = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All');
  const [selectedAvailability, setSelectedAvailability] = useState('All');

  const specializations = ['All', 'Computer Science & IT', 'Engineering Mathematics', 'Mechanical Engineering', 'Electronics & Communication', 'Civil Engineering', 'Electrical Engineering'];
  const availabilities = ['All', 'Available', 'Busy'];

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSpecialization = selectedSpecialization === 'All' || mentor.specialization === selectedSpecialization;
    const matchesAvailability = selectedAvailability === 'All' || mentor.availability === selectedAvailability;
    return matchesSearch && matchesSpecialization && matchesAvailability;
  });

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available': return 'bg-success/10 text-success border border-success/20';
      case 'Busy': return 'bg-destructive/10 text-destructive border border-destructive/20';
      default: return 'bg-muted text-muted-foreground border border-border';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4 text-foreground">Connect with Mentors</h1>
            <p className="text-xl text-muted-foreground">
              Get personalized guidance from GATE toppers and Silver Oak University faculty
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
              placeholder="Search mentors by name, specialization, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
              <SelectTrigger className="w-full md:w-60">
                <SelectValue placeholder="Select Specialization" />
              </SelectTrigger>
              <SelectContent>
                {specializations.map((spec) => (
                  <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                {availabilities.map((availability) => (
                  <SelectItem key={availability} value={availability}>{availability}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={mentor.image} alt={mentor.name} />
                    <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{mentor.name}</CardTitle>
                        <CardDescription className="text-sm">{mentor.title}</CardDescription>
                      </div>
                      <Badge className={getAvailabilityColor(mentor.availability)}>
                        {mentor.availability}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {/* Mentor Stats */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">{mentor.specialization}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">{mentor.gateRank}</span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{mentor.experience} experience</span>
                      <span>{mentor.students} students</span>
                    </div>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 font-semibold">{mentor.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({mentor.reviews} reviews)
                    </span>
                  </div>
                  
                  {/* Subjects */}
                  <div>
                    <p className="text-sm font-medium mb-2">Specializes in:</p>
                    <div className="flex flex-wrap gap-1">
                      {mentor.subjects.slice(0, 3).map((subject) => (
                        <Badge key={subject} variant="outline" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                      {mentor.subjects.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{mentor.subjects.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1" 
                      size="sm"
                      disabled={mentor.availability === 'Busy'}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      disabled={mentor.availability === 'Busy'}
                    >
                      <Video className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMentors.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No mentors found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* How it Works */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardHeader>
              <Search className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">1. Find Your Mentor</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Browse through our expert faculty and GATE toppers to find the perfect mentor for your subject
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <MessageCircle className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">2. Connect & Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Send a message or schedule a video call to discuss your preparation strategy and doubts
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <GraduationCap className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">3. Learn & Succeed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get personalized guidance, study plans, and tips from experienced mentors to ace GATE
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ConnectMentor;
