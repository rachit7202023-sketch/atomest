import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { Bot, GitFork, Workflow, BarChart3, ArrowRight, Play, Pause, Sparkles, ShieldCheck, Zap } from "lucide-react";

interface Hotspot {
  id: string;
  title: string;
  category: string;
  tagline: string;
  icon: typeof Bot;
  route: string;
  position: { top: string; left: string }; // percentage relative to container
  badge: string;
  accent: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "agents",
    title: "AI Agents",
    category: "Conversational & Voice Intelligence",
    tagline: "Voice receptionists, autonomous 24/7 client triage & custom agents.",
    icon: Bot,
    route: "/services/ai-voice-receptionist",
    position: { top: "28%", left: "20%" },
    badge: "Active Agent Engine",
    accent: "from-violet-500/20 via-purple-500/10 to-transparent border-violet-500/40 text-violet-300",
  },
  {
    id: "sales",
    title: "Lead Generation & Sales",
    category: "Autonomous Pipeline",
    tagline: "Instant sub-60s qualification, smart triage & lead discovery.",
    icon: GitFork,
    route: "/services/lead-automation",
    position: { top: "28%", left: "78%" },
    badge: "Speed-to-Lead Verified",
    accent: "from-blue-500/20 via-cyan-500/10 to-transparent border-blue-500/40 text-blue-300",
  },
  {
    id: "workflows",
    title: "Workflow Automation",
    category: "Operational Systems",
    tagline: "Self-healing event workflows, CRM sync & zero manual data entry.",
    icon: Workflow,
    route: "/services/crm-workflow-automation",
    position: { top: "72%", left: "20%" },
    badge: "Deterministic Execution",
    accent: "from-indigo-500/20 via-sky-500/10 to-transparent border-indigo-500/40 text-indigo-300",
  },
  {
    id: "integrations",
    title: "Integrations & BI",
    category: "Unified Business Intelligence",
    tagline: "Multi-platform telemetry, real-time sync & connected analytics.",
    icon: BarChart3,
    route: "/services",
    position: { top: "72%", left: "78%" },
    badge: "Real-time Telemetry",
    accent: "from-emerald-500/20 via-teal-500/10 to-transparent border-emerald-500/40 text-emerald-300",
  },
];

