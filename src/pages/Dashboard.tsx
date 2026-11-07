// src/pages/Dashboard.tsx
// Dashboard home — registry-driven, Apple discipline.
import { Link } from "wouter";
import { ArrowRight, Clock, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useModules, useLiveModules } from "@/hooks/use-modules";
import { useCredits } from "@/hooks/use-credits";
import { SEO } from "@/components/seo/SEO";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };

const statusConfig = {
  live:        { label: 'Live',        cls: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  beta:        { label: 'Beta',        cls: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  coming_soon: { label: 'Coming Soon', cls: 'bg-white/5 text-muted-foreground border-white/10' },
  disabled:    { label: 'Off',         cls: 'bg-white/5 text-muted-foreground border-white/10' },
};

export default function Dashboard() {
  const { user } = useAuth();
  const { data: credits } = useCredits();
  const liveModules = useLiveModules();
  const allModules = useModules();

  const firstName = (user?.user_metadata?.full_name as string | undefined)?.split(' ')[0] ?? 'there';

  return (
    <ProtectedRoute>
      <SEO title="Dashboard — Atomest" description="Your Atomest AI Employee dashboard." canonicalPath="/dashboard" />
      <DashboardLayout>
        <div className="max-w-4xl mx-auto px-8 py-10">

          {/* Header */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" className="mb-10">
            <h1
              className="font-semibold text-foreground mb-1"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--type-section)', lineHeight: 'var(--type-section-lh)' }}
            >
              Good to see you, {firstName}.
            </h1>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--type-body)' }}>
              Your AI Employees are ready to work.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={stagger} initial="hidden" animate="show"
            className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10"
          >
            {[
              { label: 'Credits remaining', value: credits?.balance?.toLocaleString() ?? '—', icon: Zap },
              { label: 'AI Employees available', value: String(liveModules.length), icon: Clock },
              { label: 'Lifetime credits used', value: credits?.lifetimeUsed?.toLocaleString() ?? '0', icon: ArrowRight },
            ].map((stat, i) => (
              <motion.div
                key={i} variants={fadeUp}
                className="p-5 rounded-[var(--radius-card)] bg-white/[0.03] border border-white/8"
              >
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">{stat.label}</p>
                <p className="text-2xl font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Live Employees */}
          {liveModules.length > 0 && (
            <section className="mb-10">
              <h2
                className="font-semibold text-foreground mb-4"
                style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--type-tile)', lineHeight: 'var(--type-tile-lh)' }}
              >
                Your Active Employees
              </h2>
              <motion.div
                variants={stagger} initial="hidden" animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {liveModules.map(mod => (
                  <motion.div key={mod.id} variants={fadeUp}>
                    <Link href={`/employees/${mod.id}`}>
                      <div className="group flex items-center gap-4 p-5 rounded-[var(--radius-card)] bg-white/[0.03] border border-white/8 hover:bg-white/[0.07] hover:border-white/15 transition-all duration-300 cursor-pointer">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0">
                          <mod.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-foreground text-sm truncate">{mod.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {mod.creditsRequired} credits · {mod.estimatedRuntime}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all shrink-0" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </section>
          )}

          {/* Coming Soon */}
          {allModules.filter(m => m.status === 'coming_soon').length > 0 && (
            <section>
              <h2
                className="font-semibold text-foreground mb-4"
                style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--type-tile)', lineHeight: 'var(--type-tile-lh)' }}
              >
                Coming to the Team
              </h2>
              <motion.div
                variants={stagger} initial="hidden" animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {allModules.filter(m => m.status === 'coming_soon').slice(0, 4).map(mod => {
                  const sc = statusConfig[mod.status];
                  return (
                    <motion.div key={mod.id} variants={fadeUp}>
                      <div className="flex items-center gap-4 p-5 rounded-[var(--radius-card)] bg-white/[0.015] border border-white/5 opacity-70">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center shrink-0">
                          <mod.icon className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-foreground text-sm truncate">{mod.name}</p>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${sc.cls} inline-block mt-1`}>
                            {sc.label}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </section>
          )}

        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
