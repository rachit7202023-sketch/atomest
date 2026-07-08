import { Link } from "wouter";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Briefcase, TrendingUp, Search, HeadphonesIcon } from "lucide-react";
import { SEO } from "@/components/seo/SEO";

const products = [
  {
    id: "recruiter-ai",
    name: "RecruiterAI",
    status: "Launching Soon",
    statusColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    description: "Upload resumes. Match candidates. Generate interview insights. Hire faster.",
    icon: Briefcase,
    colorFrom: "from-blue-500/20",
    colorTo: "to-indigo-500/5",
    accent: "text-blue-400",
    href: "/products/recruiter-ai",
    featured: true
  },
  {
    id: "sales-ai",
    name: "SalesAI",
    status: "Coming Soon",
    statusColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    description: "Automate outreach. Analyze calls. Close more deals with AI-driven insights.",
    icon: TrendingUp,
    colorFrom: "from-emerald-500/20",
    colorTo: "to-teal-500/5",
    accent: "text-emerald-400",
    href: "#",
    featured: false
  },
  {
    id: "research-ai",
    name: "ResearchAI",
    status: "Coming Soon",
    statusColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    description: "Synthesize thousands of documents into actionable intelligence instantly.",
    icon: Search,
    colorFrom: "from-purple-500/20",
    colorTo: "to-fuchsia-500/5",
    accent: "text-purple-400",
    href: "#",
    featured: false
  },
  {
    id: "support-ai",
    name: "SupportAI",
    status: "Coming Soon",
    statusColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    description: "Resolve tickets automatically with context-aware AI support agents.",
    icon: HeadphonesIcon,
    colorFrom: "from-amber-500/20",
    colorTo: "to-orange-500/5",
    accent: "text-amber-400",
    href: "#",
    featured: false
  }
];

export default function AiProducts() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <SEO 
        title="Premium AI Products for Professionals | Atomest" 
        description="Discover Atomest's suite of premium AI products designed to eliminate repetitive work and accelerate your workflows."
        canonicalPath="/products"
      />

      <main className="container mx-auto px-4 py-24 sm:py-32 relative">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-blue-500 blur-[100px] rounded-full mix-blend-screen" />
        </div>

        <div className="max-w-4xl mx-auto text-center mb-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span>The Future of Atomest</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]"
          >
            Work <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-blue-400">smarter</span>, not harder.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-light"
          >
            Our premium suite of AI products is purpose-built to eliminate repetitive tasks so you can focus on high-impact work.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto relative z-10">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
            >
              <Link href={product.href}>
                <div className={`group relative h-full p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden hover:border-white/20 transition-all duration-500 cursor-pointer ${product.featured ? 'md:col-span-2' : ''}`}>
                  {/* Subtle hover gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${product.colorFrom} ${product.colorTo} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-8">
                      <div className={`p-4 rounded-2xl bg-black/40 border border-white/5 shadow-inner backdrop-blur-md`}>
                        <product.icon className={`w-8 h-8 ${product.accent}`} />
                      </div>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${product.statusColor}`}>
                        {product.status}
                      </span>
                    </div>

                    <h3 className="text-3xl font-bold tracking-tight mb-4 group-hover:text-white transition-colors">
                      {product.name}
                    </h3>
                    
                    <p className="text-lg text-muted-foreground mb-8 flex-grow">
                      {product.description}
                    </p>

                    <div className="flex items-center gap-2 text-sm font-semibold text-white/70 group-hover:text-white transition-colors mt-auto">
                      {product.featured ? 'View Product' : 'Join Waitlist'} 
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
