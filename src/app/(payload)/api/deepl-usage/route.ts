import { NextResponse } from 'next/server'
import * as deepl from 'deepl-node'

export async function GET() {
  const apiKey = process.env.DEEPL_API_KEY
  if (!apiKey) {
    return NextResponse.json({ available: false, percentage: 0, remaining: 0, limit: 0, count: 0, configured: false })
  }

  try {
    const translator = new deepl.Translator(apiKey)
    const usage = await translator.getUsage()

    if (!usage.character) {
      return NextResponse.json({ available: true, percentage: 0, remaining: 500_000, limit: 500_000, count: 0, configured: true })
    }

    const { limit, count } = usage.character
    const percentage = Math.round((count / limit) * 100)

    return NextResponse.json({
      available: count < limit,
      percentage,
      remaining: limit - count,
      limit,
      count,
      configured: true,
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[/api/deepl-usage]', message)
    return NextResponse.json({ available: false, percentage: 100, remaining: 0, limit: 0, count: 0, configured: true }, { status: 500 })
  }
}
