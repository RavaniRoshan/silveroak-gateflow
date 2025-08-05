import { Button } from "@/components/ui/button";
import { BookOpen, Users, Trophy, Menu } from "lucide-react";
import universityLogo from "@/assets/university-logo.png";

const Header = () => {
  return (
    <header className="bg-background border-b border-border shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* University Logo & Branding */}
          <div className="flex items-center space-x-4">
            <img 
              src={universityLogo} 
              alt="Silver Oak University" 
              className="h-10 w-10"
            />
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-primary">Silver Oak University</h1>
              <p className="text-sm text-muted-foreground -mt-1">GATE CLUB</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#dashboard" className="text-foreground hover:text-primary transition-colors">
              Dashboard
            </a>
            <a href="#subjects" className="text-foreground hover:text-primary transition-colors">
              Study Materials
            </a>
            <a href="#tests" className="text-foreground hover:text-primary transition-colors">
              Mock Tests
            </a>
            <a href="#community" className="text-foreground hover:text-primary transition-colors">
              Community
            </a>
            <a href="#resources" className="text-foreground hover:text-primary transition-colors">
              Resources
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="hidden md:inline-flex">
              Sign In
            </Button>
            <Button variant="hero" className="hidden md:inline-flex">
              Join GATE Club
            </Button>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;