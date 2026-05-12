'use client'
import { useEffect, useState, useRef } from 'react'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'

export type SlideData = {
  type: 'image' | 'video'
  src: string
  titleEn: string
  titleZh: string
  subtitleEn: string
  subtitleZh: string
  ctaPrimary: { labelEn: string; labelZh: string; href: string }
  ctaSecondary: { labelEn: string; labelZh: string; href: string }
}

const SLIDE_DURATION = 6000

export function HeroSliderClient({ slides }: { slides: SlideData[] }) {
  const [current, setCurrent] = useState(0)
  const locale = useLocale()
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const resetTimer = (nextIndex?: number) => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % slides.length)
    }, SLIDE_DURATION)
    if (nextIndex !== undefined) setCurrent(nextIndex)
  }

  useEffect(() => {
    if (slides.length === 0) return
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % slides.length)
    }, SLIDE_DURATION)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [slides.length])

  const goToSlide = (index: number) => {
    if (index === current) return
    resetTimer(index)
  }

  const goToNext = () => goToSlide((current + 1) % slides.length)
  const goToPrev = () => goToSlide((current - 1 + slides.length) % slides.length)

  if (slides.length === 0) return null

  const slide = slides[current]
  const title = locale === 'zh' ? slide.titleZh || slide.titleEn : slide.titleEn
  const subtitle = locale === 'zh' ? slide.subtitleZh || slide.subtitleEn : slide.subtitleEn
  const primaryLabel = locale === 'zh' ? slide.ctaPrimary.labelZh : slide.ctaPrimary.labelEn
  const secondaryLabel = locale === 'zh' ? slide.ctaSecondary.labelZh : slide.ctaSecondary.labelEn

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* All slides stacked — cross-fade via opacity transition */}
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            opacity: current === i ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out',
          }}
        >
          {s.type === 'image' ? (
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${s.src})`,
                animation: current === i ? 'kenburns 6.5s ease-in-out forwards' : 'none',
              }}
            />
          ) : (
            <video
              className="w-full h-full object-cover"
              src={s.src}
              autoPlay
              muted
              loop
              playsInline
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/35 to-black/65" />
        </div>
      ))}

      {/* Content — key remounts on slide change for heroFadeUp animation */}
      <div
        key={current}
        className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4"
        style={{ animation: 'heroFadeUp 0.7s ease-out forwards' }}
      >
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight max-w-4xl"
          style={{
            fontFamily: locale === 'zh' ? 'var(--font-chinese)' : 'var(--font-display)',
            textShadow: '0 2px 24px rgba(0,0,0,0.6)',
            whiteSpace: 'pre-line',
          }}
        >
          {title}
        </h1>

        <p
          className="text-lg md:text-xl lg:text-2xl mb-10 max-w-2xl opacity-90"
          style={{
            fontFamily: locale === 'zh' ? 'var(--font-chinese)' : 'var(--font-body)',
            textShadow: '0 1px 8px rgba(0,0,0,0.5)',
          }}
        >
          {subtitle}
        </p>

        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            href={`/${locale}${slide.ctaPrimary.href}`}
            className="px-8 py-3 rounded font-semibold text-white transition-all duration-200 hover:scale-105 hover:brightness-110 shadow-lg"
            style={{
              backgroundColor: '#D4A017',
              fontFamily: locale === 'zh' ? 'var(--font-chinese)' : 'var(--font-body)',
            }}
          >
            {primaryLabel}
          </Link>
          <Link
            href={`/${locale}${slide.ctaSecondary.href}`}
            className="px-8 py-3 rounded font-semibold border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-200 hover:scale-105 shadow-lg"
            style={{
              fontFamily: locale === 'zh' ? 'var(--font-chinese)' : 'var(--font-body)',
            }}
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>

      {/* Prev Button */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white bg-black/30 hover:bg-black/60 hover:text-yellow-400 rounded-full w-12 h-12 flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Next Button */}
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white bg-black/30 hover:bg-black/60 hover:text-yellow-400 rounded-full w-12 h-12 flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dot Navigation */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3 items-center">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              width: current === index ? '32px' : '10px',
              height: '10px',
              backgroundColor: current === index ? '#D4A017' : 'rgba(255,255,255,0.6)',
            }}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-20 text-white/60 text-xs flex flex-col items-center gap-1">
        <ChevronDown size={18} className="animate-bounce" />
        <span style={{ fontFamily: locale === 'zh' ? 'var(--font-chinese)' : 'var(--font-body)' }}>
          {locale === 'en' ? 'Scroll' : '滾動'}
        </span>
      </div>
    </section>
  )
}
