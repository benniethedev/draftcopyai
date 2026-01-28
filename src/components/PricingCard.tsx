'use client';

import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/solid';
import Button from './Button';

interface PricingCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  delay?: number;
}

export default function PricingCard({
  name,
  price,
  description,
  features,
  popular = false,
  delay = 0,
}: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`relative rounded-3xl p-8 ${
        popular
          ? 'bg-gradient-to-b from-primary-500/20 to-transparent border-2 border-primary-500'
          : 'border border-white/10 bg-white/5'
      }`}
    >
      {popular && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 px-4 py-1 text-sm font-semibold text-white">
          Most Popular
        </span>
      )}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white">{name}</h3>
        <p className="mt-2 text-sm text-slate-400">{description}</p>
      </div>
      <div className="mb-6">
        <span className="text-4xl font-bold text-white">{price}</span>
        <span className="text-slate-400">/month</span>
      </div>
      <ul className="mb-8 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckIcon className="h-5 w-5 flex-shrink-0 text-accent-500" />
            <span className="text-sm text-slate-300">{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        href="/contact"
        variant={popular ? 'primary' : 'outline'}
        className="w-full"
      >
        Get Started
      </Button>
    </motion.div>
  );
}
