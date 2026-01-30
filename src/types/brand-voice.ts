// Brand Voice Profile Types

export interface ToneAttributes {
  formality: number; // 1-10 scale: 1=casual, 10=formal
  enthusiasm: number; // 1-10 scale: 1=reserved, 10=enthusiastic
  confidence: number; // 1-10 scale: 1=humble, 10=bold
  warmth: number; // 1-10 scale: 1=professional distance, 10=friendly/warm
  humor: number; // 1-10 scale: 1=serious, 10=playful
}

export interface VocabularyProfile {
  complexity: 'simple' | 'moderate' | 'sophisticated';
  jargonLevel: 'minimal' | 'moderate' | 'heavy';
  signatureWords: string[]; // Frequently used unique words/phrases
  avoidWords: string[]; // Words the brand doesn't use
  industryTerms: string[];
}

export interface SentenceStructure {
  averageLength: 'short' | 'medium' | 'long';
  paragraphStyle: 'punchy' | 'balanced' | 'detailed';
  preferredOpenings: string[]; // Common ways they start sentences
  transitionStyle: 'direct' | 'flowing' | 'structured';
}

export interface ContentPatterns {
  usesQuestions: boolean;
  usesLists: boolean;
  usesAnecdotes: boolean;
  usesData: boolean;
  usesMetaphors: boolean;
  callToActionStyle: 'subtle' | 'moderate' | 'direct';
}

export interface BrandVoiceProfile {
  id: string;
  userId: string;
  name: string;
  description: string; // AI-generated summary of the voice
  tone: ToneAttributes;
  vocabulary: VocabularyProfile;
  sentenceStructure: SentenceStructure;
  contentPatterns: ContentPatterns;
  sampleExcerpts: string[]; // Key excerpts that exemplify the voice
  createdAt: Date;
  updatedAt: Date;
}

export interface SampleArticle {
  id: string;
  content: string;
  wordCount: number;
  addedAt: Date;
}

export interface BrandVoiceAnalysisRequest {
  samples: string[];
}

export interface BrandVoiceAnalysisResponse {
  profile: Omit<BrandVoiceProfile, 'id' | 'userId' | 'createdAt' | 'updatedAt'>;
  confidence: number; // 0-100, how confident the analysis is
  suggestions: string[]; // Suggestions for improving the profile
}

// Wizard state
export interface BrandVoiceWizardState {
  step: 'intro' | 'samples' | 'analyzing' | 'review' | 'complete';
  samples: SampleArticle[];
  profile: BrandVoiceProfile | null;
  error: string | null;
}

// For display in UI
export const TONE_LABELS: Record<keyof ToneAttributes, { low: string; high: string }> = {
  formality: { low: 'Casual', high: 'Formal' },
  enthusiasm: { low: 'Reserved', high: 'Enthusiastic' },
  confidence: { low: 'Humble', high: 'Bold' },
  warmth: { low: 'Professional', high: 'Friendly' },
  humor: { low: 'Serious', high: 'Playful' },
};
