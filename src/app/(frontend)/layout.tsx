import type { Metadata } from 'next'
import { cn } from '@/utilities/ui'
import React from 'react'
import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getLocale } from 'next-intl/server'
import { PrayerPartnerBanner } from '@/components/PrayerPartnerBanner'
import { Playfair_Display, Open_Sans, Noto_Sans_TC } from 'next/font/google'
import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const isZh = locale === 'zh'

  const siteName = isZh ? '美國國際關懷協會' : 'USA Care Ministries International'
  const description = isZh
    ? '福音進中華，福音出中華 — 動員下一代華裔基督徒走向萬國'
    : 'Gospel into China, Gospel out of China — Mobilizing the next generation of Chinese Christians to the nations.'

  return {
    metadataBase: new URL(getServerSideURL()),
    title: {
      template: `%s | ${siteName}`,
      default: siteName,
    },
    description,
    openGraph: mergeOpenGraph({
      siteName,
      title: siteName,
      description,
    }),
    twitter: {
      card: 'summary_large_image',
    },
  }
}

// Font titres — anglais
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

// Font corps — anglais
const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

// Font chinois traditionnel
// Noto Sans TC couvre tous les caractères chinois !
const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  variable: '--font-chinese',
  weight: ['400', '500', '700'],
  display: 'swap',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html
      className={cn(playfair.variable, openSans.variable, notoSansTC.variable)}
      lang={locale}
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <AdminBar adminBarProps={{ preview: isEnabled }} />
            <Header />
            <PrayerPartnerBanner locale={locale} />
            {children}
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

