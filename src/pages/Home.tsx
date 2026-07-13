import { Link } from "wouter";
import { ArrowRight, Sparkles, Briefcase, TrendingUp, Search, HeadphonesIcon, Clock, Cpu, ShieldCheck, Download, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { ToolCard } from "@/components/ToolCard";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/seo/SEO";
import { products as tools } from "@/data/products";
import { categories } from "@/data/categories";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { OrbIllustration } from "@/components/OrbIllustration";

const featuredSlugs = [
  "word-counter", "json-formatter", "password-generator", "qr-code-generator",
  "base64", "color-picker", "bmi-calculator", "uuid-generator"
];

const aiProducts = [
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
    href: "/products",
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
    href: "/products",
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
    href: "/products",
  }
];

const faqs = [
  {
    q: "What is Atomest?",
    a: "Atomest is a premium platform building AI-native products for professionals to eliminate repetitive work. We also host a suite of 30+ free browser utilities."
  },
  {
    q: "Are the browser tools still free?",
    a: "Yes! Our entire suite of utilities (like Word Counter, Image Compressor, etc.) remains 100% free and private. No sign-up required."
  },
  {
    q: "When will the AI products launch?",
    a: "RecruiterAI is currently in private beta and will be launching soon. You can join the waitlist on its product page to get early access."
  },
  {
    q: "How does Atomest handle privacy?",
    a: "Our free tools run entirely locally in your browser. For our premium AI products, we utilize enterprise-grade security and strict data retention policies to ensure your business data is never used to train public models."
  }
];

