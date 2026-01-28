'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, FileText, Clock, ChevronRight } from 'lucide-react';
import { Project, CONTENT_TYPE_LABELS } from '@/types/portal';
import StatusBadge from './StatusBadge';

interface ProjectCardProps {
  project: Project;
  delay?: number;
}

export default function ProjectCard({ project, delay = 0 }: ProjectCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const isOverdue = new Date() > project.dueDate && !['completed', 'approved'].includes(project.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <Link href={`/portal/projects/${project.id}`}>
        <div className="group bg-white rounded-2xl border border-slate-200/60 p-5 hover:shadow-md hover:border-slate-300 transition-all duration-200">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-primary-900 group-hover:text-accent-600 transition-colors truncate">
                {project.brief.title}
              </h3>
              <p className="text-sm text-secondary-500 mt-1">
                {CONTENT_TYPE_LABELS[project.brief.contentType]}
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-secondary-400 group-hover:text-accent-500 transition-colors flex-shrink-0" />
          </div>

          <div className="flex items-center gap-4 text-sm text-secondary-500 mb-4">
            <div className="flex items-center gap-1.5">
              <FileText className="h-4 w-4" />
              <span>{project.brief.wordCount.toLocaleString()} words</span>
            </div>
            <div className={`flex items-center gap-1.5 ${isOverdue ? 'text-red-500' : ''}`}>
              <Calendar className="h-4 w-4" />
              <span>Due {formatDate(project.dueDate)}</span>
            </div>
            {project.priority === 'rush' && (
              <div className="flex items-center gap-1.5 text-amber-600">
                <Clock className="h-4 w-4" />
                <span>Rush</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <StatusBadge status={project.status} size="sm" />
            {project.currentDraft && (
              <span className="text-xs text-secondary-400">
                v{project.currentDraft.version} • {project.currentDraft.wordCount} words
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
