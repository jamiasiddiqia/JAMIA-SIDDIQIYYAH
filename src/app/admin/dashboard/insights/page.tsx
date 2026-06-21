"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Save, 
  Trash2, 
  Plus, 
  Loader2, 
  CheckCircle,
  Video, 
  FileText, 
  Image as ImageIcon, 
  Tag, 
  Globe, 
  Calendar, 
  Edit3, 
  Eye, 
  Play, 
  ArrowLeft,
  X,
  Upload,
  Link2,
  Sparkles,
  ChevronDown,
  AlertTriangle
} from "lucide-react";

// Categories definition
const CATEGORIES = [
  "Quran & Tafsir",
  "Hadith Studies",
  "Islamic Education",
  "Islamic Courses",
  "Dawah",
  "Islamic History",
  "Islamic Lifestyle",
  "Ramadan & Fasting",
  "Hajj & Umrah",
  "Charity & Donations",
  "Institute News & Updates"
];

interface Profile {
  id: string;
  full_name: string;
  role: string;
}

interface Post {
  id?: string;
  title: string;
  slug: string;
  content: string; // Will store serialized JSON string
  featured_image_url: string;
  category: string;
  tags: string[];
  is_featured: boolean;
  seo_title: string;
  seo_description: string;
  author_id: string;
  created_at?: string;
  updated_at?: string;
}

// Interface for the decoded JSON content
interface DecodedContent {
  post_type: "article" | "video";
  body: string;
  status: "draft" | "published";
  published_at: string;
  seo_keywords: string;
  image_gallery?: string[];
  video_url?: string;
  youtube_id?: string;
}

