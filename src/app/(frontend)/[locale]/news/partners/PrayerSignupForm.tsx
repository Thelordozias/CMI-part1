'use client'
import { useState } from 'react'
import { useLocale } from 'next-intl'

export function PrayerSignupForm({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const font = isZh ? 'var(--font-chinese)' : 'var(--font-body)'
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/prayer-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, source: 'prayer-partner', locale }),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      setName('')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <p className="text-2xl mb-3">🙏</p>
        <p className="font-bold text-green-800 mb-2" style={{ fontFamily: font }}>
          {isZh ? '感謝您成為禱告夥伴！' : 'Thank you for becoming a Prayer Partner!'}
        </p>
        <p className="text-green-700 text-sm" style={{ fontFamily: font }}>
          {isZh ? '我們將很快與您聯絡。' : 'We will be in touch soon.'}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-7 space-y-4">
      <h3 className="text-xl font-bold" style={{ color: '#1A1A2E', fontFamily: font }}>
        {isZh ? '立即加入禱告夥伴' : 'Join as a Prayer Partner'}
      </h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: font }}>
          {isZh ? '姓名' : 'Name'}
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
          style={{ fontFamily: font }}
          placeholder={isZh ? '您的姓名' : 'Your name'}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: font }}>
          {isZh ? '電子郵件' : 'Email Address'}
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
          style={{ fontFamily: font }}
          placeholder={isZh ? '您的電子郵件' : 'your@email.com'}
        />
      </div>
      {status === 'error' && (
        <p className="text-red-500 text-sm" style={{ fontFamily: font }}>
          {isZh ? '提交失敗，請稍後再試。' : 'Submission failed. Please try again.'}
        </p>
      )}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-3 rounded-lg font-bold text-white transition-all duration-200 hover:brightness-110 disabled:opacity-60"
        style={{ backgroundColor: '#6B21A8', fontFamily: font }}
      >
        {status === 'loading'
          ? (isZh ? '提交中...' : 'Submitting...')
          : (isZh ? '成為禱告夥伴' : 'Become a Prayer Partner')}
      </button>
    </form>
  )
}
