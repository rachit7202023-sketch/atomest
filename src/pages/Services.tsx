import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "wouter";
import { ArrowRight, Globe, GitFork, Bot, Layers, Sparkles, CheckCircle2, ShieldCheck, Zap, HelpCircle, FileText, KeyRound } from "lucide-react";

export default function Services() {
  const serviceCategories = [
    {
      id: "web-development",
      title: "Web Development",
      tagline: "High-Performance Digital Platforms",
      badge: "Core Service",
      icon: Globe,
      color: "text-[#3B82F6]",
      border: "border-[#3B82F6]/30",
      description:
        "Fast, mobile-optimized business websites, landing pages, and web applications built to give your business strong credibility, rank effectively, and convert casual visitors into qualified customer enquiries.",
      whatWeBuild: [
        "Business & Corporate Websites (3–10+ pages)",
        "High-Conversion Landing Pages for ad campaigns",
        "Complete Website Redesigns & Modernization",
        "Lead Generation & Contact Capture Funnels",
        "E-Commerce Websites (Shopify or headless setups within agreed scope)",
        "Custom Client Portals & Web Applications",
      ],
      problemSolved:
        "Slow, outdated websites that confuse prospects, perform poorly on mobile phones, fail search engine standards, and lose high-intent potential clients to competitors.",
      whatYouReceive: [
        "Fully responsive modern website tested across desktop, tablet, and mobile",
        "Fast page load speeds and semantic, search-friendly structure",
        "Integrated contact form sending instant email notifications",
        "Full administrative handover with documentation on making text and image updates",
      ],
      whatYouProvide: [
        "Your business branding (logo, brand colors, imagery if available)",
        "Rough draft or existing copy explaining your services and pricing",
        "Domain registrar access (or assistance from our team to connect it)",
        "Any third-party integration accounts (e.g., Google Analytics, form destination)",
      ],
      ctaText: "Enquire About Web Development",
    },
    {
      id: "business-automation",
      title: "Business Automation",
      tagline: "Autonomous Workflow Pipelines",
      badge: "Core Service",
      icon: GitFork,
      color: "text-[#8B5CF6]",
      border: "border-[#8B5CF6]/30",
      description:
        "Reliable workflows that connect your forms, spreadsheets, inboxes, and CRMs. We eliminate repetitive manual data entry, follow-up delays, and lost customer enquiries.",
      whatWeBuild: [
        "Speed-to-Lead notification systems (instant SMS, Telegram, or Slack alerts)",
        "Google Sheets & CRM synchronization (HubSpot, Airtable, Notion)",
        "Automated customer acknowledgment & email follow-up sequences",
        "Appointment and consultation request routing",
        "Multi-app data synchronization and automated reporting",
        "Custom webhook integrations between specialized business tools",
      ],
      problemSolved:
        "Leads going cold because your team takes hours to respond, staff wasting valuable time copy-pasting customer details across disconnected spreadsheets, and missed client follow-ups.",
      whatYouReceive: [
        "Turnkey automated workflow configured on your preferred platform (e.g., self-hosted n8n or Make.com)",
        "End-to-end testing with real sample data before launch",
        "Automated error-alerting mechanism if an API key expires or a service is down",
        "Step-by-step SOP and video walkthrough of how the workflow operates",
      ],
      whatYouProvide: [
        "Access to the tools you want connected (e.g., Google Workspace, CRM, email service)",
        "Clear explanation of your current manual workflow and step-by-step handoffs",
        "Customer notification message templates (or we can assist in drafting them)",
      ],
      ctaText: "Enquire About Automation",
    },
    {
      id: "ai-solutions",
      title: "AI Solutions",
      tagline: "Practical Business Assistants",
      badge: "Core Service",
      icon: Bot,
      color: "text-emerald-400",
      border: "border-emerald-500/30",
      description:
        "Practical AI assistants and chatbots strictly grounded in your company documentation, FAQs, and service guidelines. Designed to answer customer questions accurately 24/7 without making things up.",
      whatWeBuild: [
        "Website FAQ Chatbots that answer customer questions accurately 24/7",
        "Inbound Lead Qualification Assistants that gather project details before booking",
        "Document-Based SOP Assistants for internal team knowledge retrieval",
        "AI-Assisted Customer Support Draft Responders",
        "Basic Voice AI Inbound Assistants (scoped only where verified tools and reliable telephony APIs apply)",
        "Custom Domain-Specific Task Assistants",
      ],
      problemSolved:
        "Customer questions left unanswered after business hours, repetitive support tickets draining team productivity, and valuable inquiries going uncollected on weekends.",
      whatYouReceive: [
        "Embedded, mobile-friendly chat widget matching your website's visual brand",
        "Strict prompt boundaries and grounding preventing hallucinations or off-topic replies",
        "Clear fallback path to human email/booking when an inquiry exceeds scope",
        "Full test log and prompt maintenance instructions",
      ],
      whatYouProvide: [
        "Your verified FAQ documents, price lists, service guidelines, and company policies",
        "LLM API account credentials (e.g., Google Gemini, OpenAI, or Anthropic)",
        "Guidelines on how and when to escalate conversations to a human team member",
      ],
      ctaText: "Enquire About AI Solutions",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Services | Atomest — Web Development, Business Automation & AI Solutions</title>
        <meta
          name="description"
          content="Explore Atomest's three core service pillars: Web Development, Business Automation, and AI Solutions. Practical, outcome-oriented digital solutions for growing businesses."
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
              <span>Division A: Digital Services</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-[#F5F6FA] leading-[1.1]">
              Three Pillars.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#3B82F6]">
                Measurable Outcomes.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#A0A5B5] leading-relaxed">
              We help growing businesses establish high-converting online presences, eliminate manual work through automation, and implement practical AI solutions that work reliably.
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
                    href={`/contact?solution=${service.id === "web-development" ? "web-development" : service.id === "business-automation" ? "business-automation" : "ai-solutions"}`}
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

                {/* Problem Solved Callout */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#151824] border border-amber-500/20 text-xs sm:text-sm text-[#A0A5B5] leading-relaxed">
                  <span className="font-semibold text-amber-400 font-mono uppercase text-[11px] block mb-1">
                    Problem this solves:
                  </span>
                  {service.problemSolved}
                </div>

                {/* Detailed 3-Column Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  {/* Column 1: What We Build */}
                  <div className="p-6 rounded-2xl bg-[#151824] border border-[#252938] space-y-3">
                    <div className="text-xs font-mono uppercase text-[#8B5CF6] tracking-wider flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#8B5CF6]" />
                      <span>What We Build</span>
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-[#F5F6FA]">
                      {service.whatWeBuild.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 2: What You Receive */}
                  <div className="p-6 rounded-2xl bg-[#151824] border border-[#252938] space-y-3">
                    <div className="text-xs font-mono uppercase text-emerald-400 tracking-wider flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-emerald-400" />
                      <span>What You Receive</span>
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-[#F5F6FA]">
                      {service.whatYouReceive.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 3: What You Need to Provide */}
                  <div className="p-6 rounded-2xl bg-[#151824] border border-[#252938] space-y-3">
                    <div className="text-xs font-mono uppercase text-[#3B82F6] tracking-wider flex items-center gap-1.5">
                      <KeyRound className="w-3.5 h-3.5 text-[#3B82F6]" />
                      <span>What You Provide</span>
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-[#A0A5B5]">
                      {service.whatYouProvide.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#3B82F6] shrink-0 font-bold">•</span>
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
              Many clients combine a modern business website with an automated lead capture workflow and a 24/7 AI qualification assistant for a complete customer acquisition system.
            </p>
            <div className="pt-2">
              <Link
                href="/contact?solution=combined"
                className="atomest-btn-primary inline-flex items-center gap-2 text-sm px-6 py-3"
              >
                <span>Request a Project Proposal</span>
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
