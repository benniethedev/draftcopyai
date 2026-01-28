'use client';

import { motion } from 'framer-motion';
import {
  DocumentTextIcon,
  SparklesIcon,
  RocketLaunchIcon,
  ClipboardDocumentCheckIcon,
  ChatBubbleLeftRightIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';
import Section, { SectionHeader } from '@/components/Section';
import Button from '@/components/Button';

const mainSteps = [
  {
    number: '01',
    icon: <DocumentTextIcon className="h-8 w-8" />,
    title: 'Submit Your Brief',
    description:
      'Share your content requirements through our simple brief form. Tell us about your topic, target keywords, audience, and any specific requirements or brand guidelines.',
    details: [
      'Define your topic and target keywords',
      'Share your brand voice guidelines',
      'Specify word count and format',
      'Include any reference materials',
    ],
  },
  {
    number: '02',
    icon: <SparklesIcon className="h-8 w-8" />,
    title: 'AI Creates Draft',
    description:
      'Our advanced AI analyzes your brief and creates a comprehensive first draft. It researches the topic, structures the content, and writes engaging copy optimized for your goals.',
    details: [
      'Deep topic research and analysis',
      'SEO-optimized structure',
      'Engaging, readable content',
      'Proper formatting and headers',
    ],
  },
  {
    number: '03',
    icon: <PencilSquareIcon className="h-8 w-8" />,
    title: 'Human Editor Review',
    description:
      'Every piece is reviewed and refined by our experienced human editors. They ensure factual accuracy, brand voice consistency, and overall quality that meets our high standards.',
    details: [
      'Fact-checking and verification',
      'Brand voice alignment',
      'Grammar and style polish',
      'Quality assurance',
    ],
  },
  {
    number: '04',
    icon: <ChatBubbleLeftRightIcon className="h-8 w-8" />,
    title: 'Review & Revise',
    description:
      'Receive your content and request any revisions you need. We offer unlimited revisions until you\'re completely satisfied with the final result.',
    details: [
      'Review content in your dashboard',
      'Leave inline comments',
      'Request unlimited revisions',
      'Approve when satisfied',
    ],
  },
  {
    number: '05',
    icon: <RocketLaunchIcon className="h-8 w-8" />,
    title: 'Publish & Track',
    description:
      'Export your approved content and publish it. Track performance over time and use insights to inform your future content strategy.',
    details: [
      'Download in multiple formats',
      'Direct CMS integration available',
      'Track content performance',
      'Refine strategy with data',
    ],
  },
];

const contentTypes = [
  {
    title: 'Blog Posts',
    description: 'Long-form articles optimized for SEO and reader engagement.',
    wordCount: '1,500-2,500 words',
  },
  {
    title: 'Social Media',
    description: 'Engaging posts for LinkedIn, Twitter, and other platforms.',
    wordCount: 'Platform-optimized',
  },
  {
    title: 'Email Sequences',
    description: 'Conversion-focused email campaigns and newsletters.',
    wordCount: '300-500 words each',
  },
  {
    title: 'Landing Pages',
    description: 'Persuasive copy that converts visitors into customers.',
    wordCount: 'Custom length',
  },
];

export default function HowItWorksPage() {
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
              How{' '}
              <span className="gradient-text">DraftCopyAI</span>{' '}
              Works
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
              From brief to published content in just a few steps. Our hybrid AI +
              human approach delivers quality content fast.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process Steps */}
      <Section>
        <div className="relative">
          {/* Vertical line connecting steps */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500 via-secondary-500 to-accent-500 hidden lg:block" />

          <div className="space-y-12 lg:space-y-16">
            {mainSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative grid lg:grid-cols-2 gap-8 lg:gap-16 items-center"
              >
                {/* Step indicator */}
                <div className="hidden lg:block absolute left-0 w-16 h-16 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-xl">
                  {step.number}
                </div>

                {/* Content */}
                <div className="lg:pl-24">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="lg:hidden inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold">
                      {step.number}
                    </span>
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-primary-400">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 mb-4">{step.description}</p>
                </div>

                {/* Details card */}
                <div className="lg:pl-0">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <h4 className="text-sm font-medium text-primary-400 mb-4 uppercase tracking-wider">
                      What happens
                    </h4>
                    <ul className="space-y-3">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <ClipboardDocumentCheckIcon className="h-5 w-5 flex-shrink-0 text-accent-500" />
                          <span className="text-slate-300">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Content Types */}
      <Section dark>
        <SectionHeader
          badge="Content Types"
          title="What we create"
          description="From blog posts to email sequences, we handle all your content needs."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contentTypes.map((type, index) => (
            <motion.div
              key={type.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                {type.title}
              </h3>
              <p className="text-slate-400 text-sm mb-4">{type.description}</p>
              <span className="inline-block rounded-full bg-primary-500/10 px-3 py-1 text-xs font-medium text-primary-400">
                {type.wordCount}
              </span>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Sample Content Showcase */}
      <Section>
        <SectionHeader
          badge="Sample Content"
          title="See the quality for yourself"
          description="Here's an example of the content we produce."
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
            <div className="border-b border-white/10 px-6 py-4 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-4 text-sm text-slate-400">blog-post.md</span>
            </div>
            <div className="p-6 font-mono text-sm">
              <p className="text-primary-400 mb-4"># 10 Ways AI is Transforming Content Marketing in 2024</p>
              <p className="text-slate-400 mb-4">
                <span className="text-slate-500">*Posted on January 15, 2024 | 8 min read*</span>
              </p>
              <p className="text-slate-300 mb-4">
                Content marketing has evolved dramatically over the past decade, but nothing compares to the seismic shift we&apos;re witnessing with AI integration. From automated research to personalized content at scale, artificial intelligence is reshaping how brands connect with their audiences.
              </p>
              <p className="text-slate-300 mb-4">
                In this comprehensive guide, we&apos;ll explore the top 10 ways AI is revolutionizing content marketing—and how you can leverage these technologies to stay ahead of the curve.
              </p>
              <p className="text-primary-400 mb-2">## 1. Automated Content Research</p>
              <p className="text-slate-300">
                Gone are the days of spending hours scouring the internet for statistics and sources. AI-powered research tools can now analyze thousands of articles in seconds, identifying key trends, data points, and expert opinions relevant to your topic...
              </p>
              <p className="text-slate-500 mt-4">[Content continues for 1,500+ words...]</p>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* CTA */}
      <Section dark>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to see it in action?
          </h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            Start your free trial and experience our streamlined content workflow
            for yourself.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" variant="primary" size="lg">
              Start Free Trial
            </Button>
            <Button href="/pricing" variant="outline" size="lg">
              View Pricing
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
