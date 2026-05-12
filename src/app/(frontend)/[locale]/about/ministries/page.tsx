import { getLocale } from 'next-intl/server'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default async function MinistriesPage() {
  const locale = await getLocale()
  const isZh = locale === 'zh'
  const font = isZh ? 'var(--font-chinese)' : 'var(--font-body)'
  const titleFont = isZh ? 'var(--font-chinese)' : 'var(--font-display)'

  const regions = [
    {
      name: isZh ? '亞洲事工' : 'Asia Ministries',
      countries: [
        { label: isZh ? '柬埔寨' : 'Cambodia', href: `/${locale}/regional/asia/cambodia`, color: '#1E40AF' },
        { label: isZh ? '印尼' : 'Indonesia', href: `/${locale}/regional/asia/indonesia`, color: '#1E40AF' },
        { label: isZh ? '台灣' : 'Taiwan', href: `/${locale}/regional/asia/taiwan`, color: '#1E40AF' },
      ],
      color: '#1E40AF',
      desc: isZh
        ? '在東南亞服事邊緣社群，透過教育、醫療與福音宣教榮耀主名。'
        : 'Serving marginalized communities across Southeast Asia through education, healthcare, and the Gospel.',
    },
    {
      name: isZh ? '中東地區' : 'Middle East',
      countries: [
        { label: isZh ? '土耳其' : 'Turkey', href: `/${locale}/regional/middle-east/turkey`, color: '#6B21A8' },
        { label: isZh ? '黎巴嫩' : 'Lebanon', href: `/${locale}/regional/middle-east/lebanon`, color: '#6B21A8' },
      ],
      color: '#6B21A8',
      desc: isZh
        ? '在充滿挑戰的地區帶來盼望，服事難民與本地社群。'
        : 'Bringing hope to challenging regions, serving refugees and local communities.',
    },
    {
      name: isZh ? '非洲地區' : 'Africa',
      countries: [
        { label: isZh ? '迦納' : 'Ghana', href: `/${locale}/regional/africa/ghana`, color: '#D4A017' },
      ],
      color: '#D4A017',
      desc: isZh
        ? '透過社區發展與教會植立，在迦納服事貧困家庭。'
        : 'Serving vulnerable families in Ghana through community development and church planting.',
    },
    {
      name: isZh ? '美國本土' : 'USA',
      countries: [
        { label: isZh ? '南加州' : 'Southern California', href: `/${locale}/regional/usa/socal`, color: '#16A34A' },
      ],
      color: '#16A34A',
      desc: isZh
        ? '從北美差遣宣教士，動員華裔基督徒走向萬國。'
        : 'Sending missionaries from North America and mobilizing Chinese Christians globally.',
    },
  ]

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#fafaf9' }}>
      <div className="py-20 px-4 text-center" style={{ backgroundColor: '#1A1A2E' }}>
        <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: titleFont }}>
          {isZh ? '我們的宣教事工' : 'Our Ministries'}
        </h1>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16 space-y-10">
        {regions.map((r) => (
          <div key={r.name} className="bg-white rounded-xl p-7 shadow-sm">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-1 h-12 rounded-full shrink-0" style={{ backgroundColor: r.color }} />
              <div>
                <h2 className="text-xl font-bold mb-1" style={{ color: '#1A1A2E', fontFamily: titleFont }}>
                  {r.name}
                </h2>
                <p className="text-gray-500 text-sm" style={{ fontFamily: font }}>{r.desc}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {r.countries.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-white text-sm font-semibold transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: c.color, fontFamily: font }}
                >
                  {c.label}
                  <ArrowRight size={13} />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
