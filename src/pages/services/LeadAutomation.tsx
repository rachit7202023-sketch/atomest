import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "wouter";
import {
  ArrowRight,
  GitFork,
  CheckCircle2,
  ShieldCheck,
  Mail,
  Clock,
  Users,
  Zap,
  Globe,
  Sparkles,
} from "lucide-react";

export default function LeadAutomation() {
  return (
    <>
      <Helmet>
        <title>Lead Automation | Atomest — Instant Lead Capture & Follow-Up</title>
        <meta
          name="description"
          content="Atomest Lead Automation: website lead capture, instant notifications, qualification, CRM synchronization, and automated follow-ups. Never lose a lead again."
        />
      </Helmet>

      <div className="min-h-screen bg-slate-950 flex flex-col justify-between text-slate-50">
        <Navbar />

        {/* Hero */}
        <section className="relative overflow-hidden pt-24 sm:pt-32 pb-20 border-b border-slate-800/60">
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/5 to-transparent rounded-full blur-[120px] pointer-events-none"
            aria-hidden="true"
          />
          <div className="atomest-container relative z-10 text-center max-w-3xl mx-auto space-y-5 reveal-section">
            <div className="atomest-badge-blue inline-flex items-center gap-2">
              <GitFork className="w-3.5 h-3.5 text-blue-400" />
              <span>Service Division — Lead Automation</span>
            </div>
            <h1 className="atomest-section-title text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] mb-4 text-balance">
              Turn every enquiry into a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400">
                qualified lead.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Automated lead pipelines that capture website enquiries instantly, notify your team in under 60 seconds, qualify prospects, sync to your CRM, and trigger automated follow-up — so no lead ever goes cold.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4 reveal-item">
              <Link
                href="/contact?solution=lead-automation"
                className="atomest-btn-primary inline-flex items-center gap-2 text-sm px-6 py-3"
              >
                <span>Enquire About Lead Automation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* What it does */}
        <section className="atomest-section border-b border-slate-800/60 reveal-section">
          <div className="atomest-container">
            <div className="max-w-3xl mb-14">
              <div className="atomest-badge-blue mb-3 inline-flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>What the pipeline handles</span>
              </div>
              <h2 className="atomest-section-title text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 text-balance">
                From website visitor to booked consultation — automatically.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  title: "Instant Lead Capture",
                  desc: "Website forms, chat widgets, and landing pages feed enquiries directly into your pipeline the moment they arrive.",
                  icon: Mail,
                },
                {
                  title: "Instant Notification",
                  desc: "Your team gets Slack, Telegram, or email alerts the second a lead submits — respond while intent is high.",
                  icon: Zap,
                },
                {
                  title: "Lead Qualification",
                  desc: "Structured questions score each lead by budget, timeline, and fit so your team prioritizes the best opportunities.",
                  icon: CheckCircle2,
                },
                {
                  title: "CRM Synchronization",
                  desc: "Lead data flows to Google Sheets, HubSpot, Airtable, or Notion automatically — no manual copy-pasting.",
                  icon: Users,
                },
                {
                  title: "Automated Follow-Up",
                  desc: "Nurture sequences keep prospects engaged until they book — never let a lead slip through the cracks.",
                  icon: Clock,
                },
                {
                  title: "Missed-Enquiry Recovery",
                  desc: "Unanswered or stalled leads trigger re-engagement workflows to win back lost opportunities.",
                  icon: Globe,
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="reveal-item p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900 flex flex-col justify-between group transition-all duration-300 hover:border-blue-500/40"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4 shrink-0">
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
              <div className="atomest-badge-blue mb-3 inline-flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-blue-400" />
                <span>Deployment process</span>
              </div>
              <h2 className="atomest-section-title text-3xl sm:text-5xl font-extrabold tracking-tight mb-6">
                Your lead pipeline in four phases.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { step: "01", title: "Intake design", desc: "We map your lead sources, qualification criteria, and routing rules." },
                { step: "02", title: "Workflow build", desc: "We configure capture, notification, CRM sync, and follow-up on your platform." },
                { step: "03", title: "Test with real data", desc: "We run sample submissions end-to-end and verify error fallbacks." },
                { step: "04", title: "Launch & handover", desc: "We go live and provide an SOP plus video walkthrough for your team." },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="reveal-item p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900 flex flex-col group transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-extrabold font-mono text-blue-400 mb-4 shrink-0">
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
                <div className="atomest-badge-blue inline-flex items-center gap-2">
                  <GitFork className="w-3.5 h-3.5 text-blue-400" />
                  <span>Never lose a lead</span>
                </div>
                <h2 className="atomest-section-title text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
                  Respond in under 60 seconds.
                </h2>
                <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
                  Speed-to-lead is the difference between winning and losing a customer. Automate your lead pipeline today.
                </p>
                <Link
                  href="/contact?solution=lead-automation"
                  className="atomest-btn-primary atomest-btn-lg inline-flex items-center gap-2 shadow-lg shadow-blue-500/25"
                >
                  <span>Request Lead Automation Proposal</span>
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
