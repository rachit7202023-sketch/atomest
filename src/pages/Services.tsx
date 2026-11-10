import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "wouter";
import { ArrowRight, Globe, GitFork, Bot, Layers, Sparkles, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export default function Services() {
  const serviceCategories = [
    {
      id: "web-development",
      title: "Web Development",
      tagline: "High-Performance Digital Flagships",
      badge: "Core Service",
      icon: Globe,
      color: "text-[#3B82F6]",
      border: "border-[#3B82F6]/30",
      description:
        "Fast, modern, conversion-focused websites and web platforms engineered to build technical authority, rank on search engines, and convert visitors into qualified leads.",
      problemsSolved: [
        "Slow, outdated websites that fail modern Core Web Vitals",
        "Low conversion rates and weak mobile responsiveness",
        "Disorganized messaging that confuses high-intent prospects",
        "Lack of structured SEO architecture and technical schema",
      ],
      offerings: [
        "Business & Corporate Websites",
        "High-Conversion Landing Pages",
        "Website Redesigns & Modernization",
        "Portfolio & Credibility Websites",
        "Lead Generation Funnels",
        "E-Commerce Websites (Shopify / Headless)",
        "Custom Web Applications & Portals",
      ],
      outcomes: [
        "Sub-second load times & 95+ Core Web Vitals",
        "Higher inquiry-to-consultation conversion rate",
        "Clean, responsive presentation across all screens",
        "Built-in analytics and lead-capture pipelines",
      ],
      ctaText: "Start a Web Project",
    },
    {
      id: "business-automation",
      title: "Business Automation",
      tagline: "Autonomous Event & Data Pipelines",
      badge: "Core Service",
      icon: GitFork,
      color: "text-[#8B5CF6]",
      border: "border-[#8B5CF6]/30",
      description:
        "Resilient, self-healing automations that connect forms, CRMs, messaging, and databases—eliminating manual data entry, follow-up delays, and operational friction.",
      problemsSolved: [
        "Slow response times to new inbound leads (Speed-to-Lead issues)",
        "Manual copy-pasting data between forms, spreadsheets, and CRMs",
        "Missed follow-ups and uncoordinated appointment scheduling",
        "Siloed communication across email, Slack, and internal tools",
      ],
      offerings: [
        "Lead Capture & Speed-to-Lead Triage",
        "Google Sheets & Workspace Automations",
        "CRM Integrations (HubSpot, Airtable, Notion)",
        "Automated Email Notifications & Sequences",
        "Calendar & Appointment Request Pipelines",
        "Data Synchronization Across Platforms",
        "Custom Webhook & Event-Driven Workflows",
      ],
      outcomes: [
        "Under-60-second response to new leads",
        "Zero manual copy-pasting between business tools",
        "Reliable execution with automated error alerting",
        "Hours of saved team bandwidth every single week",
      ],
      ctaText: "Automate Your Workflow",
    },
    {
      id: "ai-solutions",
      title: "AI Solutions",
      tagline: "Grounded Business Assistants & Copilots",
      badge: "Core Service",
      icon: Bot,
      color: "text-emerald-400",
      border: "border-emerald-500/30",
      description:
        "Deterministic, grounded AI agents and copilots with strict data boundaries, designed to answer customer inquiries, qualify leads, and assist internal team operations.",
      problemsSolved: [
        "Customer inquiries going unanswered after business hours",
        "Support teams answering the same repetitive questions repeatedly",
        "Valuable lead information buried in unread inboxes",
        "Internal staff losing hours searching company documentation",
      ],
      offerings: [
        "Website FAQ & Inbound Chatbots",
        "AI Customer Support Assistants (24/7)",
        "AI Lead Qualification & Intent Scoring",
        "Document-Based SOP Knowledge Copilots",
        "AI-Powered Inbound Email Processing",
        "Basic Voice AI Inbound Assistants",
        "Custom Domain-Specific AI Agents",
      ],
      outcomes: [
        "Instant, accurate answers grounded in your business data",
        "Automatic lead qualification before reaching your sales calendar",
        "Human escalation paths for edge cases and VIP requests",
        "Strict hallucination safeguards and data privacy",
      ],
      ctaText: "Deploy an AI Solution",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Services | Atomest — Web Development, Business Automation & AI Solutions</title>
        <meta
          name="description"
          content="Explore Atomest's three core service pillars: Web Development, Business Automation, and AI Solutions. Engineered for growing businesses and SMBs."
        />
      </Helmet>

      <div className="min-h-screen bg-[#08090D] flex flex-col justify-between text-[#F5F6FA]">
        <Navbar />

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 sm:pt-32 pb-16 border-b border-[#252938]">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#8B5CF6]/15 via-[#3B82F6]/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

          <div className="atomest-container relative z-10 text-center max-w-3xl mx-auto space-y-5">
            <div className="atomest-badge-violet inline-flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>Full-Stack Digital Solutions Studio</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-[#F5F6FA] leading-[1.1]">
              Three Pillars.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#3B82F6]">
                One Digital Studio.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#A0A5B5] leading-relaxed">
              We help growing businesses establish high-converting online presences, eliminate manual work through automation, and implement practical, grounded AI systems.
            </p>
          </div>
        </section>

        {/* Main Services Categories */}
        <main className="atomest-container py-16 sm:py-24 space-y-16">
          {serviceCategories.map((service, index) => {
            const Icon = service.icon;
            return (
              <section
                key={service.id}
                id={service.id}
                className="p-8 sm:p-12 rounded-3xl bg-[#10121A] border border-[#252938] hover:border-[#8B5CF6]/40 transition-all shadow-xl space-y-8"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1C1F2B]">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl bg-[#151824] border ${service.border} flex items-center justify-center ${service.color}`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono uppercase text-[#8B5CF6] tracking-wider">
                          Pillar 0{index + 1}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#151824] text-[#A0A5B5] border border-[#252938]">
                          {service.badge}
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#F5F6FA]">
                        {service.title}
                      </h2>
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="atomest-btn-primary inline-flex items-center justify-center gap-2 text-xs py-2.5 px-5 self-start sm:self-auto"
                  >
                    <span>{service.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Description */}
                <p className="text-base sm:text-lg text-[#A0A5B5] leading-relaxed max-w-4xl">
                  {service.description}
                </p>

                {/* Grid of Details: What We Offer, Problems We Solve, Business Outcomes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                  {/* Column 1: Specific Offerings */}
                  <div className="p-6 rounded-2xl bg-[#151824] border border-[#252938] space-y-3">
                    <div className="text-xs font-mono uppercase text-[#8B5CF6] tracking-wider">
                      Specific Deliverables
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-[#F5F6FA]">
                      {service.offerings.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 2: Problems Solved */}
                  <div className="p-6 rounded-2xl bg-[#151824] border border-[#252938] space-y-3">
                    <div className="text-xs font-mono uppercase text-amber-400 tracking-wider">
                      Problems We Solve
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-[#A0A5B5]">
                      {service.problemsSolved.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-amber-400 shrink-0 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 3: Business Outcomes */}
                  <div className="p-6 rounded-2xl bg-[#151824] border border-[#252938] space-y-3">
                    <div className="text-xs font-mono uppercase text-emerald-400 tracking-wider">
                      Business Outcomes
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-[#F5F6FA]">
                      {service.outcomes.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Zap className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            );
          })}

          {/* Combined Services Banner */}
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#151824] via-[#10121A] to-[#151824] border border-[#252938] text-center space-y-5">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-[#F5F6FA]">
              Looking for a combined digital solution?
            </h3>
            <p className="text-sm sm:text-base text-[#A0A5B5] max-w-2xl mx-auto leading-relaxed">
              Most of our clients pair a modern high-converting website with an automated lead capture workflow and a 24/7 AI qualification assistant for maximum commercial impact.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="atomest-btn-primary inline-flex items-center gap-2 text-sm px-6 py-3"
              >
                <span>Request a Custom Scoping Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

