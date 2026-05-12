import { getLocale } from 'next-intl/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { MissionaryCard } from '@/components/MissionaryCard'
import type { Missionary } from '@/payload-types'

const getMissionaries = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'missionaries',
      where: { isActive: { equals: true } },
      sort: 'name',
      limit: 100,
    })
    return docs as Missionary[]
  },
  ['missionaries'],
  { tags: ['missionaries'] },
)

export default async function MissionariesPage() {
  const locale = await getLocale()
  const isZh = locale === 'zh'
  const font = isZh ? 'var(--font-chinese)' : 'var(--font-body)'
  const titleFont = isZh ? 'var(--font-chinese)' : 'var(--font-display)'

  const missionaries = await getMissionaries().catch(() => [] as Missionary[])

  const groups = ['asia', 'middle-east', 'africa', 'usa'] as const
  const groupLabels: Record<string, { en: string; zh: string }> = {
    asia: { en: 'Asia', zh: '亞洲' },
    'middle-east': { en: 'Middle East', zh: '中東' },
    africa: { en: 'Africa', zh: '非洲' },
    usa: { en: 'USA', zh: '美國' },
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#fafaf9' }}>
      <div className="py-20 px-4 text-center" style={{ backgroundColor: '#1A1A2E' }}>
        <p className="text-sm uppercase tracking-widest mb-3" style={{ color: '#D4A017', fontFamily: font }}>
          {isZh ? '認識他們' : 'Meet Them'}
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: titleFont }}>
          {isZh ? '我們的宣教士' : 'Our Missionaries'}
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 space-y-16">
        {groups.map((region) => {
          const regionMissionaries = missionaries.filter((m) => m.region === region)
          if (!regionMissionaries.length) return null
          const label = groupLabels[region][isZh ? 'zh' : 'en']

          return (
            <section key={region}>
              <h2
                className="text-2xl font-bold mb-6 pb-3 border-b border-gray-200"
                style={{ fontFamily: titleFont, color: '#1A1A2E' }}
              >
                {label}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {regionMissionaries.map((m) => (
                  <MissionaryCard key={m.id} missionary={m} locale={locale} />
                ))}
              </div>
            </section>
          )
        })}

        {!missionaries.length && (
          <p className="text-center text-gray-400 py-12" style={{ fontFamily: font }}>
            {isZh ? '宣教士資料即將更新' : 'Missionary profiles coming soon'}
          </p>
        )}
      </div>
    </main>
  )
}
