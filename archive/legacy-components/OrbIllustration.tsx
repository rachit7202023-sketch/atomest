import { Briefcase, TrendingUp, Search, HeadphonesIcon, Cpu, Sparkles, Zap } from "lucide-react";

// ─── Orbital illustration ────────────────────────────────────────────────────

const ORBIT_ICONS = [
  { Icon: Briefcase,      label: "RecruiterAI", angle:   0, r: 130, size: 36, delay: "0s"    },
  { Icon: TrendingUp,     label: "SalesAI",     angle:  51, r: 155, size: 32, delay: "0.4s"  },
  { Icon: Search,         label: "ResearchAI",  angle: 103, r: 125, size: 34, delay: "0.8s"  },
  { Icon: HeadphonesIcon, label: "SupportAI",   angle: 154, r: 152, size: 32, delay: "1.2s"  },
  { Icon: Cpu,            label: "AI Core",     angle: 206, r: 128, size: 34, delay: "1.6s"  },
  { Icon: Sparkles,       label: "Generative",  angle: 257, r: 150, size: 32, delay: "2.0s"  },
  { Icon: Zap,            label: "Automation",  angle: 309, r: 130, size: 36, delay: "2.4s"  },
];

const PARTICLES = [
  { x: "22%", y: "18%", s: 3, delay: "0s",    dur: "3.2s" },
  { x: "78%", y: "14%", s: 2, delay: "0.6s",  dur: "2.8s" },
  { x: "88%", y: "62%", s: 4, delay: "1.1s",  dur: "3.6s" },
  { x: "14%", y: "72%", s: 2, delay: "1.7s",  dur: "2.5s" },
  { x: "52%", y: "88%", s: 3, delay: "0.3s",  dur: "3.0s" },
  { x: "66%", y: "28%", s: 2, delay: "2.1s",  dur: "2.9s" },
  { x: "36%", y: "8%",  s: 3, delay: "0.9s",  dur: "3.4s" },
];

export function OrbIllustration() {
  return (
    <div
      className="relative select-none mx-auto scale-90 sm:scale-100"
      style={{ width: 380, height: 380 }}
      aria-hidden
    >
      {/* ── ambient glows ── */}
      <div
        className="absolute rounded-full"
        style={{
          inset: "10%",
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.18) 0%, transparent 70%)",
          filter: "blur(32px)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          inset: "28%",
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.22) 0%, transparent 80%)",
          filter: "blur(20px)",
        }}
      />

      {/* ── orbital track lines ── */}
      {[130, 153].map((r) => (
        <div
          key={r}
          className="absolute rounded-full border"
          style={{
            width:  r * 2,
            height: r * 2,
            top:    190 - r,
            left:   190 - r,
            borderColor: "rgba(139,92,246,0.13)",
          }}
        />
      ))}

      {/* ── outer slow spin wrapper ── */}
      <div
        className="absolute inset-0"
        style={{ animation: "orb-spin 28s linear infinite" }}
      >
        {ORBIT_ICONS.map(({ Icon, label, angle, r, size, delay }) => {
          const rad = (angle * Math.PI) / 180;
          const cx  = 190 + r * Math.cos(rad);
          const cy  = 190 + r * Math.sin(rad);
          return (
            <div
              key={label}
              className="absolute flex items-center justify-center rounded-xl"
              style={{
                width:  size + 12,
                height: size + 12,
                top:    cy - (size + 12) / 2,
                left:   cx - (size + 12) / 2,
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(59,130,246,0.08) 100%)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(139,92,246,0.22)",
                boxShadow: "0 2px 12px rgba(139,92,246,0.15)",
                /* counter-rotate so icons always face up */
                animation: `orb-counter 28s linear infinite ${delay}`,
              }}
            >
              <Icon
                style={{ width: size * 0.55, height: size * 0.55, color: "rgb(147,197,253)" }}
              />
            </div>
          );
        })}
      </div>

      {/* ── glass orb ── */}
      <div
        className="absolute rounded-full flex items-center justify-center"
        style={{
          width:  120,
          height: 120,
          top:    130,
          left:   130,
          background:
            "radial-gradient(circle at 38% 32%, rgba(255,255,255,0.18) 0%, rgba(59,130,246,0.12) 60%, transparent 100%)",
          backdropFilter: "blur(14px)",
          border: "1.5px solid rgba(139,92,246,0.30)",
          boxShadow:
            "0 0 0 1px rgba(59,130,246,0.10), 0 8px 40px rgba(59,130,246,0.25), inset 0 1px 0 rgba(255,255,255,0.18)",
        }}
      >
        {/* inner glow ring */}
        <div
          className="absolute rounded-full"
          style={{
            inset: 8,
            border: "1px solid rgba(147,197,253,0.18)",
          }}
        />
        {/* logo */}
        <img
          src="/logo.svg"
          alt="Atomest"
          width={52}
          height={52}
          className="rounded-xl relative z-10"
          style={{
            filter: "drop-shadow(0 0 12px rgba(59,130,246,0.55))",
          }}
        />
      </div>

      {/* ── floating particles ── */}
      {PARTICLES.map(({ x, y, s, delay, dur }, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width:  s,
            height: s,
            left:   x,
            top:    y,
            background: "rgba(147,197,253,0.6)",
            boxShadow: "0 0 6px rgba(147,197,253,0.8)",
            animation: `pulse-glow ${dur} ease-in-out infinite alternate ${delay}`,
          }}
        />
      ))}
    </div>
  );
}
