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

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
