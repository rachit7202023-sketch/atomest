# How to Build an AI Employee Module

Building a new AI Employee takes minutes. You don't need to touch routing, auth, or billing.

## 1. Create the Folder
Create a new folder in `src/modules/`, e.g., `src/modules/blog-writer/`.

## 2. Define the Schema (`schema.ts`)
Define the input data your AI needs using Zod.
```typescript
import { z } from 'zod';

export const blogInputSchema = z.object({
  topic: z.string().min(1),
  tone: z.string(),
});
export type BlogInput = z.infer<typeof blogInputSchema>;
```

## 3. Create the Input Form (`ui/InputForm.tsx`)
Create a standard React component that takes `InputComponentProps`.
```tsx
import { useState } from 'react';
import type { InputComponentProps } from '@/core/registry/types';

export function BlogInputForm({ onSubmit, isLoading, initialValues }: InputComponentProps) {
  // Use state, render form...
  // Call onSubmit({ topic, tone }) when ready
}
```

## 4. Define the Workflow (`workflow.ts`)
This is where the AI logic lives. Accept the validated inputs, call the LLM, and return a structured `WorkflowOutput`.
```typescript
import type { WorkflowContext, WorkflowOutput } from '@/core/workflow/types';
import type { BlogInput } from './schema';

export async function executeBlogWorkflow(
  inputs: BlogInput,
  ctx: WorkflowContext
): Promise<WorkflowOutput> {
  const llm = ctx.provider;
  // Call LLM
  
  return {
    title: 'Generated Blog Post',
    blocks: [
      { type: 'markdown', data: { content: resultText } }
    ]
  };
}
```

## 5. Export the Module (`module.ts`)
Wire it all together. The system will auto-discover this file.
```typescript
import { PenTool } from 'lucide-react';
import { blogInputSchema } from './schema';
import { executeBlogWorkflow } from './workflow';
import { BlogInputForm } from './ui/InputForm';
import type { AIEmployeeModule } from '@/core/registry/types';

const module: AIEmployeeModule = {
  id: 'blog-writer',
  name: 'AI Blog Writer',
  tagline: 'Write SEO blogs in seconds.',
  description: '...',
  icon: PenTool,
  accentColor: '#ff0000',
  version: '1.0.0',
  author: 'Atomest',
  category: 'Marketing',
  tags: ['blog'],
  status: 'live',
  pricingTier: 'starter',
  creditsRequired: 5,
  estimatedRuntime: '~10s',
  estimatedTimeSaved: '2 hrs',
  supportsFiles: false,
  supportsStreaming: false,
  inputSchema: blogInputSchema,
  InputComponent: BlogInputForm,
  executeWorkflow: (inputs, ctx) => executeBlogWorkflow(inputs as any, ctx),
};

export default module;
```

That's it. It will instantly appear on the homepage and dashboard.
