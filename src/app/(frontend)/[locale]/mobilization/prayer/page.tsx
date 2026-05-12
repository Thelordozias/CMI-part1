import { getLocale } from 'next-intl/server'
import { PrayerSignupForm } from '../../../[locale]/news/partners/PrayerSignupForm'

export default async function PrayerFellowshipsPage() {
  const locale = await getLocale()
  const isZh = locale === 'zh'
  const font = isZh ? 'var(--font-chinese)' : 'var(--font-body)'
  const titleFont = isZh ? 'var(--font-chinese)' : 'var(--font-display)'

  const requests = isZh
    ? [
        '為柬埔寨、印尼、台灣的宣教士禱告，求主保守他們的健康和工作。',
        '為中東的難民事工禱告，求主開門，讓福音能自由傳揚。',
        '為迦納的貧困兒童禱告，求主供應他們的需要。',
        '為CMI的宣教訓練課程禱告，求主呼召更多人回應宣教呼召。',
        '為CMI的財務需要禱告，求主供應宣教士的一切所需。',
      ]
    : [
        'Pray for missionaries in Cambodia, Indonesia, and Taiwan — for their health and fruitful ministry.',
        'Pray for open doors in the Middle East for the Gospel to spread freely among refugees.',
        'Pray for vulnerable children in Ghana and for provision of their needs.',
        'Pray for CMI training programs — that God would call and equip many for the harvest.',
        'Pray for CMI\'s financial needs, that God would provide for every missionary on the field.',
      ]

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#fafaf9' }}>
      <div className="py-20 px-4 text-center" style={{ backgroundColor: '#1A1A2E' }}>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: titleFont }}>
          {isZh ? '祈禱團契' : 'Prayer Fellowships'}
        </h1>
        <p className="text-white/70 max-w-xl mx-auto" style={{ fontFamily: font }}>
          {isZh
            ? '禱告是宣教的根基與動力。與我們一起禱告，改變世界。'
            : 'Prayer is the foundation and power of missions. Join us in changing the world through prayer.'}
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
        {/* Current prayer needs */}
        <div>
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1A1A2E', fontFamily: titleFont }}>
            {isZh ? '本月代禱事項' : 'This Month\'s Prayer Points'}
          </h2>
          <ul className="space-y-4">
            {requests.map((r, i) => (
              <li key={i} className="flex gap-3" style={{ fontFamily: font }}>
                <span className="text-[#D4A017] font-bold shrink-0 mt-0.5">🙏</span>
                <p className="text-gray-700 leading-relaxed text-sm">{r}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Sign-up */}
        <PrayerSignupForm locale={locale} />
      </div>
    </main>
  )
}
