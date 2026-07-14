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
            <div className="mx-auto max-w-sm mt-12 p-[1px] rounded-3xl bg-gradient-to-br from-primary/50 via-purple-500/30 to-blue-500/50 shadow-[0_0_40px_-10px_rgba(var(--primary),0.3)] relative group overflow-hidden">
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out mix-blend-overlay blur-md" />
              <div className="relative bg-background/40 dark:bg-black/40 backdrop-blur-2xl rounded-[23px] p-6 flex flex-col items-center justify-center text-center gap-3 border border-white/10 dark:border-white/5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center shadow-inner shadow-white/20 mb-1 border border-white/20">
                  <Sparkles className="w-7 h-7 text-white drop-shadow-md" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 dark:from-white dark:to-white/70">
                    Atomest AI Suite
                  </h3>
                  <p className="text-sm text-muted-foreground font-semibold mt-1 uppercase tracking-wider">
                    Enterprise Automation
                  </p>
                </div>
              </div>
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

            <div className="grid grid-cols-1 gap-8 max-w-3xl mx-auto">
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
                  <a href="/ai-products/recruiter-ai" className="w-full sm:w-auto">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all">
                      Open Application
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
