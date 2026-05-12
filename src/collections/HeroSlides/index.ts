import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { revalidateHeroSlides, revalidateDelete } from './hooks/revalidateHeroSlides'

const HeroSlides: CollectionConfig = {
  slug: 'hero-slides',
  admin: {
    useAsTitle: 'titleEn',
    description: 'Manage homepage hero slider images and videos',
    defaultColumns: ['titleEn', 'type', 'order', 'isActive'],
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    afterChange: [revalidateHeroSlides],
    afterDelete: [revalidateDelete],
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'image',
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Video', value: 'video' },
      ],
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Upload image or video for this slide',
      },
    },
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
        description: 'Leave empty to use English title',
        components: {
          afterInput: ['@/components/admin/TranslateButton#TranslateButton'],
        },
      },
    },
    {
      name: 'subtitleEn',
      label: 'Subtitle (English)',
      type: 'textarea',
    },
    {
      name: 'subtitleZh',
      label: '副標題 (Chinese)',
      type: 'textarea',
      admin: {
        description: 'Leave empty to use English subtitle',
        components: {
          afterInput: ['@/components/admin/TranslateButton#TranslateButton'],
        },
      },
    },
    {
      name: 'ctaPrimary',
      label: 'Primary Button',
      type: 'group',
      fields: [
        {
          name: 'labelEn',
          label: 'Label (English)',
          type: 'text',
          defaultValue: 'Donate Now',
        },
        {
          name: 'labelZh',
          label: '按鈕文字 (Chinese)',
          type: 'text',
          defaultValue: '立即奉獻',
          admin: {
            components: {
              afterInput: ['@/components/admin/TranslateButton#TranslateButton'],
            },
          },
        },
        {
          name: 'href',
          label: 'Link URL',
          type: 'text',
          defaultValue: '/giving',
        },
      ],
    },
    {
      name: 'ctaSecondary',
      label: 'Secondary Button',
      type: 'group',
      fields: [
        {
          name: 'labelEn',
          label: 'Label (English)',
          type: 'text',
          defaultValue: 'Learn More',
        },
        {
          name: 'labelZh',
          label: '按鈕文字 (Chinese)',
          type: 'text',
          defaultValue: '了解更多',
        },
        {
          name: 'href',
          label: 'Link URL',
          type: 'text',
          defaultValue: '/about',
        },
      ],
    },
    {
      name: 'order',
      label: 'Display Order',
      type: 'number',
      defaultValue: 1,
      admin: {
        description: 'Lower number = shown first',
      },
    },
    {
      name: 'isActive',
      label: 'Active',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Uncheck to hide this slide without deleting it',
        position: 'sidebar',
      },
    },
  ],
}

export default HeroSlides
