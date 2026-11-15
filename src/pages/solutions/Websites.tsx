import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Globe, ArrowRight, CheckCircle2, Zap, ShieldCheck, Sparkles, Layers, Cpu } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Websites() {
  const capabilities = [
    {
      title: "Business & Company Websites",
      description:
        "High-authority digital flagships designed to convey technical credibility, establish trust, and turn organic visitors into qualified pipeline.",
      features: [
        "Custom design systems",
        "SEO & metadata architecture",
        "Zero-friction performance (99+ Lighthouse)",
        "Integrated analytics & telemetry",
      ],
    },
    {
      title: "High-Conversion Landing Pages",
      description:
        "Laser-focused landing pages built for performance marketing, product launches, and targeted campaign conversion with sub-second page loads.",
      features: [
        "Clear value positioning",
        "Interactive calculators & demos",
        "Form abandonment prevention",
        "A/B testing instrumentation",
      ],
    },
    {
      title: "Lead-Generation Engines",
      description:
        "Web platforms engineered to capture, enrich, and route prospective client inquiries straight into your team's existing CRM.",
      features: [
        "Multi-step qualification flows",
        "Dynamic form routing",
        "Real-time calendar scheduling",
        "Automated instant confirmation",
      ],
    },
    {
      title: "Custom Web Applications",
      description:
        "Full-stack web applications, authenticated client portals, and bespoke operational tooling tailored to your exact internal workflows.",
      features: [
        "Role-based access control (RBAC)",
        "Database modeling & API architecture",
        "Real-time reactive interfaces",
        "Enterprise-grade security",
      ],
    },
    {
      title: "Website Redesigns & Modernization",
      description:
        "Transform legacy, slow, or dated websites into modern, high-converting digital assets without losing SEO equity or historical traffic.",
      features: [
        "301 redirect mapping & SEO preservation",
        "Modern UI/UX rebuild",
        "Mobile responsiveness overhaul",
        "Codebase cleanliness & maintainability",
      ],
    },
  ];

  const technicalStandards = [
    { label: "Core Web Vitals", value: "Sub-second FCP & LCP benchmarks" },
    { label: "Security & Accessibility", value: "WCAG 2.1 AA compliant, strict CSP" },
    { label: "SEO Architecture", value: "Structured JSON-LD schema & dynamic OG tags" },
    { label: "Responsive Layouts", value: "Fluid adaptation across mobile & desktop" },
  ];

  const deliverySteps = [
    {
      step: "01",
      title: "Strategic Discovery",
      description:
        "We audit your conversion goals, target customer profiles, and competitive landscape to define page architecture and UX wireframes.",
    },
    {
      step: "02",
      title: "UI/UX Design",
      description:
        "We craft custom, brand-tailored design systems in high fidelity, focusing on typographic hierarchy and high conversion.",
    },
    {
      step: "03",
      title: "Production Engineering",
      description:
        "Clean, accessible code using React, TypeScript, and modern frameworks. We wire up form endpoints, CMS backends, and analytics.",
    },
    {
      step: "04",
      title: "QA & Deployment",
      description:
        "Cross-device testing, Core Web Vitals optimization, automated CI/CD pipeline setup, and seamless production launch.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>AI Website Solutions | Atomest</title>
        <meta
          name="description"
          content="Websites that turn attention into opportunity. High-performance, high-conversion web platforms engineered for ambitious businesses."
        />
      </Helmet>

      <div className="min-h-screen bg-slate-950 flex flex-col justify-between text-slate-50">
        <Navbar />

        {/* Hero */}
        <section className="atomest-section pt-24 sm:pt-32 pb-20 border-b border-slate-800/60 reveal-section">
          <div className="atomest-container relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="atomest-badge-blue inline-flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span>Solution Division — AI Website Solutions</span>
              </div>

              <h1 className="atomest-section-title text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05] mb-4 text-balance">
                Websites that turn attention into{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-400">
                  opportunity.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Your website is your primary business asset. We engineer fast, intelligent, and conversion-focused web platforms that establish authority and scale your pipeline.
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-4 reveal-item">
                <Link
                  href="/contact?solution=web-development"
                  className="atomest-btn-primary inline-flex items-center gap-2"
                >
                  <span>Start a Website Project</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#preview"
                  className="atomest-btn-secondary inline-flex items-center gap-2"
                >
                  <span>View Architecture Preview</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Standards Bar */}
        <section className="border-y border-slate-800/60 bg-slate-900/40 py-6 reveal-section">
          <div className="atomest-container">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {technicalStandards.map((std, idx) => (
                <div key={idx} className="reveal-item flex flex-col items-center">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 mb-1">
                    {std.label}
                  </div>
                  <div className="text-sm font-semibold text-slate-50">
                    {std.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities Grid */}
        <section className="atomest-section border-b border-slate-800/60 reveal-section">
          <div className="atomest-container">
            <div className="max-w-3xl mb-14">
              <div className="atomest-badge-blue mb-3 inline-flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-blue-400" />
                <span>Scope & Offerings</span>
              </div>
              <h2 className="atomest-section-title text-3xl sm:text-5xl font-extrabold tracking-tight mb-3">
                What we build.
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                From single high-impact conversion pages to full corporate digital ecosystems, our engineering is purpose-built for business outcomes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {capabilities.map((item, idx) => (
                <div
                  key={idx}
                  className="reveal-item p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-display font-bold text-lg text-slate-50 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>
                  <div className="space-y-2 pt-4 border-t border-slate-800/60">
                    {item.features.map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-center gap-2 text-sm text-slate-400"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Delivery Process */}
        <section className="atomest-section border-b border-slate-800/60 reveal-section">
          <div className="atomest-container">
            <div className="max-w-3xl mb-14">
              <div className="atomest-badge-blue mb-3 inline-flex items-center gap-2">
                <Rocket className="w-3.5 h-3.5 text-blue-400" />
                <span>Methodology</span>
              </div>
              <h2 className="atomest-section-title text-3xl sm:text-5xl font-extrabold tracking-tight mb-3">
                How we deliver your website.
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                A disciplined four-stage delivery model focused on clarity, technical velocity, and zero surprises.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {deliverySteps.map((s, idx) => (
                <div key={idx} className="reveal-item p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900 flex flex-col group transition-all duration-300">
                  <div className="text-3xl font-extrabold font-mono text-indigo-400 mb-4">
                    {s.step}
                  </div>
                  <h3 className="font-display font-bold text-base text-slate-50 mb-2 group-hover:text-blue-400 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="atomest-section pt-20 sm:pt-28 pb-24 reveal-section">
          <div className="atomest-container">
            <div className="p-8 sm:p-16 rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden text-center shadow-2xl reveal-item">
              <div className="max-w-2xl mx-auto relative z-10 space-y-6">
                <h2 className="atomest-section-title text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
                  Ready to upgrade your web presence?
                </h2>
                <p className="text-base sm:text-lg text-slate-400 mb-8 leading-relaxed">
                  Tell us about your company, current pain points, and vision. We will prepare an architectural roadmap and transparent scope.
                </p>
                <Link
                  href="/contact?solution=web-development"
                  className="atomest-btn-primary atomest-btn-lg inline-flex items-center gap-2 shadow-lg shadow-indigo-500/25"
                >
                  <span>Start a Website Project</span>
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
