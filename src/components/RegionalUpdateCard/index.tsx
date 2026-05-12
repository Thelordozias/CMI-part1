import Link from 'next/link'
import Image from 'next/image'
import type { RegionalUpdate } from '@/payload-types'

const REGION_MAP: Record<string, { en: string; zh: string; path: string; color: string }> = {
  'asia-cambodia':      { en: 'Cambodia',           zh: '柬埔寨',   path: '/regional/asia/cambodia',        color: '#1E40AF' },
  'asia-indonesia':     { en: 'Indonesia',           zh: '印尼',     path: '/regional/asia/indonesia',       color: '#1E40AF' },
  'asia-taiwan':        { en: 'Taiwan',              zh: '台灣',     path: '/regional/asia/taiwan',          color: '#1E40AF' },
  'middle-east-turkey': { en: 'Turkey',              zh: '土耳其',   path: '/regional/middle-east/turkey',   color: '#6B21A8' },
  'middle-east-lebanon':{ en: 'Lebanon',             zh: '黎巴嫩',   path: '/regional/middle-east/lebanon',  color: '#6B21A8' },
  'africa-ghana':       { en: 'Ghana',               zh: '迦納',     path: '/regional/africa/ghana',         color: '#D4A017' },
  'usa-socal':          { en: 'Southern California', zh: '南加州',   path: '/regional/usa/socal',            color: '#16A34A' },
}

interface RegionalUpdateCardProps {
  update: RegionalUpdate
  locale: string
}

export function RegionalUpdateCard({ update, locale }: RegionalUpdateCardProps) {
  const isZh = locale === 'zh'
  const font = isZh ? 'var(--font-chinese)' : 'var(--font-body)'
  const titleFont = isZh ? 'var(--font-chinese)' : 'var(--font-display)'

  const region = REGION_MAP[update.region as string]
  const color = region?.color ?? '#6B21A8'
  const regionLabel = region ? (isZh ? region.zh : region.en) : update.region
  const regionPath = region?.path ?? ''

  const media = typeof update.media === 'object' && update.media !== null ? update.media : null
  const title = isZh ? update.title_zh || update.title_en : update.title_en
  const date = new Date(update.date).toLocaleDateString(
    isZh ? 'zh-TW' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' },
  )

  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Image */}
      <div className="relative h-44 bg-gray-100">
        {media && (media as any).url ? (
          <Image
            src={(media as any).url}
            alt={title ?? ''}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="w-full h-full" style={{ backgroundColor: color, opacity: 0.15 }} />
        )}
        <span
          className="absolute top-3 left-3 px-2.5 py-1 rounded text-white text-xs font-semibold"
          style={{ backgroundColor: color, fontFamily: font }}
        >
          {regionLabel}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-gray-400 text-xs mb-2" style={{ fontFamily: font }}>
          {date}
        </p>
        <h3
          className="text-base font-bold mb-3 leading-snug line-clamp-2"
          style={{ color: '#1A1A2E', fontFamily: titleFont }}
        >
          {title}
        </h3>
        <Link
          href={`/${locale}${regionPath}`}
          className="mt-auto text-sm font-semibold transition-colors duration-200 hover:opacity-80"
          style={{ color, fontFamily: font }}
        >
          {isZh ? '閱讀更多 →' : 'Read More →'}
        </Link>
      </div>
    </article>
  )
}
