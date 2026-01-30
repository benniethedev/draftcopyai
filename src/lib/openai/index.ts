// OpenAI Integration for DraftCopyAI
// Provides content generation with streaming support

export {
  getOpenAIClient,
  OpenAIConfigError,
  OpenAIRateLimitError,
  OpenAIQuotaExceededError,
  OpenAIAPIError,
  parseOpenAIError,
} from './client';

export {
  type GenerationContext,
  buildSystemPrompt,
  buildUserPrompt,
  estimateTokens,
  getMaxTokens,
} from './prompts';

export {
  type GenerationOptions,
  type GenerationResult,
  generateContent,
  generateContentStream,
  createGenerationStream,
} from './generate';

export {
  analyzeBrandVoice,
  buildBrandVoicePrompt,
} from './brand-voice';
