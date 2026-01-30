'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import BrandVoiceWizard from '@/components/portal/BrandVoiceWizard';

export default function BrandVoicePage() {
  const router = useRouter();

  const handleComplete = () => {
    // Could trigger confetti or additional actions
    console.log('Brand voice profile saved');
  };

  const handleSkip = () => {
    router.push('/portal');
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Back link */}
      <Link
        href="/portal"
        className="inline-flex items-center gap-2 text-secondary-500 hover:text-primary-900 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      <BrandVoiceWizard 
        onComplete={handleComplete}
        onSkip={handleSkip}
      />
    </div>
  );
}
