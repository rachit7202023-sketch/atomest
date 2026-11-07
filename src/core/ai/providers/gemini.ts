// src/core/ai/providers/gemini.ts
// GeminiProvider wraps the existing @google/genai SDK.
// This is the active provider. All workflow engine calls flow through here.

import { GoogleGenAI } from '@google/genai';
import type { IAIProvider, GenerateOptions, StreamChunk, EmbeddingOptions, VisionOptions } from '../types';
import { AIProviderError } from '../types';

const DEFAULT_MODEL = 'gemini-2.0-flash';
const DEFAULT_EMBED_MODEL = 'text-embedding-004';

export class GeminiProvider implements IAIProvider {
  readonly name = 'gemini';
  private client: GoogleGenAI;

  constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) throw new AIProviderError('VITE_GEMINI_API_KEY is not set', 'gemini');
    this.client = new GoogleGenAI({ apiKey });
  }

  async generate(prompt: string, opts: GenerateOptions = {}): Promise<string> {
    try {
      const model = opts.model ?? DEFAULT_MODEL;
      const contents = opts.systemPrompt
        ? [{ role: 'user' as const, parts: [{ text: `${opts.systemPrompt}\n\n${prompt}` }] }]
        : prompt;

      const response = await this.client.models.generateContent({
        model,
        contents,
        config: {
          temperature: opts.temperature ?? 0.7,
          maxOutputTokens: opts.maxTokens ?? 8192,
          ...(opts.jsonMode ? { responseMimeType: 'application/json' } : {}),
        },
      });

      return response.text ?? '';
    } catch (err) {
      throw new AIProviderError(`Gemini generate failed: ${String(err)}`, 'gemini', err);
    }
  }

  async *stream(prompt: string, opts: GenerateOptions = {}): AsyncGenerator<StreamChunk> {
    try {
      const model = opts.model ?? DEFAULT_MODEL;
      const stream = await this.client.models.generateContentStream({
        model,
        contents: prompt,
        config: {
          temperature: opts.temperature ?? 0.7,
          maxOutputTokens: opts.maxTokens ?? 8192,
        },
      });

      for await (const chunk of stream) {
        const text = chunk.text ?? '';
        if (text) yield { text, done: false };
      }
      yield { text: '', done: true };
    } catch (err) {
      throw new AIProviderError(`Gemini stream failed: ${String(err)}`, 'gemini', err);
    }
  }

  async embeddings(text: string, opts: EmbeddingOptions = {}): Promise<number[]> {
    try {
      const model = opts.model ?? DEFAULT_EMBED_MODEL;
      const response = await this.client.models.embedContent({
        model,
        contents: text,
      });
      return response.embeddings?.[0]?.values ?? [];
    } catch (err) {
      throw new AIProviderError(`Gemini embeddings failed: ${String(err)}`, 'gemini', err);
    }
  }

  async vision(imageDataUri: string, prompt: string, opts: VisionOptions = {}): Promise<string> {
    try {
      const model = opts.model ?? DEFAULT_MODEL;
      // Strip the data URI prefix to get raw base64 + mimeType
      const [header, base64] = imageDataUri.split(',');
      const mimeType = header.match(/:(.*?);/)?.[1] ?? 'image/jpeg';

      const response = await this.client.models.generateContent({
        model,
        contents: [
          {
            role: 'user',
            parts: [
              { text: prompt },
              { inlineData: { mimeType, data: base64 } },
            ],
          },
        ],
      });

      return response.text ?? '';
    } catch (err) {
      throw new AIProviderError(`Gemini vision failed: ${String(err)}`, 'gemini', err);
    }
  }
}
