'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
}

export default function Section({
  children,
  className = '',
  id,
  dark = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-16 md:py-24 ${dark ? 'bg-slate-900/50' : ''} ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {children}
      </motion.div>
    </section>
  );
}

export function SectionHeader({
  badge,
  title,
  description,
  centered = true,
}: {
  badge?: string;
  title: string;
  description?: string;
  centered?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${centered ? 'mx-auto text-center' : ''} mb-12`}>
      {badge && (
        <span className="inline-block rounded-full bg-primary-500/10 px-4 py-1 text-sm font-medium text-primary-400 mb-4">
          {badge}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-slate-400">{description}</p>
      )}
    </div>
  );
}
