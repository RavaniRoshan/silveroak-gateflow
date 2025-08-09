import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, MessageCircle, Megaphone, GraduationCap } from 'lucide-react';

const Community = () => {
  useEffect(() => {
    const title = 'GATE Community | Silver Oak University';
    const description = 'Join discussions, study groups, and announcements in the fast, no-frills GATE community.';
    document.title = title;

    const setMeta = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setMeta('description', description);

    const canonicalHref = typeof window !== 'undefined' ? window.location.href : '';
    if (canonicalHref) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonicalHref);
    }
  }, []);

  const sections = [
    {
      icon: Megaphone,
      title: 'Announcements',
      desc: 'Official updates, events, and important notices from the club.',
      cta: 'View updates',
    },
    {
      icon: MessageCircle,
      title: 'Q&A Discussions',
      desc: 'Ask questions and get crisp answers from peers and mentors.',
      cta: 'Browse questions',
    },
    {
      icon: Users,
      title: 'Study Groups',
      desc: 'Form lightweight, subject-specific groups to stay accountable.',
      cta: 'Find a group',
    },
    {
      icon: GraduationCap,
      title: 'Preparation Tips',
      desc: 'Short, actionable tips from toppers and faculty. No fluff.',
      cta: 'Read tips',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-university-primary to-university-forest text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">GATE Community</h1>
            <p className="text-xl opacity-90">
              Fast, focused discussions — built for learning, not distractions
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <section aria-labelledby="community-sections">
          <h2 id="community-sections" className="sr-only">Community sections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map(({ icon: Icon, title, desc, cta }) => (
              <Card key={title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-university-primary" />
                    <CardTitle className="text-lg">{title}</CardTitle>
                  </div>
                  <CardDescription>{desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" aria-label={cta}>
                    {cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-12" aria-labelledby="community-note">
          <h2 id="community-note" className="sr-only">Performance note</h2>
          <div className="rounded-lg border border-border p-4 text-sm text-muted-foreground">
            Built to be robust and performant — minimal animations, accessible markup, and responsive by default.
          </div>
        </section>
      </main>
    </div>
  );
};

export default Community;
