import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

// ── Fonts ────────────────────────────────────────────────────────────────
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
});

// ── Site-wide constants ───────────────────────────────────────────────────
const BASE_URL = "https://jamiasiddiqiyyah.eu.cc";
const SITE_NAME = "Jamia Siddiqiyyah";

// ── Root Metadata ─────────────────────────────────────────────────────────
export const metadata: Metadata = {
  // ── Titles ──────────────────────────────────────────────────────────────
  title: {
    default:
      "Jamia Siddiqiyyah | Islamic University, Online Madrasa & Islamic Charity",
    template: `%s | ${SITE_NAME}`,
  },

  // ── Description ─────────────────────────────────────────────────────────
  description:
    "Jamia Siddiqiyyah is a premier Islamic educational institute, online madrasa, Quran academy, and Islamic charity platform. Offering Hifz, Dars-e-Nizami (Alim Program), Tajweed, Arabic Calligraphy, and Ifta specialization. Donate Zakat, Sadaqah, and sponsor Islamic scholarship students.",

  // ── Keywords (used by schema, AI crawlers, and some directories) ─────────
  keywords: [
    "Jamia Siddiqiyyah",
    "Jamia Siddiqia",
    "Jamia Siddiqiyyah Institute",
    "Jamia Siddiqiyyah Online",
    "Jamia Siddiqiyyah Pakistan",
    "Islamic Institute",
    "Islamic Education",
    "Islamic Courses",
    "Online Islamic Courses",
    "Learn Quran Online",
    "Quran Classes",
    "Quran Academy",
    "Islamic Foundation",
    "Islamic Charity",
    "Donate Zakat",
    "Donate Sadaqah",
    "Islamic Donations",
    "Islamic School",
    "Online Madrasa",
    "Islamic Academy",
    "Dars e Nizami Online",
    "Islamic Research Institute",
    "Hifz Program",
    "Tajweed Online",
    "Arabic Classes Online",
    "Islamic Scholarship",
    "Wifaq ul Madaris",
    "Alim Course",
    "Ifta Specialization",
    "Mufti Course",
  ],

  // ── Authors & Publisher ──────────────────────────────────────────────────
  authors: [{ name: "Jamia Siddiqiyyah", url: BASE_URL }],
  creator: "Jamia Siddiqiyyah",
  publisher: "Jamia Siddiqiyyah",

  // ── Canonical ───────────────────────────────────────────────────────────
  alternates: {
    canonical: BASE_URL,
  },

  // ── Robots ──────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Open Graph ───────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: SITE_NAME,
    title:
      "Jamia Siddiqiyyah | Islamic University, Online Madrasa & Islamic Charity",
    description:
      "A world-class Islamic educational institute offering Hifz, Dars-e-Nizami, Tajweed, Arabic, and Ifta programs. Plus a global Islamic charity platform for Zakat, Sadaqah, and student sponsorship.",
    images: [
      {
        url: `${BASE_URL}/logo.png`,
        width: 1200,
        height: 630,
        alt: "Jamia Siddiqiyyah – Islamic University & Charity",
        type: "image/png",
      },
    ],
  },

  // ── Twitter / X Card ────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title:
      "Jamia Siddiqiyyah | Islamic University, Online Madrasa & Islamic Charity",
    description:
      "Premier Islamic educational institute offering Hifz, Alim Program, Tajweed, Arabic and Ifta courses. Donate Zakat, Sadaqah, sponsor scholars.",
    images: [`${BASE_URL}/logo.png`],
    site: "@JamiaSiddiqiyyah",
    creator: "@JamiaSiddiqiyyah",
  },

  // ── Verification ─────────────────────────────────────────────────────────
  // verification: {
  //   google: "YOUR_GOOGLE_SEARCH_CONSOLE_CODE",
  //   yandex: "YOUR_YANDEX_CODE",
  //   bing: "YOUR_BING_CODE",
  // },

  // ── Icons ────────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/icon.png",
  },

  // ── Manifest ─────────────────────────────────────────────────────────────
  manifest: `${BASE_URL}/manifest.webmanifest`,

  // ── Category ─────────────────────────────────────────────────────────────
  category: "education",
};

