import { getLocale } from 'next-intl/server'
import Link from 'next/link'
import { BookOpen, Calendar, Users, ArrowRight } from 'lucide-react'

export default async function MobilizationPage() {
  const locale = await getLocale()
  const isZh = locale === 'zh'
  const font = isZh ? 'var(--font-chinese)' : 'var(--font-body)'
  const titleFont = isZh ? 'var(--font-chinese)' : 'var(--font-display)'

  const sections = [
    {
      icon: <BookOpen size={28} strokeWidth={1.5} />,
      title: isZh ? '宣教課程' : 'Training Courses',
      desc: isZh ? '裝備你走向宣教工場的系統化培訓' : 'Systematic training to equip you for the mission field',
      href: `/${locale}/mobilization/training`,
      color: '#6B21A8',
    },
    {
      icon: <Calendar size={28} strokeWidth={1.5} />,
      title: isZh ? '特別聚會' : 'Special Conferences',
      desc: isZh ? '宣教大會與特別佈道會消息' : 'Missions conferences and special evangelistic events',
      href: `/${locale}/mobilization/conferences`,
      color: '#1E40AF',
    },
    {
      icon: <Users size={28} strokeWidth={1.5} />,
      title: isZh ? '祈禱團契' : 'Prayer Fellowships',
      desc: isZh ? '與同心的弟兄姊妹一起為宣教代禱' : 'Gather with like-minded believers to pray for global missions',
      href: `/${locale}/mobilization/prayer`,
      color: '#D4A017',
    },
  ]

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#fafaf9' }}>
      <div className="py-20 px-4 text-center" style={{ backgroundColor: '#1A1A2E' }}>
        <p className="text-sm uppercase tracking-widest mb-3" style={{ color: '#D4A017', fontFamily: font }}>
          {isZh ? '回應呼召' : 'Answer the Call'}
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: titleFont }}>
          {isZh ? '宣教動員' : 'Mobilization'}
        </h1>
        <p className="text-white/70 max-w-xl mx-auto" style={{ fontFamily: font }}>
          {isZh
            ? '神呼召每一位基督徒參與大使命。無論是禱告、奉獻、還是親身出發，我們幫助你找到你的位置。'
            : 'God calls every believer to the Great Commission. Whether through prayer, giving, or going — we help you find your place.'}
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-7">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group block bg-white rounded-xl p-7 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="mb-4" style={{ color: s.color }}>{s.icon}</div>
            <h2 className="text-lg font-bold mb-2" style={{ color: '#1A1A2E', fontFamily: titleFont }}>{s.title}</h2>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed" style={{ fontFamily: font }}>{s.desc}</p>
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
