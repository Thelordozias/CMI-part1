import { getLocale } from 'next-intl/server'

export default async function OtherGivingPage() {
  const locale = await getLocale()
  const isZh = locale === 'zh'
  const font = isZh ? 'var(--font-chinese)' : 'var(--font-body)'
  const titleFont = isZh ? 'var(--font-chinese)' : 'var(--font-display)'

  const methods = isZh
    ? [
        { title: '支票', body: '支票請抬頭寫「Care Ministries International」，郵寄至我們的辦公室地址。請在背面或備忘欄註明指定用途。' },
        { title: '現金', body: '在主日崇拜或特別聚會時，您可以將現金放入奉獻袋，請附上一張紙條寫明您的姓名和用途。' },
        { title: '股票/資產捐贈', body: '如需捐贈股票或其他資產，請先與我們聯絡，我們將協助您完成手續。' },
        { title: '遺囑奉獻', body: '如有意將CMI列為遺囑受益人，請聯絡我們以了解詳情。' },
      ]
    : [
        { title: 'Check', body: 'Make checks payable to "Care Ministries International" and mail to our office address. Please note the designation on the memo line or on a separate note.' },
        { title: 'Cash', body: 'Cash gifts can be placed in an offering envelope during services. Please include a note with your name and designated use.' },
        { title: 'Stocks & Assets', body: 'To donate appreciated stocks or other assets, please contact us first so we can guide you through the process.' },
        { title: 'Estate / Planned Giving', body: 'If you wish to include CMI in your estate plans, please reach out to us for more information.' },
      ]

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#fafaf9' }}>
      <div className="py-16 px-4 text-center" style={{ backgroundColor: '#1A1A2E' }}>
        <h1 className="text-4xl font-bold text-white" style={{ fontFamily: titleFont }}>
          {isZh ? '其他奉獻方式' : 'Other Giving Methods'}
        </h1>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16 space-y-5">
        {methods.map((m) => (
          <div key={m.title} className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-2" style={{ color: '#1A1A2E', fontFamily: titleFont }}>
              {m.title}
            </h2>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: font }}>
              {m.body}
            </p>
          </div>
        ))}

        <div className="mt-8 p-6 rounded-xl text-center" style={{ backgroundColor: '#1A1A2E' }}>
          <p className="text-white/80 mb-3" style={{ fontFamily: font }}>
            {isZh ? '有任何奉獻問題，請隨時聯絡我們。' : 'Questions about giving? We\'re happy to help.'}
          </p>
          <a
            href={`/${locale}/contact`}
            className="inline-block px-6 py-2 rounded-lg font-semibold text-white border border-white/30 hover:border-[#D4A017] hover:text-[#D4A017] transition-all duration-200"
            style={{ fontFamily: font }}
          >
            {isZh ? '聯絡我們' : 'Contact Us'}
          </a>
        </div>
      </div>
    </main>
  )
}
