import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Briefcase, FileText, CheckCircle2, ChevronRight, Zap } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";

export default function LandingPage() {
  const features = [
    { title: "LinkedIn Post", desc: "Optimized job postings to attract top talent." },
    { title: "Hiring Summary", desc: "Clear responsibilities and ideal profile." },
    { title: "Interview Plan", desc: "Round-by-round breakdown with goals." },
    { title: "Tailored Questions", desc: "Specific to experience and interview style." },
    { title: "Screening Checklist", desc: "Objective 'Look for...' criteria." },
    { title: "Scorecard", desc: "Printable evaluation rubrics." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-indigo-600 blur-[120px] rounded-full mix-blend-screen" />
        </div>

        <div className="container mx-auto max-w-5xl text-center relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-8"
          >
            <Briefcase className="w-4 h-4" />
            <span>RecruiterAI</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]"
          >
            Turn Any Job Description Into A Complete Interview Kit In Under 2 Minutes.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10 font-light"
          >
            RecruiterAI drafts everything a recruiter needs before interviews begin. Powered by Google Gemini.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/ai-products/recruiter-ai/app">
              <Button className="h-14 px-8 text-lg text-white font-semibold shadow-lg shadow-primary/20 rounded-full">
                Generate Free Hiring Kit <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button variant="outline" className="h-14 px-8 text-lg rounded-full border-border/40 hover:bg-muted/30">
              View Demo
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 border-t border-border/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything you need to hire.</h2>
            <p className="text-muted-foreground">Generated instantly in parallel.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="p-6 rounded-2xl bg-muted/20 border border-border/30 hover:border-primary/30 transition-colors">
                <FileText className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="py-8 text-center border-t border-border/30 bg-muted/20">
        <p className="text-xs text-muted-foreground max-w-2xl mx-auto px-4">
          RecruiterAI generates drafts and interview materials for human review. Recruiters make all hiring decisions. Review and edit AI-generated content before use.
        </p>
      </div>
    </div>
  );
}
