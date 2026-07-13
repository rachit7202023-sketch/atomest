import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Plus, 
  Search, 
  Briefcase, 
  Clock, 
  MoreVertical, 
  Copy, 
  Edit2, 
  Trash2,
  FolderOpen,
  FileText,
  Users,
  BarChart3,
  ArrowUpDown
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { formatDistanceToNow, format } from "date-fns";

// Skeleton component for loading
function ProjectCardSkeleton() {
  return (
    <Card className="border-border/40 bg-card/50">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 rounded-lg skeleton-shimmer mb-3" />
        </div>
        <div className="h-5 w-3/4 skeleton-shimmer rounded mb-2" />
        <div className="h-4 w-1/2 skeleton-shimmer rounded" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="h-3 w-full skeleton-shimmer rounded" />
          <div className="h-3 w-2/3 skeleton-shimmer rounded" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "name">("newest");
  const [, setLocation] = useLocation();

  const { data: projects, isLoading, refetch } = useQuery({
    queryKey: ['recruiter-ai-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('product_type', 'recruiter-ai')
        .neq('status', 'trash')
        .order('updated_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const handleCreateNew = () => {
    setLocation('/ai-products/recruiter-ai/app/new');
  };

  const handleSoftDelete = async (id: string) => {
    const { error } = await supabase
      .from('projects')
      .update({ status: 'trash', deleted_at: new Date().toISOString() })
      .eq('id', id);
    
    if (!error) refetch();
  };

  const handleRename = async (id: string, currentTitle: string) => {
    const newTitle = window.prompt("Enter new project name:", currentTitle);
    if (!newTitle || newTitle === currentTitle) return;

    const { error } = await supabase
      .from('projects')
      .update({ title: newTitle })
      .eq('id', id);

    if (!error) refetch();
  };

  const handleDuplicate = async (project: any) => {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;

    const { error } = await supabase
      .from('projects')
      .insert({
        user_id: userData.user.id,
        product_type: project.product_type,
        title: `${project.title} (Copy)`,
        input_data: project.input_data,
        status: 'active'
      });

    if (!error) refetch();
  };

  const filteredProjects = projects?.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.input_data?.jobTitle || "").toLowerCase().includes(searchQuery.toLowerCase())
  )?.sort((a, b) => {
    if (sortOrder === "newest") return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    if (sortOrder === "oldest") return new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
    return a.title.localeCompare(b.title);
  });

  return (
    <ProtectedRoute>
      <Navbar />
      <div className="min-h-screen bg-background pt-20 pb-12">
        <div className="container mx-auto max-w-6xl px-4">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Hiring Projects</h1>
              <p className="text-sm text-muted-foreground mt-0.5">Manage all your generated interview kits.</p>
            </div>
            <Button onClick={handleCreateNew} className="h-10 px-5 font-semibold text-sm">
              <Plus className="w-4 h-4 mr-2" /> New Hiring Project
            </Button>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search projects..." 
                className="pl-9 h-10 bg-card/50 border-border/40"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              className="h-10 border-border/40 bg-card/50 text-sm"
              onClick={() => setSortOrder(s => s === "newest" ? "oldest" : s === "oldest" ? "name" : "newest")}
            >
              <ArrowUpDown className="w-3.5 h-3.5 mr-2" />
              {sortOrder === "newest" ? "Newest First" : sortOrder === "oldest" ? "Oldest First" : "By Name"}
            </Button>
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map(i => <ProjectCardSkeleton key={i} />)}
            </div>
          ) : filteredProjects?.length === 0 ? (
            <Card className="border-dashed border-border/40 bg-transparent">
              <CardContent className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-14 h-14 rounded-2xl bg-muted/30 flex items-center justify-center mb-4">
                  <Briefcase className="w-7 h-7 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-1.5">No Hiring Kits Yet</h3>
                <p className="text-sm text-muted-foreground max-w-sm mb-6">
                  {searchQuery ? "No projects match your search." : "Create your first project to turn a job description into a complete hiring kit."}
                </p>
                {!searchQuery && (
                  <Button onClick={handleCreateNew} variant="secondary" size="sm">
                    Create Your First Hiring Kit
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProjects?.map(project => {
                const resumeCount = project.input_data?.resumes?.length || 0;
                const experienceLevel = project.input_data?.experienceLevel;
                const companySize = project.input_data?.companySize;
                
                return (
                  <Card key={project.id} className="border-border/40 bg-card/50 hover:bg-card/70 transition-all duration-200 group relative min-h-[200px] flex flex-col">
                    <CardHeader className="pb-3 flex-1">
                      <div className="flex justify-between items-start">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreVertical className="w-3.5 h-3.5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setLocation(`/ai-products/recruiter-ai/app/${project.id}`)}>
                              <FolderOpen className="w-3.5 h-3.5 mr-2" /> Open
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDuplicate(project)}>
                              <Copy className="w-3.5 h-3.5 mr-2" /> Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleRename(project.id, project.title)}>
                              <Edit2 className="w-3.5 h-3.5 mr-2" /> Rename
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-400 focus:text-red-300" onClick={() => handleSoftDelete(project.id)}>
                              <Trash2 className="w-3.5 h-3.5 mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardTitle className="text-base line-clamp-1">{project.title}</CardTitle>
                      <CardDescription className="text-xs line-clamp-1 mt-0.5">
                        {project.input_data?.jobTitle || "Draft"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {/* Metadata Row */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[10px] text-muted-foreground mb-3">
                        {resumeCount > 0 && (
                          <div className="flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            <span>{resumeCount} resume{resumeCount !== 1 ? 's' : ''}</span>
                          </div>
                        )}
                        {experienceLevel && (
                          <div className="flex items-center gap-1">
                            <BarChart3 className="w-3 h-3" />
                            <span>{experienceLevel}</span>
                          </div>
                        )}
                        {companySize && (
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span>{companySize}</span>
                          </div>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-border/20">
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>Updated {formatDistanceToNow(new Date(project.updated_at))} ago</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          project.status === 'active' 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {project.status === 'active' ? 'Active' : project.status}
                        </span>
                      </div>
                    </CardContent>
                    
                    <Link href={`/ai-products/recruiter-ai/app/${project.id}`} className="absolute inset-0 z-0" />
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
