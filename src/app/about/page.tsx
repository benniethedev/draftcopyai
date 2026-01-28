'use client';

import { motion } from 'framer-motion';
import {
  LightBulbIcon,
  HeartIcon,
  ShieldCheckIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline';
import Section, { SectionHeader } from '@/components/Section';
import Button from '@/components/Button';

const values = [
  {
    icon: <LightBulbIcon className="h-6 w-6" />,
    title: 'Innovation First',
    description:
      'We continuously push the boundaries of what AI can do for content creation while maintaining human oversight.',
  },
  {
    icon: <HeartIcon className="h-6 w-6" />,
    title: 'Customer Obsessed',
    description:
      'Your success is our success. We go above and beyond to ensure every piece of content exceeds expectations.',
  },
  {
    icon: <ShieldCheckIcon className="h-6 w-6" />,
    title: 'Quality Always',
    description:
      'We never compromise on quality. Every piece is reviewed, refined, and polished before delivery.',
  },
  {
    icon: <RocketLaunchIcon className="h-6 w-6" />,
    title: 'Speed Matters',
    description:
      'In content marketing, timing is everything. We deliver fast without cutting corners.',
  },
];

const team = [
  {
    name: 'Alex Morgan',
    role: 'CEO & Co-founder',
    bio: 'Former content director at a Fortune 500 company. 15+ years in content marketing.',
  },
  {
    name: 'Jordan Lee',
    role: 'CTO & Co-founder',
    bio: 'AI researcher with a background in NLP. Previously led ML teams at major tech companies.',
  },
  {
    name: 'Sam Rivera',
    role: 'Head of Content',
    bio: 'Award-winning journalist and editor. Built content teams at multiple successful startups.',
  },
  {
    name: 'Taylor Chen',
    role: 'Head of Customer Success',
    bio: 'Customer experience expert. Passionate about helping clients achieve their content goals.',
  },
];

const stats = [
  { value: '50K+', label: 'Articles Delivered' },
  { value: '500+', label: 'Happy Clients' },
  { value: '98%', label: 'Client Retention' },
  { value: '4.9/5', label: 'Average Rating' },
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
              About{' '}
              <span className="gradient-text">DraftCopyAI</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
              We&apos;re on a mission to democratize high-quality content creation
              through the power of AI and human expertise.
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
              Our Mission
            </span>
            <h2 className="text-3xl font-bold text-white mb-6">
              Making premium content accessible to every business
            </h2>
            <div className="space-y-4 text-slate-400">
              <p>
                Content marketing shouldn&apos;t be reserved for companies with big
                budgets and large teams. Every business deserves access to
                high-quality, SEO-optimized content that drives results.
              </p>
              <p>
                That&apos;s why we built DraftCopyAI—a service that combines the
                efficiency of artificial intelligence with the creativity and
                judgment of experienced human editors. The result? Premium content
                at a fraction of the traditional cost.
              </p>
              <p>
                We believe the future of content isn&apos;t AI alone or humans
                alone—it&apos;s the powerful combination of both. Our hybrid approach
                delivers the best of both worlds: AI speed and scale with human
                quality and nuance.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
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
          badge="Our Approach"
          title="Why AI + Human Review?"
          description="The best content comes from combining AI capabilities with human expertise."
        />
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4">
              What AI Brings
            </h3>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start gap-3">
                <span className="text-accent-400">✓</span>
                Lightning-fast research and draft creation
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-400">✓</span>
                Consistent SEO optimization
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-400">✓</span>
                Scalable content production
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-400">✓</span>
                Data-driven topic insights
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-400">✓</span>
                24/7 availability
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
                <span className="text-primary-400">✓</span>
                Brand voice and tone alignment
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-400">✓</span>
                Fact-checking and verification
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-400">✓</span>
                Creative storytelling
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-400">✓</span>
                Nuanced understanding of context
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-400">✓</span>
                Quality assurance
              </li>
            </ul>
          </motion.div>
        </div>
      </Section>

      {/* Values */}
      <Section>
        <SectionHeader
          badge="Our Values"
          title="What we stand for"
          description="These principles guide everything we do at DraftCopyAI."
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
          badge="Our Team"
          title="Meet the humans behind the AI"
          description="A passionate team of content experts, AI researchers, and customer advocates."
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
            Join hundreds of satisfied customers
          </h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            Experience the DraftCopyAI difference for yourself. Start your free
            trial today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" variant="primary" size="lg">
              Get Started
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
