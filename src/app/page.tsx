'use client';

import { motion } from 'framer-motion';
import {
  BoltIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  UserIcon,
  DocumentTextIcon,
  SparklesIcon,
  RocketLaunchIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import Button from '@/components/Button';
import Section, { SectionHeader } from '@/components/Section';
import FeatureCard from '@/components/FeatureCard';
import PricingCard from '@/components/PricingCard';
import TestimonialCard from '@/components/TestimonialCard';
import { useState } from 'react';

const features = [
  {
    icon: <BoltIcon className="h-6 w-6" />,
    title: 'Fast Turnaround',
    description:
      'Get your content delivered in days, not weeks. Our AI-powered workflow means faster production without sacrificing quality.',
  },
  {
    icon: <MagnifyingGlassIcon className="h-6 w-6" />,
    title: 'SEO Optimized',
    description:
      'Every piece is optimized for search engines with proper keywords, meta descriptions, and structure that Google loves.',
  },
  {
    icon: <ArrowPathIcon className="h-6 w-6" />,
    title: 'Unlimited Revisions',
    description:
      'Not quite right? No problem. We offer unlimited revisions until you&apos;re completely satisfied with every piece.',
  },
  {
    icon: <UserIcon className="h-6 w-6" />,
    title: 'Dedicated Editor',
    description:
      'Every piece is reviewed by a human editor who ensures your brand voice shines through and quality stays high.',
  },
];

const steps = [
  {
    icon: <DocumentTextIcon className="h-8 w-8" />,
    title: 'Submit Your Brief',
    description:
      'Tell us about your topic, target audience, and goals. Share your brand guidelines and we handle the rest.',
  },
  {
    icon: <SparklesIcon className="h-8 w-8" />,
    title: 'AI Drafts Content',
    description:
      'Our AI creates the first draft, then human editors refine it to match your voice and ensure factual accuracy.',
  },
  {
    icon: <RocketLaunchIcon className="h-8 w-8" />,
    title: 'You Publish',
    description:
      'Review, request revisions if needed, and publish. Watch your content drive traffic and conversions.',
  },
];

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

const testimonials = [
  {
    quote:
      'DraftCopyAI transformed our content strategy. We went from 2 posts a month to 20, and our organic traffic tripled in 6 months.',
    author: 'Sarah Chen',
    role: 'Marketing Director',
    company: 'TechFlow',
  },
  {
    quote:
      'The quality is incredible. I genuinely can&apos;t tell the difference between their content and what our in-house writers produce.',
    author: 'Marcus Johnson',
    role: 'Founder',
    company: 'GrowthLab',
  },
  {
    quote:
      'Finally, a content service that actually understands B2B. The SEO results speak for themselves – page 1 rankings within weeks.',
    author: 'Emily Rodriguez',
    role: 'Head of Content',
    company: 'ScaleUp',
  },
];

const faqs = [
  {
    question: 'How does the AI + human review process work?',
    answer:
      'Our AI creates the initial draft based on your brief and guidelines. Then, a human editor reviews every piece for accuracy, tone, and quality. This hybrid approach gives you the speed of AI with the nuance of human editing.',
  },
  {
    question: 'What if I&apos;m not satisfied with the content?',
    answer:
      'We offer unlimited revisions on every piece. If something isn&apos;t quite right, just let us know and we&apos;ll revise it until you&apos;re happy. We also offer a 30-day money-back guarantee if you&apos;re not satisfied.',
  },
  {
    question: 'Can you match my brand voice?',
    answer:
      'Absolutely. During onboarding, we&apos;ll learn your brand guidelines, tone, and style preferences. We can also analyze your existing content to ensure consistency.',
  },
  {
    question: 'How long does delivery take?',
    answer:
      'Standard delivery is 48 hours for Starter, 24 hours for Growth, and same-day available for Scale plans. Rush delivery is available for all plans at an additional cost.',
  },
  {
    question: 'Do you write for any industry?',
    answer:
      'We specialize in B2B SaaS, technology, fintech, and professional services. However, we can write for most industries – just reach out to discuss your specific needs.',
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-bg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-block rounded-full bg-primary-500/10 px-4 py-1.5 text-sm font-medium text-primary-400 mb-6"
            >
              ✨ AI-Powered Content Marketing
            </motion.span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">
              AI-Powered Content,{' '}
              <span className="gradient-text">Human Quality</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl text-slate-400">
              Scale your content marketing without scaling your team. Get SEO-optimized
              blog posts, social content, and email sequences — all reviewed by human
              editors.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/contact" variant="primary" size="lg">
                Get Started Free
              </Button>
              <Button href="/pricing" variant="outline" size="lg">
                See Pricing
              </Button>
            </div>
            <p className="mt-6 text-sm text-slate-500">
              No credit card required • 30-day money-back guarantee
            </p>
          </motion.div>

          {/* Floating elements for visual interest */}
          <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-secondary-500/10 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Problem/Solution Section */}
      <Section dark>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block rounded-full bg-red-500/10 px-4 py-1 text-sm font-medium text-red-400 mb-4">
              The Problem
            </span>
            <h2 className="text-3xl font-bold text-white mb-4">
              Content marketing is a full-time job
            </h2>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start gap-3">
                <span className="text-red-400">✗</span>
                Hiring writers is expensive and time-consuming
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400">✗</span>
                AI tools produce generic, robotic content
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400">✗</span>
                Agencies charge premium prices with slow turnarounds
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400">✗</span>
                Inconsistent quality drains your time reviewing
              </li>
            </ul>
          </div>
          <div>
            <span className="inline-block rounded-full bg-accent-500/10 px-4 py-1 text-sm font-medium text-accent-400 mb-4">
              The Solution
            </span>
            <h2 className="text-3xl font-bold text-white mb-4">
              DraftCopyAI: The best of both worlds
            </h2>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start gap-3">
                <span className="text-accent-400">✓</span>
                AI speed meets human quality control
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-400">✓</span>
                Predictable pricing, no surprise invoices
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-400">✓</span>
                48-hour delivery as standard
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-400">✓</span>
                Unlimited revisions until you&apos;re satisfied
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* How It Works */}
      <Section id="how-it-works">
        <SectionHeader
          badge="How It Works"
          title="From brief to published in 3 simple steps"
          description="Our streamlined process makes content creation effortless. Here's how we turn your ideas into published content."
        />
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative text-center"
            >
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white mb-4">
                {step.icon}
              </div>
              <div className="absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary-500/50 to-transparent hidden md:block" />
              <span className="inline-block rounded-full bg-slate-800 px-3 py-1 text-sm font-medium text-primary-400 mb-3">
                Step {index + 1}
              </span>
              <h3 className="text-xl font-semibold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-slate-400">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Features */}
      <Section dark id="features">
        <SectionHeader
          badge="Features"
          title="Everything you need to scale content"
          description="We've built the features that matter most for busy marketing teams."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </Section>

      {/* Pricing */}
      <Section id="pricing">
        <SectionHeader
          badge="Pricing"
          title="Simple, transparent pricing"
          description="No hidden fees, no surprises. Choose the plan that fits your content needs."
        />
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
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent-500/10 px-6 py-3 text-accent-400">
            <svg
              className="h-5 w-5"
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
            30-day money-back guarantee on all plans
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section dark>
        <SectionHeader
          badge="Testimonials"
          title="Loved by marketing teams"
          description="See what our customers have to say about working with DraftCopyAI."
        />
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.author}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              company={testimonial.company}
              delay={index * 0.1}
            />
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq">
        <SectionHeader
          badge="FAQ"
          title="Frequently asked questions"
          description="Got questions? We've got answers."
        />
        <div className="mx-auto max-w-3xl">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="border-b border-white/10"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="flex w-full items-center justify-between py-5 text-left"
              >
                <span className="text-lg font-medium text-white">
                  {faq.question}
                </span>
                <ChevronDownIcon
                  className={`h-5 w-5 text-slate-400 transition-transform ${
                    openFaq === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pb-5 text-slate-400"
                >
                  {faq.answer}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Section>
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
          <div className="relative px-8 py-16 md:py-24 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to scale your content?
            </h2>
            <p className="mx-auto max-w-xl text-lg text-white/80 mb-8">
              Join hundreds of marketing teams using DraftCopyAI to produce
              high-quality content at scale.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/contact" variant="primary" size="lg" className="bg-white text-primary-600 hover:bg-slate-100 shadow-none">
                Start Free Trial
              </Button>
              <Button href="/pricing" variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
