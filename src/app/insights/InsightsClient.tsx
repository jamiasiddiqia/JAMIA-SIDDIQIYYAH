"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Search, 
  FileText, 
  Video, 
  Play, 
  Clock, 
  Tag, 
  Calendar, 
  ArrowRight,
  Heart,
  Share2,
  BookOpen
} from "lucide-react";

const CATEGORIES = [
  "All",
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

interface Post {
  id?: string;
  title: string;
  slug: string;
  content: string;
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

interface DecodedPost extends Post {
  decoded: DecodedContent;
}

export default function InsightsClient({ initialPosts }: { initialPosts: Post[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState<"all" | "article" | "video">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Decode content JSON for each post
  const posts: DecodedPost[] = initialPosts.map(post => {
    let decoded: DecodedContent;
    try {
      decoded = JSON.parse(post.content) as DecodedContent;
    } catch (e) {
      decoded = {
        post_type: "article",
        body: post.content || "",
        status: "published",
        published_at: post.created_at || new Date().toISOString(),
        seo_keywords: ""
      };
    }
    return { ...post, decoded };
  });

  // Calculate reading time for articles
  const calculateReadingTime = (body: string) => {
    const words = body.split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 220)); // avg reading speed
    return `${minutes} min read`;
  };

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesType = selectedType === "all" || post.decoded.post_type === selectedType;
    
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchLower) ||
      post.category.toLowerCase().includes(searchLower) ||
      post.decoded.body.toLowerCase().includes(searchLower) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchLower));

    return matchesCategory && matchesType && matchesSearch;
  });

  // Identify featured post for the top showcase
  // We only show the featured card if no search or category filter is active (to give clean search results)
  const isFiltering = searchQuery !== "" || selectedCategory !== "All" || selectedType !== "all";
  
  const featuredPost = posts.find(post => post.is_featured);
  const showcasePost = featuredPost || posts[0];

  // Exclude featured post from the grid if we are showing the featured card
  const gridPosts = (showcasePost && !isFiltering) 
    ? filteredPosts.filter(p => p.id !== showcasePost.id)
    : filteredPosts;

  const handleShare = (e: React.MouseEvent, slug: string, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/insights/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-12">
      {/* ── Search and Filter Controls Ribbon ─────────────────────── */}
      <div className="bg-white border border-primary/5 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-6 justify-between items-center relative z-20">
        {/* Search Input */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary/30" />
          <input
            type="text"
            placeholder="Search articles, Hadith studies, news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-background-warm/80 border border-primary/5 rounded-xl text-xs font-semibold focus:outline-none focus:border-primary/20 text-on-surface"
          />
        </div>

        {/* Type selector tabs */}
        <div className="flex p-1 bg-background-warm border border-primary/5 rounded-xl w-full md:w-auto shrink-0">
          <button
            onClick={() => setSelectedType("all")}
            className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
              selectedType === "all"
                ? "bg-white text-primary shadow-sm"
                : "text-on-surface-variant/60 hover:text-primary"
            }`}
          >
            All Insights
          </button>
          <button
            onClick={() => setSelectedType("article")}
            className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              selectedType === "article"
                ? "bg-white text-primary shadow-sm"
                : "text-on-surface-variant/60 hover:text-primary"
            }`}
          >
            <FileText className="w-3 h-3" />
            Articles
          </button>
          <button
            onClick={() => setSelectedType("video")}
            className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              selectedType === "video"
                ? "bg-white text-primary shadow-sm"
                : "text-on-surface-variant/60 hover:text-primary"
            }`}
          >
            <Video className="w-3 h-3" />
            Videos
          </button>
        </div>
      </div>

      {/* ── Category Horizontal Scroller ────────────────────────── */}
      <div className="relative z-10">
        <div className="flex gap-2 overflow-x-auto pb-3 pt-1 scrollbar-hide mask-gradient">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-3 rounded-full text-[9px] font-bold uppercase tracking-wider whitespace-nowrap transition-all border cursor-pointer shrink-0 ${
                selectedCategory === category
                  ? "bg-primary text-white border-primary shadow-sm"
                  : "bg-white text-primary border-primary/5 hover:bg-primary/5"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* ── Featured Showcase Card ─────────────────────────────── */}
      {showcasePost && !isFiltering && (
        <section className="relative z-10" aria-label="Featured content">
          <Link href={`/insights/${showcasePost.slug}`} className="block group">
            <div className="bg-white border border-primary/5 rounded-3xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-500 flex flex-col lg:flex-row min-h-[450px]">
              
              {/* Media Preview cover */}
              <div className="w-full lg:w-1/2 aspect-video lg:aspect-auto relative bg-background-warm overflow-hidden shrink-0">
                <img
                  src={showcasePost.featured_image_url || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1200"}
                  alt={showcasePost.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                />
                
                {/* Play icon overlay for videos */}
                {showcasePost.decoded.post_type === "video" && (
                  <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                    <div className="w-16 h-16 bg-secondary text-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform">
                      <Play className="w-6 h-6 fill-current ml-1" />
                    </div>
                  </div>
                )}

                {/* Badge for Type */}
                <div className="absolute top-6 left-6">
                  <span className={`inline-flex items-center gap-1 text-[8px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-md shadow-sm border ${
                    showcasePost.decoded.post_type === "video"
                      ? "bg-red-600 text-white border-red-500"
                      : "bg-primary text-white border-primary"
                  }`}>
                    {showcasePost.decoded.post_type === "video" ? <Video className="w-3.5 h-3.5" /> : <FileText className="w-3.5 h-3.5" />}
                    Featured {showcasePost.decoded.post_type}
                  </span>
                </div>
              </div>

              {/* Text descriptions */}
              <div className="p-8 md:p-12 flex flex-col justify-between flex-1 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-wider text-secondary">
                    <span>{showcasePost.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-secondary/60" />
                      {new Date(showcasePost.decoded.published_at).toLocaleDateString(undefined, { dateStyle: "medium" })}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl md:text-4xl text-primary font-bold italic leading-tight group-hover:text-secondary transition-colors">
                    {showcasePost.title}
                  </h3>

                  <p className="text-on-surface-variant/80 text-sm leading-relaxed line-clamp-4">
                    {showcasePost.decoded.body.replace(/[#*`]/g, "")}
                  </p>
                </div>

                <div className="border-t border-primary/5 pt-6 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-on-surface-variant/60 font-semibold">
                    {showcasePost.decoded.post_type === "article" ? (
                      <>
                        <Clock className="w-4 h-4" />
                        <span>{calculateReadingTime(showcasePost.decoded.body)}</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        <span>Watch Video Lecture</span>
                      </>
                    )}
                  </div>

                  <span className="text-[10px] text-primary group-hover:text-secondary font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors">
                    Read Full Post <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>

            </div>
          </Link>
        </section>
      )}

      {/* ── Posts Grid (Articles and Videos) ─────────────────────── */}
      <section className="space-y-8 relative z-10" aria-label="Latest Insights Grid">
        {isFiltering && (
          <h3 className="font-display text-lg font-bold text-primary italic border-b border-primary/5 pb-3">
            Search Results ({filteredPosts.length} posts found)
          </h3>
        )}

        {gridPosts.length === 0 ? (
          <div className="bg-white border border-primary/5 rounded-2xl py-20 text-center space-y-3 shadow-sm">
            <BookOpen className="w-12 h-12 text-primary/10 mx-auto" />
            <p className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">No insights found</p>
            <p className="text-[10px] text-on-surface-variant/40 font-semibold max-w-xs mx-auto leading-relaxed">
              We couldn't find any posts matching your filters. Try selecting another category or clearing search parameters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridPosts.map((post) => {
              const readTime = post.decoded.post_type === "article" ? calculateReadingTime(post.decoded.body) : "";
              const cleanSummary = post.decoded.body.substring(0, 140).replace(/[#*`]/g, "") + "...";

              return (
                <article 
                  key={post.id} 
                  className="bg-white border border-primary/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group"
                >
                  <Link href={`/insights/${post.slug}`} className="flex-1 flex flex-col">
                    {/* Cover Photo */}
                    <div className="aspect-video bg-background-warm overflow-hidden relative shrink-0">
                      <img
                        src={post.featured_image_url || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800"}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        loading="lazy"
                      />
                      
                      {/* Play button overlay for videos */}
                      {post.decoded.post_type === "video" && (
                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                          <div className="w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          </div>
                        </div>
                      )}

                      {/* Floating Category Badge */}
                      <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-primary text-[8px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded border border-primary/5 shadow-sm">
                        {post.category}
                      </span>
                    </div>

                    {/* Metadata body */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[8px] text-on-surface-variant/40 font-semibold uppercase tracking-widest">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-secondary/60" />
                            {new Date(post.decoded.published_at).toLocaleDateString(undefined, { dateStyle: "medium" })}
                          </span>
                          {post.decoded.post_type === "article" && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {readTime}
                            </span>
                          )}
                        </div>

                        <h4 className="font-display text-lg font-bold text-primary italic leading-snug group-hover:text-secondary transition-colors line-clamp-2">
                          {post.title}
                        </h4>

                        <p className="text-on-surface-variant/80 text-[11px] leading-relaxed line-clamp-3">
                          {cleanSummary}
                        </p>
                      </div>
                    </div>
                  </Link>

                  {/* Card Footer tags and share action */}
                  <div className="px-6 pb-6 pt-3 border-t border-primary/5 flex items-center justify-between">
                    <div className="flex gap-1 overflow-hidden max-w-[70%]">
                      {post.tags.slice(0, 2).map((tag, idx) => (
                        <span key={idx} className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-background-warm text-on-surface-variant/70 rounded-md text-[8px] font-semibold uppercase tracking-wider border border-primary/[0.03] truncate">
                          <Tag className="w-2.5 h-2.5 text-primary/30 shrink-0" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleShare(e, post.slug, post.id!)}
                        className="p-2 hover:bg-primary/5 text-primary/50 hover:text-primary rounded-lg transition-colors cursor-pointer"
                        title="Copy share link"
                      >
                        {copiedId === post.id ? (
                          <span className="text-[8px] text-secondary font-bold uppercase tracking-wider">Copied</span>
                        ) : (
                          <Share2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
