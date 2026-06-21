import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = "https://jamiasiddiqiyyah.eu.cc";

export const metadata: Metadata = {
  title: "Donate to Islamic Education | Zakat, Sadaqah & Waqf – Jamia Siddiqiyyah",
  description:
    "Donate Zakat, Sadaqah, Waqf, or sponsor an Islamic scholarship student at Jamia Siddiqiyyah. 100% Shariah-audited, transparent donation channels. Sponsor a student from $35/month. All donations fund authentic Islamic education.",
  keywords: [
    "Donate Zakat Online",
    "Donate Sadaqah",
    "Islamic Charity",
    "Islamic Donations",
    "Sponsor Islamic Student",
    "Islamic Scholarship Donation",
    "Waqf Donation",
    "Zakat Education",
    "Islamic Education Donation",
    "Muslim Charity UK",
    "Muslim Charity USA",
    "Donate to Madrasa",
    "Islamic Foundation Donation",
    "Charity Islam",
  ],
  alternates: { canonical: `${BASE_URL}/donate` },
  openGraph: {
    title: "Donate Zakat & Sadaqah | Sponsor Islamic Scholars – Jamia Siddiqiyyah",
    description:
      "100% Shariah-audited donation channels. Sponsor a student's full education from $35/month. Your Zakat and Sadaqah directly fund Islamic scholarship.",
    url: `${BASE_URL}/donate`,
    images: [{ url: `${BASE_URL}/logo.png`, alt: "Donate to Jamia Siddiqiyyah Islamic Charity" }],
  },
};

const donateSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${BASE_URL}/donate#webpage`,
      name: "Donate to Jamia Siddiqiyyah – Islamic Charity & Scholarship Fund",
      description:
        "Donate Zakat, Sadaqah, Waqf or sponsor an Islamic scholarship student at Jamia Siddiqiyyah.",
      url: `${BASE_URL}/donate`,
      isPartOf: { "@id": `${BASE_URL}/#website` },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Donate", item: `${BASE_URL}/donate` },
        ],
      },
    },
    {
      "@type": "DonateAction",
      name: "Donate to Jamia Siddiqiyyah",
      description:
        "Support authentic Islamic education through Zakat, Sadaqah, Waqf or monthly student sponsorship. 100% Shariah audited.",
      agent: { "@id": `${BASE_URL}/#organization` },
      recipient: { "@id": `${BASE_URL}/#organization` },
      url: `${BASE_URL}/donate`,
      price: "35",
      priceCurrency: "USD",
    },
    {
      "@type": "FAQPage",
      "@id": `${BASE_URL}/donate#faqs`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Is my donation to Jamia Siddiqiyyah Zakat eligible?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Student sponsorship and education fund donations qualify as Zakat. Our Shariah-certified scholars have issued a formal ruling confirming Zakat eligibility for student support programs.",
          },
        },
        {
          "@type": "Question",
          name: "How much does it cost to sponsor an Islamic student?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A basic Seeker Supporter sponsorship starts at $35/month covering study materials for 2 students. A full Scholar Sponsor covering tuition, meals, boarding, and books for one student is $150/month. A Classroom Patron sponsoring an entire classroom is $450/month.",
          },
        },
        {
          "@type": "Question",
          name: "Is Jamia Siddiqiyyah a registered charity?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Jamia Siddiqiyyah operates as an Islamic Waqf trust with formally registered charitable status. All donation channels are audited by Shariah-certified accountants and the financial reports are publicly available.",
          },
        },
        {
          "@type": "Question",
          name: "What percentage of my donation goes directly to students?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "100% of student sponsorship donations go directly to student expenses — tuition, boarding, meals, books and healthcare. Administrative costs are covered separately by institutional funds.",
          },
        },
      ],
    },
  ],
};

const sponsorshipTiers = [
  {
    tier: "Tier 1",
    name: "Seeker Supporter",
    price: "$35",
    per: "/month",
    description: "Supports basic study materials and course books for 2 students.",
    impact: "Provides textbooks, stationery, and study resources for two seekers of knowledge.",
    color: "border-primary/10",
    cta: "Start Supporting",
  },
  {
    tier: "Tier 2",
    name: "Scholar Sponsor",
    price: "$150",
    per: "/month",
    description: "Full scholarship: tuition, meals, and boarding for 1 student.",
    impact: "Covers complete education, accommodation, daily meals, and healthcare for one scholar.",
    color: "border-secondary shadow-lg",
    badge: "Most Popular",
    cta: "Sponsor a Scholar",
  },
  {
    tier: "Tier 3",
    name: "Classroom Patron",
    price: "$450",
    per: "/month",
    description: "Sponsors utilities, technology, and textbooks for an entire classroom.",
    impact: "Equips and supports a full classroom of seekers with everything needed to learn.",
    color: "border-primary/10",
    cta: "Become a Patron",
  },
];

