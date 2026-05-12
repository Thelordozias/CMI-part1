import type { CollectionConfig } from 'payload'
import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { autoTranslateHook } from '../../hooks/autoTranslation'
import { revalidatePath, revalidateTag } from 'next/cache'

export const RegionalUpdates: CollectionConfig = {
  slug: 'regional-updates',
  admin: {
    useAsTitle: 'title_en',
    description: 'Manage regional ministry updates and news',
    defaultColumns: ['title_en', 'region', 'date', 'isPublished'],
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    beforeChange: [autoTranslateHook({ enField: 'title_en', zhField: 'title_zh' })],
    afterChange: [
      ({ doc, req: { payload, context } }) => {
        if (!context.disableRevalidate) {
          payload.logger.info(`Revalidating regional page for: ${doc.region}`)
          revalidateTag('regional-updates', 'max')
          revalidatePath(`/en/regional/${doc.region?.replace('asia-', 'asia/').replace('middle-east-', 'middle-east/').replace('africa-', 'africa/').replace('usa-', 'usa/')}`)
          revalidatePath(`/zh/regional/${doc.region?.replace('asia-', 'asia/').replace('middle-east-', 'middle-east/').replace('africa-', 'africa/').replace('usa-', 'usa/')}`)
        }
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'title_en',
      label: 'Title (English)',
      type: 'text',
      required: true,
    },
    {
      name: 'title_zh',
      label: '標題 (Chinese)',
      type: 'text',
      admin: {
        description: 'Leave empty for auto-translation',
        components: { afterInput: ['@/components/admin/TranslateButton#TranslateButton'] },
      },
    },
    {
      name: 'region',
      label: 'Region',
      type: 'select',
      required: true,
      options: [
        { label: 'Asia — Cambodia', value: 'asia-cambodia' },
        { label: 'Asia — Indonesia', value: 'asia-indonesia' },
        { label: 'Asia — Taiwan', value: 'asia-taiwan' },
        { label: 'Middle East — Turkey', value: 'middle-east-turkey' },
        { label: 'Middle East — Lebanon', value: 'middle-east-lebanon' },
        { label: 'Africa — Ghana', value: 'africa-ghana' },
        { label: 'USA — Southern California', value: 'usa-socal' },
      ],
    },
    {
      name: 'date',
      label: 'Update Date',
      type: 'date',
      required: true,
      admin: { date: { pickerAppearance: 'dayOnly' } },
    },
    {
      name: 'content_en',
      label: 'Content (English)',
      type: 'richText',
    },
    {
      name: 'content_zh',
      label: '內容 (Chinese)',
      type: 'richText',
      admin: {
        description: 'Leave empty for auto-translation',
        components: { afterInput: ['@/components/admin/TranslateButton#TranslateButton'] },
      },
    },
    {
      name: 'media',
      label: 'Featured Image / Video',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'isPublished',
      label: 'Published',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Check to make this update visible on the website' },
    },
  ],
  timestamps: true,
}
