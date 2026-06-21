import type { Metadata } from "next";
import Link from "next/link";
import { programs } from "@/data/mockData";

const BASE_URL = "https://jamiasiddiqiyyah.eu.cc";

export const metadata: Metadata = {
  title: "Islamic Programs & Courses | Hifz, Dars-e-Nizami, Ifta, Arabic",
  description:
    "Explore Jamia Siddiqiyyah's academic programs: Hifz al-Quran (3 years), Dars-e-Nizami Alim Course (8 years), Arabic Arts & Calligraphy (2 years), and Ifta Specialization (Postgrad). Apply online for Islamic education courses.",
  keywords: [
    "Dars e Nizami Online",
    "Hifz Program",
    "Tajweed Classes",
    "Alim Course",
    "Ifta Specialization",
    "Islamic Courses Online",
    "Quran Memorization Program",
    "Arabic Language Course",
    "Mufti Course",
    "Online Islamic Education",
    "Islamic Academy Programs",
    "Learn Quran Online",
  ],
  alternates: { canonical: `${BASE_URL}/programs` },
  openGraph: {
    title: "Islamic Programs | Hifz, Dars-e-Nizami, Ifta & Arabic – Jamia Siddiqiyyah",
    description:
      "World-class Islamic academic programs including Hifz, 8-year Alim Program, Arabic Calligraphy, and Ifta Mufti specialization. Apply online.",
    url: `${BASE_URL}/programs`,
    images: [{ url: `${BASE_URL}/logo.png`, alt: "Jamia Siddiqiyyah Islamic Programs" }],
  },
};

const programsSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${BASE_URL}/programs#webpage`,
      name: "Islamic Academic Programs – Jamia Siddiqiyyah",
      description:
        "Full list of academic Islamic programs offered by Jamia Siddiqiyyah, including Hifz, Dars-e-Nizami, Arabic and Ifta courses.",
      url: `${BASE_URL}/programs`,
      isPartOf: { "@id": `${BASE_URL}/#website` },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Programs", item: `${BASE_URL}/programs` },
        ],
      },
    },
    {
      "@type": "ItemList",
      name: "Jamia Siddiqiyyah Islamic Programs",
      itemListElement: [
        {
          "@type": "ListItem", position: 1,
          item: {
            "@type": "Course",
            name: "Hifz al-Quran Program",
            description: "3-year rigorous Quran memorization with Tajweed, Makharij and Quranic Arabic. Full scholarships available.",
            url: `${BASE_URL}/apply?course=Hifz+al-Quran`,
            provider: { "@id": `${BASE_URL}/#organization` },
            timeRequired: "P3Y",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          },
        },
        {
          "@type": "ListItem", position: 2,
          item: {
            "@type": "Course",
            name: "Dars-e-Nizami – Alim Program",
            description: "8-year comprehensive Islamic scholar curriculum covering Fiqh, Hadith, Tafsir, Arabic. Recognized by Wifaq ul Madaris and Al-Azhar.",
            url: `${BASE_URL}/apply?course=Dars-e-Nizami`,
            provider: { "@id": `${BASE_URL}/#organization` },
            timeRequired: "P8Y",
            educationalCredentialAwarded: "Alim Degree",
          },
        },
        {
          "@type": "ListItem", position: 3,
          item: {
            "@type": "Course",
            name: "Arabic Arts & Calligraphy",
            description: "2-year program in classical Arabic literature, Thuluth and Naskh calligraphy, and manuscript preservation.",
            url: `${BASE_URL}/apply?course=Arabic+Arts+%26+Calligraphy`,
            provider: { "@id": `${BASE_URL}/#organization` },
            timeRequired: "P2Y",
          },
        },
        {
          "@type": "ListItem", position: 4,
          item: {
            "@type": "Course",
            name: "Ifta Specialization – Mufti Program",
            description: "2-year postgraduate research for producing qualified Islamic jurists (Muftis) capable of issuing Fatawa.",
            url: `${BASE_URL}/apply?course=Ifta+Specialization`,
            provider: { "@id": `${BASE_URL}/#organization` },
            timeRequired: "P2Y",
            educationalCredentialAwarded: "Mufti Degree",
          },
        },
      ],
    },
  ],
};

const iconMap: Record<string, string> = {
  BookOpen: "📖",
  Award: "🏆",
  Languages: "✍️",
  Scale: "⚖️",
};

