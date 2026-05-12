import { getLocale } from 'next-intl/server'
import Link from 'next/link'

export default async function NewslettersPage() {
  const locale = await getLocale()
  const isZh = locale === 'zh'
  const font = isZh ? 'var(--font-chinese)' : 'var(--font-body)'
  const titleFont = isZh ? 'var(--font-chinese)' : 'var(--font-display)'

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#fafaf9' }}>
      <div className="py-20 px-4 text-center" style={{ backgroundColor: '#1A1A2E' }}>
        <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: titleFont }}>
          {isZh ? '關懷通訊' : 'Care Newsletters'}
        </h1>
        <p className="text-white/60 mt-3 max-w-xl mx-auto" style={{ fontFamily: font }}>
          {isZh ? 'CMI定期通訊，了解事工的最新進展' : 'Regular updates from CMI ministry around the world'}
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-xl shadow-sm p-12">
          <p className="text-5xl mb-6">📬</p>
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#1A1A2E', fontFamily: titleFont }}>
            {isZh ? '通訊檔案即將上線' : 'Newsletter Archive Coming Soon'}
          </h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto" style={{ fontFamily: font }}>
            {isZh
              ? '我們正在整理過往的通訊存檔。在此期間，您可以訂閱成為禱告夥伴，收到最新消息。'
              : 'We are organizing our newsletter archive. In the meantime, sign up as a prayer partner to receive the latest updates.'}
          </p>
          <Link
            href={`/${locale}/news/partners`}
            className="inline-block px-7 py-3 rounded-lg font-bold text-white transition-all duration-200 hover:brightness-110"
            style={{ backgroundColor: '#6B21A8', fontFamily: font }}
          >
            {isZh ? '訂閱最新消息' : 'Subscribe for Updates'}
          </Link>
        </div>
      </div>
    </main>
  )
}
