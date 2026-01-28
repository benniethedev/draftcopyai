'use client';

import { motion } from 'framer-motion';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
import Section, { SectionHeader } from '@/components/Section';
import PricingCard from '@/components/PricingCard';
import Button from '@/components/Button';

const pricingPlans = [
  {
    name: 'Starter',
    price: '$499',
    description: 'Perfect for small businesses just getting started with content.',
    features: [
      '8 blog posts per month',
      '1,500+ words per post',
      'SEO optimization included',
      'Unlimited revisions',
      '48-hour delivery',
      'Email support',
    ],
  },
  {
    name: 'Growth',
    price: '$999',
    description: 'For growing teams that need consistent, quality content.',
    features: [
      '20 blog posts per month',
      '1,500+ words per post',
      'Social media content (40 posts)',
      'SEO optimization included',
      'Unlimited revisions',
      '24-hour delivery',
      'Dedicated account manager',
      'Priority support',
    ],
    popular: true,
  },
  {
    name: 'Scale',
    price: '$1,999',
    description: 'Enterprise-level content production for serious growth.',
    features: [
      '40 blog posts per month',
      '2,000+ words per post',
      'Social media content (100 posts)',
      'Email sequences (4 per month)',
      'SEO optimization included',
      'Unlimited revisions',
      'Same-day delivery available',
      'Dedicated content strategist',
      'Slack integration',
      'Custom reporting',
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
      {/* Hero */}
      <section className="relative overflow-hidden gradient-bg pt-16 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Simple, transparent{' '}
              <span className="gradient-text">pricing</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
              No hidden fees, no per-word charges. Choose the plan that matches
              your content needs and scale as you grow.
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
              description={plan.description}
              features={plan.features}
              popular={plan.popular}
              delay={index * 0.1}
            />
          ))}
        </div>
      </Section>

      {/* Money-back guarantee */}
      <Section dark>
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex flex-col items-center"
          >
            <div className="h-20 w-20 rounded-full bg-gradient-to-r from-accent-500 to-accent-600 flex items-center justify-center mb-6">
              <svg
                className="h-10 w-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              30-Day Money-Back Guarantee
            </h2>
            <p className="text-slate-400 max-w-lg">
              Not satisfied with our service? Get a full refund within the first
              30 days, no questions asked. We&apos;re confident you&apos;ll love our content.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Feature Comparison Table */}
      <Section>
        <SectionHeader
          badge="Compare Plans"
          title="Feature comparison"
          description="See exactly what you get with each plan."
        />
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-4 px-4 text-left text-sm font-medium text-slate-400">
                  Feature
                </th>
                <th className="py-4 px-4 text-center text-sm font-medium text-white">
                  Starter
                  <span className="block text-slate-400 font-normal">$499/mo</span>
                </th>
                <th className="py-4 px-4 text-center text-sm font-medium text-primary-400">
                  Growth
                  <span className="block text-slate-400 font-normal">$999/mo</span>
                </th>
                <th className="py-4 px-4 text-center text-sm font-medium text-white">
                  Scale
                  <span className="block text-slate-400 font-normal">$1,999/mo</span>
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
                  className="border-b border-white/5"
                >
                  <td className="py-4 px-4 text-sm text-slate-300">
                    {feature.name}
                  </td>
                  {(['starter', 'growth', 'scale'] as const).map((plan) => (
                    <td key={plan} className="py-4 px-4 text-center">
                      {typeof feature[plan] === 'boolean' ? (
                        feature[plan] ? (
                          <CheckIcon className="h-5 w-5 text-accent-500 mx-auto" />
                        ) : (
                          <XMarkIcon className="h-5 w-5 text-slate-600 mx-auto" />
                        )
                      ) : (
                        <span className="text-sm text-slate-300">
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
      <Section dark>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            Start your free trial today. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" variant="primary" size="lg">
              Start Free Trial
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Talk to Sales
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
