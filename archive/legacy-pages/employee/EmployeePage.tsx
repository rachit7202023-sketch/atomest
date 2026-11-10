// src/pages/employee/EmployeePage.tsx
// Dynamic page for any AI Employee. Reads from the module registry.
// Route: /employees/:id

import { useState } from 'react';
import { useParams, Link } from 'wouter';
import { ArrowLeft, Clock, Zap, CheckCircle2, AlertCircle, Loader2, PlayCircle, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthGate } from '@/components/auth/AuthGate';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { OutputRenderer } from '@/components/output/OutputRenderer';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/seo/SEO';
import { useModule } from '@/hooks/use-modules';
import { workflowEngine } from '@/core/workflow/engine';
import { useAuth } from '@/contexts/AuthContext';
import { jobService } from '@/core/jobs/job-service';
import { InsufficientCreditsError } from '@/core/credits/types';
import type { WorkflowOutput } from '@/core/workflow/types';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

type RunState = 'idle' | 'running' | 'done' | 'error';

export default function EmployeePage() {
  const params = useParams<{ id: string }>();
  const moduleId = params?.id ?? '';
  const mod = useModule(moduleId);
  const { user } = useAuth();

  const [runState, setRunState] = useState<RunState>('idle');
  const [output, setOutput] = useState<WorkflowOutput | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [progress, setProgress] = useState('');
  const [activeTemplate, setActiveTemplate] = useState<Record<string, unknown> | undefined>();
  const [showDemo, setShowDemo] = useState(false);

  if (!mod) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-full text-center px-6 py-20">
          <p className="text-muted-foreground mb-4">AI Employee not found.</p>
          <Link href="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const handleSubmit = async (inputs: unknown) => {
    if (!user) return;
    setRunState('running');
    setOutput(null);
    setErrorMsg('');
    setProgress('Starting your AI Employee…');

    try {
      const job = await workflowEngine.run(moduleId, inputs, user.id);

      // Poll until the job completes (simple polling, upgrade to realtime later)
      let attempts = 0;
      const poll = async (): Promise<void> => {
        attempts++;
        if (attempts > 120) throw new Error('Job timed out after 2 minutes.');
        const updated = await jobService.getById(job.id);
        if (!updated) throw new Error('Job not found.');

        if (updated.status === 'completed') {
          setOutput(updated.output as WorkflowOutput);
          setRunState('done');
        } else if (updated.status === 'failed') {
          throw new Error(updated.error ?? 'Job failed.');
        } else {
          setProgress(updated.status === 'running' ? 'Processing…' : 'Queued…');
          await new Promise(r => setTimeout(r, 1000));
          return poll();
        }
      };
      await poll();

    } catch (err) {
      const message = err instanceof InsufficientCreditsError
        ? `You need ${(err as InsufficientCreditsError).required} credits but only have ${(err as InsufficientCreditsError).balance}. Top up to continue.`
        : err instanceof Error ? err.message : 'Something went wrong.';
      setErrorMsg(message);
      setRunState('error');
    }
  };

  const isLive = mod.status === 'live' || mod.status === 'beta';

  return (
    <>
      <SEO
        title={`${mod.name} — Atomest`}
        description={mod.tagline}
        canonicalPath={`/employees/${mod.id}`}
      />
      <DashboardLayout>
        <div className="max-w-5xl mx-auto px-8 py-10">

          {/* Breadcrumb */}
          <Link href="/dashboard">
            <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 cursor-pointer">
              <ArrowLeft className="w-3.5 h-3.5" />
              Dashboard
            </div>
          </Link>

          {/* Header */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" className="flex items-start gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <mod.icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1
                className="font-semibold text-foreground mb-1"
                style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--type-tile)', lineHeight: 'var(--type-tile-lh)' }}
              >
                {mod.name}
              </h1>
              <p className="text-muted-foreground text-sm">{mod.tagline}</p>
              <div className="flex flex-wrap items-center gap-4 mt-3">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Zap className="w-3.5 h-3.5" /> {mod.creditsRequired} credits
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" /> {mod.estimatedRuntime}
                </span>
                {mod.demo && (
                  <Button
                    variant="secondary"
                    size="sm"
                    className="h-7 text-[11px] rounded-full px-3"
                    onClick={() => {
                      setShowDemo(true);
                      setRunState('done');
                      setOutput(mod.demo!.output);
                    }}
                  >
                    <PlayCircle className="w-3.5 h-3.5 mr-1.5" />
                    {mod.demo.inputLabel}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>

          {!isLive ? (
            /* Coming Soon state */
            <div className="text-center py-20 border border-dashed border-white/15 rounded-[var(--radius-card)]">
              <Clock className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
              <h2 className="font-semibold text-foreground mb-2">Coming Soon</h2>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                {mod.name} is currently in development. You'll be notified when it's ready to hire.
              </p>
            </div>
          ) : (
            /* Main split layout */
            <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6">

              {/* Left: Input Panel */}
              <motion.div
                variants={fadeUp} initial="hidden" animate="show"
                className="flex flex-col gap-6"
              >
                {/* Templates */}
                {mod.templates && mod.templates.length > 0 && (
                  <div className="p-5 rounded-[var(--radius-card)] bg-white/[0.03] border border-white/8">
                    <h2 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                      Templates
                    </h2>
                    <div className="flex flex-col gap-2">
                      {mod.templates.map(t => (
                        <button
                          key={t.id}
                          onClick={() => setActiveTemplate(t.presetInputs)}
                          className="text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors group"
                        >
                          <div className="font-medium text-sm text-foreground mb-0.5 group-hover:text-primary transition-colors">{t.name}</div>
                          <div className="text-xs text-muted-foreground line-clamp-1">{t.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input Panel */}
                <div className="p-6 rounded-[var(--radius-card)] bg-white/[0.03] border border-white/8">
                  <h2 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-5">
                    Brief
                  </h2>
                  <AuthGate>
                    {({ isAuthenticated, onClick }) => (
                      <div onClickCapture={onClick} className={!isAuthenticated ? "cursor-pointer" : ""}>
                        <div className={!isAuthenticated ? "pointer-events-none" : ""}>
                          <mod.InputComponent
                            onSubmit={handleSubmit}
                            isLoading={runState === 'running'}
                            initialValues={activeTemplate}
                          />
                        </div>
                      </div>
                    )}
                  </AuthGate>
                </div>
              </motion.div>

              {/* Right: Output Panel */}
              <div className="min-h-[400px]">
                <AnimatePresence mode="wait">
                  {runState === 'idle' && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full flex flex-col items-center justify-center text-center border border-dashed border-white/10 rounded-[var(--radius-card)] p-10"
                    >
                      <mod.icon className="w-10 h-10 text-white/20 mb-4" />
                      <p className="text-muted-foreground text-sm max-w-xs">
                        Fill in the brief and hire your {mod.name}. Results appear here.
                      </p>
                    </motion.div>
                  )}

                  {runState === 'running' && (
                    <motion.div
                      key="running"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full flex flex-col items-center justify-center gap-4 border border-dashed border-white/10 rounded-[var(--radius-card)] p-10"
                    >
                      <Loader2 className="w-8 h-8 text-primary animate-spin" />
                      <p className="text-sm text-muted-foreground animate-pulse">{progress}</p>
                    </motion.div>
                  )}

                  {runState === 'error' && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-start gap-3 p-5 rounded-[var(--radius-card)] border border-red-500/25 bg-red-500/5"
                    >
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-red-400 text-sm mb-1">Something went wrong</p>
                        <p className="text-sm text-muted-foreground">{errorMsg}</p>
                        <button
                          onClick={() => setRunState('idle')}
                          className="text-xs text-primary hover:underline mt-2"
                        >
                          Try again
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {runState === 'done' && output && (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="flex items-center gap-2 mb-5 text-sm">
                        {showDemo ? (
                          <>
                            <Eye className="w-4 h-4 text-blue-400" />
                            <span className="font-medium text-blue-400">Demo Mode</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span className="font-medium text-emerald-400">Hiring kit ready</span>
                          </>
                        )}
                      </div>
                      <OutputRenderer output={output} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>
    </>
  );
}
