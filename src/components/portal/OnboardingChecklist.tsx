'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  CheckCircle,
  Circle,
  ChevronRight,
  X,
  Sparkles,
  Calendar,
  FileText,
  User,
  Wand2,
} from 'lucide-react';
import { OnboardingStep, DEFAULT_ONBOARDING_STEPS } from '@/types/onboarding';

interface OnboardingChecklistProps {
  // In production, these would come from the user's onboarding progress in the database
  completedSteps?: string[];
  onDismiss?: () => void;
  onStepClick?: (stepId: string) => void;
}

const stepIcons: Record<string, React.ReactNode> = {
  welcome: <Sparkles className="h-5 w-5" />,
  profile: <User className="h-5 w-5" />,
  'brand-voice': <Wand2 className="h-5 w-5" />,
  'schedule-call': <Calendar className="h-5 w-5" />,
  'first-brief': <FileText className="h-5 w-5" />,
};

export default function OnboardingChecklist({
  completedSteps = [],
  onDismiss,
  onStepClick,
}: OnboardingChecklistProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);
  const [localCompleted, setLocalCompleted] = useState<Set<string>>(new Set(completedSteps));

  // Build steps with completion status
  const steps: OnboardingStep[] = DEFAULT_ONBOARDING_STEPS.map(step => ({
    ...step,
    completed: localCompleted.has(step.id),
  }));

  const completedCount = steps.filter(s => s.completed).length;
  const totalSteps = steps.length;
  const progressPercent = (completedCount / totalSteps) * 100;
  const isComplete = completedCount === totalSteps;

  // Check localStorage for dismissed state
  useEffect(() => {
    const dismissed = localStorage.getItem('onboarding-dismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
    }
    
    // Load completed steps from localStorage (demo purposes)
    const savedCompleted = localStorage.getItem('onboarding-completed');
    if (savedCompleted) {
      setLocalCompleted(new Set(JSON.parse(savedCompleted)));
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('onboarding-dismissed', 'true');
    onDismiss?.();
  };

  const handleStepClick = (step: OnboardingStep) => {
    // For demo: toggle completion on click
    if (!step.href) {
      const newCompleted = new Set(localCompleted);
      if (newCompleted.has(step.id)) {
        newCompleted.delete(step.id);
      } else {
        newCompleted.add(step.id);
      }
      setLocalCompleted(newCompleted);
      localStorage.setItem('onboarding-completed', JSON.stringify([...newCompleted]));
    }
    onStepClick?.(step.id);
  };

  // Don't render if dismissed or complete
  if (isDismissed) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-gradient-to-br from-accent-50 to-amber-50 rounded-2xl border border-accent-200/60 overflow-hidden mb-6"
    >
      {/* Header */}
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500 text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-900 flex items-center gap-2">
                Getting Started
                {isComplete && (
                  <span className="text-xs font-medium px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                    Complete!
                  </span>
                )}
              </h3>
              <p className="text-sm text-secondary-500">
                {isComplete 
                  ? "You're all set up! Great job." 
                  : `${completedCount} of ${totalSteps} steps completed`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 hover:bg-accent-100 rounded-lg transition-colors"
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
            >
              <motion.div
                animate={{ rotate: isExpanded ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className="h-5 w-5 text-secondary-400" />
              </motion.div>
            </button>
            <button
              onClick={handleDismiss}
              className="p-2 hover:bg-accent-100 rounded-lg transition-colors"
              aria-label="Dismiss"
            >
              <X className="h-5 w-5 text-secondary-400" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="h-2 bg-accent-200/50 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-accent-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>

      {/* Steps List */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-accent-200/60"
          >
            <div className="p-4 space-y-2">
              {steps.map((step, index) => (
                <StepItem
                  key={step.id}
                  step={step}
                  icon={stepIcons[step.id]}
                  delay={index * 0.05}
                  onClick={() => handleStepClick(step)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completion CTA */}
      {isComplete && isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-5 pb-5"
        >
          <button
            onClick={handleDismiss}
            className="w-full py-3 px-4 bg-accent-500 hover:bg-accent-600 text-white font-medium rounded-xl transition-colors"
          >
            Dismiss Checklist
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}

interface StepItemProps {
  step: OnboardingStep;
  icon?: React.ReactNode;
  delay?: number;
  onClick?: () => void;
}

function StepItem({ step, icon, delay = 0, onClick }: StepItemProps) {
  const content = (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className={`
        flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer
        ${step.completed 
          ? 'bg-green-50 border border-green-200/60' 
          : 'bg-white border border-slate-200/60 hover:border-accent-300 hover:shadow-sm'
        }
      `}
      onClick={onClick}
    >
      {/* Checkbox */}
      <div className={`
        flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-lg
        ${step.completed ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-secondary-400'}
      `}>
        {step.completed ? (
          <CheckCircle className="h-5 w-5" />
        ) : (
          icon || <Circle className="h-5 w-5" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={`font-medium text-sm ${step.completed ? 'text-green-800 line-through' : 'text-primary-900'}`}>
          {step.title}
        </p>
        <p className={`text-xs truncate ${step.completed ? 'text-green-600' : 'text-secondary-500'}`}>
          {step.description}
        </p>
      </div>

      {/* Action */}
      {!step.completed && step.action && (
        <span className="flex-shrink-0 text-xs font-medium text-accent-600 bg-accent-100 px-2 py-1 rounded-md">
          {step.action}
        </span>
      )}

      {/* Arrow for links */}
      {step.href && !step.completed && (
        <ChevronRight className="h-4 w-4 text-secondary-400 flex-shrink-0" />
      )}
    </motion.div>
  );

  if (step.href && !step.completed) {
    return <Link href={step.href}>{content}</Link>;
  }

  return content;
}
