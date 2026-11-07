export type ErrorCode = 
  | 'VALIDATION_ERROR'
  | 'AUTH_ERROR'
  | 'CREDIT_ERROR'
  | 'UPLOAD_ERROR'
  | 'AI_PROVIDER_ERROR'
  | 'RATE_LIMIT_ERROR'
  | 'UNKNOWN_ERROR';

export class AtomestError extends Error {
  constructor(
    public readonly code: ErrorCode,
    public readonly userMessage: string,
    public readonly originalError?: unknown
  ) {
    super(userMessage);
    this.name = 'AtomestError';
  }
}

export class ValidationError extends AtomestError {
  constructor(message: string, originalError?: unknown) {
    super('VALIDATION_ERROR', message, originalError);
    this.name = 'ValidationError';
  }
}

export class AuthError extends AtomestError {
  constructor(message: string = 'You must be signed in to perform this action.') {
    super('AUTH_ERROR', message);
    this.name = 'AuthError';
  }
}

export class CreditError extends AtomestError {
  constructor(message: string) {
    super('CREDIT_ERROR', message);
    this.name = 'CreditError';
  }
}

export class UploadError extends AtomestError {
  constructor(message: string, originalError?: unknown) {
    super('UPLOAD_ERROR', message, originalError);
    this.name = 'UploadError';
  }
}

export class AIProviderError extends AtomestError {
  constructor(message: string, originalError?: unknown) {
    super('AI_PROVIDER_ERROR', message, originalError);
    this.name = 'AIProviderError';
  }
}

export class RateLimitError extends AtomestError {
  constructor(message: string = 'You are making too many requests. Please try again later.') {
    super('RATE_LIMIT_ERROR', message);
    this.name = 'RateLimitError';
  }
}
