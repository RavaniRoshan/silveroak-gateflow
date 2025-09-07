import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator, 
  Cpu, 
  Zap, 
  Cog, 
  Building, 
  FlaskConical,
  ArrowRight,
  BookOpen,
  Users,
  Clock
} from "lucide-react";

const subjects = [
  {
    icon: Calculator,
    title: "Engineering Mathematics",
    description: "Linear Algebra, Calculus, Differential Equations, Complex Variables, and more",
    topics: 156,
    students: "12.5k",
    difficulty: "Core Foundation",
    color: "primary"
  },
  {
    icon: Cpu,
    title: "Computer Science & IT",
    description: "Programming, Data Structures, Algorithms, Computer Networks, Databases",
    topics: 234,
    students: "8.7k",
    difficulty: "High Demand",
    color: "secondary"
  },
  {
    icon: Zap,
    title: "Electrical Engineering",
    description: "Circuit Analysis, Power Systems, Control Systems, Signal Processing",
    topics: 198,
    students: "6.2k",
    difficulty: "Technical Core",
    color: "accent"
  },
  {
    icon: Cog,
    title: "Mechanical Engineering",
    description: "Thermodynamics, Fluid Mechanics, Manufacturing, Machine Design",
    topics: 187,
    students: "7.1k",
    difficulty: "Applied Science",
    color: "primary"
  },
  {
    icon: Building,
    title: "Civil Engineering",
    description: "Structural Analysis, Geotechnical, Transportation, Environmental",
    topics: 176,
    students: "5.8k",
    difficulty: "Infrastructure",
    color: "secondary"
  },
  {
    icon: FlaskConical,
    title: "Chemical Engineering",
    description: "Process Technology, Heat Transfer, Mass Transfer, Reaction Engineering",
    topics: 165,
    students: "4.3k",
    difficulty: "Process Design",
    color: "accent"
  }
];

const SubjectsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-secondary/10 rounded-full px-4 py-2 mb-6">
            <BookOpen className="h-4 w-4 text-secondary" />
            <span className="text-sm font-medium text-lime-500">Study Materials</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Master All 27 GATE Subjects
            <span className="block text-lime-500">With Expert Guidance</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive study materials designed by Silver Oak University faculty, 
            covering every topic with depth and clarity.
          </p>
        </div>

        {/* Subjects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {subjects.map((subject, index) => (
            <Card 
              key={index}
              className="group p-6 hover:shadow-knowledge transition-all duration-300 transform hover:scale-105 border-2 hover:border-secondary/20 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <subject.icon className={`h-10 w-10 text-${subject.color}`} />
                <Badge variant="outline" className="text-xs">
                  {subject.difficulty}
                </Badge>
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-lime-500 transition-colors">
                {subject.title}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                {subject.description}
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center space-x-2 text-muted-foreground">
                    <BookOpen className="h-4 w-4" />
                    <span>Topics</span>
                  </span>
                  <span className="font-semibold text-foreground">{subject.topics}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center space-x-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Students</span>
                  </span>
                  <span className="font-semibold text-foreground">{subject.students}</span>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full group-hover:bg-secondary group-hover:text-secondary-foreground transition-all"
              >
                Explore Subject
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-knowledge rounded-2xl p-8 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              Access All Subjects with Premium Membership
            </h3>
            <p className="text-xl text-white/90 mb-8">
              Get unlimited access to comprehensive study materials, practice questions, 
              and expert guidance across all GATE subjects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="bg-white text-secondary hover:bg-white/90">
                View All Subjects
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-secondary">
                Compare Plans
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubjectsSection;