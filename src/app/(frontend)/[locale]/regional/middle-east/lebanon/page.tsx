import { getLocale } from 'next-intl/server'
import { RegionalPageLayout } from '@/components/RegionalPageLayout'

export default async function LebanonPage() {
  const locale = await getLocale()
  return (
    <RegionalPageLayout
      locale={locale}
      regionSlug="middle-east-lebanon"
      missionaryRegion="middle-east"
      titleEn="Lebanon"
      titleZh="黎巴嫩"
      subtitleEn="Bringing hope and the Gospel to Lebanon amid crisis"
      subtitleZh="在危機中將盼望和福音帶到黎巴嫩"
      color="#6B21A8"
      flagEmoji="🇱🇧"
    />
  )
}
