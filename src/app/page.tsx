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
  XMarkIcon,
  CheckIcon,
  ShieldCheckIcon,
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
    title: 'Done in Days, Not Weeks',
    description:
      'Stop waiting around. Our hybrid workflow gets you polished content fast — without the corners-cut feeling.',
  },
  {
    icon: <MagnifyingGlassIcon className="h-6 w-6" />,
    title: 'Built for Google',
    description:
      'Keywords, structure, meta tags — we handle the SEO stuff so your content actually gets found.',
  },
  {
    icon: <ArrowPathIcon className="h-6 w-6" />,
    title: 'Revisions Until It Hits',
    description:
      'Something feel off? Send it back. We tweak until you love it. No limits, no awkward conversations.',
  },
  {
    icon: <UserIcon className="h-6 w-6" />,
    title: 'A Real Person Checks Everything',
    description:
      'AI drafts fast. Humans catch weird phrasing, fact-check claims, and make sure it sounds like you.',
  },
];

const steps = [
  {
    icon: <DocumentTextIcon className="h-8 w-8" />,
    title: 'Tell Us What You Need',
    description:
      'Topic, keywords, audience — give us the basics. Share your brand guidelines if you have them. Takes 5 minutes.',
  },
  {
    icon: <SparklesIcon className="h-8 w-8" />,
    title: 'We Write, Edit, Polish',
    description:
      'AI creates the first pass. Human editors shape it into something that sounds natural and checks out factually.',
  },
  {
    icon: <RocketLaunchIcon className="h-8 w-8" />,
    title: 'You Hit Publish',
    description:
      'Review what we send. Need changes? Just ask. Happy with it? Post it and watch the traffic roll in.',
  },
];

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

const testimonials = [
  {
    quote:
      'We were doing maybe 2 posts a month before. Now we do 20. Organic traffic tripled in 6 months and I actually have time for other things.',
    author: 'Sarah Chen',
    role: 'Marketing Director',
    company: 'TechFlow',
  },
  {
    quote:
      'I was skeptical about AI content. But honestly? I can\'t tell the difference between this and what our senior writer produces. And it costs a third as much.',
    author: 'Marcus Johnson',
    role: 'Founder',
    company: 'GrowthLab',
  },
  {
    quote:
      'Most content services don\'t get B2B. These folks do. We hit page 1 for three target keywords within six weeks.',
    author: 'Emily Rodriguez',
    role: 'Head of Content',
    company: 'ScaleUp',
  },
];

