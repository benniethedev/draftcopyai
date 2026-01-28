'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  description?: string;
  delay?: number;
}

export default function StatsCard({ title, value, icon, description, delay = 0 }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="bg-white rounded-2xl border border-slate-200/60 p-5"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-secondary-500">{title}</p>
          <p className="text-3xl font-bold text-primary-900 mt-1">{value}</p>
          {description && (
            <p className="text-xs text-secondary-400 mt-1">{description}</p>
          )}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-100 text-accent-600">
          {icon}
        </div>
      </div>
    </motion.div>
  );
}
