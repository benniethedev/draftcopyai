'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Shield, ArrowRight, HelpCircle } from 'lucide-react';
import Section, { SectionHeader } from '@/components/Section';
import PricingCard from '@/components/PricingCard';
import Button from '@/components/Button';
import CheckoutStatus from '@/components/CheckoutStatus';

const pricingPlans = [
  {
    name: 'Starter',
    price: '$499',
    planId: 'starter' as const,
    description: 'Getting serious about content but not ready to go all-in.',
    features: [
      '8 blog posts per month',
      '1,500+ words each',
      'SEO baked in',
      'Unlimited revisions',
      '48-hour turnaround',
      'Email support',
    ],
  },
  {
    name: 'Growth',
    price: '$999',
    planId: 'growth' as const,
    description: 'For teams that need consistent output without the hiring headache.',
    features: [
      '20 blog posts per month',
      '1,500+ words each',
      '40 social posts included',
      'SEO baked in',
      'Unlimited revisions',
      '24-hour turnaround',
      'Your own account manager',
      'Priority support',
    ],
    popular: true,
  },
  {
    name: 'Scale',
    price: '$1,999',
    planId: 'scale' as const,
    description: 'Full content operation without building a full content team.',
    features: [
      '40 blog posts per month',
      '2,000+ words each',
      '100 social posts included',
      '4 email sequences monthly',
      'SEO baked in',
      'Unlimited revisions',
      'Same-day delivery option',
      'Dedicated strategist',
      'Slack channel access',
      'Monthly performance reports',
    ],
  },
];

const comparisonFeatures = [
  {
    name: 'Blog posts per month',
    starter: '8',
    growth: '20',
    scale: '40',
  },
  {
    name: 'Words per post',
    starter: '1,500+',
    growth: '1,500+',
    scale: '2,000+',
  },
  {
    name: 'Social media posts',
    starter: false,
    growth: '40/mo',
    scale: '100/mo',
  },
  {
    name: 'Email sequences',
    starter: false,
    growth: false,
    scale: '4/mo',
  },
  {
    name: 'SEO optimization',
    starter: true,
    growth: true,
    scale: true,
  },
  {
    name: 'Unlimited revisions',
    starter: true,
    growth: true,
    scale: true,
  },
  {
    name: 'Delivery time',
    starter: '48 hours',
    growth: '24 hours',
    scale: 'Same-day',
  },
  {
    name: 'Dedicated account manager',
    starter: false,
    growth: true,
    scale: true,
  },
  {
    name: 'Content strategist',
    starter: false,
    growth: false,
    scale: true,
  },
  {
    name: 'Slack integration',
    starter: false,
    growth: false,
    scale: true,
  },
  {
    name: 'Custom reporting',
    starter: false,
    growth: false,
    scale: true,
  },
  {
    name: 'Priority support',
    starter: false,
    growth: true,
    scale: true,
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Checkout Status Toast */}
      <Suspense fallback={null}>
        <CheckoutStatus />
      </Suspense>

      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-50 grain pt-16 pb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100/30 via-transparent to-accent-100/20" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary-900">
              Pick a plan.{' '}
              <span className="text-accent-500">Know the cost.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-secondary-500 leading-relaxed">
              No per-word fees. No hidden charges. No awkward invoice surprises.
              Just flat monthly pricing for as much content as you need.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <Section>
        <div className="grid md:grid-cols-3 gap-8 lg:gap-6">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={plan.name}
              name={plan.name}
              price={plan.price}
              planId={plan.planId}
              description={plan.description}
              features={plan.features}
              popular={plan.popular}
              delay={index * 0.1}
            />
          ))}
        </div>
      </Section>

      {/* Money-back guarantee */}
      <Section alternate>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex flex-col items-center">
            <div className="h-20 w-20 rounded-3xl bg-accent-500 flex items-center justify-center mb-6 shadow-md">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-primary-900 mb-3">
              30-Day Money-Back Guarantee
            </h2>
            <p className="text-secondary-500 max-w-lg leading-relaxed">
              Not happy after 30 days? Full refund, no awkward conversations.
              We think you'll stick around, but if not, no hard feelings.
            </p>
          </div>
        </motion.div>
      </Section>

      {/* Feature Comparison Table */}
      <Section>
        <SectionHeader
          title="Side-by-side comparison"
          description="Here's exactly what you get at each tier. No asterisks."
        />
        <div className="overflow-x-auto rounded-2xl border border-slate-200/60 bg-white shadow-md">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200/60 bg-slate-50/50">
                <th className="py-5 px-6 text-left text-sm font-medium text-secondary-500">
                  Feature
                </th>
                <th className="py-5 px-6 text-center text-sm font-semibold text-primary-900">
                  Starter
                  <span className="block text-secondary-500 font-normal">$499/mo</span>
                </th>
                <th className="py-5 px-6 text-center text-sm font-semibold text-accent-600 bg-accent-50/50">
                  Growth
                  <span className="block text-secondary-500 font-normal">$999/mo</span>
                </th>
                <th className="py-5 px-6 text-center text-sm font-semibold text-primary-900">
                  Scale
                  <span className="block text-secondary-500 font-normal">$1,999/mo</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((feature, index) => (
                <motion.tr
                  key={feature.name}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="py-4 px-6 text-sm text-secondary-600">
                    {feature.name}
                  </td>
                  {(['starter', 'growth', 'scale'] as const).map((plan) => (
                    <td key={plan} className={`py-4 px-6 text-center ${plan === 'growth' ? 'bg-accent-50/30' : ''}`}>
                      {typeof feature[plan] === 'boolean' ? (
                        feature[plan] ? (
                          <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent-100">
                            <Check className="h-4 w-4 text-accent-600" />
                          </div>
                        ) : (
                          <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100">
                            <X className="h-4 w-4 text-slate-400" />
                          </div>
                        )
                      ) : (
                        <span className="text-sm text-secondary-600 font-medium">
                          {feature[plan]}
                        </span>
                      )}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* CTA */}
      <Section alternate>
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700 mb-6">
            <HelpCircle className="h-4 w-4" />
            Still have questions?
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-4">
            Let's chat
          </h2>
          <p className="text-secondary-500 mb-10 max-w-lg mx-auto leading-relaxed">
            No sales pitch, just an honest conversation about
            whether we're a good fit for what you need.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" variant="primary" size="lg">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Book a Call
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
