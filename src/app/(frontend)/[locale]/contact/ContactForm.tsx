'use client'
import { useState } from 'react'

export function ContactForm({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const font = isZh ? 'var(--font-chinese)' : 'var(--font-body)'
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/prayer-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'form', locale }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputClass = 'w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-purple-500 transition-colors'

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-10 text-center">
        <p className="text-3xl mb-3">✅</p>
        <p className="font-bold text-green-800 mb-1" style={{ fontFamily: font }}>
          {isZh ? '訊息已發送！' : 'Message Sent!'}
        </p>
        <p className="text-green-700 text-sm" style={{ fontFamily: font }}>
          {isZh ? '我們將盡快回覆您。' : 'We will get back to you soon.'}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-7 space-y-4">
      <h3 className="text-xl font-bold mb-2" style={{ color: '#1A1A2E', fontFamily: font }}>
        {isZh ? '發送訊息' : 'Send a Message'}
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: font }}>{isZh ? '姓名' : 'Name'}</label>
          <input type="text" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inputClass} style={{ fontFamily: font }} />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: font }}>{isZh ? '電子郵件' : 'Email'}</label>
          <input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={inputClass} style={{ fontFamily: font }} />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: font }}>{isZh ? '主旨' : 'Subject'}</label>
        <input type="text" required value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} className={inputClass} style={{ fontFamily: font }} />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1" style={{ fontFamily: font }}>{isZh ? '訊息內容' : 'Message'}</label>
        <textarea rows={5} required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} className={inputClass} style={{ fontFamily: font }} />
      </div>
      {status === 'error' && (
        <p className="text-red-500 text-sm" style={{ fontFamily: font }}>{isZh ? '發送失敗，請稍後再試。' : 'Send failed. Please try again.'}</p>
      )}
      <button type="submit" disabled={status === 'loading'}
        className="w-full py-3 rounded-lg font-bold text-white transition-all duration-200 hover:brightness-110 disabled:opacity-60"
        style={{ backgroundColor: '#6B21A8', fontFamily: font }}>
        {status === 'loading' ? (isZh ? '發送中...' : 'Sending...') : (isZh ? '發送訊息' : 'Send Message')}
      </button>
    </form>
  )
}
