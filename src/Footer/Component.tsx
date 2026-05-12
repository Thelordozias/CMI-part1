import { getCachedGlobal } from '@/utilities/getGlobals'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import Link from 'next/link'
import React from 'react'
import { getLocale } from 'next-intl/server'
import type { FooterContent, SiteSetting } from '@/payload-types'

const getFooterContent = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })
    return payload.findGlobal({ slug: 'footer-content' }) as Promise<FooterContent>
  },
  ['footer-content'],
  { tags: ['footer-content'] },
)

const getSiteSettings = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })
    return payload.findGlobal({ slug: 'site-settings' }) as Promise<SiteSetting>
  },
  ['site-settings'],
  { tags: ['site-settings'] },
)

export async function Footer() {
  const locale = await getLocale()
  const isZh = locale === 'zh'
  const font = isZh ? 'var(--font-chinese)' : 'var(--font-body)'

  let copyright = '© 2026 USA Care Ministries International'
  let prayerCTA = isZh ? '成為宣教祈禱夥伴' : 'Become a Prayer Partner'
  let prayerLink = '/mobilization/prayer'
  let footerLinks: { label_en?: string | null; label_zh?: string | null; href?: string | null }[] = []
  let facebook = ''
  let youtube = ''

  try {
    const [content, settings] = await Promise.all([
      getFooterContent().catch(() => null),
      getSiteSettings().catch(() => null),
    ])

    if (content) {
      copyright = content.copyrightText ?? copyright
      prayerCTA = isZh ? content.prayerPartnerCTA_zh ?? prayerCTA : content.prayerPartnerCTA_en ?? prayerCTA
      prayerLink = content.prayerPartnerLink ?? prayerLink
      footerLinks = (content.footerLinks ?? []) as typeof footerLinks
    }
    if (settings) {
      facebook = settings.facebookUrl ?? ''
      youtube = settings.youtubeUrl ?? ''
    }
  } catch { /* use defaults */ }

  const quickLinks = [
    { label: isZh ? '關於我們' : 'About Us', href: `/${locale}/about` },
    { label: isZh ? '宣教地區' : 'Ministries', href: `/${locale}/regional` },
    { label: isZh ? '宣教動員' : 'Mobilize', href: `/${locale}/mobilization` },
    { label: isZh ? '奉獻支持' : 'Give', href: `/${locale}/giving` },
    { label: isZh ? '聯絡我們' : 'Contact', href: `/${locale}/contact` },
  ]

  return (
    <footer className="mt-auto" style={{ backgroundColor: '#1A1A2E' }}>
      {/* Main footer body */}
      <div className="container py-12 grid md:grid-cols-3 gap-10 text-white">
        {/* Brand */}
        <div>
          <p className="font-bold text-lg mb-2 text-white" style={{ fontFamily: font }}>
            Care Ministries International
          </p>
          <p className="text-white/50 text-sm italic mb-4" style={{ fontFamily: font }}>
            {isZh ? '福音進中華，福音出中華' : '"Gospel into China, Gospel out of China"'}
          </p>
          {(facebook || youtube) && (
            <div className="flex gap-3 mt-2">
              {facebook && (
                <a href={facebook} target="_blank" rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors text-sm" style={{ fontFamily: font }}>
                  Facebook
                </a>
              )}
              {youtube && (
                <a href={youtube} target="_blank" rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors text-sm" style={{ fontFamily: font }}>
                  YouTube
                </a>
              )}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div>
          <p className="font-semibold text-white/80 mb-4 uppercase text-xs tracking-widest" style={{ fontFamily: font }}>
            {isZh ? '快速連結' : 'Quick Links'}
          </p>
          <nav className="space-y-2">
            {quickLinks.map((l) => (
              <Link key={l.href} href={l.href}
                className="block text-white/60 hover:text-white text-sm transition-colors" style={{ fontFamily: font }}>
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* CMS footer links or admin link */}
        <div>
          <p className="font-semibold text-white/80 mb-4 uppercase text-xs tracking-widest" style={{ fontFamily: font }}>
            {isZh ? '更多' : 'More'}
          </p>
          <nav className="space-y-2">
            {footerLinks.length > 0
              ? footerLinks.map((l, i) => (
                  <Link key={i} href={l.href ?? '#'}
                    className="block text-white/60 hover:text-white text-sm transition-colors" style={{ fontFamily: font }}>
                    {isZh ? l.label_zh ?? l.label_en : l.label_en}
                  </Link>
                ))
              : (
                <Link href="/admin"
                  className="block text-white/60 hover:text-white text-sm transition-colors" style={{ fontFamily: font }}>
                  {isZh ? '管理員登入' : 'Admin Login'}
                </Link>
              )}
          </nav>
        </div>
      </div>

      {/* Prayer Partner CTA bar */}
      <div className="border-t border-white/10 py-4 px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-white/40 text-xs" style={{ fontFamily: font }}>{copyright}</p>
        <Link
          href={`/${locale}${prayerLink}`}
          className="px-5 py-2 rounded-full text-xs font-semibold border border-white/20 text-white/70 hover:border-[#D4A017] hover:text-[#D4A017] transition-all duration-200"
          style={{ fontFamily: font }}
        >
          {prayerCTA} →
        </Link>
      </div>
    </footer>
  )
}
