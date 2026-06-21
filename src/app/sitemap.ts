import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

const BASE_URL = "https://jamiasiddiqiyyah.eu.cc";
const LAST_MODIFIED = new Date("2026-06-12");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticSitemap: MetadataRoute.Sitemap = [
    // ── Core Pages ──────────────────────────────────────────────────────
    {
      url: BASE_URL,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1.0,
      images: [
        `${BASE_URL}/logo.png`,
        "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=1200",
      ],
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
      images: [`${BASE_URL}/scholars/habib.png`, `${BASE_URL}/scholars/fazal.png`],
    },
    {
      url: `${BASE_URL}/programs`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/scholars`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.85,
      images: [`${BASE_URL}/scholars/habib.png`, `${BASE_URL}/scholars/fazal.png`],
    },
    {
      url: `${BASE_URL}/donate`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/apply`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/insights`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.75,
    },

    // ── Programmes (deep links) ─────────────────────────────────────────
    {
      url: `${BASE_URL}/apply?course=Hifz+al-Quran`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/apply?course=Dars-e-Nizami+(Alim+Program)`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/apply?course=Arabic+Arts+%26+Calligraphy`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${BASE_URL}/apply?course=Ifta+Specialization+(Postgrad)`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.65,
    },

    // ── Trust / Legal Pages ─────────────────────────────────────────────
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.4,
    },

    // ── Campus Media (Video Sitemap) ────────────────────────────────────
    {
      url: `${BASE_URL}/campus`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
      images: [
        `${BASE_URL}/campus/WhatsApp Image 2026-06-01 at 16.35.31.jpeg`,
        `${BASE_URL}/campus/WhatsApp Image 2026-06-01 at 16.39.15.jpeg`,
      ],
      videos: [
        {
          title: "Jamia Siddiqiyyah Virtual Campus Tour",
          thumbnail_loc: `${BASE_URL}/campus/WhatsApp Image 2026-06-01 at 16.35.31.jpeg`,
          description:
            "A full virtual walk-through of the Jamia Siddiqiyyah campus, showcasing classrooms, research libraries, residential wings, and prayer halls.",
        },
        {
          title: "Jamia Siddiqiyyah Scholarship Graduation Ceremony",
          thumbnail_loc: `${BASE_URL}/campus/WhatsApp Image 2026-06-01 at 16.39.15.jpeg`,
          description:
            "The annual graduation ceremony honouring scholars who completed the Dars-e-Nizami and Hifz programs at Jamia Siddiqiyyah.",
        },
      ],
    },
  ];

  try {
    const { data: posts } = await supabase
      .from("articles")
      .select("slug, content, updated_at");

    if (posts && posts.length > 0) {
      const now = new Date();
      const dynamicSitemap = posts
        .filter((post) => {
          try {
            const decoded = JSON.parse(post.content);
            return decoded.status === "published" && new Date(decoded.published_at) <= now;
          } catch (e) {
            return true;
          }
        })
        .map((post) => {
          let decoded;
          try {
            decoded = JSON.parse(post.content);
          } catch (e) {}

          const lastMod = post.updated_at || decoded?.published_at;

          return {
            url: `${BASE_URL}/insights/${post.slug}`,
            lastModified: lastMod ? new Date(lastMod) : new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.8,
          };
        });

      return [...staticSitemap, ...dynamicSitemap];
    }
  } catch (err) {}

  return staticSitemap;
}
