import { getLocale } from 'next-intl/server'
import { RegionalPageLayout } from '@/components/RegionalPageLayout'

export default async function TurkeyPage() {
  const locale = await getLocale()
  return (
    <RegionalPageLayout
      locale={locale}
      regionSlug="middle-east-turkey"
      missionaryRegion="middle-east"
      titleEn="Turkey"
      titleZh="土耳其"
      subtitleEn="Ministering to refugees and local communities in Turkey"
      subtitleZh="在土耳其服事難民和本地社群"
      color="#6B21A8"
      flagEmoji="🇹🇷"
    />
  )
}
