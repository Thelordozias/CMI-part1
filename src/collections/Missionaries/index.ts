import type { CollectionConfig } from 'payload'
import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { autoTranslateHook } from '../../hooks/autoTranslation'
import { revalidatePath, revalidateTag } from 'next/cache'

export const Missionaries: CollectionConfig = {
  slug: 'missionaries',
  admin: {
    useAsTitle: 'name',
    description: 'Manage CMI missionaries and their profiles',
    defaultColumns: ['name', 'region', 'country', 'isActive'],
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    beforeChange: [autoTranslateHook({ enField: 'bio_en', zhField: 'bio_zh', type: 'richText' })],
    afterChange: [
      ({ doc, req: { payload, context } }) => {
        if (!context.disableRevalidate) {
          payload.logger.info(`Revalidating missionary pages after update: ${doc.name}`)
          revalidateTag('missionaries', 'max')
          revalidatePath('/en/about/missionaries')
          revalidatePath('/zh/about/missionaries')
        }
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'region',
          label: 'Region',
          type: 'select',
          required: true,
          options: [
            { label: 'Asia', value: 'asia' },
            { label: 'Middle East', value: 'middle-east' },
            { label: 'Africa', value: 'africa' },
            { label: 'USA', value: 'usa' },
          ],
          admin: { width: '50%' },
        },
        {
          name: 'country',
          label: 'Country',
          type: 'text',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'photo',
      label: 'Profile Photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'bio_en',
      label: 'Bio (English)',
      type: 'richText',
    },
    {
      name: 'bio_zh',
      label: '個人簡介 (Chinese)',
      type: 'richText',
      admin: {
        description: 'Leave empty for auto-translation',
        components: { afterInput: ['@/components/admin/TranslateButton#TranslateButton'] },
      },
    },
    {
      name: 'prayerNeeds_en',
      label: 'Prayer Needs (English)',
      type: 'richText',
    },
    {
      name: 'prayerNeeds_zh',
      label: '代禱事項 (Chinese)',
      type: 'richText',
      admin: {
        description: 'Leave empty for auto-translation',
        components: { afterInput: ['@/components/admin/TranslateButton#TranslateButton'] },
      },
    },
    {
      name: 'email',
      label: 'Contact Email',
      type: 'email',
      admin: { description: 'Not displayed publicly' },
    },
    {
      name: 'joinedDate',
      label: 'Joined CMI',
      type: 'date',
      admin: { date: { pickerAppearance: 'dayOnly' } },
    },
    {
      name: 'isActive',
      label: 'Active Missionary',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar', description: 'Uncheck for alumni or retired missionaries' },
    },
  ],
  timestamps: true,
}
