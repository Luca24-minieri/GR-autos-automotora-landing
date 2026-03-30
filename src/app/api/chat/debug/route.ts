import { NextResponse } from 'next/server';

export async function GET() {
  const rawKey = process.env.ANTHROPIC_API_KEY || '';
  const cleanKey = rawKey.replace(/\s/g, '');

  // Test with RAW key (as Vercel stores it)
  let rawKeyTest: any = null;
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': rawKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 10,
        messages: [{ role: 'user', content: 'hi' }],
      }),
    });
    rawKeyTest = { status: res.status };
  } catch (e: any) {
    rawKeyTest = { error: e.message };
  }

  // Test with CLEANED key (whitespace stripped)
  let cleanKeyTest: any = null;
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': cleanKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 10,
        messages: [{ role: 'user', content: 'hi' }],
      }),
    });
    cleanKeyTest = { status: res.status };
  } catch (e: any) {
    cleanKeyTest = { error: e.message };
  }

  // Find where the spaces are
  const spacePositions: number[] = [];
  for (let i = 0; i < rawKey.length; i++) {
    if (rawKey[i] === ' ' || rawKey[i] === '\t') spacePositions.push(i);
  }

  return NextResponse.json({
    rawKeyLength: rawKey.length,
    cleanKeyLength: cleanKey.length,
    spacePositions,
    rawKeySuffix: rawKey.substring(rawKey.length - 15),
    cleanKeySuffix: cleanKey.substring(cleanKey.length - 15),
    rawKeyTest,
    cleanKeyTest,
  });
}
