import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  Bot,
  GitFork,
  Workflow,
  BarChart3,
  Globe,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Layers,
  Zap,
  Activity,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CapabilityItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  badge: string;
  description: string;
  icon: typeof Bot;
  route: string;
  color: string;
  accentHex: string;
  borderClass: string;
  glowClass: string;
  metricLabel: string;
  metricValue: string;
  deliverables: string[];
}

const CAPABILITIES: CapabilityItem[] = [
  {
    id: "agents",
    number: "01",
    title: "AI Agents",
    tagline: "Conversational & Voice Intelligence",
    badge: "Active Voice & Chat",
    description:
      "24/7 AI voice receptionists, customer support copilots, and intelligent triage agents that answer calls, resolve questions, and book appointments without hallucinating.",
    icon: Bot,
    route: "/services/ai-voice-receptionist",
    color: "text-violet-400",
    accentHex: "#8B5CF6",
    borderClass: "border-violet-500/30 hover:border-violet-500/70",
    glowClass: "shadow-[0_20px_60px_-15px_rgba(139,92,246,0.3)]",
    metricLabel: "Response Latency",
    metricValue: "Sub-Second",
    deliverables: [
      "AI voice receptionist & automated booking",
      "Grounded 24/7 customer support assistants",
      "Inbound lead qualification agents",
      "Document-based internal SOP copilots",
    ],
  },
  {
    id: "sales",
    number: "02",
    title: "Lead Generation & Sales",
    tagline: "Speed-to-Lead & Pipelines",
    badge: "Sub-60s Response",
    description:
      "Automated lead capture, instant qualification, and multi-channel routing that contacts prospects in under 60 seconds before they look at competitors.",
    icon: GitFork,
    route: "/services/lead-automation",
    color: "text-blue-400",
    accentHex: "#3B82F6",
    borderClass: "border-blue-500/30 hover:border-blue-500/70",
    glowClass: "shadow-[0_20px_60px_-15px_rgba(59,130,246,0.3)]",
    metricLabel: "Speed-to-Lead",
    metricValue: "< 60s Verified",
    deliverables: [
      "Instant lead capture & SMS / chat alerts",
      "Automated lead scoring & qualification",
      "Speed-to-Lead notification workflows",
      "Multi-channel follow-up sequences",
    ],
  },
  {
    id: "workflows",
    number: "03",
    title: "Workflow Automation",
    tagline: "Deterministic Business Systems",
    badge: "Zero Manual Drag",
    description:
      "Connect your CRMs, calendars, inboxes, and spreadsheets. Replace repetitive manual copy-pasting with self-healing, automated business processes.",
    icon: Workflow,
    route: "/services/crm-workflow-automation",
    color: "text-indigo-400",
    accentHex: "#6366F1",
    borderClass: "border-indigo-500/30 hover:border-indigo-500/70",
    glowClass: "shadow-[0_20px_60px_-15px_rgba(99,102,241,0.3)]",
    metricLabel: "Handoff Reliability",
    metricValue: "100% Deterministic",
    deliverables: [
      "CRM & Google Sheets synchronization",
      "Calendar scheduling & appointment workflows",
      "Error-resilient webhook pipelines",
      "Automated client onboarding handoffs",
    ],
  },
  {
    id: "integrations",
    number: "04",
    title: "Integrations & BI",
    tagline: "Unified Business Intelligence",
    badge: "Connected Telemetry",
    description:
      "Connect your existing software platforms into one synchronized data fabric with real-time operational telemetry, live reporting, and automated alerts.",
    icon: BarChart3,
    route: "/services",
    color: "text-emerald-400",
    accentHex: "#10B981",
    borderClass: "border-emerald-500/30 hover:border-emerald-500/70",
    glowClass: "shadow-[0_20px_60px_-15px_rgba(16,185,129,0.3)]",
    metricLabel: "Data Sync Rate",
    metricValue: "Real-Time Telemetry",
    deliverables: [
      "Multi-app integration & API bridges",
      "Real-time operational dashboard sync",
      "Cross-platform data reconciliation",
      "Executive metrics & automated alerts",
    ],
  },
];

