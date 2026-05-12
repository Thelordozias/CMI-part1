import { getLocale } from 'next-intl/server'
import { RegionalPageLayout } from '@/components/RegionalPageLayout'

export default async function CambodiaPage() {
  const locale = await getLocale()
  return (
    <RegionalPageLayout
      locale={locale}
      regionSlug="asia-cambodia"
      missionaryRegion="asia"
      titleEn="Cambodia"
      titleZh="柬埔寨"
      subtitleEn="Serving vulnerable communities through education, healthcare, and the Gospel"
      subtitleZh="透過教育、醫療和福音服事弱勢社群"
      color="#1E40AF"
      flagEmoji="🇰🇭"
    />
  )
}
