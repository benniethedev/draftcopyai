import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FeatureCard from './FeatureCard';
import { Zap } from 'lucide-react';

describe('FeatureCard', () => {
  const defaultProps = {
    icon: <Zap data-testid="test-icon" />,
    title: 'Test Feature',
    description: 'Test description for the feature card',
  };

  it('renders the title', () => {
    render(<FeatureCard {...defaultProps} />);
    expect(screen.getByText('Test Feature')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<FeatureCard {...defaultProps} />);
    expect(screen.getByText('Test description for the feature card')).toBeInTheDocument();
  });

  it('renders the icon', () => {
    render(<FeatureCard {...defaultProps} />);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('renders as a card element', () => {
    const { container } = render(<FeatureCard {...defaultProps} />);
    // Check for the motion.div wrapper which has the card classes
    const cards = container.querySelectorAll('[class*="rounded-3xl"]');
    expect(cards.length).toBeGreaterThan(0);
  });

  it('applies large variant styling when large prop is true', () => {
    const { container } = render(<FeatureCard {...defaultProps} large />);
    const cardWithLargeClasses = container.querySelector('[class*="md:col-span-2"]');
    expect(cardWithLargeClasses).toBeInTheDocument();
  });
});
