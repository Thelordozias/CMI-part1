import { getLocale } from 'next-intl/server'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default async function RegionalPage() {
  const locale = await getLocale()
  const isZh = locale === 'zh'
  const font = isZh ? 'var(--font-chinese)' : 'var(--font-body)'
  const titleFont = isZh ? 'var(--font-chinese)' : 'var(--font-display)'

  const regions = [
    {
      name: isZh ? '亞洲事工' : 'Asia',
      href: `/${locale}/regional/asia`,
      color: '#1E40AF',
      countries: isZh ? ['柬埔寨', '印尼', '台灣'] : ['Cambodia', 'Indonesia', 'Taiwan'],
      desc: isZh ? '服事東南亞邊緣社群' : 'Serving marginalized communities in Southeast Asia',
    },
    {
      name: isZh ? '中東地區' : 'Middle East',
      href: `/${locale}/regional/middle-east`,
      color: '#6B21A8',
      countries: isZh ? ['土耳其', '黎巴嫩'] : ['Turkey', 'Lebanon'],
      desc: isZh ? '在充滿挑戰的地區傳揚福音' : 'Sharing the Gospel in challenging regions',
    },
    {
      name: isZh ? '非洲地區' : 'Africa',
      href: `/${locale}/regional/africa`,
      color: '#D4A017',
      countries: isZh ? ['迦納'] : ['Ghana'],
      desc: isZh ? '服事迦納的貧困家庭與兒童' : 'Serving families and children in Ghana',
    },
    {
      name: isZh ? '美國本土' : 'USA',
      href: `/${locale}/regional/usa`,
      color: '#16A34A',
      countries: isZh ? ['南加州'] : ['Southern California'],
      desc: isZh ? '從北美差遣宣教士走向萬國' : 'Sending missionaries to the nations from North America',
    },
  ]

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#fafaf9' }}>
      <div className="py-20 px-4 text-center" style={{ backgroundColor: '#1A1A2E' }}>
        <p className="text-sm uppercase tracking-widest mb-3" style={{ color: '#D4A017', fontFamily: font }}>
          {isZh ? '走向萬國' : 'To the Nations'}
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: titleFont }}>
          {isZh ? '宣教地區' : 'Regional Ministries'}
        </h1>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-7">
        {regions.map((r) => (
          <Link key={r.href} href={r.href}
            className="group block bg-white rounded-xl p-7 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="h-1 w-12 rounded-full mb-5" style={{ backgroundColor: r.color }} />
            <h2 className="text-xl font-bold mb-2" style={{ color: '#1A1A2E', fontFamily: titleFont }}>{r.name}</h2>
            <p className="text-sm text-gray-400 mb-4 font-medium" style={{ fontFamily: font }}>{r.countries.join(' · ')}</p>
            <p className="text-gray-600 text-sm mb-5 leading-relaxed" style={{ fontFamily: font }}>{r.desc}</p>
            <span className="flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all duration-200"
              style={{ color: r.color, fontFamily: font }}>
              {isZh ? '了解更多' : 'Explore'} <ArrowRight size={14} />
            </span>
          </Link>
        ))}
      </div>
    </main>
  )
}
