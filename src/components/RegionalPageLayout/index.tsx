import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { RegionalUpdateCard } from '@/components/RegionalUpdateCard'
import { MissionaryCard } from '@/components/MissionaryCard'
import type { RegionalUpdate, Missionary } from '@/payload-types'

interface RegionalPageLayoutProps {
  locale: string
  regionSlug: string           // e.g. 'asia-cambodia'
  missionaryRegion: string     // e.g. 'asia'
  titleEn: string
  titleZh: string
  subtitleEn: string
  subtitleZh: string
  color: string
  flagEmoji: string
}

function makeUpdatesGetter(regionSlug: string) {
  return unstable_cache(
    async () => {
      const payload = await getPayload({ config: configPromise })
      const { docs } = await payload.find({
        collection: 'regional-updates',
        where: { region: { equals: regionSlug }, isPublished: { equals: true } },
        sort: '-date',
        limit: 6,
        depth: 1,
      })
      return docs as RegionalUpdate[]
    },
    [`regional-updates-${regionSlug}`],
    { tags: ['regional-updates'] },
  )
}

function makeMissionariesGetter(region: string) {
  return unstable_cache(
    async () => {
      const payload = await getPayload({ config: configPromise })
      const { docs } = await payload.find({
        collection: 'missionaries',
        where: { region: { equals: region }, isActive: { equals: true } },
        sort: 'name',
        limit: 8,
        depth: 1,
      })
      return docs as Missionary[]
    },
    [`missionaries-${region}`],
    { tags: ['missionaries'] },
  )
}

export async function RegionalPageLayout({
  locale,
  regionSlug,
  missionaryRegion,
  titleEn,
  titleZh,
  subtitleEn,
  subtitleZh,
  color,
  flagEmoji,
}: RegionalPageLayoutProps) {
  const isZh = locale === 'zh'
  const font = isZh ? 'var(--font-chinese)' : 'var(--font-body)'
  const titleFont = isZh ? 'var(--font-chinese)' : 'var(--font-display)'

  const [updates, missionaries] = await Promise.all([
    makeUpdatesGetter(regionSlug)().catch(() => [] as RegionalUpdate[]),
    makeMissionariesGetter(missionaryRegion)().catch(() => [] as Missionary[]),
  ])

  const title = isZh ? titleZh : titleEn
  const subtitle = isZh ? subtitleZh : subtitleEn

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#fafaf9' }}>
      {/* Hero */}
      <div className="py-20 px-4 text-center" style={{ backgroundColor: '#1A1A2E' }}>
        <p className="text-5xl mb-4">{flagEmoji}</p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3" style={{ fontFamily: titleFont }}>{title}</h1>
        <p className="text-white/60 max-w-xl mx-auto" style={{ fontFamily: font }}>{subtitle}</p>
        <div className="w-16 h-1 rounded-full mx-auto mt-6" style={{ backgroundColor: color }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 space-y-16">
        {/* Updates */}
        <section>
          <h2 className="text-2xl font-bold mb-7" style={{ color: '#1A1A2E', fontFamily: titleFont }}>
            {isZh ? '最新動態' : 'Recent Updates'}
          </h2>
          {updates.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {updates.map((u) => <RegionalUpdateCard key={u.id} update={u} locale={locale} />)}
            </div>
          ) : (
            <p className="text-gray-400" style={{ fontFamily: font }}>
              {isZh ? '動態即將更新' : 'Updates coming soon'}
            </p>
          )}
        </section>

        {/* Missionaries */}
        {missionaries.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-7" style={{ color: '#1A1A2E', fontFamily: titleFont }}>
              {isZh ? '在此服事的宣教士' : 'Missionaries Serving Here'}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {missionaries.map((m) => <MissionaryCard key={m.id} missionary={m} locale={locale} />)}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
