'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  image?: string;
  delay?: number;
}

export default function TestimonialCard({
  quote,
  author,
  role,
  company,
  image,
  delay = 0,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-3xl border border-slate-200/60 p-8 shadow-md transition-all duration-300 hover:shadow-lg"
    >
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-accent-400 text-accent-400" />
        ))}
      </div>
      <div className="relative mb-6">
        <Quote className="absolute -top-2 -left-1 h-8 w-8 text-slate-100" />
        <blockquote className="relative text-secondary-600 leading-relaxed pl-4">
          {quote}
        </blockquote>
      </div>
      <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
        {image ? (
          <img
            src={image}
            alt={author}
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-primary-900/10 flex items-center justify-center text-primary-900 font-semibold">
            {author.split(' ').map(n => n[0]).join('')}
          </div>
        )}
        <div>
          <div className="font-semibold text-primary-900">{author}</div>
          <div className="text-sm text-secondary-500">
            {role}, {company}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
