import { Button } from "@/components/ui/button";
import { ArrowRight, Users, BookOpen, Trophy, Target, Zap, Command } from "lucide-react";
import { useNeoEntrance, useNeoHover } from "@/hooks/useNeoAnimations";
import { neoHaptic } from "@/lib/neoHaptic";
import { useEffect } from "react";

const HeroSection = () => {
  const { ref: heroRef, slideUp } = useNeoEntrance({ duration: 0.8 });
  const { ref: titleRef, brutalistSlam } = useNeoEntrance({ duration: 0.6, delay: 0.2 });
  
  useEffect(() => {
    slideUp();
    setTimeout(() => brutalistSlam(), 200);
  }, [slideUp, brutalistSlam]);

  const handleCTA = async (path: string) => {
    await neoHaptic.trigger({ type: 'success' });
    window.location.href = path;
  };

  return (
    <section className="relative min-h-screen bg-white dark:bg-black flex items-center overflow-hidden pt-24 pb-16">
      {/* Glass Morphism Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white dark:from-black dark:via-gray-900 dark:to-black opacity-50"></div>
        <div className="absolute top-0 left-0 w-full h-2 bg-lime-500"></div>
        <div className="absolute bottom-0 right-0 w-2 h-full bg-blue-500"></div>
        
        {/* Modern Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 h-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-r border-black dark:border-white"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div ref={heroRef} className="relative z-10 container mx-auto px-4">
        <div className="neo-asymmetric items-center">
          <div className="neo-asymmetric-left text-black dark:text-white space-y-12">
            {/* University Badge */}
            <div className="inline-flex items-center space-x-3 bg-black dark:bg-lime-500 text-white dark:text-black px-6 py-3 border-2 border-lime-500 dark:border-black font-mono uppercase tracking-wider rounded-xl">
              <Trophy className="h-5 w-5 text-lime-500 dark:text-black" />
              <span className="font-bold">SILVER OAK EXCELLENCE</span>
            </div>

            {/* Main Heading - Modern */}
            <div ref={titleRef} className="space-y-6">
              <h1 className="text-6xl lg:text-8xl leading-none font-black">
                GATE<br />
                <span className="text-lime-500">CLUB</span>
                <span className="block text-2xl lg:text-3xl font-normal text-black dark:text-white mt-4 uppercase tracking-wider">
                  Digital Excellence Hub
                </span>
              </h1>
              <p className="text-xl lg:text-2xl font-mono text-black dark:text-white max-w-2xl leading-relaxed">
                TRANSFORM YOUR GATE PREPARATION WITH SILVER OAK UNIVERSITY'S 
                <span className="bg-lime-500 text-black px-2 py-1 font-bold rounded">COMPREHENSIVE</span> DIGITAL PLATFORM.
              </p>
            </div>

            {/* CTA Buttons - Neo-Minimal */}
            <div className="flex flex-col sm:flex-row gap-6">
              <NeoButton 
                onClick={() => handleCTA('/auth')}
                variant="primary"
                icon={<ArrowRight className="ml-3 h-5 w-5" />}
              >
                ACCESS STUDENT PORTAL
              </NeoButton>
              <NeoButton 
                onClick={() => handleCTA('/subjects')}
                variant="secondary"
                icon={<BookOpen className="ml-3 h-5 w-5" />}
              >
                BROWSE SUBJECTS
              </NeoButton>
            </div>

            {/* Quick Stats - Glass Morphism Style */}
            <div className="grid grid-cols-3 gap-8 pt-12">
              {[
                { number: "15K+", label: "ACTIVE STUDENTS", color: "lime-500" },
                { number: "95%", label: "SUCCESS RATE", color: "blue-500" },
                { number: "27", label: "GATE SUBJECTS", color: "emerald-500" }
              ].map((stat, index) => (
                <div key={index} className="text-center bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-white/30 dark:border-gray-800/50 rounded-xl p-6 hover:bg-lime-500/10 dark:hover:bg-lime-500/10 transition-colors duration-200">
                  <div className={`text-4xl font-black text-${stat.color}`}>{stat.number}</div>
                  <div className="font-mono text-xs text-black dark:text-white uppercase tracking-wider mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Feature Cards - Asymmetric Layout */}
          <div className="neo-asymmetric-right space-y-8">
            {[
              {
                icon: <BookOpen className="h-12 w-12" />,
                title: "COMPREHENSIVE STUDY MATERIALS",
                description: "University-curated content covering all 27 GATE subjects with interactive learning modules.",
                accent: "lime-500"
              },
              {
                icon: <Target className="h-12 w-12" />,
                title: "ADVANCED MOCK TESTS",
                description: "GATE-identical testing environment with detailed analytics and performance insights.",
                accent: "blue-500"
              },
              {
                icon: <Users className="h-12 w-12" />,
                title: "EXPERT COMMUNITY",
                description: "Connect with Silver Oak faculty, successful alumni, and peer study groups.",
                accent: "emerald-500"
              }
            ].map((feature, index) => (
              <NeoFeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>

      {/* Modern Floating Elements - Enhanced with ScrollSmoother Effects */}
      <div className="absolute top-32 right-20" data-speed="clamp(0.7)">
        <div className="w-32 h-32 bg-lime-500/20 backdrop-blur-sm border border-lime-500/30 rounded-2xl animate-neo-bounce opacity-50"></div>
      </div>
      <div className="absolute bottom-32 left-20" data-speed="clamp(0.3)">
        <div className="w-24 h-24 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-xl animate-neo-bounce opacity-60" style={{ animationDelay: '1s' }}></div>
      </div>
      <div className="absolute top-1/2 left-1/4" data-lag="0.5">
        <div className="w-16 h-16 bg-black/10 dark:bg-white/10 backdrop-blur-sm border border-lime-500/30 rounded-lg animate-pulse opacity-30"></div>
      </div>
      
      {/* Additional Parallax Elements */}
      <div className="absolute top-20 left-1/3" data-speed="clamp(0.8)">
        <div className="w-8 h-8 bg-emerald-500/30 rounded-full animate-pulse opacity-40"></div>
      </div>
      <div className="absolute bottom-40 right-1/3" data-speed="clamp(0.4)">
        <div className="w-12 h-12 bg-purple-500/20 rounded-lg rotate-45 opacity-30"></div>
      </div>
    </section>
  );
};

// Neo-Minimal Button Component
interface NeoButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant: 'primary' | 'secondary';
  icon?: React.ReactNode;
}

const NeoButton: React.FC<NeoButtonProps> = ({ children, onClick, variant, icon }) => {
  const { ref: btnRef, onMouseEnter, onMouseLeave } = useNeoHover<HTMLButtonElement>();
  
  return (
    <button
      ref={btnRef}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`flex items-center justify-center px-8 py-4 font-bold uppercase tracking-wider transition-all duration-200 transform hover:scale-105 rounded-xl ${        variant === 'primary' 
          ? 'bg-lime-500 hover:bg-lime-600 text-black text-lg' 
          : 'bg-white/30 dark:bg-black/30 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 hover:border-lime-500/50 text-black dark:text-white hover:text-lime-500 text-lg'
      }`}
    >
      {children}
      {icon}
    </button>
  );
};

// Neo-Minimal Feature Card Component
interface NeoFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  accent: string;
}

const NeoFeatureCard: React.FC<NeoFeatureCardProps> = ({ icon, title, description, accent }) => {
  const { ref: cardRef, onMouseEnter, onMouseLeave } = useNeoHover();
  
  return (
    <div
      ref={cardRef}
      className={`bg-white/80 dark:bg-black/80 backdrop-blur-xl border-l-8 border-${accent} rounded-xl p-8 hover:bg-white/90 dark:hover:bg-black/90 transition-all duration-200 transform hover:translate-x-2 border border-white/30 dark:border-gray-800/50`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={`text-${accent} mb-6`}>
        {icon}
      </div>
      <h3 className="text-xl font-black text-black dark:text-white mb-4">{title}</h3>
      <p className="font-mono text-black dark:text-white opacity-80 leading-relaxed">{description}</p>
    </div>
  );
};

export default HeroSection;