import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Section, { SectionHeader } from './Section';

describe('Section', () => {
  it('renders children content', () => {
    render(
      <Section>
        <p>Test content</p>
      </Section>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders with custom id', () => {
    const { container } = render(
      <Section id="test-section">
        <p>Content</p>
      </Section>
    );
    expect(container.querySelector('#test-section')).toBeInTheDocument();
  });

  it('applies dark variant styles when dark prop is true', () => {
    const { container } = render(
      <Section dark>
        <p>Dark section</p>
      </Section>
    );
    const section = container.querySelector('section');
    expect(section?.className).toContain('bg-slate-900/50');
  });

  it('applies custom className', () => {
    const { container } = render(
      <Section className="custom-section">
        <p>Content</p>
      </Section>
    );
    const section = container.querySelector('section');
    expect(section?.className).toContain('custom-section');
  });

  it('has proper padding', () => {
    const { container } = render(
      <Section>
        <p>Content</p>
      </Section>
    );
    const section = container.querySelector('section');
    expect(section?.className).toContain('py-16');
  });
});

describe('SectionHeader', () => {
  it('renders title', () => {
    render(<SectionHeader title="Test Title" />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Test Title');
  });

  it('renders description when provided', () => {
    render(<SectionHeader title="Title" description="This is a description" />);
    expect(screen.getByText('This is a description')).toBeInTheDocument();
  });

  it('renders badge when provided', () => {
    render(<SectionHeader title="Title" badge="New Feature" />);
    expect(screen.getByText('New Feature')).toBeInTheDocument();
  });

  it('does not render badge when not provided', () => {
    render(<SectionHeader title="Title" />);
    const badges = document.querySelectorAll('.rounded-full');
    // Should only have styling for other elements, not a badge
    expect(screen.queryByText(/^[A-Z][a-z]+ [A-Z][a-z]+$/)).not.toBeInTheDocument();
  });

  it('centers content by default', () => {
    const { container } = render(<SectionHeader title="Title" />);
    const wrapper = container.firstChild;
    expect(wrapper?.className).toContain('text-center');
    expect(wrapper?.className).toContain('mx-auto');
  });

  it('does not center when centered is false', () => {
    const { container } = render(<SectionHeader title="Title" centered={false} />);
    const wrapper = container.firstChild;
    expect(wrapper?.className).not.toContain('text-center');
  });
});
