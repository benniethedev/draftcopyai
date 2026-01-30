// Onboarding types for DraftCopyAI

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  href?: string;
  action?: string;
}

export interface OnboardingProgress {
  userId: string;
  currentStep: number;
  completedSteps: string[];
  welcomeEmailSent: boolean;
  setupCallScheduled: boolean;
  setupCallDate?: Date;
  profileCompleted: boolean;
  firstBriefSubmitted: boolean;
  brandGuidelinesUploaded: boolean;
  startedAt: Date;
  completedAt?: Date;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  previewText: string;
  body: string;
  delayDays: number; // Days after signup to send
}

export interface OnboardingEmail {
  templateId: string;
  scheduledFor: Date;
  sentAt?: Date;
  openedAt?: Date;
  clickedAt?: Date;
}

export interface SetupCallSlot {
  date: Date;
  available: boolean;
}

// Default onboarding steps
export const DEFAULT_ONBOARDING_STEPS: Omit<OnboardingStep, 'completed'>[] = [
  {
    id: 'welcome',
    title: 'Welcome to DraftCopyAI',
    description: 'Check your welcome email for getting started tips',
    action: 'View Email',
  },
  {
    id: 'profile',
    title: 'Complete your profile',
    description: 'Tell us about your business and content goals',
    href: '/portal/settings/profile',
    action: 'Complete Profile',
  },
  {
    id: 'brand-voice',
    title: 'Train your brand voice',
    description: 'AI analyzes your content to capture your unique style',
    href: '/portal/onboarding/brand-voice',
    action: 'Train Voice',
  },
  {
    id: 'schedule-call',
    title: 'Schedule your strategy call',
    description: 'Meet with your content strategist (30 mins)',
    href: '/portal/onboarding/schedule',
    action: 'Schedule Call',
  },
  {
    id: 'first-brief',
    title: 'Submit your first content brief',
    description: 'Get your first piece of content started',
    href: '/portal/briefs/new',
    action: 'Create Brief',
  },
];

// Email sequence configuration
export const ONBOARDING_EMAIL_SEQUENCE = {
  welcome: { delayDays: 0, templateId: 'welcome' },
  day1Tips: { delayDays: 1, templateId: 'day1-tips' },
  day3Checkin: { delayDays: 3, templateId: 'day3-checkin' },
  day5BestPractices: { delayDays: 5, templateId: 'day5-best-practices' },
  day7Review: { delayDays: 7, templateId: 'day7-review' },
} as const;
