import { Metadata } from 'next';
import Section, { SectionHeader } from '@/components/Section';
import CaseStudyCard from '@/components/CaseStudyCard';
import TestimonialsSection from '@/components/TestimonialsSection';
import Button from '@/components/Button';
import { caseStudies } from '@/data/caseStudies';
import { testimonials } from '@/data/testimonials';
import { ArrowRight, TrendingUp, FileText, Users, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Case Studies | DraftCopyAI',
  description:
    'See how businesses like yours are scaling content production and driving results with DraftCopyAI. Real stories, real metrics.',
};

const aggregateStats = [
  { value: '500+', label: 'Clients Served', icon: Users },
  { value: '50K+', label: 'Articles Delivered', icon: FileText },
  { value: '3x', label: 'Avg Traffic Increase', icon: TrendingUp },
  { value: '48hrs', label: 'Avg Delivery Time', icon: Zap },
];

export default function CaseStudiesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 grain">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100/30 via-transparent to-accent-100/20" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent-500/10 px-4 py-2 text-sm font-medium text-accent-700 mb-6">
              <TrendingUp className="h-4 w-4" />
              Success Stories
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary-900 mb-6">
              Real Results from{' '}
              <span className="text-accent-500">Real Teams</span>
            </h1>
            <p className="text-lg sm:text-xl text-secondary-500 leading-relaxed">
              Don&apos;t just take our word for it. See how marketing teams are scaling
              content production, improving SEO rankings, and driving measurable results.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary-900 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {aggregateStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <Section>
        <SectionHeader
          title="Featured Case Studies"
          description="Deep dives into how we've helped teams overcome content challenges and achieve their goals."
        />
        <div className="grid md:grid-cols-2 gap-8">
          {caseStudies.map((caseStudy, index) => (
            <CaseStudyCard
              key={caseStudy.id}
              caseStudy={caseStudy}
              delay={index * 0.1}
            />
          ))}
        </div>
      </Section>

      {/* Testimonials Section */}
      <Section alternate>
        <SectionHeader
          title="What Our Clients Say"
          description="Hear directly from marketing leaders who've transformed their content operations."
        />
        <TestimonialsSection testimonials={testimonials} layout="carousel" showRating />
      </Section>

      {/* CTA Section */}
      <Section>
        <div className="relative rounded-3xl overflow-hidden bg-primary-900 p-12 md:p-16 lg:p-20">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-800/50 to-transparent" />
          <div className="relative text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to write your success story?
            </h2>
            <p className="mx-auto max-w-xl text-lg text-primary-200 mb-10">
              Join 500+ teams that have scaled their content with DraftCopyAI.
              Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/contact" variant="primary" size="lg">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                href="/pricing"
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/50"
              >
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
