import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PricingCard from './PricingCard';

describe('PricingCard', () => {
  const defaultProps = {
    name: 'Starter',
    price: '$499',
    description: 'Perfect for getting started',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
  };

  it('renders plan name', () => {
    render(<PricingCard {...defaultProps} />);
    expect(screen.getByText('Starter')).toBeInTheDocument();
  });

  it('renders price', () => {
    render(<PricingCard {...defaultProps} />);
    expect(screen.getByText('$499')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<PricingCard {...defaultProps} />);
    expect(screen.getByText('Perfect for getting started')).toBeInTheDocument();
  });

  it('renders all features', () => {
    render(<PricingCard {...defaultProps} />);
    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Feature 2')).toBeInTheDocument();
    expect(screen.getByText('Feature 3')).toBeInTheDocument();
  });

  it('renders CTA button', () => {
    render(<PricingCard {...defaultProps} />);
    expect(screen.getByRole('link', { name: /get started/i })).toBeInTheDocument();
  });

  it('shows "Most Popular" badge when popular is true', () => {
    render(<PricingCard {...defaultProps} popular />);
    expect(screen.getByText('Most Popular')).toBeInTheDocument();
  });

  it('does not show popular badge by default', () => {
    render(<PricingCard {...defaultProps} />);
    expect(screen.queryByText('Most Popular')).not.toBeInTheDocument();
  });

  it('applies popular styling when popular is true', () => {
    render(<PricingCard {...defaultProps} popular />);
    const card = screen.getByText('Starter').closest('div')?.parentElement;
    expect(card).toHaveClass('border-2', 'border-accent-500');
  });

  it('renders per month text', () => {
    render(<PricingCard {...defaultProps} />);
    expect(screen.getByText('/month')).toBeInTheDocument();
  });
});
