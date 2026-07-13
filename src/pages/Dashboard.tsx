import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, TrendingUp, HeadphonesIcon } from "lucide-react";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <Navbar />
      <div className="min-h-screen bg-background pt-20 px-4 pb-12">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight mb-1">Welcome, {user?.user_metadata?.full_name || "User"}</h1>
            <p className="text-sm text-muted-foreground">Select a product to get started.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* RecruiterAI Card (Active) */}
            <Card className="border-primary/40 bg-card/50 backdrop-blur-sm hover:border-primary/60 transition-all duration-200">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-lg">RecruiterAI</CardTitle>
                <CardDescription className="text-sm">
                  Parse resumes and match candidates in seconds.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/ai-products/recruiter-ai/dashboard">
                  <Button className="w-full h-10 font-semibold text-sm">Open RecruiterAI</Button>
                </Link>
              </CardContent>
            </Card>

            {/* SalesAI Card (Coming Soon) */}
            <Card className="border-border/40 bg-card/30 backdrop-blur-sm opacity-75">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-muted/30 flex items-center justify-center mb-3">
                  <TrendingUp className="w-5 h-5 text-muted-foreground" />
                </div>
                <CardTitle className="text-lg flex items-center gap-2">
                  SalesAI <span className="text-[10px] px-2 py-0.5 bg-muted/50 rounded-full font-medium border border-border/40">Coming Soon</span>
                </CardTitle>
                <CardDescription className="text-sm">
                  Automate outreach and lead qualification.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="secondary" className="w-full h-10 font-semibold text-sm" disabled>Waitlist Joined</Button>
              </CardContent>
            </Card>

            {/* SupportAI Card (Coming Soon) */}
            <Card className="border-border/40 bg-card/30 backdrop-blur-sm opacity-75">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-muted/30 flex items-center justify-center mb-3">
                  <HeadphonesIcon className="w-5 h-5 text-muted-foreground" />
                </div>
                <CardTitle className="text-lg flex items-center gap-2">
                  SupportAI <span className="text-[10px] px-2 py-0.5 bg-muted/50 rounded-full font-medium border border-border/40">Coming Soon</span>
                </CardTitle>
                <CardDescription className="text-sm">
                  Resolve tickets instantly with semantic search.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="secondary" className="w-full h-10 font-semibold text-sm" disabled>Waitlist Joined</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
