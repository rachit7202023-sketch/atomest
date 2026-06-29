import { AIProvider, AIProviderRequest, AIProviderResponse } from '../types';
import { AIError } from '../errors';

export abstract class BaseAIProvider implements AIProvider {
  public abstract readonly id: string;

  protected logRequest(request: AIProviderRequest) {
    // Only log metadata, NEVER log prompts or keys
    console.log(`[AI] ${this.id} generateText request - temp: ${request.temperature}, maxTokens: ${request.maxTokens}`);
  }

  protected logSuccess(response: AIProviderResponse) {
    console.log(`[AI] ${this.id} generateText success - provider: ${response.provider}`);
  }

  protected logError(error: unknown) {
    console.error(`[AI] ${this.id} error:`, error instanceof Error ? error.message : 'Unknown error');
  }

  /**
   * Validates common request parameters before sending to the provider
   */
  protected validateRequest(request: AIProviderRequest): void {
    if (!request.prompt || request.prompt.trim() === '') {
      throw new AIError('Prompt cannot be empty', { provider: this.id, statusCode: 400 });
    }
    
    if (request.temperature !== undefined && (request.temperature < 0 || request.temperature > 2)) {
      throw new AIError('Temperature must be between 0 and 2', { provider: this.id, statusCode: 400 });
    }
  }

  public async generateText(request: AIProviderRequest): Promise<AIProviderResponse> {
    try {
      this.validateRequest(request);
      this.logRequest(request);
      
      const response = await this.doGenerateText(request);
      
      this.logSuccess(response);
      return response;
    } catch (error) {
      this.logError(error);
      // Ensure all errors thrown are AIError instances
      if (error instanceof AIError) {
        throw error;
      }
      throw new AIError('An unexpected error occurred during generation', { provider: this.id, statusCode: 500 });
    }
  }

  /**
   * Implemented by specific provider adapters
   */
  protected abstract doGenerateText(request: AIProviderRequest): Promise<AIProviderResponse>;
}
