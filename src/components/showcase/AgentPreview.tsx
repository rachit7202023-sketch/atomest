import { useState } from "react";
import { Bot, User, Sparkles, Send, CheckCircle2, ShieldAlert, Cpu, ArrowRight, CornerDownLeft, RefreshCw } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "agent";
  timestamp: string;
  content: string;
  structuredData?: {
    title: string;
    metrics: { label: string; value: string; trend?: string }[];
    actions: string[];
  };
}

const PRESET_CONVERSATION: Message[] = [
  {
    id: "m1",
    sender: "user",
    timestamp: "10:42 AM",
    content: "Can you analyze our customer onboarding funnel? We are seeing drop-offs between signup and workspace activation.",
  },
  {
    id: "m2",
    sender: "agent",
    timestamp: "10:42 AM",
    content: "I've ingested your last 30 days of onboarding events across 1,840 signups. The primary bottleneck is Step 3 (API Key Configuration and Team Invite).",
    structuredData: {
      title: "Funnel Diagnosis & Root-Cause Analysis",
      metrics: [
        { label: "Step 1: Account Creation", value: "98.2%", trend: "Optimal" },
        { label: "Step 2: Profile Setup", value: "89.4%", trend: "Normal" },
        { label: "Step 3: API Key & Connect", value: "41.6%", trend: "Critical Drop-off (-47.8%)" },
        { label: "Step 4: Active Usage", value: "32.1%", trend: "Downstream Loss" },
      ],
      actions: [
        "Enable pre-configured sandbox keys so users test features immediately.",
        "Trigger an automated concierge walkthrough if inactive for > 15 minutes.",
        "Defer SSO enforcement until after initial workspace creation.",
      ],
    },
  },
];

const PROMPTS = [
  "How do you handle internal data privacy and SOC2 compliance?",
  "Can you schedule a technical architecture review with the engineering team?",
  "What is the estimated delivery timeline for a custom support agent?",
];

