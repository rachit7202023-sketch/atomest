import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import {
  GitFork,
  ArrowRight,
  CheckCircle2,
  Zap,
  Clock,
  ShieldCheck,
  Database,
  Mail,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Automation() {
  const categories = [
    {
      title: "Lead Management & Triage",
      icon: Zap,
      description:
        "Instantly capture incoming inquiries from web forms, ads, or partner networks, qualify their intent, enrich firmographic data, and assign them immediately.",
      benefits: [
        "< 60-second response latency",
        "Automated spam & low-fit filtering",
        "Enriched company size & tech stack data",
      ],
    },
    {
      title: "CRM Workflows & Data Hygiene",
      icon: Database,
      description:
        "Eliminate manual data entry. Keep HubSpot, Salesforce, Supabase, and internal databases continuously synchronized with zero manual updates.",
      benefits: [
        "Automatic deal creation & stage updates",
        "Cross-system deduplication",
        "Context-rich activity timeline logging",
      ],
    },
    {
      title: "Appointment & Calendar Automation",
      icon: Clock,
      description:
        "Replace email scheduling ping-pong with intelligent booking workflows that verify qualification, handle timezone coordination, and send multi-channel reminders.",
      benefits: [
        "Pre-meeting briefing document generation",
        "Multi-stakeholder calendar routing",
        "Automated reschedule & cancellation workflows",
      ],
    },
    {
      title: "Email & Communication Pipelines",
      icon: Mail,
      description:
        "Trigger timely, personalized transactional communications across email, SMS, and Slack based on real client behavior rather than generic time delays.",
      benefits: [
        "Dynamic email template injection",
        "Real-time engagement telemetry",
        "Automated escalation triggers for high-intent replies",
      ],
    },
    {
      title: "Two-Way Data Synchronization",
      icon: RefreshCw,
      description:
        "Connect disparate SaaS tools, inventory systems, ERPs, and internal spreadsheets into a single, cohesive source of truth.",
      benefits: [
        "Webhook-driven event architecture",
        "Idempotent event retries & failure logs",
        "Zero duplicate writes or race conditions",
      ],
    },
    {
      title: "Custom Business Logic Automations",
      icon: GitFork,
      description:
        "Bespoke automation pipelines engineered for your unique operational bottlenecks, compliance reviews, and financial reconciliation steps.",
      benefits: [
        "Deterministic business rule execution",
        "Audit trails for compliance & security",
        "Human-in-the-loop review checkpoints",
      ],
    },
  ];

  const operationalMetrics = [
    { value: "90%", label: "Reduction in manual entry" },
    { value: "< 2 sec", label: "Average event propagation" },
    { value: "99.9%", label: "Pipeline execution reliability" },
    { value: "Zero", label: "Lost leads from delayed response" },
  ];

  return (
    <>
      <Helmet>
        <title>AI Automation Solutions | Atomest</title>
        <meta
          name="description"
          content="Stop doing manually what technology can handle. Speed-to-Lead automations, workflow pipelines, CRM synchronization, and lead management engineered by Atomest."
        />
      </Helmet>

      <div className="min-h-screen bg-slate-950 flex flex-col justify-between text-slate-50">
        <Navbar />

        {/* Hero */}
        <section className="atomest-section pt-24 sm:pt-32 pb-20 border-b border-slate-800/60 reveal-section">
          <div className="atomest-container relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="atomest-badge-indigo inline-flex items-center gap-2">
                <GitFork className="w-3.5 h-3.5 text-indigo-400" />
                <span>Solution Division — AI Automation Solutions</span>
              </div>

              <h1 className="atomest-section-title text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05] mb-4 text-balance">
                Stop doing manually what{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-400">
                  technology can handle.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Repetitive manual tasks drain your team's velocity. We engineer resilient, event-driven automation pipelines that execute operational tasks instantly and accurately.
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-4 reveal-item">
                <Link
                  href="/contact?solution=business-automation"
                  className="atomest-btn-primary inline-flex items-center gap-2"
                >
                  <span>Build an Automation Pipeline</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Operational Metrics Bar */}
        <section className="border-y border-slate-800/60 bg-slate-900/40 py-6 reveal-section">
          <div className="atomest-container">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {operationalMetrics.map((metric, idx) => (
                <div key={idx} className="reveal-item flex flex-col items-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-50 mb-1">
                    {metric.value}
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Automation Capabilities Grid */}
        <section className="atomest-section border-b border-slate-800/60 reveal-section">
          <div className="atomest-container">
            <div className="max-w-3xl mb-14">
              <div className="atomest-badge-indigo mb-3 inline-flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-indigo-400" />
                <span>Operational Pillars</span>
              </div>
              <h2 className="atomest-section-title text-3xl sm:text-5xl font-extrabold tracking-tight mb-3">
                Every workflow, automated end-to-end.
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                We connect your existing tech stack into automated, self-healing pipelines with built-in audit trails and error recovery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {categories.map((cat, idx) => {
                const Icon = cat.icon;
                return (
                  <div
                    key={idx}
                    className="reveal-item p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900 hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-display font-bold text-lg text-slate-50 mb-2">
                        {cat.title}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-6">
                        {cat.description}
                      </p>
                    </div>
                    <div className="space-y-2 pt-4 border-t border-slate-800/60">
                      {cat.benefits.map((benefit, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-2 text-sm text-slate-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Integration Architecture */}
        <section className="atomest-section reveal-section">
          <div className="atomest-container">
            <div className="p-8 sm:p-12 rounded-3xl border border-slate-800 bg-slate-900 relative overflow-hidden">
              <div className="max-w-3xl relative z-10">
                <div className="atomest-badge-indigo mb-4 inline-flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Enterprise Reliability</span>
                </div>
                <h2 className="atomest-section-title text-2xl sm:text-4xl font-extrabold mb-4">
                  Built on deterministic, production-grade infrastructure.
                </h2>
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-6">
                  We don't build fragile "no-code" hacks that fail silently when an API updates. Our automations feature idempotent event handlers, payload schema validation, dead-letter queues, and instant alerts so your business operations never miss a beat.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: "Resilient", text: "Automatic exponential backoff & retry mechanisms" },
                    { label: "Observable", text: "Real-time execution logs and error telemetry" },
                    { label: "Governed", text: "Zero-data retention options & encrypted credentials" },
                  ].map((item, i) => (
                    <div key={i} className="p-4 rounded-xl border border-slate-800 bg-slate-950">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 mb-1">
                        {item.label}
                      </div>
                      <div className="text-sm font-semibold text-slate-50">
                        {item.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="atomest-section pt-20 sm:pt-28 pb-24 reveal-section">
          <div className="atomest-container">
            <div className="p-8 sm:p-16 rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden text-center shadow-2xl reveal-item">
              <div className="max-w-2xl mx-auto relative z-10 space-y-6">
                <h2 className="atomest-section-title text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
                  Ready to eliminate repetitive busywork?
                </h2>
                <p className="text-base sm:text-lg text-slate-400 mb-8 leading-relaxed">
                  Map your team's most time-consuming manual workflows with our solutions architects.
                </p>
                <Link
                  href="/contact?solution=business-automation"
                  className="atomest-btn-primary atomest-btn-lg inline-flex items-center gap-2 shadow-lg shadow-indigo-500/25"
                >
                  <span>Build an Automation Pipeline</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
