import { type NextRequest, NextResponse } from 'next/server'
import * as deepl from 'deepl-node'

// In-memory rate limiter (resets on cold start — acceptable for admin-only usage)
const ipWindows = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const window = ipWindows.get(ip)
  if (!window || now > window.resetAt) {
    ipWindows.set(ip, { count: 1, resetAt: now + 60_000 })
    return false
  }
  if (window.count >= 10) return true
  window.count++
  return false
}

function getClientIp(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)

  if (checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded — max 10 requests per minute' },
      { status: 429 },
    )
  }

  const apiKey = process.env.DEEPL_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'DEEPL_API_KEY is not configured' },
      { status: 503 },
    )
  }

  let body: { text: string; sourceLang: string; targetLang: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { text, sourceLang, targetLang } = body

  if (!text?.trim()) {
    return NextResponse.json({ error: 'text is required' }, { status: 400 })
  }
  if (!sourceLang || !targetLang) {
    return NextResponse.json({ error: 'sourceLang and targetLang are required' }, { status: 400 })
  }

  try {
    const translator = new deepl.Translator(apiKey)

    const deeplTarget =
      targetLang === 'zh'
        ? ('zh' as deepl.TargetLanguageCode)
        : ('en-US' as deepl.TargetLanguageCode)

    const deeplSource =
      sourceLang === 'zh'
        ? ('zh' as deepl.SourceLanguageCode)
        : ('en' as deepl.SourceLanguageCode)

    const result = await translator.translateText(text, deeplSource, deeplTarget)
    const translatedText = Array.isArray(result) ? result[0]!.text : result.text

    return NextResponse.json({ translatedText })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)

    if (message.includes('Quota Exceeded')) {
      return NextResponse.json(
        { error: 'DeepL quota exceeded — translate manually' },
        { status: 429 },
      )
    }

    console.error('[/api/translate] DeepL error:', message)
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 })
  }
}
