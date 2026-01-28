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
    title: 'Tell Us What You Need',
    description:
      'Fill out a quick brief — topic, keywords, target audience, any specific angles you want covered. Takes about 5 minutes. Share your brand guidelines if you have them.',
    details: [
      'Pick your topic and target keywords',
      'Share brand voice guidelines (or we\'ll figure it out)',
      'Set word count and format preferences',
      'Drop in any reference material you want us to use',
    ],
  },
  {
    number: '02',
    icon: <SparklesIcon className="h-8 w-8" />,
    title: 'AI Creates the First Draft',
    description:
      'Our AI does the heavy lifting — researching the topic, building the structure, writing the first pass. It handles the grunt work so humans can focus on making it good.',
    details: [
      'Deep research on your topic',
      'SEO-friendly structure built in from the start',
      'Full draft written to your specifications',
      'Proper formatting, headers, the works',
    ],
  },
  {
    number: '03',
    icon: <PencilSquareIcon className="h-8 w-8" />,
    title: 'Human Editors Polish It',
    description:
      'Every piece gets reviewed by a real person. They fact-check, fix weird phrasing, match your brand voice, and make sure it reads like something a human wrote.',
    details: [
      'Facts and claims verified',
      'Brand voice dialed in',
      'Grammar, style, and flow polished',
      'Quality check before it hits your inbox',
    ],
  },
  {
    number: '04',
    icon: <ChatBubbleLeftRightIcon className="h-8 w-8" />,
    title: 'You Review (and Revise if Needed)',
    description:
      'We send you the finished piece. Read it over. If something\'s off, tell us — we\'ll fix it. Revisions are unlimited because we\'d rather get it right than argue about scope.',
    details: [
      'Review in your dashboard',
      'Leave comments right on the doc',
      'Request as many revisions as you need',
      'Approve when you\'re happy',
    ],
  },
  {
    number: '05',
    icon: <RocketLaunchIcon className="h-8 w-8" />,
    title: 'Publish and Watch It Work',
    description:
      'Export your content, publish it, and get on with your day. Track how it performs over time and use what you learn to make future content even better.',
    details: [
      'Download in whatever format you need',
      'CMS integrations available for Scale plans',
      'See how your content performs',
      'Use the data to plan your next batch',
    ],
  },
];

const contentTypes = [
  {
    title: 'Blog Posts',
    description: 'Long-form articles that rank and actually get read.',
    wordCount: '1,500-2,500 words',
  },
  {
    title: 'Social Posts',
    description: 'LinkedIn, Twitter, whatever — written for the platform.',
    wordCount: 'Platform-appropriate',
  },
  {
    title: 'Email Sequences',
    description: 'Nurture campaigns and newsletters that don\'t feel spammy.',
    wordCount: '300-500 words each',
  },
  {
    title: 'Landing Pages',
    description: 'Copy that turns visitors into leads.',
    wordCount: 'Whatever it takes',
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
              How It{' '}
              <span className="gradient-text">Actually Works</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
              No black box. No magic. Just a straightforward process that 
              gets you quality content without the usual headaches.
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
                <div className="hidden lg:flex absolute left-0 w-16 h-16 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 items-center justify-center text-white font-bold text-xl">
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
                      What happens here
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
          title="What we write"
          description="The content types that move the needle for B2B marketing."
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
          title="See what the output looks like"
          description="Here's an actual sample of the kind of content we produce."
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
              <span className="ml-4 text-sm text-slate-400">blog-post-sample.md</span>
            </div>
            <div className="p-6 font-mono text-sm">
              <p className="text-primary-400 mb-4"># Why Your Content Strategy Isn't Working (And What to Do Instead)</p>
              <p className="text-slate-400 mb-4">
                <span className="text-slate-500">January 2024 • 7 min read</span>
              </p>
              <p className="text-slate-300 mb-4">
                You're publishing twice a week. You've got a keyword list. You're doing all the things the marketing blogs tell you to do. But six months in, your traffic graph looks like a flatline EKG.
              </p>
              <p className="text-slate-300 mb-4">
                Here's the uncomfortable truth: most B2B content fails because it's written for search engines, not humans. And Google has gotten scary good at telling the difference.
              </p>
              <p className="text-primary-400 mb-2">## The Real Problem: Content That Sounds Like Content</p>
              <p className="text-slate-300">
                Read your last five blog posts out loud. Do they sound like something a real person would say to a colleague? Or do they sound like... marketing content?
              </p>
              <p className="text-slate-300 mt-4">
                The difference matters. Readers can feel when they're being "marketed to" versus when someone's actually trying to help them solve a problem...
              </p>
              <p className="text-slate-500 mt-4">[Continues for 1,800 words...]</p>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* CTA */}
      <Section dark>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Want to see it in action?
          </h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            Start a free trial. Submit a brief for something you actually need.
            See what we deliver. Then decide.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" variant="primary" size="lg">
              Start Free Trial
            </Button>
            <Button href="/pricing" variant="outline" size="lg">
              See Pricing
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
