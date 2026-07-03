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
    <section className="py-16 md:py-24 relative overflow-hidden bg-background">
      {/* Premium Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-500/3 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6 text-xs font-bold tracking-[0.2em] uppercase border border-primary/20 bg-primary/5 text-primary">
            <Sparkles className="h-3 w-3 shrink-0" />
            Flagship Experiences
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tighter mb-6 leading-[1.05]">
            Atomest <span className="bg-clip-text text-transparent bg-gradient-to-br from-primary to-primary/40">Originals</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
            Exclusive interactive products crafted by Atomest. 
            Because some problems deserve more than a utility.
          </p>
        </motion.div>

        <motion.div 
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {originals.map((original) => (
            <motion.div 
              key={original.slug} 
              variants={STAGGER_ITEM}
              className="flex"
            >
              <Link href={`/originals/${original.slug}`} className="w-full">
                <div className="group block relative rounded-[2rem] overflow-hidden border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] backdrop-blur-3xl p-8 md:p-10 transition-all duration-500 hover:border-white/10 hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]">
                  <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-bl ${original.accentColor} opacity-0 rounded-full blur-[80px] group-hover:opacity-[0.05] transition-opacity duration-500 pointer-events-none`} />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-8">
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${original.accentColor} shadow-xl`}>
                        <original.icon className="h-7 w-7 text-white drop-shadow-md" />
                      </div>
                      <span className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border border-white/10 bg-background/50 backdrop-blur-md text-muted-foreground group-hover:text-foreground transition-colors">
                        {original.status}
                      </span>
                    </div>
                    
                    <div className="mb-3 text-xs font-bold text-primary uppercase tracking-[0.2em]">
                      {original.badge}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black tracking-tighter mb-4">{original.title}</h3>
                    
                    {/* The tagline is wrapped in a container that expands slightly on hover, avoiding being cut off */}
                    <div className="overflow-hidden transition-all duration-500 max-h-[100px] group-hover:max-h-[200px] mb-8">
                      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-medium">
                        {original.tagline}
                      </p>
                    </div>
                    
                    <div className="flex items-center text-muted-foreground font-bold group-hover:text-primary transition-colors mt-auto text-base">
                      Explore Preview <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-2 transition-transform duration-500" />
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
            <button className="group inline-flex items-center gap-2 px-8 h-[52px] rounded-full text-base font-bold text-foreground bg-transparent border border-white/10 hover:bg-white/5 transition-all duration-300">
              View All Originals
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2 text-primary" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
