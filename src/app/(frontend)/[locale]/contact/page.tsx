import { getLocale } from 'next-intl/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import type { SiteSetting } from '@/payload-types'
import { Mail, Phone, MapPin } from 'lucide-react'
import { ContactForm } from './ContactForm'

const getSettings = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })
    return payload.findGlobal({ slug: 'site-settings' }) as Promise<SiteSetting>
  },
  ['site-settings'],
  { tags: ['site-settings'] },
)

export default async function ContactPage() {
  const locale = await getLocale()
  const isZh = locale === 'zh'
  const font = isZh ? 'var(--font-chinese)' : 'var(--font-body)'
  const titleFont = isZh ? 'var(--font-chinese)' : 'var(--font-display)'

  let email = 'info@cmigo.org'
  let phone = ''
  let address = ''

  try {
    const settings = await getSettings()
    email = settings.contactEmail ?? email
    phone = settings.contactPhone ?? ''
    address = (isZh ? settings.contactAddress_zh : settings.contactAddress_en) ?? ''
  } catch { /* use defaults */ }

  const contactItems = [
    email && { icon: <Mail size={20} />, label: isZh ? '電子郵件' : 'Email', value: email, href: `mailto:${email}` },
    phone && { icon: <Phone size={20} />, label: isZh ? '電話' : 'Phone', value: phone, href: `tel:${phone}` },
    address && { icon: <MapPin size={20} />, label: isZh ? '地址' : 'Address', value: address, href: null },
  ].filter(Boolean) as { icon: React.ReactNode; label: string; value: string; href: string | null }[]

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#fafaf9' }}>
      <div className="py-20 px-4 text-center" style={{ backgroundColor: '#1A1A2E' }}>
        <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: titleFont }}>
          {isZh ? '聯絡我們' : 'Contact Us'}
        </h1>
        <p className="text-white/60 mt-3" style={{ fontFamily: font }}>
          {isZh ? '我們很樂意聽到您的消息' : 'We\'d love to hear from you'}
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
        {/* Contact info */}
        <div>
          <h2 className="text-2xl font-bold mb-8" style={{ color: '#1A1A2E', fontFamily: titleFont }}>
            {isZh ? '聯絡資訊' : 'Get in Touch'}
          </h2>
          <div className="space-y-6">
            {contactItems.map((item) => (
              <div key={item.label} className="flex gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0" style={{ backgroundColor: '#6B21A8' }}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-0.5" style={{ fontFamily: font }}>{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-gray-800 hover:text-purple-700 transition-colors" style={{ fontFamily: font }}>
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-gray-800 whitespace-pre-line" style={{ fontFamily: font }}>{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact form */}
        <ContactForm locale={locale} />
      </div>
    </main>
  )
}
