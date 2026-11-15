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
  Cpu,
  Sparkles,
} from "lucide-react";

export default function CRMWorkflowAutomation() {
  return (
    <>
      <Helmet>
        <title>CRM & Workflow Automation | Atomest — Connect Your Business Apps</title>
        <meta
          name="description"
          content="Atomest CRM & Workflow Automation: connect business applications, synchronize customer data, automate repetitive processes, and manage workflow failures with retry logic."
        />
      </Helmet>

      <div className="min-h-screen bg-slate-950 flex flex-col justify-between text-slate-50">
        <Navbar />

        {/* Hero */}
        <section className="relative overflow-hidden pt-24 sm:pt-32 pb-20 border-b border-slate-800/60">
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-500/10 via-slate-500/5 to-transparent rounded-full blur-[120px] pointer-events-none"
            aria-hidden="true"
          />
          <div className="atomest-container relative z-10 text-center max-w-3xl mx-auto space-y-5 reveal-section">
            <div className="atomest-badge-indigo inline-flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              <span>Service Division — CRM & Workflow Automation</span>
            </div>
            <h1 className="atomest-section-title text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] mb-4 text-balance">
              Connect your apps. Automate your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-400">
                operations.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Workflow automation that synchronizes customer information across your tools, triggers notifications and actions, moves data between systems, and generates operational reports — with failure handling and retries built in.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4 reveal-item">
              <Link
                href="/contact?solution=crm-workflow-automation"
                className="atomest-btn-primary inline-flex items-center gap-2 text-sm px-6 py-3"
              >
                <span>Enquire About Workflow Automation</span>
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
                <span>What the automation handles</span>
              </div>
              <h2 className="atomest-section-title text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 text-balance">
                Eliminate manual data movement between your systems.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  title: "App Integration",
                  desc: "Connect Google Workspace, HubSpot, Airtable, Notion, Slack, and any tool with an API or webhook.",
                  icon: GitFork,
                },
                {
                  title: "Data Synchronization",
                  desc: "Customer records stay consistent across every system — no duplicate entry or outdated records.",
                  icon: Zap,
                },
                {
                  title: "Process Automation",
                  desc: "Repetitive tasks run on schedule or by trigger: invoicing, record updates, status changes, and reporting.",
                  icon: Clock,
                },
                {
                  title: "Notifications & Actions",
                  desc: "Automatic alerts fire when conditions are met — new customer, overdue task, or failed payment.",
                  icon: Mail,
                },
                {
                  title: "Failure Handling & Retries",
                  desc: "Workflows log errors, retry automatically, and escalate to a human when automation can't recover.",
                  icon: ShieldCheck,
                },
                {
                  title: "Operational Reports",
                  desc: "Visibility into workflow performance, volume, and bottlenecks so you can optimize continuously.",
                  icon: Users,
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
                Connected systems, delivered reliably.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { step: "01", title: "System audit", desc: "We inventory your apps, data flows, and manual processes." },
                { step: "02", title: "Mapping design", desc: "We design field mappings, triggers, and sync frequency." },
                { step: "03", title: "Build & test", desc: "We build the workflows and test with real sample data." },
                { step: "04", title: "Handover & monitoring", desc: "We document failure handling and hand over to your team." },
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
                  <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Automate operations</span>
                </div>
                <h2 className="atomest-section-title text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
                  Stop moving data by hand.
                </h2>
                <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
                  Your business apps should work together, not against each other. Let us build the connections.
                </p>
                <Link
                  href="/contact?solution=crm-workflow-automation"
                  className="atomest-btn-primary atomest-btn-lg inline-flex items-center gap-2 shadow-lg shadow-indigo-500/25"
                >
                  <span>Request Workflow Automation Proposal</span>
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
