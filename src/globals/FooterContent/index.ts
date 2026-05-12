import type { GlobalConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { revalidatePath, revalidateTag } from 'next/cache'

export const FooterContent: GlobalConfig = {
  slug: 'footer-content',
  admin: {
    description: 'Footer text, links, and Prayer Partner CTA',
  },
  access: {
    read: () => true,
    update: authenticated,
  },
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidateTag('footer-content', 'max')
        revalidatePath('/', 'layout')
        return doc
      },
    ],
  },
  fields: [
    // ── Prayer Partner CTA ────────────────────────────────────
    {
      type: 'row',
      fields: [
        {
          name: 'prayerPartnerCTA_en',
          label: 'Prayer Partner CTA (English)',
          type: 'text',
          defaultValue: 'Become a Prayer Partner',
          admin: { width: '50%' },
        },
        {
          name: 'prayerPartnerCTA_zh',
          label: 'Prayer Partner CTA (Chinese)',
          type: 'text',
          defaultValue: '成為宣教祈禱夥伴',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'prayerPartnerLink',
      label: 'Prayer Partner Link',
      type: 'text',
      defaultValue: '/mobilization/prayer',
    },

    // ── Copyright ─────────────────────────────────────────────
    {
      name: 'copyrightText',
      label: 'Copyright Text',
      type: 'text',
      defaultValue: '© 2026 USA Care Ministries International',
    },

    // ── Footer Links ─────────────────────────────────────────
    {
      name: 'footerLinks',
      label: 'Footer Navigation Links',
      type: 'array',
      admin: { description: 'Links shown in the footer navigation' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label_en',
              label: 'Label (English)',
              type: 'text',
              required: true,
              admin: { width: '33%' },
            },
            {
              name: 'label_zh',
              label: 'Label (Chinese)',
              type: 'text',
              admin: { width: '33%' },
            },
            {
              name: 'href',
              label: 'URL',
              type: 'text',
              required: true,
              admin: { width: '34%' },
            },
          ],
        },
      ],
    },
  ],
}
