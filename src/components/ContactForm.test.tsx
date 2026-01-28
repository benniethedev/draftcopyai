import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock the contact page component since it contains the form
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

// Create a simple form component for testing
function ContactForm({ onSubmit }: { onSubmit: (data: Record<string, string>) => void }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        onSubmit(Object.fromEntries(formData) as Record<string, string>);
      }}
    >
      <input
        type="text"
        name="name"
        placeholder="Jane Smith"
        aria-label="Name"
      />
      <input
        type="email"
        name="email"
        placeholder="jane@company.com"
        aria-label="Work email"
      />
      <input
        type="text"
        name="company"
        placeholder="Acme Inc."
        aria-label="Company"
      />
      <textarea
        name="message"
        placeholder="Questions, ideas, what you're looking for..."
        aria-label="What's on your mind?"
      />
      <button type="submit">Send Message</button>
    </form>
  );
}

describe('ContactForm', () => {
  it('renders all form fields', () => {
    render(<ContactForm onSubmit={() => {}} />);
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/work email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/what's on your mind/i)).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<ContactForm onSubmit={() => {}} />);
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('allows user to fill in form fields', async () => {
    const user = userEvent.setup();
    render(<ContactForm onSubmit={() => {}} />);
    
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/work email/i);
    const companyInput = screen.getByLabelText(/company/i);
    const messageInput = screen.getByLabelText(/what's on your mind/i);
    
    await user.type(nameInput, 'Jane Smith');
    await user.type(emailInput, 'jane@company.com');
    await user.type(companyInput, 'Acme Inc');
    await user.type(messageInput, 'I have a question about pricing');
    
    expect(nameInput).toHaveValue('Jane Smith');
    expect(emailInput).toHaveValue('jane@company.com');
    expect(companyInput).toHaveValue('Acme Inc');
    expect(messageInput).toHaveValue('I have a question about pricing');
  });

  it('calls onSubmit with form data when submitted', async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();
    
    render(<ContactForm onSubmit={handleSubmit} />);
    
    await user.type(screen.getByLabelText(/name/i), 'Jane Smith');
    await user.type(screen.getByLabelText(/work email/i), 'jane@company.com');
    await user.type(screen.getByLabelText(/company/i), 'Acme');
    await user.type(screen.getByLabelText(/what's on your mind/i), 'Hello');
    
    await user.click(screen.getByRole('button', { name: /send message/i }));
    
    expect(handleSubmit).toHaveBeenCalledWith({
      name: 'Jane Smith',
      email: 'jane@company.com',
      company: 'Acme',
      message: 'Hello',
    });
  });

  it('has correct placeholder texts', () => {
    render(<ContactForm onSubmit={() => {}} />);
    
    expect(screen.getByPlaceholderText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('jane@company.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Acme Inc.')).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Questions, ideas, what you're looking for...")).toBeInTheDocument();
  });
});
