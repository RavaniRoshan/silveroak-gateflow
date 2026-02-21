import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Users, Clock, MessageSquare, Calendar, Search, GraduationCap, Award } from 'lucide-react';
import { mentorsList } from '@/data/mockData';

const ConnectMentor = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');

  // Get unique branches
  const branches = ['all', ...new Set(mentorsList.map(m => m.branch))];

  // Filter mentors
  const filteredMentors = useMemo(() => {
    return mentorsList.filter(mentor => {
      const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           mentor.specializations?.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesBranch = selectedBranch === 'all' || mentor.branch === selectedBranch;
      const matchesRating = selectedRating === 'all' || mentor.rating >= parseInt(selectedRating);
      return matchesSearch && matchesBranch && matchesRating;
    });
  }, [searchTerm, selectedBranch, selectedRating]);

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4) return 'text-blue-600';
    return 'text-yellow-600';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Header */}
      <div className="bg-gradient-to-r from-primary/20 to-secondary/20 py-12 border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Connect with Mentors</h1>
          <p className="text-lg text-muted-foreground">
            Learn from 15+ experienced GATE mentors with proven track records
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-2">Total Mentors</div>
              <div className="text-3xl font-bold">{mentorsList.length}+</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-2">Avg Rating</div>
              <div className="text-3xl font-bold">
                {(mentorsList.reduce((a, m) => a + m.rating, 0) / mentorsList.length).toFixed(1)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-2">Success Rate</div>
              <div className="text-3xl font-bold">95%+</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-2">Branches Covered</div>
              <div className="text-3xl font-bold">{branches.length - 1}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search mentors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Branch" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map(branch => (
                    <SelectItem key={branch} value={branch}>
                      {branch === 'all' ? 'All Branches' : branch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedRating} onValueChange={setSelectedRating}>
                <SelectTrigger>
                  <SelectValue placeholder="Minimum Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="4.8">4.8+ ⭐</SelectItem>
                  <SelectItem value="4.5">4.5+ ⭐</SelectItem>
                  <SelectItem value="4">4.0+ ⭐</SelectItem>
                </SelectContent>
              </Select>

              <div className="text-sm text-muted-foreground flex items-center">
                {filteredMentors.length} mentor{filteredMentors.length !== 1 ? 's' : ''} found
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <Card key={mentor.id} className="hover:shadow-lg transition-shadow flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl">{mentor.icon}</div>
                  <Badge variant="outline">{mentor.branch}</Badge>
                </div>
                <CardTitle className="text-lg">{mentor.name}</CardTitle>
                <CardDescription className="mt-2">{mentor.qualification}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 flex-1">
                {/* Rating & Reviews */}
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(mentor.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className={`font-semibold ${getRatingColor(mentor.rating)}`}>
                    {mentor.rating}
                  </span>
                  <span className="text-xs text-muted-foreground">({mentor.reviews} reviews)</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span>{mentor.successRate}% Success</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{mentor.studentsTaught}+ Students</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>₹{mentor.hourlyRate}/hr</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span>AIR {mentor.gateRank}</span>
                  </div>
                </div>

                {/* Specializations */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground">Specializes in:</p>
                  <div className="flex flex-wrap gap-1">
                    {mentor.specializations?.slice(0, 3).map((spec, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1">Availability:</p>
                  <p className="text-xs text-foreground">{mentor.availabilityHours}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1" size="sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    Book
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Message
                  </Button>
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
              Try adjusting your filters
            </p>
          </div>
        )}

        {/* How it Works */}
        <Card className="mt-12 bg-primary/5 border-primary/10">
          <CardHeader>
            <CardTitle>How Mentorship Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">1</div>
                <p className="font-semibold mb-1">Choose a Mentor</p>
                <p className="text-sm text-muted-foreground">Select from our vetted mentors based on ratings and expertise</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">2</div>
                <p className="font-semibold mb-1">Schedule Session</p>
                <p className="text-sm text-muted-foreground">Book 1-on-1 sessions on your preferred time and topics</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">3</div>
                <p className="font-semibold mb-1">Learn & Succeed</p>
                <p className="text-sm text-muted-foreground">Get personalized guidance and track your improvement</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default ConnectMentor;
