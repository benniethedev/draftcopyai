'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import {
  Mail,
  Calendar,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  Send,
} from 'lucide-react';
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
      <section className="relative overflow-hidden bg-slate-50 grain pt-16 pb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100/30 via-transparent to-accent-100/20" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary-900">
              Let's <span className="text-accent-500">talk</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-secondary-500 leading-relaxed">
              Have questions? Want to see if we're a fit? Just curious how it 
              works? Reach out. No sales pressure, just a conversation.
            </p>
          </motion.div>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-primary-900 mb-6">
              Ways to reach us
            </h2>
            <p className="text-secondary-500 mb-10 leading-relaxed">
              We respond to every message. Usually within a few hours during 
              business hours, definitely within a day.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-900/5 text-primary-900">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-900 mb-1">Email</h3>
                  <a
                    href="mailto:hello@draftcopyai.com"
                    className="text-secondary-500 hover:text-accent-600 transition-colors"
                  >
                    hello@draftcopyai.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-900/5 text-primary-900">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-900 mb-1">Book a call</h3>
                  <a
                    href="#"
                    className="text-secondary-500 hover:text-accent-600 transition-colors"
                  >
                    15 minutes, no strings attached
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-900/5 text-primary-900">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-900 mb-1">Live chat</h3>
                  <p className="text-secondary-500">
                    Mon-Fri, 9am-6pm Eastern
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ teaser */}
            <div className="mt-12 bg-slate-50 rounded-3xl border border-slate-200/60 p-8">
              <h3 className="font-semibold text-primary-900 mb-3">
                Common questions
              </h3>
              <p className="text-sm text-secondary-500 mb-5 leading-relaxed">
                Most people want to know about pricing, turnaround times, and 
                how revisions work. We've got answers.
              </p>
              <Button href="/#faq" variant="outline" size="sm">
                Read the FAQ
                <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-3xl border border-slate-200/60 p-8 md:p-10 shadow-md">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-accent-100 text-accent-600 mb-6">
                    <CheckCircle className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-semibold text-primary-900 mb-3">
                    Got it!
                  </h3>
                  <p className="text-secondary-500">
                    We'll get back to you within 24 hours. Usually faster.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-primary-900 mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register('name', { required: 'We need your name' })}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-primary-900 placeholder-slate-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                      placeholder="Jane Smith"
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-primary-900 mb-2"
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
                          message: "That doesn't look like a valid email",
                        },
                      })}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-primary-900 placeholder-slate-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                      placeholder="jane@company.com"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-primary-900 mb-2"
                    >
                      Company <span className="text-secondary-500 font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      {...register('company')}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-primary-900 placeholder-slate-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                      placeholder="Acme Inc."
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-primary-900 mb-2"
                    >
                      What's on your mind?
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      {...register('message', { required: 'Tell us something' })}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-primary-900 placeholder-slate-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20 resize-none"
                      placeholder="Questions, ideas, what you're looking for..."
                    />
                    {errors.message && (
                      <p className="mt-2 text-sm text-red-500">
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
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-secondary-500 text-center pt-2">
                    Your info stays with us. See our{' '}
                    <a href="#" className="text-accent-600 hover:underline">
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
