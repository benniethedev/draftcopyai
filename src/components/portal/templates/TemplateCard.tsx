'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Mail, Users, Clock } from 'lucide-react';
import { LinkedInTemplate, TemplateCategory, INDUSTRY_LABELS } from '@/lib/linkedin-templates';

interface TemplateCardProps {
  template: LinkedInTemplate;
  onSelect: (template: LinkedInTemplate) => void;
  delay?: number;
}

const CATEGORY_ICONS: Record<TemplateCategory, React.ReactNode> = {
  'connection-request': <Users className="h-4 w-4" />,
  'cold-outreach': <MessageSquare className="h-4 w-4" />,
  'follow-up': <Clock className="h-4 w-4" />,
  'inmail': <Mail className="h-4 w-4" />,
};

const CATEGORY_COLORS: Record<TemplateCategory, { bg: string; text: string; border: string }> = {
  'connection-request': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  'cold-outreach': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  'follow-up': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  'inmail': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
};

export default function TemplateCard({ template, onSelect, delay = 0 }: TemplateCardProps) {
  const colors = CATEGORY_COLORS[template.category];

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      onClick={() => onSelect(template)}
      className="w-full text-left bg-white rounded-2xl border border-slate-200/60 p-5 hover:border-accent-300 hover:shadow-md transition-all group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`flex items-center gap-2 px-2.5 py-1 rounded-full ${colors.bg} ${colors.text} text-xs font-medium`}>
          {CATEGORY_ICONS[template.category]}
          {template.sequenceDay ? `Day ${template.sequenceDay}` : template.category.replace('-', ' ')}
        </div>
        {template.industry && template.industry !== 'general' && (
          <span className="text-xs text-secondary-400 bg-slate-100 px-2 py-1 rounded-full">
            {INDUSTRY_LABELS[template.industry]}
          </span>
        )}
      </div>

      <h3 className="font-semibold text-primary-900 mb-1 group-hover:text-accent-700 transition-colors">
        {template.name}
      </h3>
      <p className="text-sm text-secondary-500 mb-3 line-clamp-2">
        {template.description}
      </p>

      <div className="text-xs text-secondary-400 line-clamp-2 bg-slate-50 rounded-lg p-2.5 font-mono">
        {template.body.slice(0, 120)}...
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-secondary-400">
          {template.variables.length} variable{template.variables.length !== 1 ? 's' : ''}
        </span>
        <span className="text-xs text-accent-600 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
          Customize →
        </span>
      </div>
    </motion.button>
  );
}