const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
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
    <div className="min-h-screen bg-background flex flex-col font-sans selection:bg-primary/30 overflow-x-hidden">
      <SEO 
        title="Atomest | Premium AI Products for Professionals"
        description="Premium AI products that eliminate repetitive work and help teams move faster. Work smarter, not harder with Atomest."
        canonicalPath="/"
      />
      <Navbar />

      {/* SECTION 1: Hero */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-primary via-purple-500 to-transparent blur-[120px] rounded-full mix-blend-screen" />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          <div className="flex-1 text-center lg:text-left pt-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-semibold mb-8 backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-white/80">30+ Free Browser Tools Included</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter mb-8 leading-[1.05]"
            >
              Build Less.<br className="hidden sm:block" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-blue-400">Automate More.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-12 font-medium"
            >
              Premium AI products that eliminate repetitive work and help teams move faster.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8"
            >
              {/* 
              <Link href="/products">
                <Button className="h-14 px-8 text-base font-bold bg-white text-black hover:bg-gray-200 w-full sm:w-auto shadow-lg shadow-white/10">
                  Explore AI Products
                </Button>
              </Link>
              */}
              <Link href="/tools">
                <Button variant="outline" className="h-14 px-8 text-base font-bold bg-white/5 border-white/10 hover:bg-white/10 text-white w-full sm:w-auto backdrop-blur-md">
                  Browse Free Tools
                </Button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex-1 w-full max-w-[450px] lg:max-w-[500px] flex justify-center lg:justify-end"
          >
            <OrbIllustration />
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Featured AI Products (HIDDEN FOR NOW) 
      <section className="py-24 relative border-t border-white/5 bg-black/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-16">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4">The Future of Work</h2>
            <p className="text-muted-foreground text-xl">Purpose-built AI workflows for every department.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aiProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={product.href}>
                  <div className={`group relative h-full p-8 sm:p-10 rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden hover:border-white/20 transition-all duration-500 cursor-pointer`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${product.colorFrom} ${product.colorTo} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-start justify-between mb-8">
                        <div className={`p-4 rounded-2xl bg-black/40 border border-white/5 shadow-inner backdrop-blur-md`}>
                          <product.icon className={`w-8 h-8 ${product.accent}`} />
                        </div>
                        <span className={`px-4 py-1.5 text-xs font-bold tracking-wide uppercase rounded-full border ${product.statusColor}`}>
                          {product.status}
                        </span>
                      </div>

                      <h3 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 group-hover:text-white transition-colors">
                        {product.name}
                      </h3>
                      
                      <p className="text-lg text-muted-foreground mb-8 flex-grow leading-relaxed">
                        {product.description}
                      </p>

                      <div className="flex items-center gap-2 text-sm font-bold text-white/70 group-hover:text-white transition-colors mt-auto">
                        {product.id === 'recruiter-ai' ? 'Notify Me' : 'Learn More'} 
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* SECTION 3: Why Atomest */}
      <section className="py-24 relative border-t border-white/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4">Why Atomest</h2>
            <p className="text-muted-foreground text-xl">We don't build toys. We build tools that scale.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Clock, title: "Save Hours", desc: "Replace manual, repetitive work with intelligent AI workflows that run in seconds." },
              { icon: Cpu, title: "AI Native", desc: "Purpose-built interfaces designed from the ground up for AI, instead of generic chat boxes." },
              { icon: ShieldCheck, title: "Privacy First", desc: "Enterprise-grade security and strict data boundaries ensure your intellectual property is safe." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-[24px] bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Free Browser Tools */}
      <section className="py-24 relative border-t border-white/5 bg-black/30">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent opacity-30 pointer-events-none" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center flex flex-col items-center justify-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter mb-6 leading-[1.1]">
              Over 30+ Free Browser Tools.
            </h2>
            <p className="text-muted-foreground text-xl leading-relaxed font-medium mb-10">
              The internet's fastest toolbox. Blazing fast, strictly private, and beautifully crafted. We've included over 30 utilities designed to speed up your day-to-day workflow.
            </p>
            <Link href="/tools">
              <Button className="h-14 px-8 text-lg font-bold rounded-full bg-white text-black hover:bg-gray-200 shadow-lg shadow-white/5">
                Explore All Free Tools <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: How It Works */}
      <section className="py-24 relative border-t border-white/5">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4">How It Works</h2>
            <p className="text-muted-foreground text-xl">Four simple steps to automate your workflow.</p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-px bg-white/10 -translate-y-1/2" />

            {[
              { icon: Sparkles, title: "Choose an AI Product" },
              { icon: Download, title: "Upload your work" },
              { icon: Cpu, title: "AI completes the workflow" },
              { icon: CheckCircle2, title: "Download results instantly" }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex flex-col items-center text-center w-full md:w-1/4 bg-background z-10 p-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-xl">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-sm font-bold text-primary mb-2">STEP {i + 1}</div>
                <h3 className="text-lg font-bold">{step.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Pricing Preview */}
      <section id="pricing" className="py-24 relative border-t border-white/5 bg-black/50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">Start with what you need and scale as you grow. No hidden fees or complex enterprise negotiations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Pay Per Project */}
            <div className="relative p-8 sm:p-10 rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col hover:border-blue-500/30 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-2">Pay Per Project</h3>
              <p className="text-muted-foreground mb-6">Perfect for occasional hiring needs.</p>
              <div className="mb-8 flex items-baseline gap-2">
                <span className="text-5xl font-black">$49</span>
                <span className="text-muted-foreground font-medium">/ project</span>
              </div>
              
              <ul className="space-y-4 mb-8 flex-grow font-medium">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <span>Generate complete Hiring Kits (12 artifacts)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <span>Up to 100 resumes per upload limit</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <span>AI Semantic Resume Matching</span>
                </li>
              </ul>
              
              <Link href="/signup">
                <Button className="w-full h-12 bg-white/10 hover:bg-white/20 text-white font-bold text-base mt-auto rounded-full">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Monthly Subscription */}
            <div className="relative p-8 sm:p-10 rounded-[32px] border border-blue-500/50 bg-blue-900/10 backdrop-blur-xl flex flex-col hover:border-blue-500 transition-all duration-300 transform md:-translate-y-4 shadow-2xl shadow-blue-900/20">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-blue-500/30">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Monthly Subscription</h3>
              <p className="text-blue-200/60 mb-6">For teams actively growing their headcount.</p>
              <div className="mb-8 flex items-baseline gap-2">
                <span className="text-5xl font-black">$199</span>
                <span className="text-blue-200/60 font-medium">/ user / month</span>
              </div>
              
              <ul className="space-y-4 mb-8 flex-grow font-medium text-white/90">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <span className="font-bold text-white">Unlimited Hiring Projects</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <span>Up to 100 resumes per upload limit</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <span>Team collaboration & sharing</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <span>Priority API processing speed</span>
                </li>
              </ul>
              
              <Link href="/signup">
                <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold text-base mt-auto shadow-lg shadow-blue-600/20 rounded-full">
                  Subscribe Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: FAQ */}
      <section className="container mx-auto px-4 py-24 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4">Frequently Asked</h2>
        </div>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border border-white/5 rounded-[20px] px-6 py-2 bg-white/5 hover:bg-white/10 transition-colors">
              <AccordionTrigger className="text-left font-bold text-lg hover:no-underline py-4">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6 font-medium">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <Footer />
    </div>
  );
}
