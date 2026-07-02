import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Target, ShieldAlert, BarChart3, Calculator } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/seo/SEO";

export default function RealityCheckPreview() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO 
        title="Reality Check Preview | Atomest Originals"
        description="Find out whether your biggest life goals are actually achievable. A brutally honest reality simulator."
        canonicalPath="/originals/reality-check"
      />
      <Navbar />

      <main className="flex-1">
        <section className="relative pt-24 pb-32 overflow-hidden border-b border-border/40">
          <div className="absolute inset-0 bg-gradient-to-b from-rose-500/10 via-transparent to-transparent pointer-events-none" />
          
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
              <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 shadow-lg shadow-rose-500/20">
                <Target className="h-8 w-8 text-white" />
              </div>
              <div>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10 bg-card mb-2 inline-block text-rose-400">
                  Exclusive
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10 bg-background/50 backdrop-blur-md ml-2 inline-block">
                  Research Phase
                </span>
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight-head mb-6"
            >
              Reality Check
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl text-muted-foreground mb-12 leading-relaxed"
            >
              Find out whether your biggest life goals <br className="hidden md:block"/>
              are actually achievable.
            </motion.p>
          </div>
        </section>

        <section className="py-24 container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">The Philosophy</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Most advice tells you to dream big and never give up. But optimism without calculation is just a wish. We believe in the power of brutal honesty.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Reality Check strips away the motivational fluff. You input your goal—whether it's retiring at 40, buying a house, or starting a business—and our simulator calculates the exact math, time, and probability required to get there.
              </p>
            </div>
            
            <div className="bg-card/40 border border-white/5 rounded-3xl p-8 backdrop-blur-md flex flex-col justify-center">
              <h3 className="text-xl font-bold mb-8">What it solves</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="bg-rose-500/10 p-2 rounded-lg text-rose-500 mt-1"><Calculator className="h-5 w-5" /></div>
                  <div>
                    <strong className="block text-foreground mb-1">Cold Math</strong>
                    <span className="text-muted-foreground text-sm">Calculates the true cost of your ambitions in time and money.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-rose-500/10 p-2 rounded-lg text-rose-500 mt-1"><ShieldAlert className="h-5 w-5" /></div>
                  <div>
                    <strong className="block text-foreground mb-1">Risk Assessment</strong>
                    <span className="text-muted-foreground text-sm">Evaluates the statistical probability of failure.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-rose-500/10 p-2 rounded-lg text-rose-500 mt-1"><BarChart3 className="h-5 w-5" /></div>
                  <div>
                    <strong className="block text-foreground mb-1">Milestone Mapping</strong>
                    <span className="text-muted-foreground text-sm">Breaks down an impossible dream into necessary daily metrics.</span>
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
