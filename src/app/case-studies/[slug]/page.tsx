import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Quote, Clock, Briefcase, Check } from 'lucide-react';
import Section from '@/components/Section';
import Button from '@/components/Button';
import { caseStudies, getCaseStudyBySlug } from '@/data/caseStudies';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({
    slug: cs.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found | DraftCopyAI',
    };
  }

  return {
    title: `${caseStudy.title} | DraftCopyAI Case Study`,
    description: caseStudy.summary,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 grain">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100/30 via-transparent to-accent-100/20" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-secondary-500 hover:text-primary-900 transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Case Studies
          </Link>

          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-100 px-3 py-1.5 text-sm font-medium text-primary-700">
                <Briefcase className="h-3.5 w-3.5" />
                {caseStudy.industry}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-100 px-3 py-1.5 text-sm font-medium text-accent-700">
                <Clock className="h-3.5 w-3.5" />
                {caseStudy.timeline}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary-900 mb-6">
              {caseStudy.title}
            </h1>

            <p className="text-lg sm:text-xl text-secondary-500 leading-relaxed mb-8">
              {caseStudy.summary}
            </p>

            {/* Services */}
            <div className="flex flex-wrap gap-2">
              {caseStudy.services.map((service) => (
                <span
                  key={service}
                  className="text-sm px-3 py-1.5 rounded-full bg-white border border-slate-200 text-secondary-600"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results Metrics Bar */}
      <section className="bg-primary-900 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {caseStudy.results.metrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                  {metric.value}
                </div>
                <div className="text-sm text-primary-200">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <Section>
        <div className="max-w-4xl mx-auto">
          {/* Challenge Section */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary-900 mb-4">
              {caseStudy.challenge.title}
            </h2>
            <p className="text-lg text-secondary-600 leading-relaxed mb-6">
              {caseStudy.challenge.description}
            </p>
            <ul className="space-y-3">
              {caseStudy.challenge.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3 text-secondary-600">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>

          {/* Solution Section */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary-900 mb-4">
              {caseStudy.solution.title}
            </h2>
            <p className="text-lg text-secondary-600 leading-relaxed mb-6">
              {caseStudy.solution.description}
            </p>
            <ul className="space-y-3">
              {caseStudy.solution.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3 text-secondary-600">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-accent-100 flex items-center justify-center mt-0.5">
                    <Check className="h-3.5 w-3.5 text-accent-600" />
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>

          {/* Pull Quote */}
          <div className="relative bg-slate-50 rounded-3xl p-8 md:p-12 mb-16">
            <Quote className="absolute top-6 left-6 h-12 w-12 text-slate-200" />
            <blockquote className="relative text-xl md:text-2xl text-primary-900 font-medium leading-relaxed mb-6 pl-8">
              &ldquo;{caseStudy.pullQuote.quote}&rdquo;
            </blockquote>
            <div className="pl-8">
              <div className="font-semibold text-primary-900">
                {caseStudy.pullQuote.author}
              </div>
              <div className="text-secondary-500">{caseStudy.pullQuote.role}</div>
            </div>
          </div>

          {/* Results Section */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary-900 mb-4">
              {caseStudy.results.title}
            </h2>
            <p className="text-lg text-secondary-600 leading-relaxed mb-8">
              {caseStudy.results.description}
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {caseStudy.results.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="bg-white rounded-2xl border border-slate-200/60 p-6 text-center shadow-sm"
                >
                  <div className="text-4xl font-bold text-accent-600 mb-2">
                    {metric.value}
                  </div>
                  <div className="text-secondary-600">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section alternate>
        <div className="relative rounded-3xl overflow-hidden bg-primary-900 p-12 md:p-16">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-800/50 to-transparent" />
          <div className="relative text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to achieve results like {caseStudy.client}?
            </h2>
            <p className="mx-auto max-w-xl text-lg text-primary-200 mb-8">
              Start your free trial today and see how DraftCopyAI can transform your
              content operations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/contact" variant="primary" size="lg">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                href="/case-studies"
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/50"
              >
                View More Case Studies
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
