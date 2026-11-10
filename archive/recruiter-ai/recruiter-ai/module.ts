// src/modules/recruiter-ai/module.ts
// AI Recruiter — Module Registration
//
// This file is all the platform needs.
// Drop this file + its siblings into src/modules/ and it auto-registers.
// No AppRouter edits. No registry file edits. No dashboard edits.

import { Briefcase } from 'lucide-react';
import { recruiterInputSchema } from './schema';
import { executeRecruiterWorkflow } from './workflow';
import { RecruiterInputForm } from './ui/InputForm';
import type { AIEmployeeModule } from '@/core/registry/types';
import type { WorkflowContext } from '@/core/workflow/types';

const module: AIEmployeeModule = {
  // ── Identity ──────────────────────────────────────────────────────────────
  id:          'recruiter-ai',
  name:        'AI Recruiter',
  tagline:     'Hire faster. Screen smarter.',
  description: 'Upload job descriptions and resumes. Your AI Recruiter screens candidates, ranks them, drafts interview plans, writes outreach emails, and builds a complete hiring kit — in under a minute.',

  // ── Visual ────────────────────────────────────────────────────────────────
  icon:        Briefcase,
  accentColor: 'hsl(212 100% 55%)',

  // ── Marketplace Metadata ─────────────────────────────────────────────────
  version:     '1.0.0',
  author:      'Atomest',
  category:    'HR',
  tags:        ['recruiting', 'hiring', 'resume', 'interview', 'hr'],

  // ── Platform Config ───────────────────────────────────────────────────────
  status:              'live',
  pricingTier:         'starter',
  creditsRequired:     10,
  estimatedRuntime:    '~30 seconds',
  estimatedTimeSaved:  '3–4 hours per hire',

  // ── Capabilities ─────────────────────────────────────────────────────────
  supportsFiles:       true,
  supportsStreaming:   false,
  supportedFileTypes:  ['pdf', 'txt'],

  // ── Runtime ──────────────────────────────────────────────────────────────
  inputSchema:      recruiterInputSchema,
  InputComponent:   RecruiterInputForm,
  executeWorkflow:  (inputs: unknown, ctx: WorkflowContext) =>
    executeRecruiterWorkflow(inputs as Parameters<typeof executeRecruiterWorkflow>[0], ctx),

  // ── Templates ────────────────────────────────────────────────────────────
  templates: [
    {
      id: 'senior-engineer',
      name: 'Senior Frontend Engineer',
      description: 'Screening for a React/TypeScript expert with system design skills.',
      presetInputs: {
        jobTitle: 'Senior Frontend Engineer',
        company: 'Acme Corp',
        jobDescription: 'We are looking for a Senior Frontend Engineer to lead our web team. Must have 5+ years of experience with React, TypeScript, and modern CSS (Tailwind). Experience with performance optimization and architecture is required.',
      }
    },
    {
      id: 'sdr',
      name: 'Sales Development Rep',
      description: 'High-volume outbound sales role requiring excellent communication.',
      presetInputs: {
        jobTitle: 'Sales Development Representative',
        company: 'GlobalTech',
        jobDescription: 'Seeking an energetic SDR to drive outbound pipeline. 1-2 years experience in B2B SaaS sales. Must have experience with cold calling, email sequencing (Outreach/Salesloft), and CRM hygiene.',
      }
    }
  ],

  // ── Demo ─────────────────────────────────────────────────────────────────
  demo: {
    inputLabel: 'View Senior Engineer Demo',
    output: {
      title: 'Hiring Kit: Senior Frontend Engineer',
      blocks: [
        {
          type: 'summary',
          title: 'Candidate Overview',
          content: 'We screened 3 candidates against the Senior Frontend Engineer requirements. Alex Chen is the strongest technical fit, followed by Sarah Jenkins. Michael Ross requires further technical screening.'
        },
        {
          type: 'score',
          label: 'Strong Fit - Proceed to Technical Interview',
          value: 92,
          max: 100
        },
        {
          type: 'checklist',
          title: 'Recommended Next Steps',
          items: [
            { label: 'Schedule Technical Screen with Alex Chen: Focus on state management and architecture.', checked: false },
            { label: 'Send Take-Home Assignment to Sarah Jenkins: Assess React fundamentals.', checked: false },
            { label: 'Reject Michael Ross: Lacks required TypeScript experience.', checked: true }
          ]
        }
      ]
    }
  }
};

export default module;
