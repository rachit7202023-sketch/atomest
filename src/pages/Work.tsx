import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, ShieldCheck, Globe, GitFork, Bot, Info } from "lucide-react";

export default function Work() {
  const caseStudies = [
    {
      title: "HVAC Service Business — Website & Lead Automation",
      category: "Web Development + Automation",
      badge: "Concept Demonstration",
      icon: Globe,
      color: "text-[#3B82F6]",
      border: "border-[#3B82F6]/30",
      description:
        "An example solution showing how a local service business could convert website visitors into service bookings with automated lead notifications. A responsive site with integrated contact forms, instant Slack alerts, and Google Sheets logging would ensure no enquiry is missed.",
      results: ["Responsive booking-focused website", "Instant lead notifications", "Google Sheets CRM logging"],
      stack: ["React", "Tailwind", "Vite SSR", "Supabase", "n8n"],
      linkText: "Explore the Solution",
    },
    {
      title: "Dental Clinic — AI Voice Receptionist",
      category: "AI Voice Receptionist",
      badge: "Concept Demonstration",
      icon: Bot,
      color: "text-emerald-400",
      border: "border-emerald-500/30",
      description:
        "An example concept for a dental practice handling after-hours calls without losing new patient enquiries. An AI voice receptionist would answer calls 24/7, qualify patients, book appointments into a calendar, and send summaries to the office manager.",
      results: ["24/7 call coverage concept", "Automated appointment booking flow", "Call summaries to staff"],
      stack: ["AI Voice AI", "Calendar Webhook", "Slack Notifications"],
      linkText: "Explore the Solution",
    },
    {
      title: "Accounting Firm — CRM & Workflow Automation",
      category: "CRM & Workflow Automation",
      badge: "Concept Demonstration",
      icon: GitFork,
      color: "text-[#8B5CF6]",
      border: "border-[#8B5CF6]/30",
      description:
        "An example concept for synchronizing client data between a website, email, and practice management software. Automated workflows would move client information between systems, trigger onboarding tasks, and flag overdue items.",
      results: ["Client data synchronization concept", "Automated client onboarding flow", "Overdue task alerts"],
      stack: ["n8n", "Google Workspace", "HubSpot", "Webhooks"],
      linkText: "Explore the Solution",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Work & Case Studies | Atomest — Client Success Stories</title>
        <meta
          name="description"
          content="Explore Atomest client work across AI Voice Receptionist, Lead Automation, CRM & Workflow Automation, AI Customer Support, and Premium Business Websites."
        />
      </Helmet>

      <div className="min-h-screen bg-[#08090D] flex flex-col justify-between text-[#F5F6FA]">
        <Navbar />

        {/* Hero */}
        <section className="relative overflow-hidden pt-24 sm:pt-32 pb-16 border-b border-[#252938]">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#8B5CF6]/15 via-[#3B82F6]/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
          <div className="atomest-container relative z-10 text-center max-w-3xl mx-auto space-y-5">
            <div className="atomest-badge-blue inline-flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span>Client Work & Case Studies</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-[#F5F6FA] leading-[1.1]">
              Example solutions.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#3B82F6]">
                Real capabilities.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-[#A0A5B5] leading-relaxed">
              Concept demonstrations showing how Atomest's five service divisions solve specific business problems. These are illustrative solutions — not verified client results. Actual project outcomes depend on each client's requirements and environment.
            </p>
          </div>
        </section>

        {/* Transparency Disclaimer */}
        <section className="atomest-section border-b border-[#252938]">
          <div className="atomest-container">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#10121A] border border-[#252938] text-center max-w-3xl mx-auto space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-[#8B5CF6] tracking-wider">
                <Info className="w-4 h-4 text-[#8B5CF6]" />
                <span>Commercial Transparency Policy</span>
              </div>
              <p className="text-xs text-[#A0A5B5] leading-relaxed">
                The examples below are concept demonstrations, not verified client projects. Atomest does not fabricate client reviews, testimonials, or performance metrics. Real project outcomes are delivered only after a signed engagement and are shared with client consent.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-12">
              {caseStudies.map((project, idx) => {
                const Icon = project.icon;
                return (
                  <div key={idx} className="p-8 rounded-3xl bg-[#10121A] border border-[#252938] hover:border-[#8B5CF6]/50 transition-all flex flex-col justify-between shadow-xl">
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
                        <h2 className="text-xl font-bold font-display text-[#F5F6FA] mt-1">{project.title}</h2>
                      </div>

                      <p className="text-xs sm:text-sm text-[#A0A5B5] leading-relaxed">{project.description}</p>

                      <div className="space-y-2 pt-4 border-t border-[#1C1F2B]">
                        <div className="text-[11px] font-mono uppercase text-[#A0A5B5] tracking-wider mb-2">
                          Key Outcomes
                        </div>
                        {project.results.map((result, rIdx) => (
                          <div key={rIdx} className="flex items-start gap-2 text-xs text-[#C4B5FD]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0 mt-0.5" />
                            <span>{result}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-[#1C1F2B]">
                        <div className="text-[11px] font-mono uppercase text-[#A0A5B5] tracking-wider mb-2">
                          Architecture Stack
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {project.stack.map((tech, tIdx) => (
                            <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#151824] text-[#A0A5B5] border border-[#252938]">
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
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
