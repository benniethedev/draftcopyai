'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import {
  EnvelopeIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import Section from '@/components/Section';
import Button from '@/components/Button';

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden gradient-bg pt-16 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Get in <span className="gradient-text">touch</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
              Ready to scale your content? Have questions? We&apos;d love to hear
              from you.
            </p>
          </motion.div>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Let&apos;s start a conversation
            </h2>
            <p className="text-slate-400 mb-8">
              Whether you&apos;re ready to get started or just want to learn more
              about how DraftCopyAI can help your business, we&apos;re here to help.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500/10 text-primary-400">
                  <EnvelopeIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Email us</h3>
                  <a
                    href="mailto:hello@draftcopyai.com"
                    className="text-slate-400 hover:text-accent-400 transition-colors"
                  >
                    hello@draftcopyai.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500/10 text-primary-400">
                  <CalendarIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Schedule a call</h3>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-accent-400 transition-colors"
                  >
                    Book a 15-min discovery call
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500/10 text-primary-400">
                  <ChatBubbleLeftRightIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Live chat</h3>
                  <p className="text-slate-400">
                    Available Monday-Friday, 9am-6pm EST
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ teaser */}
            <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="font-medium text-white mb-3">
                Frequently asked questions
              </h3>
              <p className="text-sm text-slate-400 mb-4">
                Find answers to common questions about our service, pricing, and
                process.
              </p>
              <Button href="/#faq" variant="outline" size="sm">
                View FAQ
              </Button>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent-500/10 text-accent-500 mb-4">
                    <svg
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Message sent!
                  </h3>
                  <p className="text-slate-400">
                    Thanks for reaching out. We&apos;ll get back to you within 24
                    hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-slate-300 mb-2"
                    >
                      Your name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register('name', { required: 'Name is required' })}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-300 mb-2"
                    >
                      Email address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                      placeholder="john@company.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-slate-300 mb-2"
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      {...register('company')}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                      placeholder="Acme Inc."
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-slate-300 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      {...register('message', { required: 'Message is required' })}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 resize-none"
                      placeholder="Tell us about your content needs..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>

                  <p className="text-xs text-slate-500 text-center">
                    By submitting this form, you agree to our{' '}
                    <a href="#" className="text-primary-400 hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
