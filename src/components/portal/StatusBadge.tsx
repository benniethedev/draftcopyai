'use client';

import { ProjectStatus, STATUS_LABELS, STATUS_COLORS } from '@/types/portal';

interface StatusBadgeProps {
  status: ProjectStatus;
  size?: 'sm' | 'md';
}

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const { bg, text } = STATUS_COLORS[status];
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${bg} ${text} ${sizeClasses}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}
