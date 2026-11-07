import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Bot, ArrowRight, CheckCircle2, Sparkles, Shield, Cpu, MessageSquare, Database, Users, HelpCircle, Lock } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AgentPreview } from "../../components/showcase/AgentPreview";

export default function Agents() {
  const agentTypes = [
    {
      title: "Customer Support & Concierge Agents",
      icon: MessageSquare,
      description: "Autonomous frontline support agents trained on your technical documentation, knowledge base, and ticketing policies to resolve queries 24/7.",
      capabilities: [
        "Multilingual conversational comprehension",
        "Deterministic escalation to human reps for edge cases",
        "Direct integration with Zendesk, Intercom, and Freshdesk",
      ],
    },
    {
      title: "Inbound Sales & Qualification Assistants",
      icon: Users,
      description: "Intelligent conversational agents that engage inbound website visitors, qualify budget and timeline fit, and immediately book meetings with your sales team.",
      capabilities: [
        "Dynamic qualification question branching",
        "Calendar sync & automated invite delivery",
        "Instant lead dossier generation into your CRM",
      ],
    },
    {
      title: "Appointment & Booking Assistants",
      icon: CheckCircle2,
      description: "Dedicated conversational agents that coordinate schedules, manage cancellations, follow up on reminders, and resolve scheduling conflicts automatically.",
      capabilities: [
        "Two-way Google Calendar & Outlook integration",
        "SMS and WhatsApp conversation channels",
        "Reschedule friction reduction",
      ],
    },
    {
      title: "Internal Knowledge & Operations Agents",
      icon: Database,
      description: "Private, internal business agents that allow team members to query internal SOPs, technical specs, past proposals, and operational playbooks instantly.",
      capabilities: [
        "Strict role-based access control (RBAC)",
        "Grounded citation of source documents",
        "Zero data retention on public LLM providers",
      ],
    },
    {
      title: "Bespoke Task-Specific AI Agents",
      icon: Cpu,
      description: "Custom multi-agent workflows engineered for specific vertical domains: legal document parsing, financial reconciliation, or technical audit reviews.",
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
      description: "Agents respond strictly using your verified internal documents and APIs, virtually eliminating generic hallucinations.",
      icon: Database,
    },
    {
      title: "Human-in-the-Loop Fallbacks",
      description: "If confidence drops below a defined threshold, the agent gracefully routes the dialogue to your human team with context.",
      icon: Users,
    },
    {
      title: "Private & Sovereign Data",
      description: "Your proprietary documents and communications are never used to train public models. We enforce strict data isolation.",
      icon: Lock,
    },
    {
      title: "Deterministic Tool Calling",
      description: "Agents invoke structured, pre-approved API endpoints rather than guessing outcomes, ensuring transactional reliability.",
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

      <div className="min-h-screen bg-[#08090D] flex flex-col justify-between">
        <Navbar />

        {/* Hero Section */}
        <section className="atomest-section pt-8 pb-16">
          <div className="atomest-container">
            <div className="max-w-4xl mx-auto text-center">
              <div className="atomest-badge-violet mb-4 inline-flex items-center gap-2">
                <Bot className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>Division: AI Agents</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-[#F5F6FA] mb-6 leading-tight">
                Intelligent agents. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6]">Real business utility.</span>
              </h1>

              <p className="text-lg sm:text-xl text-[#A0A5B5] max-w-2xl mx-auto leading-relaxed mb-8">
                Move beyond generic chatbots. We engineer grounded, tool-enabled AI agents that perform actual work—qualifying leads, resolving complex support cases, and querying internal knowledge bases.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/contact?solution=agents"
                  className="atomest-btn-primary inline-flex items-center gap-2"
                >
                  <span>Build a Custom AI Agent</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#agent-demo"
                  className="atomest-btn-secondary inline-flex items-center gap-2"
                >
                  <span>Test Live Agent Preview</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer / Reality Banner */}
        <section className="border-y border-[#252938] bg-[#10121A]/70 py-4">
          <div className="atomest-container">
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-[#A0A5B5] text-center">
              <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
              <span>
                Note: Agent capabilities, integrations, and grounding data are tailored to the precise requirements and security boundaries of each client project.
              </span>
            </div>
          </div>
        </section>

        {/* Live Interactive Agent Prototype */}
        <section id="agent-demo" className="atomest-section">
          <div className="atomest-container">
            <div className="max-w-3xl mb-8">
              <div className="atomest-badge-violet mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>Interactive Agent Prototype</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#F5F6FA] mb-3">
                Experience an operational assistant.
              </h2>
              <p className="text-sm sm:text-base text-[#A0A5B5]">
                Interact with our simulated operations intelligence agent. Click the suggested prompt chips or submit your own question.
              </p>
            </div>

            <AgentPreview />
          </div>
        </section>

        {/* Agent Types Grid */}
        <section className="atomest-section bg-[#0B0D14] border-y border-[#252938]">
          <div className="atomest-container">
            <div className="max-w-3xl mb-12">
              <div className="atomest-badge-blue mb-3">
                <Cpu className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span>Custom Implementations</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#F5F6FA] mb-3">
                Specialized agents for every business function.
              </h2>
              <p className="text-sm sm:text-base text-[#A0A5B5]">
                Whether facing customers or supporting internal teams, our agents are designed to execute deterministic actions within safe parameters.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agentTypes.map((agent, idx) => {
                const Icon = agent.icon;
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
                        {agent.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#A0A5B5] leading-relaxed mb-6">
                        {agent.description}
                      </p>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-[#1C1F2B]">
                      {agent.capabilities.map((cap, cIdx) => (
                        <div key={cIdx} className="flex items-center gap-2 text-xs text-[#C4B5FD]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
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
        <section className="atomest-section">
          <div className="atomest-container">
            <div className="max-w-3xl mb-12">
              <div className="atomest-badge-violet mb-3">
                <Shield className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>Security & Trust</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#F5F6FA] mb-3">
                Engineered with enterprise safety guardrails.
              </h2>
              <p className="text-sm sm:text-base text-[#A0A5B5]">
                We build with rigorous constraints to ensure autonomous systems represent your brand with accuracy, compliance, and privacy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {safetyGuardrails.map((guard, idx) => {
                const Icon = guard.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-[#10121A] border border-[#252938] flex flex-col"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#151824] border border-[#252938] flex items-center justify-center text-[#8B5CF6] mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-base text-[#F5F6FA] mb-2">
                      {guard.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#A0A5B5] leading-relaxed">
                      {guard.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="atomest-section pt-0">
          <div className="atomest-container">
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#151824] to-[#10121A] border border-[#252938] relative overflow-hidden text-center">
              <div className="max-w-2xl mx-auto relative z-10">
                <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#F5F6FA] mb-4">
                  Deploy your company's intelligent agent.
                </h2>
                <p className="text-sm sm:text-base text-[#A0A5B5] mb-8 leading-relaxed">
                  Book an engineering discovery call to map your knowledge base and determine feasibility.
                </p>
                <Link
                  to="/contact?solution=agents"
                  className="atomest-btn-primary inline-flex items-center gap-2"
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
