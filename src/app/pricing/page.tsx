'use client';

import { motion } from 'framer-motion';
import { CheckIcon, XMarkIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';
import Section, { SectionHeader } from '@/components/Section';
import PricingCard from '@/components/PricingCard';
import Button from '@/components/Button';

const pricingPlans = [
  {
    name: 'Starter',
    price: '$499',
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
              Pick a plan.{' '}
              <span className="gradient-text">Know the cost.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
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
              <ShieldCheckIcon className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              30-Day Money-Back Guarantee
            </h2>
            <p className="text-slate-400 max-w-lg">
              Not happy after 30 days? Full refund, no awkward conversations.
              We think you'll stick around, but if not — no hard feelings.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Feature Comparison Table */}
      <Section>
        <SectionHeader
          title="Side-by-side comparison"
          description="Here's exactly what you get at each tier. No asterisks."
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
            Still have questions?
          </h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            Let's talk. No sales pitch — just an honest conversation about
            whether we're a good fit for what you need.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" variant="primary" size="lg">
              Start Free Trial
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
