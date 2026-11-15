import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "wouter";
import { ArrowRight, Globe, CheckCircle2, ShieldCheck, Layers, Rocket, Zap, Users } from "lucide-react";

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

      <div className="min-h-screen bg-[#08090D] flex flex-col justify-between text-[#F5F6FA]">
        <Navbar />

        {/* Hero */}
        <section className="relative overflow-hidden pt-24 sm:pt-32 pb-16 border-b border-[#252938]">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#8B5CF6]/15 via-[#3B82F6]/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
          <div className="atomest-container relative z-10 text-center max-w-3xl mx-auto space-y-5">
            <div className="atomest-badge-violet inline-flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span>Division E: Premium Business Websites</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-[#F5F6FA] leading-[1.1]">
              Your business deserves a website that{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#A78BFA]">
                converts.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-[#A0A5B5] leading-relaxed">
              Premium, mobile-first business websites built for service companies. Fast loading, SEO-ready architecture, integrated enquiry and appointment systems, and clear conversion journeys — demonstrated by this very website.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link href="/contact?solution=premium-business-websites" className="atomest-btn-primary inline-flex items-center gap-2 text-sm px-6 py-3">
                <span>Enquire About Website Design</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* What it does */}
        <section className="atomest-section bg-[#0B0D14] border-b border-[#252938]">
          <div className="atomest-container">
            <div className="max-w-3xl mb-12">
              <div className="atomest-badge-blue mb-3 inline-flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span>What we build</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#F5F6FA] mb-6">
                A digital flagship that works as hard as you do.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  <div key={idx} className="p-6 rounded-2xl bg-[#10121A] border border-[#252938] hover:border-[#8B5CF6]/40 transition-colors flex flex-col justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#151824] border border-[#252938] flex items-center justify-center text-[#3B82F6] mb-4 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-[#F5F6FA] mb-2">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-[#A0A5B5] leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Delivery process */}
        <section className="atomest-section border-b border-[#252938]">
          <div className="atomest-container">
            <div className="max-w-3xl mb-12 text-center">
              <div className="atomest-badge-violet mb-3 inline-flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>Deployment process</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#F5F6FA] mb-6">
                From discovery to live site in four phases.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Discover", desc: "We review your brand, audience, and conversion goals." },
                { step: "02", title: "Scope & plan", desc: "We define pages, layouts, and integrations before building." },
                { step: "03", title: "Build & test", desc: "We develop, test mobile responsiveness, forms, and performance." },
                { step: "04", title: "Deploy & support", desc: "We configure your domain, launch, and hand over with documentation." },
              ].map((step, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-[#10121A] border border-[#252938] flex flex-col">
                  <div className="w-10 h-10 rounded-full bg-[#151824] border border-[#252938] flex items-center justify-center font-extrabold font-mono text-[#8B5CF6] mb-4 shrink-0">
                    {step.step}
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#F5F6FA] mb-2">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-[#A0A5B5] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="atomest-section py-20 sm:py-28">
          <div className="atomest-container">
            <div className="p-8 sm:p-16 rounded-3xl bg-gradient-to-b from-[#151824] to-[#10121A] border border-[#252938] relative overflow-hidden text-center shadow-2xl">
              <div className="max-w-2xl mx-auto relative z-10 space-y-6">
                <div className="atomest-badge-violet inline-flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-[#3B82F6]" />
                  <span>Your digital flagship</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#F5F6FA]">
                  Build a website that wins customers.
                </h2>
                <p className="text-base sm:text-lg text-[#A0A5B5] leading-relaxed">
                  Your website is often your first impression. Make it count with a premium conversion-focused platform.
                </p>
                <Link href="/contact?solution=premium-business-websites" className="atomest-btn-primary inline-flex items-center gap-2 text-base px-8 py-3.5 shadow-lg shadow-[#8B5CF6]/25">
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
