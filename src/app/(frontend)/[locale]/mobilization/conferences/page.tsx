import { getLocale } from 'next-intl/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { EventsCarousel } from '@/components/EventsCarousel'
import type { Event } from '@/payload-types'

const getEvents = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'events',
      where: { isActive: { equals: true } },
      sort: 'date',
      limit: 20,
      depth: 1,
    })
    return docs as Event[]
  },
  ['events-all'],
  { tags: ['events'] },
)

export default async function ConferencesPage() {
  const locale = await getLocale()
  const isZh = locale === 'zh'
  const font = isZh ? 'var(--font-chinese)' : 'var(--font-body)'
  const titleFont = isZh ? 'var(--font-chinese)' : 'var(--font-display)'

  const events = await getEvents().catch(() => [] as Event[])

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#fafaf9' }}>
      <div className="py-20 px-4 text-center" style={{ backgroundColor: '#1A1A2E' }}>
        <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: titleFont }}>
          {isZh ? '特別聚會' : 'Special Conferences'}
        </h1>
        <p className="text-white/60 mt-3 max-w-xl mx-auto" style={{ fontFamily: font }}>
          {isZh ? '宣教大會與特別佈道會' : 'Missions conferences and special evangelistic events'}
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-16">
        <h2 className="text-2xl font-bold mb-8" style={{ color: '#1A1A2E', fontFamily: titleFont }}>
          {isZh ? '即將舉行的活動' : 'Upcoming Events'}
        </h2>
        <EventsCarousel events={events} locale={locale} />
      </div>
    </main>
  )
}
