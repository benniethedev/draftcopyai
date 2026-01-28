'use client';

import { motion } from 'framer-motion';
import {
  Zap,
  Search,
  RefreshCw,
  UserCheck,
  FileText,
  Sparkles,
  Rocket,
  ChevronDown,
  X,
  Check,
  Shield,
  ArrowRight,
  TrendingUp,
  Clock,
  Users,
} from 'lucide-react';
import Button from '@/components/Button';
import Section, { SectionHeader } from '@/components/Section';
import FeatureCard from '@/components/FeatureCard';
import PricingCard from '@/components/PricingCard';
import TestimonialCard from '@/components/TestimonialCard';
import { useState } from 'react';

const features = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Done in Days, Not Weeks',
    description:
      'Stop waiting around. Our hybrid workflow gets you polished content fast without the corners-cut feeling.',
  },
  {
    icon: <Search className="h-6 w-6" />,
    title: 'Built for Google',
    description:
      'Keywords, structure, meta tags. We handle the SEO stuff so your content actually gets found.',
  },
  {
    icon: <RefreshCw className="h-6 w-6" />,
    title: 'Revisions Until It Hits',
    description:
      'Something feel off? Send it back. We tweak until you love it. No limits, no awkward conversations.',
  },
  {
    icon: <UserCheck className="h-6 w-6" />,
    title: 'A Real Person Checks Everything',
    description:
      'AI drafts fast. Humans catch weird phrasing, fact-check claims, and make sure it sounds like you.',
  },
];

const steps = [
  {
    icon: <FileText className="h-7 w-7" />,
    title: 'Tell Us What You Need',
    description:
      'Topic, keywords, audience. Give us the basics. Share your brand guidelines if you have them. Takes 5 minutes.',
  },
  {
    icon: <Sparkles className="h-7 w-7" />,
    title: 'We Write, Edit, Polish',
    description:
      'AI creates the first pass. Human editors shape it into something that sounds natural and checks out factually.',
  },
  {
    icon: <Rocket className="h-7 w-7" />,
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
      "I was skeptical about AI content. But honestly? I can't tell the difference between this and what our senior writer produces. And it costs a third as much.",
    author: 'Marcus Johnson',
    role: 'Founder',
    company: 'GrowthLab',
  },
  {
    quote:
      "Most content services don't get B2B. These folks do. We hit page 1 for three target keywords within six weeks.",
    author: 'Emily Rodriguez',
    role: 'Head of Content',
    company: 'ScaleUp',
  },
];

const faqs = [
  {
    question: 'How does the AI + human thing actually work?',
    answer:
      "AI writes the first draft based on your brief. It's fast and handles structure well. Then a real editor goes through it, checking facts, fixing awkward bits, making sure it sounds like something a person wrote. You get speed without sacrificing quality.",
  },
  {
    question: "What if I don't like what you send?",
    answer:
      "Send it back with notes. We'll revise it as many times as needed until you're happy. And if you're still not feeling it after 30 days, we'll refund your money. No drama.",
  },
  {
    question: 'Can you write in our brand voice?',
    answer:
      "Yes. During onboarding we'll dig into your style guidelines, look at your existing content, and figure out what makes your brand sound like your brand. Then we match it.",
  },
  {
    question: 'How fast do you deliver?',
    answer:
      'Starter plan: 48 hours. Growth: 24 hours. Scale: same-day is available when you need it. Need something even faster? We can usually make it work. Just ask.',
  },
  {
    question: 'What industries do you cover?',
    answer:
      "We're strongest in B2B SaaS, tech, fintech, and professional services. But we've written for e-commerce, healthcare, education, most things except highly regulated medical/legal content. If you're unsure, just ask.",
  },
];

