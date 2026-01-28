'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FileText,
  TrendingUp,
  Clock,
  CheckCircle,
  Plus,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { ProjectCard, StatsCard, OnboardingChecklist } from '@/components/portal';
import { mockClient, mockProjects, mockStats } from '@/lib/mock-data';
import CheckoutStatus from '@/components/CheckoutStatus';

export default function PortalDashboard() {
  // Get recent projects (last 5)
  const recentProjects = [...mockProjects]
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 5);

  // Get projects needing attention (revisions or near due)
  const needsAttention = mockProjects.filter(
    p => p.status === 'revision' || p.status === 'approved'
  );

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Checkout Status Toast */}
      <Suspense fallback={null}>
        <CheckoutStatus />
      </Suspense>

      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-900">
          {getGreeting()}, {mockClient.name.split(' ')[0]}
        </h1>
        <p className="text-secondary-500 mt-1">
          Here's what's happening with your content.
        </p>
      </motion.div>

      {/* Onboarding Checklist - Shows for new users */}
      <OnboardingChecklist />

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Total Projects"
          value={mockStats.totalProjects}
          icon={<FileText className="h-5 w-5" />}
          delay={0}
        />
        <StatsCard
          title="In Progress"
          value={mockStats.activeProjects}
          icon={<TrendingUp className="h-5 w-5" />}
          delay={0.1}
        />
        <StatsCard
          title="Pending Review"
          value={mockStats.pendingRevisions}
          icon={<Clock className="h-5 w-5" />}
          delay={0.2}
        />
        <StatsCard
          title="Completed"
          value={mockStats.completedProjects}
          icon={<CheckCircle className="h-5 w-5" />}
          delay={0.3}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Projects */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-primary-900">Recent Projects</h2>
            <Link
              href="/portal/projects"
              className="text-sm text-accent-600 hover:text-accent-700 font-medium flex items-center gap-1"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} delay={index * 0.05} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-slate-200/60 p-5"
          >
            <h3 className="font-semibold text-primary-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Link
                href="/portal/briefs/new"
                className="flex items-center gap-3 p-3 rounded-xl bg-accent-50 text-accent-700 hover:bg-accent-100 transition-colors"
              >
                <Plus className="h-5 w-5" />
                <span className="font-medium">Submit New Brief</span>
              </Link>
              <Link
                href="/portal/projects"
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 text-secondary-600 hover:bg-slate-100 transition-colors"
              >
                <FileText className="h-5 w-5" />
                <span className="font-medium">View All Projects</span>
              </Link>
              <Link
                href="/portal/templates"
                className="flex items-center gap-3 p-3 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors"
              >
                <Sparkles className="h-5 w-5" />
                <span className="font-medium">LinkedIn Templates</span>
              </Link>
            </div>
          </motion.div>

          {/* Needs Attention */}
          {needsAttention.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-amber-50 rounded-2xl border border-amber-200/60 p-5"
            >
              <h3 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Needs Your Attention
              </h3>
              <div className="space-y-2">
                {needsAttention.map(project => (
                  <Link
                    key={project.id}
                    href={`/portal/projects/${project.id}`}
                    className="block p-3 rounded-xl bg-white/60 hover:bg-white transition-colors"
                  >
                    <p className="font-medium text-amber-900 text-sm truncate">
                      {project.brief.title}
                    </p>
                    <p className="text-xs text-amber-700 mt-0.5">
                      {project.status === 'revision' ? 'Revision feedback provided' : 'Ready for download'}
                    </p>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

          {/* Plan Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-primary-900 rounded-2xl p-5 text-white"
          >
            <p className="text-sm text-primary-200 mb-1">Current Plan</p>
            <p className="text-xl font-bold capitalize mb-3">{mockClient.plan}</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-primary-300">Posts this month</span>
                <span className="font-medium">12 / 20</span>
              </div>
              <div className="w-full bg-primary-800 rounded-full h-2">
                <div className="bg-accent-500 h-2 rounded-full" style={{ width: '60%' }} />
              </div>
            </div>
            <Link
              href="/portal/settings/billing"
              className="mt-4 block text-center text-sm text-accent-400 hover:text-accent-300 font-medium"
            >
              Manage subscription →
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
