import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  Calendar, 
  Clock, 
  Tag, 
  User, 
  BookOpen, 
  Video, 
  Play, 
  ArrowLeft,
  ChevronRight,
  Sparkles
} from "lucide-react";
import ShareButtons from "./ShareButtons";

const BASE_URL = "https://jamiasiddiqiyyah.eu.cc";

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

interface PageParams {
  params: Promise<{ slug: string }>;
}

// Fetch single article helper
async function getPost(slug: string) {
  const { data } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single();
  return data;
}

// Fetch author profile helper
async function getAuthor(authorId: string) {
  if (!authorId) return null;
  const { data } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", authorId)
    .single();
  return data?.full_name || "Jamia Faculty";
}

// ── Dynamic Metadata Generation ───────────────────────────────────────────
export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found | Jamia Siddiqiyyah"
    };
  }

  let decoded: DecodedContent;
  try {
    decoded = JSON.parse(post.content);
  } catch (e) {
    decoded = {
      post_type: "article",
      body: post.content || "",
      status: "published",
      published_at: post.created_at || new Date().toISOString(),
      seo_keywords: ""
    };
  }

  const title = post.seo_title || `${post.title} | Jamia Siddiqiyyah`;
  const description = post.seo_description || decoded.body.substring(0, 155).replace(/[#*`\n]/g, "") + "...";
  const keywords = decoded.seo_keywords || post.tags.join(", ");

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${BASE_URL}/insights/${post.slug}`
    },
    openGraph: {
      type: decoded.post_type === "video" ? "video.other" : "article",
      url: `${BASE_URL}/insights/${post.slug}`,
      siteName: "Jamia Siddiqiyyah",
      title,
      description,
      images: [
        {
          url: post.featured_image_url || `${BASE_URL}/logo.png`,
          width: 1200,
          height: 630,
          alt: post.title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [post.featured_image_url || `${BASE_URL}/logo.png`]
    }
  };
}

// Custom parser to format body content text into structured HTML elements
const formatBody = (text: string) => {
  if (!text) return null;

  return text.split("\n\n").map((para, idx) => {
    const trimmed = para.trim();
    if (!trimmed) return null;

    // Header 3 (### Title)
    if (trimmed.startsWith("### ")) {
      return (
        <h3 key={idx}>
          {trimmed.replace("### ", "")}
        </h3>
      );
    }

    // Numbered list (1. item)
    if (/^\d+\.\s/.test(trimmed) || trimmed.match(/\n\d+\.\s/)) {
      const items = trimmed
        .split(/\n/)
        .map(line => line.replace(/^\d+\.\s+/, "").trim())
        .filter(Boolean);
      return (
        <ol key={idx} style={{ counterReset: "ol-counter", listStyle: "none", padding: 0, margin: "1.5rem 0 1.75rem 0" }}>
          {items.map((item, i) => {
            const parts = item.split("**");
            const content = parts.map((chunk, j) =>
              j % 2 === 1 ? <strong key={j}>{chunk}</strong> : chunk
            );
            return (
              <li key={i} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.7rem", alignItems: "flex-start" }}>
                <span style={{ minWidth: "1.5rem", height: "1.5rem", background: "var(--color-primary)", color: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 700, flexShrink: 0, marginTop: "0.18rem", fontFamily: "var(--font-sans)" }}>
                  {i + 1}
                </span>
                <span>{content}</span>
              </li>
            );
          })}
        </ol>
      );
    }

    // Unordered List (- List Item)
    if (trimmed.startsWith("- ") || trimmed.includes("\n- ")) {
      const items = trimmed
        .split(/(?:\r?\n)?-\s+/)
        .map(item => item.trim())
        .filter(Boolean);

      return (
        <ul key={idx}>
          {items.map((item, i) => {
            const parts = item.split("**");
            const content = parts.map((chunk, j) =>
              j % 2 === 1 ? <strong key={j}>{chunk}</strong> : chunk
            );
            return <li key={i}>{content}</li>;
          })}
        </ul>
      );
    }

    // Paragraph with inline bold format (**bold**)
    const parts = trimmed.split("**");
    const formattedPara = parts.map((chunk, i) => {
      if (i % 2 === 1) {
        return <strong key={i}>{chunk}</strong>;
      }
      return chunk;
    });

    return (
      <p key={idx}>
        {formattedPara}
      </p>
    );
  });
};

export default async function PostDetailPage({ params }: PageParams) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  // Parse structured JSON metadata
  let decoded: DecodedContent;
  try {
    decoded = JSON.parse(post.content);
  } catch (e) {
    decoded = {
      post_type: "article",
      body: post.content || "",
      status: "published",
      published_at: post.created_at || new Date().toISOString(),
      seo_keywords: ""
    };
  }

  // Double check scheduling/draft constraints for public views
  const now = new Date();
  const isDraft = decoded.status === "draft";
  const isScheduled = new Date(decoded.published_at) > now;
  if (isDraft || isScheduled) {
    notFound();
  }

  const authorName = await getAuthor(post.author_id);

  // Calculate Reading Time for Articles
  const wordCount = decoded.body.split(/\s+/).length;
  const readingTime = `${Math.max(1, Math.ceil(wordCount / 220))} min read`;

  // Fetch 3 related posts in the same category (excluding current)
  const { data: relatedRaw } = await supabase
    .from("articles")
    .select("id, title, slug, content, featured_image_url, category, tags, created_at")
    .eq("category", post.category)
    .neq("id", post.id)
    .order("created_at", { ascending: false })
    .limit(3);

  // Filter out drafts and future-scheduled posts from related items
  const relatedPosts = (relatedRaw || []).filter((rp) => {
    try {
      const dec = JSON.parse(rp.content);
      return dec.status === "published" && new Date(dec.published_at) <= now;
    } catch (e) {
      return true;
    }
  });

  // ── JSON-LD Structured Data Schema Markup ─────────────────────────────
  const schemaMarkup = decoded.post_type === "video" 
    ? {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "@id": `${BASE_URL}/insights/${post.slug}#video`,
        "name": post.title,
        "description": post.seo_description || decoded.body.substring(0, 150),
        "thumbnailUrl": post.featured_image_url || `${BASE_URL}/logo.png`,
        "uploadDate": decoded.published_at,
        "contentUrl": decoded.video_url || `${BASE_URL}/insights/${post.slug}`,
        "embedUrl": decoded.youtube_id ? `https://www.youtube.com/embed/${decoded.youtube_id}` : null,
        "publisher": {
          "@type": "Organization",
          "name": "Jamia Siddiqiyyah",
          "logo": {
            "@type": "ImageObject",
            "url": `${BASE_URL}/logo.png`
          }
        }
      }
    : {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": `${BASE_URL}/insights/${post.slug}#article`,
        "isPartOf": { "@id": `${BASE_URL}/insights#webpage` },
        "headline": post.title,
        "description": post.seo_description || decoded.body.substring(0, 150),
        "image": post.featured_image_url || `${BASE_URL}/logo.png`,
        "datePublished": decoded.published_at,
        "dateModified": post.updated_at || decoded.published_at,
        "author": {
          "@type": "Person",
          "name": authorName
        },
        "publisher": {
          "@type": "Organization",
          "name": "Jamia Siddiqiyyah",
          "logo": {
            "@type": "ImageObject",
            "url": `${BASE_URL}/logo.png`
          }
        },
        "mainEntityOfPage": `${BASE_URL}/insights/${post.slug}`
      };

  return (
    <>
      {/* Dynamic SEO schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <div className="min-h-screen bg-background-warm">
        {/* ── Fixed Navbar ──────────────────────────────────────── */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-primary/5 shadow-sm h-20 transition-all">
          <div className="flex justify-between items-center w-full px-6 md:px-20 max-w-7xl mx-auto h-full">
            <Link 
              href="/" 
              className="font-display text-lg md:text-xl font-semibold tracking-[0.2em] text-primary uppercase cursor-pointer"
            >
              Jamia Siddiqiyyah
            </Link>

            <div className="flex items-center gap-4">
              <Link 
                href="/insights" 
                className="text-on-surface-variant hover:text-primary transition-colors text-xs uppercase tracking-widest font-semibold"
              >
                ← Return to Insights
              </Link>
            </div>
          </div>
        </nav>

        {/* ── Breadcrumb ────────────────────────────────────────── */}
        <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-6 pt-28 pb-4">
          <ol className="flex flex-wrap items-center gap-1.5 text-[10px] text-on-surface-variant/70 uppercase font-semibold tracking-wider">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            </li>
            <li><ChevronRight className="w-3 h-3 opacity-30" /></li>
            <li>
              <Link href="/insights" className="hover:text-primary transition-colors">Insights</Link>
            </li>
            <li><ChevronRight className="w-3 h-3 opacity-30" /></li>
            <li>
              <span className="text-secondary/70 truncate max-w-[120px] md:max-w-none">{post.category}</span>
            </li>
            <li><ChevronRight className="w-3 h-3 opacity-30" /></li>
            <li aria-current="page" className="text-primary font-bold truncate max-w-[150px] md:max-w-none">
              {post.title}
            </li>
          </ol>
        </nav>

        {/* ── Main Content Container ─────────────────────────────── */}
        <main className="max-w-4xl mx-auto px-6 pb-24">
          <article className="bg-white border border-primary/5 rounded-3xl overflow-hidden shadow-sm p-6 md:p-12 space-y-8">
            {/* Header info */}
            <header className="space-y-4">
              <div className="flex flex-wrap items-center gap-4 text-[9px] font-bold uppercase tracking-wider text-secondary">
                <span className="px-2.5 py-1 bg-secondary/15 text-secondary rounded-md">
                  {post.category}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-secondary/60" />
                  {new Date(decoded.published_at).toLocaleDateString(undefined, { dateStyle: "medium" })}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  {decoded.post_type === "video" ? (
                    <>
                      <Video className="w-3.5 h-3.5 text-secondary/60" />
                      Video Lecture
                    </>
                  ) : (
                    <>
                      <Clock className="w-3.5 h-3.5 text-secondary/60" />
                      {readingTime}
                    </>
                  )}
                </span>
              </div>

              <h1 className="font-display text-3xl md:text-5xl font-bold text-primary leading-tight">
                {post.title}
              </h1>

              {/* Author info */}
              <div className="flex items-center gap-3 pt-2">
                <div className="w-9 h-9 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <span className="block text-[8px] text-on-surface-variant/40 font-bold uppercase tracking-widest leading-none">Published by</span>
                  <span className="text-xs font-bold text-primary">{authorName}</span>
                </div>
              </div>
            </header>

            {/* Video Player Section */}
            {decoded.post_type === "video" && (
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-lg border border-primary/5 relative">
                {decoded.youtube_id ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${decoded.youtube_id}?rel=0&autoplay=0`}
                    title={post.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : decoded.video_url ? (
                  <video
                    src={decoded.video_url}
                    controls
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-white/50 text-xs">
                    Video player unavailable
                  </div>
                )}
              </div>
            )}

            {/* Featured Image (Articles only) */}
            {decoded.post_type === "article" && post.featured_image_url && (
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-background-warm border border-primary/5 shadow-sm">
                <img
                  src={post.featured_image_url}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content Body */}
            <div className="article-body max-w-none border-b border-primary/5 pb-8">
              {formatBody(decoded.body)}
            </div>

            {/* Image Gallery Grid (Articles only) */}
            {decoded.post_type === "article" && decoded.image_gallery && decoded.image_gallery.length > 0 && (
              <div className="space-y-4 pt-4 border-b border-primary/5 pb-8">
                <h5 className="text-[10px] text-on-surface-variant/40 font-bold uppercase tracking-widest">Image Gallery</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {decoded.image_gallery.map((imgUrl, idx) => (
                    <div 
                      key={idx} 
                      className="aspect-video rounded-xl overflow-hidden border border-primary/5 bg-background-warm hover:shadow-md transition-shadow relative group cursor-pointer"
                    >
                      <img 
                        src={imgUrl} 
                        alt={`Gallery slide ${idx + 1}`} 
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" 
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags Badges */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2 border-b border-primary/5 pb-8">
                {(post.tags as string[]).map((tag: string, idx: number) => (
                  <span 
                    key={idx} 
                    className="inline-flex items-center gap-1 px-3 py-1 bg-background-warm text-on-surface-variant/80 rounded-md text-[9px] font-bold uppercase tracking-wider border border-primary/5"
                  >
                    <Tag className="w-3 h-3 text-secondary" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Share action buttons (Client side interactions) */}
            <ShareButtons title={post.title} slug={post.slug} />
          </article>

          {/* Related content grid */}
          {relatedPosts.length > 0 && (
            <footer className="mt-16 space-y-8">
              <div className="text-center space-y-2">
                <span className="text-secondary font-bold text-xs tracking-[0.2em] uppercase block">Recommended Reading</span>
                <h3 className="font-display text-2xl md:text-3xl text-primary italic font-bold">Related Insights</h3>
                <div className="diamond-divider w-24 mx-auto mt-4"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((rp) => {
                  let rpDecoded: DecodedContent;
                  try {
                    rpDecoded = JSON.parse(rp.content);
                  } catch (e) {
                    rpDecoded = {
                      post_type: "article",
                      body: rp.content,
                      status: "published",
                      published_at: rp.created_at,
                      seo_keywords: ""
                    };
                  }

                  const rpReadTime = rpDecoded.post_type === "article" 
                    ? `${Math.max(1, Math.ceil(rpDecoded.body.split(/\s+/).length / 220))} min read` 
                    : "Video Lecture";

                  return (
                    <article 
                      key={rp.id} 
                      className="bg-white border border-primary/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group"
                    >
                      <Link href={`/insights/${rp.slug}`} className="flex-1 flex flex-col">
                        <div className="aspect-video bg-background-warm overflow-hidden shrink-0 relative">
                          <img 
                            src={rp.featured_image_url || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600"} 
                            alt={rp.title} 
                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" 
                          />
                          {rpDecoded.post_type === "video" && (
                            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                              <div className="w-9 h-9 bg-secondary text-white rounded-full flex items-center justify-center shadow-md">
                                <Play className="w-4 h-4 fill-current ml-0.5" />
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                          <div className="space-y-1.5">
                            <span className="block text-[8px] text-secondary font-bold uppercase tracking-widest">{rp.category}</span>
                            <h4 className="font-display text-sm font-bold text-primary italic leading-snug group-hover:text-secondary transition-colors line-clamp-2">
                              {rp.title}
                            </h4>
                          </div>

                          <div className="flex items-center justify-between text-[8px] text-on-surface-variant/40 font-bold uppercase tracking-widest pt-2 border-t border-primary/5">
                            <span>{new Date(rpDecoded.published_at).toLocaleDateString(undefined, { dateStyle: "short" })}</span>
                            <span>{rpReadTime}</span>
                          </div>
                        </div>
                      </Link>
                    </article>
                  );
                })}
              </div>
            </footer>
          )}
        </main>
      </div>
    </>
  );
}
