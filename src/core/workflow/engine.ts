// src/core/workflow/engine.ts
// The WorkflowEngine — the heart of the platform.
//
// Every AI Employee execution flows through here. Modules never call
// AI providers, credits, analytics, or jobs directly. The engine handles
// all platform side-effects so modules stay focused on their domain logic.

import { getActiveProvider } from '../ai/providers';
import { jobService } from '../jobs/job-service';
import { creditsService } from '../credits/credits-service';
import { analyticsService } from '../analytics/analytics-service';
import { getModule } from '../registry/discovery';
import { InsufficientCreditsError } from '../credits/types';
import { ValidationError, AtomestError } from '../errors/types';
import type { Job } from '../jobs/types';
import type { WorkflowContext, WorkflowOutput } from './types';

export class WorkflowEngine {
  /**
   * Kick off a workflow for a given module.
   *
   * 1. Validates inputs against the module's Zod schema
   * 2. Checks credits (throws InsufficientCreditsError if insufficient)
   * 3. Creates a Job record (status: queued)
   * 4. Executes the workflow asynchronously
   * 5. Updates the Job record with the result (completed or failed)
   *
   * Returns the Job immediately (status: queued) so the UI can poll/subscribe.
   */
  async run(moduleId: string, rawInputs: unknown, userId: string): Promise<Job> {
    const module = getModule(moduleId);
    if (!module) {
      throw new Error(`Module "${moduleId}" not found in registry.`);
    }

    // 1. Validate inputs
    const parsed = module.inputSchema.safeParse(rawInputs);
    if (!parsed.success) {
      throw new ValidationError('Invalid inputs provided to workflow.', parsed.error);
    }
    const inputs = parsed.data;

    // 2. Credits check — must happen before job creation
    await creditsService.canRun(userId, module.creditsRequired);

    // 3. Create the job
    const job = await jobService.create({
      moduleId,
      userId,
      inputs: inputs as Record<string, unknown>,
    });

    analyticsService.emit('workflow_started', { moduleId, userId, jobId: job.id });

    // 4. Execute async — intentionally not awaited so we return job immediately
    void this._executeAsync(job, module, inputs, userId);

    return job;
  }

  private async _executeAsync(
    job: Job,
    module: Awaited<ReturnType<typeof getModule>>,
    inputs: unknown,
    userId: string,
  ): Promise<void> {
    if (!module) return;

    const startTime = Date.now();
    await jobService.update(job.id, {
      status: 'running',
      startedAt: new Date().toISOString(),
    });

    try {
      const provider = getActiveProvider();

      const ctx: WorkflowContext = {
        provider,
        userId,
        jobId: job.id,
        reportProgress: (message, percent) => {
          // Future: broadcast via Supabase Realtime
          console.debug(`[workflow:${job.id}] ${percent ?? '?'}% — ${message}`);
        },
      };

      const output: WorkflowOutput = await module.executeWorkflow(inputs, ctx);

      const runtime = Date.now() - startTime;

      // Platform side-effects — always in this order
      await creditsService.deduct(userId, module.creditsRequired, job.id);

      analyticsService.emit('workflow_completed', {
        moduleId: module.id,
        userId,
        jobId: job.id,
        runtime,
        creditsUsed: module.creditsRequired,
      });

      await jobService.update(job.id, {
        status: 'completed',
        output,
        creditsUsed: module.creditsRequired,
        completedAt: new Date().toISOString(),
      });

    } catch (err) {
      const runtime = Date.now() - startTime;
      const errorMessage = err instanceof Error ? err.message : String(err);
      const isCreditsError = err instanceof InsufficientCreditsError;

      if (!isCreditsError) {
        // Only refund if we actually started (credits were not the blocker)
        await creditsService.refundOnFailure(userId, module.creditsRequired, job.id);
      }

      analyticsService.emit('workflow_failed', {
        moduleId: module.id,
        userId,
        jobId: job.id,
        runtime,
        error: errorMessage,
      });

      await jobService.update(job.id, {
        status: 'failed',
        error: errorMessage,
        completedAt: new Date().toISOString(),
      });
    }
  }
}

// Singleton instance — import this everywhere instead of `new WorkflowEngine()`
export const workflowEngine = new WorkflowEngine();
