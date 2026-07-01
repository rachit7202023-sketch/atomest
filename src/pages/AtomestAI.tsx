import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Zap, Shield, BookOpen, Code2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { tools } from "@/data/tools";
import { ToolCard } from "@/components/ToolCard";
import { SEO } from "@/components/seo/SEO";

const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const STAGGER_ITEM = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
};

export default function AtomestAI() {
  const aiTools = tools.filter(t => t.category === "ai");

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <SEO 
        title="Atomest AI Workspace"
        description="Intelligent workspaces that help you study, code, write, create, and work faster."
        canonicalPath="/ai"
      />
      
      {/* Deep Violet Ambient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1E1145]/40 via-background to-background pointer-events-none -z-10" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#6d28d9]/10 rounded-full blur-[150px] pointer-events-none -z-10 translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#4f46e5]/10 rounded-full blur-[120px] pointer-events-none -z-10 -translate-x-1/4 translate-y-1/4" />

      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-12 md:py-20 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs sm:text-sm font-semibold tracking-wide border border-[#8b5cf6]/30 bg-[#8b5cf6]/10 text-[#a78bfa] shadow-[0_0_20px_rgba(139,92,246,0.15)]">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Atomest AI
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight-head mb-6 leading-[1.1]">
            Intelligence built for <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#a78bfa] to-[#818cf8]">
              professional workflows.
            </span>
          </h1>
          
          <p className="text-[1.1rem] md:text-[1.25rem] text-muted-foreground max-w-2xl leading-relaxed mb-8">
            Access specialized AI environments designed to help you study, code, write, and analyze faster. No prompt engineering required.
          </p>
        </motion.div>

        {/* Workspaces Dashboard Grid */}
        <motion.div 
          variants={STAGGER_CONTAINER}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24"
        >
          {aiTools.map((tool) => (
            <motion.div key={tool.id} variants={STAGGER_ITEM} className="h-full">
              <ToolCard tool={tool} />
            </motion.div>
          ))}
        </motion.div>

        {/* Features / Principles Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 pt-16 border-t border-white/5"
        >
          {[
            { icon: Zap, title: "Zero Configuration", desc: "Select a workspace and start immediately. Pre-configured for optimal results." },
            { icon: Shield, title: "Private by Default", desc: "We don't train our models on your personal data. Your workspace is yours." },
            { icon: BookOpen, title: "Context Aware", desc: "Tools that understand your specific domain, whether it's code, prose, or data." }
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-[#8b5cf6]/10 text-[#a78bfa] flex items-center justify-center mb-6 border border-[#8b5cf6]/20">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-[1.2rem] font-bold tracking-tight mb-3">{title}</h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
