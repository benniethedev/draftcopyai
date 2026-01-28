'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Users, MessageSquare, Clock, Mail, Sparkles } from 'lucide-react';
import {
  LinkedInTemplate,
  TemplateCategory,
  Industry,
  LINKEDIN_TEMPLATES,
  CATEGORY_LABELS,
  CATEGORY_DESCRIPTIONS,
  INDUSTRY_LABELS,
} from '@/lib/linkedin-templates';
import TemplateCard from './TemplateCard';
import TemplateCustomizer from './TemplateCustomizer';

const CATEGORY_ICONS: Record<TemplateCategory, React.ReactNode> = {
  'connection-request': <Users className="h-5 w-5" />,
  'cold-outreach': <MessageSquare className="h-5 w-5" />,
  'follow-up': <Clock className="h-5 w-5" />,
  'inmail': <Mail className="h-5 w-5" />,
};

const ALL_CATEGORIES: TemplateCategory[] = ['connection-request', 'cold-outreach', 'follow-up', 'inmail'];
const ALL_INDUSTRIES: Industry[] = ['general', 'saas', 'ecommerce', 'professional-services', 'fintech', 'healthcare', 'manufacturing'];

export default function TemplateBrowser() {
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'all'>('all');
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<LinkedInTemplate | null>(null);

  const filteredTemplates = useMemo(() => {
    return LINKEDIN_TEMPLATES.filter(template => {
      // Category filter
      if (selectedCategory !== 'all' && template.category !== selectedCategory) {
        return false;
      }

      // Industry filter
      if (selectedIndustry !== 'all') {
        if (template.industry !== selectedIndustry && template.industry !== 'general') {
          return false;
        }
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          template.name.toLowerCase().includes(query) ||
          template.description.toLowerCase().includes(query) ||
          template.body.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [selectedCategory, selectedIndustry, searchQuery]);

  // Group templates by category for display
  const groupedTemplates = useMemo(() => {
    if (selectedCategory !== 'all') {
      return { [selectedCategory]: filteredTemplates };
    }

    const groups: Partial<Record<TemplateCategory, LinkedInTemplate[]>> = {};
    filteredTemplates.forEach(template => {
      if (!groups[template.category]) {
        groups[template.category] = [];
      }
      groups[template.category]!.push(template);
    });
    return groups;
  }, [filteredTemplates, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-accent-600 to-accent-700 rounded-2xl p-6 text-white"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-1">LinkedIn Outreach Templates</h1>
            <p className="text-accent-100">
              Proven templates for B2B content marketing prospecting. Customize, copy, and send.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border border-slate-200/60 p-5"
      >
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search templates..."
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-accent-100 text-accent-700'
                : 'bg-slate-100 text-secondary-600 hover:bg-slate-200'
            }`}
          >
            All Templates
          </button>
          {ALL_CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-accent-100 text-accent-700'
                  : 'bg-slate-100 text-secondary-600 hover:bg-slate-200'
              }`}
            >
              {CATEGORY_ICONS[category]}
              {CATEGORY_LABELS[category]}
            </button>
          ))}
        </div>

        {/* Industry Filter */}
        <div className="flex items-center gap-3">
          <Filter className="h-4 w-4 text-secondary-400" />
          <span className="text-sm text-secondary-500">Industry:</span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedIndustry('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedIndustry === 'all'
                  ? 'bg-primary-900 text-white'
                  : 'bg-slate-100 text-secondary-600 hover:bg-slate-200'
              }`}
            >
              All
            </button>
            {ALL_INDUSTRIES.filter(i => i !== 'general').map(industry => (
              <button
                key={industry}
                onClick={() => setSelectedIndustry(industry)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedIndustry === industry
                    ? 'bg-primary-900 text-white'
                    : 'bg-slate-100 text-secondary-600 hover:bg-slate-200'
                }`}
              >
                {INDUSTRY_LABELS[industry]}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-secondary-500">
          Showing <span className="font-medium text-primary-900">{filteredTemplates.length}</span> template{filteredTemplates.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Template Grid by Category */}
      {filteredTemplates.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-slate-50 rounded-2xl p-12 text-center"
        >
          <p className="text-secondary-500">No templates match your filters.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedIndustry('all');
              setSearchQuery('');
            }}
            className="mt-3 text-sm text-accent-600 hover:text-accent-700 font-medium"
          >
            Clear filters
          </button>
        </motion.div>
      ) : (
        Object.entries(groupedTemplates).map(([category, templates]) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {selectedCategory === 'all' && (
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-primary-900 flex items-center gap-2">
                  {CATEGORY_ICONS[category as TemplateCategory]}
                  {CATEGORY_LABELS[category as TemplateCategory]}
                </h2>
                <p className="text-sm text-secondary-500">
                  {CATEGORY_DESCRIPTIONS[category as TemplateCategory]}
                </p>
              </div>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {templates.map((template, index) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onSelect={setSelectedTemplate}
                  delay={index * 0.03}
                />
              ))}
            </div>
          </motion.div>
        ))
      )}

      {/* Template Customizer Modal */}
      <TemplateCustomizer
        template={selectedTemplate}
        onClose={() => setSelectedTemplate(null)}
      />
    </div>
  );
}
