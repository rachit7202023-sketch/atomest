import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Sparkles } from "lucide-react";
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
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

export function AtomestOriginalsSection() {
  return (
    <section className="py-32 relative overflow-hidden bg-background border-y border-border/40">
      {/* Premium Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rose-500/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-semibold tracking-wide border border-primary/20 bg-primary/5 text-primary">
            <Sparkles className="h-3.5 w-3.5 shrink-0 animate-pulse" />
            Flagship Experiences
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight-head mb-6">
            Atomest <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">Originals</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Exclusive interactive experiences designed by Atomest. 
            Not everything we build is a tool.
          </p>
        </motion.div>

        <motion.div 
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-6xl mx-auto"
        >
          {originals.map((original, idx) => (
            <motion.div 
              key={original.slug} 
              variants={STAGGER_ITEM}
              className={`md:col-span-${idx === 0 ? '7' : '5'} flex`}
            >
              <Link href={`/originals/${original.slug}`} className="w-full">
                <div className="group block relative rounded-[2rem] overflow-hidden border border-white/10 bg-card/40 backdrop-blur-2xl p-10 md:p-12 h-full transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:-translate-y-2">
                  <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl ${original.accentColor} opacity-[0.07] rounded-full blur-[80px] group-hover:opacity-[0.15] transition-opacity duration-500`} />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-10">
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${original.accentColor} shadow-xl`}>
                        <original.icon className="h-8 w-8 text-white" />
                      </div>
                      <span className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10 bg-background/50 backdrop-blur-md">
                        {original.status}
                      </span>
                    </div>
                    
                    <div className="mb-3 text-sm font-semibold text-primary uppercase tracking-widest">
                      {original.badge}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-extrabold mb-4">{original.title}</h3>
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

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <Link href="/originals">
            <button className="group inline-flex items-center gap-2 px-8 h-[52px] rounded-xl text-[15px] font-bold text-foreground bg-card border border-border shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 ease-out-expo hover:scale-[1.02] active:scale-[0.98]">
              View All Originals
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-primary" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
