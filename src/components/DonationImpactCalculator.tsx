"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, GraduationCap, Heart, HelpCircle, ShieldCheck } from "lucide-react";

export default function DonationImpactCalculator() {
  const [amount, setAmount] = useState<number>(150);
  const [frequency, setFrequency] = useState<"monthly" | "one-time">("monthly");

  // Calculations based on pricing rules:
  // $50 = supports 1 student boarding and meals for 1 month
  // $100 = tuition and books for 1 student for 1 month
  // $150 = full scholarship (boarding + meals + tuition + medical) for 1 student for 1 month
  const calculateImpact = (val: number) => {
    const students = Math.floor(val / 150);
    const meals = Math.floor(val * 2);
    const books = Math.floor(val / 20);
    const hours = Math.floor(val * 1.5);
    return { students, meals, books, hours };
  };

  const impact = calculateImpact(amount);

  return (
    <div className="bg-white p-8 md:p-12 rounded-2xl border border-primary/5 shadow-xl glass-card">
      <div className="mb-8 text-center md:text-left">
        <span className="text-secondary font-semibold text-xs tracking-widest uppercase block mb-2">Calculator</span>
        <h4 className="font-display text-2xl md:text-3xl text-primary font-bold italic mb-4">Estimate Your Reward</h4>
        <p className="text-on-surface-variant text-sm leading-relaxed">
          See the direct physical and spiritual impact of your giving. Scroll the slider to adjust your contribution.
        </p>
      </div>

      {/* Frequency Toggle */}
      <div className="flex justify-center md:justify-start gap-4 mb-8">
        <button
          onClick={() => setFrequency("monthly")}
          className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
            frequency === "monthly"
              ? "bg-primary text-white shadow-md"
              : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
          }`}
        >
          Sponsor Monthly
        </button>
        <button
          onClick={() => setFrequency("one-time")}
          className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
            frequency === "one-time"
              ? "bg-primary text-white shadow-md"
              : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
          }`}
        >
          One-Time Gift
        </button>
      </div>

      {/* Slider & Presets */}
      <div className="space-y-6 mb-10">
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold text-on-surface-variant tracking-wider uppercase">Donation Amount</span>
          <span className="text-3xl font-display font-bold text-primary italic">
            ${amount}
            <span className="text-sm font-sans font-normal text-on-surface-variant">
              {frequency === "monthly" ? "/mo" : ""}
            </span>
          </span>
        </div>

        <input
          type="range"
          min="20"
          max="2000"
          step="10"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-primary"
        />

        <div className="grid grid-cols-5 gap-2">
          {[50, 150, 300, 500, 1000].map((preset) => (
            <button
              key={preset}
              onClick={() => setAmount(preset)}
              className={`py-2 text-xs font-bold rounded transition-all border ${
                amount === preset
                  ? "bg-secondary text-white border-secondary"
                  : "bg-transparent border-primary/10 text-primary hover:border-primary/30"
              }`}
            >
              ${preset}
            </button>
          ))}
        </div>
      </div>

      {/* Calculated Impact Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
          <GraduationCap className="w-5 h-5 text-secondary mb-2" />
          <span className="block text-2xl font-display font-bold text-primary italic">
            {impact.students > 0 ? `${impact.students} Student${impact.students > 1 ? "s" : ""}` : "1 Seeker (Partially)"}
          </span>
          <span className="text-[10px] text-on-surface-variant font-semibold tracking-wider uppercase block mt-1">
            Fully Funded Scholarships
          </span>
        </div>

        <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
          <BookOpen className="w-5 h-5 text-secondary mb-2" />
          <span className="block text-2xl font-display font-bold text-primary italic">{impact.books}</span>
          <span className="text-[10px] text-on-surface-variant font-semibold tracking-wider uppercase block mt-1">
            Academic Book Packs
          </span>
        </div>

        <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
          <Heart className="w-5 h-5 text-secondary mb-2" />
          <span className="block text-2xl font-display font-bold text-primary italic">{impact.meals}</span>
          <span className="text-[10px] text-on-surface-variant font-semibold tracking-wider uppercase block mt-1">
            Nutritious Daily Meals
          </span>
        </div>

        <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
          <ShieldCheck className="w-5 h-5 text-secondary mb-2" />
          <span className="block text-2xl font-display font-bold text-primary italic">{impact.hours} hrs</span>
          <span className="text-[10px] text-on-surface-variant font-semibold tracking-wider uppercase block mt-1">
            Active Study Hours
          </span>
        </div>
      </div>

      <button className="w-full bg-primary text-white py-4 rounded-lg font-bold hover:bg-opacity-90 active:scale-95 transition-all text-sm uppercase tracking-widest shadow-md">
        Execute Donation Plan
      </button>

      <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-on-surface-variant/60 font-semibold tracking-wider uppercase">
        <ShieldCheck className="w-4 h-4 text-secondary" />
        100% Tax Deductible &amp; Shariah Audited
      </div>
    </div>
  );
}
