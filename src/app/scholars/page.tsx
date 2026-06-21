import type { Metadata } from "next";
import Link from "next/link";
import { scholars } from "@/data/mockData";

const BASE_URL = "https://jamiasiddiqiyyah.eu.cc";

export const metadata: Metadata = {
  title: "Islamic Scholars & Faculty | Maulana Habibur Rehman – Jamia Siddiqiyyah",
  description:
    "Meet the senior Islamic scholars and faculty of Jamia Siddiqiyyah. Led by Maulana Habibur Rehman (Founder) and Mufti Fazal ur Rehman (Nazim-e-Aala), our scholars hold verified chains of Islamic knowledge (Isnad) recognized by Wifaq ul Madaris and Al-Azhar University.",
  keywords: [
    "Maulana Habibur Rehman",
    "Mufti Fazal ur Rehman",
    "Islamic Scholars Pakistan",
    "Jamia Siddiqiyyah scholars",
    "Islamic faculty",
    "Dars e Nizami scholars",
    "Alim scholars",
    "Mufti scholars",
    "Islamic teachers online",
    "qualified Islamic scholars",
  ],
  alternates: { canonical: `${BASE_URL}/scholars` },
  openGraph: {
    title: "Islamic Scholars & Faculty – Jamia Siddiqiyyah",
    description:
      "Meet our senior scholars: Maulana Habibur Rehman and Mufti Fazal ur Rehman, with verified Isnad recognized by Al-Azhar and Wifaq ul Madaris.",
    url: `${BASE_URL}/scholars`,
    images: [
      { url: `${BASE_URL}/scholars/habib.png`, alt: "Maulana Habibur Rehman – Founder Jamia Siddiqiyyah" },
    ],
  },
};

const scholarsPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${BASE_URL}/scholars#webpage`,
      name: "Islamic Scholars & Faculty – Jamia Siddiqiyyah",
      description: "Senior scholars and faculty of Jamia Siddiqiyyah with verified Islamic credentials.",
      url: `${BASE_URL}/scholars`,
      isPartOf: { "@id": `${BASE_URL}/#website` },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Scholars", item: `${BASE_URL}/scholars` },
        ],
      },
    },
    {
      "@type": "Person",
      "@id": `${BASE_URL}/scholars#habibur-rehman`,
      name: "Maulana Habibur Rehman",
      honorificPrefix: "Maulana",
      jobTitle: "Founder & Patron-in-Chief",
      worksFor: { "@id": `${BASE_URL}/#organization` },
      description:
        "The visionary founder and owner of Jamia Siddiqiyyah. Over three decades of steering the institution towards spiritual excellence, authentic transmission of sacred knowledge, and global community service.",
      image: `${BASE_URL}/scholars/habib.png`,
      url: `${BASE_URL}/scholars#habibur-rehman`,
      knowsAbout: ["Islamic Education", "Sacred Knowledge", "Spiritual Leadership", "Tazkiyah"],
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        name: "Dars-e-Nizami (Alim Degree)",
        recognizedBy: { "@type": "Organization", name: "Wifaq ul Madaris Al-Arabia" },
      },
    },
    {
      "@type": "Person",
      "@id": `${BASE_URL}/scholars#fazal-ur-rehman`,
      name: "Mufti Fazal ur Rehman",
      honorificPrefix: "Mufti",
      jobTitle: "Nazim-e-Aala (Director General)",
      worksFor: { "@id": `${BASE_URL}/#organization` },
      description:
        "A highly respected jurist and the Nazim-e-Aala of Jamia Siddiqiyyah, directing the traditional Dars-e-Nizami curriculum, educational standards, and spiritual Tazkiyah programs.",
      image: `${BASE_URL}/scholars/fazal.png`,
      url: `${BASE_URL}/scholars#fazal-ur-rehman`,
      knowsAbout: ["Islamic Jurisprudence", "Fiqh", "Hadith Studies", "Dars-e-Nizami", "Ifta"],
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "degree",
          name: "Dars-e-Nizami (Alim Degree)",
          recognizedBy: { "@type": "Organization", name: "Wifaq ul Madaris Al-Arabia" },
        },
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "degree",
          name: "Ifta Specialization (Mufti Degree)",
          recognizedBy: { "@type": "Organization", name: "Al-Azhar University" },
        },
      ],
    },
  ],
};

