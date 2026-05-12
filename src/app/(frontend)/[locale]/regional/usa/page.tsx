import { getLocale } from 'next-intl/server'
import Link from 'next/link'

export default async function USAPage() {
  const locale = await getLocale()
  const isZh = locale === 'zh'
  const font = isZh ? 'var(--font-chinese)' : 'var(--font-body)'
  const titleFont = isZh ? 'var(--font-chinese)' : 'var(--font-display)'
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#fafaf9' }}>
      <div className="py-20 px-4 text-center" style={{ backgroundColor: '#1A1A2E' }}>
        <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: titleFont }}>{isZh ? '美國本土' : 'USA'}</h1>
        <p className="text-white/60 mt-3" style={{ fontFamily: font }}>{isZh ? '從北美差遣宣教士走向萬國' : 'Sending missionaries from North America to the nations'}</p>
      </div>
      <div className="max-w-sm mx-auto px-4 py-16">
        <Link href={`/${locale}/regional/usa/socal`} className="group block bg-white rounded-xl p-10 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center">
          <p className="text-5xl mb-3">🇺🇸</p>
          <h2 className="text-xl font-bold mb-3" style={{ color: '#1A1A2E', fontFamily: titleFont }}>{isZh ? '南加州' : 'Southern California'}</h2>
          <span className="text-sm font-semibold" style={{ color: '#16A34A', fontFamily: font }}>{isZh ? '了解更多 →' : 'Learn More →'}</span>
        </Link>
      </div>
    </main>
  )
}
