import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// ── 1. MANUALLY LOAD ENV VARIABLES ──────────────────────────────────────────
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const k = trimmed.substring(0, idx).trim();
        let v = trimmed.substring(idx + 1).trim();
        // remove quotes if present
        if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
        if (v.startsWith("'") && v.endsWith("'")) v = v.slice(1, -1);
        process.env[k] = v;
      }
    }
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const apiBaseUrl = process.env.FREELLMAPI_BASE_URL;
const apiKey = process.env.FREELLMAPI_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing Supabase configuration inside .env.local");
  process.exit(1);
}
if (!apiBaseUrl || !apiKey) {
  console.error("❌ Missing FreeLLMAPI configuration inside .env.local");
  process.exit(1);
}

// Initialize Supabase Client with service role for full write permissions
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// ── 2. Helper to fetch embeddings from FreeLLMAPI ──────────────────────────
async function getEmbedding(text) {
  const sanitizedText = text.replace(/\n/g, ' ').trim();
  try {
    const res = await fetch(`${apiBaseUrl}/embeddings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'text-embedding-3-small',
        input: sanitizedText,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Embedding API error (Status ${res.status}): ${errText}`);
    }

    const json = await res.json();
    if (json.data && json.data[0] && json.data[0].embedding) {
      return json.data[0].embedding;
    }
    throw new Error(`Invalid response structure: ${JSON.stringify(json)}`);
  } catch (e) {
    console.error(`❌ Failed to get embedding for: "${text.substring(0, 40)}..."`, e.message);
    return null;
  }
}

