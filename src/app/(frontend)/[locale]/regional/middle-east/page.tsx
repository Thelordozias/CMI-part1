import { getLocale } from 'next-intl/server'
import Link from 'next/link'

export default async function MiddleEastPage() {
  const locale = await getLocale()
  const isZh = locale === 'zh'
  const font = isZh ? 'var(--font-chinese)' : 'var(--font-body)'
  const titleFont = isZh ? 'var(--font-chinese)' : 'var(--font-display)'
  const countries = [
    { label: isZh ? '土耳其' : 'Turkey',  href: `/${locale}/regional/middle-east/turkey`,  emoji: '🇹🇷', color: '#6B21A8' },
    { label: isZh ? '黎巴嫩' : 'Lebanon', href: `/${locale}/regional/middle-east/lebanon`, emoji: '🇱🇧', color: '#6B21A8' },
  ]
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#fafaf9' }}>
      <div className="py-20 px-4 text-center" style={{ backgroundColor: '#1A1A2E' }}>
        <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: titleFont }}>{isZh ? '中東地區' : 'Middle East'}</h1>
        <p className="text-white/60 mt-3" style={{ fontFamily: font }}>{isZh ? '在充滿挑戰的地區傳揚福音' : 'Sharing the Gospel in challenging regions'}</p>
      </div>
      <div className="max-w-2xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-6">
        {countries.map(c => (
          <Link key={c.href} href={c.href} className="group block bg-white rounded-xl p-7 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center">
            <p className="text-4xl mb-3">{c.emoji}</p>
            <h2 className="font-bold mb-3" style={{ color: '#1A1A2E', fontFamily: titleFont }}>{c.label}</h2>
            <span className="text-sm font-semibold" style={{ color: c.color, fontFamily: font }}>{isZh ? '了解更多 →' : 'Learn More →'}</span>
          </Link>
        ))}
      </div>
    </main>
  )
}
