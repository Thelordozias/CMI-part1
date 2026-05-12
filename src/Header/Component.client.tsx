'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import type { Header } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import { Search } from 'lucide-react'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations()
  const locale = useLocale()

  useEffect(() => {
    setHeaderTheme(null)
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
  }, [headerTheme])

  // Switch de langue
  const switchLanguage = () => {
    const newLocale = locale === 'en' ? 'zh' : 'en'
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }

  // Search submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/${locale}/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  // Navigation items
  const navItems = [
    {
      label: t('nav.about'),
      href: `/${locale}/about`,
      submenu: [
        {
          label: locale === 'en' ? 'Statement of Faith' : '信仰告白',
          href: `/${locale}/about/faith`,
        },
        {
          label: locale === 'en' ? 'Vision & Mission' : '異象與使命',
          href: `/${locale}/about/mission`,
        },
        {
          label: locale === 'en' ? 'Our Missionaries' : '我們的宣教士',
          href: `/${locale}/about/missionaries`,
        },
        {
          label: locale === 'en' ? 'Our Ministries' : '我們的宣教事工',
          href: `/${locale}/about/ministries`,
        },
        {
          label: locale === 'en' ? 'HQ Website' : '國際總部網站',
          href: 'https://cmigo.org',
          external: true,
        },
        { label: locale === 'en' ? 'Admin Login' : '管理員登入', href: '/admin' },
      ],
    },
    {
      label: t('nav.ministry'),
      href: `/${locale}/regional`,
      submenu: [
        {
          label: locale === 'en' ? 'Asia' : '亞洲事工',
          href: `/${locale}/regional/asia`,
          submenu: [
            {
              label: locale === 'en' ? 'Cambodia' : '柬埔寨',
              href: `/${locale}/regional/asia/cambodia`,
            },
            {
              label: locale === 'en' ? 'Indonesia' : '印尼',
              href: `/${locale}/regional/asia/indonesia`,
            },
            { label: locale === 'en' ? 'Taiwan' : '台灣', href: `/${locale}/regional/asia/taiwan` },
          ],
        },
        {
          label: locale === 'en' ? 'Middle East' : '中東地區',
          href: `/${locale}/regional/middle-east`,
          submenu: [
            {
              label: locale === 'en' ? 'Turkey' : '土耳其',
              href: `/${locale}/regional/middle-east/turkey`,
            },
            {
              label: locale === 'en' ? 'Lebanon' : '黎巴嫩',
              href: `/${locale}/regional/middle-east/lebanon`,
            },
          ],
        },
        {
          label: locale === 'en' ? 'Africa' : '非洲地區',
          href: `/${locale}/regional/africa`,
          submenu: [
            { label: locale === 'en' ? 'Ghana' : '迦納', href: `/${locale}/regional/africa/ghana` },
          ],
        },
        {
          label: locale === 'en' ? 'USA' : '美國本土',
          href: `/${locale}/regional/usa`,
          submenu: [
            {
              label: locale === 'en' ? 'Southern California' : '南加州',
              href: `/${locale}/regional/usa/socal`,
            },
          ],
        },
        {
          label: locale === 'en' ? 'Mobilization' : '宣教動員',
          href: `/${locale}/mobilization`,
          submenu: [
            {
              label: locale === 'en' ? 'Training Courses' : '宣教課程',
              href: `/${locale}/mobilization/training`,
            },
            {
              label: locale === 'en' ? 'Special Conferences' : '特別聚會',
              href: `/${locale}/mobilization/conferences`,
            },
          ],
        },
      ],
    },
    {
      label: t('nav.prayer'),
      href: `/${locale}/news`,
      submenu: [
        {
          label: locale === 'en' ? 'Global Outreach' : '胸懷普世',
          href: `/${locale}/news/global`,
        },
        {
          label: locale === 'en' ? 'Prayer Partners' : '宣教祈禱夥伴',
          href: `/${locale}/news/partners`,
        },
        {
          label: locale === 'en' ? 'Prayer Newsletter' : '宣教祈禱期採',
          href: `/${locale}/news/newsletters`,
        },
        {
          label: locale === 'en' ? 'Missionary Letters' : '宣教士代禱信',
          href: `/${locale}/news/letters`,
        },
      ],
    },
    {
      label: t('nav.giving'),
      href: `/${locale}/giving`,
      submenu: [
        {
          label: locale === 'en' ? 'Give via Zelle' : '透過 Zelle 奉獻',
          href: `/${locale}/giving/zelle`,
        },
        {
          label: locale === 'en' ? 'Give via PayPal / Credit Card' : '透過 PayPal、信用卡奉獻',
          href: `/${locale}/giving/paypal`,
        },
        {
          label: locale === 'en' ? 'Other Methods' : '其他奉獻方式',
          href: `/${locale}/giving/other`,
        },
      ],
    },
    {
      label: t('nav.contact'),
      href: `/${locale}/contact`,
      submenu: [
        {
          label: locale === 'en' ? 'Contact Info' : '聯絡方式',
          href: `/${locale}/contact`,
        },
        {
          label: locale === 'en' ? 'Become a Prayer Partner' : '成為宣教祈禱夥伴',
          href: `/${locale}/news/partners`,
        },
      ],
    },
  ]

  const isActive = (href: string) => {
    const base = `/${locale}`
    if (href === base) return pathname === base || pathname === `${base}/`
    return pathname.startsWith(href)
  }

  return (
    <header
      className="sticky top-0 z-50 font-body shadow-lg"
      style={{ backgroundColor: '#1A1A2E' }}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* LEFT — Search Icon */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 hover:bg-white/10 rounded-full transition text-white"
            aria-label={t('header.search')}
          >
            <Search size={18} />
          </button>

          {/* Search Input — apparaît quand searchOpen */}
          {searchOpen && (
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('header.search')}
                className="border rounded-l px-3 py-1 text-sm focus:outline-none"
                autoFocus
              />
              <button
                type="submit"
                className="bg-purple-700 text-white px-3 py-1 rounded-r text-sm"
              >
                →
              </button>
            </form>
          )}
        </div>

        {/* CENTER — Logo + Navigation */}
        <div className="flex flex-col items-center gap-2">
          <Link href={`/${locale}`}>
            <Logo loading="eager" priority="high" className="invert dark:invert-0" />
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className={`text-sm font-medium transition py-2 ${
                    isActive(item.href)
                      ? 'text-red-400'
                      : 'text-white hover:text-[#D4A017]'
                  }`}
                >
                  {item.label}
                </Link>

                {/* Submenu */}
                {item.submenu && (
                  <div className="absolute top-full left-0 bg-white dark:bg-black shadow-lg rounded-md min-w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {item.submenu.map((sub) => (
                      <div key={sub.href} className="relative group/sub">
                        <Link
                          href={sub.href}
                          target={'external' in sub && sub.external ? '_blank' : undefined}
                          className="block px-4 py-2 text-sm hover:bg-purple-50 hover:text-purple-700 transition"
                        >
                          {sub.label}
                          {'submenu' in sub && sub.submenu && <span className="ml-2">›</span>}
                        </Link>

                        {/* Sub-submenu */}
                        {'submenu' in sub && sub.submenu && (
                          <div className="absolute left-full top-0 bg-white dark:bg-black shadow-lg rounded-md min-w-40 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200">
                            {sub.submenu.map((subsub) => (
                              <Link
                                key={subsub.href}
                                href={subsub.href}
                                className="block px-4 py-2 text-sm hover:bg-purple-50 hover:text-purple-700 transition"
                              >
                                {subsub.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* RIGHT — Language Switcher + Admin Login */}
        <div className="flex items-center gap-3">
          <button
            onClick={switchLanguage}
            className="text-sm border border-white text-white px-3 py-1 rounded hover:bg-purple-800 transition"
          >
            {t('header.language')}
          </button>

          <Link
            href="/admin"
            className="text-sm px-3 py-1 rounded transition font-semibold"
style={{ backgroundColor: '#D4A017', color: 'white' }}
          >
            {t('header.login')}
          </Link>
        </div>
      </div>
    </header>
  )
}
