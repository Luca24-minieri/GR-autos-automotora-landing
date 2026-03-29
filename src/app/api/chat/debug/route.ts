import { NextResponse } from 'next/server';

export async function GET() {
  const key = process.env.ANTHROPIC_API_KEY || '';

  // Test direct API call with fetch (bypass SDK)
  let apiTestResult: any = null;
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': key.trim(),
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 10,
        messages: [{ role: 'user', content: 'hi' }],
      }),
    });
    const data = await res.json();
    apiTestResult = { status: res.status, body: JSON.stringify(data).substring(0, 300) };
  } catch (e: any) {
    apiTestResult = { error: e.message };
  }

  return NextResponse.json({
    keyLength: key.length,
    keyTrimmedLength: key.trim().length,
    keyPrefix: key.substring(0, 20),
    keySuffix: key.substring(key.length - 10),
    hasLeadingSpace: key !== key.trimStart(),
    hasTrailingSpace: key !== key.trimEnd(),
    hasNewline: key.includes('\n') || key.includes('\r'),
    charCodes: Array.from(key.substring(0, 5)).map(c => c.charCodeAt(0)),
    apiTestResult,
  });
}
