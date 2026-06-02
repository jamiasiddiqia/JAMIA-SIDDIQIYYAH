export interface Scholar {
  name: string;
  title: string;
  role: string;
  bio: string;
  image: string;
  specialty: string;
}

export interface Quote {
  arabic: string;
  english: string;
  urdu: string;
  source: string;
}

export interface Program {
  title: string;
  description: string;
  duration: string;
  iconName: string;
  badge?: string;
  curriculum: string[];
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  location: string;
}

export interface Resource {
  title: string;
  type: string;
  size: string;
  downloads: string;
  category: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const scholars: Scholar[] = [
  {
    name: "Maulana Habibur Rehman",
    title: "Owner & Patron-in-Chief of Jamia Siddiqiyyah",
    role: "FOUNDER & OWNER",
    bio: "The visionary founder and owner of Jamia Siddiqiyyah. Over three decades of steering the institution towards spiritual excellence, authentic transmission of sacred knowledge, and global community service.",
    image: "/scholars/habib.png",
    specialty: "Sacred Patronage & Leadership"
  },
  {
    name: "Mufti Fazal ur Rehman",
    title: "Nazim-e-Aala (Director General)",
    role: "ACADEMIC & ADMIN DIRECTOR",
    bio: "A highly respected jurist and the Nazim-e-Aala of Jamia Siddiqiyyah. He directs the traditional Dars-e-Nizami curriculum, educational standards, and spiritual tazkiyah programs.",
    image: "/scholars/fazal.png",
    specialty: "Islamic Jurisprudence & Administration"
  }
];

export const quotes: Quote[] = [
  {
    arabic: "إِنَّ هَٰذَا الْقُرْآنَ يَهْدِي لِلَّتِي هِيَ أَقْوَمُ",
    english: "Verily, this Quran guides to that which is most upright.",
    urdu: "بیشک یہ قرآن وہ راستہ دکھاتا ہے جو سب سے سیدھا ہے۔",
    source: "Surah Al-Isra [17:9]"
  },
  {
    arabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
    english: "The best of you are those who learn the Quran and teach it.",
    urdu: "تم میں سے بہترین شخص وہ ہے جو قرآن سیکھے اور اسے دوسروں کو سکھائے۔",
    source: "Sahih Al-Bukhari"
  },
  {
    arabic: "يَرْفَعِ اللَّهُ الَّذِينَ آمَنُوا مِنكُمْ وَالَّذِينَ أُوتُوا الْعِلْمَ دَرَجَاتٍ",
    english: "Allah will raise those who have believed among you and those who were given knowledge, by degrees.",
    urdu: "اللہ تعالیٰ تم میں سے ان لوگوں کے درجات بلند کرے گا جو ایمان لائے اور جنہیں علم دیا گیا۔",
    source: "Surah Al-Mujadilah [58:11]"
  }
];

export const programs: Program[] = [
  {
    title: "Hifz al-Quran",
    description: "Rigorous memorization of the Quran with flawless Tajweed, pronunciation, and basic scriptural understanding.",
    duration: "3 Years",
    iconName: "BookOpen",
    badge: "Traditional",
    curriculum: ["Tajweed Rules (Makharij)", "Daily Memorization (Juz)", "Revision Cycles (Manzil)", "Quranic Arabic Basics"]
  },
  {
    title: "Dars-e-Nizami (Alim Program)",
    description: "Our flagship comprehensive scholar curriculum covering Arabic grammar, logic, jurisprudence, Tafsir, and Hadith studies.",
    duration: "8 Years",
    iconName: "Award",
    badge: "Elite Degree",
    curriculum: ["Sarf & Nahw (Grammar)", "Balaghah (Rhetoric)", "Usul al-Fiqh (Jurisprudence)", "Sihah al-Sittah (Hadith)"]
  },
  {
    title: "Arabic Arts & Calligraphy",
    description: "Deep study of traditional Arabic literature, linguistic history, and the sacred geometry of classical calligraphy.",
    duration: "2 Years",
    iconName: "Languages",
    curriculum: ["Classical Poetry", "Thuluth & Naskh Scripts", "Manuscript Preservation", "Modern Translation"]
  },
  {
    title: "Ifta Specialization (Postgrad)",
    description: "Advanced post-graduate research for producing qualified jurists capable of issuing legal guidelines on contemporary issues.",
    duration: "2 Years",
    iconName: "Scale",
    badge: "Research",
    curriculum: ["Comparative Fiqh", "Contemporary Finance", "Islamic Bioethics", "Fatawa Writing Methods"]
  }
];

export const timelineEvents: TimelineEvent[] = [
  {
    year: "1994",
    title: "The Humble Seed",
    description: "Established as a small sanctuary with only 12 students in a traditional courtyard campus."
  },
  {
    year: "2005",
    title: "Accreditation & Expansion",
    description: "Formally registered and accredited. Expanded campus facilities to house over 500 residential students."
  },
  {
    year: "2015",
    title: "Global Outreach",
    description: "Launched our international scholarship scheme, opening doors to seekers from Africa, Asia, and Europe."
  },
  {
    year: "2024",
    title: "The Digital Frontier",
    description: "Completed the state-of-the-art library wing and launched Online Academy previews for global learners."
  }
];

export const testimonials: Testimonial[] = [
  {
    quote: "Studying at Jamia Siddiqiyyah transformed not just my intellect, but my entire character. The presence of the scholars and their adherence to classical adab is unmatched.",
    author: "Hamza Farooq",
    role: "Dars-e-Nizami Graduate (Class of 2022)",
    location: "London, UK"
  },
  {
    quote: "By sponsoring a seeker through Jamia, I feel an immense spiritual connection. The transparency reports show exactly how every dollar directly funds education and housing.",
    author: "Mariam Al-Khalfan",
    role: "Global Endowment Partner",
    location: "Medinah, KSA"
  },
  {
    quote: "The Arabic Language program is rigorous yet deeply inspiring. The combination of grammar and calligraphic geometry gives students a rare, holistic classical education.",
    author: "Zayd Ibrahim",
    role: "Linguistics Student",
    location: "Toronto, Canada"
  }
];

export const resources: Resource[] = [
  {
    title: "Manual of Classical Arabic Syntax (Nahw)",
    type: "PDF",
    size: "4.8 MB",
    downloads: "12,450",
    category: "Linguistics"
  },
  {
    title: "Introduction to Islamic Jurisprudence (Fiqh)",
    type: "EPUB",
    size: "2.1 MB",
    downloads: "8,920",
    category: "Jurisprudence"
  },
  {
    title: "Selected Prophetic Prayers & Adhkar",
    type: "PDF",
    size: "1.2 MB",
    downloads: "24,800",
    category: "Spiritual Path"
  },
  {
    title: "The Unbroken Chain: A History of Hadith Transmission",
    type: "PDF",
    size: "8.5 MB",
    downloads: "6,710",
    category: "Hadith Studies"
  }
];

export const faqs: FAQItem[] = [
  {
    question: "What are the admission requirements for international students?",
    answer: "International students must present proof of secondary school completion, a character recommendation from an accredited local Islamic authority, and pass an online basic Arabic proficiency interview."
  },
  {
    question: "How is the Sponsor a Student program managed?",
    answer: "100% of student sponsorship goes directly toward their tuition, boarding in our residential wings, healthy daily meals, academic books, and basic healthcare. Donors receive bi-annual updates on their sponsored student's academic progress."
  },
  {
    question: "Is Jamia Siddiqiyyah accredited globally?",
    answer: "Yes, our Dars-e-Nizami and Advanced Ifta degrees are recognized by major Islamic universities worldwide, including partnerships with Al-Azhar University and Wifaq ul Madaris Al-Arabia."
  },
  {
    question: "Do you offer financial aid or full scholarships?",
    answer: "Over 85% of our residential students are on full scholarships covering all expenses, funded entirely by global zakat and endowment contributors."
  }
];

export const organizations = [
  {
    name: "Jamia Ashrafia Lahore",
    nameArabic: "جامعہ اشرفیہ لاہور",
    logo: "/logos/jamia_ashrafia.jpg",
  },
  {
    name: "Wifaq Ul Madaris",
    nameArabic: "وفاق المدارس العربية",
    logo: "/logos/wifaq_ul_madaris.jpg",
  },
  {
    name: "Jamia Farooqia Karachi",
    nameArabic: "جامعہ فاروقیہ کراچی",
    logo: "/logos/jamia_farooqia.jpg",
  },
  {
    name: "Al-Azhar University",
    nameArabic: "جامعة الأزهر الشريف",
    logo: "/logos/al_azhar.jpg",
  },
  {
    name: "Darul Uloom Deoband",
    nameArabic: "دار العلوم دیوبند",
    logo: "/logos/darul_uloom.jpg",
  },
  {
    name: "University of Sharjah",
    nameArabic: "جامعة الشارقة",
    logo: "/logo.png",
  },
];
