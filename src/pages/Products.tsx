import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Headset, Briefcase, Zap, Sparkles } from "lucide-react";

export default function Products() {
  return (
    <>
      <Helmet>
        <title>AI Products | Atomest</title>
        <meta name="description" content="Purpose-built AI employees that automate recruiting, sales and operations." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50 dark:opacity-20" />
          
          <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 border border-primary/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              <span>Next Generation AI</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70 dark:from-white dark:to-white/60">
              AI Employees for <span className="text-primary">Modern Teams</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Purpose-built AI employees that automate recruiting, sales and operations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg w-full sm:w-auto shadow-xl shadow-primary/25 hover:scale-105 transition-all duration-300">
                Get Early Access
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg w-full sm:w-auto hover:bg-primary/5 transition-all duration-300" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>
                View Products
              </Button>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-24 relative z-10 bg-muted/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Our Product Suite</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Discover specialized AI copilots designed to supercharge every department in your organization.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {/* Recruiter AI */}
              <div className="group relative bg-card border border-border/50 rounded-3xl p-8 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <Users className="w-7 h-7" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-500 border border-green-500/20 backdrop-blur-md">
                      Available Now
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">Recruiter AI</h3>
                  <p className="text-muted-foreground leading-relaxed flex-grow mb-8">
                    An AI recruiting employee that automatically screens resumes, ranks candidates, answers applicant questions and helps recruiters hire faster.
                  </p>
                  <a href="/ai-products/recruiter-ai/dashboard" className="w-full sm:w-auto">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all">
                      Open Application
                    </Button>
                  </a>
                </div>
              </div>

              {/* Sales Copilot */}
              <div className="group relative bg-card/50 border border-border/30 rounded-3xl p-8 hover:bg-card hover:border-border/50 transition-all duration-500">
                <div className="flex items-center justify-between mb-6 opacity-60">
                  <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-600 dark:text-green-400">
                    <Zap className="w-7 h-7" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-muted text-muted-foreground">
                    Coming Soon
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3 opacity-60">Sales Copilot</h3>
                <p className="text-muted-foreground leading-relaxed flex-grow opacity-60">
                  Automate outreach, qualify leads 24/7, and generate hyper-personalized sales collateral to close deals faster.
                </p>
              </div>

              {/* Support Copilot */}
              <div className="group relative bg-card/50 border border-border/30 rounded-3xl p-8 hover:bg-card hover:border-border/50 transition-all duration-500">
                <div className="flex items-center justify-between mb-6 opacity-60">
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <Headset className="w-7 h-7" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-muted text-muted-foreground">
                    Coming Soon
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3 opacity-60">Support Copilot</h3>
                <p className="text-muted-foreground leading-relaxed flex-grow opacity-60">
                  Resolve customer queries instantly, draft empathetic responses, and seamlessly escalate complex issues.
                </p>
              </div>

              {/* Operations Copilot */}
              <div className="group relative bg-card/50 border border-border/30 rounded-3xl p-8 hover:bg-card hover:border-border/50 transition-all duration-500">
                <div className="flex items-center justify-between mb-6 opacity-60">
                  <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
                    <Briefcase className="w-7 h-7" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-muted text-muted-foreground">
                    Coming Soon
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3 opacity-60">Operations Copilot</h3>
                <p className="text-muted-foreground leading-relaxed flex-grow opacity-60">
                  Streamline internal workflows, automate data entry, and orchestrate cross-departmental processes effortlessly.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
