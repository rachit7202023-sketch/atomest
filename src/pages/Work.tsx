import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, ShieldCheck, Globe, GitFork, Bot, Info } from "lucide-react";

export default function Work() {
  const systems = [
    {
      title: "Speed-to-Lead Notification Pipeline",
      category: "Business Automation",
      badge: "Architecture Preview",
      icon: GitFork,
      color: "text-[#8B5CF6]",
      border: "border-[#8B5CF6]/30",
      description:
        "An automated speed-to-lead workflow template that captures inbound inquiry webhooks, validates contact data, updates Google Sheets or CRM tables, and pushes immediate alerts to Slack, Telegram, or email.",
      features: [
        "Tested sub-60-second webhook-to-notification execution",
        "Configurable CRM contact creation & spreadsheet row logging",
        "Automated confirmation email delivery to prospect",
        "Deterministic input validation with honeypot spam protection",
      ],
      stack: ["n8n / Webhooks", "Google Sheets API", "Resend / SMTP", "Slack / Telegram"],
      statusDetail: "Architecture Preview & Verification Template",
    },
    {
      title: "Modern Business Web Platform Architecture",
      category: "Web Development",
      badge: "Prototype Demonstration",
      icon: Globe,
      color: "text-[#3B82F6]",
      border: "border-[#3B82F6]/30",
      description:
        "Modern, dark-aesthetic business website architecture engineered for service companies. Features fast static rendering, responsive layout grids, structured SEO metadata, and integrated contact form ingestion.",
      features: [
        "Clean, responsive layout tested across mobile, tablet, and desktop",
        "Static pre-rendering for sub-second initial page paint",
        "Integrated consultation request funnel with backend database storage",
        "Semantic, accessible HTML structure and clean typography hierarchy",
      ],
      stack: ["React", "TypeScript", "Tailwind CSS", "Vite SSR", "Supabase"],
      statusDetail: "Production-Hardened Architectural Baseline",
    },
    {
      title: "Grounded Knowledge & FAQ Assistant",
      category: "AI Solutions",
      badge: "Concept Demonstration",
      icon: Bot,
      color: "text-emerald-400",
      border: "border-emerald-500/30",
      description:
        "An AI customer and employee assistant that answers technical questions and FAQ inquiries strictly grounded in verified business documentation, with deterministic human fallback for edge cases.",
      features: [
        "Document-grounded prompt boundary to reduce hallucinations",
        "Automatic escalation when confidence score falls below threshold",
        "Embeddable web chat widget with persistent session state",
        "Human email escalation for inquiries exceeding documented scope",
      ],
      stack: ["Gemini 1.5 Flash / Pro", "Vector Store", "Node.js / Express", "Webchat Widget"],
      statusDetail: "Active Prototype & Implementation Pattern",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Work & Architecture | Atomest — Digital Systems & Prototypes</title>
        <meta
          name="description"
          content="Explore Atomest's verified architectural systems, automation blueprints, and production-ready digital solutions for growing businesses."
        />
      </Helmet>

      <div className="min-h-screen bg-[#08090D] flex flex-col justify-between text-[#F5F6FA]">
        <Navbar />

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 sm:pt-32 pb-16 border-b border-[#252938]">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#8B5CF6]/15 via-[#3B82F6]/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

          <div className="atomest-container relative z-10 text-center max-w-3xl mx-auto space-y-5">
            <div className="atomest-badge-blue inline-flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span>Architectural Systems & Blueprints</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-[#F5F6FA] leading-[1.1]">
              Engineered Systems.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#3B82F6]">
                Practical Solutions.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#A0A5B5] leading-relaxed">
              Explore our architectural patterns across web platforms, business automations, and intelligent AI assistants. All projects are clearly labeled by development stage.
            </p>
          </div>
        </section>

        {/* Systems Grid */}
        <main className="atomest-container py-16 sm:py-24 space-y-12">
          {/* Transparency Disclaimer */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#10121A] border border-[#252938] text-center max-w-3xl mx-auto space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-[#8B5CF6] tracking-wider">
              <Info className="w-4 h-4 text-[#8B5CF6]" />
              <span>Commercial Transparency Policy</span>
            </div>
            <p className="text-xs text-[#A0A5B5] leading-relaxed">
              The systems featured below represent real architectural templates, functional prototypes, and internal builds developed by Atomest. We never fabricate client reviews, simulated case studies, or unverified performance metrics.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {systems.map((project, idx) => {
              const Icon = project.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-[#10121A] border border-[#252938] hover:border-[#8B5CF6]/50 transition-all flex flex-col justify-between shadow-xl"
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl bg-[#151824] border ${project.border} flex items-center justify-center ${project.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#151824] text-[#C4B5FD] border border-[#252938]">
                        {project.badge}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs font-mono uppercase text-[#8B5CF6] tracking-wider">
                        {project.category}
                      </span>
                      <h2 className="text-xl font-bold font-display text-[#F5F6FA] mt-1">
                        {project.title}
                      </h2>
                    </div>

                    <p className="text-xs sm:text-sm text-[#A0A5B5] leading-relaxed">
                      {project.description}
                    </p>

                    <div className="space-y-2 pt-4 border-t border-[#1C1F2B]">
                      <div className="text-[11px] font-mono uppercase text-[#A0A5B5] tracking-wider mb-2">
                        Key Capabilities
                      </div>
                      {project.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-[#C4B5FD]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-[#1C1F2B]">
                      <div className="text-[11px] font-mono uppercase text-[#A0A5B5] tracking-wider mb-2">
                        Architecture Stack
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.stack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#151824] text-[#A0A5B5] border border-[#252938]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#1C1F2B]">
                    <Link
                      href="/contact"
                      className="atomest-btn-secondary flex items-center justify-center gap-2 w-full text-xs font-semibold hover:border-[#8B5CF6] transition-colors"
                    >
                      <span>Enquire About a Similar Solution</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
