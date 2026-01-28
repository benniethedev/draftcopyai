'use client';

import { motion } from 'framer-motion';
import {
  Lightbulb,
  Heart,
  Shield,
  Rocket,
  Check,
  ArrowRight,
  Users,
  FileText,
  Star,
  TrendingUp,
} from 'lucide-react';
import Section, { SectionHeader } from '@/components/Section';
import Button from '@/components/Button';

const values = [
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: 'Ship Fast, Learn Faster',
    description:
      'We move quickly because content marketing waits for no one. But we track everything and improve constantly.',
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: 'Your Success Is Our Success',
    description:
      "If your content isn't driving results, we're failing too. We care about outcomes, not just output.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Quality Over Quantity',
    description:
      "We could churn out more content faster. We don't. Every piece gets human attention.",
  },
  {
    icon: <Rocket className="h-6 w-6" />,
    title: 'No Excuses on Delivery',
    description:
      "When we say 48 hours, we mean 48 hours. Deadlines matter. We don't miss them.",
  },
];

const team = [
  {
    name: 'Alex Morgan',
    role: 'CEO & Co-founder',
    bio: 'Ran content for a Fortune 500 company. Got tired of watching good marketing teams drown in content demands.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
  },
  {
    name: 'Jordan Lee',
    role: 'CTO & Co-founder',
    bio: 'Spent a decade doing NLP research. Now uses that knowledge to make AI actually useful for real writing.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
  },
  {
    name: 'Sam Rivera',
    role: 'Head of Content',
    bio: 'Former journalist, former agency lead. Knows what makes content work and what makes it forgettable.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
  },
  {
    name: 'Taylor Chen',
    role: 'Head of Customer Success',
    bio: 'The person who makes sure you actually get value. If you have a problem, Taylor fixes it.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
  },
];

const stats = [
  { value: '50K+', label: 'Articles Delivered', icon: FileText },
  { value: '500+', label: 'Customers', icon: Users },
  { value: '98%', label: 'Renewal Rate', icon: TrendingUp },
  { value: '4.9/5', label: 'Avg Rating', icon: Star },
];

export default function AboutPage() {
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
              The Team Behind{' '}
              <span className="text-accent-500">DraftCopyAI</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-secondary-500 leading-relaxed">
              We got tired of watching smart marketing teams waste time on content 
              production. So we built something better.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block rounded-full bg-accent-100 px-4 py-1.5 text-sm font-medium text-accent-700 mb-6">
              Why We Exist
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-6">
              Good content shouldn't require a full team
            </h2>
            <div className="space-y-5 text-secondary-600 leading-relaxed">
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
                AI handles the research and first drafts, the tedious parts. 
                Humans handle the judgment calls, the parts that matter. You get 
                quality content without the overhead.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-5"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl border border-slate-200/60 p-6 text-center shadow-md hover:shadow-lg transition-all duration-300"
              >
                <stat.icon className="h-6 w-6 text-accent-500 mx-auto mb-3" />
                <div className="text-3xl font-bold text-primary-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-secondary-500">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* Why AI + Human */}
      <Section alternate>
        <SectionHeader
          title="Why not just use AI? Or just use humans?"
          description="Because neither one alone is good enough. Here's the real talk."
        />
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl border border-slate-200/60 p-8 shadow-md"
          >
            <h3 className="text-xl font-semibold text-primary-900 mb-5">
              What AI Does Well
            </h3>
            <ul className="space-y-4 text-secondary-600">
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-accent-100 flex items-center justify-center mt-0.5">
                  <Check className="h-3.5 w-3.5 text-accent-600" />
                </div>
                Research and synthesis, fast
              </li>
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-accent-100 flex items-center justify-center mt-0.5">
                  <Check className="h-3.5 w-3.5 text-accent-600" />
                </div>
                Consistent SEO structure every time
              </li>
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-accent-100 flex items-center justify-center mt-0.5">
                  <Check className="h-3.5 w-3.5 text-accent-600" />
                </div>
                No writer's block, no sick days
              </li>
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-accent-100 flex items-center justify-center mt-0.5">
                  <Check className="h-3.5 w-3.5 text-accent-600" />
                </div>
                Scales without the hiring pain
              </li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl border border-slate-200/60 p-8 shadow-md"
          >
            <h3 className="text-xl font-semibold text-primary-900 mb-5">
              What Humans Add
            </h3>
            <ul className="space-y-4 text-secondary-600">
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mt-0.5">
                  <Check className="h-3.5 w-3.5 text-primary-700" />
                </div>
                Brand voice, the subtle stuff AI misses
              </li>
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mt-0.5">
                  <Check className="h-3.5 w-3.5 text-primary-700" />
                </div>
                Fact-checking claims that matter
              </li>
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mt-0.5">
                  <Check className="h-3.5 w-3.5 text-primary-700" />
                </div>
                Fixing the weird AI phrasing
              </li>
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mt-0.5">
                  <Check className="h-3.5 w-3.5 text-primary-700" />
                </div>
                Knowing when something just feels off
              </li>
            </ul>
          </motion.div>
        </div>
        <p className="text-center text-secondary-500 mt-10 max-w-2xl mx-auto leading-relaxed">
          AI alone produces content that reads like AI content. Humans alone 
          can't scale. Together? You get the best of both without the downsides 
          of either.
        </p>
      </Section>

      {/* Values */}
      <Section>
        <SectionHeader
          title="How we work"
          description="Not corporate values. Actual principles we use to make decisions."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl border border-slate-200/60 p-8 shadow-md hover:shadow-lg transition-all duration-300 text-center"
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-900 text-white mb-5">
                {value.icon}
              </div>
              <h3 className="text-lg font-semibold text-primary-900 mb-3">
                {value.title}
              </h3>
              <p className="text-sm text-secondary-500 leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Team */}
      <Section alternate>
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
              className="bg-white rounded-3xl border border-slate-200/60 p-8 text-center shadow-md hover:shadow-lg transition-all duration-300"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-20 h-20 rounded-full mx-auto mb-5 object-cover"
              />
              <h3 className="text-lg font-semibold text-primary-900">{member.name}</h3>
              <p className="text-sm text-accent-600 mb-4">{member.role}</p>
              <p className="text-sm text-secondary-500 leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-4">
            Ready to offload your content?
          </h2>
          <p className="text-secondary-500 mb-10 max-w-lg mx-auto leading-relaxed">
            Start a trial. See what we produce. Judge us on the work.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" variant="primary" size="lg">
              Get Started
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
