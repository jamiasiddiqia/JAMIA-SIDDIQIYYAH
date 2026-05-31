// src/components/OrganizationMarquee.tsx
"use client";
import React from "react";
import { organizations } from "@/data/mockData";

/**
 * Horizontal marquee showcasing partner logos and names.
 * Logos and names scroll continuously from left to right.
 */
export default function OrganizationMarquee() {
  return (
    <section className="relative py-12 bg-surface-container-low overflow-hidden">
      <div className="marquee overflow-hidden whitespace-nowrap">
        <div className="marquee-track inline-flex items-center gap-8">
          {organizations.concat(organizations).map((org, idx) => (
            <div key={idx} className="flex flex-col items-center min-w-[120px]">
              <img src={org.logo} alt={org.name} className="w-24 h-24 object-contain mb-2" />
              <span className="text-base font-display text-primary transition-colors hover:text-secondary-fixed">
                {org.name}
              </span>
              <span className="text-sm text-on-surface-variant/70" dir="rtl">
                {org.nameArabic}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
