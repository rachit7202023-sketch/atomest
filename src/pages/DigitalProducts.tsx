import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Layers, GitFork, FileSpreadsheet, Bot, AlertCircle } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function DigitalProducts() {
  const [email, setEmail] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("all");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const upcomingPipelines = [
    {
      id: "speed-to-lead-blueprint",
      category: "Automation Blueprint",
      icon: GitFork,
      color: "text-[#8B5CF6]",
      border: "border-[#8B5CF6]/30",
      title: "Speed-to-Lead Automation Workflow Kit",
      status: "In Technical Verification & QA",
      statusBadge: "Internal Audit in Progress",
      description:
        "A self-hostable n8n workflow template engineered for sub-60-second inbound lead routing, deterministic spam filtering, Google Sheets logging, and instant notification alerting. Currently undergoing rigorous test-suite execution.",
      deliverables: [
        "Tested n8n workflow JSON export",
        "Deterministic input validation & honeypot filtering",
        "Step-by-step self-hosting & credential configuration SOP",
        "Zero-cost baseline API configuration guide",
      ],
      notice: "Provisional pricing to be determined following end-to-end verification.",
    },
    {
      id: "smb-operations-os",
      category: "Notion System",
      icon: Layers,
      color: "text-[#3B82F6]",
      border: "border-[#3B82F6]/30",
      title: "SMB Client Operations & Project Workspace",
      status: "In Design & Packaging",
      statusBadge: "Coming Soon",
      description:
        "A structured Notion operational system designed for boutique service businesses and solo operators to manage client proposals, project deliverables, meeting notes, and payment statuses without bloated SaaS fees.",
      deliverables: [
        "One-click duplicate Notion workspace template",
        "Project phase & milestone tracking database",
        "Client onboarding checklist & proposal generator",
        "Documented SOPs for operational handoffs",
      ],
      notice: "Accessible introductory pricing upon public availability.",
    },
    {
      id: "ai-prompt-chains",
      category: "AI Workflow System",
      icon: Bot,
      color: "text-emerald-400",
      border: "border-emerald-500/30",
      title: "Grounded Support & Qualification Prompt Library",
      status: "In Research & Formulation",
      statusBadge: "Coming Soon",
      description:
        "Production-tested system prompts and structured multi-step reasoning chains for LLMs (Gemini, Claude, GPT) tailored for inbound customer service, lead qualification, and document-grounded extraction.",
      deliverables: [
        "Curated, field-tested prompt system markdown files",
        "Hallucination-reduction constraints and guardrails",
        "JSON-schema output templates for automation handoffs",
        "Implementation and benchmarking guide",
      ],
      notice: "Single-license download with free minor version revisions.",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          product: selectedProduct,
          role: "Digital Products Notification",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to register notification request. Please try again.");
      }

      setStatus("success");
    } catch (err: any) {
      console.error("Waitlist error:", err);
      setErrorMessage(err.message || "Failed to register request. Please check your network connection.");
      setStatus("error");
    }
  };

  return (
    <>
      <Helmet>
        <title>Digital Products | Atomest — Practical Toolkits, Templates & Blueprints</title>
        <meta
          name="description"
          content="Downloadable digital products, automation blueprints, Notion business systems, and AI workflow toolkits from Atomest. Practical tools engineered for growing businesses."
        />
      </Helmet>

      <div className="min-h-screen bg-[#08090D] flex flex-col justify-between text-[#F5F6FA]">
        <Navbar />

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 sm:pt-32 pb-16 border-b border-[#252938]">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#8B5CF6]/15 via-[#3B82F6]/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

          <div className="atomest-container relative z-10 text-center max-w-3xl mx-auto space-y-5">
            <div className="atomest-badge-violet inline-flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>Division B: AI & Digital Products</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-[#F5F6FA] leading-[1.1]">
              Practical Digital Products.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#3B82F6]">
                Built for Immediate Use.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#A0A5B5] leading-relaxed">
              We design, test, and package operational digital assets—from automation workflows to Notion systems and AI prompt libraries—that solve specific bottlenecks for solo operators and growing businesses.
            </p>
          </div>
        </section>

        {/* Storefront Transparency & Genuine Coming Soon Section */}
        <main className="atomest-container py-16 sm:py-24 space-y-16">
          {/* Transparency Callout */}
          <div className="p-6 rounded-2xl bg-[#10121A] border border-[#252938] max-w-3xl mx-auto text-center space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-[#8B5CF6] tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#8B5CF6]" />
              <span>Storefront Status: Verification & Packaging Phase</span>
            </div>
            <p className="text-xs sm:text-sm text-[#A0A5B5] leading-relaxed">
              Atomest strictly avoids listing fake or unverified products. Every kit, workflow, and template below is actively undergoing technical testing, documentation formatting, and QA before its official release.
            </p>
          </div>

          {/* Genuine Upcoming Products Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {upcomingPipelines.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="p-8 rounded-3xl bg-[#10121A] border border-[#252938] flex flex-col justify-between shadow-xl space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl bg-[#151824] border ${item.border} flex items-center justify-center ${item.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#151824] text-[#C4B5FD] border border-[#252938]">
                        {item.statusBadge}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs font-mono uppercase text-[#8B5CF6] tracking-wider">
                        {item.category}
                      </span>
                      <h2 className="text-xl font-bold font-display text-[#F5F6FA] mt-1">
                        {item.title}
                      </h2>
                    </div>

                    <p className="text-xs sm:text-sm text-[#A0A5B5] leading-relaxed">
                      {item.description}
                    </p>

                    <div className="space-y-2 pt-4 border-t border-[#1C1F2B]">
                      <div className="text-[11px] font-mono uppercase text-[#A0A5B5] tracking-wider mb-2">
                        Planned Deliverables
                      </div>
                      {item.deliverables.map((deliv, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2 text-xs text-[#C4B5FD]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0 mt-0.5" />
                          <span>{deliv}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#1C1F2B]">
                    <div className="text-[11px] font-mono text-[#A0A5B5] italic">
                      {item.notice}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Direct Launch Alert Form */}
          <div className="max-w-2xl mx-auto p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#151824] to-[#10121A] border border-[#252938] text-center space-y-6 shadow-2xl">
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-[#F5F6FA]">
                Get notified when products release
              </h3>
              <p className="text-xs sm:text-sm text-[#A0A5B5] leading-relaxed">
                Enter your email to receive notification the moment our verified templates and blueprints launch with introductory pricing.
              </p>
            </div>

            {status === "success" ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Thank you! We've registered your interest and will alert you upon release.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto text-left">
                <div>
                  <label htmlFor="product-select" className="text-[11px] font-mono uppercase text-[#A0A5B5] block mb-1">
                    Select Product Category of Interest
                  </label>
                  <select
                    id="product-select"
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#08090D] border border-[#252938] text-xs text-[#F5F6FA] focus:outline-none focus:border-[#8B5CF6]"
                  >
                    <option value="all">All Upcoming Digital Products</option>
                    <option value="speed-to-lead-blueprint">Speed-to-Lead Automation Workflow Kit</option>
                    <option value="smb-operations-os">SMB Client Operations Notion System</option>
                    <option value="ai-prompt-chains">Grounded AI Support Prompt Library</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="email-input" className="text-[11px] font-mono uppercase text-[#A0A5B5] block mb-1">
                    Work Email
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full h-11 px-3.5 rounded-xl bg-[#08090D] border border-[#252938] text-xs text-[#F5F6FA] placeholder:text-[#A0A5B5]/50 focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>

                {errorMessage && (
                  <div className="text-xs text-rose-400 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full atomest-btn-primary py-3 text-xs flex items-center justify-center gap-2"
                >
                  <span>{status === "submitting" ? "Registering..." : "Notify Me on Launch"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            <div className="text-[10px] font-mono text-[#A0A5B5] pt-2">
              Zero spam. Unsubscribe at any time with one click.
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

