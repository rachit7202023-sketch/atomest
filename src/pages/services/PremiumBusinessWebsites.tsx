import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "wouter";
import {
  ArrowRight,
  Layers,
  CheckCircle2,
  ShieldCheck,
  Globe,
  Rocket,
  Zap,
  Users,
  Sparkles,
} from "lucide-react";

export default function PremiumBusinessWebsites() {
  return (
    <>
      <Helmet>
        <title>Premium Business Websites | Atomest — High-Converting Web Platforms</title>
        <meta
          name="description"
          content="Atomest Premium Business Websites: high-converting, mobile-first websites with appointment and enquiry systems, SEO-ready architecture, and performance optimization."
        />
      </Helmet>

      <div className="min-h-screen bg-slate-950 flex flex-col justify-between text-slate-50">
        <Navbar />

        {/* Hero */}
        <section className="relative overflow-hidden pt-24 sm:pt-32 pb-20 border-b border-slate-800/60">
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/5 to-transparent rounded-full blur-[120px] pointer-events-none"
            aria-hidden="true"
          />
          <div className="atomest-container relative z-10 text-center max-w-3xl mx-auto space-y-5 reveal-section">
            <div className="atomest-badge-blue inline-flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              <span>Service Division — Premium Business Websites</span>
            </div>
            <h1 className="atomest-section-title text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] mb-4 text-balance">
              Your business deserves a website that{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400">
                converts.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Premium, mobile-first business websites built for service companies. Fast loading, SEO-ready architecture, integrated enquiry and appointment systems, and clear conversion journeys — demonstrated by this very website.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4 reveal-item">
              <Link
                href="/contact?solution=premium-business-websites"
                className="atomest-btn-primary inline-flex items-center gap-2 text-sm px-6 py-3"
              >
                <span>Enquire About Website Design</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* What it does */}
        <section className="atomest-section border-b border-slate-800/60 reveal-section">
          <div className="atomest-container">
            <div className="max-w-3xl mb-14">
              <div className="atomest-badge-blue mb-3 inline-flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>What we build</span>
              </div>
              <h2 className="atomest-section-title text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 text-balance">
                A digital flagship that works as hard as you do.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  title: "High-Converting Design",
                  desc: "Premium UI/UX engineered to turn visitors into enquiries — clear hierarchy, persuasive copy placement, and strong CTAs.",
                  icon: Layers,
                },
                {
                  title: "Appointment & Enquiry Systems",
                  desc: "Integrated booking and contact forms that feed directly into your lead pipeline with instant notifications.",
                  icon: Zap,
                },
                {
                  title: "SEO-Ready Architecture",
                  desc: "Semantic HTML, structured metadata, fast static rendering, and mobile-first performance for search visibility.",
                  icon: Globe,
                },
                {
                  title: "Mobile-First Experience",
                  desc: "Every page is built and tested for mobile first, then enhanced for tablet and desktop.",
                  icon: Rocket,
                },
                {
                  title: "Analytics Integration",
                  desc: "Privacy-respecting analytics so you know where leads come from and what drives conversions.",
                  icon: Users,
                },
                {
                  title: "Performance Optimization",
                  desc: "Sub-second load times, optimized assets, and clean code that stays fast as you grow.",
                  icon: ShieldCheck,
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="reveal-item p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900 flex flex-col justify-between group transition-all duration-300 hover:border-blue-500/40"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-slate-50 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Delivery process */}
        <section className="atomest-section border-b border-slate-800/60 reveal-section">
          <div className="atomest-container">
            <div className="max-w-3xl mb-14 text-center">
              <div className="atomest-badge-blue mb-3 inline-flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-blue-400" />
                <span>Deployment process</span>
              </div>
              <h2 className="atomest-section-title text-3xl sm:text-5xl font-extrabold tracking-tight mb-6">
                From discovery to live site in four phases.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { step: "01", title: "Discover", desc: "We review your brand, audience, and conversion goals." },
                { step: "02", title: "Scope & plan", desc: "We define pages, layouts, and integrations before building." },
                { step: "03", title: "Build & test", desc: "We develop, test mobile responsiveness, forms, and performance." },
                { step: "04", title: "Deploy & support", desc: "We configure your domain, launch, and hand over with documentation." },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="reveal-item p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900 flex flex-col group transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-extrabold font-mono text-blue-400 mb-4 shrink-0">
                    {step.step}
                  </div>
                  <h3 className="font-display font-bold text-lg text-slate-50 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="atomest-section pt-20 sm:pt-28 pb-24 reveal-section">
          <div className="atomest-container">
            <div className="p-8 sm:p-16 rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden text-center shadow-2xl reveal-item">
              <div className="max-w-2xl mx-auto relative z-10 space-y-6">
                <div className="atomest-badge-blue inline-flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-blue-400" />
                  <span>Your digital flagship</span>
                </div>
                <h2 className="atomest-section-title text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
                  Build a website that wins customers.
                </h2>
                <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
                  Your website is often your first impression. Make it count with a premium conversion-focused platform.
                </p>
                <Link
                  href="/contact?solution=premium-business-websites"
                  className="atomest-btn-primary atomest-btn-lg inline-flex items-center gap-2 shadow-lg shadow-blue-500/25"
                >
                  <span>Request Website Proposal</span>
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
