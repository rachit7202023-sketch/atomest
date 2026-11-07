// src/core/credits/credits-service.ts
// Standalone credits engine. Every workflow asks canRun() first.
// On failure, refundOnFailure() is always called.
// Nothing else in the application should touch credit balances.

import { supabase } from '@/lib/supabase';
import { InsufficientCreditsError } from './types';
import type { UserCredits } from './types';

const TABLE = 'user_credits';
const LEDGER_TABLE = 'credit_transactions';

export const creditsService = {
  /**
   * Check if the user has enough credits to run a workflow.
   * Throws InsufficientCreditsError if not.
   * Must be called BEFORE creating a Job.
   */
  async canRun(userId: string, required: number): Promise<void> {
    const balance = await this.getBalance(userId);
    if (balance < required) {
      throw new InsufficientCreditsError(balance, required);
    }
  },

  /**
   * Deduct credits after a successful workflow completion.
   * Records the transaction in the ledger for auditing.
   */
  async deduct(userId: string, amount: number, jobId?: string): Promise<void> {
    const { error } = await supabase.rpc('deduct_credits', {
      p_user_id: userId,
      p_amount: amount,
      p_job_id: jobId ?? null,
    });
    if (error) throw new Error(`Credits deduction failed: ${error.message}`);
  },

  /**
   * Refund credits when a workflow fails.
   * Should always be called in the catch block of WorkflowEngine.
   */
  async refundOnFailure(userId: string, amount: number, jobId: string): Promise<void> {
    const { error } = await supabase.rpc('refund_credits', {
      p_user_id: userId,
      p_amount: amount,
      p_job_id: jobId,
    });
    if (error) {
      // Log but don't throw — refund failure should not cascade into another error
      console.error(`[credits] Refund failed for user ${userId}, job ${jobId}:`, error.message);
    }
  },

  /**
   * Get the current credit balance for a user.
   * Returns 0 if no row exists (new user).
   */
  async getBalance(userId: string): Promise<number> {
    const { data, error } = await supabase
      .from(TABLE)
      .select('balance')
      .eq('user_id', userId)
      .single();

    if (error || !data) return 0;
    return data.balance as number;
  },

  /**
   * Get full credit info for a user.
   */
  async getUserCredits(userId: string): Promise<UserCredits | null> {
    const { data } = await supabase
      .from(TABLE)
      .select('*')
      .eq('user_id', userId)
      .single();

    if (!data) return null;
    return {
      userId: data.user_id as string,
      balance: data.balance as number,
      lifetimeUsed: data.lifetime_used as number,
      updatedAt: data.updated_at as string,
    };
  },

  /**
   * Add credits to a user (called from billing webhooks / admin).
   */
  async addCredits(userId: string, amount: number, reason: string): Promise<void> {
    const { error } = await supabase.rpc('add_credits', {
      p_user_id: userId,
      p_amount: amount,
      p_reason: reason,
    });
    if (error) throw new Error(`Failed to add credits: ${error.message}`);
  },
};
