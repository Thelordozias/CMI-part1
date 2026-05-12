import { getLocale } from 'next-intl/server'
import { PrayerSignupForm } from './PrayerSignupForm'

export default async function PartnersPage() {
  const locale = await getLocale()
  const isZh = locale === 'zh'
  const font = isZh ? 'var(--font-chinese)' : 'var(--font-body)'
  const titleFont = isZh ? 'var(--font-chinese)' : 'var(--font-display)'

  const benefits = isZh
    ? [
        '每月收到宣教士代禱信',
        '參與專屬禱告夥伴網絡',
        '收到CMI最新宣教動態',
        '成為在禱告中支持宣教的重要一員',
      ]
    : [
        'Receive monthly missionary prayer letters',
        'Join our dedicated prayer partner network',
        'Get the latest CMI missions updates',
        'Become a vital part of our missions through prayer',
      ]

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#fafaf9' }}>
      <div className="py-20 px-4 text-center" style={{ backgroundColor: '#1A1A2E' }}>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: titleFont }}>
          {isZh ? '宣教祈禱夥伴' : 'Prayer Partners'}
        </h1>
        <p className="text-white/70 max-w-xl mx-auto" style={{ fontFamily: font }}>
          {isZh
            ? '禱告是宣教的根基。成為禱告夥伴，與我們一同為宣教工作代禱。'
            : 'Prayer is the foundation of missions. Join us in interceding for God\'s work around the world.'}
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-start">
        {/* Benefits */}
        <div>
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1A1A2E', fontFamily: titleFont }}>
            {isZh ? '作為禱告夥伴，您將...' : 'As a Prayer Partner, you will...'}
          </h2>
          <ul className="space-y-4">
            {benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-3" style={{ fontFamily: font }}>
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs shrink-0 mt-0.5" style={{ backgroundColor: '#6B21A8' }}>
                  ✓
                </span>
                <span className="text-gray-700">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sign-up form */}
        <PrayerSignupForm locale={locale} />
      </div>
    </main>
  )
}
