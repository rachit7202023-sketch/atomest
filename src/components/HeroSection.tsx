import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Search, ArrowRight, Sparkles, Type, QrCode, KeyRound, Palette, Image as ImageIcon, Calculator, Braces } from "lucide-react";
import { motion } from "framer-motion";
import { useSearch } from "@/hooks/useSearch";

// ─── Orbital illustration ────────────────────────────────────────────────────

const ORBIT_ICONS = [
  { Icon: Type,        label: "Text",       angle:   0, r: 130, size: 36, delay: "0s"    },
  { Icon: Braces,      label: "JSON",       angle:  51, r: 155, size: 32, delay: "0.4s"  },
  { Icon: QrCode,      label: "QR",         angle: 103, r: 125, size: 34, delay: "0.8s"  },
  { Icon: KeyRound,    label: "Password",   angle: 154, r: 152, size: 32, delay: "1.2s"  },
  { Icon: Palette,     label: "Color",      angle: 206, r: 128, size: 34, delay: "1.6s"  },
  { Icon: ImageIcon,   label: "Image",      angle: 257, r: 150, size: 32, delay: "2.0s"  },
  { Icon: Calculator,  label: "Calculator", angle: 309, r: 130, size: 36, delay: "2.4s"  },
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

function OrbIllustration() {
  return (
    <div
      className="relative select-none"
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
            "radial-gradient(ellipse at 50% 50%, rgba(167,139,250,0.22) 0%, transparent 80%)",
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
                  "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(139,92,246,0.08) 100%)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(139,92,246,0.22)",
                boxShadow: "0 2px 12px rgba(139,92,246,0.15)",
                /* counter-rotate so icons always face up */
                animation: `orb-counter 28s linear infinite ${delay}`,
              }}
            >
              <Icon
                style={{ width: size * 0.55, height: size * 0.55, color: "rgb(167,139,250)" }}
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
            "radial-gradient(circle at 38% 32%, rgba(255,255,255,0.18) 0%, rgba(139,92,246,0.12) 60%, transparent 100%)",
          backdropFilter: "blur(14px)",
          border: "1.5px solid rgba(167,139,250,0.30)",
          boxShadow:
            "0 0 0 1px rgba(139,92,246,0.10), 0 8px 40px rgba(139,92,246,0.25), inset 0 1px 0 rgba(255,255,255,0.18)",
        }}
      >
        {/* inner glow ring */}
        <div
          className="absolute rounded-full"
          style={{
            inset: 8,
            border: "1px solid rgba(167,139,250,0.18)",
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
            filter: "drop-shadow(0 0 12px rgba(139,92,246,0.55))",
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
            background: "rgba(255,255,255,0.4)",
            boxShadow: `0 0 ${s * 4}px rgba(255,255,255,0.2)`,
            animation: `particle-float ${dur} ease-in-out infinite ${delay}`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Hero inline search ───────────────────────────────────────────────────────

function HeroSearch() {
  const { query, setQuery, results } = useSearch("");
  const [open, setOpen]              = useState(false);
  const wrapperRef                   = useRef<HTMLDivElement>(null);
  const [, setLocation]              = useLocation();

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  function go() {
    if (!query.trim()) return;
    setLocation(`/tools?q=${encodeURIComponent(query)}`);
    setOpen(false);
  }

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl">
      {/* input row */}
      <div
        className="hero-search-ring group flex items-center gap-4 rounded-3xl px-6 h-[72px] transition-all duration-500 relative overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.02)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.05)",
          boxShadow: "0 10px 40px -10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        <Search className="h-6 w-6 shrink-0 text-muted-foreground group-focus-within:text-primary transition-colors duration-500" />
        <input
          type="text"
          className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/40 text-lg sm:text-xl font-medium outline-none z-10"
          placeholder="What are you looking for?"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => e.key === "Enter" && go()}
          data-testid="input-hero-search"
        />
      </div>

      {/* dropdown results */}
      {open && query && results.length > 0 && (
        <div
          className="absolute top-full left-0 right-0 mt-2 rounded-xl border z-50 overflow-hidden"
          style={{
            background: "var(--color-card, hsl(var(--card)))",
            border: "1px solid rgba(139,92,246,0.20)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          }}
        >
          <div className="p-2">
            {results.slice(0, 5).map((tool) => {
              const Icon = tool.icon;
              return (
                <Link key={tool.id} href={`/tools/${tool.slug}`}>
                  <div
                    className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <div className="bg-primary/10 p-2 rounded-lg shrink-0">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-foreground">{tool.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{tool.description}</div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          {results.length > 5 && (
            <div
              className="px-4 py-3 border-t border-border text-center text-xs font-medium text-primary cursor-pointer hover:bg-accent/50 transition-colors flex items-center justify-center gap-1"
              onClick={go}
            >
              View all {results.length} results <ArrowRight className="h-3 w-3" />
            </div>
          )}
        </div>
      )}

      {open && query && results.length === 0 && (
        <div
          className="absolute top-full left-0 right-0 mt-2 rounded-xl border z-50 p-5 text-center text-sm text-muted-foreground"
          style={{
            background: "var(--color-card, hsl(var(--card)))",
            border: "1px solid rgba(139,92,246,0.18)",
          }}
        >
          No results for "{query}"
        </div>
      )}
    </div>
  );
}

// ─── Trust indicators ─────────────────────────────────────────────────────────

const TRUST = [
  { emoji: "🛡",  title: "Privacy First",      sub: "Runs entirely in your browser"   },
  { emoji: "⚡",  title: "Instant Results",    sub: "Lightning-fast performance"      },
  { emoji: "💻",  title: "Works Everywhere",   sub: "Desktop, tablet, and mobile"     },
  { emoji: "🔒",  title: "Secure by Design",   sub: "Your data stays on your device"  },
  { emoji: "✨",  title: "No Sign-up",         sub: "Open and start instantly"        },
];

// ─── Main export ──────────────────────────────────────────────────────────────

export function HeroSection() {
  return (
    <>
      {/* keyframes injected once */}
      <style>{`
        @keyframes orb-spin    { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
        @keyframes orb-counter { from { transform: rotate(0deg);   } to { transform: rotate(-360deg); } }
        @keyframes particle-float {
          0%,100% { transform: translateY(0px)   opacity: 1;   }
          50%     { transform: translateY(-10px); opacity: 0.5; }
        }
        @keyframes badge-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .hero-search-ring:focus-within {
          border-color: rgba(139,92,246,0.55) !important;
          box-shadow:   0 0 0 3px rgba(139,92,246,0.12), 0 2px 20px rgba(139,92,246,0.15) !important;
        }
      `}</style>

      <section className="relative overflow-hidden">
        {/* ── background layer ── */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          {/* deep dark base gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 90% 70% at 50% -5%, rgba(124,58,237,0.14) 0%, transparent 65%)",
            }}
          />
          {/* left orb */}
          <div
            className="absolute -left-64 top-0 w-[560px] h-[560px] rounded-full"
            style={{
              background: "rgba(109,40,217,0.09)",
              filter: "blur(100px)",
            }}
          />
          {/* right orb */}
          <div
            className="absolute -right-64 bottom-0 w-[480px] h-[480px] rounded-full"
            style={{
              background: "rgba(139,92,246,0.07)",
              filter: "blur(90px)",
            }}
          />
          {/* dot grid */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(rgba(139,92,246,0.18) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
              opacity: 0.35,
              maskImage:
                "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
            }}
          />
        </div>

        {/* ── content ── */}
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center pt-20 pb-16 md:pt-28 md:pb-24">

            {/* ── LEFT COLUMN ── */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-start text-left max-w-xl"
            >

              {/* Announcement badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                <Sparkles
                  className="h-3.5 w-3.5 shrink-0 animate-pulse text-primary/80"
                />
                The Internet's Toolbox
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="font-black tracking-tighter leading-[0.95] mb-8"
                style={{ fontSize: "clamp(3.5rem, 8vw, 6.5rem)" }}
              >
                <span className="text-foreground block drop-shadow-sm">Your Browser</span>
                <span
                  className="block drop-shadow-md"
                  style={{
                    background:
                      "linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.5) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Supercharged.
                </span>
              </motion.h1>

              {/* Sub-headline */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="text-muted-foreground text-lg sm:text-2xl leading-relaxed mb-12 max-w-xl opacity-80 font-medium"
              >
                Thirty-one premium browser tools designed for speed, privacy, and simplicity. No accounts. No server uploads.
              </motion.p>

              {/* Search bar */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                className="w-full mb-12 relative z-20"
              >
                <HeroSearch />
              </motion.div>

              {/* CTA buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12 relative z-10"
              >
                {/* Removed Secondary Button */}
              </motion.div>

              {/* Trust indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 w-full">
                {TRUST.map(({ emoji, title, sub }, i) => (
                  <div key={title} className="flex items-start gap-2.5 group">
                    {/* vertical divider before every 3rd+ item on sm */}
                    <span className="text-base leading-none mt-0.5">{emoji}</span>
                    <div>
                      <div className="text-xs font-semibold text-foreground/90 leading-tight">{title}</div>
                      <div className="text-xs text-muted-foreground leading-tight mt-0.5">{sub}</div>
                    </div>
                    {/* separator dot between columns */}
                    {i % 2 === 0 && (
                      <div className="hidden sm:block absolute" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── RIGHT COLUMN — Orbital illustration ── */}
            <div className="hidden lg:flex justify-center items-center">
              <OrbIllustration />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
