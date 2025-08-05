import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Youtube,
  BookOpen,
  Users,
  Award
} from "lucide-react";
import universityLogo from "@/assets/university-logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* University Branding */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img 
                src={universityLogo} 
                alt="Silver Oak University" 
                className="h-12 w-12 bg-white rounded-lg p-2"
              />
              <div>
                <h3 className="text-xl font-bold">Silver Oak University</h3>
                <p className="text-sm text-primary-foreground/80">GATE CLUB</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Empowering engineering minds through innovative digital learning. 
              Join India's premier GATE preparation platform backed by university excellence.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>Study Resources</span>
            </h4>
            <ul className="space-y-3">
              {[
                "All GATE Subjects",
                "Previous Year Papers",
                "Mock Test Series",
                "Video Lectures",
                "Study Materials",
                "Practice Questions"
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-primary-foreground/80 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Community</span>
            </h4>
            <ul className="space-y-3">
              {[
                "Discussion Forums",
                "Study Groups",
                "Alumni Network",
                "Faculty Connect",
                "Success Stories",
                "Student Support"
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-primary-foreground/80 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold flex items-center space-x-2">
              <Award className="h-5 w-5" />
              <span>Get In Touch</span>
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-foreground/80 mt-1 flex-shrink-0" />
                <p className="text-primary-foreground/80 text-sm">
                  Silver Oak University Campus<br />
                  Engineering Excellence Center<br />
                  Gujarat, India
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-foreground/80" />
                <p className="text-primary-foreground/80 text-sm">+91 98765 43210</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-foreground/80" />
                <p className="text-primary-foreground/80 text-sm">gateclub@silveroakuni.ac.in</p>
              </div>
            </div>
            <Button variant="secondary" className="w-full">
              Contact Support
            </Button>
          </div>
        </div>
      </div>

      <Separator className="bg-white/20" />

      {/* Bottom Bar */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-primary-foreground/80 text-sm text-center md:text-left">
            © 2024 Silver Oak University GATE CLUB. All rights reserved. | 
            Empowering Engineering Excellence
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-primary-foreground/80 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-primary-foreground/80 hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-primary-foreground/80 hover:text-white transition-colors">
              Academic Integrity
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;