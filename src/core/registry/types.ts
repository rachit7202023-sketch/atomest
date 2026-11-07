// src/core/registry/types.ts
// The full AIEmployeeModule interface every module must implement.
// This is the only contract between a module and the platform.

import type { z } from 'zod';
import type React from 'react';
import type { WorkflowContext, WorkflowOutput } from '../workflow/types';

export type ModuleStatus = 'live' | 'beta' | 'coming_soon' | 'disabled';
export type PricingTier = 'free' | 'starter' | 'pro' | 'enterprise';

export interface ModuleRoute {
  path: string;
  component: React.ComponentType;
}

export interface InputComponentProps {
  onSubmit: (inputs: unknown) => void;
  isLoading: boolean;
  initialValues?: Record<string, unknown>;
}

export interface ModuleTemplate {
  id: string;
  name: string;
  description: string;
  presetInputs: Record<string, unknown>;
}

export interface AIEmployeeModule {
  // ── Identity ─────────────────────────────────────────────────────────────
  id: string;                  // URL-safe slug e.g. 'recruiter-ai'
  name: string;                // Display name e.g. 'AI Recruiter'
  tagline: string;             // One-liner e.g. 'Hire faster. Screen smarter.'
  description: string;         // Full paragraph for detail pages

  // ── Visual ───────────────────────────────────────────────────────────────
  icon: React.ComponentType<{ className?: string }>;
  accentColor?: string;        // Optional module-specific accent (CSS color)

  // ── Marketplace Metadata ──────────────────────────────────────────────────
  version: string;             // Semver e.g. '1.0.0'
  author: string;              // e.g. 'Atomest'
  category: string;            // e.g. 'HR', 'Sales', 'Content', 'Research'
  tags: string[];              // e.g. ['resume', 'hiring', 'recruiting']

  // ── Platform Config ───────────────────────────────────────────────────────
  status: ModuleStatus;
  pricingTier: PricingTier;
  creditsRequired: number;
  estimatedRuntime: string;    // Human-readable e.g. '~30 seconds'
  estimatedTimeSaved: string;  // e.g. '3–4 hours per hire'

  // ── Capabilities ─────────────────────────────────────────────────────────
  supportsFiles: boolean;
  supportsStreaming: boolean;
  supportedFileTypes?: string[]; // e.g. ['pdf', 'docx']

  // ── Runtime ──────────────────────────────────────────────────────────────
  inputSchema: z.ZodSchema;
  InputComponent: React.ComponentType<InputComponentProps>;
  executeWorkflow: (inputs: unknown, ctx: WorkflowContext) => Promise<WorkflowOutput>;

  // ── Routing ───────────────────────────────────────────────────────────────
  /** Additional routes beyond the base /employees/:id */
  routes?: ModuleRoute[];
  // ── Templates & Demo ─────────────────────────────────────────────────────
  templates?: ModuleTemplate[];
  demo?: {
    inputLabel: string;
    output: WorkflowOutput;
  };
}
