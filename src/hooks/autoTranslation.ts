import type { CollectionBeforeChangeHook } from 'payload'
import * as deepl from 'deepl-node'

let _translator: deepl.Translator | null = null

function getTranslator(): deepl.Translator | null {
  if (!process.env.DEEPL_API_KEY) return null
  if (!_translator) _translator = new deepl.Translator(process.env.DEEPL_API_KEY)
  return _translator
}

async function translateText(
  text: string,
  from: deepl.SourceLanguageCode | null,
  to: deepl.TargetLanguageCode,
): Promise<string> {
  const translator = getTranslator()
  if (!translator) return '[Translation needed — DEEPL_API_KEY not set]'

  const results = await translator.translateText(text, from, to)
  const result = Array.isArray(results) ? results[0] : results
  return result.text
}

/** Options for the autoTranslateHook factory */
interface AutoTranslateOptions {
  /** EN field name in the document, e.g. 'titleEn' or 'title_en' */
  enField: string
  /** ZH field name in the document, e.g. 'titleZh' or 'title_zh' */
  zhField: string
  /** For richText fields, pass 'richText' — translation is skipped (too complex for DeepL) */
  type?: 'text' | 'textarea' | 'richText'
}

/**
 * Factory that returns a Payload beforeChange hook which auto-translates
 * between EN and ZH using DeepL.
 *
 * Rules:
 * - If both fields are filled → skip (respect manual override)
 * - If only EN is filled → translate EN → ZH
 * - If only ZH is filled → translate ZH → EN
 * - RichText fields → skip (translation not supported)
 * - On quota exceeded → insert placeholder text
 * - If DEEPL_API_KEY is missing → insert placeholder text
 */
export function autoTranslateHook(options: AutoTranslateOptions): CollectionBeforeChangeHook {
  const { enField, zhField, type = 'text' } = options

  return async ({ data, operation }) => {
    if (operation !== 'create' && operation !== 'update') return data
    if (type === 'richText') return data // skip richText — DeepL can't handle Lexical JSON

    const enVal = data[enField]
    const zhVal = data[zhField]

    // Both filled → manual override, skip
    if (enVal && zhVal) return data

    try {
      if (enVal && !zhVal) {
        console.log(`[autoTranslate] EN→ZH for field "${enField}"`)
        data[zhField] = await translateText(enVal, 'en', 'zh' as deepl.TargetLanguageCode)
      } else if (zhVal && !enVal) {
        console.log(`[autoTranslate] ZH→EN for field "${zhField}"`)
        data[enField] = await translateText(
          zhVal,
          'zh' as deepl.SourceLanguageCode,
          'en-US' as deepl.TargetLanguageCode,
        )
      }
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error)
      const placeholder = msg.includes('Quota Exceeded')
        ? '[Translation needed — DeepL quota reached]'
        : '[Translation needed]'

      console.warn(`[autoTranslate] Failed: ${msg}`)
      if (!data[zhField]) data[zhField] = placeholder
      if (!data[enField]) data[enField] = placeholder
    }

    return data
  }
}

/** Check remaining DeepL quota. Returns usage info or a safe default. */
export async function checkDeepLUsage() {
  const translator = getTranslator()
  if (!translator) return { available: false, percentage: 100, remaining: 0 }

  try {
    const usage = await translator.getUsage()
    if (!usage.character) return { available: true, percentage: 0, remaining: 500_000 }

    const { limit, count } = usage.character
    const percentage = Math.round((count / limit) * 100)
    return { available: count < limit, percentage, remaining: limit - count }
  } catch {
    return { available: false, percentage: 100, remaining: 0 }
  }
}

/** Legacy export kept for backward compatibility */
export const autoTranslate = autoTranslateHook({ enField: 'title_en', zhField: 'title_zh' })
