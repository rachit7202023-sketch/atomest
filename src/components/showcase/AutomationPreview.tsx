import { useState, useEffect } from "react";
import { ArrowRight, Play, RotateCcw, CheckCircle2, Clock, Zap, Database, Mail, MessageSquare, Bot, AlertCircle } from "lucide-react";

interface Step {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: typeof Zap;
  status: "idle" | "running" | "completed";
  duration?: string;
  meta?: Record<string, string>;
}

export function AutomationPreview() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(3); // Default completed for preview
  const [activeTab, setActiveTab] = useState<"visual" | "logs">("visual");

  const steps: Step[] = [
    {
      id: "capture",
      name: "Inbound Lead Ingestion",
      category: "Trigger",
      description: "High-intent consultation form submission ingested via secure webhook.",
      icon: Zap,
      status: currentStepIndex > 0 ? "completed" : currentStepIndex === 0 ? "running" : "idle",
      duration: "42ms",
      meta: {
        lead: "Elena Vance (VP Digital)",
        company: "Aetheris Health",
        channel: "Direct Consultation",
      },
    },
    {
      id: "qualify",
      name: "AI Enrichment & Qualification",
      category: "Agent Logic",
      description: "AI agent validates company domain, extracts ICP fit score, and categorizes technical requirements.",
      icon: Bot,
      status: currentStepIndex > 1 ? "completed" : currentStepIndex === 1 ? "running" : "idle",
      duration: "185ms",
      meta: {
        icpScore: "96 / 100 (Tier 1 Priority)",
        intent: "High - Q3 Timeline",
        budgetBand: "$15,000 - $35,000",
      },
    },
    {
      id: "crm",
      name: "CRM & Database Sync",
      category: "Data Store",
      description: "Creates deal record, deduplicates company profile, and links contextual requirements.",
      icon: Database,
      status: currentStepIndex > 2 ? "completed" : currentStepIndex === 2 ? "running" : "idle",
      duration: "74ms",
      meta: {
        dealId: "DEAL-84920",
        destination: "HubSpot Enterprise + Supabase",
        status: "Qualified - Discovery Scheduled",
      },
    },
    {
      id: "dispatch",
      name: "Autonomous Follow-Up & Alert",
      category: "Dispatch",
      description: "Dispatches personalized discovery briefing and notifies senior architect via Slack.",
      icon: Mail,
      status: currentStepIndex >= 3 ? "completed" : "idle",
      duration: "68ms",
      meta: {
        email: "Sent personalized calendar link",
        internalAlert: "#sales-eng Slack pinged",
        slaCompliance: "< 60 seconds",
      },
    },
  ];

  const handleSimulate = () => {
    setIsRunning(true);
    setCurrentStepIndex(0);

    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev >= 3) {
          clearInterval(stepInterval);
          setIsRunning(false);
          return 3;
        }
        return prev + 1;
      });
    }, 700);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentStepIndex(3);
  };

  return (
    <div className="w-full flex flex-col rounded-2xl bg-[#10121A] border border-[#252938] overflow-hidden shadow-2xl">
      {/* Workflow Header */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-[#08090D] border-b border-[#252938] gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-display font-semibold text-sm text-[#F5F6FA]">
              Pipeline: Enterprise Inbound Qualification
            </span>
          </div>
          <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#8B5CF6]/10 text-[#C4B5FD] border border-[#8B5CF6]/20">
            Active v2.4
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg bg-[#151824] p-0.5 border border-[#252938]">
            <button
              onClick={() => setActiveTab("visual")}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                activeTab === "visual"
                  ? "bg-[#252938] text-[#F5F6FA]"
                  : "text-[#A0A5B5] hover:text-[#F5F6FA]"
              }`}
            >
              Pipeline Visualizer
            </button>
            <button
              onClick={() => setActiveTab("logs")}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                activeTab === "logs"
                  ? "bg-[#252938] text-[#F5F6FA]"
                  : "text-[#A0A5B5] hover:text-[#F5F6FA]"
              }`}
            >
              Payload & Telemetry
            </button>
          </div>

          <button
            onClick={handleSimulate}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#8B5CF6] text-white hover:bg-[#7C3AED] transition-colors disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isRunning ? "Executing..." : "Trigger Event"}</span>
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg text-xs text-[#A0A5B5] hover:text-[#F5F6FA] hover:bg-[#151824] border border-transparent hover:border-[#252938] transition-colors"
            title="Reset Preview"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Workflow View */}
      <div className="p-4 sm:p-6 bg-[#0B0D14]">
        {activeTab === "visual" ? (
          <div className="space-y-4">
            {/* Pipeline Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-[#10121A] border border-[#252938]">
                <div className="text-[11px] text-[#A0A5B5] uppercase font-mono">End-to-End Latency</div>
                <div className="text-base font-bold text-[#F5F6FA] font-display mt-0.5">369 ms</div>
              </div>
              <div className="p-3 rounded-xl bg-[#10121A] border border-[#252938]">
                <div className="text-[11px] text-[#A0A5B5] uppercase font-mono">Confidence Threshold</div>
                <div className="text-base font-bold text-emerald-400 font-display mt-0.5">96.4%</div>
              </div>
              <div className="p-3 rounded-xl bg-[#10121A] border border-[#252938]">
                <div className="text-[11px] text-[#A0A5B5] uppercase font-mono">Manual Labor Saved</div>
                <div className="text-base font-bold text-[#3B82F6] font-display mt-0.5">18 min / lead</div>
              </div>
              <div className="p-3 rounded-xl bg-[#10121A] border border-[#252938]">
                <div className="text-[11px] text-[#A0A5B5] uppercase font-mono">Execution Status</div>
                <div className="text-base font-bold text-[#C4B5FD] font-display mt-0.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>200 OK</span>
                </div>
              </div>
            </div>

            {/* Workflow Step Nodes */}
            <div className="relative pt-2">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative z-10">
                {steps.map((step, idx) => {
                  const Icon = step.icon;
                  const isCurrent = currentStepIndex === idx;
                  const isDone = currentStepIndex > idx || (!isRunning && currentStepIndex === 3);

                  return (
                    <div
                      key={step.id}
                      className={`relative flex flex-col p-4 rounded-xl border transition-all duration-300 ${
                        isCurrent
                          ? "bg-[#151824] border-[#8B5CF6] ring-1 ring-[#8B5CF6]/50 shadow-[0_0_20px_rgba(139,92,246,0.2)]"
                          : isDone
                          ? "bg-[#10121A] border-[#252938] hover:border-[#383D52]"
                          : "bg-[#08090D] border-[#1C1F2B] opacity-60"
                      }`}
                    >
                      {/* Step Indicator */}
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            isCurrent
                              ? "bg-[#8B5CF6] text-white shadow-md shadow-[#8B5CF6]/40"
                              : isDone
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : "bg-[#151824] text-[#A0A5B5]"
                          }`}
                        >
                          {isDone ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                        </div>
                        <span className="text-[10px] font-mono text-[#A0A5B5] px-1.5 py-0.5 rounded bg-[#151824] border border-[#252938]">
                          {step.duration}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="text-[11px] font-mono font-semibold text-[#8B5CF6] uppercase tracking-wider mb-1">
                        Step 0{idx + 1} • {step.category}
                      </div>
                      <h4 className="font-display font-bold text-sm text-[#F5F6FA] mb-1.5 leading-snug">
                        {step.name}
                      </h4>
                      <p className="text-xs text-[#A0A5B5] leading-relaxed mb-3 flex-1">
                        {step.description}
                      </p>

                      {/* Metadata tag box */}
                      {step.meta && (
                        <div className="mt-auto p-2 rounded-lg bg-[#08090D] border border-[#1C1F2B] space-y-1 text-[11px] font-mono">
                          {Object.entries(step.meta).map(([key, val]) => (
                            <div key={key} className="flex justify-between items-center text-[#A0A5B5]">
                              <span className="capitalize">{key}:</span>
                              <span className="text-[#F5F6FA] font-medium truncate max-w-[120px]">{val}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* Logs & Telemetry Tab */
          <div className="rounded-xl bg-[#08090D] border border-[#252938] p-4 font-mono text-xs text-[#A0A5B5] space-y-2 overflow-x-auto">
            <div className="flex items-center gap-2 pb-2 border-b border-[#252938] text-[#F5F6FA]">
              <Clock className="w-4 h-4 text-[#8B5CF6]" />
              <span>Real-time Execution Telemetry</span>
            </div>
            <div className="text-emerald-400">
              [2026-11-07T14:30:12.042Z] [INGEST] Inbound webhook verified: payload SHA256 matches.
            </div>
            <div className="text-[#C4B5FD]">
              [2026-11-07T14:30:12.185Z] [AI_ENGINE] Semantic classifier invoked: Model: Gemini-2.5-Flash
            </div>
            <div className="text-[#A0A5B5] pl-4">
              ↳ Company: Aetheris Health | Domain: aetherishealth.com | Founded: 2021 | Headcount: 42
            </div>
            <div className="text-[#A0A5B5] pl-4">
              ↳ Intent score: 0.964 | Urgency: High | Solution interest: [Websites, Automation]
            </div>
            <div className="text-blue-400">
              [2026-11-07T14:30:12.259Z] [CRM_SYNC] Supabase record inserted: id_a71f02 | HubSpot deal DE-84920 opened
            </div>
            <div className="text-emerald-400">
              [2026-11-07T14:30:12.327Z] [DISPATCH] Resend transactional template sent to elena@aetherishealth.com
            </div>
            <div className="text-emerald-400">
              [2026-11-07T14:30:12.369Z] [DISPATCH] Slack webhook 200 OK -&gt; #inbound-alerts: Lead Qualified
            </div>
            <div className="text-emerald-400 font-bold pt-2">
              Pipeline completed successfully in 369ms. Zero manual friction.
            </div>
          </div>
        )}
      </div>

      {/* Footer Note */}
      <div className="px-4 py-2.5 bg-[#08090D] border-t border-[#252938] flex flex-wrap items-center justify-between text-xs text-[#A0A5B5]">
        <div className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-[#8B5CF6]" />
          <span>Automated logic handles validation, deduping, CRM writes, and team notifications without human delay.</span>
        </div>
        <span className="text-[11px] font-mono text-[#A0A5B5]">Concept demonstration</span>
      </div>
    </div>
  );
}

