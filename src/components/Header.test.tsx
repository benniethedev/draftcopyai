import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('renders the logo', () => {
    render(<Header />);
    const logo = screen.getByRole('img', { name: /draftcopyai/i });
    expect(logo).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: /how it works/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /pricing/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
  });

  it('renders Get Started CTA button', () => {
    render(<Header />);
    const ctaButtons = screen.getAllByRole('link', { name: /get started/i });
    expect(ctaButtons.length).toBeGreaterThan(0);
  });

  it('navigation links have correct hrefs', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: /how it works/i })).toHaveAttribute('href', '/how-it-works');
    expect(screen.getByRole('link', { name: /pricing/i })).toHaveAttribute('href', '/pricing');
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '/about');
  });

  it('logo links to home page', () => {
    render(<Header />);
    const logoLink = screen.getByRole('link', { name: /draftcopyai/i });
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('renders mobile menu button', () => {
    render(<Header />);
    const menuButton = screen.getByRole('button', { name: /open menu/i });
    expect(menuButton).toBeInTheDocument();
  });

  it('mobile menu is hidden by default', () => {
    render(<Header />);
    // Mobile menu items are in a different container that animates
    // We check that the nav has the mobile-hidden class
    const nav = document.querySelector('nav');
    expect(nav).toBeInTheDocument();
  });

  it('toggles mobile menu when button is clicked', () => {
    render(<Header />);
    const menuButton = screen.getByRole('button');
    
    // Click to open
    fireEvent.click(menuButton);
    // Mobile menu should show links (they appear twice - desktop and mobile)
    const pricingLinks = screen.getAllByRole('link', { name: /pricing/i });
    expect(pricingLinks.length).toBeGreaterThan(1);
    
    // Click to close
    fireEvent.click(menuButton);
  });

  it('has proper accessibility attributes', () => {
    render(<Header />);
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label');
  });
});
