import { GoogleGenerativeAI } from '@google/generative-ai';
import { BaseAIProvider } from './base';
import { AIProviderRequest, AIProviderResponse } from '../types';
import { AIError, AIRateLimitError, AIAuthenticationError, AIUnavailableError } from '../errors';

export class GeminiProvider extends BaseAIProvider {
  public readonly id = 'gemini';
  private genAI: GoogleGenerativeAI;

  constructor() {
    super();
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new AIError('GEMINI_API_KEY environment variable is missing', { provider: this.id, statusCode: 500 });
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  protected async doGenerateText(request: AIProviderRequest): Promise<AIProviderResponse> {
    try {
      // Use standard model; can be parameterized later
      const model = this.genAI.getGenerativeModel({
        model: 'gemini-1.5-pro',
        systemInstruction: request.systemPrompt,
      });

      const generationConfig = {
        temperature: request.temperature ?? 0.7,
        maxOutputTokens: request.maxTokens,
      };

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: request.prompt }] }],
        generationConfig,
      });

      const response = result.response;
      const text = response.text();
      
      const usageMetadata = response.usageMetadata;

      return {
        text,
        provider: this.id,
        usage: usageMetadata ? {
          promptTokens: usageMetadata.promptTokenCount,
          completionTokens: usageMetadata.candidatesTokenCount,
          totalTokens: usageMetadata.totalTokenCount,
        } : undefined,
      };
    } catch (error: any) {
      // Map Google AI errors to our custom errors
      const errorMessage = error?.message || 'Unknown Gemini error';
      const status = error?.status || 500;
      
      if (status === 429 || errorMessage.includes('429') || errorMessage.includes('quota')) {
        throw new AIRateLimitError('Gemini rate limit exceeded', { provider: this.id });
      }
      if (status === 401 || status === 403 || errorMessage.includes('API key not valid')) {
        throw new AIAuthenticationError('Invalid Gemini API key', { provider: this.id });
      }
      if (status >= 500 || errorMessage.includes('503')) {
        throw new AIUnavailableError('Gemini API is currently unavailable', { provider: this.id });
      }
      
      throw new AIError(`Gemini Error: ${errorMessage}`, { provider: this.id, statusCode: status });
    }
  }
}
