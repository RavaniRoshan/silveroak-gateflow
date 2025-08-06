import { Button } from "@/components/ui/button";
import { ArrowRight, Users, BookOpen, Trophy, Target } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-85"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-8">
            {/* University Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <Trophy className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium">Silver Oak University Excellence</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                GATE CLUB
                <span className="block text-3xl lg:text-4xl font-normal text-white/90 mt-2">
                  Digital Excellence Hub
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 max-w-2xl">
                Transform your GATE preparation with Silver Oak University's comprehensive digital platform. 
                Join thousands of successful engineers who achieved their dreams through our proven methodology.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group" onClick={() => window.location.href = '/auth'}>
                Access Student Portal
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="academic" size="lg" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-primary" onClick={() => window.location.href = '/subjects'}>
                Browse Subjects
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">15,000+</div>
                <div className="text-sm text-white/80">Active Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">95%</div>
                <div className="text-sm text-white/80">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">27</div>
                <div className="text-sm text-white/80">GATE Subjects</div>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
              <BookOpen className="h-12 w-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Comprehensive Study Materials</h3>
              <p className="text-white/80">University-curated content covering all 27 GATE subjects with interactive learning modules.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
              <Target className="h-12 w-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Advanced Mock Tests</h3>
              <p className="text-white/80">GATE-identical testing environment with detailed analytics and performance insights.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
              <Users className="h-12 w-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Expert Community</h3>
              <p className="text-white/80">Connect with Silver Oak faculty, successful alumni, and peer study groups.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 opacity-20">
        <div className="w-32 h-32 bg-white/10 rounded-full animate-float"></div>
      </div>
      <div className="absolute bottom-20 left-20 opacity-20">
        <div className="w-24 h-24 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
    </section>
  );
};

export default HeroSection;