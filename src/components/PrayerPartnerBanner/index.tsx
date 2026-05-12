import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import type { FooterContent } from '@/payload-types'

const getFooterContent = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })
    return payload.findGlobal({ slug: 'footer-content' }) as Promise<FooterContent>
  },
  ['footer-content'],
  { tags: ['footer-content'] },
)

interface PrayerPartnerBannerProps {
  locale: string
}

export async function PrayerPartnerBanner({ locale }: PrayerPartnerBannerProps) {
  const isZh = locale === 'zh'
  const font = isZh ? 'var(--font-chinese)' : 'var(--font-body)'

  let ctaEn = 'Become a Prayer Partner'
  let ctaZh = '成為宣教祈禱夥伴'
  let link = '/mobilization/prayer'

  try {
    const content = await getFooterContent()
    if (content.prayerPartnerCTA_en) ctaEn = content.prayerPartnerCTA_en
    if (content.prayerPartnerCTA_zh) ctaZh = content.prayerPartnerCTA_zh
    if (content.prayerPartnerLink) link = content.prayerPartnerLink
  } catch {
    // Use defaults if CMS is unavailable
  }

  const label = isZh ? ctaZh : ctaEn
  const subLabel = isZh ? '與我們一起為宣教士代禱' : 'Pray with us for missionaries around the world'

  return (
    <div
      className="w-full py-4 px-4 flex items-center justify-center gap-6 flex-wrap"
      style={{ backgroundColor: '#1A1A2E' }}
    >
      <p
        className="text-white/80 text-sm"
        style={{ fontFamily: font }}
      >
        {subLabel}
      </p>
      <Link
        href={`/${locale}${link}`}
        className="px-6 py-2 rounded-full text-sm font-semibold text-white border border-white/40 hover:border-[#D4A017] hover:text-[#D4A017] transition-all duration-200 shrink-0"
        style={{ fontFamily: font }}
      >
        {label} →
      </Link>
    </div>
  )
}
