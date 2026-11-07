// src/core/jobs/job-service.ts
// All job persistence goes through this service.
// The WorkflowEngine uses this — modules never touch it directly.

import { supabase } from '@/lib/supabase';
import type { Job, CreateJobPayload, UpdateJobPayload } from './types';

const TABLE = 'jobs';

export const jobService = {
  async create(payload: CreateJobPayload): Promise<Job> {
    const { data, error } = await supabase
      .from(TABLE)
      .insert({
        module_id: payload.moduleId,
        user_id: payload.userId,
        inputs: payload.inputs ?? null,
        status: 'queued',
      })
      .select()
      .single();

    if (error) throw new Error(`Failed to create job: ${error.message}`);
    return mapRow(data);
  },

  async update(jobId: string, payload: UpdateJobPayload): Promise<Job> {
    const updateData: Record<string, unknown> = {};
    if (payload.status !== undefined)      updateData.status = payload.status;
    if (payload.output !== undefined)      updateData.output = payload.output;
    if (payload.error !== undefined)       updateData.error = payload.error;
    if (payload.creditsUsed !== undefined) updateData.credits_used = payload.creditsUsed;
    if (payload.startedAt !== undefined)   updateData.started_at = payload.startedAt;
    if (payload.completedAt !== undefined) updateData.completed_at = payload.completedAt;

    const { data, error } = await supabase
      .from(TABLE)
      .update(updateData)
      .eq('id', jobId)
      .select()
      .single();

    if (error) throw new Error(`Failed to update job ${jobId}: ${error.message}`);
    return mapRow(data);
  },

  async getById(jobId: string): Promise<Job | null> {
    const { data, error } = await supabase
      .from(TABLE)
      .select()
      .eq('id', jobId)
      .single();

    if (error) return null;
    return mapRow(data);
  },

  async getByUser(userId: string, limit = 20): Promise<Job[]> {
    const { data, error } = await supabase
      .from(TABLE)
      .select()
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw new Error(`Failed to fetch jobs: ${error.message}`);
    return (data ?? []).map(mapRow);
  },

  async getByModule(userId: string, moduleId: string, limit = 20): Promise<Job[]> {
    const { data, error } = await supabase
      .from(TABLE)
      .select()
      .eq('user_id', userId)
      .eq('module_id', moduleId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw new Error(`Failed to fetch module jobs: ${error.message}`);
    return (data ?? []).map(mapRow);
  },
};

// Map snake_case DB row → camelCase Job
function mapRow(row: Record<string, unknown>): Job {
  return {
    id: row.id as string,
    moduleId: row.module_id as string,
    userId: row.user_id as string,
    status: row.status as Job['status'],
    inputs: row.inputs as Record<string, unknown> | undefined,
    output: row.output,
    error: row.error as string | undefined,
    creditsUsed: row.credits_used as number | undefined,
    startedAt: row.started_at as string | undefined,
    completedAt: row.completed_at as string | undefined,
    createdAt: row.created_at as string,
  };
}
