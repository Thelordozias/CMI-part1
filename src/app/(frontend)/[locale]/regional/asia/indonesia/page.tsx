import { getLocale } from 'next-intl/server'
import { RegionalPageLayout } from '@/components/RegionalPageLayout'

export default async function IndonesiaPage() {
  const locale = await getLocale()
  return (
    <RegionalPageLayout
      locale={locale}
      regionSlug="asia-indonesia"
      missionaryRegion="asia"
      titleEn="Indonesia"
      titleZh="印尼"
      subtitleEn="Reaching the islands of Indonesia with the love of Christ"
      subtitleZh="用基督的愛觸及印尼群島"
      color="#1E40AF"
      flagEmoji="🇮🇩"
    />
  )
}
