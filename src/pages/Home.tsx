import { Link } from "wouter";
import { ArrowRight, Sparkles, Clock, ShieldCheck, Download, CheckCircle2, Zap, BarChart3, FileText, Users, Search, MessageSquare, Calendar, PenLine, Star, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/seo/SEO";
import { Button } from "@/components/ui/button";
import { useModules } from "@/hooks/use-modules";

// ── Animation Variants ──────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08 } },
};

// ── Status Badge Config ────────────────────────────────────────────────────
const statusConfig = {
  live:         { label: 'Live',           cls: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  beta:         { label: 'Beta',           cls: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  coming_soon:  { label: 'Coming Soon',    cls: 'bg-white/5 text-muted-foreground border-white/10' },
  disabled:     { label: 'Unavailable',    cls: 'bg-white/5 text-muted-foreground border-white/10' },
};

// ── Upcoming AI Employees (registry supplements these with "live" ones) ────
const upcomingEmployees = [
  { id: 'website-audit',       name: 'AI Website Auditor',     icon: Search,       category: 'Marketing',  timeSaved: '4–6 hrs',  status: 'coming_soon' as const },
  { id: 'proposal-writer',     name: 'AI Proposal Writer',     icon: FileText,     category: 'Sales',      timeSaved: '3–5 hrs',  status: 'coming_soon' as const },
  { id: 'meeting-assistant',   name: 'AI Meeting Assistant',   icon: Calendar,     category: 'Operations', timeSaved: '2–3 hrs',  status: 'coming_soon' as const },
  { id: 'lead-researcher',     name: 'AI Lead Researcher',     icon: BarChart3,    category: 'Sales',      timeSaved: '5–8 hrs',  status: 'coming_soon' as const },
  { id: 'content-assistant',   name: 'AI Content Assistant',   icon: PenLine,      category: 'Marketing',  timeSaved: '3–4 hrs',  status: 'coming_soon' as const },
  { id: 'review-reply',        name: 'AI Review Reply Agent',  icon: MessageSquare,category: 'Support',    timeSaved: '2–4 hrs',  status: 'coming_soon' as const },
  { id: 'report-generator',    name: 'AI Report Generator',    icon: BarChart3,    category: 'Operations', timeSaved: '4–6 hrs',  status: 'coming_soon' as const },
  { id: 'invoice-followup',    name: 'AI Invoice Follow-up',   icon: Star,         category: 'Finance',    timeSaved: '2–3 hrs',  status: 'coming_soon' as const },
];

const features = [
  { icon: Zap,          title: 'No prompt engineering',   desc: 'Just fill in the brief. The AI Employee handles the rest — professionally.' },
  { icon: Download,     title: 'Exportable outputs',      desc: 'Every result is downloadable as PDF, Markdown, or CSV — ready to share.' },
  { icon: Clock,        title: 'Hours back, every week',  desc: 'Each AI Employee replaces hours of manual work per task, per person.' },
  { icon: ShieldCheck,  title: 'Secure by design',        desc: 'Your data never trains public models. Enterprise-grade processing standards.' },
  { icon: CheckCircle2, title: 'Professional results',    desc: 'Output quality is designed to go directly to clients, not just into notes.' },
  { icon: Users,        title: 'Specialists, not generic tools', desc: 'Each AI Employee is purpose-built for one job. Deep, not broad.' },
];

const steps = [
  { n: '01', title: 'Choose a specialist', desc: 'Pick the AI Employee that matches the task.' },
  { n: '02', title: 'Provide context',     desc: 'Upload a file or fill in a short brief. No prompting required.' },
  { n: '03', title: 'Receive the output',  desc: 'Get a professional, structured result — ready to use or export.' },
];

const faqs = [
  { q: 'Do I need to write prompts?', a: 'No. Our AI Employees are pre-configured. You just fill out a simple brief, like you would for a human employee, and the AI handles the complex prompting behind the scenes.' },
  { q: 'Is my data used for training?', a: 'Never. We use enterprise APIs with zero data retention for training. Your data remains private and secure.' },
  { q: 'Can I export the results?', a: 'Yes. Every output can be copied to your clipboard, or downloaded as a PDF, Markdown, or JSON file to share with your team.' },
  { q: 'How much does it cost?', a: 'You get 100 free credits when you sign up. After that, you pay as you go. Most tasks cost between 10-20 credits (~$0.10 - $0.20).' },
];

export default function Home() {
  const liveModules = useModules().filter(m => m.status === 'live' || m.status === 'beta');

  // Merge live modules into the display grid
  const liveCards = liveModules.map(m => ({
    id: m.id,
    name: m.name,
    icon: m.icon,
    category: m.category,
    timeSaved: m.estimatedTimeSaved,
    status: m.status,
    href: `/employees/${m.id}`,
  }));

  const allCards = [
    ...liveCards,
    ...upcomingEmployees.filter(u => !liveCards.find(l => l.id === u.id)),
  ].slice(0, 8);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-x-hidden" style={{ fontFamily: 'var(--font-text)' }}>
      <SEO
        title="Atomest — Hire AI Employees"
        description="Hire specialized AI Employees that handle reporting, recruiting, audits, proposals, research, content, and repetitive workflows in minutes."
        canonicalPath="/"
      />
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center text-center pt-36 pb-28 px-6 overflow-hidden">
        {/* Single restrained glow — one, centered, subtle */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[640px] h-[420px] opacity-[0.15] blur-[100px] rounded-full"
          style={{ background: 'hsl(var(--primary))' }}
        />

        <div className="relative z-10 max-w-[var(--sp-max-w)] mx-auto">
          <motion.div
            variants={fadeUp} initial="hidden" animate="show"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-muted-foreground mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Specialized AI Employees for every role
          </motion.div>

          <motion.h1
            variants={fadeUp} initial="hidden" animate="show"
            transition={{ delay: 0.08 }}
            className="font-semibold text-foreground mb-6 tracking-tight"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 6vw, var(--type-hero))',
              lineHeight: 'var(--type-hero-lh)',
              letterSpacing: 'var(--type-hero-ls)',
            }}
          >
            Your Team's Next Hire<br className="hidden sm:block" />
            <span className="text-primary"> Isn't Human.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp} initial="hidden" animate="show"
            transition={{ delay: 0.16 }}
            className="text-muted-foreground max-w-2xl mx-auto mb-10"
            style={{
              fontSize: 'var(--type-sub)',
              lineHeight: 'var(--type-sub-lh)',
              letterSpacing: 'var(--type-sub-ls)',
            }}
          >
            Deploy specialized AI Employees that handle recruiting, audits, proposals,
            research, content, and repetitive workflows — in minutes.
          </motion.p>

          <motion.div
            variants={fadeUp} initial="hidden" animate="show"
            transition={{ delay: 0.24 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link href="/employees">
              <Button
                id="hero-cta-primary"
                className="h-12 px-7 font-semibold text-base"
                style={{ borderRadius: 'var(--radius-pill)' }}
              >
                Meet Your AI Employees
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button
                id="hero-cta-secondary"
                variant="outline"
                className="h-12 px-7 font-semibold text-base bg-transparent border-white/15 hover:bg-white/5"
                style={{ borderRadius: 'var(--radius-pill)' }}
              >
                See How It Works
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── SOCIAL PROOF (Placeholder) ────────────────────────────────────── */}
      <section className="border-t border-white/8 py-16 px-[var(--sp-content-h)] bg-white/[0.01]">
        <div className="max-w-[var(--sp-max-w)] mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale">
            {/* Replace these with actual logos later */}
            <div className="text-xl font-bold font-serif">Acme Corp</div>
            <div className="text-xl font-bold font-sans">GlobalTech</div>
            <div className="text-xl font-bold font-mono">Innovate.io</div>
            <div className="text-xl font-bold tracking-tighter">Nexus</div>
          </div>
        </div>
      </section>

      {/* ── AI EMPLOYEES GRID ─────────────────────────────────────────────── */}
      <section className="border-t border-white/8 py-[var(--sp-section-v)] px-[var(--sp-content-h)]">
        <div className="max-w-[var(--sp-max-w)] mx-auto">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              The Roster
            </p>
            <h2
              className="font-semibold text-foreground"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--type-section)',
                lineHeight: 'var(--type-section-lh)',
              }}
            >
              Meet Your New Hires.
            </h2>
          </motion.div>

          <motion.div
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
          >
            {allCards.map(card => {
              const sc = statusConfig[card.status];
              const Icon = card.icon;
              const isLive = card.status === 'live' || card.status === 'beta';

              return (
                <motion.div key={card.id} variants={fadeUp}>
                  {isLive ? (
                    <Link href={(card as { href?: string }).href ?? '#'}>
                      <EmployeeCard card={card} sc={sc} Icon={Icon} />
                    </Link>
                  ) : (
                    <EmployeeCard card={card} sc={sc} Icon={Icon} />
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section id="how-it-works" className="border-t border-white/8 py-[var(--sp-section-v)] px-[var(--sp-content-h)]">
        <div className="max-w-[var(--sp-max-w)] mx-auto">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              The Process
            </p>
            <h2
              className="font-semibold text-foreground"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--type-section)',
                lineHeight: 'var(--type-section-lh)',
              }}
            >
              Three steps to a new hire.
            </h2>
          </motion.div>

          <motion.div
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
          >
            {/* Connector line (desktop only) */}
            <div className="hidden md:block absolute top-7 left-[20%] right-[20%] h-px bg-white/8" />

            {steps.map((step, i) => (
              <motion.div key={i} variants={fadeUp} className="flex flex-col items-center text-center relative z-10">
                <div
                  className="w-14 h-14 rounded-full bg-white/5 border border-white/12 flex items-center justify-center mb-5"
                >
                  <span className="text-xl font-black text-primary">{step.n}</span>
                </div>
                <h3
                  className="font-semibold text-foreground mb-2"
                  style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--type-tile)', lineHeight: 'var(--type-tile-lh)' }}
                >
                  {step.title}
                </h3>
                <p className="text-muted-foreground" style={{ fontSize: 'var(--type-small)', lineHeight: '1.6' }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WHY ATOMEST ───────────────────────────────────────────────────── */}
      <section className="border-t border-white/8 py-[var(--sp-section-v)] px-[var(--sp-content-h)]">
        <div className="max-w-[var(--sp-max-w)] mx-auto">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Why Atomest
            </p>
            <h2
              className="font-semibold text-foreground"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--type-section)',
                lineHeight: 'var(--type-section-lh)',
              }}
            >
              Built for outcomes,<br />not experiments.
            </h2>
          </motion.div>

          <motion.div
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
          >
            {features.map((f, i) => (
              <motion.div
                key={i} variants={fadeUp}
                className="p-6 rounded-[var(--radius-card)] bg-white/[0.03] border border-white/8 hover:bg-white/[0.06] transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3
                  className="font-semibold text-foreground mb-2"
                  style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--type-tile)', lineHeight: 'var(--type-tile-lh)', letterSpacing: 'var(--type-tile-ls)' }}
                >
                  {f.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed" style={{ fontSize: 'var(--type-small)' }}>
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PRICING TEASER ────────────────────────────────────────────────── */}
      <section className="border-t border-white/8 py-[var(--sp-section-v)] px-[var(--sp-content-h)] bg-white/[0.01]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Pricing
            </p>
            <h2
              className="font-semibold text-foreground mb-4"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--type-section)',
                lineHeight: 'var(--type-section-lh)',
              }}
            >
              Pay only for what you use.
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto" style={{ fontSize: 'var(--type-body)', lineHeight: '1.6' }}>
              No expensive monthly subscriptions. Get 100 free credits on sign up, then buy credits as you need them.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="inline-flex items-center gap-6 p-6 rounded-2xl border border-primary/20 bg-primary/5"
          >
            <div className="text-left">
              <div className="text-sm text-primary font-medium mb-1">Starter Pack</div>
              <div className="text-3xl font-bold text-foreground">$10</div>
              <div className="text-xs text-muted-foreground mt-1">For 1,000 credits</div>
            </div>
            <div className="w-px h-16 bg-white/10 mx-4" />
            <div className="text-left space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> ~100 AI tasks</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Never expire</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Full platform access</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="border-t border-white/8 py-[var(--sp-section-v)] px-[var(--sp-content-h)]">
        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="font-semibold text-foreground"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--type-section)',
                lineHeight: 'var(--type-section-lh)',
              }}
            >
              Frequently asked questions
            </h2>
          </motion.div>

          <motion.div
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="space-y-4"
          >
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={fadeUp} className="p-6 rounded-[var(--radius-card)] bg-white/[0.02] border border-white/8">
                <h3 className="font-medium text-foreground mb-2 text-lg">{faq.q}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{faq.a}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="border-t border-white/8 py-[var(--sp-section-v)] px-[var(--sp-content-h)]">
        <div className="max-w-[var(--sp-max-w)] mx-auto">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center"
          >
            <h2
              className="font-semibold text-foreground mb-4"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, var(--type-section))',
                lineHeight: 'var(--type-section-lh)',
              }}
            >
              Ready to meet your team?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto" style={{ fontSize: 'var(--type-body)', lineHeight: 'var(--type-body-lh)' }}>
              Your first AI Employee is free. No prompt engineering. No learning curve.
            </p>
            <Link href="/signup">
              <Button
                id="bottom-cta"
                className="h-12 px-8 font-semibold text-base"
                style={{ borderRadius: 'var(--radius-pill)' }}
              >
                Hire Your First AI Employee
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// ── Sub-component ──────────────────────────────────────────────────────────

