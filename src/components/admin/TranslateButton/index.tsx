'use client'
import React, { useState } from 'react'
import { useField, useFormFields } from '@payloadcms/ui'

// ─── Types ────────────────────────────────────────────────────────────────────

type Status = 'idle' | 'loading' | 'success' | 'quota' | 'richtext' | 'empty' | 'error'

/** Props Payload passes to afterInput components */
type Props = {
  path: string
  [key: string]: unknown
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Derive the English source path from a Chinese target path using naming convention.
 * e.g. 'titleZh' → 'titleEn'
 *      'ctaPrimary.labelZh' → 'ctaPrimary.labelEn'
 *      'content_zh' → 'content_en'
 */
function deriveSourcePath(targetPath: string): string {
  const parts = targetPath.split('.')
  const last = parts[parts.length - 1]!
  const sourceLast = last.replace(/Zh$/, 'En').replace(/_zh$/, '_en')
  parts[parts.length - 1] = sourceLast
  return parts.join('.')
}

/**
 * Returns true if the value looks like a Lexical rich-text JSON object.
 */
function isLexicalJson(value: unknown): value is { root: unknown } {
  return typeof value === 'object' && value !== null && 'root' in value
}

/**
 * Extracts plain text from a Lexical JSON document.
 * Traverses root → paragraph children → text nodes.
 */
function extractTextFromLexical(value: { root: unknown }): string {
  try {
    const root = value.root as {
      children?: Array<{ children?: Array<{ text?: string; type?: string }> }>
    }
    return (root.children ?? [])
      .flatMap((block) => block.children ?? [])
      .filter((node) => node.type === 'text')
      .map((node) => node.text ?? '')
      .join(' ')
      .trim()
  } catch {
    return ''
  }
}

/**
 * Wraps translated text in a minimal Lexical JSON structure with one paragraph.
 */
function wrapInLexical(text: string): object {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: text.split('\n').filter(Boolean).map((line) => ({
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        textStyle: '',
        children: [
          { type: 'text', format: 0, mode: 'normal', style: '', text: line, version: 1 },
        ],
      })),
    },
  }
}

// ─── Status config ────────────────────────────────────────────────────────────

const STATUS_LABEL: Record<Status, string> = {
  idle: '🔄 Auto-Translate from English',
  loading: '⏳ Translating...',
  success: '✅ Done!',
  quota: '⚠️ DeepL quota exceeded',
  richtext: '🔄 Translate (rich text — formatting may be simplified)',
  empty: '🔄 Auto-Translate (fill English field first)',
  error: '❌ Error — try again',
}

const STATUS_COLOR: Record<Status, string> = {
  idle: '#6B21A8',
  loading: '#9333EA',
  success: '#16A34A',
  quota: '#B45309',
  richtext: '#1E40AF',
  empty: '#9CA3AF',
  error: '#DC2626',
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * TranslateButton — renders after a Chinese field in the Payload admin.
 * Reads the corresponding English field via useFormFields and calls
 * /api/translate to fill the Chinese field via useField.
 *
 * Naming convention: 'titleZh' ↔ 'titleEn', 'content_zh' ↔ 'content_en'
 */
export function TranslateButton({ path }: Props) {
  const [status, setStatus] = useState<Status>('idle')

  const sourcePath = deriveSourcePath(path)

  // Read the English source value — useFormFields receives [FormState, Dispatch] tuple
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const rawSourceValue = useFormFields(([fields]) => fields[sourcePath]?.value)

  // Access the Chinese target field to write the translated value
  const { setValue } = useField<unknown>({ path })

  // Determine the actual text and whether it's rich text
  const isRichText = isLexicalJson(rawSourceValue)
  const sourceText = isRichText
    ? extractTextFromLexical(rawSourceValue as { root: unknown })
    : typeof rawSourceValue === 'string'
      ? rawSourceValue
      : ''

  const isEmpty = !sourceText.trim()

  const currentStatus: Status = isEmpty
    ? 'empty'
    : isRichText && status === 'idle'
      ? 'richtext'
      : status

  const handleTranslate = async () => {
    if (isEmpty) return
    setStatus('loading')

    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: sourceText, sourceLang: 'en', targetLang: 'zh' }),
      })

      if (res.status === 429) {
        setStatus('quota')
        setTimeout(() => setStatus('idle'), 6000)
        return
      }

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const { translatedText, error } = (await res.json()) as {
        translatedText?: string
        error?: string
      }

      if (error || !translatedText) throw new Error(error ?? 'No translation returned')

      // For rich-text fields, wrap the translation in Lexical JSON
      const finalValue = isRichText ? wrapInLexical(translatedText) : translatedText
      setValue(finalValue)

      setStatus('success')
      setTimeout(() => setStatus('idle'), 3000)
    } catch (err) {
      console.error('[TranslateButton]', err)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  const displayStatus = currentStatus
  const isDisabled = displayStatus === 'loading' || displayStatus === 'empty'

  return (
    <button
      type="button"
      onClick={handleTranslate}
      disabled={isDisabled}
      title={
        isEmpty
          ? 'Fill in the English field first, then click to auto-translate'
          : `Translate from: "${sourceText.slice(0, 60)}${sourceText.length > 60 ? '…' : ''}"`
      }
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        marginTop: '6px',
        padding: '3px 10px',
        fontSize: '11px',
        fontWeight: 500,
        borderRadius: '4px',
        border: `1px solid ${STATUS_COLOR[displayStatus]}`,
        color: STATUS_COLOR[displayStatus],
        backgroundColor: 'transparent',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        opacity: isDisabled ? 0.6 : 1,
        transition: 'all 0.2s ease',
        lineHeight: '1.4',
        userSelect: 'none',
      }}
    >
      {STATUS_LABEL[displayStatus]}
    </button>
  )
}
