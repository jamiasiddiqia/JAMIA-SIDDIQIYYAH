import type { Metadata } from "next";
import Link from "next/link";
import { scholars, timelineEvents } from "@/data/mockData";

const BASE_URL = "https://jamiasiddiqiyyah.eu.cc";

export const metadata: Metadata = {
  title: "About Jamia Siddiqiyyah | Islamic Institute Founded 1994",
  description:
    "Learn about Jamia Siddiqiyyah — a premier Islamic educational institute founded in 1994. Discover our mission, history, senior scholars (Maulana Habibur Rehman & Mufti Fazal ur Rehman), accreditations by Wifaq ul Madaris and Al-Azhar, and 30+ years of authentic Islamic scholarship.",
  keywords: [
    "About Jamia Siddiqiyyah",
    "Jamia Siddiqiyyah history",
    "Islamic institute founded 1994",
    "Maulana Habibur Rehman",
    "Mufti Fazal ur Rehman",
    "Wifaq ul Madaris",
    "Al-Azhar accredited",
    "Islamic education Pakistan",
    "Dars e Nizami institute",
  ],
  alternates: { canonical: `${BASE_URL}/about` },
  openGraph: {
    title: "About Jamia Siddiqiyyah | Islamic Institute Founded 1994",
    description:
      "Discover the 30-year heritage of Jamia Siddiqiyyah — its founders, scholars, milestones, and global accreditations.",
    url: `${BASE_URL}/about`,
    images: [{ url: `${BASE_URL}/scholars/habib.png`, alt: "Maulana Habibur Rehman – Founder of Jamia Siddiqiyyah" }],
  },
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${BASE_URL}/about#webpage`,
  name: "About Jamia Siddiqiyyah",
  description:
    "The story, mission, scholars, accreditations, and 30-year heritage of Jamia Siddiqiyyah Islamic Institute.",
  url: `${BASE_URL}/about`,
  isPartOf: { "@id": `${BASE_URL}/#website` },
  about: { "@id": `${BASE_URL}/#organization` },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "About", item: `${BASE_URL}/about` },
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />

      <div className="min-h-screen bg-background-warm">
        {/* ── Breadcrumb ─────────────────────────────────── */}
        <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-6 md:px-20 pt-28 pb-4">
          <ol className="flex items-center gap-2 text-xs text-on-surface-variant">
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li className="text-primary/30">›</li>
            <li aria-current="page" className="text-primary font-semibold">About</li>
          </ol>
        </nav>

        {/* ── Hero ───────────────────────────────────────── */}
        <section className="py-16 bg-background-warm">
          <div className="max-w-7xl mx-auto px-6 md:px-20">
            <div className="max-w-3xl">
              <span className="text-secondary font-semibold text-xs tracking-widest uppercase">Est. 1994</span>
              <h1 className="font-display text-4xl md:text-5xl text-primary italic font-bold mt-3 mb-6">
                About Jamia Siddiqiyyah
              </h1>
              <p className="text-on-surface-variant text-base leading-relaxed">
                For over three decades, <strong>Jamia Siddiqiyyah</strong> has stood as a beacon of
                authentic Islamic scholarship — transmitting the sacred sciences with an unbroken chain
                of knowledge (Isnad) that connects students directly to the prophetic tradition.
                Founded in 1994 as a humble sanctuary, we have grown into a globally recognised
                Islamic institute, online madrasa, Quran academy, and charity platform serving
                students across <strong>15+ countries</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* ── Mission & Vision ───────────────────────────── */}
        <section className="py-20 bg-white border-y border-primary/5" aria-labelledby="mission-heading">
          <div className="max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 id="mission-heading" className="font-display text-2xl md:text-3xl text-primary italic font-bold mb-6">
                Our Mission
              </h2>
              <p className="text-on-surface-variant leading-relaxed mb-4">
                Our mission is to maintain a pure scholarly environment where seekers of sacred
                sciences access traditional mentorship rooted in the Quran and Sunnah, and emerge
                as leaders of spiritual guidance for their communities worldwide.
              </p>
              <p className="text-on-surface-variant leading-relaxed">
                We combine the rigorous transmission of <strong>classical Islamic sciences</strong>{" "}
                — Tafsir, Hadith, Fiqh, Arabic, and Tasawwuf — with contemporary research
                capabilities and a comprehensive Islamic charity integration.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-primary italic font-bold mb-6">
                Our Vision
              </h2>
              <p className="text-on-surface-variant leading-relaxed mb-4">
                To become the world's most trusted source of authentic Islamic education — where
                every graduate carries both the letter and the spirit of sacred knowledge, and
                where every donor's contribution flows through Shariah-verified channels to
                directly uplift students in need.
              </p>
              <ul className="space-y-3 mt-4">
                {[
                  "Authentic Isnad-based transmission",
                  "Global access via online academy",
                  "100% Shariah-audited charity channels",
                  "Full scholarships for deserving students",
                  "Research-led Islamic jurisprudence",
                ].map((v, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-on-surface-variant">
                    <span className="w-5 h-5 rounded-full bg-secondary/15 flex items-center justify-center text-secondary font-bold text-xs shrink-0 mt-0.5">✓</span>
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Timeline / History ─────────────────────────── */}
        <section className="py-20 bg-background-warm" aria-labelledby="history-heading">
          <div className="max-w-7xl mx-auto px-6 md:px-20">
            <div className="text-center mb-16">
              <span className="text-secondary font-semibold text-xs tracking-widest uppercase">Our Journey</span>
              <h2 id="history-heading" className="font-display text-3xl md:text-4xl text-primary italic font-bold mt-3">
                30 Years of Sacred Heritage
              </h2>
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mt-6" />
            </div>

            <div className="relative border-l-2 border-primary/15 pl-10 space-y-12 max-w-3xl mx-auto">
              {timelineEvents.map((event, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[45px] top-1.5 w-5 h-5 rounded-full bg-primary border-4 border-white shadow-md" />
                  <time className="block font-display text-2xl text-secondary font-bold italic mb-1">
                    {event.year}
                  </time>
                  <h3 className="font-bold text-primary text-base mb-2">{event.title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{event.description}</p>
                </div>
              ))}
              {/* Additional milestones */}
              <div className="relative">
                <div className="absolute -left-[45px] top-1.5 w-5 h-5 rounded-full bg-secondary border-4 border-white shadow-md" />
                <time className="block font-display text-2xl text-secondary font-bold italic mb-1">2026</time>
                <h3 className="font-bold text-primary text-base mb-2">Global Digital Expansion</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Launch of our full online academy portal with live HD classes, manuscript archives,
                  and real-time Mufti consultations reaching students in 15+ countries.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Scholars ───────────────────────────────────── */}
        <section className="py-20 bg-white border-y border-primary/5" aria-labelledby="scholars-heading">
          <div className="max-w-7xl mx-auto px-6 md:px-20">
            <div className="text-center mb-16">
              <span className="text-secondary font-semibold text-xs tracking-widest uppercase">Leadership</span>
              <h2 id="scholars-heading" className="font-display text-3xl md:text-4xl text-primary italic font-bold mt-3">
                Our Senior Scholars
              </h2>
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mt-6" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {scholars.map((scholar, idx) => (
                <article key={idx} className="bg-background-warm rounded-xl border border-primary/5 shadow-md overflow-hidden" itemScope itemType="https://schema.org/Person">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={scholar.image}
                      alt={`${scholar.name} – ${scholar.role} at Jamia Siddiqiyyah`}
                      className="w-full h-full object-cover"
                      loading={idx === 0 ? "eager" : "lazy"}
                      itemProp="image"
                    />
                  </div>
                  <div className="p-8">
                    <p className="text-secondary text-xs font-bold tracking-widest uppercase mb-2" itemProp="jobTitle">{scholar.role}</p>
                    <h3 className="font-display text-xl font-bold text-primary italic mb-1" itemProp="name">{scholar.name}</h3>
                    <p className="text-on-surface-variant text-xs mb-4">{scholar.title}</p>
                    <p className="text-on-surface-variant text-sm leading-relaxed" itemProp="description">{scholar.bio}</p>
                    <div className="mt-4 pt-4 border-t border-primary/5">
                      <span className="text-xs font-semibold text-secondary uppercase tracking-wider">Specialty: </span>
                      <span className="text-xs text-on-surface-variant" itemProp="knowsAbout">{scholar.specialty}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/scholars" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all shadow-md">
                View All Scholars →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Accreditations ─────────────────────────────── */}
        <section className="py-20 bg-background-warm" aria-labelledby="accreditations-heading">
          <div className="max-w-7xl mx-auto px-6 md:px-20 text-center">
            <span className="text-secondary font-semibold text-xs tracking-widest uppercase">Recognition</span>
            <h2 id="accreditations-heading" className="font-display text-3xl md:text-4xl text-primary italic font-bold mt-3 mb-12">
              Global Accreditations & Affiliations
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Wifaq ul Madaris Al-Arabia", role: "Primary Accreditation Body" },
                { name: "Al-Azhar University", role: "International Recognition Partner" },
                { name: "Jamia Farooqia Karachi", role: "Academic Alliance" },
                { name: "Darul Uloom Deoband", role: "Curriculum Alignment Partner" },
                { name: "Jamia Ashrafia Lahore", role: "Regional Accreditation Partner" },
                { name: "University of Sharjah", role: "Research Collaboration" },
              ].map((inst, i) => (
                <div key={i} className="p-6 bg-white rounded-xl border border-primary/5 shadow-sm" itemScope itemType="https://schema.org/Organization">
                  <div className="font-display italic text-primary text-sm font-bold mb-2" itemProp="name">{inst.name}</div>
                  <div className="text-xs text-on-surface-variant">{inst.role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Impact Stats ───────────────────────────────── */}
        <section className="py-20 bg-primary text-white" aria-labelledby="impact-heading">
          <div className="max-w-7xl mx-auto px-6 md:px-20">
            <h2 id="impact-heading" className="font-display text-3xl md:text-4xl font-bold italic text-center mb-16">
              Our Global Impact
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { stat: "5,240+", label: "Alumni Graduated" },
                { stat: "850+", label: "Full Scholarships Given" },
                { stat: "78+", label: "Senior Scholars on Faculty" },
                { stat: "15+", label: "Countries Reached" },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-white/5 rounded-xl border border-white/10">
                  <div className="font-display text-3xl font-bold text-secondary-fixed italic mb-2">{item.stat}</div>
                  <div className="text-xs tracking-widest text-white/60 font-semibold uppercase">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────── */}
        <section className="py-20 bg-background-warm text-center">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="font-display text-3xl text-primary italic font-bold mb-4">
              Join the Legacy of Sacred Knowledge
            </h2>
            <p className="text-on-surface-variant mb-8">
              Apply for a program, sponsor a student, or donate to support authentic Islamic education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apply" className="bg-primary text-white px-8 py-4 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-opacity-90 transition-all shadow-md">
                Apply for a Program
              </Link>
              <Link href="/donate" className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                Support the Mission
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
