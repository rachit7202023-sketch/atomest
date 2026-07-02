import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Sparkles, Activity, Clock, TrendingUp } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/seo/SEO";

export default function RipplePreview() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO 
        title="Ripple Preview | Atomest Originals"
        description="Every decision creates a ripple. See where it leads. An interactive decision mapping engine in development."
        canonicalPath="/originals/ripple"
      />
      <Navbar />

      <main className="flex-1">
        <section className="relative pt-24 pb-32 overflow-hidden border-b border-border/40">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent pointer-events-none" />
          
          <div className="container mx-auto px-4 relative z-10 max-w-4xl">
            <Link href="/originals">
              <button className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-12">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Originals
              </button>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg shadow-purple-500/20">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <div>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10 bg-card mb-2 inline-block text-purple-400">
                  Atomest Original
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10 bg-background/50 backdrop-blur-md ml-2 inline-block">
                  Design Phase
                </span>
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight-head mb-6"
            >
              Ripple
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl text-muted-foreground mb-12 leading-relaxed"
            >
              Every decision creates a ripple. <br className="hidden md:block"/>
              See exactly where it leads.
            </motion.p>
          </div>
        </section>

        <section className="py-24 container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">The Philosophy</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Most people underestimate the power of compounding. Whether it's saving $5 a day, reading 10 pages a night, or delaying a critical project by a week, small actions accumulate into massive outcomes over time.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Ripple is an interactive engine that visualizes this phenomenon. It maps your current decisions into the future, mathematically projecting the long-term consequences of your daily choices.
              </p>
            </div>
            
            <div className="bg-card/40 border border-white/5 rounded-3xl p-8 backdrop-blur-md flex flex-col justify-center">
              <h3 className="text-xl font-bold mb-8">What it solves</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary mt-1"><Activity className="h-5 w-5" /></div>
                  <div>
                    <strong className="block text-foreground mb-1">Visualizing Outcomes</strong>
                    <span className="text-muted-foreground text-sm">See the exact mathematical trajectory of habits.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary mt-1"><Clock className="h-5 w-5" /></div>
                  <div>
                    <strong className="block text-foreground mb-1">Time Discounting</strong>
                    <span className="text-muted-foreground text-sm">Overcome the psychological bias that devalues future rewards.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary mt-1"><TrendingUp className="h-5 w-5" /></div>
                  <div>
                    <strong className="block text-foreground mb-1">Opportunity Cost</strong>
                    <span className="text-muted-foreground text-sm">Understand exactly what you give up when making a choice.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
