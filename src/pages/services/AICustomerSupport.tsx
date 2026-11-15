import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "wouter";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ShieldCheck,
  MessageSquare,
  Clock,
  Users,
  Zap,
  Sparkles,
} from "lucide-react";

export default function AICustomerSupport() {
  return (
    <>
      <Helmet>
        <title>AI Customer Support | Atomest — 24/7 Grounded Support Assistant</title>
        <meta
          name="description"
          content="Atomest AI Customer Support: knowledge-based responses, FAQ automation, ticket creation, and human escalation. Grounded in your documentation for accurate, reliable support."
        />
      </Helmet>

      <div className="min-h-screen bg-slate-950 flex flex-col justify-between text-slate-50">
        <Navbar />

        {/* Hero */}
        <section className="relative overflow-hidden pt-24 sm:pt-32 pb-20 border-b border-slate-800/60">
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-emerald-500/10 via-indigo-500/5 to-transparent rounded-full blur-[120px] pointer-events-none"
            aria-hidden="true"
          />
          <div className="atomest-container relative z-10 text-center max-w-3xl mx-auto space-y-5 reveal-section">
            <div className="atomest-badge-emerald inline-flex items-center gap-2">
              <Bot className="w-3.5 h-3.5 text-emerald-400" />
              <span>Service Division — AI Customer Support</span>
            </div>
            <h1 className="atomest-section-title text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] mb-4 text-balance">
              Support that never sleeps, answers that are always{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-indigo-400 to-emerald-400">
                grounded.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
              AI support assistants that answer customer questions from your verified documentation, classify enquiries, create tickets, collect customer information, and escalate to humans when needed — 24/7.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4 reveal-item">
              <Link
                href="/contact?solution=ai-customer-support"
                className="atomest-btn-primary inline-flex items-center gap-2 text-sm px-6 py-3"
              >
                <span>Enquire About AI Support</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* What it does */}
        <section className="atomest-section border-b border-slate-800/60 reveal-section">
          <div className="atomest-container">
            <div className="max-w-3xl mb-14">
              <div className="atomest-badge-emerald mb-3 inline-flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>What the assistant handles</span>
              </div>
              <h2 className="atomest-section-title text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 text-balance">
                Resolve more tickets with fewer human hours.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  title: "Knowledge-Based Responses",
                  desc: "Answers strictly from your verified FAQs, policies, and service documentation — no hallucinated answers.",
                  icon: Bot,
                },
                {
                  title: "FAQ Automation",
                  desc: "Resolves common questions instantly so your team only handles complex, high-value conversations.",
                  icon: MessageSquare,
                },
                {
                  title: "Enquiry Classification",
                  desc: "Routes each message to the right department — billing, technical, sales, or general — automatically.",
                  icon: Zap,
                },
                {
                  title: "Ticket Creation",
                  desc: "Creates structured tickets in your support system with customer details and conversation context.",
                  icon: CheckCircle2,
                },
                {
                  title: "Human Escalation",
                  desc: "Escalates conversations that exceed scope with full transcript and summary for your team.",
                  icon: Users,
                },
                {
                  title: "Conversation Logging",
                  desc: "Every interaction is logged for quality review, training, and continuous improvement.",
                  icon: Clock,
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="reveal-item p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900 flex flex-col justify-between group transition-all duration-300 hover:border-emerald-500/40"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-slate-50 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Delivery process */}
        <section className="atomest-section border-b border-slate-800/60 reveal-section">
          <div className="atomest-container">
            <div className="max-w-3xl mb-14 text-center">
              <div className="atomest-badge-emerald mb-3 inline-flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>Deployment process</span>
              </div>
              <h2 className="atomest-section-title text-3xl sm:text-5xl font-extrabold tracking-tight mb-6">
                Grounded support, configured to your knowledge.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { step: "01", title: "Knowledge ingestion", desc: "We ingest your FAQs, policies, and SOPs into a secure knowledge base." },
                { step: "02", title: "Guardrails & prompts", desc: "We configure strict boundaries so answers stay accurate and on-brand." },
                { step: "03", title: "Integration", desc: "We connect the chat widget, ticketing system, and escalation path." },
                { step: "04", title: "Test & launch", desc: "We validate responses, verify escalations, and hand over documentation." },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="reveal-item p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900 flex flex-col group transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-extrabold font-mono text-emerald-400 mb-4 shrink-0">
                    {step.step}
                  </div>
                  <h3 className="font-display font-bold text-lg text-slate-50 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="atomest-section pt-20 sm:pt-28 pb-24 reveal-section">
          <div className="atomest-container">
            <div className="p-8 sm:p-16 rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden text-center shadow-2xl reveal-item">
              <div className="max-w-2xl mx-auto relative z-10 space-y-6">
                <div className="atomest-badge-emerald inline-flex items-center gap-2">
                  <Bot className="w-3.5 h-3.5 text-emerald-400" />
                  <span>24/7 grounded support</span>
                </div>
                <h2 className="atomest-section-title text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
                  Resolve tickets while your team sleeps.
                </h2>
                <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
                  Your customers deserve instant, accurate answers. Your team deserves to focus on complex work.
                </p>
                <Link
                  href="/contact?solution=ai-customer-support"
                  className="atomest-btn-primary atomest-btn-lg inline-flex items-center gap-2 shadow-lg shadow-emerald-500/25"
                >
                  <span>Request AI Support Proposal</span>
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
