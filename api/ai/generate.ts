import type { VercelRequest, VercelResponse } from '@vercel/node';
import { providerManager } from '../../src/backend/ai/manager';
import { AIProviderRequest } from '../../src/backend/ai/types';
import { AIError } from '../../src/backend/ai/errors';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = req.body as AIProviderRequest;

    // The backend uses the provider manager, which handles routing to the correct provider
    // and prepares for future fallback support.
    const result = await providerManager.generateText({
      prompt: body.prompt,
      systemPrompt: body.systemPrompt,
      temperature: body.temperature,
      maxTokens: body.maxTokens,
    });

    // Return structured JSON
    return res.status(200).json(result);

  } catch (error: any) {
    console.error('[API /ai/generate] Error:', error);

    if (error instanceof AIError) {
      return res.status(error.statusCode || 500).json({
        error: error.message,
        provider: error.provider,
        isRetryable: error.isRetryable,
      });
    }

    // Fallback for unexpected, raw errors (never expose raw internal errors directly to the client)
    return res.status(500).json({
      error: 'An internal server error occurred while processing the AI request.',
      isRetryable: false,
    });
  }
}
