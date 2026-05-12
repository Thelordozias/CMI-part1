import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { HeroSliderClient, type SlideData } from './HeroSliderClient'

// Static fallback used when no slides exist in the CMS yet
const STATIC_SLIDES: SlideData[] = [
  {
    type: 'image',
    src: '/images/hero-1.jpg',
    titleEn: 'Gospel into China,\nGospel out of China',
    titleZh: '福音進中華，\n福音出中華',
    subtitleEn: 'Join us in mobilizing the next generation for global missions',
    subtitleZh: '與我們一起動員下一代參與全球宣教',
    ctaPrimary: { labelEn: 'Donate Now', labelZh: '立即奉獻', href: '/giving' },
    ctaSecondary: { labelEn: 'Learn More', labelZh: '了解更多', href: '/about' },
  },
  {
    type: 'image',
    src: '/images/hero-2.jpg',
    titleEn: 'Reaching the Nations',
    titleZh: '到達萬國',
    subtitleEn: 'Cambodia · Indonesia · Taiwan · Ghana · Turkey · Lebanon',
    subtitleZh: '柬埔寨 · 印尼 · 台灣 · 迦納 · 土耳其 · 黎巴嫩',
    ctaPrimary: { labelEn: 'Donate Now', labelZh: '立即奉獻', href: '/giving' },
    ctaSecondary: { labelEn: 'Learn More', labelZh: '了解更多', href: '/about' },
  },
]

const getSlides = unstable_cache(
  async (): Promise<SlideData[]> => {
    const payload = await getPayload({ config: configPromise })

    const { docs } = await payload.find({
      collection: 'hero-slides',
      where: { isActive: { equals: true } },
      sort: 'order',
      depth: 1,       // Populates media relationship so doc.media.url is available
      limit: 10,
    })

    if (!docs.length) return STATIC_SLIDES

    return docs.map((doc): SlideData => {
      const media = typeof doc.media === 'object' ? doc.media : null

      return {
        type: doc.type,
        src: media?.url ?? '',
        titleEn: doc.titleEn,
        titleZh: doc.titleZh || doc.titleEn,
        subtitleEn: doc.subtitleEn ?? '',
        subtitleZh: doc.subtitleZh || doc.subtitleEn || '',
        ctaPrimary: {
          labelEn: doc.ctaPrimary?.labelEn ?? 'Donate Now',
          labelZh: doc.ctaPrimary?.labelZh ?? '立即奉獻',
          href: doc.ctaPrimary?.href ?? '/giving',
        },
        ctaSecondary: {
          labelEn: doc.ctaSecondary?.labelEn ?? 'Learn More',
          labelZh: doc.ctaSecondary?.labelZh ?? '了解更多',
          href: doc.ctaSecondary?.href ?? '/about',
        },
      }
    })
  },
  ['hero-slides'],
  { tags: ['hero-slides'] },
)

export async function HeroSlider() {
  const slides = await getSlides().catch(() => STATIC_SLIDES)
  return <HeroSliderClient slides={slides} />
}
