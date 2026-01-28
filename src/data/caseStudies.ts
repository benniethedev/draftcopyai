export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  clientLogo?: string;
  heroImage?: string;
  summary: string;
  challenge: {
    title: string;
    description: string;
    bullets: string[];
  };
  solution: {
    title: string;
    description: string;
    bullets: string[];
  };
  results: {
    title: string;
    description: string;
    metrics: CaseStudyMetric[];
  };
  pullQuote: {
    quote: string;
    author: string;
    role: string;
  };
  timeline: string;
  services: string[];
  featured?: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'techflow',
    slug: 'techflow-saas-content-strategy',
    title: 'How TechFlow 3x\'d Organic Traffic in 6 Months',
    client: 'TechFlow',
    industry: 'B2B SaaS',
    summary:
      'TechFlow was struggling to maintain a consistent content cadence. We helped them scale from 2 posts to 20 posts per month while tripling their organic traffic.',
    challenge: {
      title: 'The Challenge',
      description:
        'TechFlow, a growing B2B SaaS company, had a talented marketing team but limited bandwidth for content creation. Their blog had been neglected for months.',
      bullets: [
        'Only publishing 2 blog posts per month due to resource constraints',
        'Organic traffic had plateaued at 15,000 monthly visitors',
        'Falling behind competitors who were publishing 4-5x more content',
        'Internal writers were stretched thin across multiple priorities',
      ],
    },
    solution: {
      title: 'The Solution',
      description:
        'We partnered with TechFlow on their Growth plan, providing 20 SEO-optimized blog posts monthly with 24-hour turnaround times.',
      bullets: [
        'Developed a comprehensive content calendar targeting high-intent keywords',
        'Created detailed brand voice guidelines from existing content',
        'Established a streamlined review workflow with their team',
        'Integrated with their existing marketing stack for seamless publishing',
      ],
    },
    results: {
      title: 'The Results',
      description:
        'Within 6 months, TechFlow saw dramatic improvements across all content metrics.',
      metrics: [
        { value: '3x', label: 'Organic Traffic Increase' },
        { value: '10x', label: 'Content Output Increase' },
        { value: '47', label: 'Page 1 Rankings' },
        { value: '156%', label: 'Lead Generation Increase' },
      ],
    },
    pullQuote: {
      quote:
        'We were doing maybe 2 posts a month before. Now we do 20. Organic traffic tripled in 6 months and I actually have time for other things.',
      author: 'Sarah Chen',
      role: 'Marketing Director, TechFlow',
    },
    timeline: '6 months',
    services: ['Blog Posts', 'SEO Optimization', 'Content Strategy'],
    featured: true,
  },
  {
    id: 'finova',
    slug: 'finova-product-launch-content',
    title: 'Finova\'s Product Launch: 15 Posts in 7 Days',
    client: 'Finova',
    industry: 'Fintech',
    summary:
      'When Finova needed to launch a new product with limited time, we delivered a complete content suite in just one week.',
    challenge: {
      title: 'The Challenge',
      description:
        'Finova was launching a new financial analytics product and needed comprehensive content to support the launch—but they only had a week.',
      bullets: [
        'Product launch date was fixed and non-negotiable',
        'Needed 15 pieces of content including blogs, landing pages, and email sequences',
        'Internal team was focused on product development',
        'Required technical accuracy for a fintech audience',
      ],
    },
    solution: {
      title: 'The Solution',
      description:
        'We assembled a dedicated team and leveraged our AI-assisted workflow to deliver all content within the tight deadline.',
      bullets: [
        'Conducted rapid onboarding call to understand the product and audience',
        'Created a content matrix covering all launch assets',
        'Assigned dedicated editors for fintech expertise',
        'Implemented daily review cycles for fast iteration',
      ],
    },
    results: {
      title: 'The Results',
      description:
        'The product launch exceeded expectations, with content playing a key role in initial traction.',
      metrics: [
        { value: '15', label: 'Pieces Delivered' },
        { value: '7', label: 'Days to Delivery' },
        { value: '2,400', label: 'Launch Day Sign-ups' },
        { value: '89%', label: 'Content Approval Rate (First Draft)' },
      ],
    },
    pullQuote: {
      quote:
        'The turnaround time is what sold me. I needed 15 posts for a product launch and they delivered in a week. Quality was spot-on.',
      author: 'Lisa Patel',
      role: 'Content Strategist, Finova',
    },
    timeline: '1 week',
    services: ['Blog Posts', 'Landing Pages', 'Email Sequences', 'Product Content'],
    featured: true,
  },
];

export function getFeaturedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((cs) => cs.featured);
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getCaseStudyById(id: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.id === id);
}
