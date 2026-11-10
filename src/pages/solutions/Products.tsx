import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Sparkles, ArrowRight, CheckCircle2, Clock, ShieldCheck, Lock, Layers, Cpu, AlertCircle, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Products() {
  const [formData, setFormData] = useState({
    email: "",
    full_name: "",
    company_name: "",
    role: "",
    product: "flowengine",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const roadmapItems = [
    {
      id: "speed-to-lead-blueprint",
      name: "Speed-to-Lead n8n Blueprint",
      tagline: "Self-Hostable Inbound Capture & Routing Architecture",
      status: "Packaging & QA • Coming Soon",
      statusColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
      quarter: "Next Release",
      description: "Our complete battle-tested n8n workflow for sub-60-second inbound lead routing, deterministic spam filtering, Google Sheets sync, Telegram alerts, and automated prospect acknowledgment. Currently undergoing packaging and multi-platform QA.",
      features: [
        "Plug-and-play n8n JSON workflow export with zero paid API dependencies",
        "Deterministic validation, 24-hour deduplication & bot honeypot",
        "Multi-channel dispatcher (Telegram, Slack, Email) with 10-point test suite",
      ],
    },
    {
      id: "flowengine",
      name: "Atomest FlowEngine",
      tagline: "Autonomous Event Orchestration Engine",
      status: "In Active R&D",
      statusColor: "text-amber-400 bg-amber-400/10 border-amber-400/20",
      quarter: "Q3 2026",
      description: "A lightweight, zero-overhead workflow orchestrator designed specifically for AI-native pipelines. Handles idempotent event ingestion, vector embedding dispatch, and automatic dead-letter retries.",
      features: [
        "Deterministic retry queues and exponential backoff",
        "Sub-10ms routing latency for webhook triggers",
        "Visual DAG execution telemetry and audit logging",
      ],
    },
    {
      id: "grounding-studio",
      name: "Atomest Grounding Studio",
      tagline: "Sovereign Knowledge & RAG Governance Layer",
      status: "Architecture Phase",
      statusColor: "text-[#C4B5FD] bg-[#8B5CF6]/10 border-[#8B5CF6]/20",
      quarter: "Q4 2026",
      description: "Enterprise document parsing, semantic chunking, and grounded citation verification for organizations with strict compliance, SOC2, and data isolation requirements.",
      features: [
        "Zero-retention VPC deployment options",
        "Multi-modal document parsing (PDFs, sheets, schemas)",
        "Grounded citation verification and hallucination scoring",
      ],
    },
    {
      id: "leadpulse",
      name: "Atomest LeadPulse",
      tagline: "Predictive Intent Scoring for High-Value Inbound",
      status: "Research Phase",
      statusColor: "text-blue-400 bg-blue-400/10 border-blue-400/20",
      quarter: "Early 2027",
      description: "Analyzes incoming consultation inquiries in real time, scores firmographic and behavioral intent against historical closes, and generates tailored meeting briefs for sales leaders.",
      features: [
        "Real-time firmographic enrichment and revenue telemetry",
        "Personalized pre-discovery briefing dossier generator",
        "Automated calendar priority slot recommendation",
      ],
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to join waitlist. Please try again.");
      }

      setStatus("success");
    } catch (err: any) {
      console.error("Waitlist submission error:", err);
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      <Helmet>
        <title>AI Products & Roadmap | Atomest</title>
        <meta
          name="description"
          content="We're building what comes next. Explore Atomest's proprietary AI product roadmap and join the early-access waitlist for upcoming releases."
        />
      </Helmet>

      <div className="min-h-screen bg-[#08090D] flex flex-col justify-between">
        <Navbar />

        {/* Hero Section */}
        <section className="atomest-section pt-8 pb-16">
          <div className="atomest-container">
            <div className="max-w-4xl mx-auto text-center">
              <div className="atomest-badge-violet mb-4 inline-flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>Division: AI Products</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-[#F5F6FA] mb-6 leading-tight">
                We're building what <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6]">comes next.</span>
              </h1>

              <p className="text-lg sm:text-xl text-[#A0A5B5] max-w-2xl mx-auto leading-relaxed mb-8">
                As we design and deliver bespoke AI systems for clients, we identify recurring architectural bottlenecks and translate proven patterns into proprietary, developer-grade software products.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#waitlist"
                  className="atomest-btn-primary inline-flex items-center gap-2"
                >
                  <span>Request Early Access</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#roadmap"
                  className="atomest-btn-secondary inline-flex items-center gap-2"
                >
                  <span>View Product Roadmap</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Product Roadmap Section */}
        <section id="roadmap" className="atomest-section bg-[#0B0D14] border-y border-[#252938]">
          <div className="atomest-container">
            <div className="max-w-3xl mb-12">
              <div className="atomest-badge-blue mb-3">
                <Layers className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span>Development Pipeline</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#F5F6FA] mb-3">
                Proprietary AI Product Roadmap
              </h2>
              <p className="text-sm sm:text-base text-[#A0A5B5]">
                Transparent view of our internal R&D. These products are currently in active development and slated for private alpha testing with select partners.
              </p>
            </div>

            <div className="space-y-6">
              {roadmapItems.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-6 sm:p-8 rounded-2xl bg-[#10121A] border border-[#252938] hover:border-[#8B5CF6]/40 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  <div className="max-w-2xl">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F5F6FA]">
                        {item.name}
                      </h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono border ${item.statusColor}`}>
                        {item.status}
                      </span>
                      <span className="text-xs font-mono text-[#A0A5B5] px-2 py-0.5 rounded bg-[#151824] border border-[#252938]">
                        Target: {item.quarter}
                      </span>
                    </div>

                    <div className="text-sm font-medium text-[#8B5CF6] mb-3">
                      {item.tagline}
                    </div>

                    <p className="text-xs sm:text-sm text-[#A0A5B5] leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <div className="space-y-1.5">
                      {item.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-[#C4B5FD]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:border-l lg:border-[#252938] lg:pl-8 flex flex-col justify-center shrink-0">
                    <button
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, product: item.id }));
                        document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="atomest-btn-secondary inline-flex items-center justify-center gap-2 text-xs"
                    >
                      <span>Join {item.name} Alpha</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Early Access / Waitlist Form Section */}
        <section id="waitlist" className="atomest-section">
          <div className="atomest-container">
            <div className="max-w-2xl mx-auto p-8 sm:p-10 rounded-3xl bg-[#10121A] border border-[#252938] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B5CF6]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="atomest-badge-violet mb-3">
                  <Clock className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span>Early Access</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#F5F6FA] mb-2">
                  Request early alpha access.
                </h2>
                <p className="text-xs sm:text-sm text-[#A0A5B5] mb-6 leading-relaxed">
                  Join forward-thinking engineering and product teams testing our proprietary AI tools. You'll receive prioritized access and direct communication with our founders.
                </p>

                {status === "success" ? (
                  <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-[#F5F6FA]">
                      You're on the early access list!
                    </h3>
                    <p className="text-xs text-[#A0A5B5] max-w-md mx-auto">
                      Thank you for your interest. As soon as private alpha slots open for{" "}
                      <span className="text-[#F5F6FA] font-semibold">{formData.product}</span>, we will contact you at{" "}
                      <span className="text-[#F5F6FA] font-semibold">{formData.email}</span>.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="text-xs text-[#8B5CF6] hover:underline pt-2 inline-block"
                    >
                      Register another team member
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {status === "error" && (
                      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-mono uppercase text-[#A0A5B5] mb-1.5">
                        Product of Interest *
                      </label>
                      <select
                        value={formData.product}
                        onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#151824] border border-[#252938] text-xs sm:text-sm text-[#F5F6FA] focus:outline-none focus:border-[#8B5CF6] transition-colors"
                      >
                        <option value="speed-to-lead-blueprint">Speed-to-Lead n8n Blueprint (Coming Soon)</option>
                        <option value="flowengine">Atomest FlowEngine (Autonomous Orchestrator)</option>
                        <option value="grounding-studio">Atomest Grounding Studio (Knowledge RAG)</option>
                        <option value="leadpulse">Atomest LeadPulse (Intent Scoring)</option>
                        <option value="all-products">All Upcoming Atomest AI Products</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono uppercase text-[#A0A5B5] mb-1.5">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={formData.full_name}
                          onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                          placeholder="e.g. Alex Mercer"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#151824] border border-[#252938] text-xs sm:text-sm text-[#F5F6FA] placeholder:text-[#646A80] focus:outline-none focus:border-[#8B5CF6] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-[#A0A5B5] mb-1.5">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="alex@company.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#151824] border border-[#252938] text-xs sm:text-sm text-[#F5F6FA] placeholder:text-[#646A80] focus:outline-none focus:border-[#8B5CF6] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono uppercase text-[#A0A5B5] mb-1.5">
                          Company Name
                        </label>
                        <input
                          type="text"
                          value={formData.company_name}
                          onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                          placeholder="e.g. Acme Corp"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#151824] border border-[#252938] text-xs sm:text-sm text-[#F5F6FA] placeholder:text-[#646A80] focus:outline-none focus:border-[#8B5CF6] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-[#A0A5B5] mb-1.5">
                          Your Role / Title
                        </label>
                        <input
                          type="text"
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          placeholder="e.g. CTO / VP Product"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#151824] border border-[#252938] text-xs sm:text-sm text-[#F5F6FA] placeholder:text-[#646A80] focus:outline-none focus:border-[#8B5CF6] transition-colors"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full atomest-btn-primary flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
                    >
                      <span>{status === "submitting" ? "Securing Waitlist Spot..." : "Request Early Access"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="flex items-center justify-center gap-2 text-[11px] text-[#A0A5B5] pt-2">
                      <Lock className="w-3 h-3 text-[#8B5CF6]" />
                      <span>Zero spam. Strict privacy. We only contact you about product releases.</span>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