// ── 3. Main Seeding & Ingestion Process ─────────────────────────────────────
async function main() {
  console.log("🚀 Starting Website Content RAG Ingestion Pipeline...");

  // Clear existing document embeddings to prevent duplication
  console.log("🧹 Clearing old site_documents...");
  const { error: deleteError } = await supabase.from('site_documents').delete().neq('id', 0);
  if (deleteError) {
    console.error("❌ Failed to clear site_documents. Make sure you ran the SQL script in your Supabase SQL editor!", deleteError);
    process.exit(1);
  }

  const documents = [];

  // A. STATIC CORE PAGES DATA
  documents.push({
    title: "About Jamia Siddiqiyyah",
    url_path: "/about",
    content: "Jamia Siddiqiyyah is a premier Islamic university, online madrasa, Quran academy, and Islamic charity platform founded in 1994. The institution focuses on a synthesis of traditional sacred knowledge transmission and character development (Tazkiyah). Located in the blessed city of Madinah, Saudi Arabia. It offers world-class online programs allowing students worldwide to learn traditional classical sciences including Arabic language, Fiqh, Hadith, Tafseer, and specialization in Islamic Jurisprudence (Ifta)."
  });

  documents.push({
    title: "Admissions and Applications",
    url_path: "/apply",
    content: "Admissions to Jamia Siddiqiyyah online programs are open to dedicated seekers of knowledge worldwide. To apply, prospective students must visit the online portal (/apply) and fill out the detailed application form including academic history, spiritual motivation, and program choice. Full and partial scholarships (covering tuition, textbooks, and resources) are available based on merit and financial need, sponsored by donor contributions. Basic entrance evaluations in Arabic reading and general Islamic knowledge are required for Dars-e-Nizami candidates."
  });

  documents.push({
    title: "Donation Center & Charitable Programs",
    url_path: "/donate",
    content: "Jamia Siddiqiyyah operates a 100% donation-delivery model with certified Shariah auditing. Donors can contribute through the secure online Donation Center (/donate). We accept Zakat, Sadaqah, Waqf (endowments), and student sponsorships. The primary campaigns include Student Sponsorship (covering a student's full tuition, board, lodging, meals, and textbooks), Quran Academy Support (sponsoring children learning Hifz), and Campus Development. All transactions are fully audited and verified."
  });

  documents.push({
    title: "Mission, Vision & Educational Values",
    url_path: "/about",
    content: "The mission of Jamia Siddiqiyyah is to protect and propagate the sacred inheritance of Islamic knowledge with intellectual rigor and spiritual purity. The values are centered on: 1. Authentic transmission (Isnad) linking back to the Prophet (PBUH). 2. Character building and tazkiyah, raising scholars who model prophetic mercy. 3. Practical application and modern relevance, preparing graduates to lead communities worldwide in Arabic literacy, logic, and Islamic law."
  });

  // B. DYNAMIC TEACHERS DATA
  console.log("📡 Fetching teachers list from Supabase...");
  const { data: teachers, error: teacherError } = await supabase.from('teachers').select('*');
  if (teacherError) {
    console.warn("⚠️ Warning: Could not fetch teachers table details:", teacherError.message);
  } else if (teachers && teachers.length > 0) {
    console.log(`✅ Loaded ${teachers.length} teachers from database.`);
    for (const t of teachers) {
      const bioText = t.biography || "";
      const specs = t.specialization ? `Specializing in ${t.specialization}` : "";
      const quals = t.qualification ? `Qualified from ${t.qualification}` : "";
      const text = `${t.name} is a scholar and faculty member at Jamia Siddiqiyyah serving as ${t.title || 'Instructor'} (${t.role || 'Faculty'}). ${quals}. ${specs}. Professional Experience: ${t.experience || 'Not listed'}. Biography: ${bioText}`;
      documents.push({
        title: `Faculty Biography: ${t.name}`,
        url_path: "/scholars",
        content: text
      });
    }
  }

  // C. DYNAMIC COURSES DATA
  console.log("📡 Fetching courses list from Supabase...");
  const { data: courses, error: courseError } = await supabase.from('courses').select('*, teachers(name)');
  if (courseError) {
    console.warn("⚠️ Warning: Could not fetch courses table details:", courseError.message);
  } else if (courses && courses.length > 0) {
    console.log(`✅ Loaded ${courses.length} courses from database.`);
    for (const c of courses) {
      const teacherName = c.teachers?.name ? `taught by ${c.teachers.name}` : "";
      const priceText = c.price > 0 ? `$${c.price}` : "Free / Scholarship Funded";
      const text = `Course: ${c.title}. Level: ${c.level || 'Beginner to Intermediate'}. Duration: ${c.duration || 'Flexible'}. Price: ${priceText}. Language: ${c.language || 'English'}. Enrollment: ${c.enrollment_status || 'Open'}. Description: ${c.description || ''} ${teacherName}`;
      documents.push({
        title: `Course Details: ${c.title}`,
        url_path: `/programs`,
        content: text
      });
    }
  }

  // D. DYNAMIC INSIGHTS DATA (ARTICLES & VIDEOS)
  console.log("📡 Fetching insights articles and lectures from Supabase...");
  const { data: articles, error: articleError } = await supabase.from('articles').select('*');
  if (articleError) {
    console.warn("⚠️ Warning: Could not fetch insights articles table:", articleError.message);
  } else if (articles && articles.length > 0) {
    console.log(`✅ Loaded ${articles.length} insights posts from database.`);
    for (const a of articles) {
      let bodyText = "";
      let type = "article";
      try {
        const decoded = JSON.parse(a.content);
        bodyText = decoded.body || "";
        type = decoded.post_type || "article";
      } catch (e) {
        bodyText = a.content || "";
      }

      // Clip long articles to 1000 characters for optimal embedding context
      const summary = bodyText.substring(0, 1200);
      const text = `Title: ${a.title}. Category: ${a.category || 'General'}. Tags: ${(a.tags || []).join(', ')}. Type: ${type}. Content summary: ${summary}`;
      documents.push({
        title: `Islamic Insights: ${a.title}`,
        url_path: `/insights/${a.slug}`,
        content: text
      });
    }
  }

  // ── 4. EMBED AND SAVE EACH DOCUMENT ───────────────────────────────────────
  console.log(`🔄 Generating embeddings and uploading ${documents.length} document chunks...`);
  let count = 0;
  for (const doc of documents) {
    // Generate the embedding vector
    const embedding = await getEmbedding(doc.content);
    if (!embedding) {
      console.log(`❌ Skipped document due to error: "${doc.title}"`);
      continue;
    }

    // Insert into database
    const { error: insertError } = await supabase.from('site_documents').insert({
      title: doc.title,
      content: doc.content,
      url_path: doc.url_path,
      embedding: embedding
    });

    if (insertError) {
      console.error(`❌ Failed to insert document "${doc.title}" into DB:`, insertError);
    } else {
      count++;
      console.log(`⚡ Embedded [${count}/${documents.length}]: "${doc.title}"`);
    }
  }

  console.log(`\n🎉 Ingestion completed successfully! Total ${count} records embedded in site_documents table.`);
}

main().catch(err => {
  console.error("❌ Ingestion pipeline encountered a fatal error:", err);
});
