import { getLocale } from 'next-intl/server'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default async function AboutPage() {
  const locale = await getLocale()
  const isZh = locale === 'zh'
  const font = isZh ? 'var(--font-chinese)' : 'var(--font-body)'
  const titleFont = isZh ? 'var(--font-chinese)' : 'var(--font-display)'

  const sections = [
    {
      title: isZh ? '信仰告白' : 'Statement of Faith',
      desc: isZh ? '我們所信仰的核心教義' : 'The core doctrines we believe',
      href: `/${locale}/about/faith`,
      color: '#6B21A8',
    },
    {
      title: isZh ? '異象與使命' : 'Vision & Mission',
      desc: isZh ? 'CMI的事工方向與異象' : 'Our ministry direction and vision',
      href: `/${locale}/about/mission`,
      color: '#1E40AF',
    },
    {
      title: isZh ? '我們的宣教士' : 'Our Missionaries',
      desc: isZh ? '認識在各地服事的宣教士' : 'Meet our missionaries serving worldwide',
      href: `/${locale}/about/missionaries`,
      color: '#D4A017',
    },
    {
      title: isZh ? '宣教事工概覽' : 'Our Ministries',
      desc: isZh ? '各地區的事工介紹' : 'An overview of our regional ministries',
      href: `/${locale}/about/ministries`,
      color: '#16A34A',
    },
  ]

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#fafaf9' }}>
      {/* Hero */}
      <div className="py-20 px-4 text-center" style={{ backgroundColor: '#1A1A2E' }}>
        <p className="text-sm uppercase tracking-widest mb-3" style={{ color: '#D4A017', fontFamily: font }}>
          {isZh ? '關於我們' : 'About Us'}
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: titleFont }}>
          {isZh ? '關懷國際宣教機構' : 'Care Ministries International'}
        </h1>
        <p className="text-white/70 max-w-xl mx-auto" style={{ fontFamily: font }}>
          {isZh
            ? '動員、裝備和差遣華裔基督徒參與跨文化宣教'
            : 'Mobilizing, equipping, and sending Chinese Christians into cross-cultural missions'}
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-4xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-6">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            <div className="w-1 h-12 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
            <div className="flex-1">
              <h2 className="text-lg font-bold mb-1" style={{ color: '#1A1A2E', fontFamily: titleFont }}>
                {s.title}
              </h2>
              <p className="text-gray-500 text-sm" style={{ fontFamily: font }}>{s.desc}</p>
            </div>
            <ArrowRight
              size={18}
              className="shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ color: s.color }}
            />
          </Link>
        ))}
      </div>
    </main>
  )
}
