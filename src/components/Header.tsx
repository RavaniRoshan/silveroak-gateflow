import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BookOpen, Users, Trophy, Menu, LogOut, User, Command, Zap } from "lucide-react";
import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useNeoHover } from "@/hooks/useNeoAnimations";
import { neoHaptic } from "@/lib/neoHaptic";
import { ThemeToggle } from "@/components/theme-toggle";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { student, signOut } = useAuth();
  const { ref: logoRef, onMouseEnter, onMouseLeave } = useNeoHover();

  const handleSignOut = async () => {
    await neoHaptic.trigger({ type: 'warning' });
    await signOut();
    navigate('/auth');
  };

  const handleNavigation = async (path: string) => {
    await neoHaptic.trigger({ type: 'light' });
    navigate(path);
  };

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] w-[95%] max-w-7xl pointer-events-auto">
      <div className="bg-white/85 dark:bg-black/85 backdrop-blur-xl border border-white/30 dark:border-gray-800/50 rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-3xl">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
          {/* Neo-Minimal Logo & Branding */}
          <div 
            ref={logoRef}
            className="flex items-center space-x-4 cursor-pointer transition-all duration-200" 
            onClick={() => handleNavigation(student ? '/dashboard' : '/')}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <div className="h-10 w-10 bg-black dark:bg-lime-500 text-white dark:text-black rounded-lg flex items-center justify-center font-extra-black border-2 border-lime-500 dark:border-black">
              <span className="text-base font-black">S</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-black text-black dark:text-white">SILVER OAK</h1>
              <p className="font-mono text-xs text-lime-500 uppercase tracking-wider -mt-1">GATE EXCELLENCE HUB</p>
            </div>
          </div>

          {/* Navigation - Glass Morphism Style */}
          <nav className="hidden lg:flex items-center space-x-6 bg-white/30 dark:bg-black/30 backdrop-blur-sm rounded-full px-6 py-2 border border-white/30 dark:border-gray-700/30">
            {[
              { path: '/tests', label: 'TESTS', icon: <Zap className="w-4 h-4" /> },
              { path: '/pyqs', label: 'PYQS', icon: <BookOpen className="w-4 h-4" /> },
              { path: '/resources', label: 'RESOURCES', icon: <Trophy className="w-4 h-4" /> },
              { path: '/community', label: 'COMMUNITY', icon: <Users className="w-4 h-4" /> }
            ].map((item) => {
              const NavLink = () => {
                const { ref: linkRef, onMouseEnter, onMouseLeave } = useNeoHover<HTMLAnchorElement>();
                
                return (
                  <Link
                    ref={linkRef}
                    key={item.path}
                    to={item.path}
                    className="flex items-center space-x-2 text-black/70 dark:text-white/70 hover:text-lime-500 dark:hover:text-lime-400 transition-all duration-200 font-bold uppercase tracking-wide text-sm px-3 py-1 rounded-full hover:bg-lime-500/10"
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onClick={() => neoHaptic.trigger({ type: 'light' })}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                );
              };
              return <NavLink key={item.path} />;
            })}
          </nav>

          {/* Action Buttons - Glass Morphism */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {student ? (
              <>
                <div
                  className="hidden md:flex items-center space-x-3 cursor-pointer hover:text-lime-500 dark:hover:text-lime-400 transition-all duration-200 p-2 border border-white/30 dark:border-gray-700/30 hover:border-lime-500/50 bg-white/30 dark:bg-black/30 backdrop-blur-sm rounded-xl"
                  onClick={() => handleNavigation('/dashboard')}
                >
                  <div className="w-8 h-8 bg-lime-500 text-black rounded-full flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-black dark:text-white">
                      {student.first_name} {student.last_name}
                    </p>
                    <p className="text-xs font-mono text-gray-600 dark:text-gray-400">
                      {student.enrollment_no}
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={handleSignOut} 
                  className="hidden md:inline-flex bg-white/30 dark:bg-black/30 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 hover:border-red-500/50 text-black dark:text-white hover:text-red-500 font-bold uppercase tracking-wider rounded-xl"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  EXIT
                </Button>
              </>
            ) : (
              <Button 
                onClick={() => handleNavigation('/auth')} 
                className="hidden md:inline-flex bg-lime-500/90 hover:bg-lime-500 text-black font-bold uppercase tracking-wider backdrop-blur-sm rounded-xl border border-lime-500/30"
              >
                STUDENT ACCESS
              </Button>
            )}

            {/* Mobile Menu - Glass Morphism */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button className="lg:hidden bg-lime-500/90 hover:bg-lime-500 text-black p-3 rounded-xl">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-black/95 dark:bg-black/95 backdrop-blur-xl text-white border-l border-gray-800/50">
                <div className="flex flex-col space-y-6 mt-8">
                  <div className="text-xl text-lime-400 mb-4 font-black">NAVIGATION</div>
                  
                  {[
                    { path: '/tests', label: 'TESTS' },
                    { path: '/pyqs', label: 'PYQS' },
                    { path: '/resources', label: 'RESOURCES' },
                    { path: '/community', label: 'COMMUNITY' }
                  ].map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="text-white hover:text-lime-400 transition-all duration-200 py-3 font-bold uppercase tracking-wider text-lg border-b border-gray-800 hover:border-lime-400"
                      onClick={() => {
                        neoHaptic.trigger({ type: 'light' });
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                  
                  <div className="pt-6 border-t border-gray-800">
                    {student ? (
                      <>
                        <div
                          className="pb-4 cursor-pointer hover:text-lime-400 transition-colors"
                          onClick={() => {
                            handleNavigation('/dashboard');
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          <p className="font-bold text-lg">{student.first_name} {student.last_name}</p>
                          <p className="text-sm font-mono text-gray-400">{student.enrollment_no}</p>
                        </div>
                        <Button 
                          onClick={handleSignOut} 
                          className="w-full bg-white/20 hover:bg-red-500/20 text-white hover:text-red-400 font-bold uppercase tracking-wider rounded-xl border border-white/30 hover:border-red-500/50"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          EXIT
                        </Button>
                      </>
                    ) : (
                      <Button 
                        onClick={() => handleNavigation('/auth')} 
                        className="w-full bg-lime-500/90 hover:bg-lime-500 text-black font-bold uppercase tracking-wider rounded-xl"
                      >
                        STUDENT ACCESS
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      </div>
    </header>
  );
};

export default Header;
