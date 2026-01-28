// Portal types for DraftCopyAI Client Portal

export type ProjectStatus = 'draft' | 'in_review' | 'revision' | 'approved' | 'completed';
export type ContentType = 'blog_post' | 'social_media' | 'email_sequence' | 'landing_page' | 'case_study';
export type Priority = 'normal' | 'rush' | 'same_day';

export interface Brief {
  id: string;
  title: string;
  contentType: ContentType;
  targetKeywords: string[];
  targetAudience: string;
  tone: string;
  wordCount: number;
  additionalNotes: string;
  brandGuidelines?: string;
  competitorUrls?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Draft {
  id: string;
  projectId: string;
  version: number;
  content: string;
  wordCount: number;
  seoScore?: number;
  readabilityScore?: number;
  createdAt: Date;
  feedback?: string;
}

export interface Project {
  id: string;
  clientId: string;
  brief: Brief;
  status: ProjectStatus;
  priority: Priority;
  assignedEditor?: string;
  currentDraft?: Draft;
  drafts: Draft[];
  dueDate: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  plan: 'starter' | 'growth' | 'scale';
  avatar?: string;
  createdAt: Date;
}

export interface PortalStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  pendingRevisions: number;
}

export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  blog_post: 'Blog Post',
  social_media: 'Social Media',
  email_sequence: 'Email Sequence',
  landing_page: 'Landing Page',
  case_study: 'Case Study',
};

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  draft: 'Draft Submitted',
  in_review: 'In Progress',
  revision: 'Revision Requested',
  approved: 'Approved',
  completed: 'Completed',
};

export const STATUS_COLORS: Record<ProjectStatus, { bg: string; text: string }> = {
  draft: { bg: 'bg-slate-100', text: 'text-slate-700' },
  in_review: { bg: 'bg-blue-100', text: 'text-blue-700' },
  revision: { bg: 'bg-amber-100', text: 'text-amber-700' },
  approved: { bg: 'bg-green-100', text: 'text-green-700' },
  completed: { bg: 'bg-accent-100', text: 'text-accent-700' },
};
