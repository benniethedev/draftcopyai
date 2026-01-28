import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FeatureCard from './FeatureCard';

describe('FeatureCard', () => {
  const mockIcon = <svg data-testid="test-icon" />;
  const defaultProps = {
    icon: mockIcon,
    title: 'Fast Turnaround',
    description: 'Get your content in days, not weeks.',
  };

  it('renders the title', () => {
    render(<FeatureCard {...defaultProps} />);
    expect(screen.getByText('Fast Turnaround')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<FeatureCard {...defaultProps} />);
    expect(screen.getByText('Get your content in days, not weeks.')).toBeInTheDocument();
  });

  it('renders the icon', () => {
    render(<FeatureCard {...defaultProps} />);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('has proper heading structure', () => {
    render(<FeatureCard {...defaultProps} />);
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toHaveTextContent('Fast Turnaround');
  });

  it('applies hover styles to card container', () => {
    const { container } = render(<FeatureCard {...defaultProps} />);
    const card = container.firstChild;
    expect(card?.className).toContain('hover:border-primary-500/50');
    expect(card?.className).toContain('hover:bg-white/10');
  });
});
