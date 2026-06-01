"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { 
  BookOpen, 
  GraduationCap, 
  Award, 
  Scale, 
  Users, 
  CheckCircle, 
  Download, 
  HelpCircle, 
  Send, 
  Heart, 
  Mail, 
  MapPin, 
  Phone, 
  Shield, 
  Globe, 
  Play, 
  ArrowRight, 
  Book,
  Clock,
  ExternalLink,
  Menu,
  X,
  Sparkles,
  ChevronDown
} from "lucide-react";

import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import OrgMarquee from "@/components/OrgMarquee";
// Sub-components
import DonationImpactCalculator from "@/components/DonationImpactCalculator";
import TransparencyDashboard from "@/components/TransparencyDashboard";
import SupportersMap from "@/components/SupportersMap";
import QuranInspiration from "@/components/QuranInspiration";
import DonationCenter from "@/components/DonationCenter";
import CampusGallery from "@/components/CampusGallery";

// Data
import { 
  scholars, 
  programs, 
  timelineEvents, 
  testimonials, 
  resources, 
  faqs 
} from "@/data/mockData";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactData, setContactData] = useState({ name: "", email: "", message: "" });
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState("");

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    setContactError("");
    try {
      const { error } = await supabase.from("contacts").insert([
        {
          name: contactData.name,
          email: contactData.email,
          message: contactData.message,
          status: "new"
        }
      ]);
      if (error) throw error;
      setContactSuccess(true);
      setContactData({ name: "", email: "", message: "" });
      setTimeout(() => setContactSuccess(false), 5000);
    } catch (err: unknown) {
      setContactError((err as Error).message || "Failed to send message.");
    } finally {
      setContactLoading(false);
    }
  };

  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string>("seeker");
  const [activeVideo, setActiveVideo] = useState<string>("tour");

  // Counter animations using simple state interval on mount
  const [studentCount, setStudentCount] = useState(4800);
  const [teacherCount, setTeacherCount] = useState(50);
  const [scholarshipCount, setScholarshipCount] = useState(720);

  useEffect(() => {
    const studentTimer = setInterval(() => {
      setStudentCount((prev) => (prev < 5240 ? prev + 11 : 5240));
    }, 40);
    const teacherTimer = setInterval(() => {
      setTeacherCount((prev) => (prev < 78 ? prev + 1 : 78));
    }, 80);
    const scholarshipTimer = setInterval(() => {
      setScholarshipCount((prev) => (prev < 850 ? prev + 3 : 850));
    }, 30);

    return () => {
      clearInterval(studentTimer);
      clearInterval(teacherTimer);
      clearInterval(scholarshipTimer);
    };
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-primary/5 shadow-sm h-20 transition-all">
        <div className="flex justify-between items-center w-full px-6 md:px-20 max-w-7xl mx-auto h-full">
          <div className="font-display text-lg md:text-xl font-semibold tracking-[0.2em] text-primary uppercase cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Jamia Siddiqiyyah
          </div>

          <div className="hidden lg:flex space-x-8 items-center">
            <a href="#about" className="relative text-on-surface-variant hover:text-primary transition-colors text-xs uppercase tracking-widest font-semibold py-2 group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-secondary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#programs" className="relative text-on-surface-variant hover:text-primary transition-colors text-xs uppercase tracking-widest font-semibold py-2 group">
              Academics
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-secondary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#scholars" className="relative text-on-surface-variant hover:text-primary transition-colors text-xs uppercase tracking-widest font-semibold py-2 group">
              Scholars
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-secondary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#sponsor" className="relative text-on-surface-variant hover:text-primary transition-colors text-xs uppercase tracking-widest font-semibold py-2 group">
              Sponsor
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-secondary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#donation" className="relative text-on-surface-variant hover:text-primary transition-colors text-xs uppercase tracking-widest font-semibold py-2 group">
              Donation Center
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-secondary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#campus" className="relative text-on-surface-variant hover:text-primary transition-colors text-xs uppercase tracking-widest font-semibold py-2 group">
              Campus
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-secondary transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <a href="#donation" className="bg-primary text-white px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-opacity-95 transition-all shadow-sm active:scale-95">
              Donate
            </a>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-primary hover:bg-primary/5 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-20 left-0 right-0 bg-white border-b border-primary/5 p-6 space-y-4 shadow-xl flex flex-col z-50 lg:hidden">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-on-surface-variant hover:text-primary transition-colors text-xs uppercase tracking-widest font-semibold py-2">About</a>
            <a href="#programs" onClick={() => setMobileMenuOpen(false)} className="text-on-surface-variant hover:text-primary transition-colors text-xs uppercase tracking-widest font-semibold py-2">Academics</a>
            <a href="#scholars" onClick={() => setMobileMenuOpen(false)} className="text-on-surface-variant hover:text-primary transition-colors text-xs uppercase tracking-widest font-semibold py-2">Scholars</a>
            <a href="#sponsor" onClick={() => setMobileMenuOpen(false)} className="text-on-surface-variant hover:text-primary transition-colors text-xs uppercase tracking-widest font-semibold py-2">Sponsor</a>
            <a href="#donation" onClick={() => setMobileMenuOpen(false)} className="text-on-surface-variant hover:text-primary transition-colors text-xs uppercase tracking-widest font-semibold py-2">Donation Center</a>
            <a href="#campus" onClick={() => setMobileMenuOpen(false)} className="text-on-surface-variant hover:text-primary transition-colors text-xs uppercase tracking-widest font-semibold py-2">Campus</a>
          </div>
        )}
      </nav>

      {/* 1. Fullscreen Hero Section */}
        <header className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-center overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28 rounded-r-3xl border-r-4 border-primary/70" style={{boxShadow: '0 0 12px #00ffea'}}>
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover" 
            alt="Majestic Islamic architectural arches reflecting dusk light" 
            src="https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=1200"
          />
          <div className="absolute inset-0 hero-gradient"></div>
        </div>

        <div className="relative z-10 w-full px-6 md:px-20 max-w-7xl mx-auto text-white">
          <div className="max-w-4xl space-y-6">
            <span className="text-secondary-fixed font-bold tracking-[0.3em] text-[10px] md:text-xs uppercase block">
              THE CUSTODIANS OF SACRED HERITAGE
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.1] italic">
              Upholding the Unbroken Legacy of Knowledge &amp; Spiritual Excellence
            </h1>
            <p className="text-white/70 max-w-2xl text-sm md:text-base leading-relaxed">
              Jamia Siddiqiyyah is a world-class Islamic university and global endowment portal. We combine the rigorous transmission of classical sciences with contemporary research and charity integration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#donation" className="bg-secondary-fixed text-primary px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-white transition-all shadow-lg text-center">
                Support the Mission
              </a>
              <a href="#sponsor" className="border border-white/40 backdrop-blur-sm px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all text-center">
                Sponsor a Seeker
              </a>
            </div>
            
            {/* Quick counters inside Hero */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 border-t border-white/10 pt-8 mt-12 max-w-3xl">
              <div>
                <span className="block font-display text-2xl md:text-3xl text-secondary-fixed font-bold">{studentCount}+</span>
                <span className="text-[9px] text-white/50 tracking-wider font-semibold uppercase">Students Registered</span>
              </div>
              <div>
                <span className="block font-display text-2xl md:text-3xl text-secondary-fixed font-bold">{teacherCount}+</span>
                <span className="text-[9px] text-white/50 tracking-wider font-semibold uppercase">Senior Scholars</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="block font-display text-2xl md:text-3xl text-secondary-fixed font-bold">{scholarshipCount}+</span>
                <span className="text-[9px] text-white/50 tracking-wider font-semibold uppercase">Full Scholarships</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Organization Marquee Section */}
      <section className="py-14 bg-gradient-to-r from-background-warm via-surface-container/50 to-background-warm border-y border-primary/10 relative overflow-hidden">
        <div className="max-w-[90rem] mx-auto text-center relative z-10">
          <span className="font-display text-lg md:text-xl text-primary font-extrabold tracking-[0.25em] uppercase block mb-10">
            Recognized &amp; Accredited Globally
          </span>
          <div className="relative overflow-hidden w-full mask-gradient">
            <OrgMarquee />
          </div>
        </div>
        <div className="islamic-pattern absolute inset-0 opacity-10"></div>
      </section>

      {/* 3. Testimonials Carousel */}
      <TestimonialsCarousel />


      {/* 3. Quran & Hadith Inspiration Section */}
      <QuranInspiration />

      {/* 4. Global Impact Dashboard */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="islamic-pattern absolute inset-0 opacity-5"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
              <Users className="w-8 h-8 text-secondary-fixed mx-auto mb-4" />
              <h3 className="font-display text-3xl font-bold text-white italic mb-1">{studentCount}</h3>
              <p className="text-[9px] tracking-widest text-white/60 font-semibold uppercase">Active Students</p>
            </div>
            <div className="p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
              <Award className="w-8 h-8 text-secondary-fixed mx-auto mb-4" />
              <h3 className="font-display text-3xl font-bold text-white italic mb-1">5,240</h3>
              <p className="text-[9px] tracking-widest text-white/60 font-semibold uppercase">Alumni Graduated</p>
            </div>
            <div className="p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
              <Globe className="w-8 h-8 text-secondary-fixed mx-auto mb-4" />
              <h3 className="font-display text-3xl font-bold text-white italic mb-1">15+</h3>
              <p className="text-[9px] tracking-widest text-white/60 font-semibold uppercase">Countries Reached</p>
            </div>
            <div className="p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
              <Heart className="w-8 h-8 text-secondary-fixed mx-auto mb-4" />
              <h3 className="font-display text-3xl font-bold text-white italic mb-1">{scholarshipCount}</h3>
              <p className="text-[9px] tracking-widest text-white/60 font-semibold uppercase">Zakat Scholarships</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Why Jamia Siddiqiyyah */}
      <section className="py-24 bg-background-warm">
        <div className="max-w-7xl mx-auto px-6 md:px-20 space-y-16">
          <div className="text-center space-y-3">
            <span className="text-secondary font-semibold text-xs tracking-widest uppercase">Distinctive Legacy</span>
            <h2 className="font-display text-3xl md:text-4xl text-primary italic font-bold">A Synthesis of Tradition &amp; Excellence</h2>
            <div className="diamond-divider w-32 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-xl border border-primary/5 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-primary/5 border border-primary/10 rounded-lg flex items-center justify-center text-primary mb-6">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="font-display text-lg font-bold text-primary italic mb-3">Authentic Transmission</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Direct study of texts under teachers with verified traditional credentials (Isnad) connecting back generations.
              </p>
            </div>
            <div className="bg-white p-10 rounded-xl border border-primary/5 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-primary/5 border border-primary/10 rounded-lg flex items-center justify-center text-primary mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-display text-lg font-bold text-primary italic mb-3">Tazkiyah &amp; Character</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Emphasis on ethical growth, spiritual purification, and traditional Islamic etiquette (Adab) alongside academics.
              </p>
            </div>
            <div className="bg-white p-10 rounded-xl border border-primary/5 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-primary/5 border border-primary/10 rounded-lg flex items-center justify-center text-primary mb-6">
                <Globe className="w-6 h-6" />
              </div>
              <h4 className="font-display text-lg font-bold text-primary italic mb-3">Global Adaptability</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Preparing scholars to articulate core values and address complex modern social and financial issues.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. About / Heritage Section */}
      <section id="about" className="py-24 bg-surface-container-low border-t border-primary/5">
        <div className="max-w-7xl mx-auto px-6 md:px-20 space-y-16">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="w-full lg:w-1/2 space-y-6">
              <span className="text-secondary font-semibold text-xs tracking-widest uppercase">The Sanctuary Story</span>
              <h2 className="font-display text-3xl md:text-4xl text-primary italic font-bold">Preserving Sacred Knowledge Since 1994</h2>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Over the past three decades, Jamia Siddiqiyyah has grown from a humble sanctuary into a beacon of traditional Islamic studies. Our campus acts as a center of linguistic, theological, and legal research.
              </p>
              <div className="p-6 bg-white border border-primary/5 rounded-xl glass-card">
                <p className="font-display italic text-primary text-sm leading-relaxed">
                  &ldquo;Our mission is to maintain a pure environment where seekers of sacred sciences can access traditional mentorship and become leaders of spiritual guidance.&rdquo;
                </p>
                <span className="block text-[10px] text-secondary font-semibold tracking-wider uppercase mt-3">— Board of Trustees</span>
              </div>
            </div>

            {/* Timeline Layout */}
            <div className="w-full lg:w-1/2 relative border-l border-primary/10 pl-6 space-y-8 ml-4">
              {timelineEvents.map((event, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-sm" />
                  <span className="block font-display text-lg text-secondary font-bold italic mb-1">{event.year}</span>
                  <h5 className="font-bold text-primary text-sm mb-1">{event.title}</h5>
                  <p className="text-on-surface-variant text-xs leading-relaxed">{event.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Accreditations & Recognitions */}
      <section className="py-16 bg-white border-y border-primary/5">
        <div className="max-w-7xl mx-auto px-6 md:px-20 text-center space-y-8">
          <span className="text-xs font-semibold text-on-surface-variant tracking-wider uppercase">Accredited Core Alliances</span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-70">
            <div className="p-4 bg-background-warm rounded-lg border border-primary/5 font-display italic text-primary text-xs font-bold">Wifaq ul Madaris Arabia</div>
            <div className="p-4 bg-background-warm rounded-lg border border-primary/5 font-display italic text-primary text-xs font-bold">Al-Azhar Islamic Center</div>
            <div className="p-4 bg-background-warm rounded-lg border border-primary/5 font-display italic text-primary text-xs font-bold">Jamia Farooqia Karachi</div>
            <div className="p-4 bg-background-warm rounded-lg border border-primary/5 font-display italic text-primary text-xs font-bold">Darul Uloom Deoband</div>
          </div>
        </div>
      </section>

      {/* 8. Leadership & Scholars */}
      <section id="scholars" className="py-24 bg-background-warm">
        <div className="max-w-7xl mx-auto px-6 md:px-20 space-y-16">
          <div className="text-center space-y-3">
            <span className="text-secondary font-semibold text-xs tracking-widest uppercase">Senior Faculty</span>
            <h2 className="font-display text-3xl md:text-4xl text-primary italic font-bold">The Guardians of Knowledge</h2>
            <div className="diamond-divider w-32 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {scholars.map((scholar, idx) => (
              <div key={idx} className="group bg-white rounded-xl overflow-hidden border border-primary/5 shadow-md hover:shadow-xl transition-all duration-500">
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img 
                    src={scholar.image} 
                    alt={scholar.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white text-xs leading-relaxed italic">{scholar.bio}</p>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h4 className="font-display text-base font-bold text-primary italic">{scholar.name}</h4>
                  <p className="text-secondary text-[9px] font-bold tracking-widest uppercase mt-1.5">{scholar.role}</p>
                  <p className="text-on-surface-variant text-[11px] mt-1">{scholar.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Academic Programs */}
      <section id="programs" className="py-24 bg-surface-container-low border-t border-primary/5">
        <div className="max-w-7xl mx-auto px-6 md:px-20 space-y-16">
          <div className="text-center space-y-3">
            <span className="text-secondary font-semibold text-xs tracking-widest uppercase">Sacred Curricula</span>
            <h2 className="font-display text-3xl md:text-4xl text-primary italic font-bold">Traditional Pathways of Mastery</h2>
            <p className="text-on-surface-variant text-sm max-w-xl mx-auto">
              Curated pathways combining linguistic tools, jurisprudence frameworks, and prophetic narrations.
            </p>
            <div className="diamond-divider w-32 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((prog, idx) => (
              <div key={idx} className="group bg-white rounded-xl p-8 hover:bg-primary transition-all duration-500 border border-primary/5 shadow-md flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 bg-primary/5 group-hover:bg-white/10 rounded-lg flex items-center justify-center text-primary group-hover:text-secondary-fixed transition-colors">
                      {prog.iconName === "BookOpen" && <BookOpen className="w-5 h-5" />}
                      {prog.iconName === "Award" && <Award className="w-5 h-5" />}
                      {prog.iconName === "Languages" && <Globe className="w-5 h-5" />}
                      {prog.iconName === "Scale" && <Scale className="w-5 h-5" />}
                    </div>
                    {prog.badge && (
                      <span className="bg-secondary-fixed text-primary text-[8px] font-bold tracking-wider uppercase px-2 py-0.5 rounded">
                        {prog.badge}
                      </span>
                    )}
                  </div>

                  <h4 className="font-display text-lg font-bold text-primary group-hover:text-white italic mb-2 transition-colors">{prog.title}</h4>
                  <p className="text-on-surface-variant group-hover:text-white/70 text-xs leading-relaxed transition-colors">{prog.description}</p>
                  <ul className="mt-4 space-y-1.5">
                    {prog.curriculum.map((item, cIdx) => (
                      <li key={cIdx} className="text-[11px] text-on-surface-variant/70 group-hover:text-white/60 flex items-start gap-2 transition-colors">
                        <CheckCircle className="w-3 h-3 text-secondary group-hover:text-secondary-fixed shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-primary/5 group-hover:border-white/10 flex justify-between items-center text-xs">
                  <span className="text-[10px] text-secondary font-bold uppercase tracking-wider group-hover:text-secondary-fixed">
                    {prog.duration}
                  </span>
                  <Link href={`/apply?course=${encodeURIComponent(prog.title)}`} className="text-primary group-hover:text-secondary-fixed font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
                    Apply <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Online Academy Preview */}
      <section className="py-24 bg-background-warm">
        <div className="max-w-7xl mx-auto px-6 md:px-20">
          <div className="bg-primary text-white rounded-3xl p-8 md:p-14 border border-white/10 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row gap-12 items-center">
            <div className="islamic-pattern absolute inset-0 opacity-5"></div>
            
            <div className="w-full lg:w-1/2 space-y-6 relative z-10">
              <span className="text-secondary-fixed font-semibold text-xs tracking-widest uppercase block">Online Learning Academy</span>
              <h2 className="font-display text-3xl md:text-4xl text-white italic font-bold">The Virtual Sanctuary</h2>
              <p className="text-white/70 text-sm leading-relaxed">
                Can&apos;t join us in Medinah? Our premium online portal provides live interactive classes, structured homework tracks, and direct scheduling with master mentors.
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2 text-white/90">
                  <CheckCircle className="w-4 h-4 text-secondary-fixed shrink-0" />
                  Daily Interactive HD Live Sessions
                </li>
                <li className="flex items-center gap-2 text-white/90">
                  <CheckCircle className="w-4 h-4 text-secondary-fixed shrink-0" />
                  Access to 1,200+ Scanned Manuscripts
                </li>
                <li className="flex items-center gap-2 text-white/90">
                  <CheckCircle className="w-4 h-4 text-secondary-fixed shrink-0" />
                  Direct Mufti Consultations
                </li>
              </ul>
              <button className="bg-secondary-fixed text-primary px-8 py-3.5 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white transition-all shadow-md">
                Request Guest Pass
              </button>
            </div>

            {/* Dashboard Mockup */}
            <div className="w-full lg:w-1/2 relative z-10">
              <div className="bg-white/95 rounded-2xl shadow-2xl border border-white/20 p-6 text-on-surface space-y-4">
                <div className="flex justify-between items-center border-b border-primary/5 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-red-400"></span>
                    <span className="w-3.5 h-3.5 rounded-full bg-yellow-400"></span>
                    <span className="w-3.5 h-3.5 rounded-full bg-green-400"></span>
                  </div>
                  <span className="text-[10px] font-bold text-primary tracking-wider uppercase bg-primary/5 px-3 py-1 rounded-full">
                    Online Portal v2.4
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 flex justify-between items-center">
                    <div>
                      <span className="text-[9px] font-bold text-secondary uppercase tracking-widest">Active Course</span>
                      <h6 className="font-display text-sm font-bold text-primary italic">Al-Kafi in Usul al-Fiqh</h6>
                    </div>
                    <span className="text-xs font-semibold bg-white border border-primary/10 text-primary px-3 py-1 rounded-lg flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      08:00 AM
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-primary">Monthly Attendance</span>
                      <span className="font-bold text-secondary">94%</span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-secondary rounded-full" style={{ width: "94%" }} />
                    </div>
                  </div>

                  <div className="border-t border-primary/5 pt-4 flex justify-between items-center">
                    <span className="text-[10px] text-on-surface-variant font-medium">3 Homework tasks pending</span>
                    <button className="text-xs font-bold text-primary hover:text-secondary flex items-center gap-1">
                      Enter Lecture Hall <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 11. Student Success Stories */}
      <section className="py-24 bg-surface-container-low border-t border-primary/5">
        <div className="max-w-7xl mx-auto px-6 md:px-20 space-y-16">
          <div className="text-center space-y-3">
            <span className="text-secondary font-semibold text-xs tracking-widest uppercase">Student Success Stories</span>
            <h2 className="font-display text-3xl md:text-4xl text-primary italic font-bold">Graduates Reshaping Communities</h2>
            <div className="diamond-divider w-32 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 md:p-12 rounded-xl border border-primary/5 shadow-md flex flex-col justify-between">
              <div className="space-y-6">
                <span className="text-[9px] font-bold bg-primary/5 text-primary px-3 py-1 rounded-full uppercase tracking-wider inline-block">Case Study 1</span>
                <h4 className="font-display text-xl font-bold text-primary italic">Establishing Arabic Literacy in East Africa</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Upon graduating from the 8-year scholar track, Mufti Yusuf returned to Nairobi and established a local academy that currently sponsors over 400 orphan students.
                </p>
              </div>
              <div className="border-t border-primary/5 pt-6 mt-8 flex justify-between items-center text-xs">
                <span className="font-bold text-primary">Mufti Yusuf Njoroge</span>
                <span className="text-on-surface-variant/80">Class of 2019</span>
              </div>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-xl border border-primary/5 shadow-md flex flex-col justify-between">
              <div className="space-y-6">
                <span className="text-[9px] font-bold bg-primary/5 text-primary px-3 py-1 rounded-full uppercase tracking-wider inline-block">Case Study 2</span>
                <h4 className="font-display text-xl font-bold text-primary italic">Translating Classical Logic Texts</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Sister Aamina completed our advanced languages track and is now lead translator for an academic trust, scanning and cataloging historical manuscripts.
                </p>
              </div>
              <div className="border-t border-primary/5 pt-6 mt-8 flex justify-between items-center text-xs">
                <span className="font-bold text-primary">Sister Aamina Al-Sayed</span>
                <span className="text-on-surface-variant/80">Class of 2021</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Sponsor A Student & 13. Donation Impact Calculator */}
      <section id="sponsor" className="py-24 bg-background-warm relative">
        <div className="islamic-pattern absolute inset-0"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10 space-y-16">
          <div className="text-center space-y-3">
            <span className="text-secondary font-semibold text-xs tracking-widest uppercase">Ongoing Charity</span>
            <h2 className="font-display text-3xl md:text-4xl text-primary italic font-bold">Sponsor a Seeker of Knowledge</h2>
            <div className="diamond-divider w-32 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="font-display text-2xl md:text-3xl text-primary font-semibold italic">Secure Your Eternal Legacy</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                When a seeker of knowledge studies and teaches the sacred sciences, the reward extends to every individual who enabled their path. Sponsoring covers tuition, boarding in our residential wings, healthy hot meals, textbooks, and clinic access.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-secondary/15 flex items-center justify-center text-secondary font-bold text-xs">✓</span>
                  <span className="text-sm font-semibold text-primary">Direct student progress updates</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-secondary/15 flex items-center justify-center text-secondary font-bold text-xs">✓</span>
                  <span className="text-sm font-semibold text-primary">100% donation distribution pledge</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-secondary/15 flex items-center justify-center text-secondary font-bold text-xs">✓</span>
                  <span className="text-sm font-semibold text-primary">Shariah audit certified channels</span>
                </div>
              </div>
            </div>

            <DonationImpactCalculator />
          </div>
        </div>
      </section>

      {/* 14. Transparency Dashboard */}
      <section className="py-24 bg-surface-container-low border-t border-primary/5">
        <div className="max-w-7xl mx-auto px-6 md:px-20 space-y-16">
          <div className="text-center space-y-3">
            <span className="text-secondary font-semibold text-xs tracking-widest uppercase">Financial Audit</span>
            <h2 className="font-display text-3xl md:text-4xl text-primary italic font-bold">Transparency Dashboard</h2>
            <div className="diamond-divider w-32 mx-auto mt-4"></div>
          </div>
          <TransparencyDashboard />
        </div>
      </section>

      {/* 15. Global Supporters Map */}
      <section className="py-24 bg-background-warm">
        <div className="max-w-7xl mx-auto px-6 md:px-20 space-y-16">
          <div className="text-center space-y-3">
            <span className="text-secondary font-semibold text-xs tracking-widest uppercase">Community Reach</span>
            <h2 className="font-display text-3xl md:text-4xl text-primary italic font-bold">Global Supporters Map</h2>
            <div className="diamond-divider w-32 mx-auto mt-4"></div>
          </div>
          <SupportersMap />
        </div>
      </section>

      {/* 16. Monthly Giving Plans */}
      <section className="py-24 bg-surface-container-low border-t border-primary/5">
        <div className="max-w-7xl mx-auto px-6 md:px-20 space-y-16">
          <div className="text-center space-y-3">
            <span className="text-secondary font-semibold text-xs tracking-widest uppercase">Subscription Giving</span>
            <h2 className="font-display text-3xl md:text-4xl text-primary italic font-bold">Monthly Giving Plans</h2>
            <div className="diamond-divider w-32 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Plan 1 */}
            <div className={`bg-white rounded-xl p-8 border hover:shadow-xl transition-all ${selectedPlan === "scholar" ? "border-secondary" : "border-primary/5"}`}>
              <span className="text-[9px] font-bold text-secondary uppercase tracking-widest block mb-2">Tier 1</span>
              <h4 className="font-display text-xl font-bold text-primary italic">Seeker Supporter</h4>
              <p className="text-on-surface-variant text-xs mt-2 mb-6">Supports basic study materials and course books for 2 students.</p>
              <div className="font-display text-3xl font-bold text-primary italic mb-6">
                $35<span className="text-xs font-sans text-on-surface-variant font-normal">/mo</span>
              </div>
              <button 
                onClick={() => setSelectedPlan("seeker")}
                className={`w-full py-3.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${selectedPlan === "seeker" ? "bg-primary text-white" : "bg-primary/5 text-primary hover:bg-primary/10"}`}
              >
                Choose Plan
              </button>
            </div>
            {/* Plan 2 */}
            <div className={`bg-white rounded-xl p-8 border hover:shadow-xl transition-all relative ${selectedPlan === "scholar-gold" ? "border-secondary shadow-lg scale-105" : "border-primary/5"}`}>
              <div className="absolute top-0 right-6 transform -translate-y-1/2 bg-secondary text-white text-[8px] font-bold tracking-wider uppercase px-2.5 py-1 rounded">
                Popular
              </div>
              <span className="text-[9px] font-bold text-secondary uppercase tracking-widest block mb-2">Tier 2</span>
              <h4 className="font-display text-xl font-bold text-primary italic">Scholar Sponsor</h4>
              <p className="text-on-surface-variant text-xs mt-2 mb-6">Full scholarship covering meals, tuition, and boarding for 1 student.</p>
              <div className="font-display text-3xl font-bold text-primary italic mb-6">
                $150<span className="text-xs font-sans text-on-surface-variant font-normal">/mo</span>
              </div>
              <button 
                onClick={() => setSelectedPlan("scholar-gold")}
                className={`w-full py-3.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${selectedPlan === "scholar-gold" ? "bg-primary text-white" : "bg-primary/5 text-primary hover:bg-primary/10"}`}
              >
                Choose Plan
              </button>
            </div>
            {/* Plan 3 */}
            <div className={`bg-white rounded-xl p-8 border hover:shadow-xl transition-all ${selectedPlan === "class" ? "border-secondary" : "border-primary/5"}`}>
              <span className="text-[9px] font-bold text-secondary uppercase tracking-widest block mb-2">Tier 3</span>
              <h4 className="font-display text-xl font-bold text-primary italic">Classroom Patron</h4>
              <p className="text-on-surface-variant text-xs mt-2 mb-6">Sponsors class utilities, tech tools, and texts for an entire room.</p>
              <div className="font-display text-3xl font-bold text-primary italic mb-6">
                $450<span className="text-xs font-sans text-on-surface-variant font-normal">/mo</span>
              </div>
              <button 
                onClick={() => setSelectedPlan("class")}
                className={`w-full py-3.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${selectedPlan === "class" ? "bg-primary text-white" : "bg-primary/5 text-primary hover:bg-primary/10"}`}
              >
                Choose Plan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 17. Video Experience Center */}
      <section className="py-24 bg-background-warm">
        <div className="max-w-7xl mx-auto px-6 md:px-20 space-y-16">
          <div className="text-center space-y-3">
            <span className="text-secondary font-semibold text-xs tracking-widest uppercase">Video Center</span>
            <h2 className="font-display text-3xl md:text-4xl text-primary italic font-bold">Experience the Sanctuary</h2>
            <div className="diamond-divider w-32 mx-auto mt-4"></div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            <div className="w-full lg:w-2/3 aspect-video bg-primary rounded-2xl overflow-hidden relative border border-primary/15 shadow-xl flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800" 
                alt="Video preview background" 
                className="absolute inset-0 w-full h-full object-cover opacity-60" 
              />
              <div className="absolute inset-0 bg-primary/20 hover:bg-primary/10 transition-colors"></div>
              
              <button className="relative z-10 w-20 h-20 bg-secondary text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all">
                <Play className="w-8 h-8 fill-current ml-1" />
              </button>

              <div className="absolute bottom-6 left-6 text-white text-xs z-10 font-bold bg-primary/70 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10">
                {activeVideo === "tour" ? "Virtual Campus Tour" : "Scholarship Graduation Day"}
              </div>
            </div>

            <div className="w-full lg:w-1/3 space-y-4">
              <button 
                onClick={() => setActiveVideo("tour")}
                className={`w-full p-6 text-left rounded-xl border transition-all flex gap-4 ${activeVideo === "tour" ? "bg-white border-secondary shadow-md" : "border-primary/5 hover:bg-white/40"}`}
              >
                <div className="w-10 h-10 bg-primary/5 rounded flex items-center justify-center text-primary shrink-0">
                  <Play className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <h5 className="font-display font-bold text-primary italic text-sm">Virtual Campus Tour</h5>
                  <p className="text-[11px] text-on-surface-variant mt-1">Explore our classrooms, research libraries, and prayer halls.</p>
                </div>
              </button>

              <button 
                onClick={() => setActiveVideo("graduation")}
                className={`w-full p-6 text-left rounded-xl border transition-all flex gap-4 ${activeVideo === "graduation" ? "bg-white border-secondary shadow-md" : "border-primary/5 hover:bg-white/40"}`}
              >
                <div className="w-10 h-10 bg-primary/5 rounded flex items-center justify-center text-primary shrink-0">
                  <Play className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <h5 className="font-display font-bold text-primary italic text-sm">Graduation Ceremony</h5>
                  <p className="text-[11px] text-on-surface-variant mt-1">Watch senior graduates receive their classical certifications.</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 18. Campus Life Gallery */}
      <section id="campus" className="py-24 bg-surface-container-low border-t border-primary/5">
        <div className="max-w-7xl mx-auto px-6 md:px-20 space-y-16">
          <div className="text-center space-y-3">
            <span className="text-secondary font-semibold text-xs tracking-widest uppercase">Campus Life</span>
            <h2 className="font-display text-3xl md:text-4xl text-primary italic font-bold">Luxury Campus Gallery</h2>
            <div className="diamond-divider w-32 mx-auto mt-4"></div>
          </div>
          <CampusGallery />
        </div>
      </section>

      {/* 19. Testimonials */}
      <section className="py-24 bg-background-warm relative">
        <div className="islamic-pattern absolute inset-0"></div>
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center space-y-12">
          <span className="text-secondary font-semibold text-xs tracking-widest uppercase block">Endorsements</span>
          <h2 className="font-display text-3xl md:text-4xl text-primary italic font-bold">Trusted Globally</h2>
          
          <div className="bg-white border border-primary/5 rounded-2xl p-8 md:p-14 shadow-xl glass-card relative">
            <p className="font-display text-lg md:text-xl italic text-primary leading-relaxed">
              &ldquo;{testimonials[0].quote}&rdquo;
            </p>
            <div className="mt-8">
              <span className="block font-bold text-primary text-sm">{testimonials[0].author}</span>
              <span className="block text-[10px] text-on-surface-variant uppercase tracking-wider mt-1">
                {testimonials[0].role} — {testimonials[0].location}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 20. Knowledge Hub */}
      <section className="py-24 bg-surface-container-low border-t border-primary/5">
        <div className="max-w-7xl mx-auto px-6 md:px-20 space-y-16">
          <div className="text-center space-y-3">
            <span className="text-secondary font-semibold text-xs tracking-widest uppercase">Knowledge Hub</span>
            <h2 className="font-display text-3xl md:text-4xl text-primary italic font-bold">Recent Research &amp; Articles</h2>
            <div className="diamond-divider w-32 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl overflow-hidden border border-primary/5 shadow-md flex flex-col justify-between">
              <div className="p-6 space-y-4">
                <span className="text-[9px] font-bold text-secondary uppercase tracking-wider block">Jurisprudence</span>
                <h4 className="font-display text-base font-bold text-primary italic">Contemporary Islamic Finance Rules</h4>
                <p className="text-on-surface-variant text-xs leading-relaxed">Evaluating blockchain ledgers and smart contracts through the prism of classical Fiqh principles.</p>
              </div>
              <div className="p-6 border-t border-primary/5 text-xs text-on-surface-variant flex justify-between">
                <span>By Mufti Habibullah</span>
                <span>May 2026</span>
              </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden border border-primary/5 shadow-md flex flex-col justify-between">
              <div className="p-6 space-y-4">
                <span className="text-[9px] font-bold text-secondary uppercase tracking-wider block">History</span>
                <h4 className="font-display text-base font-bold text-primary italic">Preserving Fatimid Era Manuscripts</h4>
                <p className="text-on-surface-variant text-xs leading-relaxed">A summary of the recent digitization and scanning initiatives on our parchment libraries.</p>
              </div>
              <div className="p-6 border-t border-primary/5 text-xs text-on-surface-variant flex justify-between">
                <span>By Ustad Murtaza</span>
                <span>April 2026</span>
              </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden border border-primary/5 shadow-md flex flex-col justify-between">
              <div className="p-6 space-y-4">
                <span className="text-[9px] font-bold text-secondary uppercase tracking-wider block">Linguistics</span>
                <h4 className="font-display text-base font-bold text-primary italic">The Rhetoric of Quranic Arabic</h4>
                <p className="text-on-surface-variant text-xs leading-relaxed">An analytical study on how word sequence in classical poetry informs Quranic translations.</p>
              </div>
              <div className="p-6 border-t border-primary/5 text-xs text-on-surface-variant flex justify-between">
                <span>By Dr. Abdullah</span>
                <span>March 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 21. Free Resources Library */}
      <section className="py-24 bg-background-warm">
        <div className="max-w-7xl mx-auto px-6 md:px-20 space-y-16">
          <div className="text-center space-y-3">
            <span className="text-secondary font-semibold text-xs tracking-widest uppercase">Open Libraries</span>
            <h2 className="font-display text-3xl md:text-4xl text-primary italic font-bold">Free Resources Library</h2>
            <div className="diamond-divider w-32 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((res, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-primary/5 shadow-md flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold text-secondary uppercase tracking-wider">
                    <span>{res.category}</span>
                    <span className="bg-primary/5 text-primary px-2 py-0.5 rounded">{res.type}</span>
                  </div>
                  <h5 className="font-display font-semibold text-primary italic text-sm leading-snug">{res.title}</h5>
                </div>
                <div className="mt-6 pt-4 border-t border-primary/5 flex justify-between items-center text-[10px]">
                  <span className="text-on-surface-variant/80">{res.size} — {res.downloads} dl</span>
                  <button className="text-primary hover:text-secondary font-bold flex items-center gap-1">
                    <Download className="w-3.5 h-3.5" /> Get Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 22. Global Donation Center */}
      <section id="donation" className="py-24 bg-surface-container-low border-t border-primary/5 relative">
        <div className="islamic-pattern absolute inset-0"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10 space-y-16">
          <div className="text-center space-y-3">
            <span className="text-secondary font-semibold text-xs tracking-widest uppercase">Support Portal</span>
            <h2 className="font-display text-3xl md:text-4xl text-primary italic font-bold">Global Donation Center</h2>
            <div className="diamond-divider w-32 mx-auto mt-4"></div>
          </div>
          <DonationCenter />
        </div>
      </section>

      {/* 23. FAQ Section */}
      <section className="py-24 bg-background-warm">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-secondary font-semibold text-xs tracking-widest uppercase">Answers</span>
            <h2 className="font-display text-3xl md:text-4xl text-primary italic font-bold">Frequently Asked Questions</h2>
            <div className="diamond-divider w-32 mx-auto mt-4"></div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-primary/5 overflow-hidden shadow-sm">
                <button
                  onClick={() => setActiveFAQ(activeFAQ === idx ? null : idx)}
                  className="w-full p-6 text-left font-bold text-primary text-sm flex justify-between items-center"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeFAQ === idx ? "rotate-180" : ""}`} />
                </button>
                {activeFAQ === idx && (
                  <div className="p-6 pt-0 text-xs text-on-surface-variant leading-relaxed border-t border-primary/5 bg-surface-container-lowest">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 24. Contact Section */}
      <section className="py-24 bg-surface-container-low border-t border-primary/5">
        <div className="max-w-7xl mx-auto px-6 md:px-20 space-y-16">
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-primary/5 flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-10 md:p-16 space-y-8">
              <h2 className="font-display text-2xl md:text-3xl text-primary italic font-bold">Contact the Sanctuary</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-secondary shrink-0 mt-1" />
                  <div>
                    <h6 className="font-bold text-primary text-sm italic">Heritage Campus</h6>
                    <p className="text-on-surface-variant text-xs mt-1">123 Scholarly Road, Heritage District, Madinah, KSA</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-secondary shrink-0 mt-1" />
                  <div>
                    <h6 className="font-bold text-primary text-sm italic">Global Support</h6>
                    <p className="text-on-surface-variant text-xs mt-1">+966 12 345 6789 (AR/UR)<br />+44 20 7123 4567 (EN)</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-secondary shrink-0 mt-1" />
                  <div>
                    <h6 className="font-bold text-primary text-sm italic">Heritage Inquiries</h6>
                    <p className="text-on-surface-variant text-xs mt-1">legacy@jamiasiddiqiyyah.org</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 p-10 md:p-16 bg-primary/5 border-l border-primary/5">
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-primary/60">Full Name</label>
                    <input type="text" value={contactData.name} onChange={(e) => setContactData({...contactData, name: e.target.value})} placeholder="Ibrahim" className="w-full bg-white border border-primary/10 rounded-lg p-3 text-xs outline-none focus:ring-1 focus:ring-primary" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-primary/60">Email</label>
                    <input type="email" value={contactData.email} onChange={(e) => setContactData({...contactData, email: e.target.value})} placeholder="ibrahim@example.com" className="w-full bg-white border border-primary/10 rounded-lg p-3 text-xs outline-none focus:ring-1 focus:ring-primary" required />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-primary/60">Message</label>
                  <textarea rows={4} value={contactData.message} onChange={(e) => setContactData({...contactData, message: e.target.value})} placeholder="Your inquiry..." className="w-full bg-white border border-primary/10 rounded-lg p-3 text-xs outline-none focus:ring-1 focus:ring-primary resize-none" required></textarea>
                </div>
                
                {contactError && <div className="text-red-500 text-xs font-semibold">{contactError}</div>}
                {contactSuccess && <div className="text-green-600 text-xs font-semibold">Message sent successfully! We will get back to you soon.</div>}

                <button type="submit" disabled={contactLoading} className="w-full bg-primary text-white py-3.5 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-opacity-95 transition-all shadow-md disabled:opacity-70">
                  {contactLoading ? "Sending..." : "Send Inquiry"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 25. Newsletter Section */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="islamic-pattern absolute inset-0 opacity-5"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-6">
          <span className="text-secondary-fixed font-bold tracking-widest text-xs uppercase block">Stay Connected</span>
          <h2 className="font-display text-3xl font-bold italic">Subscribe to the Heritage Report</h2>
          <p className="text-white/70 text-sm max-w-md mx-auto leading-relaxed">
            Receive monthly updates on scan progress, public lectures, and new scholarly publications.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-secondary-fixed flex-1"
              required 
            />
            <button type="submit" className="bg-secondary-fixed text-primary px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-white transition-all">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* 26. Premium Footer */}
      <footer className="bg-primary text-white py-20 border-t border-white/10 relative overflow-hidden">
        <div className="islamic-pattern absolute inset-0 opacity-5"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10 grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="space-y-6">
            <h4 className="font-display text-xl font-bold italic text-secondary-fixed">Jamia Siddiqiyyah</h4>
            <p className="text-white/60 text-xs leading-relaxed italic">
              Dedicated to the authentic transmission of sacred Islamic sciences and the preservation of our collective legacy for over 30 years.
            </p>
          </div>

          <div className="space-y-4">
            <h6 className="text-[10px] font-bold tracking-widest uppercase text-white/50">Academic Paths</h6>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li><a href="#programs" className="hover:text-secondary-fixed transition-colors">Scholar Programs</a></li>
              <li><a href="#scholars" className="hover:text-secondary-fixed transition-colors">Senior Faculty</a></li>
              <li><a href="#campus" className="hover:text-secondary-fixed transition-colors">Research Library</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h6 className="text-[10px] font-bold tracking-widest uppercase text-white/50">Endowments</h6>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li><a href="#sponsor" className="hover:text-secondary-fixed transition-colors">Sponsor a Student</a></li>
              <li><a href="#donation" className="hover:text-secondary-fixed transition-colors">Zakat &amp; Sadaqah</a></li>
              <li><a href="#about" className="hover:text-secondary-fixed transition-colors">Waqf Trust Reports</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h6 className="text-[10px] font-bold tracking-widest uppercase text-white/50">Information</h6>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li><a href="#" className="hover:text-secondary-fixed transition-colors">Privacy Guidelines</a></li>
              <li><a href="#" className="hover:text-secondary-fixed transition-colors">Contact Registry</a></li>
              <li><a href="#" className="hover:text-secondary-fixed transition-colors">Terms of Sanctuary</a></li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-20 mt-16 pt-8 border-t border-white/5 relative z-10 text-center">
          <p className="text-white/40 text-[10px] uppercase tracking-[0.25em]">
            © {new Date().getFullYear()} Jamia Siddiqiyyah. Upholding the Sacred Chain of Scholarship.
          </p>
        </div>
      </footer>

    </div>
  );
}