interface CardData {
  id: string;
  name: string;
  category: string;
  timeSaved: string;
  status: string;
  icon: React.ComponentType<{ className?: string }>;
}

function EmployeeCard({ card, sc, Icon }: { card: CardData; sc: { label: string; cls: string }; Icon: React.ComponentType<{ className?: string }> }) {
  const isLive = card.status === 'live' || card.status === 'beta';
  return (
    <div className={`group h-full p-5 rounded-[var(--radius-card)] border border-white/8 bg-white/[0.03] transition-colors duration-300 ${isLive ? 'hover:bg-white/[0.07] cursor-pointer' : 'cursor-default'}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-foreground/70" />
        </div>
        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${sc.cls}`}>
          {sc.label}
        </span>
      </div>
      <h3
        className="font-semibold text-foreground mb-1"
        style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--type-tile)', lineHeight: 'var(--type-tile-lh)', letterSpacing: 'var(--type-tile-ls)' }}
      >
        {card.name}
      </h3>
      <p className="text-muted-foreground mb-3" style={{ fontSize: 'var(--type-caption)' }}>
        {card.category}
      </p>
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Clock className="w-3 h-3" />
        <span>Saves {card.timeSaved} / task</span>
      </div>
      {isLive && (
        <div className="flex items-center gap-1 text-xs text-primary mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
          Hire now <ArrowRight className="w-3 h-3" />
        </div>
      )}
    </div>
  );
}
