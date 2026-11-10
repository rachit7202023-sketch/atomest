import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import {
  GitFork,
  ArrowRight,
  CheckCircle2,
  Zap,
  Clock,
  ShieldCheck,
  Sparkles,
  Database,
  Mail,
  Calendar,
  RefreshCw,
  BellRing,
  FileSpreadsheet,
  Send,
  Timer,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AutomationPreview } from "../../components/showcase/AutomationPreview";

export default function Automation() {
  const categories = [
    {
      title: "Lead Management & Triage",
      icon: Zap,
      description: "Instantly capture incoming inquiries from web forms, ads, or partner networks, qualify their intent, enrich firmographic data, and assign them immediately.",
      benefits: ["< 60-second response latency", "Automated spam & low-fit filtering", "Enriched company size & tech stack data"],
    },
    {
      title: "CRM Workflows & Data Hygiene",
      icon: Database,
      description: "Eliminate manual data entry. Keep HubSpot, Salesforce, Supabase, and internal databases continuously synchronized with zero manual updates.",
      benefits: ["Automatic deal creation & stage updates", "Cross-system deduplication", "Context-rich activity timeline logging"],
    },
    {
      title: "Appointment & Calendar Automation",
      icon: Calendar,
      description: "Replace email scheduling ping-pong with intelligent booking workflows that verify qualification, handle timezone coordination, and send multi-channel reminders.",
      benefits: ["Pre-meeting briefing document generation", "Multi-stakeholder calendar routing", "Automated reschedule & cancellation workflows"],
    },
    {
      title: "Email & Communication Pipelines",
      icon: Mail,
      description: "Trigger timely, personalized transactional communications across email, SMS, and Slack based on real client behavior rather than generic time delays.",
      benefits: ["Dynamic email template injection", "Real-time engagement telemetry", "Automated escalation triggers for high-intent replies"],
    },
    {
      title: "Two-Way Data Synchronization",
      icon: RefreshCw,
      description: "Connect disparate SaaS tools, inventory systems, ERPs, and internal spreadsheets into a single, cohesive source of truth.",
      benefits: ["Webhook-driven event architecture", "Idempotent event retries & failure logs", "Zero duplicate writes or race conditions"],
    },
    {
      title: "Custom Business Logic Automations",
      icon: GitFork,
      description: "Bespoke automation pipelines engineered for your unique operational bottlenecks, compliance reviews, and financial reconciliation steps.",
      benefits: ["Deterministic business rule execution", "Audit trails for compliance & security", "Human-in-the-loop review checkpoints"],
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

      <div className="min-h-screen bg-[#08090D] flex flex-col justify-between">
        <Navbar />

        {/* Hero Section */}
        <section className="atomest-section pt-8 pb-16">
          <div className="atomest-container">
            <div className="max-w-4xl mx-auto text-center">
              <div className="atomest-badge-violet mb-4 inline-flex items-center gap-2">
                <GitFork className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>Division: AI Automation Solutions</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-[#F5F6FA] mb-6 leading-tight">
                Stop doing manually what <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6]">technology can handle.</span>
              </h1>

              <p className="text-lg sm:text-xl text-[#A0A5B5] max-w-2xl mx-auto leading-relaxed mb-8">
                Repetitive manual tasks drain your team's velocity. We engineer resilient, event-driven automation pipelines that execute operational tasks instantly and accurately.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/contact?solution=automation"
                  className="atomest-btn-primary inline-flex items-center gap-2"
                >
                  <span>Build an Automation Pipeline</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#speed-to-lead"
                  className="atomest-btn-secondary inline-flex items-center gap-2"
                >
                  <span>Speed-to-Lead Pilot ($199)</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Operational Metrics Bar */}
        <section className="border-y border-[#252938] bg-[#10121A]/70 py-6">
          <div className="atomest-container">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {operationalMetrics.map((metric, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="text-2xl sm:text-3xl font-extrabold font-display text-[#F5F6FA] mb-1">
                    {metric.value}
                  </div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[#A0A5B5]">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURED SERVICE: Speed-to-Lead Sprint ── */}
        <section id="speed-to-lead" className="atomest-section">
          <div className="atomest-container">
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#151824] via-[#10121A] to-[#08090D] border border-[#8B5CF6]/30 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-7">
                  <div className="flex flex-wrap items-center gap-2.5 mb-4">
                    <span className="atomest-badge-violet inline-flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-[#8B5CF6]" />
                      <span>Featured 48-Hour Sprint</span>
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20">
                      Pilot Slots Open: 3 Only
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-[#F5F6FA] mb-4 leading-tight">
                    Speed-to-Lead Inbound Sprint
                  </h2>

                  <p className="text-sm sm:text-base text-[#A0A5B5] leading-relaxed mb-6">
                    Research proves that responding to inbound inquiries within 5 minutes increases conversion rates by up to 391%. We configure, integrate, and deploy an automated end-to-end capture and follow-up pipeline for your business in 48 to 72 hours.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#08090D]/80 border border-[#252938]">
                      <Timer className="w-5 h-5 text-[#8B5CF6] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-semibold text-[#F5F6FA]">&lt; 60-Second Alerts</div>
                        <div className="text-[11px] text-[#A0A5B5]">Instant Telegram or Slack notifications with 1-tap phone dial</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#08090D]/80 border border-[#252938]">
                      <FileSpreadsheet className="w-5 h-5 text-[#3B82F6] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-semibold text-[#F5F6FA]">Automated CRM Sync</div>
                        <div className="text-[11px] text-[#A0A5B5]">Deduplicated logging to Google Sheets, Notion, or your CRM</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#08090D]/80 border border-[#252938]">
                      <Send className="w-5 h-5 text-[#8B5CF6] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-semibold text-[#F5F6FA]">Prospect Acknowledgment</div>
                        <div className="text-[11px] text-[#A0A5B5]">Personalized email receipt so leads don't look elsewhere</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#08090D]/80 border border-[#252938]">
                      <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-semibold text-[#F5F6FA]">Spam Trap & Error Logging</div>
                        <div className="text-[11px] text-[#A0A5B5]">Honeypot protection and fail-safe alerts if an API glitches</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <Link
                      to="/contact?solution=automation"
                      className="atomest-btn-primary inline-flex items-center gap-2"
                    >
                      <span>Claim a Pilot Slot ($199)</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <span className="text-xs text-[#A0A5B5] font-mono">
                      Turnaround: 48–72 hours • ₹0 ongoing software subscription
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="p-6 sm:p-7 rounded-2xl bg-[#08090D] border border-[#252938] space-y-5">
                    <div className="flex items-center justify-between pb-4 border-b border-[#1C1F2B]">
                      <div>
                        <span className="text-xs font-mono text-[#8B5CF6] uppercase">Sprint Package</span>
                        <div className="text-xl font-bold font-display text-[#F5F6FA]">Done-For-You Pilot</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-extrabold font-display text-[#F5F6FA]">$199</div>
                        <span className="text-[11px] font-mono text-[#A0A5B5] line-through">$399 regular</span>
                      </div>
                    </div>

                    <div className="space-y-2.5 text-xs text-[#A0A5B5]">
                      <div className="flex items-center gap-2 text-[#F5F6FA]">
                        <CheckCircle2 className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                        <span>Form integration (Webflow, WordPress, custom forms)</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#F5F6FA]">
                        <CheckCircle2 className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                        <span>Deterministic payload validation & 24h deduplication</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#F5F6FA]">
                        <CheckCircle2 className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                        <span>Google Sheets / CRM data synchronization</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#F5F6FA]">
                        <CheckCircle2 className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                        <span>Real-time Telegram / Slack owner instant notifications</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#F5F6FA]">
                        <CheckCircle2 className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                        <span>Personalized prospect confirmation email</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#F5F6FA]">
                        <CheckCircle2 className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                        <span>10-point test verification suite executed pre-launch</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#F5F6FA]">
                        <CheckCircle2 className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                        <span>14 days of dedicated post-launch monitoring</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#1C1F2B]">
                      <div className="flex items-center gap-2 text-xs text-[#C4B5FD]">
                        <Clock className="w-3.5 h-3.5 text-[#8B5CF6]" />
                        <span>Delivered and verified in 48–72 hours after intake</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Workflow Demonstration */}
        <section id="pipeline-demo" className="atomest-section pt-0">
          <div className="atomest-container">
            <div className="max-w-3xl mb-8">
              <div className="atomest-badge-violet mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>Live Interactive Architecture</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#F5F6FA] mb-3">
                How an autonomous pipeline runs.
              </h2>
              <p className="text-sm sm:text-base text-[#A0A5B5]">
                Click "Trigger Event" to watch lead data flow through validation, AI qualification, CRM persistence, and multi-channel dispatch in sub-second time.
              </p>
            </div>

            <AutomationPreview />
          </div>
        </section>

        {/* Automation Capabilities Grid */}
        <section className="atomest-section bg-[#0B0D14] border-y border-[#252938]">
          <div className="atomest-container">
            <div className="max-w-3xl mb-12">
              <div className="atomest-badge-blue mb-3">
                <Zap className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span>Operational Pillars</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#F5F6FA] mb-3">
                Every workflow, automated end-to-end.
              </h2>
              <p className="text-sm sm:text-base text-[#A0A5B5]">
                We connect your existing tech stack into automated, self-healing pipelines with built-in audit trails and error recovery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat, idx) => {
                const Icon = cat.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-[#10121A] border border-[#252938] hover:border-[#8B5CF6]/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6] mb-4">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-display font-bold text-lg text-[#F5F6FA] mb-2">
                        {cat.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#A0A5B5] leading-relaxed mb-6">
                        {cat.description}
                      </p>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-[#1C1F2B]">
                      {cat.benefits.map((benefit, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-2 text-xs text-[#C4B5FD]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
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
        <section className="atomest-section">
          <div className="atomest-container">
            <div className="p-8 sm:p-12 rounded-3xl bg-[#10121A] border border-[#252938]">
              <div className="max-w-3xl">
                <div className="atomest-badge-violet mb-3">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span>Enterprise Reliability</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-[#F5F6FA] mb-4">
                  Built on deterministic, production-grade infrastructure.
                </h2>
                <p className="text-sm sm:text-base text-[#A0A5B5] leading-relaxed mb-6">
                  We don't build fragile "no-code" hacks that fail silently when an API updates. Our automations feature idempotent event handlers, payload schema validation, dead-letter queues, and instant alerts so your business operations never miss a beat.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-[#08090D] border border-[#252938]">
                    <div className="text-xs font-mono text-[#8B5CF6] uppercase mb-1">01 • Resilient</div>
                    <div className="text-sm font-semibold text-[#F5F6FA]">Automatic exponential backoff & retry mechanisms</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#08090D] border border-[#252938]">
                    <div className="text-xs font-mono text-[#8B5CF6] uppercase mb-1">02 • Observable</div>
                    <div className="text-sm font-semibold text-[#F5F6FA]">Real-time execution logs and error telemetry</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#08090D] border border-[#252938]">
                    <div className="text-xs font-mono text-[#8B5CF6] uppercase mb-1">03 • Governed</div>
                    <div className="text-sm font-semibold text-[#F5F6FA]">Zero-data retention options & encrypted credentials</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="atomest-section pt-0">
          <div className="atomest-container">
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#151824] to-[#10121A] border border-[#252938] relative overflow-hidden text-center">
              <div className="max-w-2xl mx-auto relative z-10">
                <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#F5F6FA] mb-4">
                  Ready to eliminate repetitive busywork?
                </h2>
                <p className="text-sm sm:text-base text-[#A0A5B5] mb-8 leading-relaxed">
                  Map your team's most time-consuming manual workflows with our solutions architects.
                </p>
                <Link
                  to="/contact?solution=automation"
                  className="atomest-btn-primary inline-flex items-center gap-2"
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
