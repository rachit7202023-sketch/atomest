// src/core/ai/providers/index.ts
// Single entry point. Reads VITE_AI_PROVIDER env var.
// Switching providers = change one environment variable. Zero code changes.

import type { IAIProvider } from '../types';
import { GeminiProvider } from './gemini';
import { OpenAIProvider } from './openai';

let _cached: IAIProvider | null = null;

export function getActiveProvider(): IAIProvider {
  if (_cached) return _cached;

  const providerName = import.meta.env.VITE_AI_PROVIDER ?? 'gemini';

  switch (providerName) {
    case 'gemini':
      _cached = new GeminiProvider();
      break;
    case 'openai':
      _cached = new OpenAIProvider();
      break;
    // Future: 'claude', 'groq', 'openrouter', 'deepseek'
    default:
      throw new Error(
        `Unknown AI provider: "${providerName}". ` +
        `Set VITE_AI_PROVIDER to one of: gemini, openai`
      );
  }

  return _cached;
}

/** Force re-initialization (useful for provider hot-switching in dev) */
export function resetProvider(): void {
  _cached = null;
}
