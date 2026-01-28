'use client';

import { motion } from 'framer-motion';
import {
  LightBulbIcon,
  HeartIcon,
  ShieldCheckIcon,
  RocketLaunchIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';
import Section, { SectionHeader } from '@/components/Section';
import Button from '@/components/Button';

const values = [
  {
    icon: <LightBulbIcon className="h-6 w-6" />,
    title: 'Ship Fast, Learn Faster',
    description:
      'We move quickly because content marketing waits for no one. But we track everything and improve constantly.',
  },
  {
    icon: <HeartIcon className="h-6 w-6" />,
    title: 'Your Success Is Our Success',
    description:
      'If your content isn\'t driving results, we\'re failing too. We care about outcomes, not just output.',
  },
  {
    icon: <ShieldCheckIcon className="h-6 w-6" />,
    title: 'Quality Over Quantity',
    description:
      'We could churn out more content faster. We don\'t. Every piece gets human attention.',
  },
  {
    icon: <RocketLaunchIcon className="h-6 w-6" />,
    title: 'No Excuses on Delivery',
    description:
      'When we say 48 hours, we mean 48 hours. Deadlines matter. We don\'t miss them.',
  },
];

const team = [
  {
    name: 'Alex Morgan',
    role: 'CEO & Co-founder',
    bio: 'Ran content for a Fortune 500 company. Got tired of watching good marketing teams drown in content demands.',
  },
  {
    name: 'Jordan Lee',
    role: 'CTO & Co-founder',
    bio: 'Spent a decade doing NLP research. Now uses that knowledge to make AI actually useful for real writing.',
  },
  {
    name: 'Sam Rivera',
    role: 'Head of Content',
    bio: 'Former journalist, former agency lead. Knows what makes content work and what makes it forgettable.',
  },
  {
    name: 'Taylor Chen',
    role: 'Head of Customer Success',
    bio: 'The person who makes sure you actually get value. If you have a problem, Taylor fixes it.',
  },
];

const stats = [
  { value: '50K+', label: 'Articles Delivered' },
  { value: '500+', label: 'Customers' },
  { value: '98%', label: 'Renewal Rate' },
  { value: '4.9/5', label: 'Avg Rating' },
];

export default function AboutPage() {
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
              The Team Behind{' '}
              <span className="gradient-text">DraftCopyAI</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
              We got tired of watching smart marketing teams waste time on content 
              production. So we built something better.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block rounded-full bg-primary-500/10 px-4 py-1 text-sm font-medium text-primary-400 mb-4">
              Why We Exist
            </span>
            <h2 className="text-3xl font-bold text-white mb-6">
              Good content shouldn't require a full team
            </h2>
            <div className="space-y-4 text-slate-400">
              <p>
                Content marketing works. Everyone knows it. But producing quality 
                content consistently? That's a full-time job. Actually, it's several 
                full-time jobs.
              </p>
              <p>
                Most companies face a choice: hire expensive writers, settle for 
                mediocre freelance work, or burn out trying to do it themselves. 
                None of those options are great.
              </p>
              <p>
                We built DraftCopyAI because we believe there's a better way. 
                AI handles the research and first drafts — the tedious parts. 
                Humans handle the judgment calls — the parts that matter. You get 
                quality content without the overhead.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center"
              >
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* Why AI + Human */}
      <Section dark>
        <SectionHeader
          title="Why not just use AI? Or just use humans?"
          description="Because neither one alone is good enough. Here's the real talk."
        />
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4">
              What AI Does Well
            </h3>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start gap-3">
                <CheckIcon className="h-5 w-5 flex-shrink-0 text-accent-400 mt-0.5" />
                Research and synthesis — fast
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon className="h-5 w-5 flex-shrink-0 text-accent-400 mt-0.5" />
                Consistent SEO structure every time
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon className="h-5 w-5 flex-shrink-0 text-accent-400 mt-0.5" />
                No writer's block, no sick days
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon className="h-5 w-5 flex-shrink-0 text-accent-400 mt-0.5" />
                Scales without the hiring pain
              </li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4">
              What Humans Add
            </h3>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start gap-3">
                <CheckIcon className="h-5 w-5 flex-shrink-0 text-primary-400 mt-0.5" />
                Brand voice — the subtle stuff AI misses
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon className="h-5 w-5 flex-shrink-0 text-primary-400 mt-0.5" />
                Fact-checking claims that matter
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon className="h-5 w-5 flex-shrink-0 text-primary-400 mt-0.5" />
                Fixing the weird AI phrasing
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon className="h-5 w-5 flex-shrink-0 text-primary-400 mt-0.5" />
                Knowing when something just feels off
              </li>
            </ul>
          </motion.div>
        </div>
        <p className="text-center text-slate-400 mt-8 max-w-2xl mx-auto">
          AI alone produces content that reads like... AI content. Humans alone 
          can't scale. Together? You get the best of both without the downsides 
          of either.
        </p>
      </Section>

      {/* Values */}
      <Section>
        <SectionHeader
          title="How we work"
          description="Not corporate values — actual principles we use to make decisions."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white mb-4">
                {value.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {value.title}
              </h3>
              <p className="text-sm text-slate-400">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Team */}
      <Section dark>
        <SectionHeader
          title="The people behind the product"
          description="We're a small team that cares a lot about doing good work."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h3 className="text-lg font-semibold text-white">{member.name}</h3>
              <p className="text-sm text-primary-400 mb-3">{member.role}</p>
              <p className="text-sm text-slate-400">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to offload your content?
          </h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            Start a trial. See what we produce. Judge us on the work.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" variant="primary" size="lg">
              Get Started
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
