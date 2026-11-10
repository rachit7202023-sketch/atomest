import { Link } from "wouter";
import { ArrowRight, Sparkles, Globe, GitFork, Bot, Layers, CheckCircle2, ShieldCheck, Zap, Compass, Palette, Code2, Rocket, Cpu } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { InteractiveShowcase } from "@/components/showcase/InteractiveShowcase";

export default function Home() {
  const threePillars = [
    {
      title: "Web Development",
      tagline: "High-Performance Digital Flagships",
      badge: "Core Service",
      description: "Modern, search-optimized business websites, landing pages, and web applications engineered for speed, technical authority, and conversion.",
      icon: Globe,
      route: "/services#web-development",
      color: "text-[#3B82F6]",
      deliverables: ["Business & corporate websites", "High-conversion landing pages", "Lead generation funnels", "Full redesigns & modernization"],
    },
    {
      title: "Business Automation",
      tagline: "Autonomous Event & Data Pipelines",
      badge: "Core Service",
      description: "Stop doing manually what technology can handle. Connect forms, CRMs, messaging, and databases into deterministic, self-healing workflows.",
      icon: GitFork,
      route: "/services#business-automation",
      color: "text-[#8B5CF6]",
      deliverables: ["Inbound lead triage & routing", "Multi-system CRM synchronization", "Appointment & booking automation", "Custom operational event logic"],
    },
    {
      title: "AI Solutions",
      tagline: "Grounded Business Assistants",
      badge: "Core Service",
      description: "Intelligent conversational and task-oriented agents with deterministic tool integrations, private data grounding, and strict human fallbacks.",
      icon: Bot,
      route: "/services#ai-solutions",
      color: "text-emerald-400",
      deliverables: ["24/7 customer support agents", "Inbound sales qualification assistants", "Internal knowledge & SOP copilots", "Domain-specific AI copilots"],
    },
  ];

  const valueProps = [
    {
      step: "01",
      title: "Build better digital experiences",
      description: "Fast, modern, conversion-focused websites and web platforms that turn casual visitors into high-intent business opportunities.",
      icon: Globe,
      color: "text-[#3B82F6]",
      bg: "bg-[#3B82F6]/10",
      border: "border-[#3B82F6]/20",
    },
    {
      step: "02",
      title: "Eliminate repetitive workflows",
      description: "Resilient autonomous pipelines that connect your tools, qualify incoming leads, sync data across systems, and eliminate manual friction.",
      icon: GitFork,
      color: "text-[#8B5CF6]",
      bg: "bg-[#8B5CF6]/10",
      border: "border-[#8B5CF6]/20",
    },
    {
      step: "03",
      title: "Put intelligent systems to work",
      description: "Grounded AI agents and task assistants that handle customer inquiries, support internal operations, and automate complex decisions.",
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
      description: "We audit your existing systems, conversion bottlenecks, and manual operations to determine where intelligent software delivers real ROI.",
    },
    {
      number: "02",
      title: "Design",
      icon: Palette,
      description: "We architect system workflows, data schemas, and interactive interfaces before writing code, ensuring clarity and stakeholder alignment.",
    },
    {
      number: "03",
      title: "Build",
      icon: Code2,
      description: "Our engineers build using modern, battle-tested frameworks (React, TypeScript, Supabase, serverless compute) with rigorous type safety.",
    },
    {
      number: "04",
      title: "Deploy",
      icon: Rocket,
      description: "We handle production provisioning, observability telemetry, edge routing, and ongoing maintenance so your systems run without interruption.",
    },
  ];

  const conceptCapabilities = [
    {
      title: "OmniFlow Lead Triage Architecture",
      division: "Business Automation",
      description: "Captures inbound consultation inquiries, parses intent via Gemini models, validates business domains, and triggers synchronous deal writes in HubSpot and Slack.",
      specs: ["Sub-400ms end-to-end execution", "Zero-loss dead-letter queue", "Idempotent event routing"],
    },
    {
      title: "Atlas Sovereign Knowledge Agent",
      division: "AI Solutions",
      description: "A private, zero-retention internal assistant designed to answer compliance, legal, and operational inquiries by querying vector-indexed internal SOP documents.",
      specs: ["SOC2-ready VPC isolation", "Grounded inline citations", "Deterministic human escalation"],
    },
    {
      title: "Veloce High-Authority Web Platform",
      division: "Web Development",
      description: "A next-generation corporate website architecture featuring edge rendering, fluid dark aesthetic, sub-second First Contentful Paint, and dynamic lead qualification.",
      specs: ["99+ Core Web Vitals score", "Full mobile responsiveness", "Dynamic lead form routing"],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Atomest | Digital Solutions Studio — Web, Automation & AI</title>
        <meta
          name="description"
          content="Atomest is a digital solutions studio. We build digital experiences, automate business operations, and implement practical AI solutions for growing businesses."
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

              {/* Right Column: Abstract AI Visual Centerpiece */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[420px] aspect-square rounded-3xl bg-[#10121A] border border-[#252938] p-6 shadow-2xl flex flex-col justify-between overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(#252938_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

                  {/* Top Bar of abstract console */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#252938] relative z-10">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-mono text-[#F5F6FA]">ATOMEST_STUDIO :: v2.0</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#151824] text-[#8B5CF6] border border-[#8B5CF6]/30">
                      SYSTEM READY
                    </span>
                  </div>

                  {/* Central Orbital Centerpiece */}
                  <div className="relative flex-1 flex items-center justify-center my-6">
                    <div className="absolute w-56 h-56 rounded-full border border-[#8B5CF6]/20 border-dashed animate-[spin_30s_linear_infinite]" />
                    <div className="absolute w-40 h-40 rounded-full border border-[#3B82F6]/30 animate-[spin_20s_linear_infinite_reverse]" />

                    <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#8B5CF6] to-[#3B82F6] flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.5)]">
                      <Cpu className="w-9 h-9 text-white animate-pulse" />
                    </div>

                    <div className="absolute -top-1 left-8 px-2.5 py-1 rounded-lg bg-[#151824]/90 border border-[#252938] text-[10px] font-mono text-[#C4B5FD] shadow-lg backdrop-blur-sm">
                      ⚡ 3 Core Pillars
                    </div>
                    <div className="absolute -bottom-1 right-8 px-2.5 py-1 rounded-lg bg-[#151824]/90 border border-[#252938] text-[10px] font-mono text-emerald-400 shadow-lg backdrop-blur-sm">
                      ✓ Pipeline Synced
                    </div>
                  </div>

                  {/* Bottom Console Status */}
                  <div className="pt-3 border-t border-[#252938] relative z-10 grid grid-cols-2 gap-2 text-[11px] font-mono">
                    <div className="text-[#A0A5B5]">
                      Delivery: <span className="text-[#F5F6FA]">Production</span>
                    </div>
                    <div className="text-right text-[#8B5CF6]">
                      Reliable Execution
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION B: THREE CORE SERVICES                                           */}
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
        {/* SECTION C: VALUE PROPOSITION                                             */}
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
                Most companies waste hundreds of hours every month wrestling with disconnected software, manual data handoffs, and outdated websites. We solve this by engineering purposeful intelligent systems.
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
                      <span>Engineered for measurable ROI</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION D: INTERACTIVE CAPABILITY SHOWCASE                               */}
        {/* ========================================================================= */}
        <InteractiveShowcase />

        {/* ========================================================================= */}
        {/* SECTION E: HOW WE WORK                                                   */}
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
                A disciplined four-phase delivery framework designed for engineering clarity, velocity, and zero surprises.
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
        {/* SECTION F: WORK / CAPABILITIES SHOWCASE (CONCEPT DEMONSTRATIONS)          */}
        {/* ========================================================================= */}
        <section className="atomest-section border-b border-[#252938]">
          <div className="atomest-container">
            <div className="max-w-3xl mb-12">
              <div className="atomest-badge-blue mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span>Concept Demonstrations</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#F5F6FA] mb-4">
                Architectural systems we build.
              </h2>
              <p className="text-base sm:text-lg text-[#A0A5B5] leading-relaxed">
                Transparent demonstrations of our architectural patterns across high-impact business domains.
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
                        Concept demonstration
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
              Atomest maintains strict integrity: we never fabricate client logos, fake case studies, or simulated testimonials. Genuine client references are provided during formal enterprise scoping.
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION G: FINAL CTA                                                     */}
        {/* ========================================================================= */}
        <section className="atomest-section py-20 sm:py-28">
          <div className="atomest-container">
            <div className="p-8 sm:p-16 rounded-3xl bg-gradient-to-b from-[#151824] to-[#10121A] border border-[#252938] relative overflow-hidden text-center shadow-2xl">
              <div className="absolute top-0 right-1/2 translate-x-1/2 w-96 h-96 bg-[#8B5CF6]/15 rounded-full blur-3xl pointer-events-none" />

              <div className="max-w-2xl mx-auto relative z-10 space-y-6">
                <div className="atomest-badge-violet inline-flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span>Start Your Transformation</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#F5F6FA]">
                  Ready to make your business work smarter?
                </h2>

                <p className="text-base sm:text-lg text-[#A0A5B5] leading-relaxed">
                  Schedule a preliminary architecture discovery call. We'll assess your current workflows and deliver a tangible engineering proposal.
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
