'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { Testimonial } from '@/data/testimonials';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  layout?: 'grid' | 'carousel';
  showRating?: boolean;
}

function TestimonialItem({
  testimonial,
  showRating = true,
  delay = 0,
}: {
  testimonial: Testimonial;
  showRating?: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-3xl border border-slate-200/60 p-8 shadow-md transition-all duration-300 hover:shadow-lg h-full flex flex-col"
    >
      {showRating && testimonial.rating && (
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < testimonial.rating!
                  ? 'fill-accent-400 text-accent-400'
                  : 'fill-slate-200 text-slate-200'
              }`}
            />
          ))}
        </div>
      )}
      <div className="relative mb-6 flex-grow">
        <Quote className="absolute -top-2 -left-1 h-8 w-8 text-slate-100" />
        <blockquote className="relative text-secondary-600 leading-relaxed pl-4">
          {testimonial.quote}
        </blockquote>
      </div>
      <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
        {testimonial.image ? (
          <img
            src={testimonial.image}
            alt={testimonial.author}
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-primary-900/10 flex items-center justify-center text-primary-900 font-semibold">
            {testimonial.author
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>
        )}
        <div>
          <div className="font-semibold text-primary-900">{testimonial.author}</div>
          <div className="text-sm text-secondary-500">
            {testimonial.role}, {testimonial.company}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CarouselTestimonials({
  testimonials,
  showRating,
}: {
  testimonials: Testimonial[];
  showRating: boolean;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-3xl border border-slate-200/60 p-8 md:p-12 shadow-md">
              {showRating && testimonials[currentIndex].rating && (
                <div className="flex gap-1 mb-6 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonials[currentIndex].rating!
                          ? 'fill-accent-400 text-accent-400'
                          : 'fill-slate-200 text-slate-200'
                      }`}
                    />
                  ))}
                </div>
              )}
              <div className="relative text-center mb-8">
                <Quote className="absolute -top-4 left-0 h-12 w-12 text-slate-100" />
                <blockquote className="relative text-xl md:text-2xl text-secondary-700 leading-relaxed font-medium">
                  &ldquo;{testimonials[currentIndex].quote}&rdquo;
                </blockquote>
              </div>
              <div className="flex items-center justify-center gap-4">
                {testimonials[currentIndex].image ? (
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].author}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-14 w-14 rounded-full bg-primary-900/10 flex items-center justify-center text-primary-900 font-semibold text-lg">
                    {testimonials[currentIndex].author
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                )}
                <div className="text-left">
                  <div className="font-semibold text-primary-900 text-lg">
                    {testimonials[currentIndex].author}
                  </div>
                  <div className="text-secondary-500">
                    {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={prev}
          className="h-10 w-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-secondary-500 hover:bg-slate-50 hover:text-primary-900 transition-colors"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all ${
                idx === currentIndex
                  ? 'w-8 bg-accent-500'
                  : 'w-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="h-10 w-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-secondary-500 hover:bg-slate-50 hover:text-primary-900 transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export default function TestimonialsSection({
  testimonials,
  layout = 'grid',
  showRating = true,
}: TestimonialsSectionProps) {
  if (layout === 'carousel') {
    return <CarouselTestimonials testimonials={testimonials} showRating={showRating} />;
  }

  // Grid layout
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((testimonial, index) => (
        <TestimonialItem
          key={testimonial.id}
          testimonial={testimonial}
          showRating={showRating}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
}
