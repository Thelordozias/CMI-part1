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

export default async function MissionPage() {
  const locale = await getLocale()
  const isZh = locale === 'zh'
  const font = isZh ? 'var(--font-chinese)' : 'var(--font-body)'
  const titleFont = isZh ? 'var(--font-chinese)' : 'var(--font-display)'

  let statement = ''
  try {
    const settings = await getSettings()
    statement = isZh
      ? settings.missionStatement_zh ?? settings.missionStatement_en ?? ''
      : settings.missionStatement_en ?? ''
  } catch { /* use defaults */ }

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#fafaf9' }}>
      <div className="py-20 px-4 text-center" style={{ backgroundColor: '#1A1A2E' }}>
        <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: titleFont }}>
          {isZh ? '異象與使命' : 'Vision & Mission'}
        </h1>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16 space-y-12">
        {/* Mission tagline */}
        <blockquote
          className="text-2xl md:text-3xl font-bold text-center italic py-8 px-6 rounded-xl"
          style={{ backgroundColor: '#1A1A2E', color: '#D4A017', fontFamily: titleFont }}
        >
          {statement || (isZh ? '「福音進中華，福音出中華」' : '"Gospel into China, Gospel out of China"')}
        </blockquote>

        {/* Vision */}
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#1A1A2E', fontFamily: titleFont }}>
            {isZh ? '我們的異象' : 'Our Vision'}
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg" style={{ fontFamily: font }}>
            {isZh
              ? '看見華裔基督徒在全球宣教運動中扮演重要角色，將福音帶入中華，也從中華帶出福音到萬國。'
              : 'To see Chinese Christians play a vital role in the global missions movement — bringing the Gospel into China and out to the nations.'}
          </p>
        </section>

        {/* Mission */}
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#1A1A2E', fontFamily: titleFont }}>
            {isZh ? '我們的使命' : 'Our Mission'}
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg" style={{ fontFamily: font }}>
            {isZh
              ? '動員、裝備和差遣華裔基督徒參與跨文化宣教，在亞洲、中東、非洲等地服事，建立教會，榮耀主名。'
              : 'To mobilize, equip, and send Chinese Christians into cross-cultural missions — planting churches and glorifying God across Asia, the Middle East, Africa, and beyond.'}
          </p>
        </section>

        {/* Values */}
        <section>
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1A1A2E', fontFamily: titleFont }}>
            {isZh ? '我們的價值觀' : 'Our Core Values'}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {(isZh
              ? [
                  ['聖經真理', '以聖經為信仰和生活的唯一準則'],
                  ['宣教心志', '以完成大使命為首要目標'],
                  ['跨文化服事', '尊重並融入各民族文化'],
                  ['門徒訓練', '培育靈命成熟的門徒'],
                ]
              : [
                  ['Biblical Truth', 'Scripture as our sole authority for faith and life'],
                  ['Missions Heart', 'Completing the Great Commission as our primary goal'],
                  ['Cross-Cultural Sensitivity', 'Respecting and engaging diverse cultures'],
                  ['Discipleship', 'Developing spiritually mature disciples'],
                ]
            ).map(([title, desc]) => (
              <div key={title} className="flex gap-3 p-4 bg-white rounded-lg shadow-sm">
                <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ backgroundColor: '#D4A017' }} />
                <div>
                  <p className="font-semibold mb-1" style={{ color: '#1A1A2E', fontFamily: font }}>{title}</p>
                  <p className="text-gray-500 text-sm" style={{ fontFamily: font }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
