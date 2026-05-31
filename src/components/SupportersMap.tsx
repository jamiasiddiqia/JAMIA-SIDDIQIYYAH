"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Users, Award } from "lucide-react";

interface SupportRegion {
  id: string;
  name: string;
  donors: string;
  students: number;
  funds: string;
  x: string; // SVG percentage x
  y: string; // SVG percentage y
}

const regions: SupportRegion[] = [
  { id: "na", name: "North America", donors: "1,240 Donors", students: 180, funds: "$340,000", x: "20%", y: "35%" },
  { id: "uk", name: "United Kingdom & EU", donors: "2,150 Donors", students: 310, funds: "$620,000", x: "47%", y: "30%" },
  { id: "me", name: "Middle East (KSA/UAE)", donors: "3,890 Donors", students: 490, funds: "$1.2M", x: "61%", y: "45%" },
  { id: "sa", name: "South Asia", donors: "5,400 Donors", students: 3200, funds: "$850,000", x: "72%", y: "52%" },
  { id: "af", name: "South Africa & East Africa", donors: "890 Donors", students: 120, funds: "$180,000", x: "55%", y: "70%" },
  { id: "au", name: "Australia & SE Asia", donors: "650 Donors", students: 75, funds: "$130,000", x: "85%", y: "72%" }
];

export default function SupportersMap() {
  const [activeRegion, setActiveRegion] = useState<SupportRegion | null>(null);

  return (
    <div className="bg-primary text-white rounded-2xl p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
      <div className="islamic-pattern absolute inset-0 opacity-5"></div>
      
      <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
        
        {/* Left Side: Stats and Info */}
        <div className="w-full lg:w-1/3 space-y-6">
          <div className="flex items-center gap-2 text-secondary-fixed font-semibold text-xs tracking-widest uppercase">
            <Globe className="w-4 h-4" />
            Global Reach
          </div>
          <h4 className="font-display text-2xl md:text-3xl text-white font-bold italic">
            Connecting Seekers &amp; Supporters Globally
          </h4>
          <p className="text-white/70 text-sm leading-relaxed">
            Our endowment (Waqf) and sponsorship network spans continents. Click or hover on the interactive map nodes to view support metrics.
          </p>

          {/* Interactive Info Panel */}
          <div className="h-44 flex items-center justify-center border border-white/10 bg-white/5 rounded-xl p-6 backdrop-blur-sm">
            <AnimatePresence mode="wait">
              {activeRegion ? (
                <motion.div
                  key={activeRegion.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="w-full space-y-3"
                >
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="font-display font-semibold italic text-secondary-fixed text-lg">
                      {activeRegion.name}
                    </span>
                    <span className="text-xs font-bold bg-white/15 px-2.5 py-0.5 rounded-full">
                      Active
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="block text-white/50 text-[9px] uppercase tracking-wider">Donors</span>
                      <span className="font-bold">{activeRegion.donors}</span>
                    </div>
                    <div>
                      <span className="block text-white/50 text-[9px] uppercase tracking-wider">Sponsorships</span>
                      <span className="font-bold">{activeRegion.students} Students</span>
                    </div>
                    <div className="col-span-2 pt-1">
                      <span className="block text-white/50 text-[9px] uppercase tracking-wider">Total Contributions</span>
                      <span className="font-bold text-secondary-fixed font-display text-base italic">{activeRegion.funds}</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-white/55 text-xs space-y-2"
                >
                  <Users className="w-8 h-8 mx-auto text-secondary-fixed opacity-70 animate-pulse" />
                  <p>Select any map indicator to view sponsorship distributions.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Map Container */}
        <div className="w-full lg:w-2/3 relative h-72 md:h-96 bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
          {/* Simple Vector Map Representation */}
          <svg
            className="w-full h-full opacity-35"
            viewBox="0 0 1000 500"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outline grids/lines representing a premium digital map */}
            <path d="M 0,250 L 1000,250" strokeDasharray="5,5" stroke="rgba(255,255,255,0.1)" />
            <path d="M 500,0 L 500,500" strokeDasharray="5,5" stroke="rgba(255,255,255,0.1)" />
            {/* Decorative concentric global circles */}
            <circle cx="500" cy="250" r="180" stroke="rgba(255,255,255,0.05)" />
            <circle cx="500" cy="250" r="100" stroke="rgba(255,255,255,0.05)" />
            
            {/* Simple abstract continent shapes for styling */}
            <path
              d="M 50 150 Q 150 100 250 150 T 350 200 T 200 350 Z"
              fill="rgba(255,255,255,0.02)"
              stroke="rgba(255,255,255,0.1)"
            />
            <path
              d="M 400 100 Q 500 50 600 120 T 700 250 T 650 380 T 550 400 Z"
              fill="rgba(255,255,255,0.02)"
              stroke="rgba(255,255,255,0.1)"
            />
            <path
              d="M 750 300 Q 800 250 900 350 T 800 450 Z"
              fill="rgba(255,255,255,0.02)"
              stroke="rgba(255,255,255,0.1)"
            />
          </svg>

          {/* Active Glowing Pins */}
          {regions.map((region) => (
            <div
              key={region.id}
              style={{ left: region.x, top: region.y }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
              onMouseEnter={() => setActiveRegion(region)}
              onClick={() => setActiveRegion(region)}
            >
              {/* Glowing Pulse */}
              <span className="absolute inline-flex h-6 w-6 rounded-full bg-secondary-fixed/30 animate-ping opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-secondary-fixed shadow-[0_0_8px_#ffe088] group-hover:scale-125 transition-all"></span>

              {/* Tooltip on Hover */}
              <div className="absolute left-1/2 bottom-full transform -translate-x-1/2 mb-2 bg-primary/95 border border-white/10 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                {region.name}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
