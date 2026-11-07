// src/core/credits/types.ts

export interface UserCredits {
  userId: string;
  balance: number;
  lifetimeUsed: number;
  updatedAt: string;
}

export class InsufficientCreditsError extends Error {
  constructor(
    public readonly balance: number,
    public readonly required: number,
  ) {
    super(`Insufficient credits: have ${balance}, need ${required}`);
    this.name = 'InsufficientCreditsError';
  }
}
