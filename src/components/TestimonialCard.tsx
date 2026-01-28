'use client';

import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  delay?: number;
}

export default function TestimonialCard({
  quote,
  author,
  role,
  company,
  delay = 0,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="rounded-2xl border border-white/10 bg-white/5 p-6"
    >
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} className="h-5 w-5 text-yellow-500" />
        ))}
      </div>
      <blockquote className="text-slate-300 mb-6">&ldquo;{quote}&rdquo;</blockquote>
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-semibold">
          {author[0]}
        </div>
        <div>
          <div className="font-medium text-white">{author}</div>
          <div className="text-sm text-slate-400">
            {role}, {company}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
