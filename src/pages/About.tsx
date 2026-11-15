import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { ArrowRight, ShieldCheck, Zap, Bot, Layers, Sparkles, Code2, Users, Cpu } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function About() {
  const principles = [
    {
      title: "Commercial Outcome First",
      icon: Zap,
      description:
        "We don't build AI for novelty. Every website, pipeline, and agent we engineer is designed to eliminate manual labor hours or measurably accelerate client pipeline.",
    },
    {
      title: "Deterministic & Grounded Systems",
      icon: ShieldCheck,
      description:
        "We combine generative intelligence with deterministic business logic. When accuracy is paramount, our systems enforce strict schema validation and human-in-the-loop checkpoints.",
    },
    {
      title: "Sovereign Data Governance",
      icon: Cpu,
      description:
        "Your business secrets, customer conversations, and internal procedures never train public models. We enforce zero data retention and strict tenant boundaries.",
    },
    {
      title: "Direct Engineer Collaboration",
      icon: Code2,
      description:
        "You partner directly with senior solutions architects and software engineers who build and maintain your code, with no bureaucratic intermediaries.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>About Atomest | Intelligent AI Automation Studio</title>
        <meta
          name="description"
          content="Learn about Atomest's mission, engineering principles, and team. We build intelligent websites, powerful automations, and AI agents for ambitious businesses."
        />
      </Helmet>

      <div className="min-h-screen bg-slate-950 flex flex-col justify-between text-slate-50">
        <Navbar />

        {/* Hero */}
        <section className="atomest-section pt-24 sm:pt-32 pb-20 border-b border-slate-800/60 reveal-section">
          <div className="atomest-container relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="atomest-badge-indigo inline-flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Our Mission & Vision</span>
              </div>

              <h1 className="atomest-section-title text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05] mb-4 text-balance">
                Engineering intelligent leverage for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-400">
                  ambitious businesses.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Atomest was founded to bridge the gap between complex artificial intelligence research and practical, reliable business infrastructure.
              </p>
            </div>
          </div>
        </section>

        {/* Narrative Section */}
        <section className="atomest-section bg-slate-900/40 border-b border-slate-800/60 reveal-section">
          <div className="atomest-container">
            <div className="max-w-3xl mx-auto space-y-8 text-slate-400 leading-relaxed text-base sm:text-lg">
              <div className="text-center">
                <h2 className="atomest-section-title text-3xl sm:text-5xl font-extrabold tracking-tight mb-6">
                  The software landscape has changed permanently.
                </h2>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                  For decades, businesses were forced to adopt rigid, disconnected SaaS platforms that required manual data entry, human coordination ping-pong, and constant administrative maintenance.
                </p>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                  At Atomest, we believe modern companies should operate with autonomous leverage. By combining high-performance modern web platforms with deterministic automation pipelines and grounded AI agents, we help businesses operate with unprecedented speed and efficiency.
                </p>
              </div>

              <div className="p-8 sm:p-10 rounded-3xl border border-slate-800 bg-slate-900 flex flex-col items-center text-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                  Our commercial focus is delivering high-converting AI Website Solutions and resilient AI Automation Pipelines, supported by cutting-edge AI Agents.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Engineering Principles */}
        <section className="atomest-section border-b border-slate-800/60 reveal-section">
          <div className="atomest-container">
            <div className="max-w-3xl mb-14">
              <div className="atomest-badge-indigo mb-3 inline-flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                <span>Core Values</span>
              </div>
              <h2 className="atomest-section-title text-3xl sm:text-5xl font-extrabold tracking-tight mb-3">
                Our engineering principles.
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                How we think, architect, and deliver every project.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {principles.map((principle, idx) => {
                const Icon = principle.icon;
                return (
                  <div
                    key={idx}
                    className="reveal-item p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900 hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400 mb-4 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-display font-bold text-lg text-slate-50 mb-2 group-hover:text-indigo-300 transition-colors">
                        {principle.title}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="atomest-section pt-20 sm:pt-28 pb-24 reveal-section">
          <div className="atomest-container">
            <div className="p-8 sm:p-16 rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden text-center shadow-2xl reveal-item">
              <div className="max-w-2xl mx-auto relative z-10 space-y-6">
                <h2 className="atomest-section-title text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
                  Ready to collaborate?
                </h2>
                <p className="text-base sm:text-lg text-slate-400 mb-8 leading-relaxed">
                  Start a project consultation with our lead solutions architects.
                </p>
                <Link
                  href="/contact"
                  className="atomest-btn-primary atomest-btn-lg inline-flex items-center gap-2 shadow-lg shadow-indigo-500/25"
                >
                  <span>Start a Project</span>
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
