export class AIError extends Error {
  public provider?: string;
  public statusCode?: number;
  public isRetryable: boolean;

  constructor(message: string, options?: { provider?: string; statusCode?: number; isRetryable?: boolean }) {
    super(message);
    this.name = 'AIError';
    this.provider = options?.provider;
    this.statusCode = options?.statusCode;
    this.isRetryable = options?.isRetryable ?? false;
  }
}

export class AIRateLimitError extends AIError {
  constructor(message: string = 'AI provider rate limit exceeded', options?: { provider?: string }) {
    super(message, { ...options, statusCode: 429, isRetryable: true });
    this.name = 'AIRateLimitError';
  }
}

export class AIAuthenticationError extends AIError {
  constructor(message: string = 'AI provider authentication failed', options?: { provider?: string }) {
    super(message, { ...options, statusCode: 401, isRetryable: false });
    this.name = 'AIAuthenticationError';
  }
}

export class AIUnavailableError extends AIError {
  constructor(message: string = 'AI provider is currently unavailable', options?: { provider?: string }) {
    super(message, { ...options, statusCode: 503, isRetryable: true });
    this.name = 'AIUnavailableError';
  }
}
