'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Plus, Search, Filter, ArrowUpDown } from 'lucide-react';
import { ProjectCard } from '@/components/portal';
import { mockProjects } from '@/lib/mock-data';
import { ProjectStatus, STATUS_LABELS, ContentType, CONTENT_TYPE_LABELS } from '@/types/portal';

type SortOption = 'newest' | 'oldest' | 'due_date';

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<ContentType | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  // Filter and sort projects
  const filteredProjects = mockProjects
    .filter(project => {
      const matchesSearch = project.brief.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
      const matchesType = typeFilter === 'all' || project.brief.contentType === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.createdAt.getTime() - a.createdAt.getTime();
        case 'oldest':
          return a.createdAt.getTime() - b.createdAt.getTime();
        case 'due_date':
          return a.dueDate.getTime() - b.dueDate.getTime();
        default:
          return 0;
      }
    });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-primary-900">All Projects</h1>
          <p className="text-secondary-500 mt-1">
            {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <Link
          href="/portal/briefs/new"
          className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Brief
        </Link>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border border-slate-200/60 p-4 mb-6"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-primary-900 placeholder-secondary-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-secondary-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as ProjectStatus | 'all')}
              className="px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-primary-900 focus:border-accent-500 focus:outline-none"
            >
              <option value="all">All Status</option>
              {Object.entries(STATUS_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as ContentType | 'all')}
            className="px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-primary-900 focus:border-accent-500 focus:outline-none"
          >
            <option value="all">All Types</option>
            {Object.entries(CONTENT_TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-secondary-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-primary-900 focus:border-accent-500 focus:outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="due_date">Due Date</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} delay={index * 0.03} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-secondary-400 mb-4">
            <Search className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-semibold text-primary-900 mb-2">No projects found</h3>
          <p className="text-secondary-500 mb-6">
            Try adjusting your filters or search query
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setStatusFilter('all');
              setTypeFilter('all');
            }}
            className="text-accent-600 hover:text-accent-700 font-medium"
          >
            Clear all filters
          </button>
        </motion.div>
      )}
    </div>
  );
}
