'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Target,
  Sparkles,
  MessageSquare,
  CheckCircle,
  Plus,
  X,
  Save,
  Trash2,
  AlertCircle,
  Link as LinkIcon,
  Lightbulb,
} from 'lucide-react';
import Button from '@/components/Button';
import {
  ContentType,
  ContentBriefFormData,
  BriefDraft,
  Priority,
} from '@/types/portal';

const DRAFT_STORAGE_KEY = 'draftcopyai_brief_draft';

const contentTypes: { value: ContentType; label: string; description: string; icon: string }[] = [
  { value: 'blog_post', label: 'Blog Post', description: 'SEO-optimized articles for your blog', icon: '📝' },
  { value: 'landing_page', label: 'Landing Page', description: 'Conversion-focused web copy', icon: '🎯' },
  { value: 'email_sequence', label: 'Email Sequence', description: 'Nurture campaigns and newsletters', icon: '📧' },
  { value: 'social_media', label: 'Social Media', description: 'Posts for LinkedIn, Twitter, etc.', icon: '📱' },
  { value: 'ad_copy', label: 'Ad Copy', description: 'Google, Facebook, LinkedIn ads', icon: '📢' },
  { value: 'case_study', label: 'Case Study', description: 'Customer success stories', icon: '📊' },
  { value: 'product_description', label: 'Product Description', description: 'E-commerce and SaaS products', icon: '🏷️' },
  { value: 'whitepaper', label: 'Whitepaper / Guide', description: 'In-depth educational content', icon: '📚' },
];

const toneOptions = [
  { value: 'professional', label: 'Professional but approachable' },
  { value: 'conversational', label: 'Conversational and friendly' },
  { value: 'formal', label: 'Formal and authoritative' },
  { value: 'playful', label: 'Playful and creative' },
  { value: 'direct', label: 'Direct and no-nonsense' },
  { value: 'thought_leadership', label: 'Thought leadership' },
  { value: 'empathetic', label: 'Empathetic and supportive' },
  { value: 'custom', label: 'Custom (describe below)' },
];

const wordCountOptions = [
  { value: 500, label: '~500 words', description: 'Quick read' },
  { value: 800, label: '~800 words', description: 'Short article' },
  { value: 1500, label: '~1,500 words', description: 'Standard' },
  { value: 2000, label: '~2,000 words', description: 'Comprehensive' },
  { value: 2500, label: '~2,500+ words', description: 'In-depth' },
];

const steps = [
  { num: 1, label: 'Content Type', icon: FileText },
  { num: 2, label: 'Audience & Voice', icon: Target },
  { num: 3, label: 'Key Messages', icon: MessageSquare },
  { num: 4, label: 'Details & SEO', icon: Sparkles },
];

