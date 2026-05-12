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

export default async function ZellePage() {
  const locale = await getLocale()
  const isZh = locale === 'zh'
  const font = isZh ? 'var(--font-chinese)' : 'var(--font-body)'
  const titleFont = isZh ? 'var(--font-chinese)' : 'var(--font-display)'

  let info = ''
  try {
    const settings = await getSettings()
    info = isZh
      ? settings.zelleInfo_zh ?? settings.zelleInfo_en ?? ''
      : settings.zelleInfo_en ?? ''
  } catch { /* use static content */ }

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#fafaf9' }}>
      <div className="py-16 px-4 text-center" style={{ backgroundColor: '#1A1A2E' }}>
        <h1 className="text-4xl font-bold text-white" style={{ fontFamily: titleFont }}>
          {isZh ? 'Zelle 奉獻' : 'Give via Zelle'}
        </h1>
      </div>

      <div className="max-w-xl mx-auto px-4 py-16">
        <div className="bg-white rounded-xl shadow-sm p-8 space-y-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto text-3xl"
            style={{ backgroundColor: '#6B21A8' }}
          >
            💜
          </div>

          {info ? (
            <p className="text-gray-700 leading-relaxed whitespace-pre-line text-center" style={{ fontFamily: font }}>
              {info}
            </p>
          ) : (
            <div className="text-center space-y-2">
              <p className="font-semibold text-gray-800" style={{ fontFamily: font }}>
                {isZh ? '請使用以下信息透過Zelle奉獻：' : 'Send your gift via Zelle to:'}
              </p>
              <p className="text-2xl font-bold" style={{ color: '#6B21A8', fontFamily: font }}>
                giving@cmigo.org
              </p>
              <p className="text-gray-500 text-sm" style={{ fontFamily: font }}>
                {isZh
                  ? '請在備忘欄寫上「宣教奉獻」或您指定的宣教士姓名'
                  : 'Add a note: "Missions Giving" or your designated missionary\'s name'}
              </p>
            </div>
          )}

          <div className="pt-4 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-400" style={{ fontFamily: font }}>
              {isZh ? '感謝您的奉獻！願神賜福您。' : 'Thank you for your generous gift. God bless you.'}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
