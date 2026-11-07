// src/core/ai/providers/openai.ts
// OpenAIProvider stub — implement when ready to switch.
// Currently throws NotImplementedError for every method.

import type { IAIProvider, GenerateOptions, StreamChunk, EmbeddingOptions, VisionOptions } from '../types';
import { AIProviderError } from '../types';

export class OpenAIProvider implements IAIProvider {
  readonly name = 'openai';

  private notImplemented(method: string): never {
    throw new AIProviderError(
      `OpenAIProvider.${method} is not yet implemented. Install openai package and implement.`,
      'openai',
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async generate(_prompt: string, _opts?: GenerateOptions): Promise<string> {
    return this.notImplemented('generate');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async *stream(_prompt: string, _opts?: GenerateOptions): AsyncGenerator<StreamChunk> {
    return this.notImplemented('stream');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async embeddings(_text: string, _opts?: EmbeddingOptions): Promise<number[]> {
    return this.notImplemented('embeddings');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async vision(_imageDataUri: string, _prompt: string, _opts?: VisionOptions): Promise<string> {
    return this.notImplemented('vision');
  }
}
