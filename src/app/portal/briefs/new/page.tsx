'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Target,
  Sparkles,
  CheckCircle,
  Plus,
  X,
} from 'lucide-react';
import Button from '@/components/Button';
import { ContentType, CONTENT_TYPE_LABELS, Priority } from '@/types/portal';

interface BriefFormData {
  title: string;
  contentType: ContentType;
  targetAudience: string;
  tone: string;
  wordCount: number;
  additionalNotes: string;
  brandGuidelines?: string;
  priority: Priority;
}

const contentTypes: { value: ContentType; label: string; description: string }[] = [
  { value: 'blog_post', label: 'Blog Post', description: 'SEO-optimized articles for your blog' },
  { value: 'social_media', label: 'Social Media', description: 'Posts for LinkedIn, Twitter, etc.' },
  { value: 'email_sequence', label: 'Email Sequence', description: 'Nurture campaigns and newsletters' },
  { value: 'landing_page', label: 'Landing Page', description: 'Conversion-focused web copy' },
  { value: 'case_study', label: 'Case Study', description: 'Customer success stories' },
];

const toneOptions = [
  'Professional but approachable',
  'Conversational and friendly',
  'Formal and authoritative',
  'Playful and creative',
  'Direct and no-nonsense',
  'Thought leadership',
];

