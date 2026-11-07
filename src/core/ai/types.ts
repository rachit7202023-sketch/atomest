// src/core/ai/types.ts
// The unified contract every AI provider must implement.
// WorkflowEngine only talks to this interface — never to a specific provider SDK.

export interface GenerateOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  /** When true, instructs the provider to return valid JSON */
  jsonMode?: boolean;
  systemPrompt?: string;
}

export interface StreamChunk {
  text: string;
  done: boolean;
}

export interface EmbeddingOptions {
  model?: string;
}

export interface VisionOptions {
  model?: string;
  detail?: 'low' | 'high' | 'auto';
}

export interface IAIProvider {
  readonly name: string;

  /** Single-shot text generation */
  generate(prompt: string, opts?: GenerateOptions): Promise<string>;

  /** Streaming text generation — yields chunks as they arrive */
  stream(prompt: string, opts?: GenerateOptions): AsyncGenerator<StreamChunk>;

  /** Generate embeddings for semantic search / similarity */
  embeddings(text: string, opts?: EmbeddingOptions): Promise<number[]>;

  /** Vision — describe or analyze an image from base64 data URI */
  vision(imageDataUri: string, prompt: string, opts?: VisionOptions): Promise<string>;
}

export class AIProviderError extends Error {
  constructor(
    message: string,
    public readonly provider: string,
    public readonly cause?: unknown,
  ) {
    super(message);
    this.name = 'AIProviderError';
  }
}
