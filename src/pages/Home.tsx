import { Link } from "wouter";
import { ArrowRight, Sparkles, Globe, GitFork, Bot, Layers, CheckCircle2, ShieldCheck, Zap, Compass, Palette, Code2, Rocket, Laptop, Smartphone, Users, Briefcase, Building, UserCheck } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { InteractiveShowcase } from "@/components/showcase/InteractiveShowcase";

export default function Home() {
  const threePillars = [
    {
      title: "Web Development",
      tagline: "High-Performance Digital Platforms",
      badge: "Core Service",
      description: "Fast, mobile-friendly websites and landing pages built to give your business an authoritative presence and turn visitors into enquiries.",
      icon: Globe,
      route: "/services#web-development",
      color: "text-[#3B82F6]",
      deliverables: ["Business & corporate websites", "High-converting landing pages", "Complete website redesigns", "Lead capture funnels"],
    },
    {
      title: "Business Automation",
      tagline: "Autonomous Workflow Pipelines",
      badge: "Core Service",
      description: "Connect your forms, spreadsheets, inboxes, and CRMs. Eliminate repetitive manual tasks and respond to new leads in under 60 seconds.",
      icon: GitFork,
      route: "/services#business-automation",
      color: "text-[#8B5CF6]",
      deliverables: ["Instant lead alerts & routing", "Google Sheets & CRM synchronization", "Automated email follow-ups", "Appointment enquiry workflows"],
    },
    {
      title: "AI Solutions",
      tagline: "Practical Business Assistants",
      badge: "Core Service",
      description: "Custom AI assistants grounded strictly in your business knowledge to answer customer FAQs, pre-qualify leads, and assist your team 24/7.",
      icon: Bot,
      route: "/services#ai-solutions",
      color: "text-emerald-400",
      deliverables: ["Website FAQ chatbots", "24/7 customer support assistants", "Inbound lead qualification", "Internal document & SOP copilots"],
    },
  ];

  const whoWeHelp = [
    {
      title: "Service Businesses & Agencies",
      icon: Briefcase,
      description: "Law firms, accounting practices, clinics, consultancies, and creative agencies that need a modern web presence and automated client intake.",
      benefits: ["Never lose an incoming enquiry", "Faster speed-to-lead response", "Professional credibility"],
    },
    {
      title: "Startups & Emerging Brands",
      icon: Rocket,
      description: "Early-stage founders who need high-converting landing pages, product waitlists, and automated user onboarding without hiring a full engineering team.",
      benefits: ["Rapid time-to-launch", "Built-in lead capture", "Scalable foundations"],
    },
    {
      title: "Solo Operators & Creators",
      icon: UserCheck,
      description: "Consultants, coaches, and solo entrepreneurs who want to eliminate administrative copy-pasting, automate scheduling, and save 10+ hours a week.",
      benefits: ["Zero repetitive data entry", "Automated booking & invoicing", "Affordable setup"],
    },
    {
      title: "Local & Growing SMBs",
      icon: Building,
      description: "Established local businesses looking to modernize their outdated websites, rank better on search, and sync customer data across everyday tools.",
      benefits: ["Sub-second mobile loading", "Automated email confirmations", "Clear ROI"],
    },
  ];

  const valueProps = [
    {
      step: "01",
      title: "Turn visitors into paying customers",
      description: "Fast, modern websites that look exceptional on mobile devices, explain your offer with clarity, and make it effortless for prospects to reach out.",
      icon: Globe,
      color: "text-[#3B82F6]",
      bg: "bg-[#3B82F6]/10",
      border: "border-[#3B82F6]/20",
    },
    {
      step: "02",
      title: "Never let a high-value lead slip away",
      description: "Automated pipelines that immediately notify your team on phone, Slack, or email when someone submits an inquiry, and send instant confirmation.",
      icon: GitFork,
      color: "text-[#8B5CF6]",
      bg: "bg-[#8B5CF6]/10",
      border: "border-[#8B5CF6]/20",
    },
    {
      step: "03",
      title: "Answer customer questions 24/7",
      description: "Grounded AI assistants that provide instant, accurate answers about your services, pricing guidelines, and availability, day or night.",
      icon: Bot,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
  ];

  const howWeWorkSteps = [
    {
      number: "01",
      title: "Discover",
      icon: Compass,
      description: "We review your current website, manual tasks, and bottlenecks to identify where digital improvements or automations will deliver the highest return.",
    },
    {
      number: "02",
      title: "Scope & Plan",
      icon: Palette,
      description: "We establish clear deliverables, page layouts, and workflow diagrams before building, giving you total transparency on timelines and scope.",
    },
    {
      number: "03",
      title: "Build & Test",
      icon: Code2,
      description: "We develop your solution using modern, reliable frameworks and thoroughly test mobile responsiveness, form deliveries, and error fallbacks.",
    },
    {
      number: "04",
      title: "Deploy & Support",
      icon: Rocket,
      description: "We handle domain configuration, launch, and handover documentation, ensuring your team is fully equipped to run the new system smoothly.",
    },
  ];

  const conceptCapabilities = [
    {
      title: "Speed-to-Lead Notification Pipeline",
      division: "Business Automation",
      badge: "Architecture Preview",
      description: "Captures consultation inquiries from website forms, validates contact information, logs data to Google Sheets, and sends instant alerts to team channels.",
      specs: ["Sub-60-second notification delivery", "Email & Slack integration", "Tested error-handling path"],
    },
    {
      title: "Internal Knowledge & FAQ Assistant",
      division: "AI Solutions",
      badge: "Prototype Demonstration",
      description: "An AI assistant configured to answer questions strictly based on verified business guidelines and service documentation, with human escalation for complex requests.",
      specs: ["Grounded document retrieval", "Strict guardrails against hallucination", "Clear fallback to human contact"],
    },
    {
      title: "High-Performance Modern Web Platform",
      division: "Web Development",
      badge: "Architecture Preview",
      description: "A fast, modern website structure featuring clean dark aesthetics, clear value proposition hierarchy, and built-in lead inquiry capture.",
      specs: ["Responsive across desktop and mobile", "Fast static loading", "Accessible, semantic HTML"],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Atomest | Digital Solutions Studio — Web, Automation & AI</title>
        <meta
          name="description"
          content="Atomest is a digital solutions studio. We build modern business websites, automate daily workflows, and implement practical AI solutions for growing businesses."
        />
      </Helmet>

      <div className="min-h-screen bg-[#08090D] flex flex-col justify-between">
        <Navbar />

        {/* ========================================================================= */}
        {/* SECTION A: HERO                                                          */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden pt-24 sm:pt-28 pb-20 sm:pb-28 border-b border-[#252938]">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-[#8B5CF6]/15 via-[#3B82F6]/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
          
          <div className="atomest-container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Headlines & CTA */}
              <div className="lg:col-span-7 text-left space-y-6">
                <div className="atomest-badge-violet inline-flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span>Digital Solutions Studio</span>
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight text-[#F5F6FA] leading-[1.08]">
                  Your business deserves an{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#3B82F6]">
                    unfair advantage.
                  </span>
                </h1>

                <p className="text-base sm:text-xl text-[#A0A5B5] leading-relaxed max-w-xl">
                  We build digital experiences, automate business operations, and implement practical AI solutions for growing businesses.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link href="/services" className="atomest-btn-primary inline-flex items-center gap-2">
                    <span>Explore Services</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link href="/contact" className="atomest-btn-secondary inline-flex items-center gap-2">
                    <span>Start a Project</span>
                  </Link>
                </div>

                {/* Three Core Pillars Tagline */}
                <div className="pt-6 border-t border-[#1C1F2B] grid grid-cols-3 gap-4 max-w-lg">
                  <div>
                    <div className="text-xs font-mono uppercase text-[#A0A5B5]">Pillar 01</div>
                    <div className="text-sm font-semibold text-[#3B82F6] mt-0.5">Web Development</div>
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase text-[#A0A5B5]">Pillar 02</div>
                    <div className="text-sm font-semibold text-[#8B5CF6] mt-0.5">Automation</div>
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase text-[#A0A5B5]">Pillar 03</div>
                    <div className="text-sm font-semibold text-emerald-400 mt-0.5">AI Solutions</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Tangible Deliverable Preview Card (Replacing abstract console) */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-[460px] rounded-3xl bg-[#10121A] border border-[#252938] p-6 shadow-2xl flex flex-col justify-between overflow-hidden space-y-4">
                  {/* Top Bar: Live Deliverable Preview */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#252938]">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-mono text-[#F5F6FA]">ATOMEST DELIVERABLES PREVIEW</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#151824] text-[#8B5CF6] border border-[#8B5CF6]/30">
                      LIVE EXAMPLES
                    </span>
                  </div>

                  {/* Sample 1: Modern Web Platform */}
                  <div className="p-3.5 rounded-xl bg-[#151824] border border-[#252938] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 font-semibold text-[#3B82F6]">
                        <Globe className="w-4 h-4" />
                        <span>High-Converting Website</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        Mobile-Ready
                      </span>
                    </div>
                    <p className="text-[11px] text-[#A0A5B5] leading-snug">
                      Clean dark typography, sub-second loading, and direct contact capture designed for modern businesses.
                    </p>
                  </div>

                  {/* Sample 2: Speed-to-Lead Automation */}
                  <div className="p-3.5 rounded-xl bg-[#151824] border border-[#252938] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 font-semibold text-[#8B5CF6]">
                        <GitFork className="w-4 h-4" />
                        <span>Speed-to-Lead Pipeline</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#C4B5FD] bg-[#8B5CF6]/10 px-2 py-0.5 rounded border border-[#8B5CF6]/20">
                        Under 60s Alert
                      </span>
                    </div>
                    <p className="text-[11px] text-[#A0A5B5] leading-snug">
                      Form submit → instant Telegram / Slack notification → Google Sheets sync → automatic prospect confirmation.
                    </p>
                  </div>

                  {/* Sample 3: Grounded AI Assistant */}
                  <div className="p-3.5 rounded-xl bg-[#151824] border border-[#252938] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 font-semibold text-emerald-400">
                        <Bot className="w-4 h-4" />
                        <span>Grounded Support Assistant</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        24/7 Availability
                      </span>
                    </div>
                    <p className="text-[11px] text-[#A0A5B5] leading-snug">
                      Answers prospect FAQs using your documented guidelines with strict accuracy safeguards.
                    </p>
                  </div>

                  {/* Bottom Note */}
                  <div className="pt-2 border-t border-[#1C1F2B] flex items-center justify-between text-[11px] text-[#A0A5B5]">
                    <span>Customized to your tools</span>
                    <Link href="#showcase" className="text-[#8B5CF6] hover:underline flex items-center gap-1 font-medium">
                      See interactive demos <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION B: WHO WE HELP                                                   */}
        {/* ========================================================================= */}
        <section className="atomest-section bg-[#0B0D14] border-b border-[#252938]">
          <div className="atomest-container">
            <div className="max-w-3xl mb-12">
              <div className="atomest-badge-blue mb-3 inline-flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span>Who We Help</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#F5F6FA] mb-4">
                Tailored for ambitious businesses of every size.
              </h2>
              <p className="text-base sm:text-lg text-[#A0A5B5] leading-relaxed">
                Whether you are a solo operator looking to save 10 hours a week or an established service business modernizing your online presence, we deliver practical, reliable solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whoWeHelp.map((group, idx) => {
                const Icon = group.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-[#10121A] border border-[#252938] hover:border-[#8B5CF6]/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-[#151824] border border-[#252938] flex items-center justify-center text-[#8B5CF6] mb-4">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-display font-bold text-lg text-[#F5F6FA] mb-2">
                        {group.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#A0A5B5] leading-relaxed mb-4">
                        {group.description}
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-4 border-t border-[#1C1F2B]">
                      {group.benefits.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-2 text-xs text-[#C4B5FD]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
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

        {/* ========================================================================= */}
        {/* SECTION C: THREE CORE SERVICES                                           */}
        {/* ========================================================================= */}
        <section id="services" className="atomest-section border-b border-[#252938]">
          <div className="atomest-container">
            <div className="max-w-3xl mb-12">
              <div className="atomest-badge-violet mb-3">
                <Layers className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>Our Core Services</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#F5F6FA] mb-4">
                Three pillars of digital growth.
              </h2>
              <p className="text-base sm:text-lg text-[#A0A5B5] leading-relaxed">
                Whether you need a high-converting website, automated business workflows, or intelligent AI assistants, we engineer solutions designed around your objectives.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {threePillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 sm:p-8 rounded-2xl bg-[#10121A] border border-[#252938] hover:border-[#8B5CF6]/50 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-[#151824] border border-[#252938] flex items-center justify-center text-[#8B5CF6] group-hover:bg-[#8B5CF6] group-hover:text-white transition-colors">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#151824] text-[#C4B5FD] border border-[#252938]">
                          {pillar.badge}
                        </span>
                      </div>

                      <div className="text-xs font-mono uppercase text-[#8B5CF6] tracking-wider mb-1">
                        {pillar.tagline}
                      </div>

                      <h3 className="font-display font-bold text-2xl text-[#F5F6FA] mb-3">
                        {pillar.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#A0A5B5] leading-relaxed mb-6">
                        {pillar.description}
                      </p>

                      <div className="space-y-2 pt-4 border-t border-[#1C1F2B] mb-6">
                        {pillar.deliverables.map((item, dIdx) => (
                          <div key={dIdx} className="flex items-center gap-2 text-xs text-[#C4B5FD]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={pillar.route}
                      className="atomest-btn-secondary flex items-center justify-center gap-2 w-full text-xs font-semibold group-hover:border-[#8B5CF6] transition-colors"
                    >
                      <span>Explore {pillar.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION D: VALUE PROPOSITION                                             */}
        {/* ========================================================================= */}
        <section className="atomest-section bg-[#0B0D14] border-b border-[#252938]">
          <div className="atomest-container">
            <div className="max-w-3xl mb-12">
              <div className="atomest-badge-blue mb-3">
                <Zap className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span>Value Proposition</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#F5F6FA] mb-4">
                Less manual work. More meaningful growth.
              </h2>
              <p className="text-base sm:text-lg text-[#A0A5B5] leading-relaxed">
                Most companies waste hours every week wrestling with disconnected software, manual data copy-pasting, and outdated websites. We solve this by engineering purposeful digital solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {valueProps.map((prop, idx) => {
                const Icon = prop.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 sm:p-8 rounded-2xl bg-[#10121A] border border-[#252938] hover:border-[#8B5CF6]/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className={`w-12 h-12 rounded-xl ${prop.bg} border ${prop.border} flex items-center justify-center ${prop.color}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-mono text-[#A0A5B5]">{prop.step}</span>
                      </div>

                      <h3 className="font-display font-bold text-xl text-[#F5F6FA] mb-3">
                        {prop.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#A0A5B5] leading-relaxed">
                        {prop.description}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-[#1C1F2B] flex items-center gap-2 text-xs font-medium text-[#8B5CF6]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Engineered for practical business results</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION E: INTERACTIVE CAPABILITY SHOWCASE                               */}
        {/* ========================================================================= */}
        <InteractiveShowcase />

        {/* ========================================================================= */}
        {/* SECTION F: HOW WE WORK                                                   */}
        {/* ========================================================================= */}
        <section className="atomest-section bg-[#0B0D14] border-y border-[#252938]">
          <div className="atomest-container">
            <div className="max-w-3xl mb-12">
              <div className="atomest-badge-violet mb-3">
                <Rocket className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>Engagement Process</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#F5F6FA] mb-4">
                How we work.
              </h2>
              <p className="text-base sm:text-lg text-[#A0A5B5] leading-relaxed">
                A disciplined four-phase delivery framework designed for clarity, velocity, and zero surprises.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {howWeWorkSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-[#10121A] border border-[#252938] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#151824] border border-[#252938] flex items-center justify-center text-[#8B5CF6]">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-2xl font-extrabold font-mono text-[#8B5CF6]/30">
                          {step.number}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-lg text-[#F5F6FA] mb-2">
                        {step.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#A0A5B5] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION G: ARCHITECTURAL SYSTEMS & PROTOTYPES                            */}
        {/* ========================================================================= */}
        <section className="atomest-section border-b border-[#252938]">
          <div className="atomest-container">
            <div className="max-w-3xl mb-12">
              <div className="atomest-badge-blue mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span>Architecture & Prototypes</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#F5F6FA] mb-4">
                Architectural systems we build.
              </h2>
              <p className="text-base sm:text-lg text-[#A0A5B5] leading-relaxed">
                Demonstrations of our architectural patterns across high-impact business domains. Clearly labeled as prototypes and architecture previews.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {conceptCapabilities.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#10121A] border border-[#252938] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-mono text-[#8B5CF6] uppercase tracking-wider">
                        {item.division}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#151824] text-[#A0A5B5] border border-[#252938]">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-[#F5F6FA] mb-2.5">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#A0A5B5] leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-4 border-t border-[#1C1F2B]">
                    {item.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-xs text-[#C4B5FD]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Integrity Notice */}
            <div className="mt-8 p-4 rounded-xl bg-[#0B0D14] border border-[#252938] text-center text-xs text-[#A0A5B5]">
              Atomest maintains strict integrity: we never fabricate client logos, fake case studies, or simulated testimonials. Systems shown above are architectural blueprints and prototypes developed by our team.
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION H: FINAL CTA                                                     */}
        {/* ========================================================================= */}
        <section className="atomest-section py-20 sm:py-28">
          <div className="atomest-container">
            <div className="p-8 sm:p-16 rounded-3xl bg-gradient-to-b from-[#151824] to-[#10121A] border border-[#252938] relative overflow-hidden text-center shadow-2xl">
              <div className="absolute top-0 right-1/2 translate-x-1/2 w-96 h-96 bg-[#8B5CF6]/15 rounded-full blur-3xl pointer-events-none" />

              <div className="max-w-2xl mx-auto relative z-10 space-y-6">
                <div className="atomest-badge-violet inline-flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span>Start Your Project</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#F5F6FA]">
                  Ready to make your business work smarter?
                </h2>

                <p className="text-base sm:text-lg text-[#A0A5B5] leading-relaxed">
                  Tell us about your project or current operational bottlenecks. We will assess your requirements and deliver a clear, transparent proposal.
                </p>

                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="atomest-btn-primary inline-flex items-center gap-2 text-base px-8 py-3.5 shadow-lg shadow-[#8B5CF6]/25"
                  >
                    <span>Start a Project</span>
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
