import { Link } from "wouter";
import { ArrowRight, Zap, Shield, Globe, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { HeroSection } from "@/components/HeroSection";
import { AtomestOriginalsSection } from "@/components/AtomestOriginalsSection";
import { ToolCard } from "@/components/ToolCard";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/seo/SEO";
import { products as tools } from "@/data/products";
import { categories } from "@/data/categories";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GoogleAd } from "@/components/ads/GoogleAd";
import { AD_SLOTS } from "@/config/ads";


const featuredSlugs = [
  "word-counter", "json-formatter", "password-generator", "qr-code-generator",
  "base64", "color-picker", "bmi-calculator", "uuid-generator"
];

const faqs = [
  {
    q: "Is Atomest completely free?",
    a: "Yes, all tools on Atomest are 100% free to use. No sign-up, no subscription, no hidden fees — ever."
  },
  {
    q: "Do I need to create an account?",
    a: "No account needed. Just open a tool and start using it immediately. Your privacy is our priority."
  },
  {
    q: "Are my files and data safe?",
    a: "Absolutely. All tools run entirely in your browser. Your data never leaves your device — no server uploads required."
  },
  {
    q: "How many tools does Atomest have?",
    a: "We currently offer 31 fully functional tools across 22 categories, with new tools added regularly."
  },
  {
    q: "Can I suggest a new tool?",
    a: "We love suggestions! If there's a tool you'd like to see, reach out to us and we'll consider adding it."
  },
  {
    q: "Do the tools work on mobile?",
    a: "Yes. Every tool is mobile-first and responsive. Atomest works beautifully on any device or screen size."
  },
];

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

export default function Home() {
  const featuredTools = featuredSlugs
    .map(slug => tools.find(t => t.slug === slug))
    .filter(Boolean) as typeof tools;

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans selection:bg-primary/30">
      <SEO 
        title="The Internet's Toolbox"
        description="31+ free online tools for developers, students, creators and everyone. No sign-up required."
        canonicalPath="/"
      />
      <Navbar />

      <HeroSection />

      <AtomestOriginalsSection />

      <GoogleAd adSlot={AD_SLOTS.HOMEPAGE_TOP} className="w-full max-w-5xl mx-auto my-12" />

      {/* Featured Bento Box -> Now symmetrical grid */}
      <section className="container mx-auto px-4 py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent opacity-30 pointer-events-none" />
        
        {/* Section heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 relative z-10 text-center sm:text-left flex flex-col sm:flex-row justify-between items-end"
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4 leading-[1.1]">
              Tools that <br className="hidden sm:block" /> get out of your way.
            </h2>
            <p className="text-muted-foreground text-lg max-w-lg leading-relaxed font-medium">
              Discover the utilities thousands of users rely on daily.
              Blazing fast, strictly private, and beautifully crafted.
            </p>
          </div>
          <Link href="/tools">
            <button className="hidden sm:inline-flex items-center gap-2 px-6 h-[48px] rounded-full text-[14px] font-bold text-foreground bg-transparent border border-white/10 hover:bg-white/5 transition-all duration-300 mt-6 sm:mt-0">
              Explore All Tools <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </motion.div>

        {/* Symmetrical Grid */}
        <motion.div 
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
        >
          {featuredTools.slice(0, 8).map((tool) => (
            <motion.div key={tool.id} variants={STAGGER_ITEM}>
               <div className="h-full group hover:-translate-y-1 transition-transform duration-500">
                <ToolCard tool={tool} popular={false} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile CTA */}
        <div className="mt-10 text-center sm:hidden">
          <Link href="/tools">
            <button className="w-full inline-flex justify-center items-center gap-2 px-6 h-[48px] rounded-full text-[14px] font-bold text-foreground bg-transparent border border-white/10 hover:bg-white/5 transition-all duration-300">
              Explore All Tools <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </section>

      <GoogleAd adSlot={AD_SLOTS.HOMEPAGE_MID} className="w-full max-w-5xl mx-auto my-12" />

      {/* Categories minimal list */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-5xl font-black tracking-tighter mb-4">Built for every workflow.</h2>
            <p className="text-muted-foreground text-lg font-medium">Find exactly what you need, instantly.</p>
          </motion.div>
          
          <motion.div 
            variants={STAGGER_CONTAINER}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
          >
            {categories.filter(cat => !cat.isWorkspace).map(cat => (
              <motion.div key={cat.id} variants={STAGGER_ITEM}>
                <Link href={`/categories/${cat.id}`}>
                  <button className="px-5 py-3 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 hover:scale-105 transition-all duration-300 flex items-center gap-2 font-bold text-base">
                    <cat.icon className="h-4 w-4 text-primary" /> {cat.name}
                  </button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Atomest */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter mb-6">
              No servers. No tracking.<br className="hidden sm:block"/> No compromises.
            </h2>
          </motion.div>
          
          <motion.div 
            variants={STAGGER_CONTAINER}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-5xl mx-auto"
          >
            {[
              { icon: Zap, title: "Zero Latency", desc: "Results appear as you type. Everything computes locally in your browser for instant feedback." },
              { icon: Shield, title: "Absolute Privacy", desc: "Your data never leaves your device. No uploads, no telemetry, no tracking." },
              { icon: Globe, title: "Free Forever", desc: "No sign-ups. No subscriptions. No premium tiers. Just open and go." },
              { icon: Clock, title: "Always Available", desc: "Designed to work perfectly offline once loaded. Your tools are always ready." },
            ].map(({ icon: Icon, title, desc }) => (
              <motion.div 
                key={title} 
                variants={STAGGER_ITEM}
                className="flex gap-6 group"
              >
                <div className="mt-1 bg-white/5 p-4 rounded-[16px] shrink-0 border border-white/5 group-hover:bg-primary/10 transition-colors duration-500">
                  <Icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 tracking-tight text-foreground/90">{title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed font-medium">{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-black tracking-tighter">Frequently Asked</h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-white/5 rounded-[20px] px-6 py-1 bg-transparent hover:bg-white/5 transition-colors">
                <AccordionTrigger className="text-left font-bold text-lg hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6 font-medium">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </section>

      {/* Newsletter */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#050505]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-4xl sm:text-6xl font-black text-white mb-6 tracking-tighter">Join the revolution.</h2>
            <p className="text-white/60 text-lg sm:text-xl mb-12 font-medium leading-relaxed">
              Get notified when we release new Atomest Originals and premium tools. No spam, just value.
            </p>
            <div className="flex flex-col sm:flex-row max-w-lg mx-auto gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-full border border-white/10 bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:border-primary/50 focus:bg-white/10 backdrop-blur-md transition-all text-base"
                data-testid="input-newsletter-email"
              />
              <button className="bg-white text-black hover:bg-white/90 font-bold px-8 py-4 rounded-full transition-all hover:scale-105 active:scale-95 text-base" data-testid="button-newsletter-subscribe">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

