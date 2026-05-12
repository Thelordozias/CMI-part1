import Link from 'next/link'
import { Heart, CreditCard, MoreHorizontal } from 'lucide-react'

interface GivingButtonsProps {
  locale: string
  variant?: 'full' | 'compact'
}

export function GivingButtons({ locale, variant = 'full' }: GivingButtonsProps) {
  const isZh = locale === 'zh'
  const font = isZh ? 'var(--font-chinese)' : 'var(--font-body)'

  const methods = [
    {
      icon: <Heart size={24} strokeWidth={1.5} />,
      label: isZh ? 'Zelle 奉獻' : 'Give via Zelle',
      sub: isZh ? '快速銀行轉帳' : 'Fast bank transfer',
      href: `/${locale}/giving/zelle`,
      color: '#6B21A8',
    },
    {
      icon: <CreditCard size={24} strokeWidth={1.5} />,
      label: isZh ? 'PayPal / 信用卡' : 'PayPal / Credit Card',
      sub: isZh ? '線上安全付款' : 'Secure online payment',
      href: `/${locale}/giving/paypal`,
      color: '#1E40AF',
    },
    {
      icon: <MoreHorizontal size={24} strokeWidth={1.5} />,
      label: isZh ? '其他方式' : 'Other Methods',
      sub: isZh ? '支票、現金等' : 'Check, cash & more',
      href: `/${locale}/giving/other`,
      color: '#D4A017',
    },
  ]

  if (variant === 'compact') {
    return (
      <div className="flex gap-3 flex-wrap justify-center">
        {methods.map((m) => (
          <Link
            key={m.href}
            href={m.href}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-white text-sm transition-all duration-200 hover:scale-105 hover:brightness-110 shadow-md"
            style={{ backgroundColor: m.color, fontFamily: font }}
          >
            {m.icon}
            {m.label}
          </Link>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {methods.map((m) => (
        <Link
          key={m.href}
          href={m.href}
          className="group flex flex-col items-center text-center p-8 rounded-xl border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-white"
          style={{ borderColor: m.color }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-4 text-white transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: m.color }}
          >
            {m.icon}
          </div>
          <h3
            className="text-lg font-bold mb-1"
            style={{ color: m.color, fontFamily: font }}
          >
            {m.label}
          </h3>
          <p className="text-gray-500 text-sm" style={{ fontFamily: font }}>
            {m.sub}
          </p>
        </Link>
      ))}
    </div>
  )
}
