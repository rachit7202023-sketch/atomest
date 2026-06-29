import { AIProvider, AIProviderRequest, AIProviderResponse } from './types';
import { GeminiProvider } from './providers/gemini';
import { AIError, AIRateLimitError, AIUnavailableError } from './errors';

export class ProviderManager {
  private providers: Map<string, AIProvider> = new Map();
  private primaryProviderId: string;

  constructor() {
    // Register available providers
    // Future providers (Claude, OpenRouter, DeepSeek, Mistral) are registered here
    const gemini = new GeminiProvider();
    this.providers.set(gemini.id, gemini);

    this.primaryProviderId = process.env.ACTIVE_AI_PROVIDER || 'gemini';
  }

  /**
   * Retrieves a specific provider by ID
   */
  public getProvider(providerId: string): AIProvider {
    const provider = this.providers.get(providerId);
    if (!provider) {
      throw new AIError(`AI Provider '${providerId}' is not registered.`, { statusCode: 500 });
    }
    return provider;
  }

  /**
   * Generates text using the primary provider, with architecture designed for future fallback mechanisms.
   * 
   * The backend does not know what tool is calling it (caption generator, email writer, etc).
   * It only receives a unified AIProviderRequest.
   */
  public async generateText(request: AIProviderRequest): Promise<AIProviderResponse> {
    const primaryProvider = this.getProvider(this.primaryProviderId);

    try {
      return await primaryProvider.generateText(request);
    } catch (error: any) {
      // Future: Implement automatic fallback logic here
      // Example:
      // if (error instanceof AIRateLimitError || error instanceof AIUnavailableError) {
      //   console.log(`Falling back to OpenRouter...`);
      //   const fallbackProvider = this.getProvider('openrouter');
      //   return await fallbackProvider.generateText(request);
      // }
      
      throw error;
    }
  }
}

// Export a singleton instance for use in serverless functions
export const providerManager = new ProviderManager();
