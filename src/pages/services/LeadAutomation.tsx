import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "wouter";
import { ArrowRight, Globe, CheckCircle2, ShieldCheck, GitFork, Mail, Clock, Users, Zap } from "lucide-react";

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

      <div className="min-h-screen bg-[#08090D] flex flex-col justify-between text-[#F5F6FA]">
        <Navbar />

        {/* Hero */}
        <section className="relative overflow-hidden pt-24 sm:pt-32 pb-16 border-b border-[#252938]">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#8B5CF6]/15 via-[#3B82F6]/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
          <div className="atomest-container relative z-10 text-center max-w-3xl mx-auto space-y-5">
            <div className="atomest-badge-violet inline-flex items-center gap-2">
              <GitFork className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>Division B: Lead Automation</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-[#F5F6FA] leading-[1.1]">
              Turn every enquiry into a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#3B82F6]">
                qualified lead.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-[#A0A5B5] leading-relaxed">
              Automated lead pipelines that capture website enquiries instantly, notify your team in under 60 seconds, qualify prospects, sync to your CRM, and trigger automated follow-up — so no lead ever goes cold.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link href="/contact?solution=lead-automation" className="atomest-btn-primary inline-flex items-center gap-2 text-sm px-6 py-3">
                <span>Enquire About Lead Automation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* What it does */}
        <section className="atomest-section bg-[#0B0D14] border-b border-[#252938]">
          <div className="atomest-container">
            <div className="max-w-3xl mb-12">
              <div className="atomest-badge-blue mb-3 inline-flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span>What the pipeline handles</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#F5F6FA] mb-6">
                From website visitor to booked consultation — automatically.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  <div key={idx} className="p-6 rounded-2xl bg-[#10121A] border border-[#252938] hover:border-[#8B5CF6]/40 transition-colors flex flex-col justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#151824] border border-[#252938] flex items-center justify-center text-[#8B5CF6] mb-4 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-[#F5F6FA] mb-2">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-[#A0A5B5] leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Delivery process */}
        <section className="atomest-section border-b border-[#252938]">
          <div className="atomest-container">
            <div className="max-w-3xl mb-12 text-center">
              <div className="atomest-badge-violet mb-3 inline-flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>Deployment process</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#F5F6FA] mb-6">
                Your lead pipeline in four phases.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Intake design", desc: "We map your lead sources, qualification criteria, and routing rules." },
                { step: "02", title: "Workflow build", desc: "We configure capture, notification, CRM sync, and follow-up on your platform." },
                { step: "03", title: "Test with real data", desc: "We run sample submissions end-to-end and verify error fallbacks." },
                { step: "04", title: "Launch & handover", desc: "We go live and provide an SOP plus video walkthrough for your team." },
              ].map((step, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-[#10121A] border border-[#252938] flex flex-col">
                  <div className="w-10 h-10 rounded-full bg-[#151824] border border-[#252938] flex items-center justify-center font-extrabold font-mono text-[#8B5CF6] mb-4 shrink-0">
                    {step.step}
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#F5F6FA] mb-2">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-[#A0A5B5] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="atomest-section py-20 sm:py-28">
          <div className="atomest-container">
            <div className="p-8 sm:p-16 rounded-3xl bg-gradient-to-b from-[#151824] to-[#10121A] border border-[#252938] relative overflow-hidden text-center shadow-2xl">
              <div className="max-w-2xl mx-auto relative z-10 space-y-6">
                <div className="atomest-badge-violet inline-flex items-center gap-2">
                  <GitFork className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span>Never lose a lead</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#F5F6FA]">
                  Respond in under 60 seconds.
                </h2>
                <p className="text-base sm:text-lg text-[#A0A5B5] leading-relaxed">
                  Speed-to-lead is the difference between winning and losing a customer. Automate your lead pipeline today.
                </p>
                <Link href="/contact?solution=lead-automation" className="atomest-btn-primary inline-flex items-center gap-2 text-base px-8 py-3.5 shadow-lg shadow-[#8B5CF6]/25">
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
