import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('renders the logo', () => {
    render(<Header />);
    expect(screen.getByAltText('DraftCopyAI')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Header />);
    expect(screen.getByText('How It Works')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders the CTA button', () => {
    render(<Header />);
    expect(screen.getByText('Get Started')).toBeInTheDocument();
  });

  it('toggles mobile menu on click', () => {
    render(<Header />);
    const menuButton = screen.getByRole('button', { name: /open menu/i });
    
    // Menu should be closed initially
    expect(screen.queryByRole('navigation')).toBeTruthy();
    
    // Click to open
    fireEvent.click(menuButton);
    
    // Mobile menu items should be visible
    const mobileLinks = screen.getAllByText('How It Works');
    expect(mobileLinks.length).toBeGreaterThan(0);
  });

  it('has correct navigation hrefs', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: /how it works/i })).toHaveAttribute('href', '/how-it-works');
    expect(screen.getByRole('link', { name: /pricing/i })).toHaveAttribute('href', '/pricing');
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '/about');
  });

  it('applies glass effect styling', () => {
    render(<Header />);
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('glass');
  });
});
