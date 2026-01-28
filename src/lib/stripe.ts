import Stripe from 'stripe';

// Initialize Stripe with secret key from environment
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
  typescript: true,
});

// Price IDs for each plan (to be created in Stripe Dashboard)
// These should be subscription prices (recurring monthly)
export const PRICE_IDS = {
  starter: process.env.STRIPE_PRICE_STARTER!,
  growth: process.env.STRIPE_PRICE_GROWTH!,
  scale: process.env.STRIPE_PRICE_SCALE!,
} as const;

export type PlanType = keyof typeof PRICE_IDS;

// Plan metadata
export const PLANS: Record<PlanType, { name: string; price: number; features: string[] }> = {
  starter: {
    name: 'Starter',
    price: 499,
    features: [
      '8 blog posts per month',
      '1,500+ words each',
      'SEO baked in',
      'Unlimited revisions',
      '48-hour turnaround',
      'Email support',
    ],
  },
  growth: {
    name: 'Growth',
    price: 999,
    features: [
      '20 blog posts per month',
      '1,500+ words each',
      '40 social posts included',
      'SEO baked in',
      'Unlimited revisions',
      '24-hour turnaround',
      'Your own account manager',
      'Priority support',
    ],
  },
  scale: {
    name: 'Scale',
    price: 1999,
    features: [
      '40 blog posts per month',
      '2,000+ words each',
      '100 social posts included',
      '4 email sequences monthly',
      'SEO baked in',
      'Unlimited revisions',
      'Same-day delivery option',
      'Dedicated strategist',
      'Slack channel access',
      'Monthly performance reports',
    ],
  },
};

// Helper to get plan from price ID
export function getPlanFromPriceId(priceId: string): PlanType | null {
  for (const [plan, id] of Object.entries(PRICE_IDS)) {
    if (id === priceId) return plan as PlanType;
  }
  return null;
}
