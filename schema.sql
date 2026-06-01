-- SQL Migration Script for Jamia Siddiqiyyah Complete Database Schema
-- Run this script inside the Supabase SQL Editor to initialize all tables, types, triggers, and Row-Level Security (RLS) policies.

-- Enable UUID generator
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 1. TYPES & ENUMS
-- ==========================================
DO $$ 
BEGIN
  CREATE TYPE user_role AS ENUM ('super_admin', 'admin', 'editor', 'user');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ 
BEGIN
  CREATE TYPE payment_status_type AS ENUM ('pending', 'completed', 'failed', 'refunded');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ 
BEGIN
  CREATE TYPE course_level_type AS ENUM ('beginner', 'intermediate', 'advanced');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ 
BEGIN
  CREATE TYPE enrollment_status_type AS ENUM ('open', 'closed', 'upcoming');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ 
BEGIN
  CREATE TYPE contact_status_type AS ENUM ('new', 'read', 'archived', 'replied', 'resolved');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- ==========================================
-- 2. TABLES DEFINITIONS
-- ==========================================

-- 2.1 PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    country TEXT,
    role user_role DEFAULT 'user'::user_role,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2.2 DONATIONS TABLE
CREATE TABLE IF NOT EXISTS public.donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    donor_name TEXT NOT NULL,
    donor_email TEXT NOT NULL,
    donor_phone TEXT,
    country TEXT,
    donation_type TEXT NOT NULL, -- e.g. 'zakat', 'sadaqah', 'general', 'scholarship'
    amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
    currency TEXT DEFAULT 'USD' NOT NULL,
    payment_status payment_status_type DEFAULT 'pending'::payment_status_type NOT NULL,
    transaction_id TEXT UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2.3 TEACHERS (SCHOLARS) TABLE
CREATE TABLE IF NOT EXISTS public.teachers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    title TEXT, -- e.g. 'Dean of Hadith', 'Grand Mufti'
    role TEXT,  -- e.g. 'HEAD OF ACADEMICS'
    photo_url TEXT,
    qualification TEXT,
    specialization TEXT,
    experience TEXT,
    biography TEXT,
    languages TEXT[] DEFAULT '{}'::TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2.4 COURSES TABLE
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    thumbnail_url TEXT,
    description TEXT,
    level course_level_type DEFAULT 'beginner'::course_level_type NOT NULL,
    duration TEXT NOT NULL,
    teacher_id UUID REFERENCES public.teachers(id) ON DELETE SET NULL,
    price NUMERIC(10, 2) DEFAULT 0.00 NOT NULL CHECK (price >= 0),
    language TEXT DEFAULT 'Arabic' NOT NULL,
    enrollment_status enrollment_status_type DEFAULT 'open'::enrollment_status_type NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2.5 LMS ACADEMY: MODULES TABLE
CREATE TABLE IF NOT EXISTS public.modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2.6 LMS ACADEMY: LESSONS TABLE
CREATE TABLE IF NOT EXISTS public.lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id UUID REFERENCES public.modules(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    duration TEXT NOT NULL,
    video_url TEXT,
    resources JSONB DEFAULT '[]'::jsonb, -- Array of download links: [{title, url, size}]
    assignments TEXT,
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2.7 ENROLLMENTS TABLE
CREATE TABLE IF NOT EXISTS public.enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
    completed_lessons UUID[] DEFAULT '{}'::UUID[] NOT NULL,
    certificate_issued BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(profile_id, course_id)
);

-- 2.8 CONTACTS TABLE
CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    status contact_status_type DEFAULT 'new'::contact_status_type NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2.9 DYNAMIC WEBSITE CMS (cms_configs)
CREATE TABLE IF NOT EXISTS public.cms_configs (
    key TEXT PRIMARY KEY,
    content JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2.10 BLOG MANAGEMENT: ARTICLES TABLE
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    featured_image_url TEXT,
    category TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}'::TEXT[],
    is_featured BOOLEAN DEFAULT false NOT NULL,
    seo_title TEXT,
    seo_description TEXT,
    author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2.11 TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote TEXT NOT NULL,
    author TEXT NOT NULL,
    role TEXT NOT NULL,
    location TEXT NOT NULL,
    video_url TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2.12 FAQS TABLE
CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    order_index INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2.13 NEWSLETTER SUBSCRIBERS TABLE
CREATE TABLE IF NOT EXISTS public.subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);


-- ==========================================
-- 3. TRIGGERS & AUTOMATIONS
-- ==========================================

