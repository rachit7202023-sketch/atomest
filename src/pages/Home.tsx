import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  ArrowRight,
  Sparkles,
  Bot,
  Globe,
  GitFork,
  Layers,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Compass,
  Palette,
  Code2,
  Rocket,
  Laptop,
  Smartphone,
  Users,
  Briefcase,
  Building,
  UserCheck,
  Cpu,
  Phone,
  MessageSquare,
  Clock,
  Play,
  Pause,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ------------------------------------------------------------------ */
/* Data                                                               */
/* ------------------------------------------------------------------ */

const threePillars = [
  {
    title: "Premium Websites",
    tagline: "High-Performance Digital Platforms",
    badge: "Core Service",
    description:
      "Fast, mobile-first websites and landing pages built to give your business an authoritative presence and turn visitors into enquiries.",
    icon: Globe,
    route: "/services/premium-business-websites",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    deliverables: [
      "Business & corporate websites",
      "High-converting landing pages",
      "Complete website redesigns",
      "Lead capture funnels",
    ],
  },
  {
    title: "Lead Automation",
    tagline: "Autonomous Workflow Pipelines",
    badge: "Core Service",
    description:
      "Connect your forms, spreadsheets, inboxes, and CRMs. Eliminate repetitive manual tasks and respond to new leads in under 60 seconds.",
    icon: GitFork,
    route: "/services/lead-automation",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    deliverables: [
      "Instant lead alerts & routing",
      "Google Sheets & CRM synchronization",
      "Automated email follow-ups",
      "Appointment enquiry workflows",
    ],
  },
  {
    title: "AI Solutions",
    tagline: "Practical Business Assistants",
    badge: "Core Service",
    description:
      "AI voice receptionist, customer support, and lead qualification assistants grounded in your business knowledge.",
    icon: Bot,
    route: "/services/ai-customer-support",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    deliverables: [
      "AI voice receptionist",
      "24/7 customer support assistants",
      "Inbound lead qualification",
      "Internal document & SOP copilots",
    ],
  },
];

const whoWeHelp = [
  {
    title: "Service Businesses & Agencies",
    icon: Briefcase,
    description:
      "Law firms, accounting practices, clinics, consultancies, and creative agencies that need a modern web presence and automated client intake.",
    benefits: [
      "Never lose an incoming enquiry",
      "Faster speed-to-lead response",
      "Professional credibility",
    ],
  },
  {
    title: "Startups & Emerging Brands",
    icon: Rocket,
    description:
      "Early-stage founders who need high-converting landing pages, product waitlists, and automated user onboarding without hiring a full engineering team.",
    benefits: ["Rapid time-to-launch", "Built-in lead capture", "Scalable foundations"],
  },
  {
    title: "Solo Operators & Creators",
    icon: UserCheck,
    description:
      "Consultants, coaches, and solo entrepreneurs who want to eliminate administrative copy-pasting, automate scheduling, and save 10+ hours a week.",
    benefits: ["Zero repetitive data entry", "Automated booking & invoicing", "Affordable setup"],
  },
  {
    title: "Local & Growing SMBs",
    icon: Building,
    description:
      "Established local businesses looking to modernize their outdated websites, rank better on search, and sync customer data across everyday tools.",
    benefits: ["Sub-second mobile loading", "Automated email confirmations", "Clear ROI"],
  },
];

const howWeWorkSteps = [
  {
    number: "01",
    title: "Discover",
    icon: Compass,
    description:
      "We review your current operations, website, and bottlenecks to identify where automation delivers the highest return.",
  },
  {
    number: "02",
    title: "Design",
    icon: Palette,
    description:
      "We map workflows, design system architecture, and agree deliverables and timelines before any code is written.",
  },
  {
    number: "03",
    title: "Build",
    icon: Code2,
    description:
      "We develop using modern, reliable frameworks and thoroughly test responsiveness, integrations, and error fallbacks.",
  },
  {
    number: "04",
    title: "Deploy",
    icon: Rocket,
    description:
      "We handle launch, domain configuration, and handover documentation so your team runs the system smoothly.",
  },
  {
    number: "05",
    title: "Optimise",
    icon: Layers,
    description:
      "We monitor performance, refine workflows, and keep your automation improving as your business grows.",
  },
];

