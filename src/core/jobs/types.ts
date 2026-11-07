// src/core/jobs/types.ts

export type JobStatus = 'queued' | 'running' | 'completed' | 'failed' | 'cancelled';

export interface Job {
  id: string;
  moduleId: string;
  userId: string;
  status: JobStatus;
  inputs?: Record<string, unknown>;
  output?: unknown;               // Serialized WorkflowOutput
  error?: string;
  creditsUsed?: number;
  startedAt?: string;             // ISO timestamp
  completedAt?: string;           // ISO timestamp
  createdAt: string;              // ISO timestamp
}

export interface CreateJobPayload {
  moduleId: string;
  userId: string;
  inputs?: Record<string, unknown>;
}

export interface UpdateJobPayload {
  status?: JobStatus;
  output?: unknown;
  error?: string;
  creditsUsed?: number;
  startedAt?: string;
  completedAt?: string;
}
