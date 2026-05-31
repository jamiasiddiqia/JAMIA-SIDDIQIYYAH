"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Shield, Award, Landmark } from "lucide-react";

interface FundAllocation {
  category: string;
  percentage: number;
  description: string;
  color: string;
}

export default function TransparencyDashboard() {
  const [activeTab, setActiveTab] = useState<"zakat" | "sadaqah" | "waqf">("zakat");

  const zakatAllocation: FundAllocation[] = [
    { category: "Seeker Scholarships", percentage: 65, description: "Tuition, books, and educational fees for eligible student scholars.", color: "bg-primary" },
    { category: "Hostel & Living Wings", percentage: 20, description: "Boarding, hot meals, utilities, and daily lodging support.", color: "bg-secondary" },
    { category: "Medical & Health Care", percentage: 10, description: "On-site clinic operations, medications, and general student welfare.", color: "bg-amber-700" },
    { category: "Administrative Overhead", percentage: 5, description: "Covered by dedicated donors, 0% deducted from public Zakat.", color: "bg-emerald-800" },
  ];

  const sadaqahAllocation: FundAllocation[] = [
    { category: "Campus Infrastructure", percentage: 50, description: "Expansion of classrooms, lecture halls, and digital campus networks.", color: "bg-primary" },
    { category: "Library & Manuscript Wing", percentage: 30, description: "Procurement, scanning, and preservation of ancient historical texts.", color: "bg-secondary" },
    { category: "Community Outreach", percentage: 15, description: "Local food distribution, public webinars, and regional workshops.", color: "bg-amber-700" },
    { category: "Admin & Operations", percentage: 5, description: "Utility bills and maintenance of campus grounds.", color: "bg-emerald-800" },
  ];

  const waqfAllocation: FundAllocation[] = [
    { category: "Real Estate Trust", percentage: 70, description: "Acquisition of sustainable agricultural and rental property assets.", color: "bg-primary" },
    { category: "Research Endowments", percentage: 20, description: "Sponsoring long-term academic works, translations, and publishing.", color: "bg-secondary" },
    { category: "Reserve Capital", percentage: 10, description: "Securing emergency funds for long-term institutional survival.", color: "bg-amber-700" },
  ];

  const currentAllocation = 
    activeTab === "zakat" 
      ? zakatAllocation 
      : activeTab === "sadaqah" 
      ? sadaqahAllocation 
      : waqfAllocation;

  return (
    <div className="bg-white rounded-2xl p-8 md:p-12 border border-primary/5 shadow-xl glass-card">
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        
        {/* Left Info Panel */}
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="flex items-center gap-2 text-secondary font-semibold text-xs tracking-widest uppercase">
            <Shield className="w-4 h-4" />
            Financial Credibility
          </div>
          <h4 className="font-display text-2xl md:text-3xl text-primary font-bold italic">
            Shariah Audited &amp; Fully Transparent
          </h4>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            Every dollar contributed to Jamia Siddiqiyyah is tracked and audited by an independent Shariah board. We guarantee a 100% donation policy where administrative costs are funded separately.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {(["zakat", "sadaqah", "waqf"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                  activeTab === tab
                    ? "bg-primary text-white shadow-md"
                    : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                {tab} allocation
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary/5">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-secondary shrink-0" />
              <div>
                <span className="block text-xs font-bold text-primary">0% Zakat Fees</span>
                <span className="text-[10px] text-on-surface-variant">Admin costs are separate</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Landmark className="w-5 h-5 text-secondary shrink-0" />
              <div>
                <span className="block text-xs font-bold text-primary">Shariah Compliant</span>
                <span className="text-[10px] text-on-surface-variant">Annual audit reports</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Chart Panel */}
        <div className="w-full lg:w-1/2 space-y-6">
          <h5 className="font-display text-lg text-primary font-semibold italic text-center lg:text-left">
            Current Fund Distribution
          </h5>

          <div className="space-y-4">
            {currentAllocation.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-primary">{item.category}</span>
                  <span className="font-semibold text-secondary font-display italic text-sm">{item.percentage}%</span>
                </div>
                
                {/* Visual Bar */}
                <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`h-full rounded-full ${item.color}`}
                  />
                </div>
                
                <p className="text-[10px] text-on-surface-variant/80 font-normal leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
