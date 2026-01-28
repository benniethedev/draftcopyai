'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Lightbulb, MessageSquare, Mail } from 'lucide-react';
import { LinkedInTemplate, fillTemplate, CATEGORY_LABELS } from '@/lib/linkedin-templates';

interface TemplateCustomizerProps {
  template: LinkedInTemplate | null;
  onClose: () => void;
}

export default function TemplateCustomizer({ template, onClose }: TemplateCustomizerProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<'subject' | 'body' | null>(null);

  // Reset values when template changes
  useMemo(() => {
    if (template) {
      const initial: Record<string, string> = {};
      template.variables.forEach(v => {
        initial[v.key] = '';
      });
      setValues(initial);
    }
  }, [template?.id]);

  const filledTemplate = useMemo(() => {
    if (!template) return { subject: undefined, body: '' };
    return fillTemplate(template, values);
  }, [template, values]);

  const handleCopy = useCallback(async (type: 'subject' | 'body') => {
    const text = type === 'subject' ? filledTemplate.subject : filledTemplate.body;
    if (!text) return;

    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  }, [filledTemplate]);

  const hasEmptyVariables = useMemo(() => {
    return Object.values(values).some(v => !v.trim());
  }, [values]);

  const charCount = filledTemplate.body.length;
  const isConnectionRequest = template?.category === 'connection-request';
  const charLimit = isConnectionRequest ? 300 : null;
  const isOverLimit = charLimit && charCount > charLimit;

  if (!template) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
            <div>
              <p className="text-sm text-secondary-500 mb-0.5">{CATEGORY_LABELS[template.category]}</p>
              <h2 className="text-xl font-bold text-primary-900">{template.name}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-secondary-500" />
            </button>
          </div>

          <div className="flex-1 overflow-auto">
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
              {/* Variables Panel */}
              <div className="p-6">
                <h3 className="font-semibold text-primary-900 mb-4 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-accent-100 text-accent-600 text-xs">1</span>
                  Customize Variables
                </h3>
                <div className="space-y-4">
                  {template.variables.map(variable => (
                    <div key={variable.key}>
                      <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                        {variable.label}
                      </label>
                      <input
                        type="text"
                        value={values[variable.key] || ''}
                        onChange={e => setValues(prev => ({ ...prev, [variable.key]: e.target.value }))}
                        placeholder={variable.example}
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors text-sm"
                      />
                      <p className="text-xs text-secondary-400 mt-1">
                        Example: {variable.example}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Tips */}
                {template.tips && template.tips.length > 0 && (
                  <div className="mt-6 bg-amber-50 rounded-xl p-4 border border-amber-200">
                    <h4 className="font-medium text-amber-800 mb-2 flex items-center gap-2">
                      <Lightbulb className="h-4 w-4" />
                      Pro Tips
                    </h4>
                    <ul className="space-y-1.5">
                      {template.tips.map((tip, i) => (
                        <li key={i} className="text-sm text-amber-700 flex items-start gap-2">
                          <span className="text-amber-500 mt-1">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Preview Panel */}
              <div className="p-6 bg-slate-50">
                <h3 className="font-semibold text-primary-900 mb-4 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-accent-100 text-accent-600 text-xs">2</span>
                  Preview & Copy
                </h3>

                {/* Subject (for InMail) */}
                {template.subject && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-secondary-700 flex items-center gap-1.5">
                        <Mail className="h-4 w-4" />
                        Subject Line
                      </label>
                      <button
                        onClick={() => handleCopy('subject')}
                        className="flex items-center gap-1.5 text-xs font-medium text-accent-600 hover:text-accent-700 transition-colors"
                      >
                        {copied === 'subject' ? (
                          <>
                            <Check className="h-3.5 w-3.5" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-slate-200 text-sm">
                      {filledTemplate.subject}
                    </div>
                  </div>
                )}

                {/* Body */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-secondary-700 flex items-center gap-1.5">
                      <MessageSquare className="h-4 w-4" />
                      Message Body
                    </label>
                    <button
                      onClick={() => handleCopy('body')}
                      className="flex items-center gap-1.5 text-xs font-medium text-accent-600 hover:text-accent-700 transition-colors"
                    >
                      {copied === 'body' ? (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-slate-200 text-sm whitespace-pre-wrap min-h-[200px] max-h-[400px] overflow-auto">
                    {filledTemplate.body}
                  </div>

                  {/* Character count */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-xs text-secondary-400">
                      {hasEmptyVariables && (
                        <span className="text-amber-600">Fill all variables for best results</span>
                      )}
                    </div>
                    <div className={`text-xs ${isOverLimit ? 'text-red-500 font-medium' : 'text-secondary-400'}`}>
                      {charCount} characters
                      {charLimit && ` / ${charLimit} limit`}
                      {isOverLimit && ' ⚠️'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
            <p className="text-sm text-secondary-500">
              {template.category === 'follow-up' && template.sequenceDay && (
                <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-xs font-medium">
                  <span>Send on Day {template.sequenceDay}</span>
                </span>
              )}
            </p>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-secondary-600 hover:text-secondary-800 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => handleCopy('body')}
                disabled={hasEmptyVariables}
                className="px-5 py-2 bg-accent-600 text-white rounded-xl text-sm font-medium hover:bg-accent-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {copied === 'body' ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy to Clipboard
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
