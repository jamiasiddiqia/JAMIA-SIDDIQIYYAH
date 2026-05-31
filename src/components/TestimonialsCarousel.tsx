// src/components/TestimonialsCarousel.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Testimonial } from "@/data/mockData";
import { testimonials } from "@/data/mockData";

/**
 * A lightweight carousel that showcases donor testimonials.
 * It automatically cycles every 7 seconds and also allows manual navigation.
 */
export default function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);

  // Auto‑advance the carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  const next = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[index];

  return (
    <section className="relative py-20 bg-surface-container-low">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <h2 className="text-center font-display text-3xl md:text-4xl text-primary italic mb-8">
          Voices of our Community
        </h2>
        <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-xl p-8 shadow-lg">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center"
            >
              <p className="text-lg md:text-xl text-on-surface-variant italic mb-6">
                “{current.quote}”
              </p>
              <footer className="text-sm text-primary font-semibold">
                — {current.author}, {current.role}, {current.location}
              </footer>
            </motion.blockquote>
          </AnimatePresence>
          {/* Navigation arrows */}
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary/10 text-primary rounded-full w-10 h-10 flex items-center justify-center hover:bg-primary/20 transition"
          >
            ←
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary/10 text-primary rounded-full w-10 h-10 flex items-center justify-center hover:bg-primary/20 transition"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
