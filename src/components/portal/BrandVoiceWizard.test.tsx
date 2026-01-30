import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BrandVoiceWizard from './BrandVoiceWizard';

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock crypto.randomUUID - use counter for unique IDs
let uuidCounter = 0;
vi.stubGlobal('crypto', {
  randomUUID: () => `test-uuid-${++uuidCounter}`,
});

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
};
vi.stubGlobal('localStorage', localStorageMock);

describe('BrandVoiceWizard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    uuidCounter = 0;
    localStorageMock.getItem.mockReturnValue(null);
  });

  it('renders intro step initially', () => {
    render(<BrandVoiceWizard />);
    
    expect(screen.getByText('Train Your Brand Voice')).toBeInTheDocument();
    expect(screen.getByText(/Share 2-5 samples/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Get Started/i })).toBeInTheDocument();
  });

  it('shows skip button when onSkip provided', () => {
    const onSkip = vi.fn();
    render(<BrandVoiceWizard onSkip={onSkip} />);
    
    const skipButton = screen.getByRole('button', { name: /Skip for Now/i });
    expect(skipButton).toBeInTheDocument();
    
    fireEvent.click(skipButton);
    expect(onSkip).toHaveBeenCalled();
  });

  it('navigates to samples step when Get Started clicked', async () => {
    render(<BrandVoiceWizard />);
    
    fireEvent.click(screen.getByRole('button', { name: /Get Started/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/Paste your first sample/)).toBeInTheDocument();
    });
  });

  it('disables Add Sample button when text is too short', async () => {
    const user = userEvent.setup();
    render(<BrandVoiceWizard />);
    
    // Go to samples step
    fireEvent.click(screen.getByRole('button', { name: /Get Started/i }));
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Paste an article/)).toBeInTheDocument();
    });

    // Type a short sample
    const textarea = screen.getByPlaceholderText(/Paste an article/);
    await user.type(textarea, 'Too short');
    
    // Add Sample button should be disabled
    const addButton = screen.getByRole('button', { name: /Add Sample/i });
    expect(addButton).toBeDisabled();
  });

  it('adds valid samples and clears textarea', async () => {
    const user = userEvent.setup();
    render(<BrandVoiceWizard />);
    
    // Go to samples step
    fireEvent.click(screen.getByRole('button', { name: /Get Started/i }));
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Paste an article/)).toBeInTheDocument();
    });

    // Add a valid sample (100+ characters)
    const longSample = 'This is a sample piece of content that demonstrates our brand voice. It includes various elements of our writing style and tone that should be analyzed. We want to capture the essence of how we communicate.';
    
    const textarea = screen.getByPlaceholderText(/Paste an article/) as HTMLTextAreaElement;
    await user.type(textarea, longSample);
    
    // Button should be enabled now
    const addButton = screen.getByRole('button', { name: /Add Sample/i });
    expect(addButton).not.toBeDisabled();
    
    fireEvent.click(addButton);
    
    await waitFor(() => {
      // Sample 1 label should appear
      expect(screen.getByText('Sample 1', { exact: false })).toBeInTheDocument();
      // Textarea should be cleared
      expect(textarea.value).toBe('');
    });
  });

  it('requires at least 2 samples to analyze', async () => {
    render(<BrandVoiceWizard />);
    
    // Go to samples step
    fireEvent.click(screen.getByRole('button', { name: /Get Started/i }));
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Paste an article/)).toBeInTheDocument();
    });

    // The analyze button should be disabled initially
    const analyzeButton = screen.getByRole('button', { name: /Analyze My Voice/i });
    expect(analyzeButton).toBeDisabled();
  });

  it('calls API and shows results on successful analysis', async () => {
    const user = userEvent.setup();
    
    const mockResult = {
      profile: {
        name: 'Professional Conversationalist',
        description: 'A warm, professional voice that connects with readers.',
        tone: {
          formality: 6,
          enthusiasm: 7,
          confidence: 8,
          warmth: 7,
          humor: 4,
        },
        vocabulary: {
          complexity: 'moderate',
          jargonLevel: 'minimal',
          signatureWords: ['innovative', 'transform', 'empower'],
          avoidWords: ['actually', 'basically'],
          industryTerms: ['ROI', 'KPI'],
        },
        sentenceStructure: {
          averageLength: 'medium',
          paragraphStyle: 'balanced',
          preferredOpenings: ['We believe', 'Our approach'],
          transitionStyle: 'flowing',
        },
        contentPatterns: {
          usesQuestions: true,
          usesLists: true,
          usesAnecdotes: false,
          usesData: true,
          usesMetaphors: false,
          callToActionStyle: 'moderate',
        },
        sampleExcerpts: ['This is how we communicate with impact.'],
      },
      confidence: 85,
      suggestions: ['Consider adding more storytelling elements'],
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResult),
    });

    render(<BrandVoiceWizard />);
    
    // Go to samples step
    fireEvent.click(screen.getByRole('button', { name: /Get Started/i }));
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Paste an article/)).toBeInTheDocument();
    });

    // Add two valid samples
    const longSample = 'This is a sample piece of content that demonstrates our brand voice. It includes various elements of our writing style and tone that should be analyzed. We want to capture the essence of how we communicate with our readers.';
    
    for (let i = 0; i < 2; i++) {
      const textarea = screen.getByPlaceholderText(/Paste an article/);
      await user.clear(textarea);
      await user.type(textarea, longSample);
      fireEvent.click(screen.getByRole('button', { name: /Add Sample/i }));
      
      // Wait for sample to be added
      await waitFor(() => {
        expect(screen.getByText(`Sample ${i + 1}`, { exact: false })).toBeInTheDocument();
      });
    }

    // Now analyze button should be enabled
    const analyzeButton = screen.getByRole('button', { name: /Analyze My Voice/i });
    expect(analyzeButton).not.toBeDisabled();
    
    fireEvent.click(analyzeButton);
    
    // Should show analyzing state
    await waitFor(() => {
      expect(screen.getByText(/Analyzing Your Brand Voice/)).toBeInTheDocument();
    });

    // Should show results
    await waitFor(() => {
      expect(screen.getByText(/Professional Conversationalist/)).toBeInTheDocument();
      expect(screen.getByText(/85% Confidence/)).toBeInTheDocument();
    });
  });

  it('navigates back from samples to intro', async () => {
    render(<BrandVoiceWizard />);
    
    // Go to samples step
    fireEvent.click(screen.getByRole('button', { name: /Get Started/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/Paste your first sample/)).toBeInTheDocument();
    });

    // Click back
    fireEvent.click(screen.getByRole('button', { name: /Back/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Train Your Brand Voice')).toBeInTheDocument();
    });
  });
});