export function HeroVideoCommandCenter() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState<string>("agents");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const togglePlayback = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const currentHotspot = HOTSPOTS.find((h) => h.id === activeHotspot) || HOTSPOTS[0];

  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-[#08090D] border border-[#252938] shadow-[0_20px_80px_rgba(0,0,0,0.8)]">
      {/* Top Telemetry Chrome Bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#0B0C10]/90 backdrop-blur-xl border-b border-[#252938] z-20 relative">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/40 border border-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/40 border border-amber-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60 border border-emerald-500 animate-pulse" />
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-[#A0A5B5]">
            <span className="text-[#8B5CF6] font-semibold">ATOMEST_OS</span>
            <span>::</span>
            <span>AUTOMATION_COMMAND_CENTER_V2</span>
          </div>
        </div>

        {/* Center Live Engine Status */}
        <div className="flex items-center gap-2 text-[11px] font-mono px-3 py-1 rounded-full bg-[#151824] border border-[#252938] text-[#F5F6FA]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-semibold text-emerald-400">ENGINE LIVE</span>
          <span className="text-[#646A80] hidden md:inline">|</span>
          <span className="text-[#A0A5B5] hidden md:inline">4 Connected Subsystems</span>
        </div>

        {/* Video Controls & Motion Status */}
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlayback}
            className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-[#151824] hover:bg-[#1E2235] border border-[#252938] text-[#A0A5B5] hover:text-[#F5F6FA] text-xs font-mono flex items-center gap-1.5 transition-colors"
            title={isPlaying ? "Pause cinematic loop" : "Play cinematic loop"}
            aria-label={isPlaying ? "Pause background animation" : "Play background animation"}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span className="hidden sm:inline">Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Play</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Video Viewport Container (16:9 cinematic aspect ratio preserved) */}
      <div className="relative w-full aspect-[16/9] min-h-[360px] sm:min-h-[480px] lg:min-h-[580px] bg-[#020617] flex items-center justify-center overflow-hidden">
        {/* The Native Cinematic Video Layer */}
        {!prefersReducedMotion ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster="/assets/atomest-core/atomest-hero-poster.jpg"
            className="absolute inset-0 w-full h-full object-cover object-center filter contrast-[1.05] brightness-[0.95]"
          >
            <source src="/assets/atomest-core/atomest-hero-command-center.webm" type="video/webm" />
            <source src="/assets/atomest-core/atomest-hero-command-center.mp4" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        ) : (
          <img
            src="/assets/atomest-core/atomest-hero-poster.jpg"
            alt="Atomest AI Command Center Interface"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        )}

        {/* Radial Ambient Dark Vignette & Edge Blending (Preserves text contrast) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090D] via-transparent to-[#08090D]/50 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(8,9,13,0.75)_100%)] pointer-events-none" />

        {/* Desktop Interactive Hotspot Overlays (Placed over the 4 video quadrants) */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none">
          {HOTSPOTS.map((hotspot) => {
            const Icon = hotspot.icon;
            const isSelected = activeHotspot === hotspot.id;

            return (
              <div
                key={hotspot.id}
                style={{ top: hotspot.position.top, left: hotspot.position.left }}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
              >
                <div
                  onMouseEnter={() => setActiveHotspot(hotspot.id)}
                  onClick={() => setActiveHotspot(hotspot.id)}
                  className={`group cursor-pointer transition-all duration-300 p-3 rounded-2xl backdrop-blur-xl border ${
                    isSelected
                      ? "bg-[#0B0D14]/90 border-[#8B5CF6] shadow-[0_0_35px_rgba(139,92,246,0.35)] scale-105"
                      : "bg-[#0B0D14]/65 border-[#252938]/80 hover:border-[#8B5CF6]/60 hover:bg-[#0B0D14]/85"
                  } w-[240px]`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#151824] border border-[#252938] flex items-center justify-center text-[#8B5CF6] group-hover:bg-[#8B5CF6] group-hover:text-white transition-colors">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-display font-bold text-xs text-[#F5F6FA]">
                        {hotspot.title}
                      </span>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
                  </div>

                  <p className="text-[10px] text-[#A0A5B5] leading-snug line-clamp-2">
                    {hotspot.tagline}
                  </p>

                  <div className="mt-2 pt-2 border-t border-[#1C1F2B] flex items-center justify-between text-[9px] font-mono">
                    <span className="text-[#C4B5FD]">{hotspot.badge}</span>
                    <Link
                      href={hotspot.route}
                      className="text-[#8B5CF6] hover:text-white flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Central Core Hologram Label */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center">
          <div className="px-4 py-1.5 rounded-full bg-[#08090D]/85 backdrop-blur-md border border-[#8B5CF6]/40 shadow-[0_0_30px_rgba(139,92,246,0.25)] inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono tracking-wider text-[#F5F6FA] uppercase font-bold">
              Atomest Autonomous Engine
            </span>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Adaptive Capability Bar (Allows touchscreen selection without video obscuration) */}
      <div className="lg:hidden p-4 sm:p-6 bg-[#0B0C10] border-t border-[#252938] space-y-3">
        <div className="text-[11px] font-mono uppercase text-[#8B5CF6] tracking-wider flex items-center justify-between">
          <span>Connected System Capabilities</span>
          <span className="text-[10px] text-[#646A80]">Tap to inspect</span>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {HOTSPOTS.map((h) => {
            const Icon = h.icon;
            const isSelected = activeHotspot === h.id;

            return (
              <button
                key={h.id}
                onClick={() => setActiveHotspot(h.id)}
                className={`p-3 rounded-xl text-left border transition-all ${
                  isSelected
                    ? "bg-[#151824] border-[#8B5CF6] text-white shadow-md shadow-[#8B5CF6]/15"
                    : "bg-[#10121A] border-[#252938] text-[#A0A5B5] hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span className="text-xs font-bold font-display text-[#F5F6FA] truncate">
                    {h.title}
                  </span>
                </div>
                <p className="text-[10px] text-[#A0A5B5] line-clamp-1">
                  {h.tagline}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Hotspot Action Drawer */}
        <div className="p-3.5 rounded-xl bg-[#151824] border border-[#8B5CF6]/30 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-[#F5F6FA]">{currentHotspot.title}</div>
            <div className="text-[10px] text-[#A0A5B5]">{currentHotspot.category}</div>
          </div>
          <Link
            href={currentHotspot.route}
            className="atomest-btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5"
          >
            <span>Explore</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