export default function InsightsManager() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentAdminId, setCurrentAdminId] = useState<string>("");
  const [view, setView] = useState<"list" | "form">("list");
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [tags, setTags] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [authorId, setAuthorId] = useState("");
  
  // Custom states that go inside the serialized JSON
  const [postType, setPostType] = useState<"article" | "video">("article");
  const [bodyContent, setBodyContent] = useState("");
  const [postStatus, setPostStatus] = useState<"draft" | "published">("published");
  const [publishedAt, setPublishedAt] = useState(new Date().toISOString().substring(0, 16)); // YYYY-MM-DDTHH:MM
  const [seoKeywords, setSeoKeywords] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [youtubeId, setYoutubeId] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [imageGallery, setImageGallery] = useState<string[]>([]);
  
  // SEO specific states
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");

  // Upload/Status states
  const [actionLoading, setActionLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const bucketName = "media-library";

  // Fetch all posts and profiles
  const fetchData = async () => {
    setLoading(true);
    try {
      // Get current user session
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setCurrentAdminId(session.user.id);
        setAuthorId(session.user.id);
      }

      // Fetch profiles
      const { data: profileData } = await supabase
        .from("profiles")
        .select("id, full_name, role")
        .in("role", ["super_admin", "admin", "editor"]);
      if (profileData) setProfiles(profileData);

      // Fetch articles
      const { data: articleData, error } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && articleData) {
        setPosts(articleData);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Failsafe bucket check
    const checkBucket = async () => {
      await supabase.storage.createBucket(bucketName, { public: true });
    };
    checkBucket();
    fetchData();
  }, []);

  // Helper to parse content JSON safely
  const decodeContent = (contentStr: string): DecodedContent => {
    try {
      const parsed = JSON.parse(contentStr);
      if (parsed && typeof parsed === "object" && "post_type" in parsed) {
        return parsed as DecodedContent;
      }
    } catch (e) {
      // Return a fallback if not a valid JSON string (migration failsafe)
    }
    return {
      post_type: "article",
      body: contentStr || "",
      status: "published",
      published_at: new Date().toISOString(),
      seo_keywords: ""
    };
  };

  // Helper to generate slug from title
  const generateSlugFromTitle = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleBlur = () => {
    if (!slug && title) {
      setSlug(generateSlugFromTitle(title));
    }
  };

  // Upload files to Supabase Storage
  const uploadToStorage = async (file: File, type: "image" | "gallery" | "video"): Promise<string | null> => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${type}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
      return data.publicUrl;
    } catch (err: any) {
      setErrorMsg(`Upload failed: ${err.message}`);
      return null;
    }
  };

  const handleFeaturedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploadingImage(true);
    setErrorMsg("");
    const url = await uploadToStorage(e.target.files[0], "image");
    if (url) setFeaturedImage(url);
    setUploadingImage(false);
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploadingGallery(true);
    setErrorMsg("");
    const files = Array.from(e.target.files);
    const urls: string[] = [];

    for (const file of files) {
      const url = await uploadToStorage(file, "gallery");
      if (url) urls.push(url);
    }

    setImageGallery(prev => [...prev, ...urls]);
    setUploadingGallery(false);
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploadingVideo(true);
    setErrorMsg("");
    const url = await uploadToStorage(e.target.files[0], "video");
    if (url) {
      setVideoUrl(url);
      setYoutubeId(""); // Clear youtube ID if file uploaded
    }
    setUploadingVideo(false);
  };

  const handleRemoveGalleryImage = (index: number) => {
    setImageGallery(prev => prev.filter((_, i) => i !== index));
  };

  // Save/Create Post
  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setMessage("");
    setErrorMsg("");

    const calculatedSlug = slug.trim() || generateSlugFromTitle(title);

    // Extract youtube ID if it's a youtube link
    let extractedYoutubeId = "";
    if (postType === "video" && videoUrl) {
      const ytMatch = videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
      if (ytMatch && ytMatch[1]) {
        extractedYoutubeId = ytMatch[1];
      }
    }

    // Structure the metadata inside the content field
    const decodedContent: DecodedContent = {
      post_type: postType,
      body: bodyContent,
      status: postStatus,
      published_at: new Date(publishedAt).toISOString(),
      seo_keywords: seoKeywords,
      ...(postType === "article" ? { image_gallery: imageGallery } : {}),
      ...(postType === "video" ? { video_url: videoUrl, youtube_id: extractedYoutubeId || youtubeId } : {})
    };

    const serializedContent = JSON.stringify(decodedContent);

    // Final SEO fields fallback
    const finalSeoTitle = seoTitle.trim() || title;
    const finalSeoDesc = seoDescription.trim() || bodyContent.substring(0, 150).replace(/[#*`\n]/g, "") + "...";

    const postData: Post = {
      title,
      slug: calculatedSlug,
      content: serializedContent,
      featured_image_url: featuredImage,
      category,
      tags: tags.split(",").map(t => t.trim()).filter(t => t !== ""),
      is_featured: isFeatured,
      seo_title: finalSeoTitle,
      seo_description: finalSeoDesc,
      author_id: authorId || currentAdminId,
      updated_at: new Date().toISOString()
    };

    try {
      let error;
      if (editingPostId) {
        // Edit existing post
        const { error: editErr } = await supabase
          .from("articles")
          .update(postData)
          .eq("id", editingPostId);
        error = editErr;
      } else {
        // Create new post
        postData.created_at = new Date().toISOString();
        const { error: createErr } = await supabase
          .from("articles")
          .insert([postData]);
        error = createErr;
      }

      if (error) {
        setErrorMsg(error.message);
      } else {
        setMessage(`Post ${editingPostId ? "updated" : "created"} successfully!`);
        setTimeout(() => {
          setView("list");
          fetchData();
          resetForm();
        }, 1500);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditPost = (post: Post) => {
    setEditingPostId(post.id || null);
    setTitle(post.title);
    setSlug(post.slug);
    setCategory(post.category);
    setTags(post.tags.join(", "));
    setIsFeatured(post.is_featured);
    setAuthorId(post.author_id);
    setFeaturedImage(post.featured_image_url);
    setSeoTitle(post.seo_title || "");
    setSeoDescription(post.seo_description || "");

    const decoded = decodeContent(post.content);
    setPostType(decoded.post_type);
    setBodyContent(decoded.body);
    setPostStatus(decoded.status);
    setPublishedAt(new Date(decoded.published_at).toISOString().substring(0, 16));
    setSeoKeywords(decoded.seo_keywords);
    
    if (decoded.post_type === "article") {
      setImageGallery(decoded.image_gallery || []);
      setVideoUrl("");
      setYoutubeId("");
    } else {
      setImageGallery([]);
      setVideoUrl(decoded.video_url || "");
      setYoutubeId(decoded.youtube_id || "");
    }

    setView("form");
  };

  const handleDeletePost = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this post?")) return;
    try {
      const { error } = await supabase
        .from("articles")
        .delete()
        .eq("id", id);
      if (!error) {
        fetchData();
        setMessage("Post deleted successfully.");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setErrorMsg(error.message);
      }
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  const resetForm = () => {
    setEditingPostId(null);
    setTitle("");
    setSlug("");
    setCategory(CATEGORIES[0]);
    setTags("");
    setIsFeatured(false);
    setAuthorId(currentAdminId);
    setPostType("article");
    setBodyContent("");
    setPostStatus("published");
    setPublishedAt(new Date().toISOString().substring(0, 16));
    setSeoKeywords("");
    setVideoUrl("");
    setYoutubeId("");
    setFeaturedImage("");
    setImageGallery([]);
    setSeoTitle("");
    setSeoDescription("");
    setErrorMsg("");
    setMessage("");
  };

  // Seeding Function
  const seedDemoData = async () => {
    setActionLoading(true);
    setErrorMsg("");
    setMessage("");

    const demoPosts: Post[] = [
      {
        title: "The Science of Tafsir: Understanding the Context of Revelation",
        slug: "understanding-tafsir-revelation-context",
        category: "Quran & Tafsir",
        tags: ["Quran", "Tafsir", "Revelation", "Scholarly Methodologies"],
        is_featured: true,
        seo_title: "Understanding Tafsir: Science of Quranic Exegesis | Jamia Siddiqiyyah",
        seo_description: "Explore the methodology of Tafsir. Learn how scholars analyze context (Asbab al-Nuzul) and classical rules to interpret the Holy Quran authentically.",
        author_id: currentAdminId || "de6f0787-c54d-4668-81a2-ab2e38df633a",
        featured_image_url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800",
        content: JSON.stringify({
          post_type: "article",
          body: `Tafsir is the scholarly science of interpreting the Holy Quran, seeking to uncover the true meanings and contexts of its verses. Rather than relying on personal opinions, classical Tafsir is built on a rigid framework that preserves the divine intent.\n\n### The Pillars of Classical Tafsir\n1. **Interpretation of Quran by Quran:** The highest form of Tafsir is where one verse clarifies another.\n2. **Tafsir by the Sunnah:** The actions, decisions, and words of the Prophet Muhammad ﷺ serve as the primary explanation of Quranic commands.\n3. **Statements of the Companions (Sahabah):** Those who witnessed the revelation firsthand hold unique authority on its context.\n4. **Arabic Linguistics:** Since the Quran was revealed in clear Arabic, the rules of grammar, rhetoric, and classical vocabulary form the structural boundaries of Tafsir.\n\n### The Importance of Asbab al-Nuzul\nAsbab al-Nuzul refers to the historical events or questions that prompted the revelation of specific verses. Understanding these contexts is crucial to preventing misinterpretation. For instance, verses of struggle or legal rulings cannot be divorced from their legislative history without risking grave misunderstandings. At Jamia Siddiqiyyah, our Quran and Tafsir program provides seekers of knowledge with direct chains of transmission, linking their understandings back to the great classical scholars of Islam.`,
          status: "published",
          published_at: new Date().toISOString(),
          seo_keywords: "Quran exegesis, Tafsir science, Asbab al-Nuzul, Islamic scholarship",
          image_gallery: [
            "https://images.unsplash.com/photo-1609599006353-e629e1d55138?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1584281729155-3c1b3c62f499?auto=format&fit=crop&q=80&w=800"
          ]
        })
      },
      {
        title: "Preserving the Sunnah: Hadith Authentication Methodology",
        slug: "preserving-sunnah-hadith-authentication-methodology",
        category: "Hadith Studies",
        tags: ["Hadith", "Sunnah", "Isnad", "Bukhari", "Authentication"],
        is_featured: false,
        seo_title: "How Hadith are Authenticated: The Science of Isnad | Jamia Siddiqiyyah",
        seo_description: "Delve into the rigorous science of Hadith authentication. Discover how traditional scholars categorized narrations using the chain of narrators (Isnad).",
        author_id: currentAdminId || "de6f0787-c54d-4668-81a2-ab2e38df633a",
        featured_image_url: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=800",
        content: JSON.stringify({
          post_type: "article",
          body: `The preservation of the Sunnah represents one of the most intellectually rigorous historical verification systems ever devised. At its heart lies the science of Hadith authentication, which guards the teachings of the Prophet ﷺ against fabrications.\n\n### The Anatomy of a Hadith\nEvery Hadith consists of two integral parts:\n1. **Isnad (The Chain of Narrators):** The chronological list of individuals who transmitted the narration from one generation to the next.\n2. **Matn (The Text):** The actual speech, action, or silent approval attributed to the Prophet ﷺ.\n\n### Criteria for Sahih (Authentic) Classification\nFor a Hadith to be classified as Sahih (sound/authentic), it must meet five strict conditions:\n- **Adalah (Integrity of Narrators):** Every narrator in the chain must be a practicing Muslim of upright moral character, free from open sins.\n- **Dabt (Accuracy of Retention):** Each narrator must possess a flawless memory or maintain written records verified by peers.\n- **Ittisal as-Sanad (Unbroken Chain):** There must be direct historical proof that each narrator actually met and heard the Hadith from the preceding narrator.\n- **Absence of Shadhdh (Irregularity):** The text or chain must not contradict narrations from more reliable or numerous authorities.\n- **Absence of Illah (Hidden Flaws):** The Hadith must be free from subtle defects that only a master scholar (Muhaddith) can identify.\n\nTraditional scholarship is not merely academic; it is spiritual. Sponsoring a student at Jamia Siddiqiyyah directly funds the training of future Muhadditheen who dedicate their lives to protecting the sacred Sunnah.`,
          status: "published",
          published_at: new Date().toISOString(),
          seo_keywords: "hadith authentication, chain of narrators, isnad science, sahih bukhari",
          image_gallery: []
        })
      },
      {
        title: "Tazkiyah in the Digital Age: Purifying the Spiritual Heart",
        slug: "tazkiyah-digital-age-purifying-spiritual-heart",
        category: "Islamic Lifestyle",
        tags: ["Tazkiyah", "Islamic Lifestyle", "Dhikr", "Mental Health"],
        is_featured: false,
        seo_title: "Tazkiyah in the Digital Age: Spiritual Purification | Jamia Siddiqiyyah",
        seo_description: "How to maintain spiritual focus (Tazkiyah) amidst digital distractions. Practical steps from Quran and Sunnah to guard the heart and mind.",
        author_id: currentAdminId || "de6f0787-c54d-4668-81a2-ab2e38df633a",
        featured_image_url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800",
        content: JSON.stringify({
          post_type: "article",
          body: `In an era defined by notifications, infinite scrolling, and digital noise, guarding the spiritual heart (Qalb) has never been more challenging yet critical. Tazkiyah — the Islamic science of self-purification and character development — offers a divine remedy for modern spiritual anxiety.\n\n### The Threat of Constant Distraction\nModern social media platforms are engineered to capture attention, often fostering envy, vanity, and a restless mind. In Islamic theology, the heart is like a vessel: if it is constantly filled with worldly noise, it leaves no room for the tranquility of divine remembrance (Dhikr).\n\n### Practical Steps to Spiritual Shielding\n1. **Digital Fasting:** Dedicate specific hours of the day (especially before Dawn / Fajr and after Sunset / Maghrib) to remain entirely offline. Use this time for reflection and reciting the Quran.\n2. **Conscious Consumption:** Guard the eyes and ears. What you watch and listen to directly impacts your spiritual state. Ask yourself: does this content draw me closer to Allah, or make me forgetful?\n3. **Daily Adhkar:** Maintain the morning and evening supplications taught by the Prophet ﷺ. They act as a fortress protecting the soul.\n4. **Fellowship (Suhbah):** Surround yourself with upright individuals. Our online academy community provides a supportive space for students worldwide to align, study, and grow together spiritually.`,
          status: "published",
          published_at: new Date().toISOString(),
          seo_keywords: "tazkiyah, spiritual purification, dhikr, islamic meditation, digital wellness",
          image_gallery: []
        })
      },
      {
        title: "The Legacy of Andalus: When Sacred and Empirical Sciences Met",
        slug: "legacy-andalus-sacred-empirical-sciences-meet",
        category: "Islamic History",
        tags: ["Islamic History", "Andalus", "Spain", "Coexistence", "Scholarship"],
        is_featured: false,
        seo_title: "Islamic Spain (Andalus): Legacy of Science & Scholarship | Jamia Siddiqiyyah",
        seo_description: "Discover the rich history of Al-Andalus. Learn how Islamic scholarship in Spain bridged traditional theology with mathematics, medicine, and astronomy.",
        author_id: currentAdminId || "de6f0787-c54d-4668-81a2-ab2e38df633a",
        featured_image_url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
        content: JSON.stringify({
          post_type: "article",
          body: `For nearly eight centuries, Al-Andalus (Islamic Spain) was the intellectual capital of the Western world. While Europe was locked in the Dark Ages, cities like Cordoba, Toledo, and Granada shone as sanctuaries of learning where sacred Islamic theology and empirical sciences thrived in harmony.\n\n### Bridging Knowledge Systems\nThe scholars of Andalus did not see a division between seeking knowledge of the Creator and seeking knowledge of His creation. Translators and philosophers like Ibn Rushd (Averroes) reconciled classical philosophy with Islamic revelation. Physicians like Al-Zahrawi (Albucasis) wrote encyclopedias that pioneered modern surgical tools and practices.\n\n### The Library of Cordoba\nAt its peak, Cordoba housed hundreds of public libraries, with the royal library containing over 400,000 cataloged manuscripts. Traditional scholars, mathematicians, botanists, and calligraphers worked side by side. This legacy teaches us that an authentic Islamic education is not insular; it is expansive, driving human civilization forward.\n\nToday, Jamia Siddiqiyyah strives to restore this holistic model of education, cultivating scholars who are deeply rooted in classical texts while engaging intelligently with the contemporary world.`,
          status: "published",
          published_at: new Date().toISOString(),
          seo_keywords: "al-andalus history, islamic Spain, science in Islam, Cordoba library",
          image_gallery: []
        })
      },
      {
        title: "The Virtues of Ramadan: The Inner Dimensions of Fasting",
        slug: "virtues-ramadan-inner-dimensions-fasting",
        category: "Ramadan & Fasting",
        tags: ["Ramadan", "Fasting", "Quran", "Charity", "Spirituality"],
        is_featured: false,
        seo_title: "The Virtues of Ramadan & Fasting: A Deep Spiritual Guide | Jamia",
        seo_description: "Explore the inner spiritual dimensions of fasting during the holy month of Ramadan. Learn how to maximize Zakat distribution, prayers, and Quran study.",
        author_id: currentAdminId || "de6f0787-c54d-4668-81a2-ab2e38df633a",
        featured_image_url: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=800",
        content: JSON.stringify({
          post_type: "article",
          body: `Ramadan is not merely a month of physical deprivation; it is a sacred school of spiritual transformation. While refraining from food and drink satisfies the external legal requirements of the fast, the true objective lies in attaining Taqwa (God-consciousness).\n\n### The Levels of Fasting\nAccording to the classical scholar Imam Al-Ghazali, fasting exists on three ascending planes:\n1. **The Fast of the General Public:** Abstaining from food, drink, and physical relations.\n2. **The Fast of the Select:** Keeping the eyes, ears, tongue, hands, and feet free from sin and useless speech.\n3. **The Fast of the Elite:** Guarding the mind and heart from worldly thoughts and focusing entirely on the remembrance of Allah.\n\n### Maximizing the Night of Power (Laylat al-Qadr)\nThe final ten nights of Ramadan contain Laylat al-Qadr, a night described by the Quran as better than a thousand months. To make the most of it, one should maintain continuous night prayers (Tahajjud), seek forgiveness, and donate generously. Sponsoring a student through Jamia Siddiqiyyah's Zakat portal during these nights multiplies the eternal rewards of charity.`,
          status: "published",
          published_at: new Date().toISOString(),
          seo_keywords: "virtues of ramadan, fasting inner meaning, laylat al-qadr, zakat donation",
          image_gallery: []
        })
      },
      {
        title: "Introduction to Classical Arabic Grammar (Nahw)",
        slug: "introduction-classical-arabic-grammar-nahw",
        category: "Islamic Education",
        tags: ["Arabic", "Grammar", "Nahw", "Linguistics"],
        is_featured: true,
        seo_title: "Learn Arabic Grammar: Introduction to Nahw | Jamia Siddiqiyyah",
        seo_description: "A professional video lecture introducing the foundations of classical Arabic grammar (Nahw). Essential first step to understanding Quranic linguistics.",
        author_id: currentAdminId || "de6f0787-c54d-4668-81a2-ab2e38df633a",
        featured_image_url: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=800",
        content: JSON.stringify({
          post_type: "video",
          body: "This introductory lecture outlines the history and core principles of Nahw (Arabic syntax), which is the key to unlocking the grammar of the Holy Quran. Led by our senior faculty deans, the course traces the evolution of Nahw from Abu al-Aswad al-Du'ali to the Basran and Kufan schools, showing how it protects Quranic recitation from errors and provides the absolute grammatical framework for Ifta and Tafsir studies.",
          status: "published",
          published_at: new Date().toISOString(),
          seo_keywords: "arabic grammar video, learn nahw, quranic linguistics, online madrasa lecture",
          video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          youtube_id: "dQw4w9WgXcQ"
        })
      },
      {
        title: "Practical Guide to Hajj & Umrah: Rites and Etiquettes",
        slug: "practical-guide-hajj-umrah-rites-etiquettes",
        category: "Hajj & Umrah",
        tags: ["Hajj", "Umrah", "Guide", "Pilgrimage"],
        is_featured: false,
        seo_title: "How to Perform Hajj and Umrah Step-by-Step | Jamia Siddiqiyyah",
        seo_description: "A comprehensive video guide explaining the step-by-step rites of Hajj and Umrah. Perfect for future pilgrims looking for spiritual and legal preparations.",
        author_id: currentAdminId || "de6f0787-c54d-4668-81a2-ab2e38df633a",
        featured_image_url: "https://images.unsplash.com/photo-1591604129939-f1efa4d8f7ec?auto=format&fit=crop&q=80&w=800",
        content: JSON.stringify({
          post_type: "video",
          body: "A step-by-step visual guide detailing the essential rites of Umrah and Hajj, from entering Ihram at the Miqat, performing Tawaf around the Kaaba, running Sa'i between Safa and Marwah, to the pivotal stay at Arafat. Sourced from classical jurisprudential texts, our Muftis break down common mistakes, health tips, and recommended supplications during this life-altering spiritual journey.",
          status: "published",
          published_at: new Date().toISOString(),
          seo_keywords: "hajj guide video, umrah step by step, pilgrim guide, tawaf and sai rules",
          video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          youtube_id: "dQw4w9WgXcQ"
        })
      },
      {
        title: "The Impact of Sadaqah: Securing Your Eternal Investment",
        slug: "impact-sadaqah-securing-eternal-investment",
        category: "Charity & Donations",
        tags: ["Charity", "Sadaqah", "Donations", "Eternal Reward"],
        is_featured: false,
        seo_title: "The Importance and Virtues of Sadaqah in Islam | Jamia Siddiqiyyah",
        seo_description: "Watch this video to understand the spiritual and social impact of charity (Sadaqah) in Islam. See how your donations secure an everlasting investment.",
        author_id: currentAdminId || "de6f0787-c54d-4668-81a2-ab2e38df633a",
        featured_image_url: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80&w=800",
        content: JSON.stringify({
          post_type: "video",
          body: "In this lecture, Mufti Fazal ur Rehman outlines the theological significance of Sadaqah and Waqf. Underlining how voluntary charity purifies wealth, averts trials, and serves as an ongoing source of reward (Sadaqah Jariyah) after death, the lecture illustrates how sponsoring seekers of knowledge at Jamia Siddiqiyyah creates a continuous cycle of knowledge transmission and spiritual impact.",
          status: "published",
          published_at: new Date().toISOString(),
          seo_keywords: "sadaqah jariyah video, charity in islam, zakat impact, support islamic education",
          video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          youtube_id: "dQw4w9WgXcQ"
        })
      }
    ];

    try {
      // Loop and insert posts
      let successCount = 0;
      for (const post of demoPosts) {
        const { error } = await supabase
          .from("articles")
          .insert([post]);
        if (!error) successCount++;
      }
      setMessage(`Seeded ${successCount} professional posts successfully!`);
      fetchData();
    } catch (err: any) {
      setErrorMsg(`Seeding error: ${err.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header ribbon */}
      <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="space-y-1">
          <h4 className="font-display font-bold text-primary text-base italic">Islamic Insights Content Hub CMS</h4>
          <p className="text-[9px] text-on-surface-variant/40 font-bold uppercase tracking-widest">
            Publish articles, video posts, schedule uploads, manage SEO metadata and organize media assets.
          </p>
        </div>

        <div className="flex gap-2 shrink-0">
          {view === "list" ? (
            <>
              {posts.length === 0 && (
                <button
                  onClick={seedDemoData}
                  disabled={actionLoading}
                  className="px-4.5 py-3 bg-secondary/10 text-secondary hover:bg-secondary/15 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-40"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Seed Demo Data
                </button>
              )}
              <button
                onClick={() => {
                  resetForm();
                  setView("form");
                }}
                className="px-6 py-3.5 bg-primary text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-opacity-95 transition-all cursor-pointer flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Add New Post
              </button>
            </>
          ) : (
            <button
              onClick={() => setView("list")}
              className="px-5 py-3 bg-background-warm text-primary border border-primary/5 hover:bg-primary/5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Cancel & Return
            </button>
          )}
        </div>
      </div>

      {message && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          {message}
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-bold flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          {errorMsg}
        </div>
      )}

      {/* Main content manager workspace */}
      {loading ? (
        <div className="py-20 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : view === "list" ? (
        // Post management list layout
        <div className="bg-white border border-primary/5 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-6 py-5 border-b border-primary/5 flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            <h4 className="font-display font-bold text-primary italic text-base">All Published and Draft Posts ({posts.length})</h4>
          </div>

          {posts.length === 0 ? (
            <div className="py-24 text-center space-y-3">
              <FileText className="w-12 h-12 text-primary/10 mx-auto" />
              <p className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">No posts created yet</p>
              <p className="text-[10px] text-on-surface-variant/40 font-semibold max-w-sm mx-auto leading-relaxed">
                Click "Add New Post" or "Seed Demo Data" above to start managing Islamic Insights articles and videos.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-background-warm/50 border-b border-primary/5 text-[9px] text-on-surface-variant/60 font-bold uppercase tracking-wider">
                    <th className="px-6 py-4">Title & Info</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Published Date</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/5 text-xs">
                  {posts.map((post) => {
                    const decoded = decodeContent(post.content);
                    const isPublished = decoded.status === "published";
                    const isScheduled = decoded.status === "published" && new Date(decoded.published_at) > new Date();

                    return (
                      <tr key={post.id} className="hover:bg-primary/[0.005] group">
                        <td className="px-6 py-4.5 max-w-md">
                          <div className="flex items-center gap-3">
                            {post.featured_image_url ? (
                              <img 
                                src={post.featured_image_url} 
                                alt="" 
                                className="w-12 h-8 object-cover rounded-md border border-primary/5 shrink-0 bg-background-warm"
                              />
                            ) : (
                              <div className="w-12 h-8 rounded-md border border-primary/5 shrink-0 bg-background-warm flex items-center justify-center text-[10px] font-bold text-on-surface-variant/40">
                                No Img
                              </div>
                            )}
                            <div className="truncate">
                              <p className="font-bold text-primary truncate" title={post.title}>
                                {post.title}
                              </p>
                              <span className="block text-[8px] text-on-surface-variant/40 truncate font-semibold uppercase tracking-wider">
                                Slug: {post.slug}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4.5 font-semibold text-on-surface-variant">
                          {post.category}
                        </td>
                        <td className="px-6 py-4.5">
                          <span className={`inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            decoded.post_type === "video" 
                              ? "bg-red-50 text-red-600 border border-red-100" 
                              : "bg-teal-50 text-teal-700 border border-teal-100"
                          }`}>
                            {decoded.post_type === "video" ? <Video className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                            {decoded.post_type}
                          </span>
                        </td>
                        <td className="px-6 py-4.5">
                          <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                            isScheduled
                              ? "bg-purple-50 text-purple-600 border-purple-100"
                              : isPublished
                              ? "bg-green-50 text-green-700 border-green-100"
                              : "bg-gray-50 text-gray-500 border-gray-200"
                          }`}>
                            {isScheduled ? "Scheduled" : isPublished ? "Published" : "Draft"}
                          </span>
                        </td>
                        <td className="px-6 py-4.5 text-on-surface-variant/80 font-medium">
                          {new Date(decoded.published_at).toLocaleDateString(undefined, {
                            dateStyle: "medium"
                          })}
                        </td>
                        <td className="px-6 py-4.5 text-right space-x-1.5 shrink-0">
                          <button
                            onClick={() => handleEditPost(post)}
                            className="p-2.5 bg-primary/5 border border-primary/10 text-primary hover:bg-primary/10 rounded-xl transition-colors cursor-pointer inline-flex items-center"
                            title="Edit Post"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeletePost(post.id!)}
                            className="p-2.5 bg-red-50 border border-red-100 text-red-600 hover:bg-red-100 rounded-xl transition-colors cursor-pointer inline-flex items-center"
                            title="Delete Post"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        // Add & Edit form workspace
        <form onSubmit={handleSavePost} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main settings column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-primary/5 rounded-2xl p-8 shadow-sm space-y-6">
              <div className="border-b border-primary/5 pb-4.5 flex items-center justify-between">
                <h4 className="font-display font-bold text-primary italic text-base">
                  {editingPostId ? "Modify Existing Content" : "Draft New Content"}
                </h4>
                
                {/* Post type toggler */}
                <div className="flex p-1 bg-background-warm border border-primary/5 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setPostType("article")}
                    className={`px-4.5 py-2 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                      postType === "article"
                        ? "bg-white text-primary shadow-sm"
                        : "text-on-surface-variant/60 hover:text-primary"
                    }`}
                  >
                    <FileText className="w-3 h-3" />
                    Article Post
                  </button>
                  <button
                    type="button"
                    onClick={() => setPostType("video")}
                    className={`px-4.5 py-2 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                      postType === "video"
                        ? "bg-white text-primary shadow-sm"
                        : "text-on-surface-variant/60 hover:text-primary"
                    }`}
                  >
                    <Video className="w-3 h-3" />
                    Video Post
                  </button>
                </div>
              </div>

              <div className="space-y-4 text-xs font-bold text-on-surface-variant/70">
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-wider block">Post Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Traditional Ethics in Modern Society"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={handleTitleBlur}
                    className="w-full px-4 py-3 bg-background-warm border border-primary/5 focus:border-primary/20 rounded-xl font-semibold focus:outline-none"
                  />
                </div>

                {/* Slug */}
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-wider block flex justify-between">
                    <span>Unique Slug Path</span>
                    <button 
                      type="button" 
                      onClick={() => setSlug(generateSlugFromTitle(title))}
                      className="text-[8px] text-secondary hover:underline cursor-pointer lowercase"
                    >
                      (regenerate)
                    </button>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. traditional-ethics-in-modern-society"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-4 py-3 bg-background-warm border border-primary/5 focus:border-primary/20 rounded-xl font-semibold focus:outline-none"
                  />
                </div>

                {/* Content Editor */}
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-wider block">
                    {postType === "article" ? "Article Body Content (Rich Markdown / Text)" : "Video Description Content"}
                  </label>
                  <textarea
                    rows={12}
                    required
                    placeholder={
                      postType === "article" 
                        ? "Write the full article text here. You can use markdown titles, bullet points, and clean paragraphs." 
                        : "Describe the video content and what viewers will learn."
                    }
                    value={bodyContent}
                    onChange={(e) => setBodyContent(e.target.value)}
                    className="w-full p-4 bg-background-warm border border-primary/5 focus:border-primary/20 rounded-xl font-semibold focus:outline-none leading-relaxed font-sans"
                  />
                </div>

                {/* Image Gallery (Articles only) */}
                {postType === "article" && (
                  <div className="space-y-2 border-t border-primary/5 pt-4">
                    <label className="text-[9px] uppercase tracking-wider block">Image Gallery</label>
                    <div className="flex gap-4 items-center">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        id="gallery-upload"
                        onChange={handleGalleryUpload}
                        disabled={uploadingGallery}
                        className="hidden"
                      />
                      <label
                        htmlFor="gallery-upload"
                        className="px-5 py-3 bg-background-warm hover:bg-primary/5 border border-primary/10 rounded-xl text-[10px] text-primary transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
                      >
                        {uploadingGallery ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Upload className="w-3.5 h-3.5" />
                        )}
                        Upload Gallery Images
                      </label>
                      <span className="text-[8px] text-on-surface-variant/40 font-semibold uppercase tracking-wider">
                        Upload slides for a carousel inside the article
                      </span>
                    </div>

                    {imageGallery.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                        {imageGallery.map((imgUrl, idx) => (
                          <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border border-primary/5 bg-background-warm group">
                            <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => handleRemoveGalleryImage(idx)}
                              className="absolute top-1 right-1 p-1 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors cursor-pointer"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Video specific inputs */}
                {postType === "video" && (
                  <div className="space-y-4 border-t border-primary/5 pt-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase tracking-wider block">Video Embed URL or YouTube Link</label>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                          value={videoUrl}
                          onChange={(e) => setVideoUrl(e.target.value)}
                          className="flex-1 px-4 py-3 bg-background-warm border border-primary/5 focus:border-primary/20 rounded-xl font-semibold focus:outline-none"
                        />
                        
                        <input
                          type="file"
                          accept="video/*"
                          id="video-file-upload"
                          onChange={handleVideoUpload}
                          disabled={uploadingVideo}
                          className="hidden"
                        />
                        <label
                          htmlFor="video-file-upload"
                          className="px-5 py-3.5 bg-background-warm hover:bg-primary/5 border border-primary/10 rounded-xl text-[10px] text-primary transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40 text-center shrink-0"
                        >
                          {uploadingVideo ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Upload className="w-3.5 h-3.5" />
                          )}
                          Or Upload MP4
                        </label>
                      </div>
                      <span className="block text-[8px] text-on-surface-variant/40 font-semibold uppercase tracking-wider mt-1">
                        Input a YouTube link to extract embed player, or upload an MP4 directly to Supabase storage.
                      </span>
                    </div>

                    {youtubeId && (
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-wider block">Extracted YouTube ID</label>
                        <input
                          type="text"
                          disabled
                          value={youtubeId}
                          className="w-full px-4 py-3 bg-background-warm/50 border border-primary/5 rounded-xl font-semibold text-on-surface-variant/50 focus:outline-none"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* SEO Settings Panel */}
            <div className="bg-white border border-primary/5 rounded-2xl p-8 shadow-sm space-y-6">
              <div className="border-b border-primary/5 pb-4 flex items-center gap-2">
                <Globe className="w-4.5 h-4.5 text-primary" />
                <h4 className="font-display font-bold text-primary italic text-base">Search Engine Optimization (SEO) & Tags</h4>
              </div>

              <div className="space-y-4 text-xs font-bold text-on-surface-variant/70">
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-wider block">Custom SEO Title</label>
                  <input
                    type="text"
                    placeholder="Defaults to Post Title if left blank"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-background-warm border border-primary/5 focus:border-primary/20 rounded-xl font-semibold focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-wider block">Custom Meta Description</label>
                  <textarea
                    rows={3}
                    placeholder="Defaults to first 150 characters of content body"
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    className="w-full p-4 bg-background-warm border border-primary/5 focus:border-primary/20 rounded-xl font-semibold focus:outline-none leading-relaxed"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-wider block">Custom SEO Keywords</label>
                  <input
                    type="text"
                    placeholder="e.g. quran tafsir, research, islamic education, jamia studies"
                    value={seoKeywords}
                    onChange={(e) => setSeoKeywords(e.target.value)}
                    className="w-full px-4 py-3 bg-background-warm border border-primary/5 focus:border-primary/20 rounded-xl font-semibold focus:outline-none"
                  />
                  <span className="block text-[8px] text-on-surface-variant/40 font-semibold uppercase tracking-wider mt-1">
                    Provide comma-separated keywords to help search crawlers index this page.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar publishing column */}
          <div className="space-y-6">
            {/* Save Action Card */}
            <div className="bg-white border border-primary/5 rounded-2xl p-8 shadow-sm space-y-6 h-fit">
              <div className="border-b border-primary/5 pb-4.5 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <h4 className="font-display font-bold text-primary italic text-base">Publish Settings</h4>
              </div>

              <div className="space-y-4 text-xs font-bold text-on-surface-variant/70">
                {/* Category Selection */}
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-wider block">Select Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-background-warm border border-primary/5 rounded-xl uppercase tracking-wider focus:outline-none text-[10px] font-bold"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Author Selection */}
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-wider block">Assign Author</label>
                  <select
                    value={authorId}
                    onChange={(e) => setAuthorId(e.target.value)}
                    className="w-full px-4 py-3 bg-background-warm border border-primary/5 rounded-xl uppercase tracking-wider focus:outline-none text-[10px] font-bold"
                  >
                    <option value="">Select Author...</option>
                    {profiles.map(p => (
                      <option key={p.id} value={p.id}>{p.full_name} ({p.role.replace("_", " ")})</option>
                    ))}
                  </select>
                </div>

                {/* Tag Input */}
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-wider block">Tags</label>
                  <div className="flex bg-background-warm border border-primary/5 rounded-xl p-1 items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-primary/30 shrink-0 ml-3" />
                    <input
                      type="text"
                      placeholder="e.g. quran, tafsir, research"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      className="flex-1 px-2 py-2.5 bg-transparent focus:outline-none font-semibold"
                    />
                  </div>
                  <span className="block text-[8px] text-on-surface-variant/40 font-semibold uppercase tracking-wider mt-1">
                    Provide comma-separated tags for filtering.
                  </span>
                </div>

                {/* Featured Toggle */}
                <div className="flex items-center justify-between p-4 bg-background-warm border border-primary/5 rounded-xl">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider block text-primary">Featured Post</label>
                    <span className="text-[8px] text-on-surface-variant/50 font-semibold uppercase tracking-wider">
                      Pins post to header showcase
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 rounded text-primary border-primary/10 focus:ring-0 cursor-pointer"
                  />
                </div>

                {/* Post Status (Draft/Published) */}
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-wider block">Post Status</label>
                  <div className="flex p-1 bg-background-warm border border-primary/5 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setPostStatus("draft")}
                      className={`flex-1 py-2.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        postStatus === "draft"
                          ? "bg-white text-primary shadow-sm border border-primary/5"
                          : "text-on-surface-variant/60 hover:text-primary"
                      }`}
                    >
                      Save Draft
                    </button>
                    <button
                      type="button"
                      onClick={() => setPostStatus("published")}
                      className={`flex-1 py-2.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        postStatus === "published"
                          ? "bg-white text-primary shadow-sm border border-primary/5"
                          : "text-on-surface-variant/60 hover:text-primary"
                      }`}
                    >
                      Publish
                    </button>
                  </div>
                </div>

                {/* Future Scheduling */}
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-wider block flex justify-between">
                    <span>Publish Date & Time</span>
                    <span className="text-[8px] text-secondary lowercase font-semibold uppercase tracking-wider">
                      (for scheduling)
                    </span>
                  </label>
                  <input
                    type="datetime-local"
                    value={publishedAt}
                    onChange={(e) => setPublishedAt(e.target.value)}
                    className="w-full px-4 py-3 bg-background-warm border border-primary/5 rounded-xl font-semibold focus:outline-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-primary/5 space-y-3">
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="w-full bg-primary text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-40"
                >
                  {actionLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving changes...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save & Apply Content
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Featured Image Card */}
            <div className="bg-white border border-primary/5 rounded-2xl p-8 shadow-sm space-y-6">
              <div className="border-b border-primary/5 pb-4 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-primary" />
                <h4 className="font-display font-bold text-primary italic text-base">Featured Asset Image</h4>
              </div>

              <div className="space-y-4 text-xs font-bold text-on-surface-variant/70">
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-wider block">Image URL / Link</label>
                  <input
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    value={featuredImage}
                    onChange={(e) => setFeaturedImage(e.target.value)}
                    className="w-full px-4 py-3 bg-background-warm border border-primary/5 focus:border-primary/20 rounded-xl font-semibold focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-wider block">Upload Image File</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      accept="image/*"
                      id="featured-image-upload"
                      onChange={handleFeaturedImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                    <label
                      htmlFor="featured-image-upload"
                      className="flex-1 px-5 py-3.5 bg-background-warm hover:bg-primary/5 border border-primary/10 rounded-xl text-[10px] text-primary transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40"
                    >
                      {uploadingImage ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Upload className="w-3.5 h-3.5" />
                      )}
                      Upload Featured Image
                    </label>
                  </div>
                </div>

                {featuredImage && (
                  <div className="border border-primary/5 rounded-xl overflow-hidden aspect-video bg-background-warm">
                    <img src={featuredImage} alt="Featured asset preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
