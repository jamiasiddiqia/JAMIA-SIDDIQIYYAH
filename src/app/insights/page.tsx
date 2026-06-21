import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import InsightsClient from "./InsightsClient";

const BASE_URL = "https://jamiasiddiqiyyah.eu.cc";

// ── SEO Metadata ──────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Islamic Insights | Quranic Tafsir, Hadith Studies & Islamic Learning",
  description:
    "Discover rich and authentic Islamic articles, video lectures, and guidance from Jamia Siddiqiyyah. Read about Tafsir, Hadith validation, Islamic history, and lifestyle practices.",
  keywords: [
    "Islamic Insights",
    "Jamia Siddiqiyyah articles",
    "Islamic learning online",
    "Quran Tafsir",
    "Hadith studies lectures",
    "Islamic History blog",
    "Islamic lifestyle guidance",
    "Wifaq ul Madaris education"
  ],
  alternates: {
    canonical: `${BASE_URL}/insights`
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${BASE_URL}/insights`,
    siteName: "Jamia Siddiqiyyah",
    title: "Islamic Insights | Classical Quran & Hadith Learning",
    description:
      "A centralized knowledge hub for authentic Islamic research, lectures, and updates from the scholars of Jamia Siddiqiyyah.",
    images: [
      {
        url: `${BASE_URL}/logo.png`,
        width: 1200,
        height: 630,
        alt: "Islamic Insights – Jamia Siddiqiyyah"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Islamic Insights | Classical Islamic Learning",
    description:
      "Articles, video lessons, and theological research compiled by the faculty of Jamia Siddiqiyyah.",
    images: [`${BASE_URL}/logo.png`]
  }
};

// ── JSON-LD Structured Data Schema ───────────────────────────────────────
const insightsPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${BASE_URL}/insights#webpage`,
      name: "Islamic Insights – Jamia Siddiqiyyah Knowledge Hub",
      description:
        "Centralized repository of articles, video lectures, and publications from the senior scholars of Jamia Siddiqiyyah.",
      url: `${BASE_URL}/insights`,
      isPartOf: { "@id": `${BASE_URL}/#website` },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Islamic Insights", item: `${BASE_URL}/insights` }
        ]
      }
    }
  ]
};

// Force dynamic execution so that new posts show up instantly without rebuild
export const revalidate = 0;

export default async function InsightsPage() {
  // Fetch posts from Supabase on the server
  const { data: rawPosts } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });

  // Filter posts on the server side to protect drafts and future-scheduled posts from being delivered or indexed
  const now = new Date();
  const publishedPosts = (rawPosts || []).filter((post) => {
    try {
      const decoded = JSON.parse(post.content);
      const isPublished = decoded.status === "published";
      const isPastOrPresent = new Date(decoded.published_at) <= now;
      return isPublished && isPastOrPresent;
    } catch (e) {
      // Fallback: If content is not JSON (legacy support), consider it published
      return true;
    }
  });

  return (
    <>
      {/* Dynamic JSON-LD schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(insightsPageSchema) }}
      />

      <div className="min-h-screen bg-background-warm">
        {/* ── Fixed Top Navbar ─────────────────────────────────── */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-primary/5 shadow-sm h-20 transition-all">
          <div className="flex justify-between items-center w-full px-6 md:px-20 max-w-7xl mx-auto h-full">
            <Link 
              href="/" 
              className="font-display text-lg md:text-xl font-semibold tracking-[0.2em] text-primary uppercase cursor-pointer"
            >
              Jamia Siddiqiyyah
            </Link>

            <div className="flex items-center gap-4">
              <Link 
                href="/" 
                className="text-on-surface-variant hover:text-primary transition-colors text-xs uppercase tracking-widest font-semibold"
              >
                ← Return Home
              </Link>
            </div>
          </div>
        </nav>

        {/* ── Breadcrumbs Navigation ─────────────────────────── */}
        <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-6 md:px-20 pt-28 pb-4">
          <ol className="flex items-center gap-2 text-xs text-on-surface-variant">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li className="text-primary/30">›</li>
            <li aria-current="page" className="text-primary font-semibold">
              Islamic Insights
            </li>
          </ol>
        </nav>

        {/* ── Page Hero Header ───────────────────────────────── */}
        <header className="py-12 bg-background-warm relative overflow-hidden">
          <div className="islamic-pattern absolute inset-0 opacity-[0.05] pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10 text-center md:text-left">
            <div className="max-w-3xl space-y-4">
              <span className="text-secondary font-bold text-xs tracking-[0.2em] uppercase block">
                Sanctuary Knowledge &amp; Updates
              </span>
              <h1 className="font-display text-4xl md:text-5xl text-primary italic font-bold leading-tight">
                Islamic Insights
              </h1>
              <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
                Welcome to our centralized knowledge hub. Delve into academic research, classical Quranic exegesis (Tafsir), Hadith sciences validation, and historical lectures curated by our senior faculty deans.
              </p>
            </div>
            <div className="diamond-divider w-full mt-10"></div>
          </div>
        </header>

        {/* ── Main Interactive Section ──────────────────────── */}
        <main className="max-w-7xl mx-auto px-6 md:px-20 pb-24 relative z-10">
          <InsightsClient initialPosts={publishedPosts} />
        </main>
      </div>
    </>
  );
}
