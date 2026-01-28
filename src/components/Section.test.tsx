import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Section, { SectionHeader } from './Section';

describe('Section', () => {
  it('renders children', () => {
    render(<Section><p>Test content</p></Section>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies id when provided', () => {
    render(<Section id="test-section"><p>Content</p></Section>);
    expect(document.getElementById('test-section')).toBeInTheDocument();
  });

  it('applies alternate background when alternate prop is true', () => {
    render(<Section alternate><p>Content</p></Section>);
    const section = screen.getByText('Content').closest('section');
    expect(section).toHaveClass('bg-white');
  });

  it('applies custom className', () => {
    render(<Section className="custom-class"><p>Content</p></Section>);
    const section = screen.getByText('Content').closest('section');
    expect(section).toHaveClass('custom-class');
  });
});

describe('SectionHeader', () => {
  it('renders title', () => {
    render(<SectionHeader title="Test Title" />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Test Title');
  });

  it('renders description when provided', () => {
    render(<SectionHeader title="Title" description="Test description" />);
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders badge when provided', () => {
    render(<SectionHeader title="Title" badge="New Feature" />);
    expect(screen.getByText('New Feature')).toBeInTheDocument();
  });

  it('centers content by default', () => {
    render(<SectionHeader title="Centered Title" />);
    const container = screen.getByRole('heading', { level: 2 }).parentElement;
    expect(container).toHaveClass('mx-auto', 'text-center');
  });

  it('does not center content when centered is false', () => {
    render(<SectionHeader title="Left Title" centered={false} />);
    const container = screen.getByRole('heading', { level: 2 }).parentElement;
    expect(container).not.toHaveClass('mx-auto', 'text-center');
  });
});
