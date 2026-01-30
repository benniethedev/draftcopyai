import { describe, it, expect } from 'vitest';
import {
  OpenAIConfigError,
  OpenAIRateLimitError,
  OpenAIQuotaExceededError,
  OpenAIAPIError,
  parseOpenAIError,
} from './client';
import OpenAI from 'openai';

// Helper to create mock API errors that match OpenAI's structure
function createMockAPIError(status: number, message: string): OpenAI.APIError {
  const error = Object.create(OpenAI.APIError.prototype);
  error.status = status;
  error.message = message;
  error.name = 'APIError';
  error.headers = {};
  return error;
}

describe('OpenAI Client', () => {
  describe('Custom Error Types', () => {
    it('OpenAIConfigError has correct name', () => {
      const error = new OpenAIConfigError('Missing API key');
      expect(error.name).toBe('OpenAIConfigError');
      expect(error.message).toBe('Missing API key');
    });

    it('OpenAIRateLimitError stores retryAfter', () => {
      const error = new OpenAIRateLimitError('Rate limited', 60);
      expect(error.name).toBe('OpenAIRateLimitError');
      expect(error.retryAfter).toBe(60);
    });

    it('OpenAIQuotaExceededError has correct name', () => {
      const error = new OpenAIQuotaExceededError('Quota exceeded');
      expect(error.name).toBe('OpenAIQuotaExceededError');
    });

    it('OpenAIAPIError stores status code', () => {
      const error = new OpenAIAPIError('Server error', 500);
      expect(error.name).toBe('OpenAIAPIError');
      expect(error.statusCode).toBe(500);
    });
  });

  describe('parseOpenAIError', () => {
    it('returns original error for non-OpenAI errors', () => {
      const originalError = new Error('Generic error');
      const parsed = parseOpenAIError(originalError);
      expect(parsed).toBe(originalError);
    });

    it('wraps unknown values in Error', () => {
      const parsed = parseOpenAIError('string error');
      expect(parsed).toBeInstanceOf(Error);
      expect(parsed.message).toBe('An unexpected error occurred');
    });

    it('handles OpenAI rate limit errors (429)', () => {
      const apiError = createMockAPIError(429, 'Rate limit exceeded');
      const parsed = parseOpenAIError(apiError);
      expect(parsed).toBeInstanceOf(OpenAIRateLimitError);
    });

    it('handles OpenAI quota exceeded errors', () => {
      const apiError = createMockAPIError(429, 'You have exceeded your quota');
      const parsed = parseOpenAIError(apiError);
      expect(parsed).toBeInstanceOf(OpenAIQuotaExceededError);
    });

    it('handles OpenAI auth errors (401)', () => {
      const apiError = createMockAPIError(401, 'Invalid API key');
      const parsed = parseOpenAIError(apiError);
      expect(parsed).toBeInstanceOf(OpenAIConfigError);
    });

    it('handles OpenAI server errors (500+)', () => {
      const apiError = createMockAPIError(503, 'Service unavailable');
      const parsed = parseOpenAIError(apiError);
      expect(parsed).toBeInstanceOf(OpenAIAPIError);
      expect((parsed as OpenAIAPIError).statusCode).toBe(503);
    });
  });
});
