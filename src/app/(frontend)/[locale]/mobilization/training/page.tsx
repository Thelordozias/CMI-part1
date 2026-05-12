import { getLocale } from 'next-intl/server'
import Link from 'next/link'

export default async function TrainingPage() {
  const locale = await getLocale()
  const isZh = locale === 'zh'
  const font = isZh ? 'var(--font-chinese)' : 'var(--font-body)'
  const titleFont = isZh ? 'var(--font-chinese)' : 'var(--font-display)'

  const courses = isZh
    ? [
        { title: '宣教概論', level: '基礎', desc: '認識宣教神學基礎、跨文化服事原則，以及如何回應神的呼召。', duration: '6週' },
        { title: '跨文化事工培訓', level: '進階', desc: '深入學習文化適應、語言學習策略、福音呈現方式，為前往工場做準備。', duration: '12週' },
        { title: '宣教士差遣前訓練', level: '強化', desc: '包含心理評估、財務規劃、安全培訓和跨文化衝突處理等實踐課程。', duration: '2週密集' },
      ]
    : [
        { title: 'Introduction to Missions', level: 'Foundations', desc: 'Understand the theology of missions, cross-cultural ministry principles, and how to discern God\'s call.', duration: '6 weeks' },
        { title: 'Cross-Cultural Ministry Training', level: 'Advanced', desc: 'Deep dive into cultural adaptation, language learning, Gospel contextualization, and field preparation.', duration: '12 weeks' },
        { title: 'Pre-Field Intensive', level: 'Intensive', desc: 'Practical modules including psychological assessment, financial planning, security training, and conflict resolution.', duration: '2-week intensive' },
      ]

  const levelColors: Record<string, string> = {
    '基礎': '#16A34A', 'Foundations': '#16A34A',
    '進階': '#1E40AF', 'Advanced': '#1E40AF',
    '強化': '#6B21A8', 'Intensive': '#6B21A8',
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#fafaf9' }}>
      <div className="py-20 px-4 text-center" style={{ backgroundColor: '#1A1A2E' }}>
        <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: titleFont }}>
          {isZh ? '宣教課程' : 'Training Courses'}
        </h1>
        <p className="text-white/60 mt-3 max-w-xl mx-auto" style={{ fontFamily: font }}>
          {isZh ? '系統化的培訓，裝備你走向宣教工場' : 'Systematic training to equip you for the mission field'}
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16 space-y-6">
        {courses.map((c) => (
          <div key={c.title} className="bg-white rounded-xl p-7 shadow-sm">
            <div className="flex items-start justify-between gap-4 mb-3">
              <h2 className="text-xl font-bold" style={{ color: '#1A1A2E', fontFamily: titleFont }}>{c.title}</h2>
              <span className="px-3 py-1 rounded-full text-white text-xs font-semibold shrink-0"
                style={{ backgroundColor: levelColors[c.level] ?? '#6B21A8', fontFamily: font }}>
                {c.level}
              </span>
            </div>
            <p className="text-gray-600 mb-3 leading-relaxed" style={{ fontFamily: font }}>{c.desc}</p>
            <p className="text-sm text-gray-400" style={{ fontFamily: font }}>
              {isZh ? `課程時長：${c.duration}` : `Duration: ${c.duration}`}
            </p>
          </div>
        ))}

        <div className="pt-6 text-center">
          <p className="text-gray-500 mb-4" style={{ fontFamily: font }}>
            {isZh ? '有興趣報名？請與我們聯絡了解更多詳情。' : 'Interested in enrolling? Contact us for more details.'}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-block px-7 py-3 rounded-lg font-bold text-white transition-all duration-200 hover:brightness-110"
            style={{ backgroundColor: '#6B21A8', fontFamily: font }}
          >
            {isZh ? '聯絡我們' : 'Contact Us'}
          </Link>
        </div>
      </div>
    </main>
  )
}
