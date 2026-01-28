'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import Button from './Button';

interface PricingCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  delay?: number;
  planId?: 'starter' | 'growth' | 'scale';
}

export default function PricingCard({
  name,
  price,
  description,
  features,
  popular = false,
  delay = 0,
  planId,
}: PricingCardProps) {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!planId) {
      // Fall back to contact page if no planId
      window.location.href = '/contact';
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planId }),
      });

      const data = await response.json();

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        console.error('No checkout URL returned');
        setLoading(false);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setLoading(false);
    }
  };

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
      {planId ? (
        <button
          onClick={handleSubscribe}
          disabled={loading}
          className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
            popular
              ? 'bg-accent-500 text-white hover:bg-accent-600 disabled:bg-accent-300'
              : 'border-2 border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-white disabled:opacity-50'
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Redirecting...
            </>
          ) : (
            'Get Started'
          )}
        </button>
      ) : (
        <Button
          href="/contact"
          variant={popular ? 'primary' : 'outline'}
          className="w-full"
        >
          Get Started
        </Button>
      )}
    </motion.div>
  );
}
