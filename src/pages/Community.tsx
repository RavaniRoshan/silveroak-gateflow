import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users,
  MessageCircle,
  Megaphone,
  GraduationCap,
  Heart,
  MessageSquare,
  Share2,
  Search,
  Clock,
  User
} from 'lucide-react';
import { communityPosts } from '@/data/mockData';

const Community = () => {
  const [activeTab, setActiveTab] = useState('announcements');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('newest');

  // Separate posts by type
  const announcements = communityPosts.filter(p => p.type === 'announcement');
  const qaDiscussions = communityPosts.filter(p => p.type === 'qa');
  const studyGroups = communityPosts.filter(p => p.type === 'study_group');
  const tips = communityPosts.filter(p => p.type === 'tip');

  // Filter and sort announcements
  const filteredAnnouncements = useMemo(() => {
    let filtered = announcements.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return sortBy === 'newest'
      ? filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      : filtered.sort((a, b) => (b.likes || 0) - (a.likes || 0));
  }, [searchTerm, sortBy]);

  // Filter and sort Q&A discussions
  const filteredQA = useMemo(() => {
    let filtered = qaDiscussions.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return sortBy === 'newest'
      ? filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      : filtered.sort((a, b) => (b.comments || 0) - (a.comments || 0));
  }, [searchTerm, sortBy]);

  // Filter and sort study groups
  const filteredGroups = useMemo(() => {
    let filtered = studyGroups.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return sortBy === 'newest'
      ? filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      : filtered.sort((a, b) => (b.members || 0) - (a.members || 0));
  }, [searchTerm, sortBy]);

  // Filter and sort tips
  const filteredTips = useMemo(() => {
    let filtered = tips.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return sortBy === 'newest'
      ? filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      : filtered.sort((a, b) => (b.likes || 0) - (a.likes || 0));
  }, [searchTerm, sortBy]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const renderPost = (post: any) => (
    <Card key={post.id} className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-lg leading-tight">{post.title}</CardTitle>
            <CardDescription className="mt-2 flex items-center gap-2 text-xs">
              <User className="h-3 w-3" />
              <span>{post.author}</span>
              <Clock className="h-3 w-3 ml-2" />
              <span>{formatDate(post.createdAt)}</span>
            </CardDescription>
          </div>
          {post.branch && <Badge variant="outline">{post.branch}</Badge>}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{post.content}</p>

        {post.type === 'study_group' && (
          <div className="text-sm space-y-1">
            <p className="text-muted-foreground">
              <strong>Members:</strong> {post.members || 0}
            </p>
            {post.subject && <Badge>{post.subject}</Badge>}
          </div>
        )}

        {post.type === 'qa' && (
          <div className="flex gap-2">
            {post.tags?.map((tag, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {post.type === 'tip' && post.category && (
          <Badge className="bg-blue-100 text-blue-800">{post.category}</Badge>
        )}

        <div className="flex gap-4 text-xs text-muted-foreground pt-2">
          <button className="flex items-center gap-1 hover:text-foreground transition-colors">
            <Heart className="h-4 w-4" />
            <span>{post.likes || 0} likes</span>
          </button>
          <button className="flex items-center gap-1 hover:text-foreground transition-colors">
            <MessageSquare className="h-4 w-4" />
            <span>{post.comments || 0} comments</span>
          </button>
          <button className="flex items-center gap-1 hover:text-foreground transition-colors">
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Header */}
      <div className="bg-gradient-to-r from-primary/20 to-secondary/20 py-12 border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-foreground">GATE Community</h1>
          <p className="text-lg text-muted-foreground">
            Fast, focused discussions — built for learning, not distractions
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-2">Total Members</div>
              <div className="text-3xl font-bold">2.5K+</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-2">Discussions</div>
              <div className="text-3xl font-bold">{qaDiscussions.length}+</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-2">Study Groups</div>
              <div className="text-3xl font-bold">{studyGroups.length}+</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground mb-2">Active Today</div>
              <div className="text-3xl font-bold">450+</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex gap-4 flex-col sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search discussions, groups, tips..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'popular')}
                className="px-4 py-2 border border-border rounded-lg bg-background text-foreground"
              >
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="announcements" className="flex items-center gap-2">
              <Megaphone className="h-4 w-4" />
              <span className="hidden sm:inline">Announcements</span>
            </TabsTrigger>
            <TabsTrigger value="qa" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Q&A</span>
            </TabsTrigger>
            <TabsTrigger value="groups" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Groups</span>
            </TabsTrigger>
            <TabsTrigger value="tips" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              <span className="hidden sm:inline">Tips</span>
            </TabsTrigger>
          </TabsList>

          {/* Announcements Tab */}
          <TabsContent value="announcements" className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Latest Announcements</h2>
            {filteredAnnouncements.length > 0 ? (
              <div className="space-y-4">
                {filteredAnnouncements.map(renderPost)}
              </div>
            ) : (
              <div className="text-center py-12">
                <Megaphone className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No announcements match your search</p>
              </div>
            )}
          </TabsContent>

          {/* Q&A Tab */}
          <TabsContent value="qa" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Discussions</h2>
              <Button>Ask Question</Button>
            </div>
            {filteredQA.length > 0 ? (
              <div className="space-y-4">
                {filteredQA.map(renderPost)}
              </div>
            ) : (
              <div className="text-center py-12">
                <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No discussions match your search</p>
              </div>
            )}
          </TabsContent>

          {/* Study Groups Tab */}
          <TabsContent value="groups" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Study Groups</h2>
              <Button>Create Group</Button>
            </div>
            {filteredGroups.length > 0 ? (
              <div className="space-y-4">
                {filteredGroups.map(renderPost)}
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No groups match your search</p>
              </div>
            )}
          </TabsContent>

          {/* Tips Tab */}
          <TabsContent value="tips" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Preparation Tips</h2>
              <Button>Share Tip</Button>
            </div>
            {filteredTips.length > 0 ? (
              <div className="space-y-4">
                {filteredTips.map(renderPost)}
              </div>
            ) : (
              <div className="text-center py-12">
                <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No tips match your search</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Community Guidelines */}
        <Card className="mt-12 bg-primary/5 border-primary/10">
          <CardHeader>
            <CardTitle>Community Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li>✓ Be respectful and constructive in all discussions</li>
              <li>✓ Search before asking to avoid duplicates</li>
              <li>✓ Share solutions and insights generously</li>
              <li>✓ Avoid spam, promotional content, and harassment</li>
              <li>✓ Keep discussions relevant to GATE preparation</li>
            </ul>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Community;
