"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { BookOpen, Send, Loader2, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

function ApplyForm() {
  const searchParams = useSearchParams();
  const courseParam = searchParams.get("course") || "";

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: courseParam,
    background: "",
    intent: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const formattedMessage = `Application for Course: ${formData.course}

Educational Background:
${formData.background}

Intent & Goals:
${formData.intent}`;

    try {
      const { error } = await supabase.from("contacts").insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formattedMessage,
          status: "new",
        },
      ]);

      if (error) {
        throw error;
      }

      setSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white rounded-3xl p-8 md:p-16 border border-primary/5 shadow-2xl text-center max-w-2xl mx-auto space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-fixed/20 blur-3xl rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full -ml-32 -mb-32"></div>
        
        <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h2 className="font-display text-3xl font-bold text-primary italic">Application Received!</h2>
        <p className="text-on-surface-variant leading-relaxed">
          JazakAllah Khair for applying to the <strong>{formData.course}</strong> program at Jamia Siddiqiyyah. 
          Our academic admissions team will review your application and contact you soon.
        </p>
        <div className="pt-8">
          <Link href="/" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-primary-600 transition-all hover:shadow-lg hover:shadow-primary/20">
            <ArrowLeft className="w-4 h-4" /> Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 md:p-12 border border-primary/5 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-fixed/20 blur-3xl rounded-full -mr-32 -mt-32 pointer-events-none"></div>
      
      <div className="text-center space-y-3 mb-10">
        <span className="text-secondary font-semibold text-xs tracking-widest uppercase">Admissions</span>
        <h2 className="font-display text-3xl md:text-4xl text-primary italic font-bold">Course Application</h2>
        <p className="text-on-surface-variant text-sm max-w-xl mx-auto">
          Begin your journey of sacred knowledge. Please provide your details below to apply for the academic program.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-primary ml-1">Full Name *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full legal name"
              className="w-full bg-background-warm border border-primary/10 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/30 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-primary ml-1">Email Address *</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full bg-background-warm border border-primary/10 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/30 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-primary ml-1">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="Include country code (+1...)"
              className="w-full bg-background-warm border border-primary/10 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/30 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-primary ml-1">Program of Interest *</label>
            <div className="relative">
              <BookOpen className="absolute left-5 top-4 w-5 h-5 text-primary/40" />
              <input
                type="text"
                name="course"
                required
                value={formData.course}
                onChange={handleChange}
                placeholder="e.g. Alim Program"
                className="w-full bg-primary/5 border border-primary/10 rounded-xl pl-12 pr-5 py-4 text-sm font-semibold text-primary focus:outline-none focus:border-primary/30 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-primary ml-1">Educational Background</label>
          <textarea
            name="background"
            rows={3}
            value={formData.background}
            onChange={handleChange}
            placeholder="Briefly describe your previous Islamic and secular education..."
            className="w-full bg-background-warm border border-primary/10 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/30 transition-all resize-none"
          ></textarea>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-primary ml-1">Intent & Goals *</label>
          <textarea
            name="intent"
            rows={4}
            required
            value={formData.intent}
            onChange={handleChange}
            placeholder="Why do you wish to join this program? What do you hope to achieve?"
            className="w-full bg-background-warm border border-primary/10 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/30 transition-all resize-none"
          ></textarea>
        </div>

        {errorMsg && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 font-medium">
            {errorMsg}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary-600 text-white rounded-xl px-8 py-4 font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Submit Application <Send className="w-4 h-4 ml-1" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-background-warm pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/#programs" className="inline-flex items-center gap-2 text-primary hover:text-secondary-fixed text-xs font-bold uppercase tracking-widest mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Academics
        </Link>
        <Suspense fallback={
          <div className="bg-white rounded-3xl p-24 border border-primary/5 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        }>
          <ApplyForm />
        </Suspense>
      </div>
    </div>
  );
}
