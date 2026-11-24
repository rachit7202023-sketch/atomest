import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Bot, ArrowRight, CheckCircle2, Sparkles, Shield, Cpu, MessageSquare, Database, Users, Lock } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Agents() {
  const agentTypes = [
    {
      title: "Customer Support & Concierge Agents",
      icon: MessageSquare,
      description:
        "Autonomous frontline support agents trained on your technical documentation, knowledge base, and ticketing policies to resolve queries 24/7.",
      capabilities: [
        "Multilingual conversational comprehension",
        "Deterministic escalation to human reps for edge cases",
        "Direct integration with Zendesk, Intercom, and Freshdesk",
      ],
    },
    {
      title: "Inbound Sales & Qualification Assistants",
      icon: Users,
      description:
        "Intelligent conversational agents that engage inbound website visitors, qualify budget and timeline fit, and immediately book meetings with your sales team.",
      capabilities: [
        "Dynamic qualification question branching",
        "Calendar sync & automated invite delivery",
        "Instant lead dossier generation into your CRM",
      ],
    },
    {
      title: "Appointment & Booking Assistants",
      icon: CheckCircle2,
      description:
        "Dedicated conversational agents that coordinate schedules, manage cancellations, follow up on reminders, and resolve scheduling conflicts automatically.",
      capabilities: [
        "Two-way Google Calendar & Outlook integration",
        "SMS and WhatsApp conversation channels",
        "Reschedule friction reduction",
      ],
    },
    {
      title: "Internal Knowledge & Operations Agents",
      icon: Database,
      description:
        "Private, internal business agents that allow team members to query internal SOPs, technical specs, past proposals, and operational playbooks instantly.",
      capabilities: [
        "Strict role-based access control (RBAC)",
        "Grounded citation of source documents",
        "Zero data retention on public LLM providers",
      ],
    },
    {
      title: "Bespoke Task-Specific AI Agents",
      icon: Cpu,
      description:
        "Custom multi-agent workflows engineered for specific vertical domains: legal document parsing, financial reconciliation, or technical audit reviews.",
      capabilities: [
        "Multi-step reasoning and tool execution",
        "Human-in-the-loop review checkpoints",
        "Custom API tool invocation and webhook dispatch",
      ],
    },
  ];

  const safetyGuardrails = [
    {
      title: "Grounded Retrieval (RAG)",
      description:
        "Agents respond strictly using your verified internal documents and APIs, virtually eliminating generic hallucinations.",
      icon: Database,
    },
    {
      title: "Human-in-the-Loop Fallbacks",
      description:
        "If confidence drops below a defined threshold, the agent gracefully routes the dialogue to your human team with context.",
      icon: Users,
    },
    {
      title: "Private & Sovereign Data",
      description:
        "Your proprietary documents and communications are never used to train public models. We enforce strict data isolation.",
      icon: Lock,
    },
    {
      title: "Deterministic Tool Calling",
      description:
        "Agents invoke structured, pre-approved API endpoints rather than guessing outcomes, ensuring transactional reliability.",
      icon: Shield,
    },
  ];

  return (
    <>
      <Helmet>
        <title>AI Agents | Atomest</title>
        <meta
          name="description"
          content="Intelligent agents. Real business utility. Custom-engineered AI business assistants, customer support agents, and internal knowledge copilots by Atomest."
        />
      </Helmet>

      <div className="min-h-screen bg-slate-950 flex flex-col justify-between text-slate-50">
        <Navbar />

        {/* Hero */}
        <section className="atomest-section pt-24 sm:pt-32 pb-20 border-b border-slate-800/60 reveal-section">
          <div className="atomest-container relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="atomest-badge-indigo inline-flex items-center gap-2">
                <Bot className="w-3.5 h-3.5 text-indigo-400" />
                <span>Solution Division — AI Agents</span>
              </div>

              <h1 className="atomest-section-title text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05] mb-4 text-balance">
                Intelligent agents.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-400">
                  Real business utility.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Move beyond generic chatbots. We engineer grounded, tool-enabled AI agents that perform actual work — qualifying leads, resolving complex support cases, and querying internal knowledge bases.
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-4 reveal-item">
                <Link
                  href="/contact?solution=ai-solutions"
                  className="atomest-btn-primary inline-flex items-center gap-2"
                >
                  <span>Build a Custom AI Agent</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Reality Disclaimer */}
        <section className="border-y border-slate-800/60 bg-slate-900/40 py-4 reveal-section">
          <div className="atomest-container">
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 text-center">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              <span>
                Agent capabilities, integrations, and grounding data are tailored to the precise requirements and security boundaries of each client project.
              </span>
            </div>
          </div>
        </section>

        {/* Agent Types Grid */}
        <section className="atomest-section border-b border-slate-800/60 reveal-section">
          <div className="atomest-container">
            <div className="max-w-3xl mb-14">
              <div className="atomest-badge-indigo mb-3 inline-flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                <span>Custom Implementations</span>
              </div>
              <h2 className="atomest-section-title text-3xl sm:text-5xl font-extrabold tracking-tight mb-3">
                Specialized agents for every business function.
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                Whether facing customers or supporting internal teams, our agents are designed to execute deterministic actions within safe parameters.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {agentTypes.map((agent, idx) => {
                const Icon = agent.icon;
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
                        {agent.title}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-6">
                        {agent.description}
                      </p>
                    </div>
                    <div className="space-y-2 pt-4 border-t border-slate-800/60">
                      {agent.capabilities.map((cap, cIdx) => (
                        <div key={cIdx} className="flex items-center gap-2 text-sm text-slate-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Safety & Guardrails Section */}
        <section className="atomest-section reveal-section">
          <div className="atomest-container">
            <div className="max-w-3xl mb-14">
              <div className="atomest-badge-indigo mb-3 inline-flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-indigo-400" />
                <span>Security & Trust</span>
              </div>
              <h2 className="atomest-section-title text-3xl sm:text-5xl font-extrabold tracking-tight mb-3">
                Engineered with enterprise safety guardrails.
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                We build with rigorous constraints to ensure autonomous systems represent your brand with accuracy, compliance, and privacy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {safetyGuardrails.map((guard, idx) => (
                <div
                  key={idx}
                  className="reveal-item p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900 flex flex-col"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400 mb-4">
                    <guard.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-base text-slate-50 mb-2">
                    {guard.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                    {guard.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="atomest-section pt-20 sm:pt-28 pb-24 reveal-section">
          <div className="atomest-container">
            <div className="p-8 sm:p-16 rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden text-center shadow-2xl reveal-item">
              <div className="max-w-2xl mx-auto relative z-10 space-y-6">
                <h2 className="atomest-section-title text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
                  Deploy your company's intelligent agent.
                </h2>
                <p className="text-base sm:text-lg text-slate-400 mb-8 leading-relaxed">
                  Book an engineering discovery call to map your knowledge base and determine feasibility.
                </p>
                <Link
                  href="/contact?solution=ai-solutions"
                  className="atomest-btn-primary atomest-btn-lg inline-flex items-center gap-2 shadow-lg shadow-indigo-500/25"
                >
                  <span>Build a Custom AI Agent</span>
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
