import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  Mail, 
  Bell, 
  TrendingUp, 
  BookOpen, 
  Users, 
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { neoHaptic } from "@/lib/neoHaptic";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    // Trigger haptic feedback
    await neoHaptic.trigger({ type: 'success' });

    // Simulate subscription (replace with actual API call)
    setIsSubscribed(true);
    setEmail("");
    
    toast({
      title: "Successfully Subscribed!",
      description: "You'll receive the latest GATE preparation insights and updates.",
    });
  };

  const updates = [
    {
      icon: TrendingUp,
      title: "Weekly Performance Reports",
      description: "Get detailed analytics on your preparation progress"
    },
    {
      icon: BookOpen,
      title: "New Study Materials",
      description: "Be first to access newly added topics and resources"
    },
    {
      icon: Users,
      title: "Expert Tips & Strategies",
      description: "Exclusive insights from successful GATE toppers and faculty"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-lime-50 via-blue-50 to-emerald-50 dark:from-gray-900 dark:via-black dark:to-gray-900 relative overflow-hidden">
      {/* Parallax Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-lime-500/10 rounded-full" data-speed="clamp(0.6)"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-500/10 rounded-lg rotate-45" data-speed="clamp(0.4)"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-emerald-500/10 rounded-full" data-lag="0.3"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-lime-500/10 rounded-full px-4 py-2 mb-6" data-speed="clamp(0.9)">
              <Bell className="h-4 w-4 text-lime-600" />
              <span className="text-sm font-medium text-lime-600 dark:text-lime-400">Stay Connected</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6" data-speed="clamp(0.8)">
              Never Miss a 
              <span className="block text-lime-500">GATE Update</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-speed="clamp(0.7)">
              Get the latest GATE exam insights, preparation strategies, and exclusive content 
              from Silver Oak University's expert faculty delivered directly to your inbox.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Newsletter Signup Form */}
            <div className="space-y-8">
              <Card className="p-8 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-2 hover:border-lime-500/30 transition-all duration-300">
                <div className="text-center mb-6">
                  <Mail className="h-12 w-12 text-lime-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Join 15K+ Students
                  </h3>
                  <p className="text-muted-foreground">
                    Subscribe to our newsletter for weekly insights and updates
                  </p>
                </div>

                {!isSubscribed ? (
                  <form onSubmit={handleSubscribe} className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 h-12 border-2 focus:border-lime-500"
                        required
                      />
                      <Button 
                        type="submit"
                        size="lg"
                        className="bg-lime-500 hover:bg-lime-600 text-black font-bold h-12 px-8"
                      >
                        Subscribe
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      No spam, unsubscribe anytime. Your privacy is our priority.
                    </p>
                  </form>
                ) : (
                  <div className="text-center space-y-4">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                    <h4 className="text-xl font-bold text-green-600">
                      Successfully Subscribed!
                    </h4>
                    <p className="text-muted-foreground">
                      Welcome to the Silver Oak GATE Club community. 
                      Check your inbox for a confirmation email.
                    </p>
                  </div>
                )}
              </Card>
            </div>

            {/* What You'll Receive */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                What You'll Receive:
              </h3>
              
              {updates.map((update, index) => (
                <Card 
                  key={index} 
                  className="p-6 hover:shadow-lg transition-all duration-300 bg-white/60 dark:bg-black/60 backdrop-blur-sm border hover:border-lime-500/30"
                  data-speed={`clamp(${0.5 + index * 0.1})`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-lime-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <update.icon className="h-6 w-6 text-lime-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-foreground mb-2">
                        {update.title}
                      </h4>
                      <p className="text-muted-foreground">
                        {update.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}

              {/* Additional Benefits */}
              <div className="bg-gradient-to-r from-lime-500/10 to-blue-500/10 rounded-xl p-6 border border-lime-500/20">
                <h4 className="text-lg font-bold text-foreground mb-3">
                  Exclusive Subscriber Benefits:
                </h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-lime-500" />
                    <span>Early access to new mock tests</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-lime-500" />
                    <span>Monthly webinars with GATE toppers</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-lime-500" />
                    <span>Priority support from faculty</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;