// ── JSON-LD Structured Data ───────────────────────────────────────────────
const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. Educational Organization
    {
      "@type": ["EducationalOrganization", "NGO", "Organization"],
      "@id": `${BASE_URL}/#organization`,
      name: "Jamia Siddiqiyyah",
      alternateName: [
        "Jamia Siddiqia",
        "جامعہ صدیقیہ",
        "Jamia Siddiqiyyah Institute",
      ],
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
        width: 512,
        height: 512,
      },
      image: `${BASE_URL}/logo.png`,
      description:
        "Jamia Siddiqiyyah is a premier Islamic educational institute, online madrasa, Quran academy and Islamic charity platform founded in 1994. Offering Hifz, Dars-e-Nizami (Alim Program), Tajweed, Arabic Calligraphy, and Ifta specialization programs along with Zakat, Sadaqah, and Waqf-based charitable initiatives.",
      foundingDate: "1994",
      numberOfEmployees: {
        "@type": "QuantitativeValue",
        value: 78,
      },
      slogan:
        "Upholding the Unbroken Legacy of Knowledge & Spiritual Excellence",
      mission:
        "To maintain a pure environment where seekers of sacred sciences can access traditional mentorship and become leaders of spiritual guidance.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "123 Scholarly Road, Heritage District",
        addressLocality: "Madinah",
        addressCountry: "SA",
        addressRegion: "Madinah Region",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+966-12-345-6789",
          contactType: "admissions",
          availableLanguage: ["Arabic", "Urdu"],
          areaServed: "Worldwide",
        },
        {
          "@type": "ContactPoint",
          telephone: "+44-20-7123-4567",
          contactType: "customer service",
          availableLanguage: "English",
          areaServed: "Worldwide",
        },
        {
          "@type": "ContactPoint",
          email: "legacy@jamiasiddiqiyyah.org",
          contactType: "general inquiries",
          availableLanguage: ["English", "Arabic", "Urdu"],
        },
      ],
      sameAs: [
        "https://www.facebook.com/JamiaSiddiqiyyah",
        "https://www.instagram.com/JamiaSiddiqiyyah",
        "https://www.youtube.com/@JamiaSiddiqiyyah",
        "https://x.com/JamiaSiddiqiyyah",
      ],
      knowsAbout: [
        "Islamic Education",
        "Quran Memorization",
        "Tajweed",
        "Hadith Studies",
        "Islamic Jurisprudence",
        "Arabic Language",
        "Dars-e-Nizami",
        "Islamic Research",
        "Zakat",
        "Sadaqah",
        "Islamic Charity",
      ],
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "degree",
          name: "Dars-e-Nizami (Alim Degree)",
          recognizedBy: {
            "@type": "Organization",
            name: "Wifaq ul Madaris Al-Arabia",
          },
        },
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "degree",
          name: "Ifta Specialization (Mufti Degree)",
          recognizedBy: {
            "@type": "Organization",
            name: "Al-Azhar University",
          },
        },
      ],
    },

    // 2. Website Entity
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Jamia Siddiqiyyah",
      description:
        "Official website of Jamia Siddiqiyyah — Islamic university, online madrasa, Quran academy, and global Islamic charity platform.",
      publisher: { "@id": `${BASE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_URL}/?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
      inLanguage: "en-US",
    },

    // 3. Courses
    {
      "@type": "Course",
      "@id": `${BASE_URL}/programs#hifz`,
      name: "Hifz al-Quran Program",
      description:
        "Rigorous 3-year program for memorizing the complete Holy Quran with flawless Tajweed, Makharij, and basic Quranic Arabic understanding.",
      provider: { "@id": `${BASE_URL}/#organization` },
      courseCode: "HIFZ-001",
      timeRequired: "P3Y",
      educationalLevel: "Intermediate",
      inLanguage: ["Arabic", "Urdu", "English"],
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Scholarship available for qualifying students",
      },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: ["onsite", "online"],
        courseSchedule: {
          "@type": "Schedule",
          repeatFrequency: "daily",
        },
      },
    },
    {
      "@type": "Course",
      "@id": `${BASE_URL}/programs#dars-e-nizami`,
      name: "Dars-e-Nizami – Alim Program",
      description:
        "Our flagship 8-year comprehensive Islamic scholar curriculum covering Arabic grammar, logic, jurisprudence (Fiqh), Tafsir (Quran exegesis), and Hadith studies leading to the Alim degree.",
      provider: { "@id": `${BASE_URL}/#organization` },
      courseCode: "DNZ-001",
      timeRequired: "P8Y",
      educationalLevel: "Advanced",
      inLanguage: ["Arabic", "Urdu", "English"],
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description:
          "Over 85% of students receive full scholarships funded by Zakat donations",
      },
    },
    {
      "@type": "Course",
      "@id": `${BASE_URL}/programs#arabic-calligraphy`,
      name: "Arabic Arts & Calligraphy",
      description:
        "A 2-year deep study of traditional Arabic literature, linguistic history, and the sacred geometry of classical Islamic calligraphy including Thuluth and Naskh scripts.",
      provider: { "@id": `${BASE_URL}/#organization` },
      courseCode: "ART-001",
      timeRequired: "P2Y",
      educationalLevel: "Intermediate",
    },
    {
      "@type": "Course",
      "@id": `${BASE_URL}/programs#ifta`,
      name: "Ifta Specialization (Postgraduate Mufti Program)",
      description:
        "Advanced 2-year post-graduate research program for producing qualified Islamic jurists (Muftis) capable of issuing legal opinions (Fatawa) on contemporary and classical issues.",
      provider: { "@id": `${BASE_URL}/#organization` },
      courseCode: "IFTA-001",
      timeRequired: "P2Y",
      educationalLevel: "PostGraduate",
      educationalCredentialAwarded: "Mufti Degree",
    },

    // 4. Persons (Scholars)
    {
      "@type": "Person",
      "@id": `${BASE_URL}/scholars#habibur-rehman`,
      name: "Maulana Habibur Rehman",
      jobTitle: "Founder & Patron-in-Chief",
      worksFor: { "@id": `${BASE_URL}/#organization` },
      description:
        "The visionary founder and owner of Jamia Siddiqiyyah. Over three decades of steering the institution towards spiritual excellence, authentic transmission of sacred knowledge, and global community service.",
      image: `${BASE_URL}/scholars/habib.png`,
      knowsAbout: [
        "Islamic Education",
        "Sacred Knowledge",
        "Spiritual Leadership",
        "Islamic Administration",
      ],
    },
    {
      "@type": "Person",
      "@id": `${BASE_URL}/scholars#fazal-ur-rehman`,
      name: "Mufti Fazal ur Rehman",
      jobTitle: "Nazim-e-Aala (Director General)",
      honorificPrefix: "Mufti",
      worksFor: { "@id": `${BASE_URL}/#organization` },
      description:
        "A highly respected jurist and the Nazim-e-Aala of Jamia Siddiqiyyah, directing the traditional Dars-e-Nizami curriculum, educational standards, and spiritual Tazkiyah programs.",
      image: `${BASE_URL}/scholars/fazal.png`,
      knowsAbout: [
        "Islamic Jurisprudence",
        "Fiqh",
        "Hadith",
        "Dars-e-Nizami",
        "Islamic Administration",
      ],
    },

    // 5. FAQ Page
    {
      "@type": "FAQPage",
      "@id": `${BASE_URL}/#faqs`,
      mainEntity: [
        {
          "@type": "Question",
          name: "What are the admission requirements for international students at Jamia Siddiqiyyah?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "International students must present proof of secondary school completion, a character recommendation from an accredited local Islamic authority, and pass an online basic Arabic proficiency interview.",
          },
        },
        {
          "@type": "Question",
          name: "How is the Sponsor a Student program managed at Jamia Siddiqiyyah?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "100% of student sponsorship goes directly toward tuition, boarding in residential wings, healthy daily meals, academic books, and basic healthcare. Donors receive bi-annual updates on their sponsored student's academic progress.",
          },
        },
        {
          "@type": "Question",
          name: "Is Jamia Siddiqiyyah accredited globally?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The Dars-e-Nizami and Advanced Ifta degrees are recognized by major Islamic universities worldwide, including partnerships with Al-Azhar University and Wifaq ul Madaris Al-Arabia.",
          },
        },
        {
          "@type": "Question",
          name: "Does Jamia Siddiqiyyah offer financial aid or full Islamic scholarships?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Over 85% of residential students are on full scholarships covering all expenses, funded entirely by global Zakat contributions and endowment (Waqf) donors.",
          },
        },
        {
          "@type": "Question",
          name: "Can I learn Quran online with Jamia Siddiqiyyah?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Jamia Siddiqiyyah offers an online virtual academy with live interactive HD sessions, access to 1,200+ scanned manuscripts, and direct Mufti consultations for students worldwide.",
          },
        },
        {
          "@type": "Question",
          name: "How can I donate Zakat or Sadaqah to Jamia Siddiqiyyah?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can donate through our secure online Donation Center. We accept Zakat, Sadaqah, Waqf, and one-time or recurring donations. All transactions are verified through Shariah audit certified channels with 100% distribution pledge.",
          },
        },
      ],
    },

    // 6. Donation Action (Charity Schema)
    {
      "@type": "DonateAction",
      "@id": `${BASE_URL}/donate#donate-action`,
      name: "Donate to Jamia Siddiqiyyah",
      description:
        "Support Islamic education by donating Zakat, Sadaqah, or Waqf to Jamia Siddiqiyyah. Sponsor a student's full scholarship covering tuition, meals, boarding, and textbooks.",
      agent: { "@id": `${BASE_URL}/#organization` },
      recipient: { "@id": `${BASE_URL}/#organization` },
      url: `${BASE_URL}/donate`,
    },

    // 7. Breadcrumb List (home)
    {
      "@type": "BreadcrumbList",
      "@id": `${BASE_URL}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: BASE_URL,
        },
      ],
    },
  ],
};

import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${inter.variable} scroll-smooth`}
    >
      <head>
        {/* ── JSON-LD Structured Data ─────────────────────────────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        {/* ── Geo / Local SEO Meta ────────────────────────────────── */}
        <meta name="geo.region" content="SA-MD" />
        <meta name="geo.placename" content="Madinah, Saudi Arabia" />
        <meta name="geo.position" content="24.5247;39.5692" />
        <meta name="ICBM" content="24.5247, 39.5692" />
        {/* ── Classification ──────────────────────────────────────── */}
        <meta name="classification" content="Education, Religion, Charity" />
        <meta name="subject" content="Islamic Education and Charity" />
        <meta name="topic" content="Islamic University, Online Madrasa, Quran Academy, Islamic Charity" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="general" />
        {/* ── Dubai / Pakistan Targeting ───────────────────────────── */}
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="global" />
        {/* ── Theme ───────────────────────────────────────────────── */}
        <meta name="theme-color" content="#004d40" />
        <meta name="msapplication-navbutton-color" content="#004d40" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Jamia Siddiqiyyah" />
        {/* ── DNS Prefetch for performance ─────────────────────────── */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-background-warm text-on-surface antialiased min-h-screen selection:bg-secondary-fixed selection:text-on-secondary-fixed">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
