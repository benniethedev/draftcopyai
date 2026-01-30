'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  FileText,
  Plus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Loader2,
  CheckCircle,
  AlertCircle,
  Copy,
  Wand2,
} from 'lucide-react';
import type { 
  SampleArticle, 
  BrandVoiceProfile,
  BrandVoiceAnalysisResponse,
  ToneAttributes,
  TONE_LABELS 
} from '@/types/brand-voice';

const TONE_LABELS_MAP: Record<keyof ToneAttributes, { low: string; high: string }> = {
  formality: { low: 'Casual', high: 'Formal' },
  enthusiasm: { low: 'Reserved', high: 'Enthusiastic' },
  confidence: { low: 'Humble', high: 'Bold' },
  warmth: { low: 'Professional', high: 'Friendly' },
  humor: { low: 'Serious', high: 'Playful' },
};

type WizardStep = 'intro' | 'samples' | 'analyzing' | 'review' | 'complete';

interface BrandVoiceWizardProps {
  onComplete?: (profile: BrandVoiceAnalysisResponse) => void;
  onSkip?: () => void;
}

export default function BrandVoiceWizard({ onComplete, onSkip }: BrandVoiceWizardProps) {
  const [step, setStep] = useState<WizardStep>('intro');
  const [samples, setSamples] = useState<SampleArticle[]>([]);
  const [currentSample, setCurrentSample] = useState('');
  const [analysisResult, setAnalysisResult] = useState<BrandVoiceAnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const addSample = useCallback(() => {
    if (currentSample.trim().length < 100) {
      setError('Sample must be at least 100 characters');
      return;
    }
    if (samples.length >= 5) {
      setError('Maximum 5 samples allowed');
      return;
    }

    const wordCount = currentSample.trim().split(/\s+/).length;
    setSamples(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        content: currentSample.trim(),
        wordCount,
        addedAt: new Date(),
      },
    ]);
    setCurrentSample('');
    setError(null);
  }, [currentSample, samples.length]);

  const removeSample = useCallback((id: string) => {
    setSamples(prev => prev.filter(s => s.id !== id));
  }, []);

  const analyzeVoice = async () => {
    if (samples.length < 2) {
      setError('Please add at least 2 samples');
      return;
    }

    setStep('analyzing');
    setError(null);

    try {
      const response = await fetch('/api/brand-voice/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ samples: samples.map(s => s.content) }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Analysis failed');
      }

      const result = await response.json() as BrandVoiceAnalysisResponse;
      setAnalysisResult(result);
      setStep('review');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze voice');
      setStep('samples');
    }
  };

  const handleComplete = () => {
    if (analysisResult) {
      // Save to localStorage for demo
      localStorage.setItem('brand-voice-profile', JSON.stringify(analysisResult));
      
      // Mark onboarding step as complete
      const completed = JSON.parse(localStorage.getItem('onboarding-completed') || '[]');
      if (!completed.includes('brand-voice')) {
        completed.push('brand-voice');
        localStorage.setItem('onboarding-completed', JSON.stringify(completed));
      }
      
      setStep('complete');
      onComplete?.(analysisResult);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <IntroStep 
            key="intro"
            onStart={() => setStep('samples')} 
            onSkip={onSkip}
          />
        )}
        
        {step === 'samples' && (
          <SamplesStep
            key="samples"
            samples={samples}
            currentSample={currentSample}
            setCurrentSample={setCurrentSample}
            addSample={addSample}
            removeSample={removeSample}
            error={error}
            onBack={() => setStep('intro')}
            onAnalyze={analyzeVoice}
          />
        )}
        
        {step === 'analyzing' && (
          <AnalyzingStep key="analyzing" />
        )}
        
        {step === 'review' && analysisResult && (
          <ReviewStep
            key="review"
            result={analysisResult}
            onBack={() => setStep('samples')}
            onComplete={handleComplete}
          />
        )}
        
        {step === 'complete' && analysisResult && (
          <CompleteStep 
            key="complete"
            profileName={analysisResult.profile.name}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Step Components

function IntroStep({ onStart, onSkip }: { onStart: () => void; onSkip?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center py-12"
    >
      <div className="flex justify-center mb-6">
        <div className="h-20 w-20 bg-gradient-to-br from-accent-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
          <Wand2 className="h-10 w-10 text-white" />
        </div>
      </div>
      
      <h1 className="text-3xl font-bold text-primary-900 mb-4">
        Train Your Brand Voice
      </h1>
      
      <p className="text-lg text-secondary-500 mb-8 max-w-xl mx-auto">
        Share 2-5 samples of your existing content, and we'll analyze your unique tone, 
        vocabulary, and writing style to create a personalized brand voice profile.
      </p>

      <div className="bg-slate-50 rounded-2xl border border-slate-200/60 p-6 mb-8 max-w-lg mx-auto text-left">
        <h3 className="font-semibold text-primary-900 mb-4">What we'll analyze:</h3>
        <ul className="space-y-3 text-secondary-600">
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-accent-500 flex-shrink-0 mt-0.5" />
            <span><strong>Tone & Personality</strong> — Formal vs casual, confident vs humble</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-accent-500 flex-shrink-0 mt-0.5" />
            <span><strong>Vocabulary</strong> — Signature words, complexity, industry terms</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-accent-500 flex-shrink-0 mt-0.5" />
            <span><strong>Sentence Structure</strong> — Length, rhythm, paragraph style</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-accent-500 flex-shrink-0 mt-0.5" />
            <span><strong>Content Patterns</strong> — Questions, lists, storytelling habits</span>
          </li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onStart}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-accent-500/25"
        >
          Get Started
          <ArrowRight className="h-5 w-5" />
        </button>
        {onSkip && (
          <button
            onClick={onSkip}
            className="inline-flex items-center justify-center gap-2 px-6 py-4 text-secondary-500 hover:text-secondary-700 font-medium transition-colors"
          >
            Skip for Now
          </button>
        )}
      </div>
    </motion.div>
  );
}

interface SamplesStepProps {
  samples: SampleArticle[];
  currentSample: string;
  setCurrentSample: (v: string) => void;
  addSample: () => void;
  removeSample: (id: string) => void;
  error: string | null;
  onBack: () => void;
  onAnalyze: () => void;
}

function SamplesStep({
  samples,
  currentSample,
  setCurrentSample,
  addSample,
  removeSample,
  error,
  onBack,
  onAnalyze,
}: SamplesStepProps) {
  const canAnalyze = samples.length >= 2;
  const canAddMore = samples.length < 5;
  const wordCount = currentSample.trim().split(/\s+/).filter(Boolean).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Progress */}
      <div className="flex items-center gap-2 mb-6 text-sm text-secondary-500">
        <span className="font-medium text-accent-600">{samples.length}</span> of 2-5 samples added
        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden ml-2">
          <motion.div 
            className="h-full bg-accent-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((samples.length / 5) * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* Added Samples */}
      {samples.length > 0 && (
        <div className="space-y-3 mb-6">
          {samples.map((sample, index) => (
            <motion.div
              key={sample.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl border border-slate-200/60 p-4 group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-accent-600 bg-accent-100 px-2 py-0.5 rounded">
                      Sample {index + 1}
                    </span>
                    <span className="text-xs text-secondary-400">
                      {sample.wordCount} words
                    </span>
                  </div>
                  <p className="text-sm text-secondary-600 line-clamp-2">
                    {sample.content}
                  </p>
                </div>
                <button
                  onClick={() => removeSample(sample.id)}
                  className="p-2 text-secondary-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add Sample Form */}
      {canAddMore && (
        <div className="bg-white rounded-2xl border border-slate-200/60 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-accent-500" />
            <h3 className="font-semibold text-primary-900">
              {samples.length === 0 ? 'Paste your first sample' : 'Add another sample'}
            </h3>
          </div>
          
          <textarea
            value={currentSample}
            onChange={(e) => setCurrentSample(e.target.value)}
            placeholder="Paste an article, blog post, email, or any content that represents your brand voice..."
            className="w-full h-48 p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 resize-none text-secondary-700 placeholder:text-secondary-400"
          />
          
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-secondary-400">
              {wordCount} words {wordCount < 50 && '(min ~100 characters recommended)'}
            </span>
            <button
              onClick={addSample}
              disabled={currentSample.trim().length < 100}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-900 hover:bg-primary-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add Sample
            </button>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-accent-50 rounded-xl border border-accent-200/60 p-4 mb-6">
        <p className="text-sm text-accent-800">
          <strong>💡 Tip:</strong> For best results, use samples from different content types 
          (blog posts, emails, social posts) that all represent your authentic voice.
        </p>
      </div>

      {/* Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3"
        >
          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </motion.div>
      )}

      {/* Actions */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 text-secondary-500 hover:text-secondary-700 font-medium transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        
        <button
          onClick={onAnalyze}
          disabled={!canAnalyze}
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent-500 hover:bg-accent-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors shadow-lg shadow-accent-500/25"
        >
          <Sparkles className="h-5 w-5" />
          Analyze My Voice
        </button>
      </div>
    </motion.div>
  );
}

function AnalyzingStep() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="text-center py-16"
    >
      <div className="flex justify-center mb-8">
        <div className="relative">
          <div className="h-24 w-24 bg-gradient-to-br from-accent-400 to-amber-500 rounded-2xl flex items-center justify-center animate-pulse">
            <Sparkles className="h-12 w-12 text-white" />
          </div>
          <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-primary-900 rounded-lg flex items-center justify-center">
            <Loader2 className="h-5 w-5 text-white animate-spin" />
          </div>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-primary-900 mb-4">
        Analyzing Your Brand Voice
      </h2>
      
      <p className="text-secondary-500 max-w-md mx-auto">
        Our AI is examining your tone, vocabulary, sentence structure, and content patterns 
        to create your personalized voice profile...
      </p>

      <div className="mt-8 flex justify-center gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-2 w-2 rounded-full bg-accent-500"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    </motion.div>
  );
}

interface ReviewStepProps {
  result: BrandVoiceAnalysisResponse;
  onBack: () => void;
  onComplete: () => void;
}

function ReviewStep({ result, onBack, onComplete }: ReviewStepProps) {
  const { profile, confidence, suggestions } = result;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
          <CheckCircle className="h-4 w-4" />
          Analysis Complete • {confidence}% Confidence
        </div>
        <h2 className="text-2xl font-bold text-primary-900 mb-2">
          Meet Your Brand Voice: <span className="text-accent-600">{profile.name}</span>
        </h2>
        <p className="text-secondary-500 max-w-xl mx-auto">
          {profile.description}
        </p>
      </div>

      {/* Tone Chart */}
      <div className="bg-white rounded-2xl border border-slate-200/60 p-6 mb-6">
        <h3 className="font-semibold text-primary-900 mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-accent-500" />
          Tone Profile
        </h3>
        <div className="space-y-4">
          {(Object.entries(profile.tone) as [keyof ToneAttributes, number][]).map(([key, value]) => (
            <ToneSlider
              key={key}
              label={key}
              value={value}
              lowLabel={TONE_LABELS_MAP[key].low}
              highLabel={TONE_LABELS_MAP[key].high}
            />
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Vocabulary */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-6">
          <h3 className="font-semibold text-primary-900 mb-4">Vocabulary Profile</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-secondary-500">Complexity</span>
              <span className="font-medium capitalize">{profile.vocabulary.complexity}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-secondary-500">Industry Jargon</span>
              <span className="font-medium capitalize">{profile.vocabulary.jargonLevel}</span>
            </div>
            <div className="pt-3 border-t">
              <p className="text-xs text-secondary-400 mb-2">Signature Words</p>
              <div className="flex flex-wrap gap-2">
                {profile.vocabulary.signatureWords.slice(0, 6).map((word, i) => (
                  <span key={i} className="text-xs px-2 py-1 bg-accent-100 text-accent-700 rounded-md">
                    {word}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Structure */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-6">
          <h3 className="font-semibold text-primary-900 mb-4">Writing Structure</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-secondary-500">Sentence Length</span>
              <span className="font-medium capitalize">{profile.sentenceStructure.averageLength}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-secondary-500">Paragraph Style</span>
              <span className="font-medium capitalize">{profile.sentenceStructure.paragraphStyle}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-secondary-500">Transitions</span>
              <span className="font-medium capitalize">{profile.sentenceStructure.transitionStyle}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Patterns */}
      <div className="bg-white rounded-2xl border border-slate-200/60 p-6 mb-6">
        <h3 className="font-semibold text-primary-900 mb-4">Content Patterns</h3>
        <div className="flex flex-wrap gap-3">
          {profile.contentPatterns.usesQuestions && (
            <PatternBadge label="Uses Questions" active />
          )}
          {profile.contentPatterns.usesLists && (
            <PatternBadge label="Uses Lists" active />
          )}
          {profile.contentPatterns.usesAnecdotes && (
            <PatternBadge label="Uses Anecdotes" active />
          )}
          {profile.contentPatterns.usesData && (
            <PatternBadge label="Uses Data" active />
          )}
          {profile.contentPatterns.usesMetaphors && (
            <PatternBadge label="Uses Metaphors" active />
          )}
          <PatternBadge 
            label={`${profile.contentPatterns.callToActionStyle} CTAs`} 
            active 
          />
        </div>
      </div>

      {/* Sample Excerpt */}
      {profile.sampleExcerpts.length > 0 && (
        <div className="bg-slate-50 rounded-2xl border border-slate-200/60 p-6 mb-6">
          <h3 className="font-semibold text-primary-900 mb-3">Voice Example</h3>
          <blockquote className="text-secondary-600 italic border-l-4 border-accent-400 pl-4">
            "{profile.sampleExcerpts[0]}"
          </blockquote>
        </div>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="bg-accent-50 rounded-2xl border border-accent-200/60 p-6 mb-8">
          <h3 className="font-semibold text-accent-900 mb-3">💡 Suggestions</h3>
          <ul className="space-y-2">
            {suggestions.map((suggestion, i) => (
              <li key={i} className="text-sm text-accent-800 flex items-start gap-2">
                <span className="text-accent-500">•</span>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 text-secondary-500 hover:text-secondary-700 font-medium transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Add More Samples
        </button>
        
        <button
          onClick={onComplete}
          className="inline-flex items-center gap-2 px-8 py-3 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-accent-500/25"
        >
          <CheckCircle className="h-5 w-5" />
          Save Voice Profile
        </button>
      </div>
    </motion.div>
  );
}

function CompleteStep({ profileName }: { profileName: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 0.2 }}
        className="flex justify-center mb-6"
      >
        <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
      </motion.div>
      
      <h2 className="text-2xl font-bold text-primary-900 mb-4">
        Voice Profile Saved! 🎉
      </h2>
      
      <p className="text-secondary-500 mb-8 max-w-md mx-auto">
        Your <strong className="text-primary-900">{profileName}</strong> voice profile is now active. 
        All content we create will match your unique brand voice.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="/portal"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-xl transition-colors"
        >
          Back to Dashboard
        </a>
        <a
          href="/portal/briefs/new"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-900 hover:bg-primary-800 text-white font-semibold rounded-xl transition-colors"
        >
          Create Your First Brief
        </a>
      </div>
    </motion.div>
  );
}

// Helper Components

function ToneSlider({ 
  label, 
  value, 
  lowLabel, 
  highLabel 
}: { 
  label: string; 
  value: number; 
  lowLabel: string; 
  highLabel: string;
}) {
  return (
    <div>
      <div className="flex justify-between text-xs text-secondary-400 mb-1">
        <span>{lowLabel}</span>
        <span className="font-medium text-primary-900 capitalize">{label}</span>
        <span>{highLabel}</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden relative">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent-400 to-accent-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${value * 10}%` }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 h-4 w-4 bg-white border-2 border-accent-500 rounded-full shadow-sm"
          initial={{ left: 0 }}
          animate={{ left: `calc(${value * 10}% - 8px)` }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />
      </div>
    </div>
  );
}

function PatternBadge({ label, active }: { label: string; active: boolean }) {
  return (
    <span className={`
      text-sm px-3 py-1.5 rounded-lg font-medium
      ${active 
        ? 'bg-green-100 text-green-700' 
        : 'bg-slate-100 text-secondary-400'
      }
    `}>
      {active && <span className="mr-1">✓</span>}
      {label}
    </span>
  );
}
