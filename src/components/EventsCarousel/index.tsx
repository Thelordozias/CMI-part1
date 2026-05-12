'use client'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Calendar, MapPin, ExternalLink } from 'lucide-react'
import type { Event } from '@/payload-types'

interface EventsCarouselProps {
  events: Event[]
  locale: string
}

export function EventsCarousel({ events, locale }: EventsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const isZh = locale === 'zh'
  const font = isZh ? 'var(--font-chinese)' : 'var(--font-body)'
  const titleFont = isZh ? 'var(--font-chinese)' : 'var(--font-display)'

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' })
  }

  if (!events.length) {
    return (
      <p className="text-center text-gray-400 py-8" style={{ fontFamily: font }}>
        {isZh ? '目前沒有即將舉行的活動' : 'No upcoming events at this time'}
      </p>
    )
  }

  return (
    <div className="relative">
      {/* Prev */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center text-gray-600 hover:text-[#6B21A8] transition-colors duration-200 hidden md:flex"
        aria-label="Previous events"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
        style={{ scrollbarWidth: 'none' }}
      >
        {events.map((event) => {
          const image = typeof event.image === 'object' && event.image !== null ? event.image : null
          const title = isZh ? event.titleZh || event.titleEn : event.titleEn
          const location = isZh ? event.location_zh || event.location_en : event.location_en
          const date = new Date(event.date).toLocaleDateString(
            isZh ? 'zh-TW' : 'en-US',
            { month: 'short', day: 'numeric', year: 'numeric' },
          )

          return (
            <div
              key={event.id}
              className="flex-none w-72 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative h-40 bg-gray-100">
                {image && (image as any).url ? (
                  <Image
                    src={(image as any).url}
                    alt={title ?? ''}
                    fill
                    className="object-cover"
                    sizes="288px"
                  />
                ) : (
                  <div className="w-full h-full bg-purple-50 flex items-center justify-center">
                    <Calendar size={40} className="text-purple-200" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <h3
                  className="font-bold text-sm mb-2 leading-snug line-clamp-2"
                  style={{ color: '#1A1A2E', fontFamily: titleFont }}
                >
                  {title}
                </h3>
                <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-1" style={{ fontFamily: font }}>
                  <Calendar size={12} />
                  {date}
                </div>
                {location && (
                  <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-3" style={{ fontFamily: font }}>
                    <MapPin size={12} />
                    {location}
                  </div>
                )}
                {event.registrationLink ? (
                  <a
                    href={event.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-semibold text-[#6B21A8] hover:text-[#D4A017] transition-colors duration-200"
                    style={{ fontFamily: font }}
                  >
                    {isZh ? '立即報名' : 'Register Now'}
                    <ExternalLink size={11} />
                  </a>
                ) : (
                  <Link
                    href={`/${locale}/mobilization/conferences`}
                    className="text-xs font-semibold text-[#6B21A8] hover:text-[#D4A017] transition-colors duration-200"
                    style={{ fontFamily: font }}
                  >
                    {isZh ? '了解更多 →' : 'Learn More →'}
                  </Link>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Next */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center text-gray-600 hover:text-[#6B21A8] transition-colors duration-200 hidden md:flex"
        aria-label="Next events"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  )
}
