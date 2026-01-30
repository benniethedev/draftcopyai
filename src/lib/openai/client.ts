import OpenAI from 'openai';

// Singleton OpenAI client instance
let openaiClient: OpenAI | null = null;

export function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      throw new OpenAIConfigError('OPENAI_API_KEY environment variable is not set');
    }
    
    openaiClient = new OpenAI({
      apiKey,
    });
  }
  
  return openaiClient;
}

// Custom error types for better error handling
export class OpenAIConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OpenAIConfigError';
  }
}

export class OpenAIRateLimitError extends Error {
  retryAfter?: number;
  
  constructor(message: string, retryAfter?: number) {
    super(message);
    this.name = 'OpenAIRateLimitError';
    this.retryAfter = retryAfter;
  }
}

export class OpenAIQuotaExceededError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OpenAIQuotaExceededError';
  }
}

export class OpenAIAPIError extends Error {
  statusCode?: number;
  
  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = 'OpenAIAPIError';
    this.statusCode = statusCode;
  }
}

// Parse OpenAI errors into our custom error types
export function parseOpenAIError(error: unknown): Error {
  if (error instanceof OpenAI.APIError) {
    const status = error.status;
    const message = error.message || 'Unknown OpenAI API error';
    
    // Rate limit error
    if (status === 429) {
      // Check if it's quota exceeded vs rate limit
      if (message.toLowerCase().includes('quota')) {
        return new OpenAIQuotaExceededError(
          'OpenAI API quota exceeded. Please check your billing settings.'
        );
      }
      
      // Extract retry-after if available
      const retryAfter = error.headers?.['retry-after'] 
        ? parseInt(error.headers['retry-after'], 10) 
        : undefined;
      
      return new OpenAIRateLimitError(
        'Rate limit exceeded. Please try again shortly.',
        retryAfter
      );
    }
    
    // Authentication error
    if (status === 401) {
      return new OpenAIConfigError('Invalid OpenAI API key');
    }
    
    // Server errors
    if (status && status >= 500) {
      return new OpenAIAPIError(
        'OpenAI service is temporarily unavailable. Please try again.',
        status
      );
    }
    
    return new OpenAIAPIError(message, status);
  }
  
  if (error instanceof Error) {
    return error;
  }
  
  return new Error('An unexpected error occurred');
}
