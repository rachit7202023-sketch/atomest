import { Link } from "wouter";
import { ArrowRight, Zap, Shield, Globe, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { HeroSection } from "@/components/HeroSection";
import { ToolCard } from "@/components/ToolCard";
import { CategoryCard } from "@/components/CategoryCard";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/seo/SEO";
import { tools } from "@/data/tools";
import { categories } from "@/data/categories";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GoogleAd } from "@/components/ads/GoogleAd";
import { AD_SLOTS } from "@/config/ads";
const popularSearches = [
  { name: "Word Counter", slug: "word-counter" },
  { name: "JSON Formatter", slug: "json-formatter" },
  { name: "Password Generator", slug: "password-generator" },
  { name: "QR Code", slug: "qr-code-generator" },
  { name: "Base64", slug: "base64" },
  { name: "UUID Generator", slug: "uuid-generator" },
  { name: "Case Converter", slug: "case-converter" },
  { name: "BMI Calculator", slug: "bmi-calculator" }
];

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

  const recentTools = tools.filter(t => t.category !== "ai").slice(-6);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO 
        title="The Internet's Toolbox"
        description="31+ free online tools for developers, students, creators and everyone. No sign-up required."
        canonicalPath="/"
      />
      <Navbar />

      <HeroSection />

      <GoogleAd adSlot={AD_SLOTS.HOMEPAGE_TOP} className="w-full max-w-5xl mx-auto my-8" />

      {/* Popular Searches */}
      <section className="container mx-auto px-4 pb-16 relative z-10 -mt-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
          className="flex flex-wrap gap-2 justify-center"
        >
          <span className="text-[13px] text-muted-foreground font-semibold py-2 px-2 uppercase tracking-widest">Popular:</span>
          {popularSearches.map(term => (
            <Link key={term.slug} href={`/tools/${term.slug}`}>
              <button
                className="text-[13px] px-5 py-2 rounded-full border border-border/60 bg-card/60 backdrop-blur-md shadow-sm hover:shadow-md hover:border-primary/40 hover:text-primary transition-all font-bold tracking-wide"
                data-testid={`tag-search-${term.slug}`}
              >
                {term.name}
              </button>
            </Link>
          ))}
        </motion.div>
      </section>

      {/* Featured Bento Box */}
      <section className="container mx-auto px-4 py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent opacity-50 pointer-events-none depth-ambient" />
        
        {/* Section heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16 relative z-10"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight-head mb-4">
            Featured Tools
          </h2>
          <p className="text-muted-foreground text-[1.1rem] max-w-xl mx-auto leading-relaxed">
            Discover the tools thousands of users rely on for everyday work.
            Fast, accurate, and perfectly crafted.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div 
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
        >
          {featuredTools.map((tool, index) => (
            <motion.div 
              key={tool.id} 
              variants={STAGGER_ITEM}
              className={
                index === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2 [&>a>div]:h-full [&>a>div]:p-10 [&>a>div>div>h3]:text-3xl [&>a>div>div>p]:text-base" : 
                index === 1 ? "sm:col-span-1 lg:col-span-2" : 
                "col-span-1"
              }
            >
              <ToolCard
                tool={tool}
                popular={[
                  "password-generator",
                  "word-counter",
                  "json-formatter",
                  "qr-code-generator",
                ].includes(tool.slug)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16 relative z-10"
        >
          <Link href="/tools">
            <button className="group inline-flex items-center gap-2 px-8 h-[52px] rounded-xl text-[15px] font-bold text-foreground bg-card border border-border shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 ease-out-expo hover:scale-[1.02] active:scale-[0.98]">
              Explore All Tools
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-primary" />
            </button>
          </Link>
        </motion.div>
      </section>

      <GoogleAd adSlot={AD_SLOTS.HOMEPAGE_MID} className="w-full max-w-5xl mx-auto my-8" />

      {/* Categories Grid */}
      <section className="bg-muted/20 py-24 border-y border-border/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <h2 className="text-4xl font-extrabold tracking-tight-head">Browse by Category</h2>
              <p className="text-muted-foreground text-[1.1rem] mt-3">Find the exact tool you need for your workflow.</p>
            </div>
            <Link href="/categories">
              <button className="hidden sm:inline-flex items-center gap-2 px-6 h-12 rounded-xl text-[14px] font-bold text-foreground bg-background border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300">
                All Categories <ArrowRight className="h-4 w-4 text-primary" />
              </button>
            </Link>
          </motion.div>
          
          <motion.div 
            variants={STAGGER_CONTAINER}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5"
          >
            {categories.filter(cat => !cat.isWorkspace).map(cat => (
              <motion.div key={cat.id} variants={STAGGER_ITEM}>
                <CategoryCard category={cat} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Recently Added */}
      <section className="container mx-auto px-4 py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12"
        >
          <h2 className="text-4xl font-extrabold tracking-tight-head">Recently Added</h2>
          <p className="text-muted-foreground text-[1.1rem] mt-3">The newest tools in our collection</p>
        </motion.div>
        
        <motion.div 
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {recentTools.map(tool => (
            <motion.div key={tool.id} variants={STAGGER_ITEM}>
              <ToolCard tool={tool} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Why Atomest */}
      <section className="bg-muted/10 py-24 relative overflow-hidden border-t border-border/40">
        <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-extrabold tracking-tight-head">Why Atomest?</h2>
            <p className="text-muted-foreground text-[1.1rem] mt-4 max-w-xl mx-auto">
              Built for speed, privacy, and simplicity — the tools you need, right now.
            </p>
          </motion.div>
          
          <motion.div 
            variants={STAGGER_CONTAINER}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: Globe, title: "100% Free Forever", desc: "Every tool is completely free. No premium tiers, no paywalls, no subscriptions." },
              { icon: Shield, title: "Privacy First", desc: "All processing happens in your browser. Your data never leaves your device." },
              { icon: Zap, title: "Instant Results", desc: "No loading screens. Results appear as you type, without any server round-trips." },
              { icon: Clock, title: "No Account Needed", desc: "Just open and use. No sign-up, no email, no personal information required." },
            ].map(({ icon: Icon, title, desc }) => (
              <motion.div 
                key={title} 
                variants={STAGGER_ITEM}
                className="bg-card border border-white/5 shadow-sm rounded-[24px] p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300 depth-base hover:-translate-y-1"
              >
                <div className="bg-primary/10 text-primary p-4 rounded-2xl mb-6 shadow-sm">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-bold text-[1.1rem] mb-3">{title}</h3>
                <p className="text-[14px] text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 py-24 max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-extrabold tracking-tight-head">Frequently Asked Questions</h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-white/5 rounded-2xl px-6 py-1 bg-card shadow-sm hover:shadow-md transition-shadow">
                <AccordionTrigger className="text-left font-bold text-[15px] hover:no-underline hover:text-primary transition-colors py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-[14px] leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </section>

      {/* Newsletter */}
      <section className="bg-foreground py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-50" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-extrabold text-background mb-4 tracking-tight-head">Stay in the Loop</h2>
            <p className="text-background/80 text-[1.1rem] mb-10 max-w-md mx-auto">
              Get notified when we add new tools. No spam, unsubscribe anytime.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-background placeholder:text-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 backdrop-blur-md transition-all text-[15px]"
                data-testid="input-newsletter-email"
              />
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-[0.98] text-[15px]" data-testid="button-newsletter-subscribe">
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
