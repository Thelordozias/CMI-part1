'use client'
import React, { useEffect, useState } from 'react'
import './index.scss'

type QuotaData = {
  available: boolean
  percentage: number
  remaining: number
  limit: number
  count: number
  configured: boolean
}

/**
 * DeepLQuotaDisplay — fetches and displays current DeepL API usage.
 * Shown in the Payload admin dashboard.
 */
function DeepLQuotaDisplay() {
  const [quota, setQuota] = useState<QuotaData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/deepl-usage')
      .then((r) => r.json() as Promise<QuotaData>)
      .then((data) => setQuota(data))
      .catch(() => setQuota(null))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p style={{ fontSize: '12px', color: '#9CA3AF' }}>Checking DeepL quota…</p>

  if (!quota?.configured) {
    return (
      <p style={{ fontSize: '12px', color: '#9CA3AF' }}>
        ⚙️ DEEPL_API_KEY not set — auto-translation disabled
      </p>
    )
  }

  const barColor =
    quota.percentage >= 90
      ? '#DC2626'
      : quota.percentage >= 80
        ? '#B45309'
        : '#6B21A8'

  return (
    <div style={{ marginTop: '12px', padding: '12px 14px', background: '#F9FAFB', borderRadius: '6px', border: '1px solid #E5E7EB' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#374151' }}>
          🌐 DeepL Translation Quota
        </span>
        <span style={{ fontSize: '11px', color: '#6B7280' }}>
          {quota.count.toLocaleString()} / {quota.limit.toLocaleString()} chars used ({quota.percentage}%)
        </span>
      </div>
      <div style={{ height: '6px', background: '#E5E7EB', borderRadius: '3px', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${Math.min(quota.percentage, 100)}%`,
            background: barColor,
            borderRadius: '3px',
            transition: 'width 0.3s ease',
          }}
        />
      </div>
      {quota.percentage >= 80 && (
        <p style={{ fontSize: '11px', color: barColor, marginTop: '6px', marginBottom: 0 }}>
          {quota.percentage >= 90
            ? '⚠️ Quota almost full — consider translating manually'
            : '⚠️ Translation quota running low'}
        </p>
      )}
      {!quota.available && (
        <p style={{ fontSize: '11px', color: '#DC2626', marginTop: '6px', marginBottom: 0 }}>
          ❌ Quota exceeded — please translate manually until next billing cycle
        </p>
      )}
    </div>
  )
}

/**
 * BeforeDashboard — rendered at the top of the Payload admin dashboard.
 */
const BeforeDashboard: React.FC = () => {
  return (
    <div className="before-dashboard">
      <div style={{ padding: '16px', background: '#EDE9FE', borderRadius: '8px', border: '1px solid #C4B5FD', marginBottom: '12px' }}>
        <h4 style={{ margin: '0 0 6px', color: '#5B21B6', fontSize: '14px' }}>
          🎉 Welcome to the CMI Admin Panel
        </h4>
        <p style={{ margin: 0, fontSize: '12px', color: '#6D28D9', lineHeight: '1.5' }}>
          Manage hero slides, events, missionaries, regional updates, and site settings.
          <br />
          <strong>Tip:</strong> Use the 🔄 Auto-Translate buttons on Chinese fields to translate from English automatically.
        </p>
        <DeepLQuotaDisplay />
      </div>
    </div>
  )
}

export default BeforeDashboard
