import Anthropic from '@anthropic-ai/sdk';
import { supabaseAdmin } from '@/lib/supabase/client';
import { CLOSER_SYSTEM_PROMPT, INVENTORY_CONTEXT } from '@/lib/chatbot/system-prompt';
import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { resolve } from 'path';

function getApiKeyFromEnvLocal(): string {
  try {
    const envPath = resolve(process.cwd(), '.env.local');
    const content = readFileSync(envPath, 'utf-8');
    const match = content.match(/^ANTHROPIC_API_KEY=(.+)$/m);
    if (match) return match[1].trim();
  } catch (e) {}
  return process.env.ANTHROPIC_API_KEY!;
}

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

export async function POST(req: NextRequest) {
  console.log('API Key prefix:', process.env.ANTHROPIC_API_KEY?.substring(0, 15));
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

    // Supabase: buscar o crear conversación
    let conversationId: string | null = null;
    try {
      const { data: conversation } = await supabaseAdmin
        .from('conversations').select('id').eq('session_id', sessionId).single();
      if (conversation) {
        conversationId = conversation.id;
      } else {
        const { data: newConv } = await supabaseAdmin
          .from('conversations').insert({ session_id: sessionId }).select('id').single();
        conversationId = newConv?.id ?? null;
      }
    } catch (dbError) {
      console.warn('Supabase conversation lookup failed:', dbError);
    }

    // Guardar mensaje del usuario
    if (conversationId) {
      try {
        await supabaseAdmin.from('messages').insert({
          conversation_id: conversationId, role: 'user', content: message,
        });
      } catch (e) { console.warn('Failed to save user message:', e); }
    }

    // Llamar a Claude
    const apiKey = getApiKeyFromEnvLocal();
    console.log('Using API Key prefix:', apiKey.substring(0, 20));
    const anthropic = new Anthropic({ apiKey });
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

    // Guardar respuesta del asistente
    if (conversationId) {
      try {
        await supabaseAdmin.from('messages').insert({
          conversation_id: conversationId, role: 'assistant', content: cleanResponse, metadata: analysis || {},
        });
      } catch (e) { console.warn('Failed to save assistant message:', e); }
    }

    // Actualizar lead score
    if (analysis && conversationId) {
      try {
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
      } catch (e) { console.warn('Failed to update lead data:', e); }
    }

    return NextResponse.json({
      message: cleanResponse,
      analysis: analysis ? { leadCategory: analysis.lead_category, suggestedAction: analysis.suggested_action } : null,
    });
  } catch (error: any) {
    console.error('=== CHAT ERROR START ===');
    console.error('Error type:', typeof error);
    console.error('Error message:', error?.message);
    console.error('Error status:', error?.status);
    console.error('Error name:', error?.name);
    console.error('Full error:', error);
    console.error('=== CHAT ERROR END ===');

    if (error?.status === 429) {
      return NextResponse.json({ error: 'El asistente está momentáneamente ocupado.' }, { status: 429 });
    }

    return NextResponse.json(
      { error: 'Disculpa, tuve un problema procesando tu mensaje. ¿Puedes intentar de nuevo?' },
      { status: 500 }
    );
  }
}
