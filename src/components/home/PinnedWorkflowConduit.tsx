import { useEffect, useRef, useState } from "react";
import {
  Phone,
  Bot,
  CheckCircle2,
  Layers,
  Clock,
  MessageSquare,
  Sparkles,
  Zap,
  Terminal,
  Activity,
  ArrowRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface WorkflowMilestone {
  step: string;
  label: string;
  tagline: string;
  icon: typeof Phone;
  color: string;
  accentHex: string;
  logEvent: string;
  logDetail: string;
  payload: Record<string, string>;
}

const MILESTONES: WorkflowMilestone[] = [
  {
    step: "01",
    label: "Inbound Customer Trigger",
    tagline: "Omnichannel Lead Ingestion",
    icon: Phone,
    color: "text-indigo-400",
    accentHex: "#6366F1",
    logEvent: "INBOUND_CALL_RECEIVED",
    logDetail: "Customer calls after business hours from high-intent Google search ad.",
    payload: {
      source: "Google Local Services",
      caller: "+1 (415) 890-XX14",
      timestamp: "21:42:08 UTC",
      status: "ROUTED_TO_VOICE_AGENT",
    },
  },
  {
    step: "02",
    label: "24/7 AI Voice Receptionist",
    tagline: "Natural Conversational Triage",
    icon: Bot,
    color: "text-violet-400",
    accentHex: "#8B5CF6",
    logEvent: "VOICE_SYNTHESIS_ENGAGED",
    logDetail: "AI receptionist greets caller, identifies commercial HVAC outage, and captures issue specifics.",
    payload: {
      intent: "Commercial Emergency Repair",
      propertyType: "Retail Facility (4,200 sq ft)",
      severity: "CRITICAL_HEATING_FAILURE",
      latency: "420ms response",
    },
  },
  {
    step: "03",
    label: "Sub-60s Qualification",
    tagline: "Autonomous Lead Scoring",
    icon: CheckCircle2,
    color: "text-cyan-400",
    accentHex: "#06B6D4",
    logEvent: "QUALIFICATION_SCORE_GENERATED",
    logDetail: "Lead verified within service territory, budget confirmed ($1,500+ threshold), and scored 96/100.",
    payload: {
      budgetConfirmed: "TRUE ($2,500 approved)",
      serviceArea: "San Francisco Metro (Zone 1)",
      leadScore: "96 / 100 [HIGH_PRIORITY]",
    },
  },
  {
    step: "04",
    label: "Deterministic CRM Sync",
    tagline: "Zero-Handoff Data Reconciliation",
    icon: Layers,
    color: "text-blue-400",
    accentHex: "#3B82F6",
    logEvent: "CRM_RECORD_INJECTED",
    logDetail: "Contact, service history, and audio transcript injected into HubSpot and Google Sheets automatically.",
    payload: {
      crmTarget: "HubSpot CRM + Airtable Backup",
      recordId: "REC_89104_COMMERCIAL",
      fieldsUpdated: "14 custom attributes",
      errorRate: "0.00% [VERIFIED]",
    },
  },
  {
    step: "05",
    label: "Calendar Slot Reservation",
    tagline: "Autonomous Schedule Dispatch",
    icon: Clock,
    color: "text-emerald-400",
    accentHex: "#10B981",
    logEvent: "DISPATCH_CALENDAR_LOCKED",
    logDetail: "Technician route checked; optimal arrival window locked in calendar with travel buffer.",
    payload: {
      technician: "Lead Tech #4 (Zone 1 Certified)",
      scheduledWindow: "Tomorrow 08:30 - 10:00 AM",
      dispatchStatus: "AUTO_CONFIRMED",
    },
  },
  {
    step: "06",
    label: "Multi-Channel Confirmation",
    tagline: "Immediate Customer Closure",
    icon: MessageSquare,
    color: "text-teal-400",
    accentHex: "#14B8A6",
    logEvent: "OMNICHANNEL_CONFIRMATION_SENT",
    logDetail: "Instant SMS with technician tracking link and confirmation email delivered before call ends.",
    payload: {
      smsDelivery: "DELIVERED (0.8s)",
      emailConfirmation: "SENT WITH CALENDAR_INVITE",
      leadState: "CLOSED_TO_CALENDAR",
    },
  },
];

export function PinnedWorkflowConduit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const conduitBeamRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const prefersReduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const container = containerRef.current;
    const beam = conduitBeamRef.current;

    const ctx = gsap.context(() => {
      // Tie the central laser conduit beam to scroll scrub
      if (beam) {
        gsap.fromTo(
          beam,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: container,
              start: "top 60%",
              end: "bottom 80%",
              scrub: 0.8,
            },
          }
        );
      }

      // Step node reveal and monitor activation triggers
      const stepItems = container.querySelectorAll<HTMLElement>("[data-workflow-node]");
      stepItems.forEach((item, index) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 65%",
          end: "bottom 35%",
          onEnter: () => setActiveStep(index),
          onEnterBack: () => setActiveStep(index),
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const current = MILESTONES[activeStep] || MILESTONES[0];

  return (
    <section
      ref={containerRef}
      id="workflow"
      className="atomest-section relative overflow-hidden bg-[#07080D] border-b border-slate-800/80"
    >
      {/* Background radial ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-indigo-900/10 via-violet-900/10 to-transparent rounded-full blur-[180px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="atomest-container relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-center mx-auto">
          <div className="atomest-eyebrow mb-3 inline-flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="atomest-eyebrow-text">Signature Operational Engine</span>
          </div>
          <h2 className="atomest-section-title text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-balance text-slate-50">
            One continuous pipeline.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-400">
              Zero manual handoffs.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Watch a live customer enquiry flow from initial voice trigger to booked appointment and synchronized CRM record in under 60 seconds.
          </p>
        </div>

        {/* 2-Column Showcase: Sticky Cockpit (Left) + Vertical Conduit Track (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Sticky Real-time Telemetry Cockpit */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-4">
            <div className="rounded-3xl bg-[#090B12]/95 border border-[#252938] shadow-[0_20px_70px_rgba(0,0,0,0.8)] backdrop-blur-2xl p-6 sm:p-8 relative overflow-hidden">
              {/* Corner Ambient Glow */}
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-700"
                style={{ background: current.accentHex }}
                aria-hidden="true"
              />

              {/* Terminal Chrome Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-5 text-[11px] font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-slate-300 font-semibold">EVENT_STREAM_V2</span>
                </div>
                <span
                  className="px-2.5 py-0.5 rounded-full border text-[10px] font-semibold transition-colors duration-500"
                  style={{
                    borderColor: `${current.accentHex}40`,
                    background: `${current.accentHex}15`,
                    color: current.accentHex,
                  }}
                >
                  PHASE {current.step} / 06
                </span>
              </div>

              {/* Active Event Title & Description */}
              <div className="space-y-2 mb-6">
                <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                  TRIGGERED EVENT
                </div>
                <div className="font-display font-extrabold text-xl sm:text-2xl text-slate-50">
                  {current.label}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-mono">
                  {current.logDetail}
                </p>
              </div>

              {/* Live JSON Data Payload Box */}
              <div className="rounded-2xl bg-[#05060A] border border-slate-800/90 p-4 font-mono text-[11px] text-slate-300 space-y-1.5 shadow-inner">
                <div className="text-[10px] text-slate-500 mb-2 flex items-center justify-between">
                  <span>TELEMETRY_PAYLOAD</span>
                  <span className="text-emerald-400 font-semibold">[VALIDATED]</span>
                </div>
                {Object.entries(current.payload).map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-4">
                    <span className="text-slate-500 shrink-0">{k}:</span>
                    <span className="text-indigo-300 text-right truncate font-medium">"{v}"</span>
                  </div>
                ))}
              </div>

              {/* Bottom Telemetry Ticker */}
              <div className="mt-5 pt-4 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  <span>PIPELINE ENGINE: OPTIMAL</span>
                </div>
                <span className="text-indigo-400">HANDOFF: &lt; 0.5s</span>
              </div>
            </div>
          </div>

          {/* Right: Vertical Conduit Pipeline */}
          <div className="lg:col-span-7 relative pl-4 sm:pl-8">
            {/* Background Conduit Rail */}
            <div className="absolute left-8 sm:left-12 top-6 bottom-6 w-0.5 bg-slate-800/80 -translate-x-1/2" />

            {/* Glowing Active Laser Conduit Beam */}
            <div
              ref={conduitBeamRef}
              className="absolute left-8 sm:left-12 top-6 bottom-6 w-1 bg-gradient-to-b from-indigo-500 via-violet-400 to-cyan-400 -translate-x-1/2 origin-top shadow-[0_0_12px_rgba(99,102,241,0.8)]"
              style={{ transform: "scaleY(0)" }}
            />

            {/* Milestones Stack */}
            <div className="space-y-6 sm:space-y-8">
              {MILESTONES.map((item, idx) => {
                const Icon = item.icon;
                const isActive = activeStep === idx;
                const isPassed = activeStep > idx;

                return (
                  <div
                    key={item.step}
                    data-workflow-node
                    onClick={() => setActiveStep(idx)}
                    className={`cursor-pointer group relative flex items-start gap-5 sm:gap-6 p-5 sm:p-6 rounded-2xl border transition-all duration-300 ${
                      isActive
                        ? "bg-[#0B0D16] border-indigo-500/70 shadow-[0_0_40px_rgba(99,102,241,0.2)] scale-[1.02]"
                        : isPassed
                        ? "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                        : "bg-slate-950/40 border-slate-900 hover:border-slate-800 opacity-60"
                    }`}
                  >
                    {/* Node Circle Anchor on Conduit */}
                    <div
                      className={`relative z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                        isActive
                          ? "bg-indigo-600 border-white text-white shadow-[0_0_20px_rgba(99,102,241,0.9)] scale-110"
                          : isPassed
                          ? "bg-slate-800 border-indigo-500/50 text-indigo-300"
                          : "bg-slate-900 border-slate-800 text-slate-500"
                      }`}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>

                    {/* Step Body */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-3 mb-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-semibold">
                          MILESTONE 0{item.step}
                        </span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                            isActive
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                              : isPassed
                              ? "bg-indigo-500/10 text-indigo-400"
                              : "text-slate-600"
                          }`}
                        >
                          {isActive ? "ACTIVE STREAM" : isPassed ? "COMPLETE" : "QUEUED"}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-lg sm:text-xl text-slate-50 mb-1 group-hover:text-indigo-300 transition-colors">
                        {item.label}
                      </h3>
                      <div className="text-xs font-mono text-slate-400 mb-2">
                        {item.tagline}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {item.logDetail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