-- Trigger to auto-create user profiles when auth signup completes successfully
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', 'Student Seekers'),
    new.email,
    CASE 
      WHEN new.email = 'sardar@siddiqiyyah.com' THEN 'super_admin'::user_role -- Auto-upgrade seed user
      ELSE 'user'::user_role
    END
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ==========================================
-- 4. ROW-LEVEL SECURITY (RLS) POLICIES
-- ==========================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Helper Roles Check Function
CREATE OR REPLACE FUNCTION public.check_user_privilege(required_roles user_role[])
RETURNS BOOLEAN AS $$
DECLARE
  current_user_role user_role;
BEGIN
  SELECT role INTO current_user_role FROM public.profiles WHERE id = auth.uid();
  RETURN current_user_role = ANY(required_roles);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4.1 Profiles Policies
CREATE POLICY "Public profiles read access" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can edit own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admin write access on profiles" ON public.profiles FOR ALL USING (public.check_user_privilege(ARRAY['super_admin'::user_role, 'admin'::user_role]));

-- 4.2 Donations Policies
CREATE POLICY "Users can select own donations" ON public.donations FOR SELECT USING (auth.uid() = profile_id);
CREATE POLICY "Public anonymous insert donations" ON public.donations FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins full access on donations" ON public.donations FOR ALL USING (public.check_user_privilege(ARRAY['super_admin'::user_role, 'admin'::user_role]));

-- 4.3 Teachers, Courses, Modules, Lessons, Testimonials, FAQs Policies (Public read, Admins CRUD)
CREATE POLICY "Public read academic assets" ON public.teachers FOR SELECT USING (true);
CREATE POLICY "Public read courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Public read modules" ON public.modules FOR SELECT USING (true);
CREATE POLICY "Public read lessons" ON public.lessons FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Public read faqs" ON public.faqs FOR SELECT USING (true);

-- Admin edits for academies
CREATE POLICY "Admin write teachers" ON public.teachers FOR ALL USING (public.check_user_privilege(ARRAY['super_admin'::user_role, 'admin'::user_role, 'editor'::user_role]));
CREATE POLICY "Admin write courses" ON public.courses FOR ALL USING (public.check_user_privilege(ARRAY['super_admin'::user_role, 'admin'::user_role, 'editor'::user_role]));
CREATE POLICY "Admin write modules" ON public.modules FOR ALL USING (public.check_user_privilege(ARRAY['super_admin'::user_role, 'admin'::user_role, 'editor'::user_role]));
CREATE POLICY "Admin write lessons" ON public.lessons FOR ALL USING (public.check_user_privilege(ARRAY['super_admin'::user_role, 'admin'::user_role, 'editor'::user_role]));
CREATE POLICY "Admin write testimonials" ON public.testimonials FOR ALL USING (public.check_user_privilege(ARRAY['super_admin'::user_role, 'admin'::user_role, 'editor'::user_role]));
CREATE POLICY "Admin write faqs" ON public.faqs FOR ALL USING (public.check_user_privilege(ARRAY['super_admin'::user_role, 'admin'::user_role, 'editor'::user_role]));

-- 4.4 Enrollments Policies
CREATE POLICY "Users can track own enrollments" ON public.enrollments FOR SELECT USING (auth.uid() = profile_id);
CREATE POLICY "Users can join courses" ON public.enrollments FOR INSERT WITH CHECK (auth.uid() = profile_id);
CREATE POLICY "Users can update progress on own enrollment" ON public.enrollments FOR UPDATE USING (auth.uid() = profile_id);
CREATE POLICY "Admins full access on enrollments" ON public.enrollments FOR ALL USING (public.check_user_privilege(ARRAY['super_admin'::user_role, 'admin'::user_role]));

-- 4.5 Contact Submissions Policies
CREATE POLICY "Public contact submission" ON public.contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins full access on contacts" ON public.contacts FOR ALL USING (public.check_user_privilege(ARRAY['super_admin'::user_role, 'admin'::user_role, 'editor'::user_role]));

-- 4.6 Website CMS (cms_configs)
CREATE POLICY "Public read config settings" ON public.cms_configs FOR SELECT USING (true);
CREATE POLICY "Admins write config settings" ON public.cms_configs FOR ALL USING (public.check_user_privilege(ARRAY['super_admin'::user_role, 'admin'::user_role, 'editor'::user_role]));

-- 4.7 Blog / Articles Policies
CREATE POLICY "Public read articles" ON public.articles FOR SELECT USING (true);
CREATE POLICY "Admins write articles" ON public.articles FOR ALL USING (public.check_user_privilege(ARRAY['super_admin'::user_role, 'admin'::user_role, 'editor'::user_role]));

-- 4.8 Subscribers Policies
CREATE POLICY "Public email subscribe" ON public.subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins read subscribers list" ON public.subscribers FOR SELECT USING (public.check_user_privilege(ARRAY['super_admin'::user_role, 'admin'::user_role]));
