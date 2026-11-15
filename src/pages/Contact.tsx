import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "wouter";
import { CheckCircle2, AlertCircle, ArrowRight, Clock, ShieldCheck, Sparkles, MessageSquare, Mail } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Contact() {
  const [location] = useLocation();
  const getPreselectedSolution = () => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const sol = params.get("solution");
      const validSolutions = [
        "web-development",
        "business-automation",
        "ai-solutions",
        "ai-voice-receptionist",
        "lead-automation",
        "crm-workflow-automation",
        "ai-customer-support",
        "premium-business-websites",
        "combined",
        "digital-products",
        "other",
      ];
      if (sol && validSolutions.includes(sol)) return sol;
    }
    return "web-development";
  };

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    website: "",
    solution: getPreselectedSolution(),
    budget: "$300 - $750",
    description: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const sol = params.get("solution");
      const validSolutions = [
        "web-development",
        "business-automation",
        "ai-solutions",
        "ai-voice-receptionist",
        "lead-automation",
        "crm-workflow-automation",
        "ai-customer-support",
        "premium-business-websites",
        "combined",
        "digital-products",
        "other",
      ];
      if (sol && validSolutions.includes(sol)) {
        setFormData((p) => ({ ...p, solution: sol }));
      }
    }
  }, [location]);

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const solutionOptions = [
    { id: "web-development", label: "Premium Websites" },
    { id: "lead-automation", label: "Lead Automation" },
    { id: "ai-voice-receptionist", label: "AI Voice Receptionist" },
    { id: "crm-workflow-automation", label: "CRM & Workflow Automation" },
    { id: "ai-customer-support", label: "AI Customer Support" },
    { id: "ai-solutions", label: "AI Solutions" },
    { id: "business-automation", label: "Business Automation" },
    { id: "combined", label: "Combined Solution" },
    { id: "digital-products", label: "Digital Products" },
    { id: "other", label: "Other" },
  ];

  const budgetOptions = [
    "Under $100",
    "$100 - $300",
    "$300 - $750",
    "$750 - $1,500",
    "$1,500+",
    "Not sure yet",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.description.trim()) {
      setStatus("error");
      setErrorMessage("Please fill in your name, email, and project description.");
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
        <title>Start a Project | Atomest Project Enquiry</title>
        <meta
          name="description"
          content="Get in touch with Atomest. Request a quotation or discovery conversation for Web Development, Business Automation, AI Solutions, or Digital Products."
        />
      </Helmet>

      <div className="min-h-screen bg-slate-950 flex flex-col justify-between text-slate-50">
        <Navbar />

        {/* Header */}
        <section className="atomest-section pt-24 sm:pt-32 pb-20 border-b border-slate-800/60 reveal-section">
          <div className="atomest-container relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="atomest-badge-indigo inline-flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Project Enquiry & Consultation</span>
              </div>

              <h1 className="atomest-section-title text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05] mb-4 text-balance">
                Let's discuss your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-400">
                  next project.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
                Whether you need a new business website, workflow automation to save hours of manual work, a custom AI assistant, or have a question about our digital products, we would love to hear from you.
              </p>
            </div>
          </div>
        </section>

        {/* Main Consultation Section */}
        <section className="atomest-section pt-0 reveal-section">
          <div className="atomest-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: What to Expect & Direct Contact */}
              <div className="lg:col-span-5 space-y-6">
                <div className="reveal-item p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900 space-y-6">
                  <div>
                    <h3 className="font-display font-bold text-lg text-slate-50 mb-2">
                      What to expect
                    </h3>
                    <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                      We treat every inquiry with care. No high-pressure sales scripts — just a practical conversation about what you need and how we can help.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm text-slate-50">
                          Prompt Response
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                          We review your requirements and respond with initial feedback and questions within 1–2 business days.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm text-slate-50">
                          Transparent Scoping
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                          We provide a clear scope, timeline, and fixed-price quotation before any commitment.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm text-slate-50">
                          Direct Communication
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                          You communicate directly with the team designing and building your systems.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800/60 text-xs sm:text-sm text-slate-400">
                    Prefer direct email? Reach us at{" "}
                    <a href="mailto:hello@atomest.com" className="text-indigo-400 hover:underline font-mono">
                      hello@atomest.com
                    </a>
                  </div>
                </div>

                {/* Privacy Card */}
                <div className="reveal-item p-5 rounded-xl border border-slate-800 bg-slate-900 text-xs sm:text-sm text-slate-400 space-y-1">
                  <div className="font-display font-bold text-slate-50">Privacy & Discretion</div>
                  <p className="leading-relaxed">
                    We treat all shared project details, workflows, and documents with strict confidentiality. Non-disclosure agreements can be signed upon request before formal project kick-off.
                  </p>
                </div>
              </div>

              {/* Right Column: Inquiry Form */}
              <div className="lg:col-span-7">
                <div className="reveal-item p-6 sm:p-10 rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl relative">
                  {status === "success" ? (
                    <div className="py-12 px-4 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h2 className="font-display font-extrabold text-2xl text-slate-50">
                        Enquiry Received
                      </h2>
                      <p className="text-sm sm:text-base text-slate-400 max-w-md mx-auto leading-relaxed">
                        Thank you, <span className="text-slate-50 font-medium">{formData.fullName}</span>. We have received your enquiry regarding{" "}
                        <span className="text-indigo-400 font-medium">{formData.solution}</span>. We will follow up at{" "}
                        <span className="text-slate-50 font-medium">{formData.email}</span> shortly.
                      </p>
                      <div className="pt-4 flex justify-center gap-4">
                        <Link href="/" className="atomest-btn-secondary text-xs">
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
                              solution: "web-development",
                              budget: "$300 - $750",
                              description: "",
                            });
                          }}
                          className="atomest-btn-primary text-xs"
                        >
                          Submit Another Enquiry
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="border-b border-slate-800 pb-4">
                        <h2 className="font-display font-bold text-xl text-slate-50">
                          Project Enquiry Form
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-400 mt-1">
                          Tell us about your business and what you're looking to achieve.
                        </p>
                      </div>

                      {status === "error" && (
                        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-400 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{errorMessage}</span>
                        </div>
                      )}

                      {/* Solution Selector */}
                      <div>
                        <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
                          Area of Interest *
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {solutionOptions.map((s) => (
                            <button
                              key={s.id}
                              type="button"
                              onClick={() => setFormData({ ...formData, solution: s.id })}
                              className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                                formData.solution === s.id
                                  ? "bg-indigo-500/20 border-indigo-500 text-slate-50 shadow-[0_0_15px_rgba(79,70,229,0.2)]"
                                  : "bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-50 hover:border-slate-600"
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
                          <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            placeholder="Alex Mercer"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="alex@company.com"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                          />
                        </div>
                      </div>

                      {/* Company & Website */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                            Company / Project Name (Optional)
                          </label>
                          <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder="Acme Studio"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                            Current Website (Optional)
                          </label>
                          <input
                            type="text"
                            value={formData.website}
                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                            placeholder="https://example.com"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                          />
                        </div>
                      </div>

                      {/* Budget Range */}
                      <div>
                        <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                          Estimated Budget Range (Optional Enquiry Range)
                        </label>
                        <select
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-slate-50 focus:outline-none focus:border-indigo-500 transition-colors"
                        >
                          {budgetOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Project Description */}
                      <div>
                        <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                          Project Description & Goals *
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          placeholder="Tell us what you are looking to build, current manual bottlenecks, or specific outcomes you want to achieve..."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors resize-y"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="w-full atomest-btn-primary flex items-center justify-center gap-2 py-3 disabled:opacity-50 text-xs sm:text-sm font-semibold"
                      >
                        <span>{status === "submitting" ? "Sending Enquiry..." : "Send Project Enquiry"}</span>
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
