import { NextRequest, NextResponse } from 'next/server';
import { analyzeBrandVoice } from '@/lib/openai/brand-voice';
import { 
  OpenAIConfigError, 
  OpenAIRateLimitError, 
  OpenAIQuotaExceededError 
} from '@/lib/openai/client';
import type { BrandVoiceAnalysisRequest } from '@/types/brand-voice';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as BrandVoiceAnalysisRequest;
    
    // Validate request
    if (!body.samples || !Array.isArray(body.samples)) {
      return NextResponse.json(
        { error: 'samples array is required' },
        { status: 400 }
      );
    }

    if (body.samples.length < 2) {
      return NextResponse.json(
        { error: 'At least 2 samples are required for accurate analysis' },
        { status: 400 }
      );
    }

    if (body.samples.length > 5) {
      return NextResponse.json(
        { error: 'Maximum 5 samples allowed' },
        { status: 400 }
      );
    }

    // Validate each sample has sufficient content
    const validSamples = body.samples.filter(s => s && s.trim().length >= 100);
    if (validSamples.length < 2) {
      return NextResponse.json(
        { error: 'Each sample must be at least 100 characters' },
        { status: 400 }
      );
    }

    // Analyze brand voice
    const result = await analyzeBrandVoice(validSamples);
    
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('Brand voice analysis error:', error);
    
    if (error instanceof OpenAIConfigError) {
      return NextResponse.json(
        { error: 'Service configuration error. Please try again later.' },
        { status: 500 }
      );
    }
    
    if (error instanceof OpenAIRateLimitError) {
      return NextResponse.json(
        { error: 'Service is busy. Please try again in a moment.', retryAfter: error.retryAfter },
        { status: 429 }
      );
    }
    
    if (error instanceof OpenAIQuotaExceededError) {
      return NextResponse.json(
        { error: 'Service quota exceeded. Please contact support.' },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to analyze brand voice. Please try again.' },
      { status: 500 }
    );
  }
}
