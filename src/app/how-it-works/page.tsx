'use client';

import { motion } from 'framer-motion';
import {
  FileText,
  Sparkles,
  Rocket,
  ClipboardCheck,
  MessageSquare,
  PenLine,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import Section, { SectionHeader } from '@/components/Section';
import Button from '@/components/Button';

const mainSteps = [
  {
    number: '01',
    icon: <FileText className="h-7 w-7" />,
    title: 'Tell Us What You Need',
    description:
      "Fill out a quick brief: topic, keywords, target audience, any specific angles you want covered. Takes about 5 minutes. Share your brand guidelines if you have them.",
    details: [
      'Pick your topic and target keywords',
      "Share brand voice guidelines (or we'll figure it out)",
      'Set word count and format preferences',
      'Drop in any reference material you want us to use',
    ],
  },
  {
    number: '02',
    icon: <Sparkles className="h-7 w-7" />,
    title: 'AI Creates the First Draft',
    description:
      'Our AI does the heavy lifting: researching the topic, building the structure, writing the first pass. It handles the grunt work so humans can focus on making it good.',
    details: [
      'Deep research on your topic',
      'SEO-friendly structure built in from the start',
      'Full draft written to your specifications',
      'Proper formatting, headers, the works',
    ],
  },
  {
    number: '03',
    icon: <PenLine className="h-7 w-7" />,
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
    icon: <MessageSquare className="h-7 w-7" />,
    title: 'You Review (and Revise if Needed)',
    description:
      "We send you the finished piece. Read it over. If something's off, tell us and we'll fix it. Revisions are unlimited because we'd rather get it right than argue about scope.",
    details: [
      'Review in your dashboard',
      'Leave comments right on the doc',
      'Request as many revisions as you need',
      "Approve when you're happy",
    ],
  },
  {
    number: '05',
    icon: <Rocket className="h-7 w-7" />,
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
    description: "LinkedIn, Twitter, whatever. Written for the platform.",
    wordCount: 'Platform-appropriate',
  },
  {
    title: 'Email Sequences',
    description: "Nurture campaigns and newsletters that don't feel spammy.",
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
              How It{' '}
              <span className="text-accent-500">Actually Works</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-secondary-500 leading-relaxed">
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
          <div className="absolute left-8 lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-300 via-primary-300 to-accent-300 hidden md:block" />

          <div className="space-y-16 lg:space-y-24">
            {mainSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  index % 2 === 1 ? 'lg:direction-rtl' : ''
                }`}
              >
                {/* Step indicator - centered on desktop */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 z-10">
                  <div className="h-16 w-16 rounded-2xl bg-white shadow-md border border-slate-200/60 flex items-center justify-center text-accent-600 font-bold text-xl">
                    {step.number}
                  </div>
                </div>

                {/* Content - alternating sides on desktop */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-2 lg:text-right' : 'lg:pr-20'}`}>
                  <div className={`flex items-center gap-4 mb-5 ${index % 2 === 1 ? 'lg:justify-end' : ''}`}>
                    <span className="lg:hidden inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-500 text-white font-bold">
                      {step.number}
                    </span>
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-900/5 text-primary-900">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-primary-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-secondary-500 leading-relaxed">{step.description}</p>
                </div>

                {/* Details card - alternating sides on desktop */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1 lg:pl-0' : 'lg:pl-20'}`}>
                  <div className="bg-white rounded-3xl border border-slate-200/60 p-8 shadow-md">
                    <h4 className="text-sm font-semibold text-accent-600 mb-5 uppercase tracking-wider">
                      What happens here
                    </h4>
                    <ul className="space-y-4">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <CheckCircle className="h-5 w-5 flex-shrink-0 text-accent-500 mt-0.5" />
                          <span className="text-secondary-600">{detail}</span>
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
      <Section alternate>
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
              className="bg-white rounded-3xl border border-slate-200/60 p-8 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-primary-900 mb-3">
                {type.title}
              </h3>
              <p className="text-secondary-500 text-sm mb-5 leading-relaxed">{type.description}</p>
              <span className="inline-block rounded-full bg-accent-100 px-4 py-1.5 text-xs font-medium text-accent-700">
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
          <div className="bg-white rounded-3xl border border-slate-200/60 overflow-hidden shadow-md">
            <div className="border-b border-slate-100 px-6 py-4 flex items-center gap-2 bg-slate-50/50">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-4 text-sm text-secondary-500 font-mono">blog-post-sample.md</span>
            </div>
            <div className="p-8 font-mono text-sm">
              <p className="text-primary-900 font-semibold mb-4 text-base"># Why Your Content Strategy Isn't Working (And What to Do Instead)</p>
              <p className="text-secondary-500 mb-5">
                <span className="text-secondary-400">January 2024 - 7 min read</span>
              </p>
              <p className="text-secondary-600 mb-5 leading-relaxed">
                You're publishing twice a week. You've got a keyword list. You're doing all the things the marketing blogs tell you to do. But six months in, your traffic graph looks like a flatline EKG.
              </p>
              <p className="text-secondary-600 mb-5 leading-relaxed">
                Here's the uncomfortable truth: most B2B content fails because it's written for search engines, not humans. And Google has gotten scary good at telling the difference.
              </p>
              <p className="text-primary-900 font-semibold mb-3">## The Real Problem: Content That Sounds Like Content</p>
              <p className="text-secondary-600 leading-relaxed">
                Read your last five blog posts out loud. Do they sound like something a real person would say to a colleague? Or do they sound like... marketing content?
              </p>
              <p className="text-secondary-600 mt-5 leading-relaxed">
                The difference matters. Readers can feel when they're being "marketed to" versus when someone's actually trying to help them solve a problem...
              </p>
              <p className="text-secondary-400 mt-6 italic">[Continues for 1,800 words...]</p>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* CTA */}
      <Section alternate>
        <div className="text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-4">
            Want to see it in action?
          </h2>
          <p className="text-secondary-500 mb-10 max-w-lg mx-auto leading-relaxed">
            Start a free trial. Submit a brief for something you actually need.
            See what we deliver. Then decide.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" variant="primary" size="lg">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
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
