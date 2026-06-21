import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const apiBaseUrl = process.env.FREELLMAPI_BASE_URL;
const apiKey = process.env.FREELLMAPI_KEY;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
    }

    const latestMessage = messages[messages.length - 1].content;

    // 1. Initialize Supabase
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ error: 'Database credentials not configured' }, { status: 500 });
    }
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 2. Generate embedding for the user's latest query
    let matchingContext = '';
    let retrievedDocs: any[] = [];
    if (apiBaseUrl && apiKey) {
      try {
        const embedRes = await fetch(`${apiBaseUrl}/embeddings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'text-embedding-3-small',
            input: latestMessage.replace(/\n/g, ' '),
          }),
        });

        if (embedRes.ok) {
          const embedJson = await embedRes.json();
          const queryEmbedding = embedJson.data?.[0]?.embedding;

          if (queryEmbedding) {
            // 3. Search Supabase for similar documents
            const { data: documents, error: matchError } = await supabase.rpc('match_documents', {
              query_embedding: queryEmbedding,
              match_threshold: 0.35, // Cosine similarity threshold
              match_count: 4,        // Return top 4 most relevant chunks
            });

            if (!matchError && documents && documents.length > 0) {
              retrievedDocs = documents;
              matchingContext = documents
                .map((doc: any) => `Source: ${doc.title} (${doc.url_path})\nContent: ${doc.content}`)
                .join('\n\n');
            }
          }
        }
      } catch (embedErr) {
        console.error('⚠️ Failed to fetch embedding or match documents:', embedErr);
      }
    }

    // 4. Construct System Prompt with Context
    const systemInstruction = `You are the official AI assistant of Jamia Siddiqiyyah (Islamic University, Online Madrasa & Charity).
Your job is to answer queries truthfully, politely, and strictly based on the verified institutional context provided below.
If the context does not contain relevant details to answer the user's question, state politely that you do not have that specific information and invite them to contact our support team at contact@jamiasiddiqiyyah.eu.cc or explore the website pages.
Do NOT make up facts, URLs, or details that are not in the context. Keep your responses clear, helpful, and concise.

VERIFIED CONTEXT:
${matchingContext || 'No context found.'}`;

    // 5. Build messages array for chat completion
    const apiMessages = [
      { role: 'system', content: systemInstruction },
      ...messages.slice(-6) // Include up to last 6 messages for context
    ];

    // 6. Request Chat Completion stream from FreeLLMAPI
    const aiResponse = await fetch(`${apiBaseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: apiMessages,
        stream: true,
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      return NextResponse.json({ error: `AI service error: ${errText}` }, { status: aiResponse.status });
    }

    // 7. Stream the response directly to client using standard ReadableStream
    return new Response(aiResponse.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error: any) {
    console.error('❌ Chat API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
