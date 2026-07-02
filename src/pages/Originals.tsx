import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Sparkles } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/seo/SEO";
import { originals } from "@/data/originals";

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

export default function OriginalsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO 
        title="Atomest Originals | Unique Interactive Products"
        description="Exclusive interactive experiences and decision engines designed by Atomest. Not everything we build is a tool; some ideas deserve their own category."
        canonicalPath="/originals"
      />
      <Navbar />

      <main className="flex-1">
        {/* Premium Hero Section */}
        <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background" />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs font-semibold tracking-wide"
              style={{
                background: "linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(124,58,237,0.08) 100%)",
                border: "1px solid rgba(139,92,246,0.28)",
                color: "rgb(167,139,250)",
              }}
            >
              <Sparkles className="h-3.5 w-3.5 shrink-0" />
              Atomest Innovation Lab
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight-head mb-8 max-w-4xl mx-auto"
            >
              Atomest <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">Originals</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Not everything we build is a tool. Some ideas deserve their own category.
            </motion.p>
          </div>
        </section>

        {/* Featured Showcase */}
        <section className="py-24 bg-muted/10 border-y border-border/40 relative">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-bl from-primary/5 to-transparent pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight-head mb-4">Upcoming Originals</h2>
              <p className="text-muted-foreground text-lg">A sneak peek into what we're building next.</p>
            </motion.div>

            <motion.div 
              variants={STAGGER_CONTAINER}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            >
              {originals.map((original) => (
                <motion.div key={original.slug} variants={STAGGER_ITEM}>
                  <Link href={`/originals/${original.slug}`}>
                    <div className="group block relative rounded-[2rem] overflow-hidden border border-white/10 bg-card/40 backdrop-blur-xl p-10 h-full transition-all duration-500 hover:border-primary/40 hover:shadow-2xl hover:-translate-y-2">
                      <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${original.accentColor} opacity-10 rounded-full blur-[80px] group-hover:opacity-20 transition-opacity duration-500`} />
                      
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-8">
                          <div className={`p-4 rounded-2xl bg-gradient-to-br ${original.accentColor} shadow-lg`}>
                            <original.icon className="h-8 w-8 text-white" />
                          </div>
                          <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-white/10 bg-background/50 backdrop-blur-md">
                            {original.status}
                          </span>
                        </div>
                        
                        <div className="mb-2 text-sm font-semibold text-primary uppercase tracking-widest">
                          {original.badge}
                        </div>
                        <h3 className="text-3xl font-extrabold mb-4">{original.title}</h3>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-8 flex-1">
                          {original.tagline}
                        </p>
                        
                        <div className="flex items-center text-foreground font-bold group-hover:text-primary transition-colors mt-auto">
                          Explore Preview <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Philosophy / Why we build them */}
        <section className="py-32 container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-extrabold tracking-tight-head mb-8">Why Originals?</h2>
            <div className="text-xl text-muted-foreground leading-relaxed space-y-6">
              <p>
                Atomest started with a simple mission: build the best browser-based utility tools on the internet. But as we solved everyday problems, we discovered deeper challenges that couldn't be addressed with a simple converter or calculator.
              </p>
              <p>
                How do you visualize the long-term compounding effects of a single decision? How do you mathematically verify if a life goal is actually achievable?
              </p>
              <p className="text-foreground font-medium">
                To solve these, we created Atomest Originals. They are interactive engines designed to help you think clearer, plan better, and see the world from a different perspective.
              </p>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
