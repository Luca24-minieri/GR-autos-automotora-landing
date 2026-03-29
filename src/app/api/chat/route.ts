import Anthropic from '@anthropic-ai/sdk';
import { CLOSER_SYSTEM_PROMPT, INVENTORY_CONTEXT } from '@/lib/chatbot/system-prompt';
import { NextRequest, NextResponse } from 'next/server';

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(sessionId: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(sessionId);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(sessionId, { count: 1, resetAt: now + 60000 });
    return true;
  }
  if (entry.count >= 10) return false;
  entry.count++;
  return true;
}

async function saveToSupabase(sessionId: string, userMessage: string, assistantMessage: string, analysis: any) {
  try {
    const { supabaseAdmin } = await import('@/lib/supabase/client');

    let conversationId: string | null = null;
    const { data: conversation } = await supabaseAdmin
      .from('conversations').select('id').eq('session_id', sessionId).single();
    if (conversation) {
      conversationId = conversation.id;
    } else {
      const { data: newConv } = await supabaseAdmin
        .from('conversations').insert({ session_id: sessionId }).select('id').single();
      conversationId = newConv?.id ?? null;
    }

    if (!conversationId) return;

    await supabaseAdmin.from('messages').insert([
      { conversation_id: conversationId, role: 'user', content: userMessage },
      { conversation_id: conversationId, role: 'assistant', content: assistantMessage, metadata: analysis || {} },
    ]);

    if (analysis) {
      await supabaseAdmin.from('conversations').update({
        lead_score: analysis.lead_score,
        lead_category: analysis.lead_category,
        last_message_at: new Date().toISOString(),
        metadata: { intent: analysis.intent, interested_vehicle: analysis.interested_vehicle },
      }).eq('id', conversationId);

      if (analysis.data_captured && (analysis.data_captured.name || analysis.data_captured.phone || analysis.data_captured.email)) {
        await supabaseAdmin.from('leads').upsert({
          conversation_id: conversationId,
          name: analysis.data_captured.name,
          phone: analysis.data_captured.phone,
          email: analysis.data_captured.email,
          interested_vehicle: analysis.interested_vehicle,
          lead_score: analysis.lead_score,
          source: 'chatbot',
        }, { onConflict: 'conversation_id' });
      }
    }
  } catch (e) {
    console.warn('Supabase save failed (non-blocking):', e);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, sessionId, conversationHistory } = body;

    if (!message || typeof message !== 'string' || message.length > 2000) {
      return NextResponse.json({ error: 'Mensaje inválido' }, { status: 400 });
    }
    if (!sessionId || typeof sessionId !== 'string') {
      return NextResponse.json({ error: 'Session inválida' }, { status: 400 });
    }
    if (!checkRateLimit(sessionId)) {
      return NextResponse.json(
        { error: 'Demasiados mensajes. Espera un momento antes de continuar.' },
        { status: 429 }
      );
    }

    const history = Array.isArray(conversationHistory)
      ? conversationHistory
          .filter((m: any) => m && typeof m.role === 'string' && typeof m.content === 'string' && ['user', 'assistant'].includes(m.role))
          .slice(-20)
      : [];

    // Llamar a Claude
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
    const messages = [...history, { role: 'user' as const, content: message }];
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: `${CLOSER_SYSTEM_PROMPT}\n\n${INVENTORY_CONTEXT}`,
      messages,
    });

    const assistantMessage = response.content[0].type === 'text' ? response.content[0].text : '';

    // Extraer análisis JSON
    let analysis = null;
    const jsonMatch = assistantMessage.match(/%%%JSON_START%%%([\s\S]*?)%%%JSON_END%%%/);
    if (jsonMatch) {
      try { analysis = JSON.parse(jsonMatch[1].trim()); } catch (e) {}
    }

    // Limpiar respuesta
    const cleanResponse = assistantMessage.replace(/%%%JSON_START%%%[\s\S]*?%%%JSON_END%%%/, '').trim();

    // Guardar en Supabase en background (no bloquea la respuesta)
    saveToSupabase(sessionId, message, cleanResponse, analysis).catch(() => {});

    return NextResponse.json({
      message: cleanResponse,
      analysis: analysis ? { leadCategory: analysis.lead_category, suggestedAction: analysis.suggested_action } : null,
    });
  } catch (error: any) {
    console.error('Chat API Error:', error?.message || error);

    if (error?.status === 429) {
      return NextResponse.json({ error: 'El asistente está momentáneamente ocupado.' }, { status: 429 });
    }

    return NextResponse.json(
      { error: 'Disculpa, tuve un problema procesando tu mensaje. ¿Puedes intentar de nuevo?' },
      { status: 500 }
    );
  }
}