const additionalFaculty = [
  {
    name: "Ustad Murtaza Al-Hashimi",
    role: "Head of Manuscript Research",
    specialty: "Classical Arabic Literature & Manuscript Preservation",
    credential: "Advanced Arabic Studies – Darul Uloom Deoband",
    bio: "Leads our digitization initiative for Fatimid and classical era manuscripts, with expertise in paleography, Thuluth calligraphy, and historical Islamic scholarship.",
  },
  {
    name: "Dr. Abdullah Al-Farooqi",
    role: "Professor of Quranic Linguistics",
    specialty: "Quranic Rhetoric (Balaghah) & Arabic Grammar (Nahw & Sarf)",
    credential: "PhD Arabic Linguistics – Al-Azhar University",
    bio: "A leading authority on the rhetorical dimensions of Quranic Arabic, author of multiple research papers on classical Arabic poetry's influence on Quran translation methodology.",
  },
  {
    name: "Mufti Habibullah Al-Qadri",
    role: "Senior Mufti & Researcher",
    specialty: "Contemporary Islamic Finance & Bioethics",
    credential: "Ifta Specialization – Jamia Farooqia Karachi",
    bio: "Specializes in applying classical Fiqh principles to modern finance, blockchain, and digital transactions. Author of research on smart contracts through the lens of Islamic jurisprudence.",
  },
  {
    name: "Hafiz Muhammad Ibrahim",
    role: "Head of Hifz Department",
    specialty: "Quran Memorization, Tajweed & Qira'at",
    credential: "Hifz & Tajweed Certification – Wifaq ul Madaris",
    bio: "Has trained over 300 Huffaz (Quran memorizers) across 10 countries. Expert in all 10 canonical Qira'at (recitation modes) and the Makharij al-Huruf methodology.",
  },
];