export default function DonatePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donateSchema) }}
      />

      <div className="min-h-screen bg-background-warm">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-6 md:px-20 pt-28 pb-4">
          <ol className="flex items-center gap-2 text-xs text-on-surface-variant">
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li className="text-primary/30">›</li>
            <li aria-current="page" className="text-primary font-semibold">Donate</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="py-16 bg-background-warm">
          <div className="max-w-7xl mx-auto px-6 md:px-20">
            <div className="max-w-3xl">
              <span className="text-secondary font-semibold text-xs tracking-widest uppercase">Islamic Charity</span>
              <h1 className="font-display text-4xl md:text-5xl text-primary italic font-bold mt-3 mb-6">
                Donate Zakat, Sadaqah & Waqf
              </h1>
              <p className="text-on-surface-variant text-base leading-relaxed mb-6">
                Every contribution to Jamia Siddiqiyyah is an investment in eternal reward.
                When a seeker of sacred knowledge studies and teaches the Quran and Islamic
                sciences, the reward flows back to every person who made their journey possible.
                All donations are <strong>100% Shariah-audited</strong> and transparently reported.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white border border-primary/10 rounded-lg px-4 py-2.5">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-xs font-semibold text-primary">Zakat Eligible</span>
                </div>
                <div className="flex items-center gap-2 bg-white border border-primary/10 rounded-lg px-4 py-2.5">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-xs font-semibold text-primary">Shariah Audited</span>
                </div>
                <div className="flex items-center gap-2 bg-white border border-primary/10 rounded-lg px-4 py-2.5">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-xs font-semibold text-primary">100% to Students</span>
                </div>
                <div className="flex items-center gap-2 bg-white border border-primary/10 rounded-lg px-4 py-2.5">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-xs font-semibold text-primary">Transparent Reports</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Donation Types */}
        <section className="py-20 bg-white border-y border-primary/5" aria-labelledby="donation-types-heading">
          <div className="max-w-7xl mx-auto px-6 md:px-20">
            <h2 id="donation-types-heading" className="font-display text-3xl text-primary italic font-bold text-center mb-12">
              Types of Islamic Donations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  type: "Zakat",
                  arabic: "زكاة",
                  icon: "🌙",
                  description:
                    "Zakat is one of the five pillars of Islam — an obligatory annual payment of 2.5% of qualifying wealth. Donating Zakat to student sponsorship at Jamia Siddiqiyyah is Shariah-certified as eligible (Masarif al-Zakat).",
                  eligible: true,
                },
                {
                  type: "Sadaqah",
                  arabic: "صدقة",
                  icon: "💚",
                  description:
                    "Voluntary charitable giving that carries immense spiritual reward. Any donation, large or small, to support Islamic education and student welfare qualifies as Sadaqah Jariyah — ongoing charity whose reward continues after death.",
                  eligible: true,
                },
                {
                  type: "Waqf",
                  arabic: "وقف",
                  icon: "🏛️",
                  description:
                    "An Islamic endowment — a gift whose principal is preserved and whose benefit continues forever. Contributing to our Waqf fund supports the institution's infrastructure, library, and scholarship fund in perpetuity.",
                  eligible: true,
                },
              ].map((item, i) => (
                <div key={i} className="bg-background-warm rounded-xl p-8 border border-primary/5">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl">{item.icon}</span>
                    <div>
                      <h3 className="font-display text-xl font-bold text-primary italic">{item.type}</h3>
                      <span className="text-secondary text-sm">{item.arabic}</span>
                    </div>
                  </div>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{item.description}</p>
                  {item.eligible && (
                    <div className="mt-4 flex items-center gap-2 text-xs font-bold text-green-600">
                      <span>✓</span> Shariah certified & eligible
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sponsorship Tiers */}
        <section className="py-20 bg-background-warm" aria-labelledby="sponsor-heading">
          <div className="max-w-7xl mx-auto px-6 md:px-20">
            <div className="text-center mb-16">
              <span className="text-secondary font-semibold text-xs tracking-widest uppercase">Monthly Giving</span>
              <h2 id="sponsor-heading" className="font-display text-3xl md:text-4xl text-primary italic font-bold mt-3">
                Sponsor a Seeker of Knowledge
              </h2>
              <p className="text-on-surface-variant text-sm max-w-2xl mx-auto mt-4 leading-relaxed">
                Choose a monthly giving plan. You will receive bi-annual updates on your
                sponsored student's progress, alongside a formal Shariah receipt for Zakat.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {sponsorshipTiers.map((t, i) => (
                <div
                  key={i}
                  className={`bg-white rounded-2xl p-8 border-2 ${t.color} hover:shadow-xl transition-all relative`}
                >
                  {t.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-white text-[10px] font-bold tracking-widest uppercase px-4 py-1 rounded-full">
                      {t.badge}
                    </span>
                  )}
                  <span className="text-xs font-bold text-secondary uppercase tracking-widest block mb-2">{t.tier}</span>
                  <h3 className="font-display text-xl font-bold text-primary italic mb-2">{t.name}</h3>
                  <div className="font-display text-4xl font-bold text-primary italic mb-1">
                    {t.price}<span className="text-sm font-sans text-on-surface-variant font-normal">{t.per}</span>
                  </div>
                  <p className="text-on-surface-variant text-xs mt-2 mb-4 leading-relaxed">{t.description}</p>
                  <div className="bg-secondary/5 rounded-lg p-4 mb-6 text-xs text-on-surface-variant leading-relaxed">
                    <strong className="text-primary">Your impact:</strong> {t.impact}
                  </div>
                  <Link
                    href="/#donation"
                    className="block w-full text-center bg-primary text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all"
                  >
                    {t.cta} →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Transparency */}
        <section className="py-20 bg-primary text-white" aria-labelledby="transparency-heading">
          <div className="max-w-7xl mx-auto px-6 md:px-20 text-center">
            <span className="text-secondary-fixed font-semibold text-xs tracking-widest uppercase block mb-4">
              Financial Trust
            </span>
            <h2 id="transparency-heading" className="font-display text-3xl font-bold italic mb-6">
              Donation Transparency & Trust
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed">
              We publish full financial audit reports annually. Every donation is tracked,
              verified by a Shariah board, and distributed with 100% transparency. Your
              trust is our most sacred obligation.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { stat: "100%", label: "Direct Distribution" },
                { stat: "850+", label: "Students Supported" },
                { stat: "Annual", label: "Audit Reports" },
                { stat: "Shariah", label: "Certified Channels" },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-white/5 rounded-xl border border-white/10">
                  <div className="font-display text-2xl font-bold text-secondary-fixed italic mb-2">{item.stat}</div>
                  <div className="text-xs tracking-widest text-white/60 font-semibold uppercase">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-background-warm" aria-labelledby="donate-faq-heading">
          <div className="max-w-4xl mx-auto px-6">
            <h2 id="donate-faq-heading" className="font-display text-3xl text-primary italic font-bold text-center mb-12">
              Donation FAQs
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "Is my donation to Jamia Siddiqiyyah Zakat eligible?",
                  a: "Yes. Student sponsorship and education fund donations qualify as Zakat. Our Shariah-certified scholars have issued a formal ruling confirming Zakat eligibility for student support programs.",
                },
                {
                  q: "How much does it cost to sponsor a full Islamic scholarship?",
                  a: "A full Scholar Sponsor covering tuition, meals, boarding, and books for one student is $150/month. Over 85% of students at Jamia Siddiqiyyah are on full scholarships.",
                },
                {
                  q: "What percentage of my donation reaches students?",
                  a: "100% of your student sponsorship donation goes directly to the student's educational expenses. Administrative costs are covered by separate institutional funds.",
                },
                {
                  q: "Can I donate Sadaqah Jariyah through Jamia Siddiqiyyah?",
                  a: "Absolutely. All donations to support Islamic education — especially scholarships that enable students to go on to teach others — qualify as Sadaqah Jariyah (ongoing charity), providing continuous reward even after death.",
                },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl border border-primary/5 p-6 shadow-sm">
                  <h3 className="font-bold text-primary text-sm mb-3">{item.q}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-secondary-fixed text-primary text-center">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="font-display text-3xl font-bold italic mb-4">
              Secure Your Eternal Legacy Today
            </h2>
            <p className="text-primary/70 mb-8">
              Every dirham, dollar, or pound you give today plants a tree of sacred knowledge
              that will shade generations to come.
            </p>
            <Link href="/#donation" className="bg-primary text-white px-10 py-4 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-opacity-90 transition-all shadow-lg inline-block">
              Donate Now →
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
