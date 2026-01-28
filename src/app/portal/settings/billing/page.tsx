'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  CreditCard,
  Calendar,
  ExternalLink,
  Check,
  ArrowLeft,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { mockClient } from '@/lib/mock-data';
import { PLANS } from '@/lib/stripe';

// Mock subscription data (in production, this would come from database/Stripe)
const mockSubscription = {
  id: 'sub_mock123',
  stripeCustomerId: 'cus_mock123',
  plan: mockClient.plan,
  status: 'active' as const,
  currentPeriodStart: new Date('2024-12-01'),
  currentPeriodEnd: new Date('2025-01-01'),
  cancelAtPeriodEnd: false,
};

export default function BillingPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const plan = PLANS[mockSubscription.plan];
  
  const handleManageSubscription = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/stripe/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          customerId: mockSubscription.stripeCustomerId 
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || 'Failed to open billing portal');
        setLoading(false);
      }
    } catch {
      setError('Failed to connect to billing portal');
      setLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Back link */}
      <Link
        href="/portal"
        className="inline-flex items-center gap-2 text-secondary-500 hover:text-primary-900 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-900">
          Billing & Subscription
        </h1>
        <p className="text-secondary-500 mt-1">
          Manage your subscription and billing information.
        </p>
      </motion.div>

      <div className="grid gap-6">
        {/* Current Plan */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-primary-900 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-accent-500" />
                Current Plan
              </h2>
              <p className="text-secondary-500 text-sm mt-1">
                Your subscription details
              </p>
            </div>
            <div className="flex items-center gap-2">
              {mockSubscription.status === 'active' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  Active
                </span>
              )}
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-primary-900 capitalize">
                  {plan.name} Plan
                </p>
                <p className="text-secondary-500 text-sm">
                  ${plan.price}/month
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-secondary-500">Next billing date</p>
                <p className="font-medium text-primary-900">
                  {formatDate(mockSubscription.currentPeriodEnd)}
                </p>
              </div>
            </div>

            {/* Plan Features */}
            <div className="mt-4 pt-4 border-t border-slate-200">
              <p className="text-sm font-medium text-secondary-600 mb-3">
                Plan includes:
              </p>
              <div className="grid sm:grid-cols-2 gap-2">
                {plan.features.slice(0, 6).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-secondary-600">
                    <Check className="h-4 w-4 text-accent-500 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Billing Period */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-primary-900 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-accent-500" />
            Billing Period
          </h2>

          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50">
              <p className="text-sm text-secondary-500">Period started</p>
              <p className="font-semibold text-primary-900">
                {formatDate(mockSubscription.currentPeriodStart)}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50">
              <p className="text-sm text-secondary-500">Period ends</p>
              <p className="font-semibold text-primary-900">
                {formatDate(mockSubscription.currentPeriodEnd)}
              </p>
            </div>
          </div>

          {mockSubscription.cancelAtPeriodEnd && (
            <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-800">
                    Subscription canceling
                  </p>
                  <p className="text-sm text-amber-700 mt-1">
                    Your subscription will end on {formatDate(mockSubscription.currentPeriodEnd)}.
                    You can reactivate anytime before then.
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Manage Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-primary-900 mb-4">
            Manage Subscription
          </h2>
          
          <p className="text-secondary-500 text-sm mb-6">
            Access the Stripe Customer Portal to update payment methods, 
            view invoices, change plans, or cancel your subscription.
          </p>

          {error && (
            <div className="mb-4 p-4 rounded-xl bg-red-50 border border-red-200">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-red-800">Error</p>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleManageSubscription}
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-900 text-white rounded-xl font-medium hover:bg-primary-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Opening Portal...
              </>
            ) : (
              <>
                Manage in Stripe
                <ExternalLink className="h-4 w-4" />
              </>
            )}
          </button>

          <p className="text-xs text-secondary-400 mt-4">
            You'll be redirected to Stripe's secure billing portal.
          </p>
        </motion.div>

        {/* Upgrade Prompt (if not on highest plan) */}
        {mockSubscription.plan !== 'scale' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl p-6 text-white"
          >
            <h2 className="text-lg font-semibold mb-2">
              Need more content?
            </h2>
            <p className="text-accent-100 text-sm mb-4">
              Upgrade your plan to unlock more blog posts, social content, 
              and premium features like same-day delivery.
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-accent-600 rounded-xl font-medium hover:bg-accent-50 transition-colors"
            >
              View Plans
              <ExternalLink className="h-4 w-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
