import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  FileText, 
  Target, 
  Video, 
  Users, 
  TrendingUp, 
  Clock, 
  Award,
  Brain,
  Zap
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Study Materials Hub",
    description: "Comprehensive subject-wise materials covering all 27 GATE disciplines with university-grade content quality.",
    color: "text-primary"
  },
  {
    icon: FileText,
    title: "Previous Year Papers",
    description: "15+ years of GATE question banks with detailed solutions and difficulty analysis.",
    color: "text-secondary"
  },
  {
    icon: Target,
    title: "Mock Test Engine",
    description: "GATE-identical testing environment with adaptive practice and real-time analytics.",
    color: "text-accent"
  },
  {
    icon: Video,
    title: "Video Lectures",
    description: "Expert faculty sessions from Silver Oak University with interactive demonstrations.",
    color: "text-primary"
  },
  {
    icon: Users,
    title: "Community Learning",
    description: "Connect with peers, alumni mentors, and faculty for collaborative learning.",
    color: "text-secondary"
  },
  {
    icon: TrendingUp,
    title: "Progress Analytics",
    description: "Detailed performance insights with personalized improvement recommendations.",
    color: "text-accent"
  }
];

const stats = [
  { icon: Clock, value: "24/7", label: "Learning Access" },
  { icon: Award, value: "95%", label: "Success Rate" },
  { icon: Brain, value: "AI-Powered", label: "Personalization" },
  { icon: Zap, value: "Instant", label: "Doubt Resolution" }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-background-secondary dark:bg-black relative overflow-hidden">
      {/* Parallax Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full" data-speed="clamp(0.6)"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-secondary/5 rounded-lg rotate-45" data-speed="clamp(0.4)"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-accent/5 rounded-full" data-lag="0.3"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 mb-6" data-speed="clamp(0.9)">
            <Award className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Platform Features</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6" data-speed="clamp(0.8)">
            Everything You Need for
            <span className="block text-primary">GATE Success</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-speed="clamp(0.7)">
            Silver Oak University's GATE CLUB combines traditional academic excellence with cutting-edge 
            technology to create the ultimate preparation ecosystem.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-8 hover:shadow-elegant transition-all duration-300 transform hover:scale-105 border-2 hover:border-primary/20"
              data-speed={`clamp(${0.5 + (index % 3) * 0.1})`}
            >
              <feature.icon className={`h-12 w-12 ${feature.color} mb-6`} />
              <h3 className="text-xl font-bold text-foreground mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="bg-gradient-primary rounded-2xl p-8 text-white" data-speed="clamp(0.6)">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-4" data-lag="0.2">
                <stat.icon className="h-12 w-12 mx-auto text-yellow-400" />
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-3xl font-bold text-foreground mb-6">
            Ready to Excel in Your GATE Preparation?
          </h3>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join Silver Oak University's comprehensive GATE preparation program and achieve your engineering goals.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;