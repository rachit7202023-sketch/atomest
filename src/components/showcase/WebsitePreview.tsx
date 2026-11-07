import { useState } from "react";
import { Globe, ArrowRight, CheckCircle2, ShieldCheck, Zap, Sparkles, Laptop, Smartphone, ExternalLink, BarChart3 } from "lucide-react";

export function WebsitePreview() {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [activeTab, setActiveTab] = useState<"preview" | "specs">("preview");

  return (
    <div className="w-full flex flex-col rounded-2xl bg-[#10121A] border border-[#252938] overflow-hidden shadow-2xl">
      {/* Browser Chrome Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#08090D] border-b border-[#252938]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500/50" />
            <span className="w-3 h-3 rounded-full bg-amber-500/30 border border-amber-500/50" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/30 border border-emerald-500/50" />
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-md bg-[#151824] border border-[#252938] text-xs text-[#A0A5B5] font-mono ml-4">
            <Globe className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span>https://client-platform.atomest.dev</span>
          </div>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setDevice("desktop")}
            className={`p-1.5 rounded-lg text-xs transition-colors ${
              device === "desktop"
                ? "bg-[#151824] text-[#F5F6FA] border border-[#252938]"
                : "text-[#A0A5B5] hover:text-[#F5F6FA]"
            }`}
            title="Desktop View"
          >
            <Laptop className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDevice("mobile")}
            className={`p-1.5 rounded-lg text-xs transition-colors ${
              device === "mobile"
                ? "bg-[#151824] text-[#F5F6FA] border border-[#252938]"
                : "text-[#A0A5B5] hover:text-[#F5F6FA]"
            }`}
            title="Mobile View"
          >
            <Smartphone className="w-4 h-4" />
          </button>
          <div className="h-4 w-px bg-[#252938] mx-1" />
          <button
            onClick={() => setActiveTab(activeTab === "preview" ? "specs" : "preview")}
            className="px-2.5 py-1 text-xs font-medium rounded-lg bg-[#8B5CF6]/10 text-[#C4B5FD] border border-[#8B5CF6]/30 hover:bg-[#8B5CF6]/20 transition-colors"
          >
            {activeTab === "preview" ? "View Architecture" : "View Live Interface"}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 sm:p-6 bg-[#0B0D14] flex justify-center items-center min-h-[460px]">
        {activeTab === "preview" ? (
          <div
            className={`transition-all duration-500 bg-[#08090D] border border-[#252938] rounded-xl overflow-hidden shadow-xl ${
              device === "desktop" ? "w-full max-w-4xl" : "w-[340px]"
            }`}
          >
            {/* Simulated Website Navigation */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#252938] bg-[#10121A]/70 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-[#8B5CF6] to-[#3B82F6] flex items-center justify-center font-bold text-white text-[10px]">
                  V
                </div>
                <span className="font-display font-bold text-sm text-[#F5F6FA]">Veloce Cloud</span>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-xs text-[#A0A5B5]">
                <span className="text-[#F5F6FA] font-medium">Platform</span>
                <span>Solutions</span>
                <span>Security</span>
                <span>Docs</span>
              </div>
              <button className="px-3 py-1 rounded-md text-xs font-medium bg-[#8B5CF6] text-white hover:bg-[#7C3AED] transition-colors">
                Book Demo
              </button>
            </div>

            {/* Simulated Hero Section */}
            <div className="p-6 sm:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B5CF6]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-[#C4B5FD] text-[11px] font-semibold mb-3">
                  <Sparkles className="w-3 h-3 text-[#8B5CF6]" />
                  <span>Sub-second Global Compute</span>
                </div>
                <h3 className="font-display text-xl sm:text-3xl font-extrabold text-[#F5F6FA] leading-tight mb-3">
                  Autonomous infrastructure for modern engineering teams.
                </h3>
                <p className="text-xs sm:text-sm text-[#A0A5B5] leading-relaxed mb-6">
                  Deploy edge workers with integrated vector search, automatic fallback routing, and zero maintenance overhead.
                </p>

                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 rounded-lg bg-[#8B5CF6] text-white font-medium text-xs flex items-center gap-1.5 shadow-md shadow-[#8B5CF6]/20">
                    Deploy Now <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-[#151824] text-[#F5F6FA] border border-[#252938] font-medium text-xs">
                    Read Whitepaper
                  </div>
                </div>
              </div>

              {/* Simulated Metrics Card */}
              <div className="mt-8 grid grid-cols-3 gap-3 border-t border-[#252938] pt-6">
                <div className="p-3 rounded-lg bg-[#10121A] border border-[#252938]">
                  <p className="text-[10px] text-[#A0A5B5] uppercase font-mono">P99 Latency</p>
                  <p className="text-base sm:text-xl font-bold font-display text-[#F5F6FA]">14ms</p>
                  <span className="text-[10px] text-emerald-400 font-medium">99.99% SLA</span>
                </div>
                <div className="p-3 rounded-lg bg-[#10121A] border border-[#252938]">
                  <p className="text-[10px] text-[#A0A5B5] uppercase font-mono">Conversion</p>
                  <p className="text-base sm:text-xl font-bold font-display text-[#F5F6FA]">+42%</p>
                  <span className="text-[10px] text-[#8B5CF6] font-medium">Over Baseline</span>
                </div>
                <div className="p-3 rounded-lg bg-[#10121A] border border-[#252938]">
                  <p className="text-[10px] text-[#A0A5B5] uppercase font-mono">Core Vitals</p>
                  <p className="text-base sm:text-xl font-bold font-display text-emerald-400">100/100</p>
                  <span className="text-[10px] text-[#A0A5B5] font-medium">PageSpeed</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Technical Specifications View */
          <div className="w-full max-w-3xl bg-[#10121A] border border-[#252938] rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-[#252938] pb-4">
              <div>
                <h4 className="font-display text-base font-bold text-[#F5F6FA]">Architectural Profile: AI Website Solution</h4>
                <p className="text-xs text-[#A0A5B5] mt-0.5">Engineered for sub-second load times and high commercial conversion.</p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                Lighthouse: 99
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-[#151824] border border-[#252938] space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#8B5CF6]">
                  <Zap className="w-4 h-4" />
                  <span>Frontend Engineering</span>
                </div>
                <ul className="text-xs text-[#A0A5B5] space-y-1.5 list-disc list-inside">
                  <li>React 19 / Modern SSR & SSG Hybrid</li>
                  <li>Tailwind CSS v4 with bespoke token system</li>
                  <li>Fully accessible ARIA compliant primitives</li>
                  <li>Responsive layout tested from 320px to 4K</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-[#151824] border border-[#252938] space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#3B82F6]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Performance & SEO</span>
                </div>
                <ul className="text-xs text-[#A0A5B5] space-y-1.5 list-disc list-inside">
                  <li>Automatic OpenGraph & JSON-LD schema generation</li>
                  <li>Zero layout shift (`CLS &lt; 0.01`)</li>
                  <li>Edge-cached asset pipeline via global CDN</li>
                  <li>Dynamic sitemap and robots protocol sync</li>
                </ul>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#08090D] border border-[#252938] text-[11px] text-[#A0A5B5] flex items-center justify-between">
              <span>Delivery Timeframe: <strong>1 to 3 weeks</strong> depending on scope</span>
              <span className="font-mono text-[#8B5CF6]">Standard: Production-Hardened</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info Pill */}
      <div className="px-4 py-2.5 bg-[#08090D] border-t border-[#252938] flex items-center justify-between text-xs text-[#A0A5B5]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Illustrative capability demonstration · Built to client specifications</span>
        </div>
        <span className="font-mono text-[11px] text-[#8B5CF6]">Atomest AI Website Architecture</span>
      </div>
    </div>
  );
}

