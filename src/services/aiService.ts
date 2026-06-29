/**
 * Frontend AI Service
 * 
 * Every future AI tool in the React application (caption generator, email writer, etc.)
 * MUST use this service to communicate with the backend.
 * 
 * The frontend NEVER communicates directly with any AI provider (e.g., Gemini).
 */

export interface AIGenerateParams {
  prompt: string;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AIGenerateResponse {
  text: string;
  provider: string;
  usage?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
  };
}

export interface AIErrorResponse {
  error: string;
  provider?: string;
  isRetryable?: boolean;
}

export class AIFrontendError extends Error {
  public provider?: string;
  public isRetryable: boolean;

  constructor(message: string, options?: { provider?: string; isRetryable?: boolean }) {
    super(message);
    this.name = 'AIFrontendError';
    this.provider = options?.provider;
    this.isRetryable = options?.isRetryable ?? false;
  }
}

/**
 * Common entry point for generating AI text.
 */
export async function generateText(params: AIGenerateParams): Promise<AIGenerateResponse> {
  try {
    const response = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      let errorData: AIErrorResponse;
      try {
        errorData = await response.json();
      } catch (e) {
        throw new AIFrontendError(`Server returned status ${response.status} without valid JSON.`);
      }

      throw new AIFrontendError(errorData.error || 'Unknown AI error', {
        provider: errorData.provider,
        isRetryable: errorData.isRetryable,
      });
    }

    const data: AIGenerateResponse = await response.json();
    return data;
  } catch (error: any) {
    if (error instanceof AIFrontendError) {
      throw error;
    }
    // Handle network errors (e.g., server offline, CORS)
    throw new AIFrontendError(error.message || 'Network error occurred while contacting AI service.', {
      isRetryable: true,
    });
  }
}

// Future specific tools will internally call generateText.
// For example:
/*
export async function summarizeText(text: string) {
  return generateText({ prompt: `Summarize this: ${text}` });
}
*/
