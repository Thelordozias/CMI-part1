'use client'
import { useState } from 'react'
import Image from 'next/image'
import { ChevronDown, ChevronUp, MapPin } from 'lucide-react'
import type { Missionary } from '@/payload-types'

const REGION_COLORS: Record<string, string> = {
  asia: '#1E40AF',
  'middle-east': '#6B21A8',
  africa: '#D4A017',
  usa: '#16A34A',
}

const REGION_LABELS: Record<string, { en: string; zh: string }> = {
  asia: { en: 'Asia', zh: '亞洲' },
  'middle-east': { en: 'Middle East', zh: '中東' },
  africa: { en: 'Africa', zh: '非洲' },
  usa: { en: 'USA', zh: '美國' },
}

interface MissionaryCardProps {
  missionary: Missionary
  locale: string
}

export function MissionaryCard({ missionary, locale }: MissionaryCardProps) {
  const [showPrayer, setShowPrayer] = useState(false)
  const isZh = locale === 'zh'
  const font = isZh ? 'var(--font-chinese)' : 'var(--font-body)'

  const region = missionary.region as string
  const color = REGION_COLORS[region] ?? '#6B21A8'
  const regionLabel = REGION_LABELS[region]?.[isZh ? 'zh' : 'en'] ?? region

  const photo = typeof missionary.photo === 'object' && missionary.photo !== null
    ? missionary.photo
    : null

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {/* Photo */}
      <div className="relative h-56 bg-gray-100">
        {photo && (photo as any).url ? (
          <Image
            src={(photo as any).url}
            alt={missionary.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-4xl font-bold text-white"
            style={{ backgroundColor: color }}
          >
            {missionary.name.charAt(0)}
          </div>
        )}
        {/* Region badge */}
        <span
          className="absolute top-3 right-3 px-3 py-1 rounded-full text-white text-xs font-semibold"
          style={{ backgroundColor: color, fontFamily: font }}
        >
          {regionLabel}
        </span>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <h3
          className="text-lg font-bold mb-1"
          style={{ color: '#1A1A2E', fontFamily: font }}
        >
          {missionary.name}
        </h3>
        {missionary.country && (
          <p className="flex items-center gap-1 text-gray-500 text-sm mb-3" style={{ fontFamily: font }}>
            <MapPin size={13} />
            {missionary.country}
          </p>
        )}

        {/* Prayer needs toggle */}
        <button
          onClick={() => setShowPrayer(v => !v)}
          className="mt-auto flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200"
          style={{ color, fontFamily: font }}
        >
          {isZh ? '代禱事項' : 'Prayer Needs'}
          {showPrayer ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {showPrayer && missionary.prayerNeeds_en && (
          <div
            className="mt-3 pt-3 border-t border-gray-100 text-sm text-gray-600 leading-relaxed"
            style={{ fontFamily: font }}
          >
            {/* Simple text fallback — richText not rendered here for card brevity */}
            {isZh ? '見代禱頁面' : 'See prayer page for details'}
          </div>
        )}
      </div>
    </div>
  )
}
