import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TestimonialCard from './TestimonialCard';

describe('TestimonialCard', () => {
  const defaultProps = {
    quote: 'This service transformed our content strategy completely.',
    author: 'Sarah Chen',
    role: 'Marketing Director',
    company: 'TechFlow',
  };

  it('renders the quote', () => {
    render(<TestimonialCard {...defaultProps} />);
    expect(screen.getByText(/This service transformed our content strategy/)).toBeInTheDocument();
  });

  it('renders the author name', () => {
    render(<TestimonialCard {...defaultProps} />);
    expect(screen.getByText('Sarah Chen')).toBeInTheDocument();
  });

  it('renders role and company', () => {
    render(<TestimonialCard {...defaultProps} />);
    expect(screen.getByText('Marketing Director, TechFlow')).toBeInTheDocument();
  });

  it('renders 5 star icons', () => {
    const { container } = render(<TestimonialCard {...defaultProps} />);
    const stars = container.querySelectorAll('svg.text-yellow-500');
    expect(stars.length).toBe(5);
  });

  it('displays author initials in avatar', () => {
    render(<TestimonialCard {...defaultProps} />);
    expect(screen.getByText('S')).toBeInTheDocument();
  });

  it('renders as a blockquote for semantic HTML', () => {
    render(<TestimonialCard {...defaultProps} />);
    const blockquote = document.querySelector('blockquote');
    expect(blockquote).toBeInTheDocument();
  });
});
