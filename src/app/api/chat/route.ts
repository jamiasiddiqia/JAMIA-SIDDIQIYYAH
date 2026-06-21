import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const apiBaseUrl = process.env.FREELLMAPI_BASE_URL!;
const apiKey = process.env.FREELLMAPI_KEY!;

// ── Static website knowledge base ─────────────────────────────────────────
const STATIC_CONTEXT = `
ABOUT JAMIA SIDDIQIYYAH:
Jamia Siddiqiyyah is a premier Islamic university, online madrasa, Quran academy, and Islamic charity founded in 1994. Located in Madinah, Saudi Arabia. It offers a synthesis of traditional sacred knowledge and modern education. Programs include Hifz, Dars-e-Nizami (Alim Course), Tajweed, Arabic Language, Arabic Calligraphy, and Ifta (Mufti Specialization). The website is at jamiasiddiqiyyah.eu.cc.

MISSION & VALUES:
The mission is to protect and propagate sacred Islamic knowledge with intellectual rigor and spiritual purity. Core values: 1. Authentic transmission (Isnad) tracing back to the Prophet (PBUH). 2. Character development (Tazkiyah) to raise scholars of prophetic mercy. 3. Global relevance — graduates lead communities worldwide.

PROGRAMS:
- Hifz Program: Quran memorization with Tajweed, open to children and adults.
- Dars-e-Nizami (Alim Course): 8-year comprehensive classical Islamic sciences program (Fiqh, Hadith, Tafseer, Arabic, Logic, Philosophy). Recognized by Al-Azhar and Wifaq ul Madaris.
- Ifta Specialization: Advanced Islamic jurisprudence for Alim graduates to qualify as Muftis.
- Arabic Language: From beginner to advanced; classical and modern standard Arabic.
- Tajweed & Quran Recitation: Online and residential classes.
- Arabic Calligraphy: Traditional Islamic art.

ADMISSIONS:
Apply at /apply on the website. Fill out the application form with academic history, motivation, and program choice. Basic entrance evaluation required for Dars-e-Nizami. Full and partial scholarships available based on merit and financial need. Over 85% of residential students are on full scholarships.

DONATIONS & CHARITY:
Donate at /donate. We accept: Zakat, Sadaqah, Waqf (endowments), and Student Sponsorships. 100% donation-delivery model with certified Shariah auditing. Key campaigns: Student Sponsorship (covers full tuition, board, lodging, meals, textbooks), Quran Academy Support, and Campus Development. Contact for donations: contact@jamiasiddiqiyyah.eu.cc.

ONLINE VIRTUAL ACADEMY:
Live HD interactive sessions, 1,200+ scanned manuscripts, direct Mufti consultations. Students can access from anywhere worldwide.

CONTACT:
Email: contact@jamiasiddiqiyyah.eu.cc. Website: jamiasiddiqiyyah.eu.cc.
`;

// ── Build dynamic context from Supabase ─────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function buildDynamicContext(supabase: any): Promise<string> {
  const parts: string[] = [];

  // Fetch teachers/scholars
  try {
    const { data: teachers } = await supabase
      .from('teachers')
      .select('name, title, role, specialization, qualification, experience, biography')
      .limit(15);

    if (teachers && teachers.length > 0) {
      const teacherLines = teachers.map((t: any) =>
        `- ${t.name} (${t.title || 'Scholar'}, ${t.role || 'Faculty'}): Specializes in ${t.specialization || 'Islamic Sciences'}. Qualified from ${t.qualification || 'N/A'}. ${(t.biography || '').substring(0, 200)}`
      );
      parts.push(`FACULTY & SCHOLARS:\n${teacherLines.join('\n')}`);
    }
  } catch (e) { /* skip if table missing */ }

  // Fetch courses
  try {
    const { data: courses } = await supabase
      .from('courses')
      .select('title, description, level, duration, language, enrollment_status, price')
      .limit(15);

    if (courses && courses.length > 0) {
      const courseLines = courses.map((c: any) =>
        `- ${c.title} | Level: ${c.level} | Duration: ${c.duration} | Language: ${c.language} | Enrollment: ${c.enrollment_status} | Fee: ${c.price > 0 ? '$' + c.price : 'Free/Scholarship'} | ${(c.description || '').substring(0, 150)}`
      );
      parts.push(`DETAILED COURSES:\n${courseLines.join('\n')}`);
    }
  } catch (e) { /* skip if table missing */ }

  // Fetch published insights articles
  try {
    const { data: articles } = await supabase
      .from('articles')
      .select('title, category, tags, content, slug')
      .order('created_at', { ascending: false })
      .limit(8);

    if (articles && articles.length > 0) {
      const articleLines = articles.map((a: any) => {
        let summary = '';
        try {
          const decoded = JSON.parse(a.content);
          if (decoded.status === 'published') {
            summary = (decoded.body || '').substring(0, 200);
          }
        } catch (e) {
          summary = (a.content || '').substring(0, 200);
        }
        return `- "${a.title}" (${a.category}): ${summary}`;
      }).filter(Boolean);

      if (articleLines.length > 0) {
        parts.push(`ISLAMIC INSIGHTS ARTICLES:\n${articleLines.join('\n')}`);
      }
    }
  } catch (e) { /* skip if table missing */ }

  return parts.join('\n\n');
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
    }

    // Build dynamic context from live database
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const dynamicContext = await buildDynamicContext(supabase);

    // Full context = static knowledge + live database data
    const fullContext = `${STATIC_CONTEXT}\n\n${dynamicContext}`.trim();

    // Construct system prompt
    const systemInstruction = `You are the official AI assistant of Jamia Siddiqiyyah (Islamic University, Online Madrasa & Charity). You speak with warmth, clarity, and Islamic courtesy.

Your job is to help visitors by answering questions about:
- Academic programs, admissions and scholarships
- Faculty, scholars and their specializations
- Donations, Zakat, Sadaqah and charitable campaigns
- The institution's mission, history and values
- Online courses and virtual academy

RULES:
1. Answer ONLY based on the verified context below. Do NOT invent facts, URLs, names or details not in the context.
2. If a question falls outside your knowledge, politely say so and invite the user to email contact@jamiasiddiqiyyah.eu.cc or visit the website.
3. Keep responses concise, helpful and friendly. Use bullet points when listing multiple items.
4. Begin your first response with "Wa Alaikum Assalam!" if the user greets with Salam, otherwise start naturally.

VERIFIED INSTITUTIONAL CONTEXT:
${fullContext}`;

    // Call FreeLLMAPI for chat completion with streaming
    const aiResponse = await fetch(`${apiBaseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemInstruction },
          ...messages.slice(-8), // last 8 messages for context window
        ],
        stream: true,
        temperature: 0.4, // lower = more factual
        max_tokens: 600,
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error('❌ FreeLLMAPI error:', errText);
      return NextResponse.json({ error: 'AI service temporarily unavailable. Please try again.' }, { status: 502 });
    }

    // Stream the AI response chunks back to client
    return new Response(aiResponse.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-store',
        'Connection': 'keep-alive',
      },
    });

  } catch (error: any) {
    console.error('❌ Chat API error:', error);
    return NextResponse.json({ error: 'Internal server error. Please try again.' }, { status: 500 });
  }
}