const faqs = [
  {
    question: 'How does the AI + human thing actually work?',
    answer:
      'AI writes the first draft based on your brief. It\'s fast and handles structure well. Then a real editor goes through it — checking facts, fixing awkward bits, making sure it sounds like something a person wrote. You get speed without sacrificing quality.',
  },
  {
    question: 'What if I don\'t like what you send?',
    answer:
      'Send it back with notes. We\'ll revise it — as many times as needed until you\'re happy. And if you\'re still not feeling it after 30 days, we\'ll refund your money. No drama.',
  },
  {
    question: 'Can you write in our brand voice?',
    answer:
      'Yes. During onboarding we\'ll dig into your style guidelines, look at your existing content, and figure out what makes your brand sound like your brand. Then we match it.',
  },
  {
    question: 'How fast do you deliver?',
    answer:
      'Starter plan: 48 hours. Growth: 24 hours. Scale: same-day is available when you need it. Need something even faster? We can usually make it work — just ask.',
  },
  {
    question: 'What industries do you cover?',
    answer:
      'We\'re strongest in B2B SaaS, tech, fintech, and professional services. But we\'ve written for e-commerce, healthcare, education — most things except highly regulated medical/legal content. If you\'re unsure, just ask.',
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
              className="inline-flex items-center gap-2 rounded-full bg-primary-500/10 px-4 py-1.5 text-sm font-medium text-primary-400 mb-6"
            >
              <SparklesIcon className="h-4 w-4" />
              Content that scales with you
            </motion.span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">
              Write Less.{' '}
              <span className="gradient-text">Publish More.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl text-slate-400">
              You need 20 blog posts a month. You have time for maybe 2. 
              We bridge that gap — AI speed, human polish, your brand voice.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/contact" variant="primary" size="lg">
                Start Your Free Trial
              </Button>
              <Button href="/pricing" variant="outline" size="lg">
                See What It Costs
              </Button>
            </div>
            <p className="mt-6 text-sm text-slate-500">
              No credit card needed. 30-day money-back guarantee.
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
            <span className="inline-flex items-center gap-2 rounded-full bg-red-500/10 px-4 py-1 text-sm font-medium text-red-400 mb-4">
              <XMarkIcon className="h-4 w-4" />
              The Problem
            </span>
            <h2 className="text-3xl font-bold text-white mb-4">
              Content marketing is eating your calendar
            </h2>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start gap-3">
                <XMarkIcon className="h-5 w-5 flex-shrink-0 text-red-400 mt-0.5" />
                Hiring writers takes months and costs a fortune
              </li>
              <li className="flex items-start gap-3">
                <XMarkIcon className="h-5 w-5 flex-shrink-0 text-red-400 mt-0.5" />
                ChatGPT output reads like... ChatGPT output
              </li>
              <li className="flex items-start gap-3">
                <XMarkIcon className="h-5 w-5 flex-shrink-0 text-red-400 mt-0.5" />
                Agencies want $500 per article and 2-week lead times
              </li>
              <li className="flex items-start gap-3">
                <XMarkIcon className="h-5 w-5 flex-shrink-0 text-red-400 mt-0.5" />
                You spend more time editing freelancer work than it saves
              </li>
            </ul>
          </div>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent-500/10 px-4 py-1 text-sm font-medium text-accent-400 mb-4">
              <CheckIcon className="h-4 w-4" />
              The Fix
            </span>
            <h2 className="text-3xl font-bold text-white mb-4">
              AI does the heavy lifting. Humans do the thinking.
            </h2>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start gap-3">
                <CheckIcon className="h-5 w-5 flex-shrink-0 text-accent-400 mt-0.5" />
                48-hour delivery, not 2-week wait times
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon className="h-5 w-5 flex-shrink-0 text-accent-400 mt-0.5" />
                Content that sounds like a person wrote it (because one did review it)
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon className="h-5 w-5 flex-shrink-0 text-accent-400 mt-0.5" />
                Flat monthly pricing you can actually budget for
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon className="h-5 w-5 flex-shrink-0 text-accent-400 mt-0.5" />
                Revisions until it\'s right — we\'re not precious about it
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* How It Works */}
      <Section id="how-it-works">
        <SectionHeader
          title="Three steps. That\'s it."
          description="No lengthy onboarding. No complicated workflows. Just tell us what you need and we get to work."
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
          title="What you actually get"
          description="No fluff features. Just the stuff that moves the needle on your content."
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
          title="Pricing that makes sense"
          description="Pick a plan. Know what you\'re paying. No per-word fees, no surprise invoices, no nickel-and-diming."
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
            <ShieldCheckIcon className="h-5 w-5" />
            30-day money-back guarantee. Try it risk-free.
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section dark>
        <SectionHeader
          title="What our customers say"
          description="Don\'t take our word for it. Here\'s what people running real marketing teams think."
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
          title="Common questions"
          description="The stuff people usually ask before signing up."
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
              Ready to stop stressing about content?
            </h2>
            <p className="mx-auto max-w-xl text-lg text-white/80 mb-8">
              Your competitors are publishing 4x more content than you.
              Let\'s fix that.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/contact" variant="primary" size="lg" className="bg-white text-primary-600 hover:bg-slate-100 shadow-none">
                Start Free Trial
              </Button>
              <Button href="/pricing" variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Compare Plans
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
