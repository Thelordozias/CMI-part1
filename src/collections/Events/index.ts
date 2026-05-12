import type { CollectionConfig } from 'payload'
import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { autoTranslateHook } from '../../hooks/autoTranslation'
import { revalidatePath, revalidateTag } from 'next/cache'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'titleEn',
    description: 'Manage CMI events and conferences',
    defaultColumns: ['titleEn', 'date', 'location_en', 'isFeatured', 'isActive'],
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    beforeChange: [autoTranslateHook({ enField: 'titleEn', zhField: 'titleZh' })],
    afterChange: [
      ({ doc, req: { payload, context } }) => {
        if (!context.disableRevalidate) {
          payload.logger.info('Revalidating events pages')
          revalidateTag('events', 'max')
          revalidatePath('/en/mobilization/conferences')
          revalidatePath('/zh/mobilization/conferences')
        }
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'titleEn',
      label: 'Title (English)',
      type: 'text',
      required: true,
    },
    {
      name: 'titleZh',
      label: '標題 (Chinese)',
      type: 'text',
      admin: {
        description: 'Leave empty for auto-translation',
        components: { afterInput: ['@/components/admin/TranslateButton#TranslateButton'] },
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'date',
          label: 'Start Date',
          type: 'date',
          required: true,
          admin: { date: { pickerAppearance: 'dayAndTime' }, width: '50%' },
        },
        {
          name: 'endDate',
          label: 'End Date',
          type: 'date',
          admin: { date: { pickerAppearance: 'dayAndTime' }, width: '50%' },
        },
      ],
    },
    {
      name: 'location_en',
      label: 'Location (English)',
      type: 'text',
    },
    {
      name: 'location_zh',
      label: '地點 (Chinese)',
      type: 'text',
      admin: {
        description: 'Leave empty for auto-translation',
        components: { afterInput: ['@/components/admin/TranslateButton#TranslateButton'] },
      },
    },
    {
      name: 'description_en',
      label: 'Description (English)',
      type: 'richText',
    },
    {
      name: 'description_zh',
      label: '描述 (Chinese)',
      type: 'richText',
      admin: {
        description: 'Leave empty for auto-translation',
        components: { afterInput: ['@/components/admin/TranslateButton#TranslateButton'] },
      },
    },
    {
      name: 'image',
      label: 'Event Image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'registrationLink',
      label: 'Registration Link',
      type: 'text',
      admin: { description: 'External URL for event registration' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'isFeatured',
          label: 'Featured on Homepage',
          type: 'checkbox',
          defaultValue: false,
          admin: { width: '50%' },
        },
        {
          name: 'isActive',
          label: 'Active',
          type: 'checkbox',
          defaultValue: true,
          admin: { width: '50%', position: 'sidebar' },
        },
      ],
    },
  ],
  timestamps: true,
}
