"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { quotes } from "@/data/mockData";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";

export default function QuranInspiration() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % quotes.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % quotes.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  return (
    <section className="py-24 bg-background-warm relative overflow-hidden">
      <div className="islamic-pattern absolute inset-0"></div>
      
      <div className="max-w-[1000px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <BookOpen className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="font-display text-3xl md:text-4xl text-primary italic font-bold">
            Foundation of the Legacy
          </h2>
          <div className="diamond-divider w-32 mx-auto mt-4"></div>
        </div>

        {/* Carousel Window */}
        <div className="relative min-h-[360px] md:min-h-[280px] bg-white border border-primary/5 rounded-2xl p-8 md:p-14 shadow-xl glass-card flex flex-col justify-between">
          
          {/* Watermark */}
          <div className="absolute top-4 right-6 opacity-[0.03] font-serif text-[120px] select-none pointer-events-none text-primary">
            ﷽
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Arabic Verse */}
              <p
                className="text-right font-display text-2xl md:text-3xl text-primary font-bold leading-relaxed italic"
                dir="rtl"
              >
                {quotes[current].arabic}
              </p>

              {/* Translations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-primary/5">
                <div className="border-l-2 border-secondary/20 pl-4">
                  <span className="block text-[9px] font-bold text-secondary uppercase tracking-wider mb-1">English</span>
                  <p className="text-on-surface-variant text-sm md:text-base italic leading-relaxed">
                    "{quotes[current].english}"
                  </p>
                </div>
                <div className="border-l-2 border-secondary/20 pl-4 md:text-right md:border-l-0 md:border-r-2 md:pr-4 md:pl-0">
                  <span className="block text-[9px] font-bold text-secondary uppercase tracking-wider mb-1">Urdu</span>
                  <p className="text-on-surface-variant text-sm md:text-base font-normal leading-relaxed italic" dir="rtl">
                    "{quotes[current].urdu}"
                  </p>
                </div>
              </div>

              {/* Source Cite */}
              <div className="text-left pt-2">
                <span className="font-sans font-semibold text-[10px] text-primary/60 tracking-widest uppercase">
                  {quotes[current].source}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-8 pt-4 border-t border-primary/5">
            <div className="flex gap-2">
              {quotes.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    current === idx ? "bg-primary w-6" : "bg-primary/20"
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="p-2 rounded-lg border border-primary/10 hover:bg-primary/5 text-primary transition-all active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-lg border border-primary/10 hover:bg-primary/5 text-primary transition-all active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
