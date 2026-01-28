'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import Button from '@/components/Button';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError('');

    // Mock authentication - accept any email/password for demo
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, always succeed
    console.log('Login attempted with:', data.email);
    router.push('/portal');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto w-full max-w-sm">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link href="/" className="inline-block mb-8">
              <Image
                src="/logo.svg"
                alt="DraftCopyAI"
                width={160}
                height={32}
                className="h-8 w-auto"
                priority
              />
            </Link>

            <h1 className="text-2xl font-bold text-primary-900 mb-2">
              Welcome back
            </h1>
            <p className="text-secondary-500 mb-8">
              Sign in to access your client portal
            </p>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-primary-900 mb-2">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary-400" />
                  <input
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    placeholder="you@company.com"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white text-primary-900 placeholder-secondary-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-900 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', { required: 'Password is required' })}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-slate-200 bg-white text-primary-900 placeholder-secondary-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-secondary-600">
                  <input type="checkbox" className="rounded border-slate-300" />
                  Remember me
                </label>
                <Link
                  href="/portal/forgot-password"
                  className="text-sm text-accent-600 hover:text-accent-700 font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  'Signing in...'
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <p className="mt-8 text-center text-sm text-secondary-500">
              Don't have an account?{' '}
              <Link href="/contact" className="text-accent-600 hover:text-accent-700 font-medium">
                Get started
              </Link>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right side - Decorative */}
      <div className="hidden lg:flex lg:flex-1 bg-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-800/50 to-accent-900/30" />
        <div className="relative z-10 flex flex-col justify-center px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <blockquote className="text-xl lg:text-2xl text-white font-medium leading-relaxed mb-6">
              "DraftCopyAI transformed our content workflow. We went from 2 posts a month to 20, and the quality is consistently excellent."
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold">
                SC
              </div>
              <div>
                <p className="text-white font-medium">Sarah Chen</p>
                <p className="text-primary-200 text-sm">Marketing Director, TechFlow</p>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16 grid grid-cols-3 gap-8"
          >
            {[
              { value: '50K+', label: 'Articles Delivered' },
              { value: '3x', label: 'Avg Traffic Increase' },
              { value: '500+', label: 'Happy Teams' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl lg:text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-primary-200">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
