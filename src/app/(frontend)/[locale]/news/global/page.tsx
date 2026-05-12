import { getLocale } from 'next-intl/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import type { SiteSetting } from '@/payload-types'
import Link from 'next/link'
import { Globe, Heart, BookOpen } from 'lucide-react'

const getSiteSettings = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })
    return payload.findGlobal({ slug: 'site-settings' }) as Promise<SiteSetting>
  },
  ['site-settings'],
  { tags: ['site-settings'] },
)

export default async function GlobalOutreachPage() {
  const locale = await getLocale()
  const isZh = locale === 'zh'
  const font = isZh ? 'var(--font-chinese)' : 'var(--font-body)'
  const titleFont = isZh ? 'var(--font-chinese)' : 'var(--font-display)'

  let missionEn = '"Gospel into China, Gospel out of China" — Mobilizing the next generation of Chinese Christians to the nations'
  let missionZh = '「福音進中華，福音出中華」— 動員下一代華裔基督徒走向萬國'

  try {
    const settings = await getSiteSettings()
    if (settings.missionStatement_en) missionEn = settings.missionStatement_en
    if (settings.missionStatement_zh) missionZh = settings.missionStatement_zh
  } catch { /* use defaults */ }

  const prayerPoints = isZh
    ? [
        {
          icon: <Globe size={24} />,
          title: '為萬民禱告',
          body: '求神開啟我們的心眼，看見世上仍有數十億人未曾聽聞福音。願我們胸懷普世，為每一個族群、每一個國家代禱。',
        },
        {
          icon: <Heart size={24} />,
          title: '為宣教士代禱',
          body: '為CMI差遣在亞洲、中東、非洲及美國的宣教士代禱——求神保守他們的身心靈、家庭、以及事工的果效。',
        },
        {
          icon: <BookOpen size={24} />,
          title: '為福音廣傳禱告',
          body: '求神為各地教會開門，讓聖言得以暢行，在每一個文化和語言中結出豐盛的果實。',
        },
      ]
    : [
        {
          icon: <Globe size={24} />,
          title: 'Praying for All Nations',
          body: 'Ask God to open our eyes to the billions still unreached by the Gospel. May our hearts embrace the world as we intercede for every tribe, tongue, and nation.',
        },
        {
          icon: <Heart size={24} />,
          title: 'Praying for Our Missionaries',
          body: 'Intercede for CMI missionaries serving in Asia, the Middle East, Africa, and the USA — for their health, families, and the fruitfulness of their ministries.',
        },
        {
          icon: <BookOpen size={24} />,
          title: 'Praying for the Spread of the Gospel',
          body: 'Ask God to open doors for churches everywhere, that His Word may spread freely and bear abundant fruit in every culture and language.',
        },
      ]

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#fafaf9' }}>
      {/* Hero */}
      <div className="py-20 px-4 text-center" style={{ backgroundColor: '#1A1A2E' }}>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: titleFont }}>
          {isZh ? '胸懷普世' : 'Global Outreach'}
        </h1>
        <p className="text-white/70 max-w-2xl mx-auto text-base md:text-lg italic" style={{ fontFamily: font }}>
          {isZh ? missionZh : missionEn}
        </p>
      </div>

      {/* Intro */}
      <section className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-600 text-base md:text-lg leading-relaxed" style={{ fontFamily: font }}>
          {isZh
            ? 'CMI相信，神呼召每一位基督徒參與宣教——不論是藉著去、藉著送、還是藉著禱告。「胸懷普世」提醒我們，在禱告中承擔對萬民的負擔，是宣教最基本也最重要的參與方式。'
            : 'CMI believes God calls every Christian to participate in missions — whether by going, sending, or praying. "Global Outreach" reminds us that carrying the burden for all nations in prayer is the most foundational way to be part of God\'s global mission.'}
        </p>
      </section>

      {/* Prayer Points */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <h2
          className="text-2xl md:text-3xl font-bold text-center mb-10"
          style={{ color: '#1A1A2E', fontFamily: titleFont }}
        >
          {isZh ? '今日代禱事項' : 'Prayer Focus'}
        </h2>
        <div className="grid md:grid-cols-3 gap-7">
          {prayerPoints.map((point, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm p-8 border-t-4"
              style={{ borderColor: i === 0 ? '#1E40AF' : i === 1 ? '#6B21A8' : '#D4A017' }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white mb-5"
                style={{ backgroundColor: i === 0 ? '#1E40AF' : i === 1 ? '#6B21A8' : '#D4A017' }}
              >
                {point.icon}
              </div>
              <h3 className="text-lg font-bold mb-3" style={{ color: '#1A1A2E', fontFamily: titleFont }}>
                {point.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: font }}>
                {point.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center" style={{ backgroundColor: '#1A1A2E' }}>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: titleFont }}>
          {isZh ? '加入禱告夥伴行列' : 'Join Our Prayer Network'}
        </h2>
        <p className="text-white/70 max-w-xl mx-auto mb-8" style={{ fontFamily: font }}>
          {isZh
            ? '成為宣教祈禱夥伴，每月收到宣教士代禱信和最新消息。'
            : 'Become a prayer partner and receive monthly missionary prayer letters and ministry updates.'}
        </p>
        <Link
          href={`/${locale}/news/partners`}
          className="inline-block px-8 py-3 rounded font-bold text-white transition-all duration-200 hover:brightness-110"
          style={{ backgroundColor: '#D4A017', fontFamily: font }}
        >
          {isZh ? '成為禱告夥伴' : 'Become a Prayer Partner'}
        </Link>
      </section>
    </main>
  )
}
