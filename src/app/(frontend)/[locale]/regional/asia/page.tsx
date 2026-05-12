import { getLocale } from 'next-intl/server'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default async function AsiaPage() {
  const locale = await getLocale()
  const isZh = locale === 'zh'
  const font = isZh ? 'var(--font-chinese)' : 'var(--font-body)'
  const titleFont = isZh ? 'var(--font-chinese)' : 'var(--font-display)'
  const countries = [
    { label: isZh ? '柬埔寨' : 'Cambodia', href: `/${locale}/regional/asia/cambodia`, emoji: '🇰🇭', color: '#1E40AF' },
    { label: isZh ? '印尼' : 'Indonesia',  href: `/${locale}/regional/asia/indonesia`,  emoji: '🇮🇩', color: '#1E40AF' },
    { label: isZh ? '台灣' : 'Taiwan',     href: `/${locale}/regional/asia/taiwan`,     emoji: '🇹🇼', color: '#1E40AF' },
  ]
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#fafaf9' }}>
      <div className="py-20 px-4 text-center" style={{ backgroundColor: '#1A1A2E' }}>
        <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: titleFont }}>{isZh ? '亞洲事工' : 'Asia Ministries'}</h1>
        <p className="text-white/60 mt-3" style={{ fontFamily: font }}>{isZh ? '服事東南亞邊緣社群' : 'Serving marginalized communities in Southeast Asia'}</p>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-6">
        {countries.map(c => (
          <Link key={c.href} href={c.href} className="group block bg-white rounded-xl p-7 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center">
            <p className="text-4xl mb-3">{c.emoji}</p>
            <h2 className="font-bold mb-3" style={{ color: '#1A1A2E', fontFamily: titleFont }}>{c.label}</h2>
            <span className="text-sm font-semibold group-hover:gap-2 transition-all" style={{ color: c.color, fontFamily: font }}>{isZh ? '了解更多 →' : 'Learn More →'}</span>
          </Link>
        ))}
      </div>
    </main>
  )
}
