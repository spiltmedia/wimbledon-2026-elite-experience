import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TestimonialCarousel({ testimonials }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <div className="relative bg-slate-900/50 rounded-2xl p-8 md:p-12 border border-slate-700">
      <Quote className="w-12 h-12 text-[#dc2626]/20 absolute top-6 left-6" />
      
      <div className="relative min-h-[200px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            {/* Rating Stars */}
            <div className="flex gap-1 mb-4 justify-center">
              {Array.from({ length: current.rating || 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" />
              ))}
            </div>

            {/* Quote */}
            <p className="text-xl md:text-2xl text-white leading-relaxed mb-6 text-center italic">
              "{current.quote}"
            </p>

            {/* Author Info */}
            <div className="text-center">
              <p className="text-gray-300 font-semibold text-lg">
                {current.customer_name}
              </p>
              {current.origin_city && (
                <p className="text-gray-500 text-sm">
                  {current.origin_city}
                </p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      {testimonials.length > 1 && (
        <>
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-[#dc2626]'
                    : 'w-2 bg-slate-600 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:bg-slate-800"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-slate-800"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </>
      )}
    </div>
  );
}