export default function NewBriefPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BriefFormData>({
    defaultValues: {
      wordCount: 1500,
      priority: 'normal',
    },
  });

  const selectedContentType = watch('contentType');

  const addKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };

  const onSubmit = async (data: BriefFormData) => {
    // Mock submission
    console.log('Brief submitted:', { ...data, keywords });
    await new Promise(resolve => setTimeout(resolve, 1000));
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
            We've received your content brief. Our team will review it and start working on your draft.
            You'll receive a notification when it's ready.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/portal" variant="primary">
              Back to Dashboard
            </Button>
            <Button href="/portal/briefs/new" variant="outline" onClick={() => {
              setSubmitted(false);
              setStep(1);
              setKeywords([]);
            }}>
              Submit Another Brief
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-6"
      >
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-secondary-500 hover:text-primary-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-900">Submit New Brief</h1>
        <p className="text-secondary-500 mt-2">
          Tell us what you need and we'll get started on your content.
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
          {[
            { num: 1, label: 'Content Type', icon: FileText },
            { num: 2, label: 'Details', icon: Target },
            { num: 3, label: 'Preferences', icon: Sparkles },
          ].map((s, i) => (
            <div key={s.num} className="flex items-center">
              <div
                className={`flex items-center gap-3 ${
                  step >= s.num ? 'text-accent-600' : 'text-secondary-400'
                }`}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold ${
                    step >= s.num ? 'bg-accent-500 text-white' : 'bg-slate-200 text-secondary-500'
                  }`}
                >
                  {step > s.num ? <CheckCircle className="h-5 w-5" /> : s.num}
                </div>
                <span className="hidden sm:block font-medium">{s.label}</span>
              </div>
              {i < 2 && (
                <div
                  className={`w-12 sm:w-24 h-0.5 mx-4 ${
                    step > s.num ? 'bg-accent-500' : 'bg-slate-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1: Content Type */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="bg-white rounded-2xl border border-slate-200/60 p-6">
              <h2 className="text-lg font-semibold text-primary-900 mb-4">
                What type of content do you need?
              </h2>
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
                      className="mt-1"
                    />
                    <div>
                      <p className="font-medium text-primary-900">{type.label}</p>
                      <p className="text-sm text-secondary-500">{type.description}</p>
                    </div>
                  </label>
                ))}
              </div>
              {errors.contentType && (
                <p className="mt-3 text-sm text-red-500">{errors.contentType.message}</p>
              )}
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={() => selectedContentType && setStep(2)}
                disabled={!selectedContentType}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-500 text-white font-semibold hover:bg-accent-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="bg-white rounded-2xl border border-slate-200/60 p-6 space-y-6">
              <h2 className="text-lg font-semibold text-primary-900">
                Tell us about your content
              </h2>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-primary-900 mb-2">
                  Content Title / Topic *
                </label>
                <input
                  type="text"
                  {...register('title', { required: 'Title is required' })}
                  placeholder="e.g., 10 Ways to Improve Your Marketing ROI"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-primary-900 placeholder-secondary-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                />
                {errors.title && (
                  <p className="mt-2 text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>

              {/* Target Audience */}
              <div>
                <label className="block text-sm font-medium text-primary-900 mb-2">
                  Target Audience *
                </label>
                <input
                  type="text"
                  {...register('targetAudience', { required: 'Target audience is required' })}
                  placeholder="e.g., B2B marketing managers at mid-size SaaS companies"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-primary-900 placeholder-secondary-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                />
                {errors.targetAudience && (
                  <p className="mt-2 text-sm text-red-500">{errors.targetAudience.message}</p>
                )}
              </div>

              {/* Keywords */}
              <div>
                <label className="block text-sm font-medium text-primary-900 mb-2">
                  Target Keywords
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                    placeholder="Add a keyword and press Enter"
                    className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-primary-900 placeholder-secondary-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                  />
                  <button
                    type="button"
                    onClick={addKeyword}
                    className="px-4 py-3 rounded-xl border border-slate-200 text-secondary-600 hover:bg-slate-50 transition-colors"
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

              {/* Word Count */}
              <div>
                <label className="block text-sm font-medium text-primary-900 mb-2">
                  Word Count Target
                </label>
                <select
                  {...register('wordCount')}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-primary-900 focus:border-accent-500 focus:outline-none"
                >
                  <option value={800}>~800 words (short)</option>
                  <option value={1500}>~1,500 words (standard)</option>
                  <option value={2000}>~2,000 words (comprehensive)</option>
                  <option value={2500}>~2,500+ words (in-depth)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-200 text-secondary-600 font-semibold hover:bg-slate-50 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-500 text-white font-semibold hover:bg-accent-600 transition-colors"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Preferences */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="bg-white rounded-2xl border border-slate-200/60 p-6 space-y-6">
              <h2 className="text-lg font-semibold text-primary-900">
                Final details
              </h2>

              {/* Tone */}
              <div>
                <label className="block text-sm font-medium text-primary-900 mb-2">
                  Tone & Style *
                </label>
                <select
                  {...register('tone', { required: 'Please select a tone' })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-primary-900 focus:border-accent-500 focus:outline-none"
                >
                  <option value="">Select a tone...</option>
                  {toneOptions.map(tone => (
                    <option key={tone} value={tone}>{tone}</option>
                  ))}
                </select>
                {errors.tone && (
                  <p className="mt-2 text-sm text-red-500">{errors.tone.message}</p>
                )}
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-primary-900 mb-2">
                  Priority
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'normal', label: 'Standard', desc: '48-hour delivery' },
                    { value: 'rush', label: 'Rush', desc: '24-hour delivery' },
                    { value: 'same_day', label: 'Same Day', desc: 'ASAP delivery' },
                  ].map(option => (
                    <label
                      key={option.value}
                      className="flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all text-center hover:border-slate-300"
                    >
                      <input
                        type="radio"
                        value={option.value}
                        {...register('priority')}
                        className="mb-2"
                      />
                      <span className="font-medium text-primary-900">{option.label}</span>
                      <span className="text-xs text-secondary-500">{option.desc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-sm font-medium text-primary-900 mb-2">
                  Additional Notes
                </label>
                <textarea
                  {...register('additionalNotes')}
                  rows={4}
                  placeholder="Any specific requirements, reference links, competitors to mention, etc."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-primary-900 placeholder-secondary-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20 resize-none"
                />
              </div>

              {/* Brand Guidelines */}
              <div>
                <label className="block text-sm font-medium text-primary-900 mb-2">
                  Brand Guidelines URL <span className="text-secondary-500 font-normal">(optional)</span>
                </label>
                <input
                  type="url"
                  {...register('brandGuidelines')}
                  placeholder="https://your-company.com/brand-guidelines"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-primary-900 placeholder-secondary-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                />
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-200 text-secondary-600 font-semibold hover:bg-slate-50 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-accent-500 text-white font-semibold hover:bg-accent-600 transition-colors"
              >
                <CheckCircle className="h-4 w-4" />
                Submit Brief
              </button>
            </div>
          </motion.div>
        )}
      </form>
    </div>
  );
}