export default function ProgramsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(programsSchema) }}
      />

      <div className="min-h-screen bg-background-warm">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-6 md:px-20 pt-28 pb-4">
          <ol className="flex items-center gap-2 text-xs text-on-surface-variant">
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li className="text-primary/30">›</li>
            <li aria-current="page" className="text-primary font-semibold">Programs</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="py-16 bg-background-warm">
          <div className="max-w-7xl mx-auto px-6 md:px-20 max-w-3xl">
            <span className="text-secondary font-semibold text-xs tracking-widest uppercase">Sacred Curricula</span>
            <h1 className="font-display text-4xl md:text-5xl text-primary italic font-bold mt-3 mb-6">
              Islamic Academic Programs
            </h1>
            <p className="text-on-surface-variant text-base leading-relaxed max-w-2xl">
              Jamia Siddiqiyyah offers world-class Islamic academic programs taught by senior
              scholars with verified Isnad — from Hifz al-Quran and Tajweed to the full
              <strong> 8-year Dars-e-Nizami Alim Program</strong> and postgraduate Ifta
              (Mufti) Specialization. Scholarships available for qualifying students.
            </p>
          </div>
        </section>

        {/* Programs Grid */}
        <section className="py-16 bg-surface-container-low border-y border-primary/5">
          <div className="max-w-7xl mx-auto px-6 md:px-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {programs.map((prog, idx) => (
                <article
                  key={idx}
                  className="bg-white rounded-2xl p-8 border border-primary/5 shadow-md hover:shadow-xl transition-all duration-300"
                  itemScope
                  itemType="https://schema.org/Course"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center text-2xl">
                      {iconMap[prog.iconName] || "📚"}
                    </div>
                    {prog.badge && (
                      <span className="bg-secondary-fixed text-primary text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full">
                        {prog.badge}
                      </span>
                    )}
                  </div>

                  <h2 className="font-display text-xl font-bold text-primary italic mb-3" itemProp="name">
                    {prog.title}
                  </h2>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-6" itemProp="description">
                    {prog.description}
                  </p>

                  <div className="mb-6">
                    <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Curriculum Highlights</h3>
                    <ul className="space-y-2">
                      {prog.curriculum.map((item, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-2 text-sm text-on-surface-variant">
                          <span className="text-secondary mt-0.5 shrink-0">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-primary/5">
                    <div>
                      <span className="text-xs text-on-surface-variant/60 block">Duration</span>
                      <span className="text-sm font-bold text-secondary" itemProp="timeRequired">
                        {prog.duration}
                      </span>
                    </div>
                    <Link
                      href={`/apply?course=${encodeURIComponent(prog.title)}`}
                      className="bg-primary text-white px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all shadow-sm"
                      itemProp="url"
                    >
                      Apply Now →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Online Academy */}
        <section className="py-20 bg-primary text-white" aria-labelledby="online-academy-heading">
          <div className="max-w-7xl mx-auto px-6 md:px-20 text-center">
            <span className="text-secondary-fixed font-semibold text-xs tracking-widest uppercase block mb-4">Virtual Learning</span>
            <h2 id="online-academy-heading" className="font-display text-3xl md:text-4xl font-bold italic mb-6">
              Learn Islamic Sciences Online
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              Can't join us on campus? Our premium online Islamic academy offers live HD sessions,
              access to 1,200+ scanned manuscripts, Tajweed courses, Quran memorization tracks,
              and direct scheduling with senior scholars — all from anywhere in the world.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-10">
              {[
                { icon: "🎓", label: "Daily Live HD Sessions" },
                { icon: "📜", label: "1,200+ Manuscripts" },
                { icon: "🕌", label: "Direct Mufti Access" },
              ].map((f, i) => (
                <div key={i} className="p-6 bg-white/5 rounded-xl border border-white/10 text-center">
                  <div className="text-3xl mb-3">{f.icon}</div>
                  <div className="text-sm font-semibold text-white/90">{f.label}</div>
                </div>
              ))}
            </div>
            <Link href="/apply" className="bg-secondary-fixed text-primary px-10 py-4 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-white transition-all shadow-lg">
              Request Guest Pass
            </Link>
          </div>
        </section>

        {/* Scholarships */}
        <section className="py-20 bg-background-warm" aria-labelledby="scholarships-heading">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <span className="text-secondary font-semibold text-xs tracking-widest uppercase">Financial Aid</span>
            <h2 id="scholarships-heading" className="font-display text-3xl text-primary italic font-bold mt-3 mb-6">
              Islamic Scholarships & Financial Aid
            </h2>
            <p className="text-on-surface-variant leading-relaxed mb-8">
              Over <strong>85% of our residential students</strong> receive full scholarships
              covering tuition, boarding, meals, textbooks, and healthcare — funded entirely
              by Zakat and Waqf endowment donors. We believe that no deserving student should
              be denied access to sacred knowledge due to financial constraints.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apply" className="bg-primary text-white px-8 py-4 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-opacity-90 transition-all shadow-md">
                Apply for Scholarship
              </Link>
              <Link href="/donate" className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                Fund a Scholarship
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
