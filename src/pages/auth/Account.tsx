import { useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { LogOut, User, Building, Mail, Activity, BarChart3 } from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function Account() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setLocation("/");
    }
  };

  const profile = user?.user_metadata;

  return (
    <ProtectedRoute>
      <Navbar />
      <div className="min-h-screen bg-background pt-20 pb-12">
        <div className="container mx-auto max-w-4xl px-4 space-y-8">
          
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Manage your profile and view your usage.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Profile Card */}
            <Card className="md:col-span-2 border-border/40 bg-card/50">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold border border-primary/20">
                    {profile?.full_name ? profile.full_name.substring(0, 1).toUpperCase() : user?.email?.substring(0, 1).toUpperCase()}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">{profile?.full_name || "Atomest User"}</h3>
                    <p className="text-muted-foreground flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4" /> {user?.email}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border/30">
                  <div className="space-y-1 text-sm">
                    <span className="text-muted-foreground flex items-center gap-2"><User className="w-4 h-4"/> Full Name</span>
                    <p className="font-medium">{profile?.full_name || "Not provided"}</p>
                  </div>
                  <div className="space-y-1 text-sm">
                    <span className="text-muted-foreground flex items-center gap-2"><Building className="w-4 h-4"/> Company</span>
                    <p className="font-medium">{profile?.company || "Not provided"}</p>
                  </div>
                </div>

                <div className="pt-4">
                  <Button variant="outline" className="border-border/40">Edit Profile</Button>
                </div>
              </CardContent>
            </Card>

            {/* Subscription & Logout */}
            <div className="space-y-6">
              <Card className="border-border/40 bg-card/50">
                <CardHeader>
                  <CardTitle>Subscription</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                    <p className="text-sm font-semibold text-primary">Free Tier (Beta)</p>
                    <p className="text-xs text-muted-foreground mt-1">Unlimited generations during beta.</p>
                  </div>
                  <Button className="w-full">Upgrade Plan</Button>
                </CardContent>
              </Card>

              <Button variant="destructive" className="w-full bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" /> Sign Out
              </Button>
            </div>
          </div>

          {/* Analytics Overview */}
          <h2 className="text-lg font-semibold tracking-tight pt-6 border-t border-border/30">Usage & Analytics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="border-border/40 bg-card/50">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-400">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Projects Created</p>
                  <h4 className="text-2xl font-bold">--</h4>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/40 bg-card/50">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Kits Generated</p>
                  <h4 className="text-2xl font-bold">--</h4>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/40 bg-card/50">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Time</p>
                  <h4 className="text-2xl font-bold">--s</h4>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
}
