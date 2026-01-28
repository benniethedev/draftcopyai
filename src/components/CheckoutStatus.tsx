'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, X } from 'lucide-react';

export default function CheckoutStatus() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'success' | 'canceled' | null>(null);

  useEffect(() => {
    const checkout = searchParams.get('checkout');
    if (checkout === 'success' || checkout === 'canceled') {
      setStatus(checkout);
      // Remove query params from URL without reload
      const url = new URL(window.location.href);
      url.searchParams.delete('checkout');
      url.searchParams.delete('session_id');
      window.history.replaceState({}, '', url.pathname);
    }
  }, [searchParams]);

  const handleDismiss = () => setStatus(null);

  if (!status) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4"
      >
        <div
          className={`rounded-2xl p-4 shadow-lg border ${
            status === 'success'
              ? 'bg-green-50 border-green-200'
              : 'bg-amber-50 border-amber-200'
          }`}
        >
          <div className="flex items-start gap-3">
            {status === 'success' ? (
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
            ) : (
              <XCircle className="h-6 w-6 text-amber-500 flex-shrink-0" />
            )}
            <div className="flex-1">
              <p
                className={`font-semibold ${
                  status === 'success' ? 'text-green-800' : 'text-amber-800'
                }`}
              >
                {status === 'success'
                  ? 'Welcome aboard! 🎉'
                  : 'Checkout canceled'}
              </p>
              <p
                className={`text-sm mt-1 ${
                  status === 'success' ? 'text-green-700' : 'text-amber-700'
                }`}
              >
                {status === 'success'
                  ? 'Your subscription is active. Check your email for next steps.'
                  : 'No worries! Your checkout was canceled. Ready when you are.'}
              </p>
            </div>
            <button
              onClick={handleDismiss}
              className={`p-1 rounded-lg transition-colors ${
                status === 'success'
                  ? 'hover:bg-green-100 text-green-600'
                  : 'hover:bg-amber-100 text-amber-600'
              }`}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
