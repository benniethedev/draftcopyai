'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
  large?: boolean;
}

export default function FeatureCard({
  icon,
  title,
  description,
  delay = 0,
  large = false,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`group relative bg-white rounded-3xl border border-slate-200/60 p-8 shadow-md transition-all duration-300 hover:shadow-lg hover:border-slate-300/60 ${
        large ? 'md:col-span-2 md:row-span-2 p-10' : ''
      }`}
    >
      <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-900/5 text-primary-900 transition-colors group-hover:bg-accent-500/10 group-hover:text-accent-600">
        {icon}
      </div>
      <h3 className={`font-semibold text-primary-900 mb-3 ${large ? 'text-2xl' : 'text-lg'}`}>
        {title}
      </h3>
      <p className={`text-secondary-500 leading-relaxed ${large ? 'text-lg' : ''}`}>
        {description}
      </p>
    </motion.div>
  );
}
