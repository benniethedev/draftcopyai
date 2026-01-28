'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft,
  Download,
  MessageSquare,
  Clock,
  User,
  FileText,
  Tag,
  Users,
  CheckCircle,
  Send,
  Copy,
  Check,
} from 'lucide-react';
import { StatusBadge } from '@/components/portal';
import Button from '@/components/Button';
import { getProjectById } from '@/lib/mock-data';
import { CONTENT_TYPE_LABELS } from '@/types/portal';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [feedback, setFeedback] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'draft' | 'brief'>('draft');

  const project = getProjectById(params.id as string);

  if (!project) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-primary-900 mb-4">Project not found</h1>
        <Button href="/portal/projects" variant="outline">
          Back to Projects
        </Button>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const handleSubmitFeedback = () => {
    // Mock feedback submission
    console.log('Feedback submitted:', feedback);
    setFeedbackSubmitted(true);
    setFeedback('');
  };

  const handleDownload = () => {
    if (!project.currentDraft) return;
    
    // Create blob and download
    const blob = new Blob([project.currentDraft.content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.brief.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-v${project.currentDraft.version}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    if (!project.currentDraft) return;
    navigator.clipboard.writeText(project.currentDraft.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
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
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <StatusBadge status={project.status} />
              {project.priority === 'rush' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">
                  <Clock className="h-3 w-3" />
                  Rush
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary-900">
              {project.brief.title}
            </h1>
            <p className="text-secondary-500 mt-2">
              {CONTENT_TYPE_LABELS[project.brief.contentType]} • Created {formatDate(project.createdAt)}
            </p>
          </div>

          {project.currentDraft && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-secondary-600 hover:bg-slate-50 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-green-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </button>
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent-500 text-white hover:bg-accent-600 transition-colors"
              >
                <Download className="h-4 w-4" />
                Download
              </button>
            </div>
          )}
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="flex gap-4 border-b border-slate-200 mb-6">
            <button
              onClick={() => setActiveTab('draft')}
              className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'draft'
                  ? 'border-accent-500 text-accent-600'
                  : 'border-transparent text-secondary-500 hover:text-primary-900'
              }`}
            >
              Current Draft
            </button>
            <button
              onClick={() => setActiveTab('brief')}
              className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'brief'
                  ? 'border-accent-500 text-accent-600'
                  : 'border-transparent text-secondary-500 hover:text-primary-900'
              }`}
            >
              Brief Details
            </button>
          </div>

          {activeTab === 'draft' && project.currentDraft ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden"
            >
              {/* Draft Header */}
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-primary-900">
                    Version {project.currentDraft.version}
                  </span>
                  <span className="text-sm text-secondary-500">
                    {project.currentDraft.wordCount.toLocaleString()} words
                  </span>
                </div>
                {project.currentDraft.seoScore && (
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-secondary-500">
                      SEO: <span className="text-green-600 font-medium">{project.currentDraft.seoScore}</span>
                    </span>
                    <span className="text-secondary-500">
                      Readability: <span className="text-green-600 font-medium">{project.currentDraft.readabilityScore}</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Draft Content */}
              <div className="p-6">
                <div className="prose prose-slate max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-sm text-secondary-700 leading-relaxed">
                    {project.currentDraft.content}
                  </pre>
                </div>
              </div>

              {/* Previous Feedback */}
              {project.currentDraft.feedback && (
                <div className="px-6 py-4 bg-green-50 border-t border-green-100">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-800">Editor Feedback</p>
                      <p className="text-sm text-green-700 mt-1">{project.currentDraft.feedback}</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ) : activeTab === 'draft' ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl border border-slate-200/60 p-12 text-center"
            >
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-secondary-400 mb-4">
                <FileText className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-primary-900 mb-2">Draft in progress</h3>
              <p className="text-secondary-500">
                Our team is working on your content. You'll be notified when the first draft is ready.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl border border-slate-200/60 p-6"
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-secondary-500 mb-2">Target Audience</h3>
                  <p className="text-primary-900">{project.brief.targetAudience}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-secondary-500 mb-2">Tone & Style</h3>
                  <p className="text-primary-900">{project.brief.tone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-secondary-500 mb-2">Target Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.brief.targetKeywords.map((keyword, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-sm text-secondary-700"
                      >
                        <Tag className="h-3 w-3" />
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-secondary-500 mb-2">Word Count Target</h3>
                  <p className="text-primary-900">{project.brief.wordCount.toLocaleString()} words</p>
                </div>
                {project.brief.additionalNotes && (
                  <div>
                    <h3 className="text-sm font-medium text-secondary-500 mb-2">Additional Notes</h3>
                    <p className="text-primary-900">{project.brief.additionalNotes}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Feedback Form */}
          {project.currentDraft && project.status !== 'completed' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 bg-white rounded-2xl border border-slate-200/60 p-6"
            >
              <h3 className="font-semibold text-primary-900 mb-4 flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Request Revisions
              </h3>
              {feedbackSubmitted ? (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 text-green-700">
                  <CheckCircle className="h-5 w-5" />
                  <span>Feedback submitted! We'll update the draft soon.</span>
                </div>
              ) : (
                <>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={4}
                    placeholder="Describe what changes you'd like to see..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-primary-900 placeholder-secondary-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20 resize-none"
                  />
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={handleSubmitFeedback}
                      disabled={!feedback.trim()}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-900 text-white font-medium hover:bg-primary-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="h-4 w-4" />
                      Submit Feedback
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Project Details */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-slate-200/60 p-5"
          >
            <h3 className="font-semibold text-primary-900 mb-4">Project Details</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-secondary-500">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs text-secondary-500">Due Date</p>
                  <p className="text-sm font-medium text-primary-900">{formatDate(project.dueDate)}</p>
                </div>
              </div>
              {project.assignedEditor && (
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-secondary-500">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-secondary-500">Assigned Editor</p>
                    <p className="text-sm font-medium text-primary-900">{project.assignedEditor}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-secondary-500">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs text-secondary-500">Target Audience</p>
                  <p className="text-sm font-medium text-primary-900 line-clamp-2">{project.brief.targetAudience}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Version History */}
          {project.drafts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border border-slate-200/60 p-5"
            >
              <h3 className="font-semibold text-primary-900 mb-4">Version History</h3>
              <div className="space-y-3">
                {project.drafts.map((draft, index) => (
                  <div
                    key={draft.id}
                    className={`flex items-center justify-between p-3 rounded-xl ${
                      index === 0 ? 'bg-accent-50 border border-accent-200' : 'bg-slate-50'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-medium text-primary-900">
                        Version {draft.version}
                        {index === 0 && <span className="ml-2 text-xs text-accent-600">(Current)</span>}
                      </p>
                      <p className="text-xs text-secondary-500">
                        {formatDate(draft.createdAt)} • {draft.wordCount} words
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Actions */}
          {project.status === 'approved' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-green-50 rounded-2xl border border-green-200 p-5"
            >
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-800">Ready for Download</h3>
                  <p className="text-sm text-green-700 mt-1">
                    Your content has been approved and is ready to publish.
                  </p>
                </div>
              </div>
              <button
                onClick={handleDownload}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition-colors"
              >
                <Download className="h-4 w-4" />
                Download Final Version
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
