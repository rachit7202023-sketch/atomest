// src/modules/recruiter-ai/workflow.ts
// Domain logic for AI Recruiter. Pure function — no side effects.
// Side effects (credits, jobs, analytics) are handled by WorkflowEngine.

import { buildPrompt } from '@/core/workflow/prompt-loader';
import type { WorkflowContext, WorkflowOutput } from '@/core/workflow/types';
import type { RecruiterInput } from './schema';

export async function executeRecruiterWorkflow(
  inputs: RecruiterInput,
  ctx: WorkflowContext,
): Promise<WorkflowOutput> {
  ctx.reportProgress?.('Building your hiring kit…', 10);

  const { systemPrompt, userPrompt } = buildPrompt('recruiter-ai', {
    jobTitle:       inputs.jobTitle,
    company:        inputs.company,
    jobDescription: inputs.jobDescription,
    candidateData:  inputs.candidateData,
  });

  ctx.reportProgress?.('Analysing candidates with AI…', 30);

  const rawJson = await ctx.provider.generate(userPrompt, {
    systemPrompt,
    jsonMode: true,
    temperature: 0.4,
    maxTokens: 8192,
  });

  ctx.reportProgress?.('Structuring output blocks…', 85);

  let data: Record<string, unknown>;
  try {
    data = JSON.parse(rawJson) as Record<string, unknown>;
  } catch {
    throw new Error('AI returned invalid JSON. Please try again.');
  }

  ctx.reportProgress?.('Done.', 100);

  return buildOutput(data, inputs);
}

// ── Maps raw JSON → typed OutputBlock[] ──────────────────────────────────────

function buildOutput(data: Record<string, unknown>, inputs: RecruiterInput): WorkflowOutput {
  const blocks: WorkflowOutput['blocks'] = [];
  const summary = data.hiringSummary as Record<string, unknown> | undefined;
  const ranking = data.candidateRanking as Record<string, unknown>[] | undefined;

  // Summary block
  if (summary?.overview) {
    blocks.push({
      type: 'summary',
      title: `Hiring Summary — ${inputs.jobTitle} at ${inputs.company}`,
      content: String(summary.overview),
    });
  }

  // Candidate ranking as table
  if (ranking?.length) {
    blocks.push({
      type: 'table',
      title: 'Candidate Ranking',
      columns: ['Candidate', 'Score', 'Recommendation', 'Key Strength'],
      rows: ranking.map(c => [
        String(c.name ?? ''),
        `${c.overallScore ?? 0}/100`,
        String(c.recommendation ?? ''),
        (c.strengths as string[])?.[0] ?? '',
      ]),
    });
  }

  // Score block for top candidate
  if (ranking?.[0]) {
    const top = ranking[0];
    blocks.push({
      type: 'score',
      label: `Top Candidate: ${top.name}`,
      value: Number(top.overallScore ?? 0),
      max: 100,
      rationale: String(top.summary ?? ''),
    });
  }

  // Interview plan as checklist
  const interviewPlan = data.interviewPlan as { rounds?: Record<string, unknown>[] } | undefined;
  if (interviewPlan?.rounds?.length) {
    blocks.push({
      type: 'checklist',
      title: 'Interview Plan',
      items: interviewPlan.rounds.map(r => ({
        label: `Round ${r.round}: ${r.type} — ${r.duration} (${r.focus})`,
        priority: 'medium' as const,
      })),
    });
  }

  // Screening checklist
  const screening = data.screeningChecklist as { mustHave?: string[]; redFlags?: string[] } | undefined;
  if (screening?.mustHave?.length) {
    blocks.push({
      type: 'checklist',
      title: 'Screening Checklist',
      items: [
        ...(screening.mustHave ?? []).map(i => ({ label: `✓ ${i}`, priority: 'high' as const })),
        ...(screening.redFlags ?? []).map(i => ({ label: `⚠ ${i}`, priority: 'low' as const })),
      ],
    });
  }

  // Hiring timeline
  const timeline = data.hiringTimeline as { phases?: Record<string, unknown>[] } | undefined;
  if (timeline?.phases?.length) {
    blocks.push({
      type: 'timeline',
      title: `Hiring Timeline (~${(data.hiringTimeline as Record<string, unknown>)?.totalWeeks ?? '?'} weeks)`,
      events: timeline.phases.map(p => ({
        date: `Week ${p.startWeek}`,
        title: String(p.phase ?? ''),
        description: String(p.duration ?? ''),
        status: 'upcoming' as const,
      })),
    });
  }

  // Tech questions as markdown
  const techQ = data.techQuestions as Record<string, unknown>[] | undefined;
  if (techQ?.length) {
    const md = techQ.map((q, i) =>
      `**${i + 1}. ${q.question}**\n_${q.difficulty} · ${q.category}_\n\n${q.expectedAnswer}\n`
    ).join('\n---\n\n');
    blocks.push({ type: 'markdown', title: 'Technical Questions', content: md });
  }

  // Email templates as markdown
  const inviteEmail = data.inviteEmail as { subject?: string; body?: string } | undefined;
  if (inviteEmail?.body) {
    blocks.push({
      type: 'markdown',
      title: 'Interview Invite Email',
      content: `**Subject:** ${inviteEmail.subject}\n\n${inviteEmail.body}`,
    });
  }

  // LinkedIn post
  const linkedin = data.linkedInPost as { content?: string } | undefined;
  if (linkedin?.content) {
    blocks.push({
      type: 'markdown',
      title: 'LinkedIn Job Post',
      content: linkedin.content,
    });
  }

  // Recommendations
  if (ranking?.length) {
    blocks.push({
      type: 'recommendation',
      title: 'Hiring Recommendations',
      items: ranking.slice(0, 3).map(c => ({
        title: String(c.name ?? ''),
        description: `${c.recommendation} — ${c.summary}`,
        priority: c.recommendation === 'Strong Hire' ? 'high' as const
                : c.recommendation === 'Hire'        ? 'medium' as const
                : 'low' as const,
      })),
    });
  }

  return {
    title: `${inputs.jobTitle} — Hiring Kit`,
    blocks,
    rawData: data,
  };
}
