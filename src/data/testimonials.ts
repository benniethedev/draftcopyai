export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  image?: string;
  rating?: number; // 1-5 stars
  featured?: boolean;
  companyLogo?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'sarah-chen',
    quote:
      'We were doing maybe 2 posts a month before. Now we do 20. Organic traffic tripled in 6 months and I actually have time for other things.',
    author: 'Sarah Chen',
    role: 'Marketing Director',
    company: 'TechFlow',
    rating: 5,
    featured: true,
  },
  {
    id: 'marcus-johnson',
    quote:
      "I was skeptical about AI content. But honestly? I can't tell the difference between this and what our senior writer produces. And it costs a third as much.",
    author: 'Marcus Johnson',
    role: 'Founder',
    company: 'GrowthLab',
    rating: 5,
    featured: true,
  },
  {
    id: 'emily-rodriguez',
    quote:
      "Most content services don't get B2B. These folks do. We hit page 1 for three target keywords within six weeks.",
    author: 'Emily Rodriguez',
    role: 'Head of Content',
    company: 'ScaleUp',
    rating: 5,
    featured: true,
  },
  {
    id: 'david-kim',
    quote:
      "Our blog was basically dead. DraftCopyAI brought it back to life. 40 posts in 3 months, all on-brand, all ranking. The ROI is insane.",
    author: 'David Kim',
    role: 'VP of Marketing',
    company: 'CloudSync',
    rating: 5,
  },
  {
    id: 'lisa-patel',
    quote:
      "The turnaround time is what sold me. I needed 15 posts for a product launch and they delivered in a week. Quality was spot-on.",
    author: 'Lisa Patel',
    role: 'Content Strategist',
    company: 'Finova',
    rating: 5,
  },
];

export function getFeaturedTestimonials(): Testimonial[] {
  return testimonials.filter((t) => t.featured);
}

export function getTestimonialById(id: string): Testimonial | undefined {
  return testimonials.find((t) => t.id === id);
}
