import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Link as LinkIcon, Download, BookOpen } from 'lucide-react';

const Resources = () => {
  useEffect(() => {
    const title = 'GATE Resources | Silver Oak University';
    const description = 'Curated, lightweight study resources: syllabus, notes, tutorials and tools for GATE prep.';
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

  const blocks = [
    {
      icon: FileText,
      title: 'Syllabus & Exam Pattern',
      desc: 'Quick access to official syllabus PDFs and marking schemes.',
      actions: [
        { label: 'GATE 2025 Syllabus (PDF)', href: '#', icon: Download },
        { label: 'Marking Scheme Overview', href: '#', icon: FileText },
      ],
    },
    {
      icon: BookOpen,
      title: 'Notes & Cheatsheets',
      desc: 'Concise, high-signal notes prepared by faculty and toppers.',
      actions: [
        { label: 'Engineering Mathematics Cheatsheet', href: '#', icon: Download },
        { label: 'CS Core Concepts Summary', href: '#', icon: Download },
      ],
    },
    {
      icon: LinkIcon,
      title: 'Helpful Links & Tools',
      desc: 'Official sites, calculators, and practice utilities.',
      actions: [
        { label: 'Virtual Scientific Calculator', href: '#', icon: LinkIcon },
        { label: 'Official GATE Website', href: '#', icon: LinkIcon },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4 text-foreground">GATE Resources</h1>
            <p className="text-xl text-muted-foreground">Clean, fast, and organized resources for effective preparation</p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <section aria-labelledby="resource-blocks">
          <h2 id="resource-blocks" className="sr-only">Resource categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blocks.map(({ icon: Icon, title, desc, actions }) => (
              <Card key={title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{title}</CardTitle>
                  </div>
                  <CardDescription>{desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {actions.map(({ label, href, icon: ActionIcon }) => (
                      <div key={label} className="flex items-center justify-between border border-border rounded-md px-3 py-2">
                        <span className="text-sm">{label}</span>
                        <Button asChild size="sm" variant="outline" aria-label={label}>
                          <a href={href}>
                            <ActionIcon className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-12" aria-labelledby="resource-note">
          <h2 id="resource-note" className="sr-only">Usage note</h2>
          <div className="rounded-lg border border-border p-4 text-sm text-muted-foreground">
            Designed for performance and clarity — minimal animations, semantic HTML, and responsive layouts.
          </div>
        </section>
      </main>
    </div>
  );
};

export default Resources;
