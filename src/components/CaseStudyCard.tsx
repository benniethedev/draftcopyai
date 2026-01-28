'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Briefcase } from 'lucide-react';
import { CaseStudy } from '@/data/caseStudies';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  delay?: number;
}

export default function CaseStudyCard({ caseStudy, delay = 0 }: CaseStudyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group bg-white rounded-3xl border border-slate-200/60 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      {/* Header/Industry badge area */}
      <div className="bg-gradient-to-br from-primary-900 to-primary-800 p-6 pb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white">
            <Briefcase className="h-3.5 w-3.5" />
            {caseStudy.industry}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white">
            <Clock className="h-3.5 w-3.5" />
            {caseStudy.timeline}
          </span>
        </div>
        <h3 className="text-xl font-bold text-white leading-tight">{caseStudy.title}</h3>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-secondary-600 leading-relaxed mb-6">{caseStudy.summary}</p>

        {/* Key metrics preview */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {caseStudy.results.metrics.slice(0, 2).map((metric) => (
            <div key={metric.label} className="text-center p-3 rounded-xl bg-slate-50">
              <div className="text-2xl font-bold text-accent-600">{metric.value}</div>
              <div className="text-xs text-secondary-500">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Services tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {caseStudy.services.slice(0, 3).map((service) => (
            <span
              key={service}
              className="text-xs px-2.5 py-1 rounded-full bg-primary-100 text-primary-700"
            >
              {service}
            </span>
          ))}
        </div>

        <Link
          href={`/case-studies/${caseStudy.slug}`}
          className="inline-flex items-center gap-2 text-accent-600 font-medium group-hover:text-accent-700 transition-colors"
        >
          Read Full Story
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
