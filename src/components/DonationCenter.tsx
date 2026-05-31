"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Sparkles, CreditCard, Landmark, Wallet, DollarSign } from "lucide-react";

export default function DonationCenter() {
  const [category, setCategory] = useState<"zakat" | "sadaqah" | "campus">("sadaqah");
  const [customAmount, setCustomAmount] = useState<string>("100");
  const [selectedMethod, setSelectedMethod] = useState<"card" | "bank" | "paypal">("card");
  const [success, setSuccess] = useState(false);

  const presets = [50, 100, 250, 500, 1000];

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  };

  return (
    <div className="bg-white rounded-2xl p-8 md:p-12 border border-primary/5 shadow-2xl glass-card max-w-xl mx-auto">
      
      {/* Category Tabs */}
      <div className="grid grid-cols-3 gap-2 mb-8 bg-surface-container-low p-1.5 rounded-xl border border-primary/5">
        {(["zakat", "sadaqah", "campus"] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              category === cat
                ? "bg-primary text-white shadow-md"
                : "text-on-surface-variant hover:text-primary hover:bg-white/50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {success ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12 space-y-4"
        >
          <div className="w-16 h-16 bg-primary/5 border border-primary/10 rounded-full flex items-center justify-center mx-auto text-secondary">
            <Sparkles className="w-8 h-8" />
          </div>
          <h5 className="font-display text-2xl font-bold text-primary italic">Barakallah Feekum</h5>
          <p className="text-on-surface-variant text-sm leading-relaxed max-w-sm mx-auto">
            May Allah bless your wealth and purify your actions. Your mock donation of ${customAmount} has been registered successfully on this frontend preview.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="text-xs font-semibold uppercase tracking-wider text-secondary hover:text-primary mt-4"
          >
            Reset Mock Transaction
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleDonate} className="space-y-6">
          
          {/* Presets */}
          <div className="space-y-3">
            <label className="block text-[10px] font-semibold text-on-surface-variant tracking-widest uppercase">
              Select Amount
            </label>
            <div className="grid grid-cols-5 gap-2">
              {presets.map((preset) => (
                <button
                  type="button"
                  key={preset}
                  onClick={() => setCustomAmount(preset.toString())}
                  className={`py-3 rounded-lg text-xs font-bold transition-all border ${
                    customAmount === preset.toString()
                      ? "bg-primary border-primary text-white shadow-sm"
                      : "bg-transparent border-primary/15 text-primary hover:border-primary/40"
                  }`}
                >
                  ${preset}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-primary/40 font-bold">
              <DollarSign className="w-4 h-4" />
            </div>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="Enter Custom Amount"
              className="w-full bg-surface-container-low border border-primary/10 rounded-xl py-4 pl-10 pr-4 text-on-surface font-semibold text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              required
            />
          </div>

          {/* Payment Method */}
          <div className="space-y-3">
            <label className="block text-[10px] font-semibold text-on-surface-variant tracking-widest uppercase">
              Payment Method
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedMethod("card")}
                className={`py-3.5 rounded-lg text-xs font-bold flex flex-col items-center gap-1.5 border transition-all ${
                  selectedMethod === "card"
                    ? "bg-secondary/5 border-secondary text-secondary"
                    : "border-primary/10 text-on-surface-variant hover:border-primary/30"
                }`}
              >
                <CreditCard className="w-4 h-4" />
                Card
              </button>
              <button
                type="button"
                onClick={() => setSelectedMethod("bank")}
                className={`py-3.5 rounded-lg text-xs font-bold flex flex-col items-center gap-1.5 border transition-all ${
                  selectedMethod === "bank"
                    ? "bg-secondary/5 border-secondary text-secondary"
                    : "border-primary/10 text-on-surface-variant hover:border-primary/30"
                }`}
              >
                <Landmark className="w-4 h-4" />
                Bank Transfer
              </button>
              <button
                type="button"
                onClick={() => setSelectedMethod("paypal")}
                className={`py-3.5 rounded-lg text-xs font-bold flex flex-col items-center gap-1.5 border transition-all ${
                  selectedMethod === "paypal"
                    ? "bg-secondary/5 border-secondary text-secondary"
                    : "border-primary/10 text-on-surface-variant hover:border-primary/30"
                }`}
              >
                <Wallet className="w-4 h-4" />
                E-Wallet
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-[9px] font-bold text-on-surface-variant tracking-widest uppercase">Donor Name</label>
              <input
                type="text"
                placeholder="Abdur Rahman"
                className="w-full bg-surface-container-low border border-primary/10 rounded-lg p-3 text-xs outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[9px] font-bold text-on-surface-variant tracking-widest uppercase">Email Address</label>
              <input
                type="email"
                placeholder="rahman@example.com"
                className="w-full bg-surface-container-low border border-primary/10 rounded-lg p-3 text-xs outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-opacity-95 active:scale-[0.98] transition-all text-sm uppercase tracking-widest shadow-md flex items-center justify-center gap-2"
          >
            <span>Complete My ${customAmount} {category} Gift</span>
          </button>

          <div className="flex items-center justify-center gap-2 text-[9px] text-on-surface-variant/50 font-semibold tracking-wider uppercase">
            <Shield className="w-3.5 h-3.5 text-secondary" />
            Secure Encrypted Session
          </div>

        </form>
      )}
    </div>
  );
}
