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
      description: "We don't build AI for novelty. Every website, pipeline, and agent we engineer is designed to eliminate manual labor hours or measurably accelerate client pipeline.",
    },
    {
      title: "Deterministic & Grounded Systems",
      icon: ShieldCheck,
      description: "We combine generative intelligence with deterministic business logic. When accuracy is paramount, our systems enforce strict schema validation and human-in-the-loop checkpoints.",
    },
    {
      title: "Sovereign Data Governance",
      icon: Cpu,
      description: "Your business secrets, customer conversations, and internal procedures never train public models. We enforce zero data retention and strict tenant boundaries.",
    },
    {
      title: "Direct Engineer Collaboration",
      icon: Code2,
      description: "You partner directly with senior solutions architects and software engineers who build and maintain your code, with no bureaucratic intermediaries.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>About Atomest | Intelligent AI Technology Solutions</title>
        <meta
          name="description"
          content="Learn about Atomest's mission, engineering principles, and team. We build intelligent websites, powerful automations, and AI agents for ambitious businesses."
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
                <span>Our Mission & Vision</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-[#F5F6FA] mb-6 leading-tight">
                Engineering intelligent leverage for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6]">ambitious businesses.</span>
              </h1>

              <p className="text-lg sm:text-xl text-[#A0A5B5] max-w-2xl mx-auto leading-relaxed mb-8">
                Atomest was founded to bridge the gap between complex artificial intelligence research and practical, reliable business infrastructure.
              </p>
            </div>
          </div>
        </section>

        {/* Narrative Section */}
        <section className="atomest-section bg-[#0B0D14] border-y border-[#252938]">
          <div className="atomest-container">
            <div className="max-w-3xl mx-auto space-y-6 text-[#A0A5B5] leading-relaxed text-base sm:text-lg">
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#F5F6FA]">
                The software landscape has changed permanently.
              </h2>
              <p>
                For decades, businesses were forced to adopt rigid, disconnected SaaS platforms that required manual data entry, human coordination ping-pong, and constant administrative maintenance.
              </p>
              <p>
                At Atomest, we believe modern companies should operate with autonomous leverage. By combining high-performance modern web platforms with deterministic automation pipelines and grounded AI agents, we help businesses operate with unprecedented speed and efficiency.
              </p>
              <div className="p-6 rounded-2xl bg-[#10121A] border border-[#252938] text-sm text-[#C4B5FD] flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#8B5CF6] shrink-0 mt-0.5" />
                <span>
                  Our commercial focus is delivering high-converting AI Website Solutions and resilient AI Automation Pipelines, supported by cutting-edge AI Agents and proprietary software tools.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Engineering Principles */}
        <section className="atomest-section">
          <div className="atomest-container">
            <div className="max-w-3xl mb-12">
              <div className="atomest-badge-blue mb-3">
                <Layers className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span>Core Values</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#F5F6FA] mb-3">
                Our engineering principles.
              </h2>
              <p className="text-sm sm:text-base text-[#A0A5B5]">
                How we think, architect, and deliver every project.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {principles.map((principle, idx) => {
                const Icon = principle.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 sm:p-8 rounded-2xl bg-[#10121A] border border-[#252938] hover:border-[#8B5CF6]/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-[#151824] border border-[#252938] flex items-center justify-center text-[#8B5CF6] mb-4">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-display font-bold text-lg text-[#F5F6FA] mb-2">
                        {principle.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#A0A5B5] leading-relaxed">
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
        <section className="atomest-section pt-0">
          <div className="atomest-container">
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#151824] to-[#10121A] border border-[#252938] relative overflow-hidden text-center">
              <div className="max-w-2xl mx-auto relative z-10">
                <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#F5F6FA] mb-4">
                  Ready to collaborate?
                </h2>
                <p className="text-sm sm:text-base text-[#A0A5B5] mb-8 leading-relaxed">
                  Start a project consultation with our lead software architects.
                </p>
                <Link
                  href="/contact"
                  className="atomest-btn-primary inline-flex items-center gap-2"
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
