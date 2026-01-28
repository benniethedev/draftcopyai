import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TestimonialCard from './TestimonialCard';

describe('TestimonialCard', () => {
  const defaultProps = {
    quote: 'This service changed our content game completely.',
    author: 'John Doe',
    role: 'Marketing Director',
    company: 'TechCorp',
  };

  it('renders the quote', () => {
    render(<TestimonialCard {...defaultProps} />);
    expect(screen.getByText('This service changed our content game completely.')).toBeInTheDocument();
  });

  it('renders the author name', () => {
    render(<TestimonialCard {...defaultProps} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders the role and company', () => {
    render(<TestimonialCard {...defaultProps} />);
    expect(screen.getByText('Marketing Director, TechCorp')).toBeInTheDocument();
  });

  it('renders 5 star icons', () => {
    render(<TestimonialCard {...defaultProps} />);
    const stars = document.querySelectorAll('svg.fill-accent-400');
    expect(stars).toHaveLength(5);
  });

  it('renders author initials when no image provided', () => {
    render(<TestimonialCard {...defaultProps} />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders author image when provided', () => {
    render(<TestimonialCard {...defaultProps} image="https://example.com/photo.jpg" />);
    const img = screen.getByAltText('John Doe');
    expect(img).toHaveAttribute('src', 'https://example.com/photo.jpg');
  });

  it('renders as a card element', () => {
    const { container } = render(<TestimonialCard {...defaultProps} />);
    const card = container.querySelector('[class*="rounded-3xl"]');
    expect(card).toBeInTheDocument();
  });
});
