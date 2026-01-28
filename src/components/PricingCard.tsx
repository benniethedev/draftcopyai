'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
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
      className={`relative bg-white rounded-3xl p-8 transition-all duration-300 ${
        popular
          ? 'border-2 border-accent-500 shadow-lg scale-[1.02]'
          : 'border border-slate-200/60 shadow-md hover:shadow-lg'
      }`}
    >
      {popular && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-accent-500 px-4 py-1.5 text-sm font-semibold text-white shadow-md">
          Most Popular
        </span>
      )}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-primary-900">{name}</h3>
        <p className="mt-2 text-sm text-secondary-500">{description}</p>
      </div>
      <div className="mb-8">
        <span className="text-5xl font-bold text-primary-900 tracking-tight">{price}</span>
        <span className="text-secondary-500 ml-1">/month</span>
      </div>
      <ul className="mb-8 space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-accent-500/10 flex items-center justify-center mt-0.5">
              <Check className="h-3 w-3 text-accent-600" />
            </div>
            <span className="text-sm text-secondary-600">{feature}</span>
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
