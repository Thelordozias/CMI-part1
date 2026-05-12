import { getLocale } from 'next-intl/server'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default async function NewsPage() {
  const locale = await getLocale()
  const isZh = locale === 'zh'
  const font = isZh ? 'var(--font-chinese)' : 'var(--font-body)'
  const titleFont = isZh ? 'var(--font-chinese)' : 'var(--font-display)'

  const sections = [
    {
      title: isZh ? '宣教士代禱信' : 'Missionary Letters',
      desc: isZh ? '來自前線宣教士的最新消息與代禱事項' : 'Latest news and prayer requests from our missionaries on the field',
      href: `/${locale}/news/letters`,
      color: '#6B21A8',
    },
    {
      title: isZh ? '宣教祈禱夥伴' : 'Prayer Partners',
      desc: isZh ? '成為禱告夥伴，定期為宣教工作代禱' : 'Join us as a prayer partner interceding regularly for our missions',
      href: `/${locale}/news/partners`,
      color: '#1E40AF',
    },
    {
      title: isZh ? '關懷通訊' : 'Care Newsletters',
      desc: isZh ? '定期通訊，了解CMI事工的最新進展' : 'Stay informed with our regular ministry newsletters',
      href: `/${locale}/news/newsletters`,
      color: '#D4A017',
    },
  ]

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#fafaf9' }}>
      <div className="py-20 px-4 text-center" style={{ backgroundColor: '#1A1A2E' }}>
        <p className="text-sm uppercase tracking-widest mb-3" style={{ color: '#D4A017', fontFamily: font }}>
          {isZh ? '最新消息' : 'Stay Informed'}
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: titleFont }}>
          {isZh ? '宣教動態' : 'News & Updates'}
        </h1>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-6">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group block bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-10 h-1 rounded-full mb-4" style={{ backgroundColor: s.color }} />
            <h2 className="text-lg font-bold mb-2" style={{ color: '#1A1A2E', fontFamily: titleFont }}>
              {s.title}
            </h2>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed" style={{ fontFamily: font }}>
              {s.desc}
            </p>
            <span className="flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all duration-200"
              style={{ color: s.color, fontFamily: font }}>
              {isZh ? '了解更多' : 'Learn More'} <ArrowRight size={14} />
            </span>
          </Link>
        ))}
      </div>
    </main>
  )
}