const industries = [
  {
    title: "HVAC",
    problem: "Missed after-hours calls and manual job scheduling eat up admin time.",
    solution:
      "An AI receptionist answers every call, qualifies the job, and books it straight into your calendar — 24/7.",
    icon: Cpu,
  },
  {
    title: "Dental",
    problem: "Front-desk staff spend hours on appointment reminders and patient intake.",
    solution:
      "Automated reminders, intake forms, and CRM sync free your team to focus on patient care.",
    icon: Phone,
  },
  {
    title: "Home Services",
    problem: "Leads cool off while you chase voicemails and chase down job details.",
    solution:
      "Instant lead response, qualification, and automated follow-up keep every enquiry warm.",
    icon: Globe,
  },
  {
    title: "Professional Services",
    problem: "Consultations and document requests create repetitive back-and-forth.",
    solution:
      "Grounded AI assistants handle FAQs, booking, and document routing from your verified knowledge base.",
    icon: MessageSquare,
  },
];

const whyAtomest = [
  {
    title: "Tailored systems",
    description:
      "No off-the-shelf bots. Every automation is built around your actual workflows, tools, and customer journey.",
  },
  {
    title: "Practical AI implementation",
    description:
      "We deploy grounded, reliable assistants — not experiments. Every output is traceable to your documented knowledge.",
  },
  {
    title: "Business-first thinking",
    description:
      "We start with the operational problem and the measurable outcome, then choose the technology that serves it.",
  },
  {
    title: "Reliable integrations",
    description:
      "Webhooks, CRMs, calendars, and spreadsheets connected so data flows where it needs to go — automatically.",
  },
  {
    title: "Ongoing optimisation",
    description:
      "We monitor performance and refine workflows as your business grows, so the system keeps earning its keep.",
  },
];

/* ------------------------------------------------------------------ */
/* Animated background nodes (hero ecosystem visual)                  */
/* ------------------------------------------------------------------ */

const NODE_COUNT = 14;

function HeroEcosystem() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;

    const prefersReduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const container = ref.current;
    const rect = container.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const radiusX = rect.width * 0.42;
    const radiusY = rect.height * 0.42;

    // Clear any existing nodes
    container.innerHTML = "";

    const colors = [
      "rgba(79, 70, 229, 0.35)",   // indigo
      "rgba(59, 130, 246, 0.25)",  // blue
      "rgba(16, 185, 129, 0.2)",   // emerald
      "rgba(139, 92, 246, 0.2)",   // violet
    ];

    const nodes: HTMLDivElement[] = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      const angle = (i / NODE_COUNT) * Math.PI * 2;
      const x = cx + Math.cos(angle) * radiusX;
      const y = cy + Math.sin(angle) * radiusY;
      const size = 10 + Math.random() * 26;
      const color = colors[i % colors.length];

      const node = document.createElement("div");
      node.className = "absolute rounded-full pointer-events-none select-none";
      node.style.left = `${x - size / 2}px`;
      node.style.top = `${y - size / 2}px`;
      node.style.width = `${size}px`;
      node.style.height = `${size}px`;
      node.style.background = color;
      node.style.filter = "blur(14px)";
      node.style.opacity = "0";
      container.appendChild(node);
      nodes.push(node);

      // Connecting line to center (subtle)
      const line = document.createElement("div");
      line.className = "absolute pointer-events-none select-none";
      line.style.left = `${cx}px`;
      line.style.top = `${cy}px`;
      line.style.width = "1px";
      line.style.height = "1px";
      line.style.background = "linear-gradient(to bottom right, rgba(79,70,229,0.12), transparent)";
      line.style.transformOrigin = "0 0";
      line.style.transform = `rotate(${angle}rad) translateX(-1px)`;
      container.appendChild(line);
    }

    if (prefersReduced) {
      nodes.forEach((n) => {
        n.style.opacity = "0.35";
        n.style.transition = "none";
      });
      return;
    }

    // Staggered float animation
    const tl = gsap.timeline({ repeat: -1, yoyo: true, ease: "sine.inOut" });
    nodes.forEach((node, i) => {
      const floatY = -12 - Math.random() * 14;
      const floatX = -6 + Math.random() * 12;
      tl.to(
        node,
        {
          y: floatY,
          x: floatX,
          opacity: 0.45,
          duration: 3 + Math.random() * 3,
          delay: i * 0.12,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        },
        0
      );
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    />
  );
}

