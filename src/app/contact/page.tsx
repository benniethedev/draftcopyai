'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import {
  EnvelopeIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  CheckIcon,
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
              Let's <span className="gradient-text">talk</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
              Have questions? Want to see if we're a fit? Just curious how it 
              works? Reach out. No sales pressure, just a conversation.
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
              Ways to reach us
            </h2>
            <p className="text-slate-400 mb-8">
              We respond to every message. Usually within a few hours during 
              business hours, definitely within a day.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500/10 text-primary-400">
                  <EnvelopeIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Email</h3>
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
                  <h3 className="font-medium text-white">Book a call</h3>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-accent-400 transition-colors"
                  >
                    15 minutes, no strings attached
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
                    Mon–Fri, 9am–6pm Eastern
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ teaser */}
            <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="font-medium text-white mb-3">
                Common questions
              </h3>
              <p className="text-sm text-slate-400 mb-4">
                Most people want to know about pricing, turnaround times, and 
                how revisions work. We've got answers.
              </p>
              <Button href="/#faq" variant="outline" size="sm">
                Read the FAQ
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
                    <CheckIcon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Got it!
                  </h3>
                  <p className="text-slate-400">
                    We'll get back to you within 24 hours. Usually faster.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-slate-300 mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register('name', { required: 'We need your name' })}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                      placeholder="Jane Smith"
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
                      Work email
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register('email', {
                        required: 'We need your email to respond',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'That doesn\'t look like a valid email',
                        },
                      })}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                      placeholder="jane@company.com"
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
                      Company <span className="text-slate-500">(optional)</span>
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
                      What's on your mind?
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      {...register('message', { required: 'Tell us something' })}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 resize-none"
                      placeholder="Questions, ideas, what you're looking for..."
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
                    Your info stays with us. See our{' '}
                    <a href="#" className="text-primary-400 hover:underline">
                      privacy policy
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
