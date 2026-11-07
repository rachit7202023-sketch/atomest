import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Globe, ArrowRight, CheckCircle2, Zap, ShieldCheck, Sparkles, Layers, Cpu, Search, Smartphone, Rocket } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WebsitePreview } from "../../components/showcase/WebsitePreview";

export default function Websites() {
  const capabilities = [
    {
      title: "Business & Company Websites",
      description: "High-authority digital flagships designed to convey technical credibility, establish trust, and turn organic visitors into qualified pipeline.",
      features: ["Custom design systems", "SEO & metadata architecture", "Zero-friction performance (99+ Lighthouse)", "Integrated analytics & telemetry"],
    },
    {
      title: "High-Conversion Landing Pages",
      description: "Laser-focused landing pages built for performance marketing, product launches, and targeted campaign conversion with sub-second page loads.",
      features: ["Clear value positioning", "Interactive calculators & demos", "Form abandonment prevention", "A/B testing instrumentation"],
    },
    {
      title: "Lead-Generation Engines",
      description: "Web platforms engineered to capture, enrich, and route prospective client inquiries straight into your team's existing CRM.",
      features: ["Multi-step qualification flows", "Dynamic form routing", "Real-time calendar scheduling", "Automated instant confirmation"],
    },
    {
      title: "E-Commerce & Digital Commerce",
      description: "Fast, secure e-commerce architectures with headless checkouts, inventory synchronizations, and frictionless buyer experiences.",
      features: ["Stripe / Shopify headless integration", "Sub-second product catalog browsing", "Automated receipt & post-purchase flows", "Global multi-currency support"],
    },
    {
      title: "Custom Web Applications",
      description: "Full-stack web applications, authenticated client portals, and bespoke operational tooling tailored to your exact internal workflows.",
      features: ["Role-based access control (RBAC)", "Database modeling & API architecture", "Real-time reactive interfaces", "Enterprise-grade security"],
    },
    {
      title: "Full Website Redesigns & Modernization",
      description: "Transform legacy, slow, or dated websites into modern, high-converting digital assets without losing SEO equity or historical traffic.",
      features: ["301 redirect mapping & SEO preservation", "Modern UI/UX rebuild", "Mobile responsiveness overhaul", "Codebase cleanliness & maintainability"],
    },
  ];

  const deliverySteps = [
    {
      step: "01",
      title: "Strategic Discovery & Architecture",
      description: "We audit your conversion goals, target customer profiles, and competitive landscape to define page architecture and UX wireframes.",
    },
    {
      step: "02",
      title: "Interactive UI/UX Design",
      description: "We craft custom, brand-tailored design systems in high fidelity, focusing on typographic hierarchy, dark/light contrast, and high conversion.",
    },
    {
      step: "03",
      title: "Production Engineering & Integration",
      description: "Clean, accessible code using React, TypeScript, and modern frameworks. We wire up form endpoints, CMS backends, and analytics.",
    },
    {
      step: "04",
      title: "Optimization, QA & Deployment",
      description: "Comprehensive cross-device testing, Core Web Vitals optimization, automated CI/CD pipeline setup, and seamless production launch.",
    },
  ];

  const technicalStandards = [
    { label: "Core Web Vitals", value: "Sub-second FCP & LCP benchmarks" },
    { label: "Security & Accessibility", value: "WCAG 2.1 AA compliant, strict CSP" },
    { label: "SEO Architecture", value: "Structured JSON-LD schema & dynamic OG tags" },
    { label: "Responsive Layouts", value: "Fluid adaptation across mobile, tablet & ultrawide" },
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

      <div className="min-h-screen bg-[#08090D] flex flex-col justify-between">
        <Navbar />

        {/* Hero Section */}
        <section className="atomest-section pt-8 pb-16">
          <div className="atomest-container">
            <div className="max-w-4xl mx-auto text-center">
              <div className="atomest-badge-blue mb-4 inline-flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span>Division: AI Website Solutions</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-[#F5F6FA] mb-6 leading-tight">
                Websites that turn attention into <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6]">opportunity.</span>
              </h1>

              <p className="text-lg sm:text-xl text-[#A0A5B5] max-w-2xl mx-auto leading-relaxed mb-8">
                Your website is your primary business asset. We engineer fast, intelligent, and conversion-focused web platforms that establish authority and scale your pipeline.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/contact?solution=websites"
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
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Standards Bar */}
        <section className="border-y border-[#252938] bg-[#10121A]/70 py-6">
          <div className="atomest-container">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {technicalStandards.map((std, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#8B5CF6] mb-1">
                    {std.label}
                  </div>
                  <div className="text-sm font-semibold text-[#F5F6FA]">
                    {std.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Preview Section */}
        <section id="preview" className="atomest-section">
          <div className="atomest-container">
            <div className="max-w-3xl mb-8">
              <div className="atomest-badge-violet mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>Engineered Quality</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#F5F6FA] mb-3">
                Experience the standard.
              </h2>
              <p className="text-sm sm:text-base text-[#A0A5B5]">
                Toggle between desktop and mobile viewport simulations, or inspect the underlying performance benchmarks.
              </p>
            </div>

            <WebsitePreview />
          </div>
        </section>

        {/* Capabilities Grid */}
        <section className="atomest-section bg-[#0B0D14] border-y border-[#252938]">
          <div className="atomest-container">
            <div className="max-w-3xl mb-12">
              <div className="atomest-badge-blue mb-3">
                <Layers className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span>Scope & Offerings</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#F5F6FA] mb-3">
                What we build.
              </h2>
              <p className="text-sm sm:text-base text-[#A0A5B5]">
                From single high-impact conversion pages to full corporate digital ecosystems, our engineering is purpose-built for business outcomes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {capabilities.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#10121A] border border-[#252938] hover:border-[#8B5CF6]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-display font-bold text-lg text-[#F5F6FA] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#A0A5B5] leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-[#1C1F2B]">
                    {item.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-[#C4B5FD]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
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
        <section className="atomest-section">
          <div className="atomest-container">
            <div className="max-w-3xl mb-12">
              <div className="atomest-badge-violet mb-3">
                <Rocket className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>Methodology</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#F5F6FA] mb-3">
                How we deliver your website.
              </h2>
              <p className="text-sm sm:text-base text-[#A0A5B5]">
                A disciplined four-stage delivery model focused on clarity, technical velocity, and zero surprises.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {deliverySteps.map((s, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#10121A] border border-[#252938] relative flex flex-col"
                >
                  <div className="text-3xl font-extrabold font-mono text-[#8B5CF6]/40 mb-4">
                    {s.step}
                  </div>
                  <h3 className="font-display font-bold text-base text-[#F5F6FA] mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A0A5B5] leading-relaxed">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="atomest-section pt-0">
          <div className="atomest-container">
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#151824] to-[#10121A] border border-[#252938] relative overflow-hidden text-center">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#3B82F6]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="max-w-2xl mx-auto relative z-10">
                <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#F5F6FA] mb-4">
                  Ready to upgrade your web presence?
                </h2>
                <p className="text-sm sm:text-base text-[#A0A5B5] mb-8 leading-relaxed">
                  Tell us about your company, current pain points, and vision. We will prepare an architectural roadmap and transparent scope.
                </p>
                <Link
                  to="/contact?solution=websites"
                  className="atomest-btn-primary inline-flex items-center gap-2"
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
