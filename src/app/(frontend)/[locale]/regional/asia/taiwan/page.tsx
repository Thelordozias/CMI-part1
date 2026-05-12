import { getLocale } from 'next-intl/server'
import { RegionalPageLayout } from '@/components/RegionalPageLayout'

export default async function TaiwanPage() {
  const locale = await getLocale()
  return (
    <RegionalPageLayout
      locale={locale}
      regionSlug="asia-taiwan"
      missionaryRegion="asia"
      titleEn="Taiwan"
      titleZh="台灣"
      subtitleEn="Strengthening the Chinese church as a base for global missions"
      subtitleZh="以台灣華人教會為全球宣教的基地"
      color="#1E40AF"
      flagEmoji="🇹🇼"
    />
  )
}
