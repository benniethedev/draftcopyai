import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PricingCard from './PricingCard';

describe('PricingCard', () => {
  const defaultProps = {
    name: 'Starter',
    price: '$499',
    description: 'Perfect for getting started',
    features: ['8 blog posts', 'SEO included', 'Email support'],
  };

  it('renders plan name', () => {
    render(<PricingCard {...defaultProps} />);
    expect(screen.getByText('Starter')).toBeInTheDocument();
  });

  it('renders price correctly', () => {
    render(<PricingCard {...defaultProps} />);
    expect(screen.getByText('$499')).toBeInTheDocument();
    expect(screen.getByText('/month')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<PricingCard {...defaultProps} />);
    expect(screen.getByText('Perfect for getting started')).toBeInTheDocument();
  });

  it('renders all features', () => {
    render(<PricingCard {...defaultProps} />);
    expect(screen.getByText('8 blog posts')).toBeInTheDocument();
    expect(screen.getByText('SEO included')).toBeInTheDocument();
    expect(screen.getByText('Email support')).toBeInTheDocument();
  });

  it('does not show "Most Popular" badge by default', () => {
    render(<PricingCard {...defaultProps} />);
    expect(screen.queryByText('Most Popular')).not.toBeInTheDocument();
  });

  it('shows "Most Popular" badge when popular is true', () => {
    render(<PricingCard {...defaultProps} popular />);
    expect(screen.getByText('Most Popular')).toBeInTheDocument();
  });

  it('renders a CTA button linking to contact', () => {
    render(<PricingCard {...defaultProps} />);
    const link = screen.getByRole('link', { name: 'Get Started' });
    expect(link).toHaveAttribute('href', '/contact');
  });

  it('applies different styles for popular plan', () => {
    const { container, rerender } = render(<PricingCard {...defaultProps} />);
    const normalCard = container.firstChild;
    expect(normalCard?.className).toContain('border-white/10');

    rerender(<PricingCard {...defaultProps} popular />);
    const popularCard = container.firstChild;
    expect(popularCard?.className).toContain('border-primary-500');
  });

  it('handles empty features array', () => {
    render(<PricingCard {...defaultProps} features={[]} />);
    expect(screen.getByText('Starter')).toBeInTheDocument();
  });

  it('renders checkmark icons for each feature', () => {
    const { container } = render(<PricingCard {...defaultProps} />);
    const checkIcons = container.querySelectorAll('svg');
    expect(checkIcons.length).toBeGreaterThanOrEqual(defaultProps.features.length);
  });
});