export function AgentPreview() {
  const [messages, setMessages] = useState<Message[]>(PRESET_CONVERSATION);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendPrompt = (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      timestamp: "Just now",
      content: text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      let agentReply: Message;

      if (text.toLowerCase().includes("privacy") || text.toLowerCase().includes("soc2")) {
        agentReply = {
          id: (Date.now() + 1).toString(),
          sender: "agent",
          timestamp: "Just now",
          content: "Atomest agents operate under strict zero-retention parameters with isolated tenant VPC boundaries. Your proprietary business data is never used to train public foundational models.",
          structuredData: {
            title: "Security & Governance Guardrails",
            metrics: [
              { label: "Model Training Policy", value: "Zero Data Retention", trend: "Guaranteed" },
              { label: "Encryption", value: "AES-256 + TLS 1.3", trend: "Enforced" },
              { label: "Role-Based Access", value: "Granular RBAC", trend: "Active" },
            ],
            actions: [
              "Deploy self-hosted or dedicated AWS/GCP VPC infrastructure",
              "Execute custom Data Processing Agreement (DPA)",
            ],
          },
        };
      } else if (text.toLowerCase().includes("schedule") || text.toLowerCase().includes("architecture")) {
        agentReply = {
          id: (Date.now() + 1).toString(),
          sender: "agent",
          timestamp: "Just now",
          content: "I have prepared an architecture discovery slot with our Lead Solutions Architect. We can review your system topology, data flow, and required APIs.",
          structuredData: {
            title: "Architecture Discovery Slot",
            metrics: [
              { label: "Session Duration", value: "30 Minutes", trend: "Technical" },
              { label: "Key Deliverable", value: "Blueprint & Feasibility Scope", trend: "Complimentary" },
            ],
            actions: [
              "Confirm Tuesday 10:00 AM EST",
              "Confirm Wednesday 2:30 PM EST",
            ],
          },
        };
      } else {
        agentReply = {
          id: (Date.now() + 1).toString(),
          sender: "agent",
          timestamp: "Just now",
          content: "Production deployment for scoped AI agents typically spans 2 to 4 weeks, including data connector integration, safety evaluation, human-in-the-loop fallback testing, and team training.",
          structuredData: {
            title: "Typical Implementation Roadmap",
            metrics: [
              { label: "Phase 1: Blueprint", value: "Week 1", trend: "Discovery & Data Mapping" },
              { label: "Phase 2: Build & Eval", value: "Weeks 2-3", trend: "Testing & Guardrails" },
              { label: "Phase 3: Rollout", value: "Week 4", trend: "Production & Monitoring" },
            ],
            actions: [
              "Review sample statement of work",
              "Request custom scoping consultation",
            ],
          },
        };
      }

      setMessages((prev) => [...prev, agentReply]);
      setIsTyping(false);
    }, 800);
  };

  const handleReset = () => {
    setMessages(PRESET_CONVERSATION);
    setIsTyping(false);
  };

  return (
    <div className="w-full flex flex-col rounded-2xl bg-[#10121A] border border-[#252938] overflow-hidden shadow-2xl">
      {/* Agent Chat Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#08090D] border-b border-[#252938]">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#8B5CF6] to-[#3B82F6] flex items-center justify-center text-white shadow-md shadow-[#8B5CF6]/30">
              <Bot className="w-5 h-5" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#08090D]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-sm text-[#F5F6FA]">
                Atomest Operations Intelligence Agent
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Grounding: Enterprise VPC
              </span>
            </div>
            <p className="text-[11px] text-[#A0A5B5]">
              Real-time multi-agent orchestrator with deterministic tools
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs text-[#A0A5B5] hover:text-[#F5F6FA] hover:bg-[#151824] border border-[#252938] transition-colors"
          title="Reset conversation"
        >
          <RefreshCw className="w-3 h-3" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Message History View */}
      <div className="p-4 sm:p-6 bg-[#0B0D14] flex flex-col space-y-4 max-h-[460px] min-h-[380px] overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-[88%] ${
              msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-1 ${
                msg.sender === "user"
                  ? "bg-[#252938] text-[#F5F6FA]"
                  : "bg-[#8B5CF6]/20 text-[#C4B5FD] border border-[#8B5CF6]/30"
              }`}
            >
              {msg.sender === "user" ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            </div>

            {/* Bubble */}
            <div className="space-y-2">
              <div
                className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-[#8B5CF6] text-white rounded-tr-none shadow-md"
                    : "bg-[#151824] text-[#F5F6FA] border border-[#252938] rounded-tl-none"
                }`}
              >
                {msg.content}
              </div>

              {/* Structured Card for Agent Response */}
              {msg.structuredData && (
                <div className="p-4 rounded-xl bg-[#10121A] border border-[#252938] space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#252938]">
                    <span className="text-xs font-display font-semibold text-[#F5F6FA]">
                      {msg.structuredData.title}
                    </span>
                    <span className="text-[10px] font-mono text-[#8B5CF6]">Live Telemetry</span>
                  </div>

                  {/* Metrics grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {msg.structuredData.metrics.map((m, i) => (
                      <div key={i} className="p-2 rounded-lg bg-[#08090D] border border-[#1C1F2B]">
                        <div className="text-[10px] text-[#A0A5B5] truncate">{m.label}</div>
                        <div className="text-xs font-bold text-[#F5F6FA] font-display mt-0.5">{m.value}</div>
                        {m.trend && (
                          <div className="text-[10px] text-[#8B5CF6] font-mono mt-0.5">{m.trend}</div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Recommended Actions */}
                  {msg.structuredData.actions && (
                    <div className="pt-1">
                      <div className="text-[11px] font-medium text-[#A0A5B5] mb-1.5">
                        Recommended Next Actions:
                      </div>
                      <div className="space-y-1.5">
                        {msg.structuredData.actions.map((act, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 p-1.5 rounded-md bg-[#151824] border border-[#252938] text-[11px] text-[#F5F6FA]"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{act}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 items-center text-xs text-[#A0A5B5]">
            <div className="w-7 h-7 rounded-lg bg-[#8B5CF6]/20 flex items-center justify-center text-[#C4B5FD] border border-[#8B5CF6]/30">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
            </div>
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#151824] border border-[#252938]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse delay-150" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse delay-300" />
              <span className="ml-1 text-[11px] font-mono">Synthesizing telemetry...</span>
            </div>
          </div>
        )}
      </div>

      {/* Suggested Prompt Chips */}
      <div className="px-4 py-2.5 bg-[#0D0F17] border-t border-[#252938] flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[10px] font-mono uppercase text-[#A0A5B5] shrink-0">Try asking:</span>
        {PROMPTS.map((p, i) => (
          <button
            key={i}
            onClick={() => handleSendPrompt(p)}
            disabled={isTyping}
            className="text-xs px-2.5 py-1 rounded-full bg-[#151824] border border-[#252938] text-[#A0A5B5] hover:text-[#F5F6FA] hover:border-[#8B5CF6]/50 whitespace-nowrap transition-colors shrink-0 disabled:opacity-50"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendPrompt(inputValue);
        }}
        className="p-3 bg-[#08090D] border-t border-[#252938] flex items-center gap-2"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask about architecture, automations, or integration guardrails..."
          disabled={isTyping}
          className="flex-1 px-3 py-2 rounded-xl bg-[#151824] border border-[#252938] text-xs text-[#F5F6FA] placeholder:text-[#646A80] focus:outline-none focus:border-[#8B5CF6] transition-colors"
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isTyping}
          className="p-2 rounded-xl bg-[#8B5CF6] text-white hover:bg-[#7C3AED] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* Concept Demonstration Disclaimer Footer */}
      <div className="px-4 py-2 bg-[#08090D] border-t border-[#1C1F2B] flex items-center justify-between text-[11px] text-[#A0A5B5]">
        <span>Simulated multi-agent business assistant with structured tool output.</span>
        <span className="font-mono text-[#8B5CF6]">Concept demonstration</span>
      </div>
    </div>
  );
}

