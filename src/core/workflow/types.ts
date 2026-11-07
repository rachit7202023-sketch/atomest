// src/core/workflow/types.ts
// Shared types flowing through the WorkflowEngine.

import type { IAIProvider } from '../ai/types';

// ── WorkflowContext ────────────────────────────────────────────────────────────
// Injected by the engine into every module's executeWorkflow() call.
// Modules receive services through context — never import them directly.

export interface WorkflowContext {
  /** The active AI provider — module doesn't know which one */
  provider: IAIProvider;
  /** Authenticated user ID */
  userId: string;
  /** The job this execution belongs to */
  jobId: string;
  /** Emit a progress update visible to the UI (optional) */
  reportProgress?: (message: string, percent?: number) => void;
}

// ── OutputBlock ────────────────────────────────────────────────────────────────
// Every AI Employee returns an array of these blocks.
// The OutputRenderer maps each block type to its visual component.

export interface SummaryBlock {
  type: 'summary';
  title: string;
  content: string;
}

export interface ChecklistItem {
  label: string;
  checked?: boolean;
  priority?: 'high' | 'medium' | 'low';
}

export interface ChecklistBlock {
  type: 'checklist';
  title: string;
  items: ChecklistItem[];
}

export interface TableBlock {
  type: 'table';
  title?: string;
  columns: string[];
  rows: string[][];
}

export interface ScoreBlock {
  type: 'score';
  label: string;
  value: number;
  max: number;
  rationale?: string;
  color?: 'green' | 'yellow' | 'red' | 'blue';
}

export interface ChartDataset {
  label: string;
  data: number[];
  color?: string;
}

export interface ChartBlock {
  type: 'chart';
  title?: string;
  chartType: 'bar' | 'line' | 'pie';
  labels: string[];
  datasets: ChartDataset[];
}

export interface MarkdownBlock {
  type: 'markdown';
  title?: string;
  content: string;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description?: string;
  status?: 'done' | 'active' | 'upcoming';
}

export interface TimelineBlock {
  type: 'timeline';
  title?: string;
  events: TimelineEvent[];
}

export interface RecommendationItem {
  title: string;
  description: string;
  priority?: 'high' | 'medium' | 'low';
  icon?: string;
}

export interface RecommendationBlock {
  type: 'recommendation';
  title?: string;
  items: RecommendationItem[];
}

export type OutputBlock =
  | SummaryBlock
  | ChecklistBlock
  | TableBlock
  | ScoreBlock
  | ChartBlock
  | MarkdownBlock
  | TimelineBlock
  | RecommendationBlock;

// ── WorkflowOutput ─────────────────────────────────────────────────────────────

export interface WorkflowOutput {
  /** Human-readable title for this output (shown in History) */
  title: string;
  /** The structured blocks the OutputRenderer will display */
  blocks: OutputBlock[];
  /** Optional raw data for export (JSON/CSV) */
  rawData?: unknown;
  /** Optional generated file paths in Supabase Storage */
  attachments?: string[];
}