export default function ScholarsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(scholarsPageSchema) }}
      />

      <div className="min-h-screen bg-background-warm">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-6 md:px-20 pt-28 pb-4">
          <ol className="flex items-center gap-2 text-xs text-on-surface-variant">
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li className="text-primary/30">›</li>
            <li aria-current="page" className="text-primary font-semibold">Scholars</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-20">
            <div className="max-w-3xl">
              <span className="text-secondary font-semibold text-xs tracking-widest uppercase">E-E-A-T: Expertise & Authority</span>
              <h1 className="font-display text-4xl md:text-5xl text-primary italic font-bold mt-3 mb-6">
                Our Islamic Scholars & Faculty
              </h1>
              <p className="text-on-surface-variant text-base leading-relaxed">
                Jamia Siddiqiyyah&apos;s faculty are among the most credentialed Islamic scholars
                in the world. Every teacher holds a verified chain of transmission (Isnad)
                connecting their knowledge back to the Prophet ﷺ through an unbroken chain of
                scholarship. Our degrees are recognized by <strong>Wifaq ul Madaris Al-Arabia</strong>{" "}
                and <strong>Al-Azhar University</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* Senior Leadership */}
        <section className="py-16 bg-white border-y border-primary/5" aria-labelledby="leadership-heading">
          <div className="max-w-7xl mx-auto px-6 md:px-20">
            <div className="text-center mb-16">
              <span className="text-secondary font-semibold text-xs tracking-widest uppercase">Founding Leadership</span>
              <h2 id="leadership-heading" className="font-display text-3xl md:text-4xl text-primary italic font-bold mt-3">
                The Guardians of Sacred Knowledge
              </h2>
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mt-6" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
              {scholars.map((scholar, idx) => (
                <article
                  key={idx}
                  id={idx === 0 ? "habibur-rehman" : "fazal-ur-rehman"}
                  className="bg-background-warm rounded-2xl border border-primary/5 shadow-md overflow-hidden"
                  itemScope itemType="https://schema.org/Person"
                >
                  <div className="aspect-[3/2] overflow-hidden">
                    <img
                      src={scholar.image}
                      alt={`${scholar.name} – ${scholar.role} at Jamia Siddiqiyyah`}
                      className="w-full h-full object-cover"
                      loading={idx === 0 ? "eager" : "lazy"}
                      width={600} height={400}
                      itemProp="image"
                    />
                  </div>
                  <div className="p-8">
                    <p className="text-secondary text-xs font-bold tracking-widest uppercase mb-2" itemProp="jobTitle">
                      {scholar.role}
                    </p>
                    <h3 className="font-display text-2xl font-bold text-primary italic mb-1" itemProp="name">
                      {scholar.name}
                    </h3>
                    <p className="text-on-surface-variant text-xs italic mb-4">{scholar.title}</p>
                    <p className="text-on-surface-variant text-sm leading-relaxed mb-6" itemProp="description">
                      {scholar.bio}
                    </p>
                    <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                      <span className="text-secondary text-sm">🎓</span>
                      <div>
                        <span className="text-xs font-bold text-primary block">Area of Expertise</span>
                        <span className="text-xs text-on-surface-variant" itemProp="knowsAbout">{scholar.specialty}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Faculty Roster */}
        <section className="py-20 bg-background-warm" aria-labelledby="faculty-heading">
          <div className="max-w-7xl mx-auto px-6 md:px-20">
            <div className="text-center mb-16">
              <span className="text-secondary font-semibold text-xs tracking-widest uppercase">Academic Faculty</span>
              <h2 id="faculty-heading" className="font-display text-3xl md:text-4xl text-primary italic font-bold mt-3">
                Senior Teaching Faculty
              </h2>
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mt-6" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {additionalFaculty.map((f, i) => (
                <article key={i} className="bg-white rounded-xl border border-primary/5 shadow-sm p-8" itemScope itemType="https://schema.org/Person">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-display text-xl font-bold shrink-0">
                      {f.name.split(" ")[0][0]}
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-primary italic" itemProp="name">{f.name}</h3>
                      <p className="text-secondary text-xs font-bold uppercase tracking-wider" itemProp="jobTitle">{f.role}</p>
                    </div>
                  </div>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-4" itemProp="description">{f.bio}</p>
                  <div className="space-y-2 pt-4 border-t border-primary/5">
                    <div className="flex items-start gap-2 text-xs text-on-surface-variant">
                      <span className="text-secondary font-bold shrink-0">🎓</span>
                      <span itemProp="knowsAbout"><strong className="text-primary">Specialty:</strong> {f.specialty}</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-on-surface-variant">
                      <span className="text-secondary font-bold shrink-0">📜</span>
                      <span><strong className="text-primary">Credential:</strong> {f.credential}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Isnad / Chain of Knowledge */}
        <section className="py-20 bg-primary text-white" aria-labelledby="isnad-heading">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <span className="text-secondary-fixed font-semibold text-xs tracking-widest uppercase block mb-4">Academic Integrity</span>
            <h2 id="isnad-heading" className="font-display text-3xl font-bold italic mb-6">
              The Unbroken Chain: Isnad
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              Every scholar at Jamia Siddiqiyyah possesses a verified <strong className="text-white">Isnad</strong> —
              an unbroken chain of transmission of Islamic knowledge connecting each teacher to
              their teacher, and so on, back to the Companions of the Prophet Muhammad ﷺ.
              This makes Jamia Siddiqiyyah one of the most credentialed Islamic institutes in the world.
            </p>
            <p className="text-white/60 text-sm">
              This level of scholarly authentication is recognized by Al-Azhar University, Wifaq ul Madaris Al-Arabia,
              Darul Uloom Deoband, and other major global Islamic academic bodies.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-background-warm text-center">
          <div className="max-w-xl mx-auto px-6">
            <h2 className="font-display text-2xl text-primary italic font-bold mb-4">
              Study Under Our Scholars
            </h2>
            <p className="text-on-surface-variant text-sm mb-8">
              Apply for one of our Islamic programs and learn directly from scholars with verified Isnad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/programs" className="bg-primary text-white px-8 py-4 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-opacity-90 transition-all shadow-md">
                View Programs →
              </Link>
              <Link href="/apply" className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                Apply Now
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
