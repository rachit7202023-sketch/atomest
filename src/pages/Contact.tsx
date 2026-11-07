import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "wouter";
import { Mail, CheckCircle2, AlertCircle, ArrowRight, Clock, ShieldCheck, Sparkles, MessageSquare, Building2, Globe, DollarSign } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Contact() {
  const [location] = useLocation();
  const getPreselectedSolution = () => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get("solution") || "websites";
    }
    return "websites";
  };

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    website: "",
    solution: getPreselectedSolution(),
    budget: "$10k - $25k",
    description: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const sol = params.get("solution");
      if (sol) {
        setFormData((prev) => ({ ...prev, solution: sol }));
      }
    }
  }, [location]);

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.description.trim()) {
      setStatus("error");
      setErrorMessage("Please fill in your name, business email, and project description.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit project inquiry. Please try again.");
      }

      setStatus("success");
    } catch (err: any) {
      console.error("Contact form error:", err);
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred. Please try again or email us directly.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Start a Project | Atomest Consultation</title>
        <meta
          name="description"
          content="Start a project with Atomest. Request a technical discovery consultation for AI Website Solutions, Autonomous Workflows, or Intelligent Agents."
        />
      </Helmet>

      <div className="min-h-screen bg-[#08090D] flex flex-col justify-between">
        <Navbar />

        {/* Header */}
        <section className="atomest-section pt-8 pb-12">
          <div className="atomest-container">
            <div className="max-w-3xl">
              <div className="atomest-badge-violet mb-4 inline-flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>Discovery & Project Scoping</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-[#F5F6FA] mb-4 leading-tight">
                Let's engineer your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6]">unfair advantage.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#A0A5B5] leading-relaxed">
                Whether you need a high-converting digital platform, autonomous operational pipelines, or grounded AI agents, our engineering team is ready to map your solution.
              </p>
            </div>
          </div>
        </section>

        {/* Main Consultation Section */}
        <section className="atomest-section pt-0">
          <div className="atomest-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Partnership Expectations & Process */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 sm:p-8 rounded-2xl bg-[#10121A] border border-[#252938] space-y-6">
                  <div>
                    <h3 className="font-display font-bold text-lg text-[#F5F6FA] mb-2">
                      What to expect
                    </h3>
                    <p className="text-xs sm:text-sm text-[#A0A5B5] leading-relaxed">
                      We treat every inquiry as a serious technical conversation, not a high-pressure sales pitch.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6] shrink-0 mt-0.5">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm text-[#F5F6FA]">
                          24-Hour Review Turnaround
                        </h4>
                        <p className="text-xs text-[#A0A5B5] mt-0.5">
                          A lead solutions architect reviews your requirements and assesses technical feasibility within one business day.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6] shrink-0 mt-0.5">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm text-[#F5F6FA]">
                          Actionable Architecture Blueprint
                        </h4>
                        <p className="text-xs text-[#A0A5B5] mt-0.5">
                          We provide a preliminary architecture recommendation and transparent scope before any contract commitment.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6] shrink-0 mt-0.5">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm text-[#F5F6FA]">
                          Direct Engineer Access
                        </h4>
                        <p className="text-xs text-[#A0A5B5] mt-0.5">
                          You speak directly with the architects and engineers who will build your systems, never outsourced middlemen.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#1C1F2B] text-xs text-[#A0A5B5]">
                    Prefer direct email? Reach us directly at{" "}
                    <a href="mailto:hello@atomest.com" className="text-[#8B5CF6] hover:underline font-mono">
                      hello@atomest.com
                    </a>
                  </div>
                </div>

                {/* Privacy & Sovereignty Card */}
                <div className="p-5 rounded-xl bg-[#0B0D14] border border-[#252938] text-xs text-[#A0A5B5] space-y-1">
                  <div className="font-display font-bold text-[#F5F6FA]">Confidentiality Guaranteed</div>
                  <p className="leading-relaxed">
                    All project details, architecture briefs, and proprietary workflows shared with Atomest remain strictly confidential under mutual NDA upon request.
                  </p>
                </div>
              </div>

              {/* Right Column: Inquiry Form */}
              <div className="lg:col-span-7">
                <div className="p-6 sm:p-10 rounded-2xl bg-[#10121A] border border-[#252938] shadow-2xl relative">
                  {status === "success" ? (
                    <div className="py-12 px-4 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h2 className="font-display font-extrabold text-2xl text-[#F5F6FA]">
                        Inquiry Received
                      </h2>
                      <p className="text-sm text-[#A0A5B5] max-w-md mx-auto leading-relaxed">
                        Thank you, <span className="text-[#F5F6FA] font-medium">{formData.fullName}</span>. A senior solutions architect is reviewing your inquiry regarding{" "}
                        <span className="text-[#8B5CF6] font-medium">{formData.solution}</span>. We will follow up at{" "}
                        <span className="text-[#F5F6FA] font-medium">{formData.email}</span> within 24 hours.
                      </p>
                      <div className="pt-4 flex justify-center gap-4">
                        <Link to="/" className="atomest-btn-secondary text-xs">
                          Return to Homepage
                        </Link>
                        <button
                          onClick={() => {
                            setStatus("idle");
                            setFormData({
                              fullName: "",
                              email: "",
                              company: "",
                              website: "",
                              solution: "websites",
                              budget: "$10k - $25k",
                              description: "",
                            });
                          }}
                          className="atomest-btn-primary text-xs"
                        >
                          Submit Another Project
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="border-b border-[#252938] pb-4">
                        <h2 className="font-display font-bold text-xl text-[#F5F6FA]">
                          Project Consultation Request
                        </h2>
                        <p className="text-xs text-[#A0A5B5] mt-1">
                          Tell us about your organization and the challenges you're looking to solve.
                        </p>
                      </div>

                      {status === "error" && (
                        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{errorMessage}</span>
                        </div>
                      )}

                      {/* Solution Selector */}
                      <div>
                        <label className="block text-xs font-mono uppercase text-[#A0A5B5] mb-2">
                          Interested Solution *
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            { id: "websites", label: "AI Websites" },
                            { id: "automation", label: "Automation" },
                            { id: "agents", label: "AI Agents" },
                            { id: "products", label: "AI Products" },
                          ].map((s) => (
                            <button
                              key={s.id}
                              type="button"
                              onClick={() => setFormData({ ...formData, solution: s.id })}
                              className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                                formData.solution === s.id
                                  ? "bg-[#8B5CF6]/20 border-[#8B5CF6] text-[#F5F6FA] shadow-[0_0_15px_rgba(139,92,246,0.2)]"
                                  : "bg-[#151824] border-[#252938] text-[#A0A5B5] hover:text-[#F5F6FA] hover:border-[#383D52]"
                              }`}
                            >
                              {s.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Name & Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono uppercase text-[#A0A5B5] mb-1.5">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            placeholder="Alex Mercer"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#151824] border border-[#252938] text-xs sm:text-sm text-[#F5F6FA] placeholder:text-[#646A80] focus:outline-none focus:border-[#8B5CF6] transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase text-[#A0A5B5] mb-1.5">
                            Business Email *
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

                      {/* Company & Website */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono uppercase text-[#A0A5B5] mb-1.5">
                            Company Name (Optional)
                          </label>
                          <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder="Acme Innovations"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#151824] border border-[#252938] text-xs sm:text-sm text-[#F5F6FA] placeholder:text-[#646A80] focus:outline-none focus:border-[#8B5CF6] transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase text-[#A0A5B5] mb-1.5">
                            Website URL (Optional)
                          </label>
                          <input
                            type="text"
                            value={formData.website}
                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                            placeholder="https://acme.com"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#151824] border border-[#252938] text-xs sm:text-sm text-[#F5F6FA] placeholder:text-[#646A80] focus:outline-none focus:border-[#8B5CF6] transition-colors"
                          />
                        </div>
                      </div>

                      {/* Budget Range */}
                      <div>
                        <label className="block text-xs font-mono uppercase text-[#A0A5B5] mb-1.5">
                          Estimated Project Budget (Optional)
                        </label>
                        <select
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#151824] border border-[#252938] text-xs sm:text-sm text-[#F5F6FA] focus:outline-none focus:border-[#8B5CF6] transition-colors"
                        >
                          <option value="Under $10,000">Under $10,000</option>
                          <option value="$10k - $25k">$10,000 - $25,000 (Recommended for Custom Solutions)</option>
                          <option value="$25k - $50k">$25,000 - $50,000 (Comprehensive Ecosystems)</option>
                          <option value="$50,000+">$50,000+ (Enterprise Multi-Agent Platform)</option>
                          <option value="Not yet decided">Exploring / Not yet determined</option>
                        </select>
                      </div>

                      {/* Project Description */}
                      <div>
                        <label className="block text-xs font-mono uppercase text-[#A0A5B5] mb-1.5">
                          Project Description & Outcomes *
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          placeholder="Describe what you want to build, current operational bottlenecks, target timeline, or systems that need to be connected..."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#151824] border border-[#252938] text-xs sm:text-sm text-[#F5F6FA] placeholder:text-[#646A80] focus:outline-none focus:border-[#8B5CF6] transition-colors resize-y"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="w-full atomest-btn-primary flex items-center justify-center gap-2 py-3 disabled:opacity-50"
                      >
                        <span>{status === "submitting" ? "Transmitting Requirements..." : "Submit Project Inquiry"}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
