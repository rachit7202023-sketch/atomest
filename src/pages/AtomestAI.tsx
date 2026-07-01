import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles, BookOpen, Code2, PenTool, TrendingUp, Briefcase, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { tools } from "@/data/tools";
import { ToolCard } from "@/components/ToolCard";

export default function AtomestAI() {
  const aiTools = tools.filter(t => t.category === "ai");
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-32">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background z-0" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] opacity-50 z-0 pointer-events-none" />
          
          <div className="container relative z-10 mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm rounded-full bg-primary/10 text-primary border-primary/20 font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                Early Preview
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                Your Browser,<br />Supercharged.
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                Meet Atomest AI — intelligent workspaces that help you study, code, write, create, and work faster.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="rounded-xl h-14 px-8 text-base font-semibold w-full sm:w-auto gap-2 group">
                  <Sparkles className="w-5 h-5 group-hover:text-yellow-300 transition-colors" />
                  Explore AI
                </Button>
                <Button size="lg" variant="outline" className="rounded-xl h-14 px-8 text-base font-semibold w-full sm:w-auto bg-background/50 backdrop-blur">
                  Join Waitlist
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Workspaces Grid */}
        <section className="container mx-auto px-4 pb-32">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto justify-center">
            {aiTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ToolCard tool={tool} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden py-32 border-t">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-primary/5 z-0" />
          <div className="container relative z-10 mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              The Future of Atomest Starts Here
            </h2>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              We're building an AI experience focused on speed, privacy, and practical productivity.
            </p>
            <Button size="lg" className="rounded-xl h-14 px-10 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
              Join the Waitlist
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
