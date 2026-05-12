import HomePageContent from '../page'

// Thin wrapper so Next.js receives the [locale] param.
// getLocale() inside HomePageContent reads it via next-intl's request context.
export default async function LocalePage(_props: { params: Promise<{ locale: string }> }) {
  return <HomePageContent />
}
