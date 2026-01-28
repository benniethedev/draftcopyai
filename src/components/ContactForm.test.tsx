import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Create a standalone ContactForm component for testing
// (extracted from the contact page)
import { useForm } from 'react-hook-form';
import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

interface ContactFormProps {
  onSubmit?: (data: FormData) => Promise<void>;
}

function ContactForm({ onSubmit }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const handleFormSubmit = async (data: FormData) => {
    if (onSubmit) {
      await onSubmit(data);
    }
    setSubmitted(true);
  };

  if (submitted) {
    return <div data-testid="success-message">Got it!</div>;
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} data-testid="contact-form">
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          {...register('name', { required: 'We need your name' })}
        />
        {errors.name && <span role="alert">{errors.name.message}</span>}
      </div>

      <div>
        <label htmlFor="email">Work email</label>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: 'We need your email to respond',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "That doesn't look like a valid email",
            },
          })}
        />
        {errors.email && <span role="alert">{errors.email.message}</span>}
      </div>

      <div>
        <label htmlFor="company">Company</label>
        <input type="text" id="company" {...register('company')} />
      </div>

      <div>
        <label htmlFor="message">What's on your mind?</label>
        <textarea
          id="message"
          {...register('message', { required: 'Tell us something' })}
        />
        {errors.message && <span role="alert">{errors.message.message}</span>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}

describe('ContactForm', () => {
  it('renders all form fields', () => {
    render(<ContactForm />);
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/work email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/what's on your mind/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('shows validation error when name is empty', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    
    await user.click(screen.getByRole('button', { name: /send message/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/we need your name/i)).toBeInTheDocument();
    });
  });

  it('shows validation error when email is empty', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.click(screen.getByRole('button', { name: /send message/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/we need your email/i)).toBeInTheDocument();
    });
  });

  it('shows validation error for invalid email format', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    // Use a format that passes HTML5 validation but fails our pattern
    await user.type(screen.getByLabelText(/work email/i), 'test@x');
    await user.type(screen.getByLabelText(/what's on your mind/i), 'Test message');
    await user.click(screen.getByRole('button', { name: /send message/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/doesn't look like a valid email/i)).toBeInTheDocument();
    });
  });

  it('shows validation error when message is empty', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/work email/i), 'john@example.com');
    await user.click(screen.getByRole('button', { name: /send message/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/tell us something/i)).toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    const handleSubmit = vi.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();
    render(<ContactForm onSubmit={handleSubmit} />);
    
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/work email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/company/i), 'Acme Inc');
    await user.type(screen.getByLabelText(/what's on your mind/i), 'I want to learn more');
    await user.click(screen.getByRole('button', { name: /send message/i }));
    
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        company: 'Acme Inc',
        message: 'I want to learn more',
      });
    });
  });

  it('shows success message after submission', async () => {
    const handleSubmit = vi.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();
    render(<ContactForm onSubmit={handleSubmit} />);
    
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/work email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/what's on your mind/i), 'Hello!');
    await user.click(screen.getByRole('button', { name: /send message/i }));
    
    await waitFor(() => {
      expect(screen.getByTestId('success-message')).toBeInTheDocument();
    });
  });

  it('disables submit button while submitting', async () => {
    const handleSubmit = vi.fn().mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    const user = userEvent.setup();
    render(<ContactForm onSubmit={handleSubmit} />);
    
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/work email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/what's on your mind/i), 'Hello!');
    
    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByRole('button')).toBeDisabled();
      expect(screen.getByRole('button')).toHaveTextContent(/sending/i);
    });
  });

  it('company field is optional', async () => {
    const handleSubmit = vi.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();
    render(<ContactForm onSubmit={handleSubmit} />);
    
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/work email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/what's on your mind/i), 'Hello!');
    // Not filling company field
    await user.click(screen.getByRole('button', { name: /send message/i }));
    
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith(expect.objectContaining({
        company: '',
      }));
    });
  });
});
