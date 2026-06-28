import { Link } from "wouter";
import { ArrowRight, Zap, Shield, Globe, Clock, Sparkles, ChevronRight } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { ToolCard } from "@/components/ToolCard";
import { CategoryCard } from "@/components/CategoryCard";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { tools } from "@/data/tools";
import { categories } from "@/data/categories";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const popularSearches = [
  "Word Counter", "JSON Formatter", "Password Generator",
  "QR Code", "Base64", "UUID Generator", "Case Converter", "BMI Calculator"
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

export default function Home() {
  const featuredTools = featuredSlugs
    .map(slug => tools.find(t => t.slug === slug))
    .filter(Boolean) as typeof tools;

  const recentTools = tools.slice(-6);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28">
        {/* Background mesh */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          {/* Soft radial base */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,hsl(var(--primary)/0.12),transparent)]" />
          {/* Left accent orb */}
          <div className="absolute -left-40 top-10 w-[480px] h-[480px] rounded-full bg-[hsl(var(--primary)/0.07)] blur-[120px]" />
          {/* Right accent orb */}
          <div className="absolute -right-40 bottom-0 w-[400px] h-[400px] rounded-full bg-[hsl(var(--primary)/0.05)] blur-[100px]" />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(var(--foreground)) 1px,transparent 1px),linear-gradient(90deg,hsl(var(--foreground)) 1px,transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative flex flex-col items-center text-center">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 bg-primary/8 dark:bg-primary/12 text-primary border border-primary/20 text-xs sm:text-sm font-medium px-4 py-2 rounded-full mb-8 shadow-sm backdrop-blur-sm">
            <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            31+ Free Tools &nbsp;·&nbsp; No Sign-up Required &nbsp;·&nbsp; Runs in Your Browser
          </div>

          {/* Headline */}
          <h1 className="text-[2.6rem] sm:text-6xl md:text-7xl lg:text-[5.25rem] font-extrabold tracking-[-0.03em] leading-[1.05] mb-6 max-w-4xl">
            Every Tool
            <br className="hidden sm:block" />
            {" "}You Need,{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-primary via-primary to-[hsl(var(--primary)/0.75)] bg-clip-text text-transparent">
                Instantly Free
              </span>
              {/* underline accent */}
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-primary/60 to-primary/20"
              />
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            A clean, fast toolbox for developers, students, designers, and
            creators — no ads, no accounts, no nonsense.
          </p>

          {/* Search bar — primary CTA */}
          <div className="w-full max-w-2xl mx-auto mb-8">
            <SearchBar />
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mb-10">
            <Link href="/tools">
              <Button
                size="lg"
                className="h-11 px-7 text-sm font-semibold gap-2 rounded-xl shadow-md"
              >
                Explore Tools
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              disabled
              className="h-11 px-7 text-sm font-semibold gap-2 rounded-xl opacity-70 cursor-not-allowed"
            >
              <Sparkles className="h-4 w-4" />
              AI Workspace
              <span className="ml-1 text-[10px] font-bold tracking-wide uppercase bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full">
                Soon
              </span>
            </Button>
          </div>

          {/* Social proof micro-row */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-muted-foreground">
            {[
              { icon: Shield, label: "Privacy-first — 100% client-side" },
              { icon: Zap, label: "Instant results, zero latency" },
              { icon: Globe, label: "Works on any device" },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5 shrink-0 text-primary/70" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Searches */}
      <section className="container mx-auto px-4 pb-16">
        <div className="flex flex-wrap gap-2 justify-center">
          <span className="text-sm text-muted-foreground font-medium py-2">Popular:</span>
          {popularSearches.map(term => (
            <Link key={term} href={`/tools?q=${encodeURIComponent(term)}`}>
              <button
                className="text-sm px-4 py-2 rounded-full border border-border bg-card hover:border-primary hover:text-primary hover:bg-primary/5 transition-all font-medium"
                data-testid={`tag-search-${term.toLowerCase().replace(/\s/g, "-")}`}
              >
                {term}
              </button>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Tools */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Tools</h2>
            <p className="text-muted-foreground mt-2">The most popular tools our users love</p>
          </div>
          <Link href="/tools">
            <Button variant="outline" className="gap-2 hidden sm:flex">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
        <div className="text-center mt-8 sm:hidden">
          <Link href="/tools">
            <Button variant="outline" className="gap-2">
              View All Tools <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Browse by Category</h2>
              <p className="text-muted-foreground mt-2">Find the right tool for the job</p>
            </div>
            <Link href="/categories">
              <Button variant="outline" className="gap-2 hidden sm:flex">
                All Categories <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map(cat => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Recently Added */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight">Recently Added</h2>
          <p className="text-muted-foreground mt-2">The newest tools in our collection</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* Why Atomest */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Why Atomest?</h2>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
              Built for speed, privacy, and simplicity — the tools you need, right now.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Globe, title: "100% Free Forever", desc: "Every tool is completely free. No premium tiers, no paywalls, no subscriptions." },
              { icon: Shield, title: "Privacy First", desc: "All processing happens in your browser. Your data never leaves your device." },
              { icon: Zap, title: "Instant Results", desc: "No loading screens. Results appear as you type, without any server round-trips." },
              { icon: Clock, title: "No Account Needed", desc: "Just open and use. No sign-up, no email, no personal information required." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-card border border-border rounded-xl p-6 flex flex-col items-center text-center">
                <div className="bg-primary/10 text-primary p-3 rounded-xl mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-xl px-6 bg-card">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Newsletter */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-3">Stay in the Loop</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">
            Get notified when we add new tools. No spam, unsubscribe anytime.
          </p>
          <div className="flex max-w-md mx-auto gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl border-0 bg-white/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-white/40 backdrop-blur"
              data-testid="input-newsletter-email"
            />
            <Button className="bg-white text-primary hover:bg-white/90 font-semibold px-6" data-testid="button-newsletter-subscribe">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
