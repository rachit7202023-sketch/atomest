export interface AIProviderRequest {
  prompt: string;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AIProviderResponse {
  text: string;
  provider: string;
  usage?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
  };
}

export interface AIProvider {
  /**
   * Unique identifier for the provider (e.g., 'gemini', 'openai', 'anthropic')
   */
  readonly id: string;

  /**
   * Generates text based on the provided request parameters
   */
  generateText(request: AIProviderRequest): Promise<AIProviderResponse>;
}
