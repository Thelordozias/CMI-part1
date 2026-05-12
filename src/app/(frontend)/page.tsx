import { HeroSlider } from '@/components/HeroSlider'
import { EventsCarousel } from '@/components/EventsCarousel'
import { GivingButtons } from '@/components/GivingButtons'
import { getLocale } from 'next-intl/server'
import Link from 'next/link'
import { Globe, Heart, ArrowRight, MapPin } from 'lucide-react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import type { Event, SiteSetting } from '@/payload-types'

const getFeaturedEvents = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'events',
      where: { isFeatured: { equals: true }, isActive: { equals: true } },
      sort: 'date',
      limit: 6,
      depth: 1,
    })
    return docs as Event[]
  },
  ['events-featured'],
  { tags: ['events'] },
)

const getSiteSettings = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })
    return payload.findGlobal({ slug: 'site-settings' }) as Promise<SiteSetting>
  },
  ['site-settings'],
  { tags: ['site-settings'] },
)

export default async function HomePage() {
  const locale = await getLocale()
  const isZh = locale === 'zh'

  const [featuredEvents, siteSettings] = await Promise.all([
    getFeaturedEvents().catch(() => [] as Event[]),
    getSiteSettings().catch(() => null as SiteSetting | null),
  ])

  const aboutTitleEn = siteSettings?.whoWeAre_title_en ?? 'Care Ministries International'
  const aboutTitleZh = siteSettings?.whoWeAre_title_zh ?? '關懷國際宣教機構'
  const missionEn = siteSettings?.missionStatement_en ?? '"Gospel into China, Gospel out of China" — Mobilizing the next generation of Chinese Christians to the nations'
  const missionZh = siteSettings?.missionStatement_zh ?? '「福音進中華，福音出中華」— 動員下一代華裔基督徒走向萬國'

  const font = (zh: boolean) =>
    zh ? 'var(--font-chinese)' : 'var(--font-body)'
  const titleFont = (zh: boolean) =>
    zh ? 'var(--font-chinese)' : 'var(--font-display)'

  const ministries = [
    {
      region: isZh ? '亞洲事工' : 'Asia',
      countries: isZh ? '柬埔寨 · 印尼 · 台灣' : 'Cambodia · Indonesia · Taiwan',
      href: `/${locale}/regional/asia`,
      color: '#1E40AF',
      desc: isZh
        ? '在東南亞服事邊緣社群，透過教育、醫療與福音宣教榮耀主名。'
        : 'Serving marginalized communities across Southeast Asia through education, healthcare, and the Gospel.',
    },
    {
      region: isZh ? '中東地區' : 'Middle East',
      countries: isZh ? '土耳其 · 黎巴嫩' : 'Turkey · Lebanon',
      href: `/${locale}/regional/middle-east`,
      color: '#6B21A8',
      desc: isZh
        ? '在充滿挑戰的地區帶來盼望與和平，服事難民與本地社群。'
        : 'Bringing hope and peace to challenging regions, serving refugees and local communities.',
    },
    {
      region: isZh ? '非洲地區' : 'Africa',
      countries: isZh ? '迦納' : 'Ghana',
      href: `/${locale}/regional/africa`,
      color: '#D4A017',
      desc: isZh
        ? '透過社區發展與教會植立，在迦納服事貧困兒童與家庭。'
        : 'Serving vulnerable children and families in Ghana through community development and church planting.',
    },
  ]

  const involvement = [
    {
      icon: <Heart size={32} strokeWidth={1.5} />,
      title: isZh ? '奉獻支持' : 'Give',
      desc: isZh
        ? '您的奉獻直接支持宣教士在世界各地的日常事工與差旅需要。'
        : 'Your giving directly supports missionaries in their daily ministry and travel needs around the world.',
      href: `/${locale}/giving`,
      color: '#D4A017',
      cta: isZh ? '立即奉獻' : 'Donate Now',
    },
    {
      icon: <Globe size={32} strokeWidth={1.5} />,
      title: isZh ? '禱告同行' : 'Pray',
      desc: isZh
        ? '成為我們的禱告夥伴，定期為宣教士和宣教地區的需要代禱。'
        : 'Become a prayer partner and intercede regularly for our missionaries and their mission fields.',
      href: `/${locale}/news/partners`,
      color: '#6B21A8',
      cta: isZh ? '加入禱告' : 'Join Prayer',
    },
    {
      icon: <MapPin size={32} strokeWidth={1.5} />,
      title: isZh ? '回應差遣' : 'Go',
      desc: isZh
        ? '回應神的呼召，參加宣教訓練課程，踏上宣教工場。'
        : 'Respond to God\'s call, join our training programs, and step out to the mission field.',
      href: `/${locale}/mobilization`,
      color: '#1E40AF',
      cta: isZh ? '了解培訓' : 'Explore Training',
    },
  ]

  return (
    <main className="flex flex-col">

      {/* ── 1. Hero Slider ── */}
      <HeroSlider />

      {/* ── 2. Mission Statement Bar ── */}
      <div
        className="py-5 text-center px-4"
        style={{ backgroundColor: '#1A1A2E' }}
      >
        <p
          className="text-white/75 text-sm md:text-base italic max-w-2xl mx-auto tracking-wide"
          style={{ fontFamily: font(isZh) }}
        >
          {isZh ? missionZh : missionEn}
        </p>
      </div>

      {/* ── 3. About Section ── */}
      <section className="py-20 px-4" style={{ backgroundColor: '#fafaf9' }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div>
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: '#D4A017', fontFamily: font(isZh) }}
            >
              {isZh ? '關於我們' : 'Who We Are'}
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold mb-6 leading-snug"
              style={{ fontFamily: titleFont(isZh), color: '#1A1A2E' }}
            >
              {isZh
                ? '關懷國際宣教機構'
                : 'Care Ministries International'}
            </h2>
            <p
              className="text-gray-600 text-base md:text-lg leading-relaxed mb-4"
              style={{ fontFamily: font(isZh) }}
            >
              {isZh
                ? 'CMI（關懷國際宣教機構）是一個致力於動員、裝備和差遣華裔基督徒參與跨文化宣教的機構。我們相信神對世界各民族的宣教呼召，特別關注將福音帶入中華，並從華人教會差遣宣教士出到萬國。'
                : 'CMI is dedicated to mobilizing, equipping, and sending Chinese Christians into cross-cultural missions. We believe in God\'s call to reach all nations — bringing the Gospel into China and sending missionaries from the Chinese church to the ends of the earth.'}
            </p>
            <p
              className="text-gray-500 text-base leading-relaxed mb-8"
              style={{ fontFamily: font(isZh) }}
            >
              {isZh
                ? '自成立以來，我們在亞洲、中東和非洲的多個地區建立了宣教據點，服事當地社群，並持續差遣和支援宣教士。'
                : 'Since our founding, we have established mission bases across Asia, the Middle East, and Africa — serving local communities and continuously sending and supporting missionaries.'}
            </p>
            <Link
              href={`/${locale}/about`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded font-semibold text-white transition-all duration-200 hover:brightness-110 hover:gap-3"
              style={{
                backgroundColor: '#6B21A8',
                fontFamily: font(isZh),
              }}
            >
              {isZh ? '了解更多' : 'Learn More'}
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Decorative region map / image placeholder */}
          <div
            className="relative h-80 md:h-96 rounded-xl overflow-hidden shadow-2xl flex items-end"
            style={{ backgroundColor: '#1A1A2E' }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40"
              style={{ backgroundImage: "url('/images/hero-2.jpg')" }}
            />
            <div className="relative z-10 w-full p-8">
              <p
                className="text-white/60 text-xs uppercase tracking-widest mb-2"
                style={{ fontFamily: font(isZh) }}
              >
                {isZh ? '宣教工場' : 'Mission Fields'}
              </p>
              <p
                className="text-white text-xl font-bold"
                style={{ fontFamily: font(isZh) }}
              >
                {isZh
                  ? '柬埔寨 · 印尼 · 台灣 · 迦納 · 土耳其 · 黎巴嫩'
                  : 'Cambodia · Indonesia · Taiwan · Ghana · Turkey · Lebanon'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Ministry Regions ── */}
      <section className="py-20 px-4" style={{ backgroundColor: '#f0f0f5' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: '#D4A017', fontFamily: font(isZh) }}
            >
              {isZh ? '宣教地區' : 'Where We Serve'}
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ fontFamily: titleFont(isZh), color: '#1A1A2E' }}
            >
              {isZh ? '我們的宣教事工' : 'Our Ministries'}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-7">
            {ministries.map((item) => (
              <Link
                key={item.region}
                href={item.href}
                className="group block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
              >
                {/* Color band */}
                <div
                  className="h-3 w-full"
                  style={{ backgroundColor: item.color }}
                />
                <div className="p-7">
                  <h3
                    className="text-xl font-bold mb-1"
                    style={{
                      color: '#1A1A2E',
                      fontFamily: titleFont(isZh),
                    }}
                  >
                    {item.region}
                  </h3>
                  <p
                    className="text-sm mb-4 font-medium"
                    style={{ color: item.color, fontFamily: font(isZh) }}
                  >
                    {item.countries}
                  </p>
                  <p
                    className="text-gray-600 text-sm leading-relaxed mb-5"
                    style={{ fontFamily: font(isZh) }}
                  >
                    {item.desc}
                  </p>
                  <span
                    className="inline-flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all duration-200"
                    style={{ color: item.color, fontFamily: font(isZh) }}
                  >
                    {isZh ? '了解更多' : 'Learn More'}
                    <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Events Carousel (featured events from CMS) ── */}
      {featuredEvents.length > 0 && (
        <section className="py-16 px-8" style={{ backgroundColor: '#fafaf9' }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: '#D4A017', fontFamily: font(isZh) }}>
                {isZh ? '即將舉行' : 'Upcoming'}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: titleFont(isZh), color: '#1A1A2E' }}>
                {isZh ? '活動消息' : 'Events & Conferences'}
              </h2>
            </div>
            <EventsCarousel events={featuredEvents} locale={locale} />
            <div className="text-center mt-8">
              <Link href={`/${locale}/mobilization/conferences`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#6B21A8] hover:text-[#D4A017] transition-colors"
                style={{ fontFamily: font(isZh) }}>
                {isZh ? '查看所有活動' : 'View All Events'} <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── 6. Get Involved ── */}
      <section className="py-20 px-4" style={{ backgroundColor: '#1A1A2E' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: '#D4A017', fontFamily: font(isZh) }}
            >
              {isZh ? '如何參與' : 'Get Involved'}
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-white"
              style={{ fontFamily: titleFont(isZh) }}
            >
              {isZh ? '與我們一起改變世界' : 'Change the World With Us'}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {involvement.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group block p-8 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mb-5" style={{ color: item.color }}>
                  {item.icon}
                </div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: item.color, fontFamily: titleFont(isZh) }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-white/65 text-sm leading-relaxed mb-6"
                  style={{ fontFamily: font(isZh) }}
                >
                  {item.desc}
                </p>
                <span
                  className="inline-flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all duration-200"
                  style={{ color: item.color, fontFamily: font(isZh) }}
                >
                  {item.cta}
                  <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CTA Banner ── */}
      <section
        className="py-16 px-4 text-center"
        style={{ backgroundColor: '#D4A017' }}
      >
        <h2
          className="text-3xl md:text-4xl font-bold text-white mb-4"
          style={{ fontFamily: titleFont(isZh) }}
        >
          {isZh ? '加入宣教大業' : 'Join the Great Commission'}
        </h2>
        <p
          className="text-white/90 text-base md:text-lg mb-8 max-w-xl mx-auto"
          style={{ fontFamily: font(isZh) }}
        >
          {isZh
            ? '一起為主擴展神的國度，直到主耶穌再來的那日。'
            : "Together, let us advance God's kingdom until the day of Christ's return."}
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href={`/${locale}/about`}
            className="inline-block px-8 py-3 rounded font-bold bg-white hover:bg-gray-100 transition-colors duration-200"
            style={{ color: '#D4A017', fontFamily: font(isZh) }}
          >
            {isZh ? '認識CMI' : 'Discover CMI'}
          </Link>
          <Link
            href={`/${locale}/giving`}
            className="inline-block px-8 py-3 rounded font-bold border-2 border-white text-white hover:bg-white/10 transition-colors duration-200"
            style={{ fontFamily: font(isZh) }}
          >
            {isZh ? '立即奉獻' : 'Give Today'}
          </Link>
        </div>
      </section>

    </main>
  )
}