export function PinnedCapabilitiesShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current || !trackRef.current) return;

    const prefersReduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const section = sectionRef.current;
    const track = trackRef.current;

    const ctx = gsap.context(() => {
      // Use matchMedia to cleanly separate desktop pinned scrub vs mobile layout
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const getScrollDistance = () => track.scrollWidth - window.innerWidth + 120;

        // Horizontal scrub tween
        const scrollTween = gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1.2,
            start: "top top",
            end: () => `+=${getScrollDistance() + 600}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // Update HUD progress line
              if (progressLineRef.current) {
                gsap.to(progressLineRef.current, {
                  scaleX: self.progress,
                  duration: 0.1,
                  ease: "none",
                  transformOrigin: "left center",
                });
              }
              // Calculate active card index (0 to 4)
              const idx = Math.min(
                Math.floor(self.progress * (CAPABILITIES.length + 1)),
                CAPABILITIES.length
              );
              setActiveIndex(idx);
            },
          },
        });

        // Parallax background drift
        gsap.to(".capabilities-bg-orb", {
          x: -250,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getScrollDistance()}`,
            scrub: 2,
          },
        });
      });

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative overflow-hidden bg-[#05060A] border-b border-slate-800/80 min-h-screen flex flex-col justify-center py-20 lg:py-0"
    >
      {/* Background Cybernetic Ambient Glows */}
      <div
        className="capabilities-bg-orb absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-indigo-600/10 via-violet-600/10 to-transparent rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="capabilities-bg-orb absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/10 via-cyan-600/10 to-transparent rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Top Pinned HUD Bar */}
      <div className="atomest-container relative z-20 pt-8 sm:pt-14 pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
          <div>
            <div className="atomest-eyebrow mb-3 inline-flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span className="atomest-eyebrow-text">Intelligent System Architecture</span>
            </div>
            <h2 className="atomest-section-title text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-50 text-balance">
              Four Connected Nodes.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-400">
                Zero Operational Drag.
              </span>
            </h2>
          </div>

          {/* Desktop HUD Telemetry Indicator */}
          <div className="hidden lg:flex flex-col items-end gap-2">
            <div className="flex items-center gap-3 text-xs font-mono text-slate-400 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>STAGE: NODE 0{Math.min(activeIndex + 1, 4)} // 04</span>
              <span className="text-slate-600">|</span>
              <span className="text-indigo-400">SCROLL TO INSPECT DECK</span>
            </div>
            {/* Progress line */}
            <div className="w-48 h-1 bg-slate-800/80 rounded-full overflow-hidden">
              <div
                ref={progressLineRef}
                className="w-full h-full bg-gradient-to-r from-violet-500 via-indigo-400 to-cyan-400 origin-left scale-x-0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Capabilities Horizontal Track Container */}
      <div className="relative z-20 w-full overflow-x-auto lg:overflow-visible no-scrollbar pb-6 lg:pb-12">
        <div
          ref={trackRef}
          className="flex items-stretch gap-6 px-6 sm:px-12 lg:px-20 min-w-max will-change-transform"
        >
          {CAPABILITIES.map((cap, idx) => {
            const Icon = cap.icon;
            const isHighlight = activeIndex === idx;

            return (
              <div
                key={cap.id}
                className={`w-[340px] sm:w-[420px] lg:w-[460px] shrink-0 p-7 sm:p-9 rounded-3xl bg-[#090B12]/95 border ${cap.borderClass} ${cap.glowClass} backdrop-blur-2xl transition-all duration-500 flex flex-col justify-between group relative overflow-hidden`}
              >
                {/* Circuit Grid Background Pattern */}
                <div
                  className="absolute inset-0 bg-[radial-gradient(#252938_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Top Corner Glow */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-20 pointer-events-none transition-opacity duration-500 group-hover:opacity-40"
                  style={{ background: cap.accentHex }}
                  aria-hidden="true"
                />

                <div className="relative z-10">
                  {/* Card Header Bar */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110"
                        style={{
                          background: `${cap.accentHex}15`,
                          borderColor: `${cap.accentHex}40`,
                          color: cap.accentHex,
                        }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                          NODE {cap.number}
                        </div>
                        <div className="text-xs font-mono font-semibold" style={{ color: cap.accentHex }}>
                          {cap.badge}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[10px] font-mono text-slate-500 uppercase">
                        {cap.metricLabel}
                      </div>
                      <div className="text-xs font-mono font-bold text-slate-200">
                        {cap.metricValue}
                      </div>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-50 mb-2 group-hover:text-indigo-300 transition-colors">
                    {cap.title}
                  </h3>
                  <div className="text-xs font-mono text-slate-400 mb-4">
                    // {cap.tagline}
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {cap.description}
                  </p>
                </div>

                <div className="relative z-10">
                  {/* Deliverables Checklist */}
                  <div className="space-y-2.5 pt-5 border-t border-slate-800/80 mb-6">
                    {cap.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2
                          className="w-4 h-4 shrink-0 mt-0.5"
                          style={{ color: cap.accentHex }}
                        />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Link Button */}
                  <Link
                    href={cap.route}
                    className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-slate-100 transition-all duration-300 group-hover:border-indigo-500/60"
                  >
                    <span>Inspect {cap.title} Capabilities</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}

          {/* 5th Terminal: Foundational Web Platforms & Funnels */}
          <div className="w-[340px] sm:w-[420px] lg:w-[460px] shrink-0 p-7 sm:p-9 rounded-3xl bg-gradient-to-b from-[#0F111D] to-[#07080F] border border-indigo-500/40 shadow-[0_20px_60px_-15px_rgba(99,102,241,0.25)] backdrop-blur-2xl flex flex-col justify-between group relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center text-indigo-400">
                  <Globe className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-semibold">
                  FOUNDATIONAL STOREFRONT
                </span>
              </div>

              <div className="text-[11px] font-mono uppercase tracking-wider text-indigo-400 mb-1">
                PLATFORM FOUNDATION
              </div>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-50 mb-3">
                High-Performance Web Platforms
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                The authoritative digital flagship and conversion engine that powers every automated system. Built with sub-second speeds to turn every visitor into a qualified lead.
              </p>
            </div>

            <div className="relative z-10">
              <div className="space-y-2.5 pt-5 border-t border-slate-800/80 mb-6">
                {[
                  "Mobile-first, sub-second page performance",
                  "Built-in conversion funnels & lead captures",
                  "Direct integration with AI voice & CRM APIs",
                  "Complete editorial handover documentation",
                ].map((item, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2.5 text-xs text-indigo-200">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/services/premium-business-websites"
                className="atomest-btn-primary inline-flex items-center justify-center gap-2 w-full py-3 text-xs font-semibold shadow-[0_0_30px_rgba(99,102,241,0.35)]"
              >
                <span>Explore Web Platforms</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
