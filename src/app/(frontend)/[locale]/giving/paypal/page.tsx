import { getLocale } from 'next-intl/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import type { SiteSetting } from '@/payload-types'

const getSettings = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })
    return payload.findGlobal({ slug: 'site-settings' }) as Promise<SiteSetting>
  },
  ['site-settings'],
  { tags: ['site-settings'] },
)

export default async function PaypalPage() {
  const locale = await getLocale()
  const isZh = locale === 'zh'
  const font = isZh ? 'var(--font-chinese)' : 'var(--font-body)'
  const titleFont = isZh ? 'var(--font-chinese)' : 'var(--font-display)'

  let paypalLink = ''
  try {
    const settings = await getSettings()
    paypalLink = settings.paypalLink ?? ''
  } catch { /* use defaults */ }

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#fafaf9' }}>
      <div className="py-16 px-4 text-center" style={{ backgroundColor: '#1A1A2E' }}>
        <h1 className="text-4xl font-bold text-white" style={{ fontFamily: titleFont }}>
          {isZh ? 'PayPal / 信用卡奉獻' : 'Give via PayPal / Credit Card'}
        </h1>
      </div>

      <div className="max-w-xl mx-auto px-4 py-16">
        <div className="bg-white rounded-xl shadow-sm p-8 text-center space-y-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto text-3xl"
            style={{ backgroundColor: '#1E40AF' }}
          >
            💳
          </div>
          <p className="text-gray-700 leading-relaxed" style={{ fontFamily: font }}>
            {isZh
              ? '您可以透過PayPal或信用卡安全地完成奉獻。點擊下方按鈕即可前往奉獻頁面。'
              : 'You can give securely via PayPal or any major credit card. Click the button below to proceed.'}
          </p>
          {paypalLink ? (
            <a
              href={paypalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 rounded-lg font-bold text-white transition-all duration-200 hover:scale-105 hover:brightness-110 shadow-md"
              style={{ backgroundColor: '#1E40AF', fontFamily: font }}
            >
              {isZh ? '前往PayPal奉獻 →' : 'Donate via PayPal →'}
            </a>
          ) : (
            <p className="text-gray-400 text-sm italic" style={{ fontFamily: font }}>
              {isZh ? '奉獻連結即將更新，請聯絡我們。' : 'Donation link coming soon. Please contact us.'}
            </p>
          )}
          <p className="text-sm text-gray-400 pt-4 border-t border-gray-100" style={{ fontFamily: font }}>
            {isZh
              ? 'CMI是501(c)(3)免稅組織，您的奉獻可以抵稅。'
              : 'CMI is a 501(c)(3) non-profit. Your donation is tax-deductible.'}
          </p>
        </div>
      </div>
    </main>
  )
}
