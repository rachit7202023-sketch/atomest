import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "wouter";
import {
  ArrowRight,
  Phone,
  CheckCircle2,
  ShieldCheck,
  Clock,
  MessageSquare,
  Users,
  Zap,
  Sparkles,
} from "lucide-react";

export default function AIVoiceReceptionist() {
  return (
    <>
      <Helmet>
        <title>AI Voice Receptionist | Atomest — 24/7 Intelligent Call Handling</title>
        <meta
          name="description"
          content="Atomest AI Voice Receptionist: intelligent inbound call handling, enquiry qualification, appointment booking, and CRM integration for service businesses. Never miss a lead again."
        />
      </Helmet>

      <div className="min-h-screen bg-slate-950 flex flex-col justify-between text-slate-50">
        <Navbar />

        {/* Hero */}
        <section className="relative overflow-hidden pt-24 sm:pt-32 pb-20 border-b border-slate-800/60">
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-500/10 via-blue-500/5 to-transparent rounded-full blur-[120px] pointer-events-none"
            aria-hidden="true"
          />
          <div className="atomest-container relative z-10 text-center max-w-3xl mx-auto space-y-5 reveal-section">
            <div className="atomest-badge-indigo inline-flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-indigo-400" />
              <span>Service Division — AI Voice Receptionist</span>
            </div>
            <h1 className="atomest-section-title text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] mb-4 text-balance">
              Never miss another{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-400">
                inbound call.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
              An intelligent AI voice receptionist that answers calls 24/7, qualifies enquiries, books appointments, and feeds every lead directly into your CRM — so your team never wastes time on missed calls or manual intake.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4 reveal-item">
              <Link
                href="/contact?solution=ai-voice-receptionist"
                className="atomest-btn-primary inline-flex items-center gap-2 text-sm px-6 py-3"
              >
                <span>Enquire About Voice Receptionist</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* What it does */}
        <section className="atomest-section border-b border-slate-800/60 reveal-section">
          <div className="atomest-container">
            <div className="max-w-3xl mb-14">
              <div className="atomest-badge-indigo mb-3 inline-flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span>What the receptionist handles</span>
              </div>
              <h2 className="atomest-section-title text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 text-balance">
                A full front-desk operation, without the overhead.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  title: "Incoming Call Handling",
                  desc: "Answers every inbound call with a natural, professional voice — business hours, after hours, weekends, and holidays.",
                  icon: Phone,
                },
                {
                  title: "Enquiry Qualification",
                  desc: "Asks the right questions to determine service need, budget, timeline, and fit — then scores and routes each lead.",
                  icon: CheckCircle2,
                },
                {
                  title: "Appointment Booking",
                  desc: "Captures caller details and books consultations directly into your calendar or spreadsheet via webhook.",
                  icon: Clock,
                },
                {
                  title: "Business FAQs",
                  desc: "Answers questions about your services, pricing, availability, and location strictly from your documented knowledge base.",
                  icon: MessageSquare,
                },
                {
                  title: "Human Handoff",
                  desc: "Escalates complex or urgent callers to a human team member with a full call summary and transcript.",
                  icon: Users,
                },
                {
                  title: "CRM & Webhook Integration",
                  desc: "Pushes caller data to Google Sheets, HubSpot, Airtable, Notion, or any system that accepts webhooks.",
                  icon: Zap,
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="reveal-item p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900 flex flex-col justify-between group transition-all duration-300 hover:border-indigo-500/40"
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 shrink-0">
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
              <div className="atomest-badge-indigo mb-3 inline-flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-indigo-400" />
                <span>Deployment process</span>
              </div>
              <h2 className="atomest-section-title text-3xl sm:text-5xl font-extrabold tracking-tight mb-6">
                From first call to live receptionist.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { step: "01", title: "Discovery", desc: "We review your call volume, common enquiries, and booking process." },
                { step: "02", title: "Knowledge setup", desc: "Your business FAQs, services, and escalation rules are configured." },
                { step: "03", title: "Integration", desc: "We connect your calendar, CRM, and notification channels via webhook." },
                { step: "04", title: "Test & launch", desc: "We run test calls, verify handoffs, and hand over with full documentation." },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="reveal-item p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900 flex flex-col group transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-extrabold font-mono text-indigo-400 mb-4 shrink-0">
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
                <div className="atomest-badge-indigo inline-flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Capture every lead</span>
                </div>
                <h2 className="atomest-section-title text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
                  Stop letting enquiries go to voicemail.
                </h2>
                <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
                  Every missed call is a lost customer. Deploy an AI voice receptionist that works while you sleep.
                </p>
                <Link
                  href="/contact?solution=ai-voice-receptionist"
                  className="atomest-btn-primary atomest-btn-lg inline-flex items-center gap-2 shadow-lg shadow-indigo-500/25"
                >
                  <span>Request Voice Receptionist Proposal</span>
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