export default function NewBriefPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState('');
  const [keyMessages, setKeyMessages] = useState<string[]>(['']);
  const [competitorUrls, setCompetitorUrls] = useState<string[]>(['']);
  const [submitted, setSubmitted] = useState(false);
  const [hasDraft, setHasDraft] = useState(false);
  const [showDraftRestored, setShowDraftRestored] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    trigger,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm<ContentBriefFormData>({
    mode: 'onChange',
    defaultValues: {
      wordCount: 1500,
      priority: 'normal',
      keyMessages: [],
      competitorUrls: [],
      targetKeywords: [],
    },
  });

  const selectedContentType = watch('contentType');
  const selectedTone = watch('tone');

  // Load draft from localStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (savedDraft) {
      try {
        const draft: BriefDraft = JSON.parse(savedDraft);
        if (draft.formData) {
          // Restore form data
          Object.entries(draft.formData).forEach(([key, value]) => {
            if (value !== undefined) {
              setValue(key as keyof ContentBriefFormData, value);
            }
          });
          // Restore arrays
          if (draft.formData.keyMessages?.length) {
            setKeyMessages(draft.formData.keyMessages);
          }
          if (draft.formData.competitorUrls?.length) {
            setCompetitorUrls(draft.formData.competitorUrls);
          }
          if (draft.formData.targetKeywords?.length) {
            setKeywords(draft.formData.targetKeywords);
          }
          setStep(draft.currentStep || 1);
          setHasDraft(true);
          setShowDraftRestored(true);
          setTimeout(() => setShowDraftRestored(false), 3000);
        }
      } catch (e) {
        console.error('Failed to restore draft:', e);
      }
    }
  }, [setValue]);

  // Save draft function
  const saveDraft = useCallback(() => {
    const formData = getValues();
    const draft: BriefDraft = {
      formData: {
        ...formData,
        keyMessages: keyMessages.filter(m => m.trim()),
        competitorUrls: competitorUrls.filter(u => u.trim()),
        targetKeywords: keywords,
      },
      currentStep: step,
      savedAt: new Date(),
    };
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
    setHasDraft(true);
  }, [getValues, keyMessages, competitorUrls, keywords, step]);

  // Auto-save on field changes
  useEffect(() => {
    const subscription = watch(() => {
      saveDraft();
    });
    return () => subscription.unsubscribe();
  }, [watch, saveDraft]);

  // Save when arrays change
  useEffect(() => {
    if (keyMessages.length || competitorUrls.length || keywords.length) {
      saveDraft();
    }
  }, [keyMessages, competitorUrls, keywords, saveDraft]);

  const clearDraft = () => {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    setHasDraft(false);
    reset();
    setKeywords([]);
    setKeyMessages(['']);
    setCompetitorUrls(['']);
    setStep(1);
  };

  const addKeyword = () => {
    const trimmed = keywordInput.trim();
    if (trimmed && !keywords.includes(trimmed)) {
      setKeywords([...keywords, trimmed]);
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };

  const addKeyMessage = () => {
    setKeyMessages([...keyMessages, '']);
  };

  const updateKeyMessage = (index: number, value: string) => {
    const updated = [...keyMessages];
    updated[index] = value;
    setKeyMessages(updated);
  };

  const removeKeyMessage = (index: number) => {
    if (keyMessages.length > 1) {
      setKeyMessages(keyMessages.filter((_, i) => i !== index));
    }
  };

  const addCompetitorUrl = () => {
    setCompetitorUrls([...competitorUrls, '']);
  };

  const updateCompetitorUrl = (index: number, value: string) => {
    const updated = [...competitorUrls];
    updated[index] = value;
    setCompetitorUrls(updated);
  };

  const removeCompetitorUrl = (index: number) => {
    if (competitorUrls.length > 1) {
      setCompetitorUrls(competitorUrls.filter((_, i) => i !== index));
    }
  };

  const validateUrl = (url: string): boolean => {
    if (!url.trim()) return true; // Empty is OK (optional)
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const canProceed = async (currentStep: number): Promise<boolean> => {
    switch (currentStep) {
      case 1:
        return !!selectedContentType;
      case 2:
        return await trigger(['targetAudience', 'tone']);
      case 3:
        return keyMessages.some(m => m.trim().length > 0);
      case 4:
        return await trigger(['callToAction']);
      default:
        return true;
    }
  };

  const handleNext = async () => {
    if (await canProceed(step)) {
      setStep(step + 1);
      saveDraft();
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    saveDraft();
  };

  const onSubmit = async (data: ContentBriefFormData) => {
    setIsSubmitting(true);
    const fullData = {
      ...data,
      keyMessages: keyMessages.filter(m => m.trim()),
      competitorUrls: competitorUrls.filter(u => u.trim()),
      targetKeywords: keywords,
    };
    
    // Mock submission
    console.log('Brief submitted:', fullData);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Clear draft on successful submission
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-green-100 text-green-600 mb-6">
            <CheckCircle className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-bold text-primary-900 mb-4">Brief Submitted!</h1>
          <p className="text-lg text-secondary-500 mb-8">
            We&apos;ve received your content brief. Our team will review it and start working on your draft.
            You&apos;ll receive a notification when it&apos;s ready.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/portal" variant="primary">
              Back to Dashboard
            </Button>
            <Button
              href="/portal/briefs/new"
              variant="outline"
              onClick={() => {
                setSubmitted(false);
                setStep(1);
                setKeywords([]);
                setKeyMessages(['']);
                setCompetitorUrls(['']);
                reset();
              }}
            >
              Submit Another Brief
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Draft Restored Toast */}
      <AnimatePresence>
        {showDraftRestored && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-accent-600 text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium"
          >
            ✓ Draft restored
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back Button & Draft Controls */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-secondary-500 hover:text-primary-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        
        <div className="flex items-center gap-2">
          {hasDraft && (
            <>
              <span className="text-xs text-secondary-400 hidden sm:inline">Draft saved</span>
              <button
                onClick={clearDraft}
                className="inline-flex items-center gap-1 text-xs text-secondary-500 hover:text-red-500 transition-colors px-2 py-1 rounded-lg hover:bg-red-50"
              >
                <Trash2 className="h-3 w-3" />
                <span className="hidden sm:inline">Clear draft</span>
              </button>
            </>
          )}
          <button
            onClick={saveDraft}
            className="inline-flex items-center gap-1 text-xs text-secondary-500 hover:text-accent-600 transition-colors px-2 py-1 rounded-lg hover:bg-accent-50"
          >
            <Save className="h-3 w-3" />
            <span className="hidden sm:inline">Save draft</span>
          </button>
        </div>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-900">Submit New Brief</h1>
        <p className="text-secondary-500 mt-2">
          Tell us what content you need and we&apos;ll bring it to life.
        </p>
      </motion.div>

      {/* Progress Steps */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center">
              <button
                onClick={() => s.num < step && setStep(s.num)}
                disabled={s.num > step}
                className={`flex items-center gap-2 sm:gap-3 ${
                  step >= s.num ? 'text-accent-600' : 'text-secondary-400'
                } ${s.num < step ? 'cursor-pointer hover:opacity-80' : ''}`}
              >
                <div
                  className={`flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full font-semibold text-sm sm:text-base transition-colors ${
                    step >= s.num ? 'bg-accent-500 text-white' : 'bg-slate-200 text-secondary-500'
                  }`}
                >
                  {step > s.num ? <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" /> : s.num}
                </div>
                <span className="hidden lg:block font-medium text-sm">{s.label}</span>
              </button>
              {i < steps.length - 1 && (
                <div
                  className={`w-8 sm:w-12 lg:w-20 h-0.5 mx-2 sm:mx-4 transition-colors ${
                    step > s.num ? 'bg-accent-500' : 'bg-slate-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          {/* Step 1: Content Type */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="bg-white rounded-2xl border border-slate-200/60 p-6">
                <h2 className="text-lg font-semibold text-primary-900 mb-2">
                  What type of content do you need?
                </h2>
                <p className="text-secondary-500 text-sm mb-6">
                  Select the format that best fits your project.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {contentTypes.map(type => (
                    <label
                      key={type.value}
                      className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedContentType === type.value
                          ? 'border-accent-500 bg-accent-50'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        value={type.value}
                        {...register('contentType', { required: 'Please select a content type' })}
                        className="mt-1 sr-only"
                      />
                      <span className="text-2xl">{type.icon}</span>
                      <div className="flex-1">
                        <p className="font-medium text-primary-900">{type.label}</p>
                        <p className="text-sm text-secondary-500">{type.description}</p>
                      </div>
                      {selectedContentType === type.value && (
                        <CheckCircle className="h-5 w-5 text-accent-500 mt-1" />
                      )}
                    </label>
                  ))}
                </div>
                {errors.contentType && (
                  <p className="mt-3 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.contentType.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!selectedContentType}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-500 text-white font-semibold hover:bg-accent-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Audience & Voice */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="bg-white rounded-2xl border border-slate-200/60 p-6 space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-primary-900 mb-2">
                    Who&apos;s your target audience?
                  </h2>
                  <p className="text-secondary-500 text-sm mb-4">
                    Help us understand who will be reading this content.
                  </p>
                </div>

                {/* Target Audience */}
                <div>
                  <label className="block text-sm font-medium text-primary-900 mb-2">
                    Target Audience Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register('targetAudience', {
                      required: 'Target audience is required',
                      minLength: { value: 20, message: 'Please provide more detail (at least 20 characters)' },
                    })}
                    rows={3}
                    placeholder="e.g., B2B marketing managers at mid-size SaaS companies (50-500 employees) who are frustrated with their current content output and looking to scale..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-primary-900 placeholder-secondary-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20 resize-none"
                  />
                  {errors.targetAudience && (
                    <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.targetAudience.message}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-secondary-400">
                    Include demographics, pain points, and what motivates them.
                  </p>
                </div>

                {/* Brand Voice / Tone */}
                <div>
                  <label className="block text-sm font-medium text-primary-900 mb-2">
                    Brand Voice & Tone <span className="text-red-500">*</span>
                  </label>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {toneOptions.map(tone => (
                      <label
                        key={tone.value}
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                          selectedTone === tone.value
                            ? 'border-accent-500 bg-accent-50'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="radio"
                          value={tone.value}
                          {...register('tone', { required: 'Please select a tone' })}
                          className="sr-only"
                        />
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            selectedTone === tone.value ? 'border-accent-500' : 'border-slate-300'
                          }`}
                        >
                          {selectedTone === tone.value && (
                            <div className="w-2 h-2 rounded-full bg-accent-500" />
                          )}
                        </div>
                        <span className="text-sm text-primary-900">{tone.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.tone && (
                    <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.tone.message}
                    </p>
                  )}
                </div>

                {/* Custom Tone (conditional) */}
                {selectedTone === 'custom' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <label className="block text-sm font-medium text-primary-900 mb-2">
                      Describe your brand voice
                    </label>
                    <textarea
                      {...register('customTone')}
                      rows={2}
                      placeholder="e.g., Warm and knowledgeable, like a trusted advisor. Avoid jargon but don't oversimplify..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-primary-900 placeholder-secondary-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20 resize-none"
                    />
                  </motion.div>
                )}

                {/* Brand Guidelines URL */}
                <div>
                  <label className="block text-sm font-medium text-primary-900 mb-2">
                    Brand Guidelines URL <span className="text-secondary-400 font-normal">(optional)</span>
                  </label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary-400" />
                    <input
                      type="url"
                      {...register('brandGuidelines')}
                      placeholder="https://your-company.com/brand-guidelines"
                      className="w-full pl-10 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-primary-900 placeholder-secondary-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                    />
                  </div>
                  <p className="mt-1 text-xs text-secondary-400">
                    Link to your style guide, brand book, or voice documentation.
                  </p>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-200 text-secondary-600 font-semibold hover:bg-slate-50 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-500 text-white font-semibold hover:bg-accent-600 transition-colors"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Key Messages */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="bg-white rounded-2xl border border-slate-200/60 p-6 space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-primary-900 mb-2">
                    What key messages should we cover?
                  </h2>
                  <p className="text-secondary-500 text-sm">
                    List the main points, arguments, or ideas you want included.
                  </p>
                </div>

                {/* Key Messages */}
                <div>
                  <label className="block text-sm font-medium text-primary-900 mb-2">
                    Key Messages / Points to Cover <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    {keyMessages.map((message, index) => (
                      <div key={index} className="flex gap-2">
                        <div className="flex-shrink-0 w-6 h-10 flex items-center justify-center text-secondary-400 text-sm">
                          {index + 1}.
                        </div>
                        <input
                          type="text"
                          value={message}
                          onChange={(e) => updateKeyMessage(index, e.target.value)}
                          placeholder={`Key message ${index + 1}...`}
                          className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-primary-900 placeholder-secondary-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                        />
                        {keyMessages.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeKeyMessage(index)}
                            className="flex-shrink-0 p-2.5 text-secondary-400 hover:text-red-500 transition-colors"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={addKeyMessage}
                    className="mt-2 inline-flex items-center gap-1 text-sm text-accent-600 hover:text-accent-700 font-medium"
                  >
                    <Plus className="h-4 w-4" />
                    Add another message
                  </button>
                  {keyMessages.every(m => !m.trim()) && (
                    <p className="mt-2 text-sm text-amber-600 flex items-center gap-1">
                      <Lightbulb className="h-4 w-4" />
                      Add at least one key message to continue
                    </p>
                  )}
                </div>

                {/* Competitor References */}
                <div>
                  <label className="block text-sm font-medium text-primary-900 mb-2">
                    Competitor References <span className="text-secondary-400 font-normal">(optional)</span>
                  </label>
                  <p className="text-secondary-500 text-sm mb-3">
                    Share URLs of competitor content you like or want to differentiate from.
                  </p>
                  <div className="space-y-2">
                    {competitorUrls.map((url, index) => (
                      <div key={index} className="flex gap-2">
                        <div className="relative flex-1">
                          <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary-400" />
                          <input
                            type="url"
                            value={url}
                            onChange={(e) => updateCompetitorUrl(index, e.target.value)}
                            placeholder="https://competitor.com/their-content"
                            className={`w-full pl-10 rounded-xl border bg-slate-50 px-4 py-2.5 text-primary-900 placeholder-secondary-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20 ${
                              url && !validateUrl(url) ? 'border-red-300' : 'border-slate-200'
                            }`}
                          />
                        </div>
                        {competitorUrls.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeCompetitorUrl(index)}
                            className="flex-shrink-0 p-2.5 text-secondary-400 hover:text-red-500 transition-colors"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={addCompetitorUrl}
                    className="mt-2 inline-flex items-center gap-1 text-sm text-accent-600 hover:text-accent-700 font-medium"
                  >
                    <Plus className="h-4 w-4" />
                    Add another URL
                  </button>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-200 text-secondary-600 font-semibold hover:bg-slate-50 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={keyMessages.every(m => !m.trim())}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-500 text-white font-semibold hover:bg-accent-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Details & SEO */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="bg-white rounded-2xl border border-slate-200/60 p-6 space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-primary-900 mb-2">
                    Final details
                  </h2>
                  <p className="text-secondary-500 text-sm">
                    Add SEO keywords, word count, and any specific requirements.
                  </p>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-primary-900 mb-2">
                    Content Title / Topic <span className="text-secondary-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    {...register('title')}
                    placeholder="e.g., 10 Ways to Improve Your Marketing ROI"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-primary-900 placeholder-secondary-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                  />
                  <p className="mt-1 text-xs text-secondary-400">
                    Leave blank if you want us to suggest titles.
                  </p>
                </div>

                {/* Word Count */}
                <div>
                  <label className="block text-sm font-medium text-primary-900 mb-2">
                    Word Count Target
                  </label>
                  <Controller
                    control={control}
                    name="wordCount"
                    render={({ field }) => (
                      <div className="flex flex-wrap gap-2">
                        {wordCountOptions.map(option => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => field.onChange(option.value)}
                            className={`px-4 py-2 rounded-xl border text-sm transition-all ${
                              field.value === option.value
                                ? 'border-accent-500 bg-accent-50 text-accent-700'
                                : 'border-slate-200 hover:border-slate-300 text-secondary-600'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  />
                </div>

                {/* SEO Keywords */}
                <div>
                  <label className="block text-sm font-medium text-primary-900 mb-2">
                    SEO Keywords <span className="text-secondary-400 font-normal">(if applicable)</span>
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addKeyword();
                        }
                      }}
                      placeholder="Type a keyword and press Enter"
                      className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-primary-900 placeholder-secondary-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                    />
                    <button
                      type="button"
                      onClick={addKeyword}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 text-secondary-600 hover:bg-slate-50 transition-colors"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                  {keywords.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {keywords.map(keyword => (
                        <span
                          key={keyword}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent-100 text-accent-700 text-sm"
                        >
                          {keyword}
                          <button type="button" onClick={() => removeKeyword(keyword)}>
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Call to Action */}
                <div>
                  <label className="block text-sm font-medium text-primary-900 mb-2">
                    Call-to-Action <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('callToAction', { required: 'Please specify a call-to-action' })}
                    placeholder="e.g., Schedule a demo, Download the guide, Start free trial..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-primary-900 placeholder-secondary-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                  />
                  {errors.callToAction && (
                    <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.callToAction.message}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-secondary-400">
                    What action should readers take after consuming this content?
                  </p>
                </div>

                {/* Specific Requirements */}
                <div>
                  <label className="block text-sm font-medium text-primary-900 mb-2">
                    Specific Requirements / Constraints
                  </label>
                  <textarea
                    {...register('specificRequirements')}
                    rows={3}
                    placeholder="Any must-haves, must-avoids, compliance requirements, formatting needs, references to include, internal links..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-primary-900 placeholder-secondary-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20 resize-none"
                  />
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm font-medium text-primary-900 mb-2">
                    Priority
                  </label>
                  <Controller
                    control={control}
                    name="priority"
                    render={({ field }) => (
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { value: 'normal' as Priority, label: 'Standard', desc: '3-5 days' },
                          { value: 'rush' as Priority, label: 'Rush', desc: '24-48 hours' },
                          { value: 'same_day' as Priority, label: 'Same Day', desc: 'ASAP' },
                        ].map(option => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => field.onChange(option.value)}
                            className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all text-center ${
                              field.value === option.value
                                ? 'border-accent-500 bg-accent-50'
                                : 'border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <span className="font-medium text-primary-900">{option.label}</span>
                            <span className="text-xs text-secondary-500">{option.desc}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-200 text-secondary-600 font-semibold hover:bg-slate-50 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-accent-500 text-white font-semibold hover:bg-accent-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      Submit Brief
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
