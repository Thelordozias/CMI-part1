import { getLocale } from 'next-intl/server'
import { RegionalPageLayout } from '@/components/RegionalPageLayout'

export default async function SoCalPage() {
  const locale = await getLocale()
  return (
    <RegionalPageLayout
      locale={locale}
      regionSlug="usa-socal"
      missionaryRegion="usa"
      titleEn="Southern California"
      titleZh="南加州"
      subtitleEn="CMI's North American base — mobilizing and sending Chinese Christians worldwide"
      subtitleZh="CMI北美基地 — 動員和差遣華裔基督徒走向全球"
      color="#16A34A"
      flagEmoji="🇺🇸"
    />
  )
}
