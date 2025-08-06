import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BookOpen, Users, Trophy, Menu, LogOut, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import universityLogo from "@/assets/university-logo.png";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { student, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <header className="bg-background border-b border-border shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* University Logo & Branding */}
          <div className="flex items-center space-x-4 cursor-pointer" onClick={() => navigate('/')}>
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
            <a href="/subjects" className="text-foreground hover:text-primary transition-colors">
              Subjects
            </a>
            <a href="/mock-papers" className="text-foreground hover:text-primary transition-colors">
              Mock Papers
            </a>
            <a href="/connect-mentor" className="text-foreground hover:text-primary transition-colors">
              Connect Mentor
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
            {student ? (
              <>
                <div className="hidden md:flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {student.first_name} {student.last_name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ({student.enrollment_no})
                  </span>
                </div>
                <Button variant="outline" onClick={handleSignOut} className="hidden md:inline-flex">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={() => navigate('/auth')} className="hidden md:inline-flex">
                Student Access
              </Button>
            )}
            
            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <a 
                    href="/subjects" 
                    className="text-foreground hover:text-primary transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Subjects
                  </a>
                  <a 
                    href="/mock-papers" 
                    className="text-foreground hover:text-primary transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Mock Papers
                  </a>
                  <a 
                    href="/connect-mentor" 
                    className="text-foreground hover:text-primary transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Connect Mentor
                  </a>
                  <a 
                    href="#community" 
                    className="text-foreground hover:text-primary transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Community
                  </a>
                  <a 
                    href="#resources" 
                    className="text-foreground hover:text-primary transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Resources
                  </a>
                  
                  <div className="pt-4 border-t">
                    {student ? (
                      <>
                        <div className="pb-2">
                          <p className="text-sm font-medium">{student.first_name} {student.last_name}</p>
                          <p className="text-xs text-muted-foreground">{student.enrollment_no}</p>
                        </div>
                        <Button variant="outline" onClick={handleSignOut} className="w-full">
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <Button variant="outline" onClick={() => navigate('/auth')} className="w-full">
                        Student Access
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;