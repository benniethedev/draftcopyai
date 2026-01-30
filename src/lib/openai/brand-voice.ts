import { getOpenAIClient, parseOpenAIError } from './client';
import type { BrandVoiceAnalysisResponse } from '@/types/brand-voice';

const BRAND_VOICE_SYSTEM_PROMPT = `You are an expert brand voice analyst and copywriting strategist. Your task is to analyze sample content and extract a comprehensive brand voice profile.

Analyze the provided samples for:
1. **Tone Attributes** - Rate each on a 1-10 scale:
   - Formality: 1=casual/conversational, 10=formal/corporate
   - Enthusiasm: 1=reserved/measured, 10=energetic/enthusiastic  
   - Confidence: 1=humble/tentative, 10=bold/authoritative
   - Warmth: 1=professional distance, 10=friendly/personable
   - Humor: 1=serious/straightforward, 10=playful/witty

2. **Vocabulary Profile**:
   - Complexity: simple/moderate/sophisticated
   - Jargon level: minimal/moderate/heavy (industry-specific terms)
   - Signature words: 5-10 unique words/phrases used frequently
   - Words to avoid: words/phrases conspicuously absent or that would clash
   - Industry terms: relevant technical vocabulary used

3. **Sentence Structure**:
   - Average length: short (under 15 words), medium (15-25), long (25+)
   - Paragraph style: punchy (1-2 sentences), balanced (3-4), detailed (5+)
   - Preferred openings: common sentence starters
   - Transition style: direct/flowing/structured

4. **Content Patterns** (true/false):
   - Uses rhetorical questions
   - Uses bulleted/numbered lists
   - Uses anecdotes/stories
   - Uses data/statistics
   - Uses metaphors/analogies
   - CTA style: subtle/moderate/direct

Also provide:
- A 2-3 sentence description summarizing the brand voice
- 2-3 short excerpts that best exemplify the voice
- A confidence score (0-100) based on sample quality/quantity
- 2-3 suggestions for strengthening the brand voice

Respond in JSON format matching this structure:
{
  "profile": {
    "name": "string - a memorable name for this voice style",
    "description": "string - 2-3 sentence summary",
    "tone": {
      "formality": number,
      "enthusiasm": number,
      "confidence": number,
      "warmth": number,
      "humor": number
    },
    "vocabulary": {
      "complexity": "simple" | "moderate" | "sophisticated",
      "jargonLevel": "minimal" | "moderate" | "heavy",
      "signatureWords": string[],
      "avoidWords": string[],
      "industryTerms": string[]
    },
    "sentenceStructure": {
      "averageLength": "short" | "medium" | "long",
      "paragraphStyle": "punchy" | "balanced" | "detailed",
      "preferredOpenings": string[],
      "transitionStyle": "direct" | "flowing" | "structured"
    },
    "contentPatterns": {
      "usesQuestions": boolean,
      "usesLists": boolean,
      "usesAnecdotes": boolean,
      "usesData": boolean,
      "usesMetaphors": boolean,
      "callToActionStyle": "subtle" | "moderate" | "direct"
    },
    "sampleExcerpts": string[]
  },
  "confidence": number,
  "suggestions": string[]
}`;

export async function analyzeBrandVoice(samples: string[]): Promise<BrandVoiceAnalysisResponse> {
  const client = getOpenAIClient();
  
  const combinedSamples = samples
    .map((sample, i) => `--- SAMPLE ${i + 1} ---\n${sample}`)
    .join('\n\n');

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: BRAND_VOICE_SYSTEM_PROMPT },
        { 
          role: 'user', 
          content: `Please analyze these ${samples.length} content samples and create a brand voice profile:\n\n${combinedSamples}` 
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3, // Lower temperature for more consistent analysis
      max_tokens: 2000,
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No response content from OpenAI');
    }

    const result = JSON.parse(content) as BrandVoiceAnalysisResponse;
    
    // Validate the response structure
    if (!result.profile || !result.profile.tone || !result.profile.vocabulary) {
      throw new Error('Invalid response structure from OpenAI');
    }

    return result;
  } catch (error) {
    throw parseOpenAIError(error);
  }
}

// Generate a prompt snippet for content generation based on brand voice
export function buildBrandVoicePrompt(profile: BrandVoiceAnalysisResponse['profile']): string {
  const toneDescriptions = [];
  
  if (profile.tone.formality <= 3) toneDescriptions.push('casual and conversational');
  else if (profile.tone.formality >= 7) toneDescriptions.push('formal and professional');
  
  if (profile.tone.enthusiasm >= 7) toneDescriptions.push('energetic and enthusiastic');
  if (profile.tone.confidence >= 7) toneDescriptions.push('bold and confident');
  if (profile.tone.warmth >= 7) toneDescriptions.push('warm and friendly');
  if (profile.tone.humor >= 6) toneDescriptions.push('with appropriate humor');
  
  const vocabDesc = profile.vocabulary.complexity === 'sophisticated' 
    ? 'sophisticated vocabulary'
    : profile.vocabulary.complexity === 'simple'
    ? 'accessible, simple language'
    : 'moderate vocabulary complexity';

  return `## Brand Voice: ${profile.name}

${profile.description}

**Tone:** ${toneDescriptions.join(', ')}

**Writing Style:**
- ${vocabDesc}
- ${profile.sentenceStructure.averageLength} sentences, ${profile.sentenceStructure.paragraphStyle} paragraphs
- ${profile.sentenceStructure.transitionStyle} transitions

**Signature Phrases to Use:** ${profile.vocabulary.signatureWords.slice(0, 5).join(', ')}

**Example of This Voice:**
> ${profile.sampleExcerpts[0]}
`;
}