/* ------------------------------------------------------------------ */
/* Animated workflow nodes (interactive automation showcase)          */
/* ------------------------------------------------------------------ */

const WORKFLOW_STEPS = [
  { label: "Incoming Call", sub: "Customer enquiry arrives" },
  { label: "AI Receptionist", sub: "24/7 intelligent handling" },
  { label: "Qualification", sub: "Lead scored & routed" },
  { label: "CRM Update", sub: "Data synced to your CRM" },
  { label: "Booking", sub: "Appointment confirmed" },
  { label: "Confirmation", sub: "Message sent to customer" },
];

function InteractiveWorkflow() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;

    const prefersReduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const container = ref.current;
    const stepEls = Array.from(
      container.querySelectorAll<HTMLElement>('[data-step]')
    );
    const connectorEls = Array.from(
      container.querySelectorAll<HTMLElement>('[data-connector]')
    );

    const highlight = (index: number) => {
      stepEls.forEach((el, i) => {
        const isActive = i === index;
        const target = isActive
          ? { scale: 1.12, borderColor: "rgba(79,70,229,0.9)", boxShadow: "0 0 0 8px rgba(79,70,229,0.25)" }
          : { scale: 1, borderColor: "#334155", boxShadow: "none" };
        gsap.to(el, { ...target, duration: 0.5, ease: "power2.out" });
        const title = el.querySelector<HTMLElement>("[data-title]");
        const sub = el.querySelector<HTMLElement>("[data-sub]");
        if (title)
          gsap.to(title, {
            color: isActive ? "#F8FAFC" : "#94A3B8",
            duration: 0.4,
          });
        if (sub)
          gsap.to(sub, {
            color: isActive ? "#CBD5E1" : "#64748B",
            duration: 0.4,
          });
      });
      connectorEls.forEach((el, i) => {
        const isActive = i === index || i === index - 1;
        gsap.to(el, {
          background: isActive ? "rgba(79,70,229,0.6)" : "rgba(148,163,184,0.12)",
          duration: 0.5,
          ease: "power2.out",
        });
      });
    };

    // Animate connectors from left to right on load
    connectorEls.forEach((el, i) => {
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          delay: 0.6 + i * 0.15,
          ease: "power2.out",
          transformOrigin: "left center",
        }
      );
    });

    if (!prefersReduced) {
      // Auto-cycle through steps
      const interval = setInterval(() => {
        setActiveIndex((i) => (i + 1) % WORKFLOW_STEPS.length);
      }, 3200);
      return () => clearInterval(interval);
    }

    highlight(0);
    return;
  }, []);

  useEffect(() => {
    // Highlight on manual change
    const stepEls = Array.from(
      (ref.current as HTMLElement).querySelectorAll<HTMLElement>('[data-step]')
    );
    const connectorEls = Array.from(
      (ref.current as HTMLElement).querySelectorAll<HTMLElement>('[data-connector]')
    );
    stepEls.forEach((el, i) => {
      const isActive = i === activeIndex;
      gsap.to(el, {
        scale: isActive ? 1.12 : 1,
        borderColor: isActive ? "rgba(79,70,229,0.9)" : "#334155",
        boxShadow: isActive ? "0 0 0 8px rgba(79,70,229,0.25)" : "none",
        duration: 0.5,
        ease: "power2.out",
      });
      const title = el.querySelector<HTMLElement>("[data-title]");
      const sub = el.querySelector<HTMLElement>("[data-sub]");
      if (title)
        gsap.to(title, { color: isActive ? "#F8FAFC" : "#94A3B8", duration: 0.4 });
      if (sub)
        gsap.to(sub, { color: isActive ? "#CBD5E1" : "#64748B", duration: 0.4 });
    });
    connectorEls.forEach((el, i) => {
      const isActive = i === activeIndex || i === activeIndex - 1;
      gsap.to(el, {
        background: isActive ? "rgba(79,70,229,0.6)" : "rgba(148,163,184,0.12)",
        duration: 0.5,
        ease: "power2.out",
      });
    });
  }, [activeIndex]);

  return (
    <section
      ref={ref}
      className="atomest-section relative overflow-hidden"
      id="workflow"
    >
      <div className="atomest-container">
        <div className="max-w-3xl mb-16 text-center">
          <div className="atomest-eyebrow mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="atomest-eyebrow-text">Signature Experience</span>
          </div>
          <h2 className="atomest-section-title text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 text-balance">
            One seamless automation, end to end.
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Watch a lead move through a complete Atomest automation — from first contact to confirmed appointment, without a single manual handoff.
          </p>
        </div>

        <div className="relative flex flex-col items-center justify-center gap-4 max-w-4xl mx-auto">
          {WORKFLOW_STEPS.map((step, i) => {
            const isLast = i === WORKFLOW_STEPS.length - 1;
            return (
              <>
                {/* Node */}
                <motion.div
                  key={`node-${i}`}
                  data-step
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative flex items-center gap-3 px-5 py-3 rounded-full border border-slate-800 bg-slate-900 text-left transition-all duration-500"
                  onMouseEnter={() => setActiveIndex(i)}
                  onMouseLeave={() => setActiveIndex(0)}
                >
                  <div
                    className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 transition-all"
                  >
                    {i === 0 ? (
                      <Phone className="w-5 h-5 text-indigo-400" />
                    ) : i === 1 ? (
                      <Bot className="w-5 h-5 text-indigo-400" />
                    ) : i === 2 ? (
                      <CheckCircle2 className="w-5 h-5 text-blue-400" />
                    ) : i === 3 ? (
                      <Layers className="w-5 h-5 text-blue-400" />
                    ) : i === 4 ? (
                      <Clock className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <MessageSquare className="w-5 h-5 text-emerald-400" />
                    )}
                  </div>
                  <div>
                    <div data-title className="font-display font-semibold text-sm text-slate-300 leading-tight">
                      {step.label}
                    </div>
                    <div data-sub className="text-[10px] font-mono text-slate-500 leading-none">
                      {step.sub}
                    </div>
                  </div>
                </motion.div>

                {!isLast && (
                  <motion.div
                    key={`conn-${i}`}
                    data-connector
                    className="w-16 h-px bg-slate-700/30 relative overflow-hidden"
                    style={{ transformOrigin: "left center" }}
                  >
                    <div className="absolute left-0 top-0 h-full w-full bg-indigo-500/60 scale-x-0 origin-left" />
                  </motion.div>
                )}
              </>
            );
          })}
        </div>

        {/* Active step detail panel */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="mt-10 max-w-2xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-center backdrop-blur-sm"
        >
          <div data-title className="font-display font-bold text-xl text-slate-50 mb-1">
            {WORKFLOW_STEPS[activeIndex].label}
          </div>
          <div data-sub className="text-sm text-slate-400">
            {WORKFLOW_STEPS[activeIndex].sub}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Home                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  const [location] = useLocation();
  const heroRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => {
    if (path === "/") return location === "/";
    return location.startsWith(path);
  };

  // GSAP entrance animations for hero + scroll reveals
  useEffect(() => {
    const prefersReduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const tl = gsap.timeline();

    // Hero staggered entrance
    tl.from(".hero-reveal", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.12,
    })
      .from(
        ".hero-visual",
        { y: 40, opacity: 0, duration: 0.9, ease: "power3.out" },
        "-=0.6"
      );

    // Section scroll reveals
    gsap.utils.toArray(".reveal-section").forEach((section) => {
      const el = section as HTMLElement;
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "all",
      });
    });

    // Staggered card reveals within sections
    gsap.utils.toArray(".reveal-item").forEach((item, i) => {
      const el = item as HTMLElement;
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: i * 0.08,
        ease: "power2.out",
        clearProps: "all",
      });
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Atomest | AI Automation Studio — Websites, Automation & AI</title>
        <meta
          name="description"
          content="Atomest helps businesses eliminate repetitive operations, capture more leads, and scale using AI-powered automation. Service-first AI automation studio for US, UK and international SMBs."
        />
      </Helmet>

      <div className="min-h-screen bg-slate-950 flex flex-col justify-between text-slate-50">
        <Navbar />

        {/* ============================ HERO ============================ */}
        <section className="relative overflow-hidden pt-24 sm:pt-32 pb-20 sm:pb-32 border-b border-slate-800/60">
          <HeroEcosystem />
          <div className="atomest-container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left: copy */}
              <div className="lg:col-span-7 space-y-6">
                <div
                  className="hero-reveal atomest-eyebrow mb-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="atomest-eyebrow-text">AI Automation Studio</span>
                </div>

                <h1 className="hero-reveal atomest-section-title text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-[1.05] mb-4 text-balance">
                  Your business deserves an
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-400">
                    unfair advantage.
                  </span>
                </h1>

                <p className="hero-reveal text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl">
                  We build intelligent websites, automate business operations, and deploy practical AI systems for growing businesses. Service-first, done-for-you automation.
                </p>

                <div className="hero-reveal flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/contact?solution=combined"
                    className="atomest-btn-primary atomest-btn-lg inline-flex items-center gap-2"
                  >
                    <span>Book a Discovery Call</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/services"
                    className="atomest-btn-secondary atomest-btn-lg inline-flex items-center gap-2"
                  >
                    <span>Explore Services</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Three core pillars mini */}
                <div className="hero-reveal pt-8 border-t border-slate-800/50 grid grid-cols-3 gap-4 max-w-lg">
                  {[
                    { t: "Web Development", c: "text-blue-400" },
                    { t: "Automation", c: "text-indigo-400" },
                    { t: "AI Solutions", c: "text-emerald-400" },
                  ].map((p, i) => (
                    <div key={i}>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">
                        Pillar 0{i + 1}
                      </div>
                      <div className={`font-display font-bold text-sm ${p.c}`}>{p.t}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: visual ecosystem */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="hero-visual relative w-full max-w-[460px] aspect-video rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 to-slate-950" />
                  <div className="absolute inset-0 bg-[url('https://www.svgbackgrounds.com/assets/patterns/grid.svg')] bg-[size:40px_40px] opacity-20" />
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10 pointer-events-none">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>ATOMEST AUTOMATION OS</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-indigo-400 border border-indigo-500/30">
                      LIVE VIEW
                    </span>
                  </div>
                  {/* Ecosystem nodes overlaid on the visual card */}
                  <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute top-1/4 left-1/3 w-[200px] h-[200px] bg-indigo-500/20 rounded-full blur-[64px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-[240px] h-[240px] bg-blue-500/15 rounded-full blur-[64px]" />
                    <div className="absolute top-1/5 right-1/5 w-[140px] h-[140px] bg-emerald-500/15 rounded-full blur-[48px]" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none opacity-60">
                    <div className="flex flex-col items-center gap-6">
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                        <Globe className="w-3 h-3 text-indigo-400" />
                        <span>Inbound</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                        <Bot className="w-3 h-3 text-indigo-400" />
                        <span>AI Receptionist</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                        <Cpu className="w-3 h-3 text-blue-400" />
                        <span>Workflow Engine</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                        <Layers className="w-3 h-3 text-emerald-400" />
                        <span>CRM Sync</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================ WHO WE HELP ============================ */}
        <section className="atomest-section bg-slate-900/40 border-b border-slate-800/60 reveal-section">
          <div className="atomest-container">
            <div className="max-w-3xl mb-14">
              <div className="atomest-eyebrow mb-3">
                <Users className="w-3.5 h-3.5 text-blue-400" />
                <span className="atomest-eyebrow-text">Who We Help</span>
              </div>
              <h2 className="atomest-section-title text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 text-balance">
                Built for ambitious businesses of every size.
              </h2>
              <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
                Whether you are a solo operator saving ten hours a week or an established service business modernising its presence, we deliver practical, reliable solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {whoWeHelp.map((group, idx) => {
                const Icon = group.icon;
                return (
                  <div
                    key={idx}
                    className="reveal-item p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900 flex flex-col justify-between group transition-all duration-300 hover:border-indigo-500/40"
                  >
                    <div>
                      <div className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-800 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors mb-4">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-display font-bold text-lg text-slate-50 mb-2.5">
                        {group.title}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-5">
                        {group.description}
                      </p>
                    </div>
                    <div className="space-y-2 pt-5 border-t border-slate-800/60">
                      {group.benefits.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-2.5 text-xs text-indigo-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================ SERVICES ============================ */}
        <section id="services" className="atomest-section border-b border-slate-800/60 reveal-section">
          <div className="atomest-container">
            <div className="max-w-3xl mb-14">
              <div className="atomest-eyebrow mb-3">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                <span className="atomest-eyebrow-text">Core Services</span>
              </div>
              <h2 className="atomest-section-title text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 text-balance">
                Three pillars of digital growth.
              </h2>
              <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
                High-converting websites, autonomous workflows, and grounded AI assistants — engineered around your objectives.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {threePillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <Link
                    key={idx}
                    href={pillar.route}
                    className="reveal-item group block p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900 hover:border-indigo-500/40 hover:shadow-[0_24px_48px_-15px_rgba(79,70,229,0.14)] transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-11 h-11 rounded-xl ${pillar.bg} border ${pillar.border} flex items-center justify-center ${pillar.color} group-hover:bg-indigo-500 group-hover:text-white transition-colors`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-800">
                        {pillar.badge}
                      </span>
                    </div>
                    <div className="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-1 group-hover:text-indigo-300 transition-colors">
                      {pillar.tagline}
                    </div>
                    <h3 className="font-display font-bold text-2xl text-slate-50 mb-3 group-hover:text-indigo-300 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-6">
                      {pillar.description}
                    </p>
                    <div className="space-y-2 pt-5 border-t border-slate-800/60 mb-6">
                      {pillar.deliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="atomest-btn-secondary flex items-center justify-center gap-2 w-full text-xs font-semibold border border-slate-800 group-hover:border-indigo-500/50 group-hover:text-indigo-300 transition-colors">
                      <span>Explore {pillar.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================ INTERACTIVE WORKFLOW ============================ */}
        <InteractiveWorkflow />

        {/* ============================ INDUSTRIES ============================ */}
        <section className="atomest-section bg-slate-900/40 border-b border-slate-800/60 reveal-section">
          <div className="atomest-container">
            <div className="max-w-3xl mb-14">
              <div className="atomest-eyebrow mb-3">
                <Building className="w-3.5 h-3.5 text-emerald-400" />
                <span className="atomest-eyebrow-text">Industries</span>
              </div>
              <h2 className="atomest-section-title text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 text-balance">
                Automation that fits your trade.
              </h2>
              <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
                We understand the operational bottlenecks of service businesses — and where automation delivers measurable time savings.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {industries.map((ind, idx) => {
                const Icon = ind.icon;
                return (
                  <div
                    key={idx}
                    className="reveal-item p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900 flex flex-col group transition-all duration-300 hover:border-emerald-500/40"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-slate-50 mb-2">
                      {ind.title}
                    </h3>
                    <div className="space-y-3 flex-1">
                      <div className="text-sm sm:text-base text-slate-400 leading-relaxed font-medium">
                        {ind.problem}
                      </div>
                      <div className="text-xs text-slate-500 leading-relaxed">
                        {ind.solution}
                      </div>
                    </div>
                    <div className="mt-5 pt-4 border-t border-slate-800/60 flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                      <span>Explore {ind.title} automation</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform group-hover:text-emerald-400" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================ HOW WE WORK ============================ */}
        <section className="atomest-section border-y border-slate-800/60 reveal-section">
          <div className="atomest-container">
            <div className="max-w-3xl mb-14">
              <div className="atomest-eyebrow mb-3">
                <Rocket className="w-3.5 h-3.5 text-indigo-400" />
                <span className="atomest-eyebrow-text">Engagement Process</span>
              </div>
              <h2 className="atomest-section-title text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 text-balance">
                How we work.
              </h2>
              <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
                A disciplined five-phase delivery framework designed for clarity, velocity, and zero surprises.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5">
              {howWeWorkSteps.map((step, idx) => {
                const Icon = step.icon;
                const isLast = idx === howWeWorkSteps.length - 1;
                return (
                  <div key={idx} className="reveal-item flex flex-col items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400 shrink-0 relative z-10">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-indigo-400 font-semibold">
                      {step.number}
                    </span>
                    <h3 className="font-display font-bold text-sm text-slate-50 text-center leading-tight">
                      {step.title}
                    </h3>
                    {isLast ? null : (
                      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-slate-800 z-0 hidden md:block" />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-4">
                {howWeWorkSteps.map((step, idx) => (
                  <div key={idx} className="reveal-item flex items-start gap-4 opacity-80 transition-opacity duration-300 group">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                      {step.number}
                    </div>
                    <div>
                      <div className="font-display font-bold text-sm text-slate-50">{step.title}</div>
                      <div className="text-xs text-slate-400 leading-relaxed mt-0.5">
                        {step.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================ WHY ATOMEST ============================ */}
        <section className="atomest-section reveal-section">
          <div className="atomest-container">
            <div className="max-w-3xl mb-14 text-center">
              <div className="atomest-eyebrow mx-auto mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span className="atomest-eyebrow-text">Why Atomest</span>
              </div>
              <h2 className="atomest-section-title text-3xl sm:text-5xl font-extrabold tracking-tight mb-8">
                Built differently, by design.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {whyAtomest.map((item, idx) => (
                <div
                  key={idx}
                  className="reveal-item p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900 flex flex-col"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-slate-50 mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================ FINAL CTA ============================ */}
        <section className="atomest-section pt-24 sm:pt-32 pb-20 sm:pb-32 reveal-section">
          <div className="atomest-container">
            <div className="p-8 sm:p-16 rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden text-center shadow-2xl reveal-section">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(79,70,229,0.12),transparent_100%)] -z-10" />
              <div className="max-w-2xl mx-auto relative z-10 space-y-6">
                <div className="atomest-eyebrow mx-auto mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="atomest-eyebrow-text">Start Your Project</span>
                </div>
                <h2 className="atomest-section-title text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
                  Ready to make your business work smarter?
                </h2>
                <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
                  Tell us about your project or current operational bottlenecks. We will assess your requirements and deliver a clear, transparent proposal.
                </p>
                <div className="pt-4">
                  <Link
                    href="/contact?solution=combined"
                    className="atomest-btn-primary atomest-btn-lg inline-flex items-center gap-2 shadow-lg shadow-indigo-500/25"
                  >
                    <span>Book a Discovery Call</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
