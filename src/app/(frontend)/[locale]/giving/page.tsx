import { getLocale } from 'next-intl/server'
import { GivingButtons } from '@/components/GivingButtons'

export default async function GivingPage() {
  const locale = await getLocale()
  const isZh = locale === 'zh'
  const font = isZh ? 'var(--font-chinese)' : 'var(--font-body)'
  const titleFont = isZh ? 'var(--font-chinese)' : 'var(--font-display)'

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#fafaf9' }}>
      <div className="py-20 px-4 text-center" style={{ backgroundColor: '#1A1A2E' }}>
        <p className="text-sm uppercase tracking-widest mb-3" style={{ color: '#D4A017', fontFamily: font }}>
          {isZh ? '支持宣教' : 'Support Missions'}
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: titleFont }}>
          {isZh ? '奉獻支持' : 'Give to CMI'}
        </h1>
        <p className="text-white/70 max-w-xl mx-auto text-lg" style={{ fontFamily: font }}>
          {isZh
            ? '您的奉獻直接支持宣教士在世界各地的事工'
            : 'Your giving directly supports missionaries serving around the world'}
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <p className="text-center text-gray-500 mb-10" style={{ fontFamily: font }}>
          {isZh ? '選擇您方便的奉獻方式' : 'Choose your preferred giving method'}
        </p>
        <GivingButtons locale={locale} variant="full" />

        <div className="mt-16 p-6 bg-purple-50 rounded-xl text-center">
          <p className="text-sm text-gray-600" style={{ fontFamily: font }}>
            {isZh
              ? 'CMI是501(c)(3)免稅組織。您的奉獻可以抵稅。'
              : 'CMI is a 501(c)(3) non-profit organization. Your donation is tax-deductible.'}
          </p>
        </div>
      </div>
    </main>
  )
}
