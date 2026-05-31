// src/components/OrgMarquee.tsx
"use client";

import React from "react";
import { organizations } from "@/data/mockData";

/**
 * Horizontal marquee showcasing partner logos and names.
 * Logos and names scroll continuously from left to right.
 */
export default function OrgMarquee() {
  // Duplicate the list to create a seamless loop
  const items = [...organizations, ...organizations, ...organizations];

  return (
    <div className="marquee-track flex items-center py-4">
      {items.map((org, idx) => (
        <div
          key={idx}
          className="inline-flex flex-col items-center mx-12 text-center"
          style={{ minWidth: "220px" }}
        >
          {/* Logo Card */}
          <div className="w-28 h-28 bg-white rounded-2xl flex items-center justify-center border border-primary/10 shadow-sm p-4 overflow-hidden mb-4 hover:scale-105 transition-transform duration-300">
            <img
              src={org.logo}
              alt={`${org.name} logo`}
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                // Fallback to simple SVG placeholder on error
                (e.target as HTMLElement).style.display = "none";
                const parent = (e.target as HTMLElement).parentElement;
                if (parent) {
                  const svg = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "svg"
                  );
                  svg.setAttribute("class", "w-10 h-10 text-primary/30");
                  svg.setAttribute("viewBox", "0 0 24 24");
                  svg.setAttribute("fill", "none");
                  svg.setAttribute("stroke", "currentColor");
                  svg.setAttribute("stroke-width", "1.2");
                  svg.innerHTML =
                    "<path d='M12 2a10 10 0 0110 10c0 5.5-4.5 10-10 10S2 17.5 2 12A10 10 0 0112 2z' />";
                  parent.appendChild(svg);
                }
              }}
            />
          </div>
          {/* Institution English Name */}
          <span className="block font-display font-extrabold text-primary text-sm tracking-wide mb-1 leading-snug">
            {org.name}
          </span>
          {/* Institution Arabic Name */}
          <span className="block font-serif font-bold text-secondary text-xs tracking-wide leading-relaxed" dir="rtl">
            {org.nameArabic}
          </span>
        </div>
      ))}
    </div>
  );
}