const stats = [
  { value: '50K+', label: 'Articles Delivered', icon: FileText },
  { value: '3x', label: 'Avg Traffic Increase', icon: TrendingUp },
  { value: '24hrs', label: 'Typical Turnaround', icon: Clock },
  { value: '500+', label: 'Happy Teams', icon: Users },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 grain">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100/30 via-transparent to-accent-100/20" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40 relative">
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
              className="inline-flex items-center gap-2 rounded-full bg-accent-500/10 px-4 py-2 text-sm font-medium text-accent-700 mb-8"
            >
              <Sparkles className="h-4 w-4" />
              Content that scales with you
            </motion.span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-primary-900">
              Write Less.{' '}
              <span className="text-accent-500">Publish More.</span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg sm:text-xl text-secondary-500 leading-relaxed">
              You need 20 blog posts a month. You have time for maybe 2. 
              We bridge that gap with AI speed and human polish, in your brand voice.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/contact" variant="primary" size="lg">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button href="/pricing" variant="outline" size="lg">
                See What It Costs
              </Button>
            </div>
            <p className="mt-6 text-sm text-secondary-500">
              No credit card needed. 30-day money-back guarantee.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary-900 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <Section alternate>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-1.5 text-sm font-medium text-red-700 mb-4">
              <X className="h-4 w-4" />
              The Problem
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-6">
              Content marketing is eating your calendar
            </h2>
            <ul className="space-y-4 text-secondary-600">
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                  <X className="h-3.5 w-3.5 text-red-600" />
                </div>
                Hiring writers takes months and costs a fortune
              </li>
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                  <X className="h-3.5 w-3.5 text-red-600" />
                </div>
                ChatGPT output reads like... ChatGPT output
              </li>
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                  <X className="h-3.5 w-3.5 text-red-600" />
                </div>
                Agencies want $500 per article and 2-week lead times
              </li>
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                  <X className="h-3.5 w-3.5 text-red-600" />
                </div>
                You spend more time editing freelancer work than it saves
              </li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-accent-100 px-4 py-1.5 text-sm font-medium text-accent-700 mb-4">
              <Check className="h-4 w-4" />
              The Fix
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-6">
              AI does the heavy lifting. Humans do the thinking.
            </h2>
            <ul className="space-y-4 text-secondary-600">
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-accent-100 flex items-center justify-center mt-0.5">
                  <Check className="h-3.5 w-3.5 text-accent-600" />
                </div>
                48-hour delivery, not 2-week wait times
              </li>
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-accent-100 flex items-center justify-center mt-0.5">
                  <Check className="h-3.5 w-3.5 text-accent-600" />
                </div>
                Content that sounds like a person wrote it (because one did review it)
              </li>
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-accent-100 flex items-center justify-center mt-0.5">
                  <Check className="h-3.5 w-3.5 text-accent-600" />
                </div>
                Flat monthly pricing you can actually budget for
              </li>
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-accent-100 flex items-center justify-center mt-0.5">
                  <Check className="h-3.5 w-3.5 text-accent-600" />
                </div>
                Revisions until it's right. We're not precious about it
              </li>
            </ul>
          </motion.div>
        </div>
      </Section>

      {/* How It Works */}
      <Section id="how-it-works">
        <SectionHeader
          title="Three steps. That's it."
          description="No lengthy onboarding. No complicated workflows. Just tell us what you need and we get to work."
        />
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-24 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-primary-200 via-accent-300 to-primary-200" />
          
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative text-center"
            >
              <div className="relative z-10 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-md border border-slate-200/60 text-primary-900 mb-6">
                {step.icon}
                <span className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-accent-500 text-white text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-3">
                {step.title}
              </h3>
              <p className="text-secondary-500 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Features - Bento Grid */}
      <Section alternate id="features">
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
          description="Pick a plan. Know what you're paying. No per-word fees, no surprise invoices, no nickel-and-diming."
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
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full bg-accent-50 border border-accent-200 px-6 py-3">
            <Shield className="h-5 w-5 text-accent-600" />
            <span className="text-accent-700 font-medium">30-day money-back guarantee. Try it risk-free.</span>
          </div>
        </motion.div>
      </Section>

      {/* Testimonials */}
      <Section alternate>
        <SectionHeader
          title="What our customers say"
          description="Don't take our word for it. Here's what people running real marketing teams think."
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
              className="border-b border-slate-200"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="flex w-full items-center justify-between py-6 text-left group"
              >
                <span className="text-lg font-medium text-primary-900 group-hover:text-accent-600 transition-colors">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-secondary-500 transition-transform duration-200 ${
                    openFaq === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pb-6 text-secondary-600 leading-relaxed"
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden bg-primary-900 p-12 md:p-16 lg:p-20"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-800/50 to-transparent" />
          <div className="relative text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to stop stressing about content?
            </h2>
            <p className="mx-auto max-w-xl text-lg text-primary-200 mb-10">
              Your competitors are publishing 4x more content than you.
              Let's fix that.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/contact" variant="primary" size="lg">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button href="/pricing" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                Compare Plans
              </Button>
            </div>
          </div>
        </motion.div>
      </Section>
    </>
  );
}
