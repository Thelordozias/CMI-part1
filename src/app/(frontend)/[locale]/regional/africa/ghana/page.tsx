import { getLocale } from 'next-intl/server'
import { RegionalPageLayout } from '@/components/RegionalPageLayout'

export default async function GhanaPage() {
  const locale = await getLocale()
  return (
    <RegionalPageLayout
      locale={locale}
      regionSlug="africa-ghana"
      missionaryRegion="africa"
      titleEn="Ghana"
      titleZh="迦納"
      subtitleEn="Community development and church planting among vulnerable families in Ghana"
      subtitleZh="在迦納透過社區發展與教會植立服事貧困家庭"
      color="#D4A017"
      flagEmoji="🇬🇭"
    />
  )
}
