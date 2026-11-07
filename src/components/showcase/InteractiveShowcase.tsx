import { useState } from "react";
import { Link } from "wouter";
import { Globe, GitFork, Bot, ArrowRight, Sparkles, Layers, Cpu } from "lucide-react";
import { WebsitePreview } from "./WebsitePreview";
import { AutomationPreview } from "./AutomationPreview";
import { AgentPreview } from "./AgentPreview";

export function InteractiveShowcase() {
  const [activeTab, setActiveTab] = useState<"websites" | "automation" | "agents">("websites");

  const tabs = [
    {
      id: "websites" as const,
      label: "AI Website Systems",
      sublabel: "High-conversion web platforms",
      icon: Globe,
      color: "from-blue-500 to-cyan-500",
      targetRoute: "/solutions/websites",
      badge: "Production Ready",
    },
    {
      id: "automation" as const,
      label: "Autonomous Pipelines",
      sublabel: "Zero-latency business workflows",
      icon: GitFork,
      color: "from-violet-500 to-purple-500",
      targetRoute: "/solutions/automation",
      badge: "Real-time Telemetry",
    },
    {
      id: "agents" as const,
      label: "Intelligent Agents",
      sublabel: "Grounded business assistants",
      icon: Bot,
      color: "from-emerald-500 to-teal-500",
      targetRoute: "/solutions/agents",
      badge: "Deterministic Tools",
    },
  ];

  const currentTabInfo = tabs.find((t) => t.id === activeTab)!;

  return (
    <section className="atomest-section relative overflow-hidden" id="showcase">
      <div className="atomest-container">
        {/* Section Heading */}
        <div className="max-w-3xl mb-10">
          <div className="atomest-badge-violet mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span>Interactive Capability Demonstrations</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#F5F6FA] mb-4">
            See our engineering in action.
          </h2>
          <p className="text-base sm:text-lg text-[#A0A5B5] leading-relaxed">
            Explore live, interactive prototypes demonstrating how Atomest engineers web interfaces, autonomous event pipelines, and grounded AI agents.
          </p>
        </div>

        {/* Tab Selection Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-start gap-4 p-4 rounded-xl text-left border transition-all duration-300 ${
                  isActive
                    ? "bg-[#151824] border-[#8B5CF6] shadow-[0_0_25px_rgba(139,92,246,0.15)] ring-1 ring-[#8B5CF6]/50"
                    : "bg-[#10121A] border-[#252938] hover:border-[#383D52] hover:bg-[#121520]"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    isActive
                      ? "bg-[#8B5CF6] text-white shadow-md shadow-[#8B5CF6]/30"
                      : "bg-[#151824] text-[#A0A5B5]"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display font-bold text-sm text-[#F5F6FA] truncate">
                      {tab.label}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        isActive
                          ? "bg-[#8B5CF6]/20 text-[#C4B5FD] border border-[#8B5CF6]/30"
                          : "bg-[#151824] text-[#A0A5B5]"
                      }`}
                    >
                      {tab.badge}
                    </span>
                  </div>
                  <p className="text-xs text-[#A0A5B5] mt-1 truncate">
                    {tab.sublabel}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Showcase Frame */}
        <div className="relative">
          {activeTab === "websites" && <WebsitePreview />}
          {activeTab === "automation" && <AutomationPreview />}
          {activeTab === "agents" && <AgentPreview />}
        </div>

        {/* Bottom Banner with Deep-link to Detailed Solution Page */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl bg-[#10121A] border border-[#252938] gap-4">
          <div className="flex items-center gap-2 text-xs text-[#A0A5B5]">
            <Layers className="w-4 h-4 text-[#8B5CF6]" />
            <span>
              All demonstrations reflect real architectural patterns we deploy for client systems.
            </span>
          </div>

          <Link
            to={currentTabInfo.targetRoute}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B5CF6] hover:text-[#A78BFA] transition-colors group"
          >
            <span>Explore full {currentTabInfo.label} specifications</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
